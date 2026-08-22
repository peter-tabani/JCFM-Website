"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Check, AlertCircle, Loader2 } from "lucide-react";

// Minimal shape of the bits of the PayPal JS SDK we actually use —
// the real SDK has no published types, so we keep this narrow instead of `any`.
type PayPalOrderActions = {
  order: {
    create: (config: unknown) => Promise<string>;
    capture: () => Promise<unknown>;
  };
};

type PayPalNamespace = {
  Buttons: (config: {
    style?: Record<string, string>;
    createOrder: (data: unknown, actions: PayPalOrderActions) => Promise<string>;
    onApprove: (data: unknown, actions: PayPalOrderActions) => Promise<void>;
    onError?: (err: unknown) => void;
    onCancel?: () => void;
  }) => { render: (el: HTMLElement) => void; close: () => void };
};

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

const PRESET_AMOUNTS = [20, 50, 100, 500, 1000];

export default function PayPalDonateButton({
  purpose = "General Fund",
}: {
  purpose?: string;
}) {
  // "sb" is PayPal's public sandbox client ID — it renders working buttons
  // for testing (fake sandbox money only). Set NEXT_PUBLIC_PAYPAL_CLIENT_ID
  // to your real one from developer.paypal.com before going live.
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb";
  const isSandbox = clientId === "sb";

  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkFailed, setSdkFailed] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef(50);

  const effectiveAmount = custom.trim() ? parseFloat(custom) : amount;

  // Keep a ref in sync with the current amount (updated in an effect, not
  // during render) so createOrder below can read the latest value at click
  // time without needing to re-render the PayPal buttons on every keystroke.
  useEffect(() => {
    amountRef.current = Number.isFinite(effectiveAmount) ? effectiveAmount : 0;
  }, [effectiveAmount]);

  useEffect(() => {
    if (!sdkReady || !window.paypal || !containerRef.current) return;

    containerRef.current.innerHTML = "";
    const buttons = window.paypal.Buttons({
      style: { layout: "vertical", color: "gold", shape: "pill", label: "donate" },
      createOrder: async () => {
        const value = amountRef.current;
        if (!value || value <= 0) {
          setStatus("error");
          throw new Error("Enter a donation amount first");
        }
        setStatus("idle");
        // Order creation happens server-side (see /api/paypal/create-order)
        // rather than via actions.order.create() — that's what lets the
        // capture step below be verified and recorded server-side too,
        // instead of trusting whatever the browser claims happened.
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: value, purpose }),
        });
        if (!res.ok) {
          setStatus("error");
          throw new Error("Could not start PayPal checkout");
        }
        const data = await res.json();
        return data.id as string;
      },
      onApprove: async (data) => {
        const orderID = (data as { orderID?: string })?.orderID;
        if (!orderID) {
          setStatus("error");
          return;
        }
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderID, purpose }),
        });
        const result = await res.json().catch(() => ({}));
        if (res.ok && result.status === "COMPLETED") {
          setStatus("success");
        } else {
          setStatus("error");
        }
      },
      onError: () => setStatus("error"),
      onCancel: () => setStatus("idle"),
    });

    buttons.render(containerRef.current);
    return () => {
      try {
        buttons.close();
      } catch {
        // no-op — button was already unmounted
      }
    };
  }, [sdkReady, purpose]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
      {isSandbox && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>
            PayPal is running in sandbox/test mode — no real money moves.
            Set <code className="font-mono">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> in
            your environment to go live.
          </span>
        </div>
      )}

      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
        Choose an amount (USD)
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setAmount(preset);
              setCustom("");
            }}
            className={`rounded-xl border-2 py-3 text-sm font-bold transition ${
              !custom && amount === preset
                ? "border-[#4c1d95] bg-[#4c1d95] text-white"
                : "border-slate-200 text-slate-700 hover:border-[#4c1d95]"
            }`}
          >
            ${preset}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Or enter your own amount
        </label>
        <div className="flex items-center rounded-xl border-2 border-slate-200 px-3 focus-within:border-[#4c1d95]">
          <span className="text-slate-400">$</span>
          <input
            type="number"
            min="1"
            step="1"
            inputMode="decimal"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Custom amount"
            className="w-full bg-transparent px-2 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="mt-6">
        <Script
          src={`https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture`}
          strategy="afterInteractive"
          onLoad={() => setSdkReady(true)}
          onError={() => setSdkFailed(true)}
        />
        {!sdkReady && !sdkFailed && (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-slate-500">
            <Loader2 size={16} className="animate-spin" />
            Loading PayPal…
          </div>
        )}
        {sdkFailed && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Couldn't load PayPal. Please check your connection, or use another
            way to give below.
          </p>
        )}
        <div ref={containerRef} />
      </div>

      {status === "success" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <Check size={16} className="shrink-0" />
          Thank you! Your gift was received. God bless you.
        </div>
      )}
      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0" />
          Something went wrong, or no amount was entered. Please try again.
        </div>
      )}
    </div>
  );
}

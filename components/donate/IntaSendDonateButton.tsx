"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { AlertCircle, Check, Heart, Loader2 } from "lucide-react";
import { buildApiRef } from "@/lib/intasend-shared";

// Replaces PayPalDonateButton on the live site (PayPal permanently
// deactivated JCFM's account — see lib/paypal.ts). Uses IntaSend's
// InlineJS widget (developers.intasend.com/docs/payment-button) rather
// than the redirect-based Checkout Link flow — clicking "Give" opens an
// embedded panel right on this page with Card / Apple Pay / Google Pay /
// M-Pesa tabs, instead of sending the donor to a separate hosted page.
//
// Donors enter and are charged in USD directly — the JCFM IntaSend account's
// Checkout Settings has "Default currency" set to USD, and IntaSend's
// Checkout Link docs list USD as a supported currency, so no client-side KES
// conversion is needed (see the currency note at the top of lib/intasend.ts).
//
// The widget's own "COMPLETE" event only drives this component's UI — the
// actual donations ledger is written by the server-side webhook
// (app/api/intasend/webhook/route.ts), which is the one thing here that
// can't be spoofed from the browser.

type IntaSendResults = Record<string, unknown>;

type IntaSendInstance = {
  on: (event: "COMPLETE" | "FAILED" | "IN-PROGRESS", cb: (results: IntaSendResults) => void) => IntaSendInstance;
};

type IntaSendConstructor = new (config: { publicAPIKey: string; live: boolean }) => IntaSendInstance;

declare global {
  interface Window {
    IntaSend?: IntaSendConstructor;
  }
}

const PRESET_AMOUNTS_USD = [20, 50, 100, 250, 500];
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jcfm.online";

export default function IntaSendDonateButton({
  purpose = "General Fund",
}: {
  purpose?: string;
}) {
  const pathname = usePathname();
  const publishableKey = process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY || "";
  const isLive = process.env.NEXT_PUBLIC_INTASEND_MODE === "live";

  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkFailed, setSdkFailed] = useState(false);
  const [status, setStatus] = useState<"idle" | "in-progress" | "complete" | "failed">("idle");
  const initialized = useRef(false);

  const effectiveAmount = custom.trim() ? parseFloat(custom) : amount;
  const validAmount = Number.isFinite(effectiveAmount) && effectiveAmount > 0;

  // Fresh api_ref per donor "session" on this page — regenerating on every
  // keystroke isn't necessary since it's just a tracking label, not a
  // uniqueness key (the ledger dedupes on IntaSend's own invoice_id).
  const apiRef = useMemo(() => buildApiRef(purpose), [purpose]);
  const usdAmount = validAmount ? Math.round(effectiveAmount * 100) / 100 : undefined;

  useEffect(() => {
    if (!sdkReady || !window.IntaSend || initialized.current || !publishableKey) return;
    initialized.current = true;

    new window.IntaSend({ publicAPIKey: publishableKey, live: isLive })
      .on("COMPLETE", () => setStatus("complete"))
      .on("FAILED", () => setStatus("failed"))
      .on("IN-PROGRESS", () => setStatus("in-progress"));
  }, [sdkReady, publishableKey, isLive]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
      <Script
        src="https://unpkg.com/intasend-checkout-sdk"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
        onError={() => setSdkFailed(true)}
      />

      {!publishableKey && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>
            Online giving isn't configured yet — set{" "}
            <code className="font-mono">NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY</code> in your
            environment.
          </span>
        </div>
      )}

      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
        Choose an amount (USD)
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {PRESET_AMOUNTS_USD.map((preset) => (
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
        {!sdkReady && !sdkFailed && (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-slate-500">
            <Loader2 size={16} className="animate-spin" />
            Loading secure checkout…
          </div>
        )}
        {sdkFailed && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Couldn't load the payment form. Please check your connection, or
            use another way to give below.
          </p>
        )}

        {sdkReady && !sdkFailed && (
          <button
            type="button"
            className="intaSendPayButton flex w-full items-center justify-center gap-2 rounded-xl bg-[#4c1d95] py-4 text-sm font-bold text-white transition hover:bg-[#3b1573] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!validAmount || !usdAmount || !publishableKey}
            data-amount={usdAmount}
            data-currency="USD"
            data-api_ref={apiRef}
            data-comment={`JCFM Donation — ${purpose}`.slice(0, 140)}
            data-redirect_url={`${SITE_URL}${pathname || "/donate"}?ist=success`}
          >
            Give with Card, Apple Pay, Google Pay or M-Pesa
          </button>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-slate-200 bg-[#fafaf8] px-4 py-3 text-[13px] leading-6 text-slate-600">
        <Heart size={15} className="mt-0.5 shrink-0 text-[#4c1d95]" />
        <span className="italic">
          "Each of you should give what you have decided in your heart to
          give, not reluctantly or under compulsion, for God loves a cheerful
          giver." <span className="not-italic font-semibold">— 2 Corinthians 9:7</span>
        </span>
      </div>

      {status === "complete" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <Check size={16} className="shrink-0" />
          Thank you! Your gift was received. God bless you.
        </div>
      )}
      {status === "in-progress" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <Loader2 size={16} className="shrink-0 animate-spin" />
          Payment in progress — if you chose M-Pesa, check your phone to
          approve it.
        </div>
      )}
      {status === "failed" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0" />
          The payment didn't go through. Please try again.
        </div>
      )}
    </div>
  );
}

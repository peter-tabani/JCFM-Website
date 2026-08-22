"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, Loader2, AlertCircle, Smartphone } from "lucide-react";
import OrderSummary from "@/components/donate/OrderSummary";
import { fmtUSD } from "@/lib/donations";
import { INTASEND_PUBLIC_KEY, INTASEND_LIVE, intasendConfigured } from "@/lib/intasend";

export type GuestInfo = { email: string; name: string } | null;

// IntaSend's InlineJS widget attaches to any element with class
// "intaSendPayButton" and reads the data-* attributes below.
type IntaSendInstance = {
  on: (
    event: "COMPLETE" | "FAILED" | "IN-PROGRESS",
    cb: (results: unknown) => void
  ) => IntaSendInstance;
};
type IntaSendConstructor = new (config: {
  publicAPIKey: string;
  live: boolean;
}) => IntaSendInstance;
declare global {
  interface Window {
    IntaSend?: IntaSendConstructor;
  }
}

export default function PaymentStep({
  designation,
  label,
  amountCents,
  image,
  guest,
  onBack,
}: {
  designation: string;
  label: string;
  amountCents: number;
  image: string;
  guest: GuestInfo;
  onBack: () => void;
}) {
  const router = useRouter();
  const configured = intasendConfigured();

  const [apiRef, setApiRef] = useState<string | null>(null);
  const [comment, setComment] = useState(`JCFM Donation - ${label}`);
  const [prepError, setPrepError] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkFailed, setSdkFailed] = useState(false);
  const [status, setStatus] = useState<"idle" | "in-progress" | "failed">("idle");
  const initialized = useRef(false);

  const amountUsd = amountCents / 100;

  // Where the donor lands after a successful gift (the Confirmation step).
  const doneUrl = useMemo(() => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams({
      step: "done",
      label,
      amount: String(amountCents),
    });
    return `${base}/donate?${params.toString()}`;
  }, [label, amountCents]);

  // Record a PENDING donation server-side and get the api_ref for the widget.
  useEffect(() => {
    if (!configured) return;
    let active = true;
    setPrepError(null);
    setApiRef(null);
    fetch("/api/donations/intasend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountCents,
        designation,
        ...(guest ? { email: guest.email, name: guest.name } : {}),
      }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Could not start giving.");
        if (active) {
          setApiRef(data.apiRef);
          if (data.comment) setComment(data.comment);
        }
      })
      .catch((e) => active && setPrepError(e.message));
    return () => {
      active = false;
    };
  }, [amountCents, designation, guest, configured]);

  // Wire up the IntaSend widget once the SDK and api_ref are both ready.
  useEffect(() => {
    if (!sdkReady || !window.IntaSend || initialized.current || !apiRef || !INTASEND_PUBLIC_KEY)
      return;
    initialized.current = true;
    new window.IntaSend({ publicAPIKey: INTASEND_PUBLIC_KEY, live: INTASEND_LIVE })
      .on("COMPLETE", () => router.push(doneUrl))
      .on("IN-PROGRESS", () => setStatus("in-progress"))
      .on("FAILED", () => setStatus("failed"));
  }, [sdkReady, apiRef, router, doneUrl]);

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/45 transition hover:text-white"
      >
        <ArrowLeft size={15} /> Back
      </button>
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Complete your donation
      </h1>

      <OrderSummary label={label} amountCents={amountCents} image={image} />

      {!configured ? (
        <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Online giving isn&apos;t set up yet. Add your IntaSend publishable key
          (<code className="font-mono">NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY</code>)
          to enable donations. See docs/PAYMENTS_SETUP.md.
        </div>
      ) : (
        <div className="mt-6">
          <Script
            src="https://unpkg.com/intasend-checkout-sdk"
            strategy="afterInteractive"
            onLoad={() => setSdkReady(true)}
            onError={() => setSdkFailed(true)}
          />

          {prepError && <ErrorNotice message={prepError} className="mb-4" />}

          {(!apiRef || (!sdkReady && !sdkFailed)) && !prepError && <Spinner />}

          {sdkFailed && (
            <ErrorNotice message="Couldn't load the secure payment form. Please check your connection and try again." />
          )}

          {sdkReady && !sdkFailed && apiRef && (
            <button
              type="button"
              className="intaSendPayButton flex w-full items-center justify-center gap-2 rounded-full bg-[#7c3aed] py-4 font-semibold text-white transition hover:bg-[#6d28d9]"
              data-amount={amountUsd}
              data-currency="USD"
              data-api_ref={apiRef}
              data-comment={comment}
              data-redirect_url={doneUrl}
            >
              <Smartphone size={18} />
              Give {fmtUSD(amountCents)} with M-Pesa, Card or Google Pay
            </button>
          )}

          {status === "in-progress" && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-300/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              <Loader2 size={16} className="shrink-0 animate-spin" />
              Payment in progress. If you chose M-Pesa, check your phone to approve it.
            </div>
          )}
          {status === "failed" && (
            <ErrorNotice message="The payment didn't go through. Please try again." className="mt-4" />
          )}

          <p className="mt-4 text-center text-[12px] leading-6 text-white/40">
            Secured by IntaSend. Your card and M-Pesa details never touch our
            servers.
          </p>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-10 text-white/35">
      <Loader2 className="animate-spin" />
    </div>
  );
}

function ErrorNotice({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 ${className}`}
    >
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      {message}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { ArrowLeft, CreditCard, Loader2, AlertCircle } from "lucide-react";
import OrderSummary from "@/components/donate/OrderSummary";
import { fmtUSD } from "@/lib/donations";

const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

// Load Stripe once at module scope.
const stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : null;

type Method = "stripe" | "paypal";

export default function PaymentStep({
  designation,
  label,
  amountCents,
  onBack,
}: {
  designation: string;
  label: string;
  amountCents: number;
  onBack: () => void;
}) {
  const [method, setMethod] = useState<Method>("stripe");

  // The URL the donor lands on after a successful payment.
  const doneUrl = useMemo(() => {
    const base =
      typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams({
      step: "done",
      label,
      amount: String(amountCents),
    });
    return `${base}/donate?${params.toString()}`;
  }, [label, amountCents]);

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={15} /> Back
      </button>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Complete your donation
      </h1>

      <OrderSummary label={label} amountCents={amountCents} />

      {/* Method switch */}
      <div className="mt-6 flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
        <button
          onClick={() => setMethod("stripe")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
            method === "stripe"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500"
          }`}
        >
          <CreditCard size={15} /> Card / Cash App
        </button>
        <button
          onClick={() => setMethod("paypal")}
          className={`flex flex-1 items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition ${
            method === "paypal"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500"
          }`}
        >
          PayPal
        </button>
      </div>

      <div className="mt-6">
        {method === "stripe" ? (
          <StripeSection
            amountCents={amountCents}
            designation={designation}
            returnUrl={doneUrl}
          />
        ) : (
          <PayPalSection
            amountCents={amountCents}
            designation={designation}
          />
        )}
      </div>
    </div>
  );
}

// ── Stripe (cards + Cash App Pay via the Payment Element) ──
function StripeSection({
  amountCents,
  designation,
  returnUrl,
}: {
  amountCents: number;
  designation: string;
  returnUrl: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setError(null);
    setClientSecret(null);
    fetch("/api/donations/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountCents, designation }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Could not start payment.");
        if (active) setClientSecret(data.clientSecret);
      })
      .catch((e) => active && setError(e.message));
    return () => {
      active = false;
    };
  }, [amountCents, designation]);

  if (!stripePromise) {
    return <ConfigNotice provider="Stripe" />;
  }
  if (error) {
    return <ErrorNotice message={error} />;
  }
  if (!clientSecret) {
    return <Spinner />;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: { theme: "stripe" } }}
    >
      <StripeForm returnUrl={returnUrl} amountCents={amountCents} />
    </Elements>
  );
}

function StripeForm({
  returnUrl,
  amountCents,
}: {
  returnUrl: string;
  amountCents: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    // If we reach here, the redirect didn't happen → show the error.
    if (confirmError) {
      setError(confirmError.message || "Payment failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <ErrorNotice message={error} className="mt-4" />}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d97706] py-4 font-semibold text-white transition hover:bg-[#b45309] disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Processing…
          </>
        ) : (
          <>Donate {fmtUSD(amountCents)}</>
        )}
      </button>
    </form>
  );
}

// ── PayPal ──
function PayPalSection({
  amountCents,
  designation,
}: {
  amountCents: number;
  designation: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  if (!PAYPAL_CLIENT_ID) {
    return <ConfigNotice provider="PayPal" />;
  }

  return (
    <div>
      {error && <ErrorNotice message={error} className="mb-4" />}
      <PayPalScriptProvider
        options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" }}
      >
        <PayPalButtons
          style={{ layout: "vertical", shape: "pill", label: "donate" }}
          createOrder={async () => {
            setError(null);
            const res = await fetch("/api/donations/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: amountCents, designation }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || "Could not start PayPal.");
            return data.orderId;
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/donations/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });
            const result = await res.json().catch(() => ({}));
            if (!res.ok || !result.ok) {
              setError(result.error || "PayPal payment could not be completed.");
              return;
            }
            const params = new URLSearchParams({
              step: "done",
              label: result.designationLabel ?? "",
              amount: String(result.amountCents ?? amountCents),
            });
            router.push(`/donate?${params.toString()}`);
          }}
          onError={() => setError("Something went wrong with PayPal. Please try again.")}
        />
      </PayPalScriptProvider>
    </div>
  );
}

// ── Small shared UI ──
function Spinner() {
  return (
    <div className="flex items-center justify-center py-10 text-slate-400">
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

function ConfigNotice({ provider }: { provider: string }) {
  return (
    <div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
      {provider} isn&apos;t configured yet. Add the {provider} keys to your
      environment (see docs/PAYMENTS_SETUP.md) to enable this payment method.
    </div>
  );
}

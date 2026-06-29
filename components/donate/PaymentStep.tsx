"use client";

import { ArrowLeft } from "lucide-react";
import OrderSummary from "@/components/donate/OrderSummary";

// NOTE: Phase 2 placeholder. Phase 3 replaces this with the real Stripe +
// PayPal payment integration.
export default function PaymentStep({
  label,
  amountCents,
  onBack,
}: {
  designation: string;
  label: string;
  amountCents: number;
  onBack: () => void;
}) {
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
      <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
        Payment methods load here.
      </p>
    </div>
  );
}

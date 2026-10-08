"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import DonateChrome from "@/components/donate/DonateChrome";
import PaymentStep from "@/components/donate/PaymentStep";
import {
  resolveDesignation,
  validateAmountCents,
  causeImage,
  fmtUSD,
} from "@/lib/donations";

export default function DonatePage() {
  return (
    <Suspense fallback={null}>
      <DonateWizard />
    </Suspense>
  );
}

function DonateWizard() {
  const router = useRouter();
  const search = useSearchParams();

  const requestedStep = search.get("step");
  const step = requestedStep === "payment" || requestedStep === "done" ? requestedStep : "amount";
  const designationSlug = search.get("designation");
  const amountParam = search.get("amount");

  const resolved = useMemo(() => resolveDesignation(designationSlug), [designationSlug]);
  const amountCheck = validateAmountCents(amountParam);
  const validAmount = amountCheck.ok ? amountCheck.cents : null;
  const image = causeImage(designationSlug);

  const buildUrl = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(search.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v == null) params.delete(k);
      else params.set(k, v);
    }
    return `/donate?${params.toString()}`;
  };
  const goto = (next: Record<string, string | null>) => router.push(buildUrl(next));

  // Only the confirmed general fund is live; donors go directly to amount.
  useEffect(() => {
    if (step === "done") return;
    if ((step === "amount" || step === "payment") && !resolved) {
      router.replace("/donate");
      return;
    }
    if (step === "payment" && !validAmount) {
      router.replace(buildUrl({ step: "amount" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, resolved, validAmount]);

  if (step === "done") {
    return (
      <DonateChrome backHref="/" backLabel="Back to site">
        <Confirmation />
      </DonateChrome>
    );
  }

  return (
    <DonateChrome>
      {step === "amount" && resolved && (
        <AmountStep
          label={resolved.label}
          image={image}
          initialCents={validAmount}
          onBack={() => router.push("/")}
          onContinue={(cents) => goto({ step: "payment", amount: String(cents) })}
        />
      )}

      {step === "payment" && resolved && validAmount && (
        <PaymentStep
          designation={resolved.designation}
          label={resolved.label}
          amountCents={validAmount}
          image={image}
          onBack={() => goto({ step: "amount" })}
        />
      )}
    </DonateChrome>
  );
}

// Amount and then secure checkout.
function AmountStep({
  label,
  image,
  initialCents,
  onBack,
  onContinue,
}: {
  label: string;
  image: string;
  initialCents: number | null;
  onBack: () => void;
  onContinue: (cents: number) => void;
}) {
  const [amount, setAmount] = useState<string>(
    initialCents != null ? String(initialCents / 100) : ""
  );
  const [error, setError] = useState("");

  const submit = () => {
    const dollars = Number(amount);
    const cents = Number.isFinite(dollars) ? Math.round(dollars * 100) : NaN;
    const check = validateAmountCents(cents);
    if (!check.ok) {
      setError(check.error);
      return;
    }
    onContinue(check.cents);
  };

  return (
    <div>
      <BackLink onClick={onBack} />

      {/* Same image so the donor keeps seeing what they're giving to */}
      <div className="overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={label} className="h-44 w-full object-cover" />
      </div>
      <p className="mt-3 text-[13px] uppercase tracking-[0.14em] text-white/40">You&apos;re giving to</p>
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{label}</h1>
      <p className="mt-2 text-sm leading-6 text-white/55">Support worship, outreach and Fountain of Hope Academy.</p>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-white/70">
          How much would you like to give?
        </span>
        <div className="relative">
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-semibold text-white/50">
            $
          </span>
          <input
            type="number"
            inputMode="decimal"
            min="1"
            step="1"
            autoFocus
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            placeholder="0"
            className="w-full rounded-2xl border border-white/15 bg-white/[0.04] py-5 pl-11 pr-5 text-3xl font-bold text-white outline-none transition focus:border-[#7c3aed]"
          />
        </div>
      </label>

      {error && <p className="mt-3 rounded-xl bg-red-500/15 p-3 text-sm text-red-300">{error}</p>}

      <button
        onClick={submit}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7c3aed] py-4 font-semibold text-white transition hover:bg-[#6d28d9]"
      >
        Continue <ArrowRight size={18} />
      </button>
    </div>
  );
}

// ── Confirmation ──
function Confirmation() {
  const search = useSearchParams();
  const ref = search.get("ref");
  const [receipt, setReceipt] = useState<{
    status: "pending" | "succeeded" | "failed";
    amountCents: number;
    currency: string;
    designationLabel: string;
  } | null>(null);
  const [lookupFailed, setLookupFailed] = useState(false);

  useEffect(() => {
    if (!ref) return;
    let active = true;
    let checks = 0;
    const check = async () => {
      try {
        const response = await fetch(`/api/donations/status?ref=${encodeURIComponent(ref)}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Status unavailable");
        const data = await response.json();
        if (active) setReceipt(data);
        if (data.status !== "pending" || ++checks >= 10) clearInterval(timer);
      } catch {
        if (active) setLookupFailed(true);
        clearInterval(timer);
      }
    };
    const timer = setInterval(check, 3000);
    void check();
    return () => { active = false; clearInterval(timer); };
  }, [ref]);

  const confirmed = receipt?.status === "succeeded";

  return (
    <div className="text-center">
      <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full ${confirmed ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-300"}`}>
        {confirmed ? <CheckCircle2 size={44} /> : <ShieldCheck size={40} />}
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {confirmed ? "Thank you for your gift!" : "Thank you for giving"}
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-white/60">
        {confirmed ? (
          <>
            Your donation of{" "}
            <span className="font-semibold text-white">{fmtUSD(receipt.amountCents)}</span>
            {" "}to <span className="font-semibold text-white">{receipt.designationLabel}</span>{" "}
            has been received.
          </>
        ) : receipt?.status === "failed" ? (
          <>Your payment was not completed. Please try again.</>
        ) : !ref || lookupFailed ? (
          <>We could not check this payment yet. Please contact us if you need help.</>
        ) : (
          <>Your payment is being verified. Please allow a little time for confirmation.</>
        )}
      </p>
      <div className="mt-7 flex flex-col items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3.5 font-semibold text-white transition hover:bg-[#6d28d9]"
        >
          Back to home <ArrowRight size={17} />
        </Link>
        <Link href="/" className="text-sm font-medium text-white/50 hover:text-white">
          Back to the site
        </Link>
      </div>
    </div>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/45 transition hover:text-white"
    >
      <ArrowLeft size={15} /> Back
    </button>
  );
}

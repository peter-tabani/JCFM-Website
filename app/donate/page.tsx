"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  UserCircle2,
} from "lucide-react";
import DonateChrome, { Stepper } from "@/components/donate/DonateChrome";
import OrderSummary from "@/components/donate/OrderSummary";
import PaymentStep from "@/components/donate/PaymentStep";
import {
  fundableCauses,
  resolveDesignation,
  validateAmountCents,
  AMOUNT_PRESETS_USD,
  fmtUSD,
  GENERAL_FUND,
} from "@/lib/donations";

const STEP_ORDER = ["cause", "amount", "account", "payment"] as const;
const STEP_LABELS = ["Cause", "Amount", "Account", "Payment"];

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
  const { data: session, status } = useSession();

  const step = search.get("step") ?? "cause";
  const designationSlug = search.get("designation");
  const amountParam = search.get("amount");

  const resolved = useMemo(
    () => resolveDesignation(designationSlug),
    [designationSlug]
  );
  const amountCheck = validateAmountCents(amountParam);
  const validAmount = amountCheck.ok ? amountCheck.cents : null;

  // Build a URL for the flow with merged params.
  const buildUrl = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(search.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v == null) params.delete(k);
      else params.set(k, v);
    }
    return `/donate?${params.toString()}`;
  };
  const goto = (next: Record<string, string | null>) =>
    router.push(buildUrl(next));

  // ── Step guards ──
  useEffect(() => {
    if (step === "done") return;
    if ((step === "amount" || step === "account" || step === "payment") && !resolved) {
      router.replace("/donate?step=cause");
      return;
    }
    if ((step === "account" || step === "payment") && !validAmount) {
      router.replace(buildUrl({ step: "amount" }));
      return;
    }
    // Auto-advance past the account step once signed in.
    if (step === "account" && status === "authenticated") {
      router.replace(buildUrl({ step: "payment" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, resolved, validAmount, status]);

  const currentStepNumber =
    STEP_ORDER.indexOf(step as (typeof STEP_ORDER)[number]) + 1;

  // ── Confirmation (post-payment) ──
  if (step === "done") {
    return (
      <DonateChrome backHref="/donors/portal/dashboard" backLabel="Go to my dashboard">
        <Confirmation />
      </DonateChrome>
    );
  }

  return (
    <DonateChrome>
      {currentStepNumber > 0 && (
        <Stepper steps={STEP_LABELS} current={currentStepNumber} />
      )}

      {step === "cause" && <CauseStep onSelect={(slug) => goto({ step: "amount", designation: slug })} />}

      {step === "amount" && resolved && (
        <AmountStep
          label={resolved.label}
          initialCents={validAmount}
          onBack={() => goto({ step: "cause" })}
          onContinue={(cents) =>
            goto({ step: "account", amount: String(cents) })
          }
        />
      )}

      {step === "account" && resolved && validAmount && (
        <AccountStep
          status={status}
          userName={session?.user?.name ?? session?.user?.email ?? null}
          label={resolved.label}
          amountCents={validAmount}
          loginHref={`/donors/portal?callbackUrl=${encodeURIComponent(
            buildUrl({ step: "payment" })
          )}`}
          onBack={() => goto({ step: "amount" })}
        />
      )}

      {step === "payment" && resolved && validAmount && status === "authenticated" && (
        <PaymentStep
          designation={resolved.designation}
          label={resolved.label}
          amountCents={validAmount}
          onBack={() => goto({ step: "amount" })}
        />
      )}

      {step === "payment" && status !== "authenticated" && (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </DonateChrome>
  );
}

// ──────────────────────────────────────────────────────────────
// Step 1 — choose a cause
// ──────────────────────────────────────────────────────────────
function CauseStep({ onSelect }: { onSelect: (slug: string) => void }) {
  const causes = fundableCauses();
  const projects = causes.filter((c) => c.slug !== "general");

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        What would you like to support?
      </h1>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        Give to a specific project, or let us direct your gift to where it&apos;s
        needed most across the church and school.
      </p>

      {/* General fund — highlighted, skip straight to giving */}
      <button
        onClick={() => onSelect(GENERAL_FUND.slug)}
        className="mt-6 flex w-full items-start gap-4 rounded-2xl border-2 border-[#7c3aed] bg-[#f5f3ff] p-5 text-left transition hover:bg-[#ede9fe]"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/15 text-[#7c3aed]">
          <Heart size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">General Fund</p>
          <p className="mt-0.5 text-sm leading-6 text-slate-600">
            {GENERAL_FUND.blurb}
          </p>
        </div>
        <ArrowRight size={18} className="mt-1 shrink-0 text-[#7c3aed]" />
      </button>

      <p className="mt-8 mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        Or support a project
      </p>

      <ul className="space-y-3">
        {projects.map((c) => (
          <li
            key={c.slug}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-semibold text-slate-900">{c.label}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{c.blurb}</p>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => onSelect(c.slug)}
                className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
              >
                Support this <ArrowRight size={15} />
              </button>
              <Link
                href={`/donate/projects/${c.slug}`}
                className="text-sm font-semibold text-[#7c3aed] hover:underline"
              >
                Learn more
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Step 2 — choose an amount
// ──────────────────────────────────────────────────────────────
function AmountStep({
  label,
  initialCents,
  onBack,
  onContinue,
}: {
  label: string;
  initialCents: number | null;
  onBack: () => void;
  onContinue: (cents: number) => void;
}) {
  const presetCents = AMOUNT_PRESETS_USD.map((d) => d * 100);
  const initialIsPreset = initialCents != null && presetCents.includes(initialCents);

  const [selected, setSelected] = useState<number | null>(
    initialIsPreset ? initialCents : null
  );
  const [custom, setCustom] = useState<string>(
    initialCents != null && !initialIsPreset ? String(initialCents / 100) : ""
  );
  const [error, setError] = useState("");

  const chosenCents = (): number | null => {
    if (selected != null) return selected;
    const dollars = Number(custom);
    if (!Number.isFinite(dollars) || dollars <= 0) return null;
    return Math.round(dollars * 100);
  };

  const submit = () => {
    const cents = chosenCents();
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
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        How much would you like to give?
      </h1>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        You&apos;re giving to <span className="font-semibold text-slate-900">{label}</span>.
        This is a one-time gift in US dollars.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {AMOUNT_PRESETS_USD.map((d) => {
          const cents = d * 100;
          const active = selected === cents;
          return (
            <button
              key={d}
              onClick={() => {
                setSelected(cents);
                setCustom("");
                setError("");
              }}
              className={`rounded-2xl border-2 py-5 text-xl font-bold transition ${
                active
                  ? "border-[#7c3aed] bg-[#f5f3ff] text-[#7c3aed]"
                  : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
              }`}
            >
              ${d}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Or enter a custom amount
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            $
          </span>
          <input
            type="number"
            inputMode="decimal"
            min="1"
            step="1"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setSelected(null);
              setError("");
            }}
            placeholder="0"
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-8 pr-4 text-lg outline-none transition focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}

      <button
        onClick={submit}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7c3aed] py-4 font-semibold text-white transition hover:bg-[#6d28d9]"
      >
        Continue <ArrowRight size={18} />
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Step 3 — account gate
// ──────────────────────────────────────────────────────────────
function AccountStep({
  status,
  userName,
  label,
  amountCents,
  loginHref,
  onBack,
}: {
  status: "loading" | "authenticated" | "unauthenticated";
  userName: string | null;
  label: string;
  amountCents: number;
  loginHref: string;
  onBack: () => void;
}) {
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <BackLink onClick={onBack} />
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Create an account to continue
      </h1>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        Donations are tied to a free account so you get a dashboard with your
        full giving history and receipts. It takes a moment.
      </p>

      <OrderSummary label={label} amountCents={amountCents} />

      <Link
        href={loginHref}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7c3aed] py-4 font-semibold text-white transition hover:bg-[#6d28d9]"
      >
        <UserCircle2 size={18} />
        Create account or sign in
      </Link>
      <p className="mt-3 text-center text-xs text-slate-400">
        You&apos;ll come right back here to finish your donation.
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Confirmation
// ──────────────────────────────────────────────────────────────
function Confirmation() {
  const search = useSearchParams();
  const label = search.get("label");
  const amount = search.get("amount");
  const cents = amount ? Number(amount) : null;

  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 size={44} />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Thank you for your gift!
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-600">
        {cents ? (
          <>
            Your donation of{" "}
            <span className="font-semibold text-slate-900">{fmtUSD(cents)}</span>
            {label ? (
              <>
                {" "}to <span className="font-semibold text-slate-900">{label}</span>
              </>
            ) : null}{" "}
            has been received.
          </>
        ) : (
          <>Your donation has been received.</>
        )}{" "}
        A record now appears in your dashboard.
      </p>
      <Link
        href="/donors/portal/giving"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1e293b]"
      >
        View my giving history <ArrowRight size={17} />
      </Link>
    </div>
  );
}

// ── Small shared pieces ──
function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
    >
      <ArrowLeft size={15} /> Back
    </button>
  );
}

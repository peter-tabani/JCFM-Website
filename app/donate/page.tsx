"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  UserCircle2,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import DonateChrome from "@/components/donate/DonateChrome";
import OrderSummary from "@/components/donate/OrderSummary";
import PaymentStep, { type GuestInfo } from "@/components/donate/PaymentStep";
import {
  fundableCauses,
  resolveDesignation,
  validateAmountCents,
  causeImage,
  fmtUSD,
} from "@/lib/donations";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const { status } = useSession();

  const step = search.get("step") ?? "cause";
  const designationSlug = search.get("designation");
  const amountParam = search.get("amount");

  const resolved = useMemo(() => resolveDesignation(designationSlug), [designationSlug]);
  const amountCheck = validateAmountCents(amountParam);
  const validAmount = amountCheck.ok ? amountCheck.cents : null;
  const image = causeImage(designationSlug);

  // Guest donor details (kept in memory; only set when someone chooses guest).
  const [guest, setGuest] = useState<GuestInfo>(null);

  const buildUrl = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(search.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v == null) params.delete(k);
      else params.set(k, v);
    }
    return `/donate?${params.toString()}`;
  };
  const goto = (next: Record<string, string | null>) => router.push(buildUrl(next));

  // Step guards
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
    if (step === "account" && status === "authenticated") {
      router.replace(buildUrl({ step: "payment" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, resolved, validAmount, status]);

  if (step === "done") {
    return (
      <DonateChrome backHref="/donors/portal/dashboard" backLabel="Go to my dashboard">
        <Confirmation />
      </DonateChrome>
    );
  }

  return (
    <DonateChrome>
      {step === "cause" && (
        <CauseStep onSelect={(slug) => goto({ step: "amount", designation: slug })} />
      )}

      {step === "amount" && resolved && (
        <AmountStep
          label={resolved.label}
          image={image}
          initialCents={validAmount}
          onBack={() => goto({ step: "cause" })}
          onContinue={(cents) => goto({ step: "account", amount: String(cents) })}
        />
      )}

      {step === "account" && resolved && validAmount && (
        <AccountStep
          status={status}
          label={resolved.label}
          image={image}
          amountCents={validAmount}
          loginHref={`/donors/portal?callbackUrl=${encodeURIComponent(buildUrl({ step: "payment" }))}`}
          onBack={() => goto({ step: "amount" })}
          onGuest={(info) => {
            setGuest(info);
            goto({ step: "payment" });
          }}
        />
      )}

      {step === "payment" && resolved && validAmount && (status === "authenticated" || guest) && (
        <PaymentStep
          designation={resolved.designation}
          label={resolved.label}
          amountCents={validAmount}
          image={image}
          guest={guest}
          onBack={() => goto({ step: "amount" })}
        />
      )}

      {step === "payment" && status !== "authenticated" && !guest && (
        <div className="flex items-center justify-center py-16 text-white/40">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </DonateChrome>
  );
}

// ── Step 1 · choose a cause (Instagram-style feed) ──
function CauseStep({ onSelect }: { onSelect: (slug: string) => void }) {
  const causes = fundableCauses();
  const general = causes[0];
  const projects = causes.slice(1);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        What would you like to support?
      </h1>
      <p className="mt-2 text-sm leading-7 text-white/55">
        Give to a specific project, or let us direct your gift to where it&apos;s
        needed most across the church and school.
      </p>

      {/* General fund — highlighted */}
      <button
        onClick={() => onSelect(general.slug)}
        className="group mt-6 block w-full overflow-hidden rounded-2xl border-2 border-[#7c3aed] bg-[#7c3aed]/10 text-left transition hover:bg-[#7c3aed]/15"
      >
        <div className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/25 text-violet-200">
            <ShieldCheck size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white">General Fund</p>
            <p className="mt-0.5 text-[13px] leading-6 text-white/55">{general.blurb}</p>
          </div>
          <ArrowRight size={18} className="shrink-0 text-violet-300 transition group-hover:translate-x-1" />
        </div>
      </button>

      <p className="mb-3 mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
        Or support a project
      </p>

      {/* Project feed — image, title, description */}
      <div className="space-y-5">
        {projects.map((c) => (
          <article
            key={c.slug}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1626]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt={c.label} className="aspect-[16/10] w-full object-cover" />
            <div className="p-5">
              <h3 className="text-[17px] font-semibold text-white">{c.label}</h3>
              <p className="mt-1.5 text-[13.5px] leading-6 text-white/55">{c.blurb}</p>
              <button
                onClick={() => onSelect(c.slug)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7c3aed] py-3.5 font-semibold text-white transition hover:bg-[#6d28d9]"
              >
                Support this <ArrowRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ── Step 2 · amount (image + free amount, no presets, no currency talk) ──
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

// ── Step 3 · account or guest ──
function AccountStep({
  status,
  label,
  image,
  amountCents,
  loginHref,
  onBack,
  onGuest,
}: {
  status: "loading" | "authenticated" | "unauthenticated";
  label: string;
  image: string;
  amountCents: number;
  loginHref: string;
  onBack: () => void;
  onGuest: (info: { email: string; name: string }) => void;
}) {
  const [showGuest, setShowGuest] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex items-center justify-center py-16 text-white/40">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const continueGuest = () => {
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email so we can send your receipt.");
      return;
    }
    onGuest({ email: email.trim(), name: name.trim() });
  };

  return (
    <div>
      <BackLink onClick={onBack} />
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        How would you like to continue?
      </h1>

      <OrderSummary label={label} amountCents={amountCents} image={image} />

      {/* Option 1 — account */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f1626] p-5">
        <div className="flex items-start gap-3">
          <UserCircle2 size={20} className="mt-0.5 shrink-0 text-violet-300" />
          <div>
            <p className="font-semibold text-white">Create an account (or sign in)</p>
            <p className="mt-1 text-[13px] leading-6 text-white/55">
              Get your own dashboard with every donation, receipts and the projects
              you&apos;re supporting.
            </p>
          </div>
        </div>
        <Link
          href={loginHref}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7c3aed] py-3.5 font-semibold text-white transition hover:bg-[#6d28d9]"
        >
          Create account or sign in
        </Link>
      </div>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
        <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* Option 2 — guest */}
      <div className="rounded-2xl border border-white/10 bg-[#0f1626] p-5">
        <div className="flex items-start gap-3">
          <UserRound size={20} className="mt-0.5 shrink-0 text-white/60" />
          <div>
            <p className="font-semibold text-white">Continue as a guest</p>
            <p className="mt-1 text-[13px] leading-6 text-white/55">
              Give without an account. We&apos;ll email your receipt — you just
              won&apos;t get a dashboard.
            </p>
          </div>
        </div>

        {!showGuest ? (
          <button
            onClick={() => setShowGuest(true)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 font-semibold text-white transition hover:bg-white/[0.06]"
          >
            Continue as guest
          </button>
        ) : (
          <div className="mt-4 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition focus:border-[#7c3aed]"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="Email for your receipt"
              autoComplete="email"
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition focus:border-[#7c3aed]"
            />
            {error && <p className="rounded-xl bg-red-500/15 p-3 text-sm text-red-300">{error}</p>}
            <button
              onClick={continueGuest}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 font-semibold text-[#0f172a] transition hover:bg-white/90"
            >
              Continue to payment <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Confirmation ──
function Confirmation() {
  const search = useSearchParams();
  const label = search.get("label");
  const amount = search.get("amount");
  const cents = amount ? Number(amount) : null;

  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
        <CheckCircle2 size={44} />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Thank you for your gift!
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-white/60">
        {cents ? (
          <>
            Your donation of{" "}
            <span className="font-semibold text-white">{fmtUSD(cents)}</span>
            {label ? (
              <> to <span className="font-semibold text-white">{label}</span></>
            ) : null}{" "}
            has been received.
          </>
        ) : (
          <>Your donation has been received.</>
        )}{" "}
        A receipt is on its way to your email.
      </p>
      <div className="mt-7 flex flex-col items-center gap-3">
        <Link
          href="/donors/portal/giving"
          className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3.5 font-semibold text-white transition hover:bg-[#6d28d9]"
        >
          View my giving history <ArrowRight size={17} />
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

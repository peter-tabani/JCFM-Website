"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { categories, type CategoryKey } from "@/data/donor";

// ─────────────────────────────────────────────────────────
// Donor portal UI primitives.
// Warmer than the admin: rounded, generous spacing, plain
// language, larger tap targets — designed for non-tech users.
// ─────────────────────────────────────────────────────────

const ACCENT = "#5b21b6"; // blue-700 — keeps continuity with the portal

// ── Page header ───────────────────────────────────────────
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-7 md:flex-row md:items-end md:justify-between md:px-8 md:py-9">
        <div>
          {eyebrow && (
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-800">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-[14px] leading-7 text-slate-600">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

// ── Stat tile ─────────────────────────────────────────────
export function Stat({
  icon: Icon,
  label,
  value,
  sub,
  tone = "slate",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  tone?: "slate" | "navy" | "emerald" | "rose" | "sky";
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-50 text-slate-700",
    navy: "bg-violet-50 text-violet-800",
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
    sky: "bg-sky-50 text-sky-700",
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tones[tone]}`}>
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      {sub && <p className="mt-1 text-[12px] text-slate-500">{sub}</p>}
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────
export function Card({
  title,
  eyebrow,
  description,
  action,
  padded = true,
  children,
}: {
  title?: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
  padded?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      {(title || action) && (
        <header className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            {eyebrow && (
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-800">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-base font-semibold text-slate-900">{title}</h2>
            )}
            {description && (
              <p className="mt-0.5 text-[12px] text-slate-500">{description}</p>
            )}
          </div>
          {action}
        </header>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

// ── Buttons ───────────────────────────────────────────────
type BtnProps = {
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children: ReactNode;
};

export function PrimaryButton({ icon: Icon, href, onClick, type = "button", children }: BtnProps) {
  const cls =
    "inline-flex items-center gap-2 rounded-full bg-violet-700 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-violet-800";
  if (href)
    return (
      <Link href={href} className={cls}>
        {Icon && <Icon size={15} strokeWidth={2.25} />}
        {children}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} className={cls}>
      {Icon && <Icon size={15} strokeWidth={2.25} />}
      {children}
    </button>
  );
}

export function GhostButton({ icon: Icon, href, onClick, children }: BtnProps) {
  const cls =
    "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50";
  if (href)
    return (
      <Link href={href} className={cls}>
        {Icon && <Icon size={15} strokeWidth={2.25} />}
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} className={cls}>
      {Icon && <Icon size={15} strokeWidth={2.25} />}
      {children}
    </button>
  );
}

// ── Category pill ─────────────────────────────────────────
export function CategoryPill({ category }: { category: CategoryKey }) {
  const c = categories[category];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${c.tone}`}
    >
      {c.label}
    </span>
  );
}

// ── Progress bar ──────────────────────────────────────────
export function Progress({
  value,
  goal,
  showLabel = true,
}: {
  value: number;
  goal: number;
  showLabel?: boolean;
}) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  return (
    <div>
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-[12px]">
          <span className="font-mono text-slate-500">
            KSh {value.toLocaleString("en-KE")} <span className="text-slate-400">/ {goal.toLocaleString("en-KE")}</span>
          </span>
          <span className="font-bold text-violet-800">{pct}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-700 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────
export function Empty({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-800">
        <Icon size={20} strokeWidth={2} />
      </div>
      <p className="mt-4 text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-1.5 text-[13px] leading-7 text-slate-500">{body}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

// ── Status pill (donations) ───────────────────────────────
export function StatusPill({ status }: { status: "received" | "reconciled" | "pending" }) {
  const map = {
    received: "bg-emerald-50 text-emerald-700 border-emerald-200",
    reconciled: "bg-sky-50 text-sky-700 border-sky-200",
    pending: "bg-violet-50 text-violet-800 border-violet-200",
  } as const;
  const label = { received: "Received", reconciled: "Reconciled", pending: "Pending" }[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${map[status]}`}
    >
      {label}
    </span>
  );
}

// ── See-more link ─────────────────────────────────────────
export function SeeMore({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-[12px] font-semibold text-violet-800 hover:text-violet-900"
    >
      {children} <ArrowRight size={13} strokeWidth={2.25} />
    </Link>
  );
}

export { ACCENT };

import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

/* ──────────────────────────────────────────────────────
   Shared admin UI primitives, keeps pages terse.
   ────────────────────────────────────────────────────── */

export function PageHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-6 md:flex-row md:items-end md:justify-between md:px-8 md:py-7">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
          {kicker}
        </p>
        <h1 className="mt-1.5 text-[22px] font-semibold leading-tight tracking-tight text-slate-900 md:text-[26px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[13px] leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  delta,
  icon: Icon,
  accent = "navy",
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: { value: string; up?: boolean };
  icon: LucideIcon;
  accent?: "navy" | "gold" | "red" | "green";
}) {
  // Accent prop retained for API compatibility; visual uses neutral slate with a subtle navy icon.
  void accent;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-700">
            <Icon size={16} strokeWidth={1.75} />
          </div>
          {delta && (
            <span
              className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${
                delta.up
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {delta.up ? <ArrowUpRight size={11} strokeWidth={2.25} /> : <ArrowDownRight size={11} strokeWidth={2.25} />}
              {delta.value}
            </span>
          )}
        </div>

        <p className="mt-4 text-[12px] font-medium text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-[26px] font-semibold leading-none tracking-tight text-slate-900 md:text-[28px]">
          {value}
        </p>
        {sub && (
          <p className="mt-1.5 text-[12px] leading-5 text-slate-500">{sub}</p>
        )}
      </div>
    </div>
  );
}

export function Card({
  title,
  kicker,
  action,
  children,
  padded = true,
  className = "",
}: {
  title: string;
  kicker?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  padded?: boolean;
  className?: string;
}) {
  return (
    <section className={`overflow-hidden rounded-lg border border-slate-200 bg-white ${className}`}>
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5">
        <div>
          {kicker && (
            <p className="text-[11px] font-medium text-slate-500">
              {kicker}
            </p>
          )}
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">
            {title}
          </h3>
        </div>
        {action}
      </header>
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

export function PrimaryButton({
  href,
  onClick,
  children,
  icon: Icon,
  type = "button",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
  type?: "button" | "submit";
}) {
  const cls =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-slate-800 sm:min-h-0 sm:px-3.5 sm:py-2 sm:text-[12.5px]";
  const content = (
    <>
      {Icon && <Icon size={14} strokeWidth={2} />}
      {children}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

export function GhostButton({
  href,
  onClick,
  children,
  icon: Icon,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
}) {
  const cls =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:min-h-0 sm:px-3.5 sm:py-2 sm:text-[12.5px]";
  const content = (
    <>
      {Icon && <Icon size={14} strokeWidth={2} />}
      {children}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

// Clear, consistent banner for pages/sections still showing placeholder data.
export function SampleDataBadge({ note }: { note?: string }) {
  return (
    <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] leading-5 text-amber-800">
      <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-amber-500" />
      <span>
        <span className="font-semibold uppercase tracking-wide">Sample data</span>
        {", "}
        {note ?? "this section is not yet connected to the database."}
      </span>
    </div>
  );
}

export function StatusPill({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "success" | "warn" | "danger" | "info" | "neutral";
}) {
  const TONES: Record<string, string> = {
    success: "bg-emerald-50 text-emerald-700",
    warn: "bg-amber-50 text-amber-700",
    danger: "bg-rose-50 text-rose-700",
    info: "bg-sky-50 text-sky-700",
    neutral: "bg-slate-100 text-slate-600",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium ${TONES[tone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
      {label}
    </span>
  );
}

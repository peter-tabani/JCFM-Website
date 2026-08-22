import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

// Minimal, distraction-free checkout chrome for the donate flow.
// Mirrors the focused look of the existing login/portal pages without
// touching the site's global navigation.
export default function DonateChrome({
  children,
  backHref = "/",
  backLabel = "Back to site",
}: {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#080b16] text-white">
      <header className="border-b border-white/10 bg-[#0f1626]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/45 transition hover:text-[#7c3aed]"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            <ShieldCheck size={14} className="text-emerald-600" />
            Secure Donation
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-xl px-4 py-8 sm:py-12">{children}</div>
      </main>

      <footer className="border-t border-white/10 bg-[#0f1626] py-5">
        <p className="mx-auto max-w-3xl px-4 text-center text-xs text-white/35">
          Jesus Christ Founder Ministry · Payments processed securely by
          IntaSend (M-Pesa, card &amp; Google Pay). Your details never touch our
          servers.
        </p>
      </footer>
    </div>
  );
}

// A compact step indicator. `current` is 1-based.
export function Stepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="mb-8 flex items-center gap-2">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition ${
                active
                  ? "bg-[#7c3aed] text-white"
                  : done
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-white/45"
              }`}
            >
              {done ? "✓" : n}
            </div>
            <span
              className={`hidden text-[11px] font-semibold uppercase tracking-wider sm:block ${
                active ? "text-white" : "text-white/35"
              }`}
            >
              {label}
            </span>
            {n < steps.length && (
              <span className="h-px flex-1 bg-slate-200" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

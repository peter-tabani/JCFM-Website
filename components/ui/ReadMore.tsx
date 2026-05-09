"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type ReadMoreProps = {
  /** Visible content always shown (e.g. first paragraph). */
  children: React.ReactNode;
  /** Hidden content revealed when expanded. */
  more: React.ReactNode;
  /** Tailwind breakpoint above which everything is shown without a toggle. Default: lg. */
  showAllFrom?: "sm" | "md" | "lg" | "xl";
  openLabel?: string;
  closeLabel?: string;
  /** Visual variant. */
  tone?: "navy" | "gold" | "muted";
  className?: string;
};

const TONES: Record<NonNullable<ReadMoreProps["tone"]>, string> = {
  navy: "border-[#0b2545] text-[#0b2545] hover:bg-[#0b2545] hover:text-white",
  gold: "border-transparent text-white hover:text-white/80 hover:bg-white/0",
  muted: "border-[#d4d0c4] text-slate-600 hover:bg-white hover:text-[#0b2545]",
};

const HIDE_FROM: Record<NonNullable<ReadMoreProps["showAllFrom"]>, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
};

const SHOW_FROM: Record<NonNullable<ReadMoreProps["showAllFrom"]>, string> = {
  sm: "hidden sm:block",
  md: "hidden md:block",
  lg: "hidden lg:block",
  xl: "hidden xl:block",
};

/**
 * Mobile-first progressive disclosure.
 * - Below the breakpoint: shows `children`, hides `more` until user clicks.
 * - At/above the breakpoint: shows everything, no button.
 */
export default function ReadMore({
  children,
  more,
  showAllFrom = "lg",
  openLabel = "Read more",
  closeLabel = "Show less",
  tone = "navy",
  className = "",
}: ReadMoreProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      {children}

      {/* Hidden content on mobile, visible on desktop */}
      <div className={SHOW_FROM[showAllFrom]}>{more}</div>

      {/* Mobile-only collapsible */}
      <div className={HIDE_FROM[showAllFrom]}>
        {open && <div className="mt-4">{more}</div>}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`mt-5 inline-flex items-center gap-2 border-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] transition ${TONES[tone]}`}
          aria-expanded={open}
        >
          {open ? closeLabel : openLabel}
          {open ? (
            <ChevronUp size={14} strokeWidth={2.5} />
          ) : (
            <ChevronDown size={14} strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  );
}

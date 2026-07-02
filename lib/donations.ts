import { projects } from "@/data/donor";

// ─────────────────────────────────────────────────────────────
// Shared, server-trustworthy donation logic.
// Used by both the donate flow (display) and the payment API routes
// (validation). The client is NEVER trusted for amounts or labels —
// the server re-derives the label from the designation slug and
// re-validates the amount here.
// ─────────────────────────────────────────────────────────────

export const CURRENCY = "usd";

// Suggested amounts shown in the UI, in whole US dollars.
export const AMOUNT_PRESETS_USD = [25, 50, 100, 250] as const;

// Hard server-side bounds (in cents). Stripe's own minimum is 50 cents.
export const MIN_AMOUNT_CENTS = 100; // $1.00
export const MAX_AMOUNT_CENTS = 5_000_000; // $50,000.00

export type Cause = {
  slug: string; // "general" or a project id
  label: string;
  blurb: string;
  image: string;
};

// A warm, representative image for the general fund.
export const GENERAL_IMAGE = "https://picsum.photos/seed/jcfm-where-needed/1200/800";

export const GENERAL_FUND: Cause = {
  slug: "general",
  label: "General Fund",
  blurb:
    "Let the ministry direct your gift to whatever is most urgent right now — across the church and the school.",
  image: GENERAL_IMAGE,
};

// Causes a visitor can give to: the general fund plus every project that is
// still open for funding (completed projects are not fundable).
export function fundableCauses(): Cause[] {
  const projectCauses: Cause[] = projects
    .filter((p) => p.status !== "complete")
    .map((p) => ({ slug: p.id, label: p.title, blurb: p.shortDesc, image: p.hero }));
  return [GENERAL_FUND, ...projectCauses];
}

// The image to show for a chosen cause on later steps.
export function causeImage(slug: string | null | undefined): string {
  if (!slug || slug === "general") return GENERAL_IMAGE;
  return projects.find((p) => p.id === slug)?.hero ?? GENERAL_IMAGE;
}

// Server-side resolution of a designation slug to a trusted label.
// Returns null if the slug is unknown — callers must reject unknown slugs.
export function resolveDesignation(
  slug: string | null | undefined
): { designation: string; label: string } | null {
  if (!slug || slug === "general") {
    return { designation: "general", label: "General Fund" };
  }
  const project = projects.find((p) => p.id === slug && p.status !== "complete");
  if (!project) return null;
  return { designation: project.id, label: project.title };
}

// Validate a raw amount-in-cents value coming from the client.
export function validateAmountCents(
  raw: unknown
): { ok: true; cents: number } | { ok: false; error: string } {
  const cents =
    typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;

  if (!Number.isFinite(cents) || !Number.isInteger(cents)) {
    return { ok: false, error: "Please enter a valid amount." };
  }
  if (cents < MIN_AMOUNT_CENTS) {
    return { ok: false, error: `The minimum donation is $${MIN_AMOUNT_CENTS / 100}.` };
  }
  if (cents > MAX_AMOUNT_CENTS) {
    return {
      ok: false,
      error: `For gifts over $${MAX_AMOUNT_CENTS / 100}, please contact us directly.`,
    };
  }
  return { ok: true, cents };
}

export function fmtUSD(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

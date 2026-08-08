import Stripe from "stripe";

// Server-side Stripe client. The secret key is read from the environment and
// never exposed to the browser. Uses the library's pinned API version.
const key = process.env.STRIPE_SECRET_KEY;

// A non-empty placeholder is used when the key is absent so that importing this
// module never throws at build time (e.g. on Vercel before the key is added,
// `new Stripe("")` would throw and fail the whole build). Real Stripe calls are
// gated behind stripeConfigured(), so this placeholder never talks to Stripe.
export const stripe = new Stripe(key || "sk_placeholder_build_only", {
  // Helpful in the Stripe dashboard's request logs.
  appInfo: { name: "JCFM Donations" },
});

// True only when a REAL Stripe secret key is present, not the placeholder
// from .env.example (sk_test_xxx). Prevents confusing "could not start payment"
// errors before keys are pasted.
export function stripeConfigured(): boolean {
  const k = process.env.STRIPE_SECRET_KEY ?? "";
  return /^sk_(test|live)_/.test(k) && !k.includes("xxx") && k.length > 20;
}

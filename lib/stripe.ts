import Stripe from "stripe";

// Server-side Stripe client. The secret key is read from the environment and
// never exposed to the browser. Uses the library's pinned API version.
const key = process.env.STRIPE_SECRET_KEY;

export const stripe = new Stripe(key ?? "", {
  // Helpful in the Stripe dashboard's request logs.
  appInfo: { name: "JCFM Donations" },
});

// True only when a REAL Stripe secret key is present — not the placeholder
// from .env.example (sk_test_xxx). Prevents confusing "could not start payment"
// errors before keys are pasted.
export function stripeConfigured(): boolean {
  const k = process.env.STRIPE_SECRET_KEY ?? "";
  return /^sk_(test|live)_/.test(k) && !k.includes("xxx") && k.length > 20;
}

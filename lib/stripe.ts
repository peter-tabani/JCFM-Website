import Stripe from "stripe";

// Server-side Stripe client. The secret key is read from the environment and
// never exposed to the browser. Uses the library's pinned API version.
const key = process.env.STRIPE_SECRET_KEY;

export const stripe = new Stripe(key ?? "", {
  // Helpful in the Stripe dashboard's request logs.
  appInfo: { name: "JCFM Donations" },
});

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

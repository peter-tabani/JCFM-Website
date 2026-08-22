// IntaSend config helpers. IntaSend is a CBK-licensed Kenyan payment gateway
// (M-Pesa + card + Google Pay + Apple Pay). We use its client-side InlineJS
// widget, which creates checkouts in the browser using the PUBLIC key, so the
// key ships in the client bundle via a NEXT_PUBLIC_ var. Real donations are
// recorded server-side by the webhook (app/api/webhooks/intasend), never
// trusted from the browser.
//
// Why IntaSend and not PayPal/Stripe: PayPal permanently deactivated JCFM's
// account (Kenya-based orgs are a high-risk category for them) and Stripe is
// USD-card-only with no M-Pesa, which is how most Kenyan donors give.

export const INTASEND_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY ?? "";

// "live" charges real money; anything else uses IntaSend's sandbox.
export const INTASEND_LIVE = process.env.NEXT_PUBLIC_INTASEND_MODE === "live";

// True only when a real publishable key is present (not the .env.example
// placeholder), so donors see a clear "not set up yet" notice instead of a
// broken widget.
export function intasendConfigured(): boolean {
  const k = INTASEND_PUBLIC_KEY;
  return k.length > 12 && !k.toLowerCase().includes("xxx");
}

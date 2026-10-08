// IntaSend config helpers. The current USD checkout offers cards and enabled
// wallets. We use its client-side InlineJS
// widget, which creates checkouts in the browser using the PUBLIC key, so the
// key ships in the client bundle via a NEXT_PUBLIC_ var. Real donations are
// recorded server-side by the webhook (app/api/webhooks/intasend), never
// trusted from the browser.
//
// The existing JCFM payment account uses IntaSend; keep one gateway rather
// than adding new providers and setup costs.

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

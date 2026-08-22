// Server-side IntaSend integration — the PayPal replacement. PayPal
// permanently deactivated JCFM's account (Kenya-based orgs are a known
// high-risk category for them); IntaSend is a Kenyan, CBK-licensed gateway
// built for exactly this kind of business.
//
// The live donate button (components/donate/IntaSendDonateButton.tsx) uses
// IntaSend's client-side InlineJS widget, which creates checkouts directly
// from the browser using the PUBLIC key — that's why the key below is read
// from a NEXT_PUBLIC_ var (same pattern this codebase already used for
// NEXT_PUBLIC_PAYPAL_CLIENT_ID): it has to ship in the client bundle. Server
// code can still read NEXT_PUBLIC_ vars fine; the prefix only controls
// what's ALSO inlined into the browser build.
//
// This file's createIntaSendCheckout()/BASE_URL logic backs the redirect-
// based /api/intasend/create-checkout route, kept as a working fallback
// even though the widget is now the primary flow. getUsdToKesRate() and
// checkIntaSendPaymentStatus() are used by both flows.
//
// Base URLs are per-environment (NOT a single shared gateway — confirmed via
// developers.intasend.com/docs/api-testing-and-sandbox):
//   sandbox → https://sandbox.intasend.com/api/
//   live    → https://payment.intasend.com/api/
//
// CURRENCY — the checkout now charges in USD directly. The Checkout Link
// API's own docs (developers.intasend.com/docs/checkout-links) list currency
// options as "USD, KES, GBP, EUR", and the JCFM IntaSend dashboard's Checkout
// Settings has "Default currency" set to USD — so donors are charged in USD
// and IntaSend converts to KES on its own side at settlement, rather than us
// pre-converting before creating the checkout. (An earlier pass through this
// file hardcoded currency: "KES" based on a stricter-looking OpenAPI enum
// that didn't list USD; that appears to have been either outdated or scoped
// to a different endpoint — the account-level Checkout Settings and the
// Checkout Link docs both confirm USD is accepted. Do one small live test
// donation after deploying this to confirm the widget actually processes it
// in USD before relying on it fully.)
//
// getUsdToKesRate() is kept below only in case a KES display estimate or the
// FX-rates endpoint is needed again later — it is no longer used to convert
// the charge amount itself.

const INTASEND_MODE = process.env.NEXT_PUBLIC_INTASEND_MODE === "live" ? "live" : "sandbox";
const BASE_URL =
  INTASEND_MODE === "live" ? "https://payment.intasend.com" : "https://sandbox.intasend.com";

function assertPublicKeyConfigured() {
  const publishableKey = process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error(
      "IntaSend is not configured — set NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY in .env."
    );
  }
  return publishableKey;
}

export type IntaSendCheckout = {
  id: string;
  url: string;
  signature: string;
};

export async function createIntaSendCheckout(params: {
  amount: number;
  currency?: string;
  apiRef: string;
  comment: string;
  redirectUrl: string;
  host: string;
}): Promise<IntaSendCheckout> {
  const publishableKey = assertPublicKeyConfigured();

  const res = await fetch(`${BASE_URL}/api/v1/checkout/`, {
    method: "POST",
    headers: {
      "X-IntaSend-Public-API-Key": publishableKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amount.toFixed(2),
      currency: params.currency || "USD",
      api_ref: params.apiRef,
      comment: params.comment.slice(0, 140),
      redirect_url: params.redirectUrl,
      host: params.host,
      // Leave "method" unset so the hosted checkout offers every method
      // IntaSend supports on the account (M-Pesa, card, Google Pay, etc.)
      // rather than locking donors into one.
    }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    const message =
      typeof data?.detail === "string"
        ? data.detail
        : typeof data === "object"
          ? JSON.stringify(data)
          : `IntaSend checkout creation failed (${res.status})`;
    throw new Error(message);
  }
  return data as IntaSendCheckout;
}

// IntaSend's /realtime-fx-rates/exchange/ endpoint (requires the SECRET
// key) gives a live market rate. If it's unreachable or the secret key
// isn't set, fall back to INTASEND_USD_KES_FALLBACK_RATE (a fixed estimate
// you should update occasionally) rather than failing the donation outright
// — a slightly stale rate is far better than a donor unable to give at all.
const DEFAULT_FALLBACK_RATE = 129;

export async function getUsdToKesRate(): Promise<number> {
  const secretKey = process.env.INTASEND_SECRET_KEY;
  const fallback = Number(process.env.INTASEND_USD_KES_FALLBACK_RATE) || DEFAULT_FALLBACK_RATE;

  if (!secretKey) return fallback;

  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/realtime-fx-rates/exchange/?base=USD&currency=KES`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        cache: "no-store",
      }
    );
    if (!res.ok) return fallback;
    const data = await res.json();
    const rate = Number(data?.rate);
    return Number.isFinite(rate) && rate > 0 ? rate : fallback;
  } catch (err) {
    console.error("IntaSend FX rate fetch failed, using fallback rate:", err);
    return fallback;
  }
}

// Optional server-to-server confirmation, used as a defense-in-depth check —
// the webhook (see app/api/intasend/webhook/route.ts) is the primary,
// authoritative record of a completed donation. This needs the SECRET key.
export async function checkIntaSendPaymentStatus(invoiceId: string) {
  const secretKey = process.env.INTASEND_SECRET_KEY;
  if (!secretKey) {
    throw new Error("INTASEND_SECRET_KEY is not set — cannot check payment status.");
  }

  const res = await fetch(`${BASE_URL}/api/v1/payment/status/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ invoice_id: invoiceId }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.detail || `IntaSend status check failed (${res.status})`);
  }
  return data;
}

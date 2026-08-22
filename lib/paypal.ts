// Server-side PayPal Orders v2 integration. Order creation AND capture both
// happen here (not just in the browser) so every real donation is verified
// directly against PayPal's API and can be recorded — trusting the client
// SDK's own actions.order.capture() alone would mean the admin dashboard
// has no reliable record of what actually got paid.
//
// Requires (see .env.example):
//   NEXT_PUBLIC_PAYPAL_CLIENT_ID  — same client ID used by the browser SDK
//   PAYPAL_CLIENT_SECRET          — server-only, from developer.paypal.com
//   PAYPAL_MODE                   — "live" or "sandbox" (defaults to sandbox
//                                    for safety; must be explicitly "live"
//                                    before real money moves)

const PAYPAL_MODE = process.env.PAYPAL_MODE === "live" ? "live" : "sandbox";
const BASE_URL =
  PAYPAL_MODE === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

function assertConfigured() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || clientId === "sb" || !secret) {
    throw new Error(
      "PayPal is not configured for real payments — set NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env."
    );
  }
  return { clientId, secret };
}

async function getAccessToken(): Promise<string> {
  const { clientId, secret } = assertConfigured();
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`PayPal auth failed (${res.status})`);
  }
  const data = await res.json();
  return data.access_token as string;
}

export async function createPayPalOrder(amount: number, purpose: string) {
  const token = await getAccessToken();

  const res = await fetch(`${BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: `JCFM Donation — ${purpose}`.slice(0, 127),
          amount: { currency_code: "USD", value: amount.toFixed(2) },
        },
      ],
    }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `PayPal order creation failed (${res.status})`);
  }
  return data as { id: string };
}

export async function capturePayPalOrder(orderId: string) {
  const token = await getAccessToken();

  const res = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `PayPal capture failed (${res.status})`);
  }
  return data;
}

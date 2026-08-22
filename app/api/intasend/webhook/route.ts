import { NextResponse } from "next/server";
import { appendDonation } from "@/lib/donations-store";
import { parsePurposeFromApiRef } from "@/lib/intasend-shared";

// IntaSend calls this endpoint every time a checkout's payment state
// changes (see developers.intasend.com/docs/payment-collection-events),
// regardless of whether the donation started via the InlineJS widget
// (components/donate/IntaSendDonateButton.tsx) or the redirect-based
// fallback route. This — not the client-side "COMPLETE" event the widget
// fires, and not a browser redirect — is the authoritative record of a
// completed donation, mirroring how PayPal capture was verified
// server-side rather than trusted from the client.
//
// Set this endpoint's URL (https://jcfm.online/api/intasend/webhook) and a
// challenge string in the IntaSend dashboard under Webhooks, then set
// INTASEND_WEBHOOK_CHALLENGE on the server to that same string — every
// incoming request is checked against it so a stranger can't POST fake
// "donation completed" events at this URL.

type IntaSendWebhookPayload = {
  invoice_id?: string;
  state?: "PENDING" | "PROCESSING" | "COMPLETE" | "FAILED" | "CANCELED" | "PARTIAL" | "RETRY";
  provider?: string;
  value?: string;
  net_amount?: string;
  currency?: string;
  account?: string;
  api_ref?: string;
  challenge?: string;
};

export async function POST(req: Request) {
  let body: IntaSendWebhookPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const expectedChallenge = process.env.INTASEND_WEBHOOK_CHALLENGE;
  if (!expectedChallenge || body.challenge !== expectedChallenge) {
    console.warn("IntaSend webhook: challenge mismatch, rejecting request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Acknowledge every valid-challenge request, but only record a donation
  // once the payment actually completed.
  if (body.state !== "COMPLETE") {
    return NextResponse.json({ ok: true, recorded: false });
  }

  const amountValue = Number(body.value ?? body.net_amount ?? 0);
  const invoiceId = body.invoice_id;

  if (!invoiceId || !Number.isFinite(amountValue) || amountValue <= 0) {
    console.error("IntaSend webhook: COMPLETE event missing invoice_id/value", body);
    return NextResponse.json({ ok: true, recorded: false });
  }

  await appendDonation({
    id: invoiceId,
    date: new Date().toISOString(),
    donor: body.account?.trim() || "Anonymous",
    channel: "IntaSend",
    ref: body.api_ref || invoiceId,
    allocation: parsePurposeFromApiRef(body.api_ref),
    amount: amountValue,
    currency: body.currency || "KES",
    status: "received",
  });

  return NextResponse.json({ ok: true, recorded: true });
}

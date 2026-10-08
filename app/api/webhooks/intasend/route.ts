import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { timingSafeEqual } from "node:crypto";
import { confirmIntaSendInvoice } from "@/lib/intasend-status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// IntaSend calls this every time a checkout's payment state changes. This is
// the authoritative record of a completed donation (not the client-side
// "COMPLETE" event the widget fires). In the IntaSend dashboard, set the
// webhook URL to https://<your-domain>/api/webhooks/intasend and a challenge
// string, then set INTASEND_WEBHOOK_CHALLENGE to the same string, and every
// request is checked against it so no one can POST fake "donation completed"
// events.
type IntaSendWebhookPayload = {
  topic?: string;
  invoice_id?: string;
  state?: "PENDING" | "PROCESSING" | "COMPLETE" | "FAILED" | "CANCELED" | "PARTIAL" | "RETRY";
  value?: string;
  net_amount?: string;
  currency?: string;
  api_ref?: string;
  challenge?: string;
};

function challengeMatches(actual: unknown, expected: string | undefined): boolean {
  if (!expected || typeof actual !== "string") return false;
  const received = Buffer.from(actual);
  const secret = Buffer.from(expected);
  return received.length === secret.length && timingSafeEqual(received, secret);
}

export async function POST(req: Request) {
  let body: IntaSendWebhookPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const expected = process.env.INTASEND_WEBHOOK_CHALLENGE;
  if (!challengeMatches(body.challenge, expected)) {
    console.warn("IntaSend webhook: challenge mismatch, rejecting");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Acknowledge every valid request, but only record when the payment
  // actually completed and we can match it to a pending donation.
  if (body.topic !== "collection_event" || body.state !== "COMPLETE" || !body.api_ref || !body.invoice_id) {
    return NextResponse.json({ ok: true, recorded: false });
  }

  const donation = await prisma.donation.findUnique({
    where: { providerRef: body.api_ref },
  });
  if (!donation) {
    return NextResponse.json({ ok: true, recorded: false });
  }
  // Idempotent: repeated webhook deliveries for the same payment are a no-op.
  if (donation.status === "succeeded") {
    return NextResponse.json({ ok: true, recorded: true });
  }

  let verified: boolean;
  try {
    verified = await confirmIntaSendInvoice(body.invoice_id, {
      apiRef: body.api_ref,
      amountCents: donation.amountCents,
      currency: donation.currency,
    });
  } catch {
    // Non-2xx asks IntaSend to retry the webhook if its API was unavailable.
    return NextResponse.json({ error: "Verification unavailable" }, { status: 503 });
  }
  if (!verified) {
    console.warn("IntaSend webhook: invoice does not match pending donation");
    return NextResponse.json({ ok: true, recorded: false });
  }

  await prisma.donation.updateMany({
    where: { providerRef: body.api_ref, status: "pending" },
    data: {
      status: "succeeded",
    },
  });

  return NextResponse.json({ ok: true, recorded: true });
}

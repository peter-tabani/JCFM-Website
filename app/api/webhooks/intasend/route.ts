import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
  invoice_id?: string;
  state?: "PENDING" | "PROCESSING" | "COMPLETE" | "FAILED" | "CANCELED" | "PARTIAL" | "RETRY";
  value?: string;
  net_amount?: string;
  currency?: string;
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

  const expected = process.env.INTASEND_WEBHOOK_CHALLENGE;
  if (!expected || body.challenge !== expected) {
    console.warn("IntaSend webhook: challenge mismatch, rejecting");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Acknowledge every valid request, but only record when the payment
  // actually completed and we can match it to a pending donation.
  if (body.state !== "COMPLETE" || !body.api_ref) {
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

  // Reflect the actual amount/currency IntaSend reports where available.
  const paid = Number(body.value ?? body.net_amount);
  const amountCents =
    Number.isFinite(paid) && paid > 0 ? Math.round(paid * 100) : donation.amountCents;

  await prisma.donation.update({
    where: { providerRef: body.api_ref },
    data: {
      status: "succeeded",
      amountCents,
      currency: (body.currency || donation.currency).toLowerCase(),
    },
  });

  return NextResponse.json({ ok: true, recorded: true });
}

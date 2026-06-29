import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayPalWebhook } from "@/lib/paypal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PayPalEvent = {
  event_type?: string;
  resource?: {
    id?: string;
    // For PAYMENT.CAPTURE.* the related order id is under supplementary data.
    supplementary_data?: { related_ids?: { order_id?: string } };
  };
};

export async function POST(req: Request) {
  if (!process.env.PAYPAL_WEBHOOK_ID) {
    console.error("PAYPAL_WEBHOOK_ID is not set.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const rawBody = await req.text();

  // Verify the event really came from PayPal.
  const verified = await verifyPayPalWebhook(req.headers, rawBody).catch(() => false);
  if (!verified) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: PayPalEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  try {
    if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const orderId = event.resource?.supplementary_data?.related_ids?.order_id;
      if (orderId) {
        await prisma.donation.updateMany({
          where: { providerRef: orderId, status: "pending" },
          data: { status: "succeeded" },
        });
      }
    } else if (
      event.event_type === "PAYMENT.CAPTURE.DENIED" ||
      event.event_type === "PAYMENT.CAPTURE.DECLINED"
    ) {
      const orderId = event.resource?.supplementary_data?.related_ids?.order_id;
      if (orderId) {
        await prisma.donation.updateMany({
          where: { providerRef: orderId, status: "pending" },
          data: { status: "failed" },
        });
      }
    }
  } catch (err) {
    console.error("PayPal webhook handler error:", err);
    return NextResponse.json({ error: "Handler error." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

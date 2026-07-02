import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { capturePayPalOrder, paypalConfigured } from "@/lib/paypal";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!paypalConfigured()) {
    return NextResponse.json({ error: "PayPal is not configured yet." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const orderId = (body as Record<string, unknown>)?.orderId;
  if (typeof orderId !== "string" || !orderId) {
    return NextResponse.json({ error: "Missing order id." }, { status: 400 });
  }

  const donation = await prisma.donation.findUnique({
    where: { providerRef: orderId },
  });
  if (!donation) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  // For account donations, the order must belong to the signed-in user.
  // Guest donations (userId null) are captured by whoever holds the order id.
  if (donation.userId) {
    const user = await getCurrentUser();
    if (!user || donation.userId !== user.id) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
  }

  try {
    const result = await capturePayPalOrder(orderId);
    const completed = result.status === "COMPLETED";

    // Mark succeeded immediately on a completed capture. The webhook also
    // confirms this (idempotent — only flips pending rows).
    if (completed) {
      await prisma.donation.updateMany({
        where: { providerRef: orderId, status: "pending" },
        data: { status: "succeeded" },
      });
    }

    return NextResponse.json({
      ok: completed,
      status: result.status,
      amountCents: donation.amountCents,
      designationLabel: donation.designationLabel,
    });
  } catch (err) {
    console.error("PayPal capture error:", err);
    return NextResponse.json(
      { error: "Could not complete the PayPal payment." },
      { status: 500 }
    );
  }
}

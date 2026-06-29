import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { createPayPalOrder, paypalConfigured } from "@/lib/paypal";
import {
  validateAmountCents,
  resolveDesignation,
  CURRENCY,
} from "@/lib/donations";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please sign in to donate." }, { status: 401 });
  }
  if (!paypalConfigured()) {
    return NextResponse.json(
      { error: "PayPal is not configured yet." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { amount, designation } = (body ?? {}) as Record<string, unknown>;

  // Validate amount + designation SERVER-SIDE.
  const amountCheck = validateAmountCents(amount);
  if (!amountCheck.ok) {
    return NextResponse.json({ error: amountCheck.error }, { status: 400 });
  }
  const dest = resolveDesignation(
    typeof designation === "string" ? designation : null
  );
  if (!dest) {
    return NextResponse.json(
      { error: "That project is not available for donations." },
      { status: 400 }
    );
  }

  try {
    const order = await createPayPalOrder(
      amountCheck.cents,
      `JCFM donation — ${dest.label}`
    );

    await prisma.donation.create({
      data: {
        userId: user.id,
        amountCents: amountCheck.cents,
        currency: CURRENCY,
        provider: "paypal",
        providerRef: order.id,
        status: "pending",
        designation: dest.designation,
        designationLabel: dest.label,
        receiptEmail: user.email,
      },
    });

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error("PayPal create-order error:", err);
    return NextResponse.json(
      { error: "Could not start the PayPal payment. Please try again." },
      { status: 500 }
    );
  }
}

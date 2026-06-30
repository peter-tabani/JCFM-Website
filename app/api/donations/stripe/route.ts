import { NextResponse } from "next/server";
import { stripe, stripeConfigured } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import {
  validateAmountCents,
  resolveDesignation,
  CURRENCY,
} from "@/lib/donations";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 1. Auth required — accounts must exist before donating.
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please sign in to donate." }, { status: 401 });
  }

  if (!stripeConfigured()) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Please try again later." },
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

  // 2. Validate the amount SERVER-SIDE — never trust the client.
  const amountCheck = validateAmountCents(amount);
  if (!amountCheck.ok) {
    return NextResponse.json({ error: amountCheck.error }, { status: 400 });
  }

  // 3. Re-derive the designation label server-side.
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
    const intent = await stripe.paymentIntents.create({
      amount: amountCheck.cents,
      currency: CURRENCY,
      automatic_payment_methods: { enabled: true },
      receipt_email: user.email,
      metadata: {
        userId: user.id,
        designation: dest.designation,
        designationLabel: dest.label,
      },
    });

    // 4. Store a pending donation keyed by the PaymentIntent id. The webhook
    //    flips it to succeeded. providerRef is unique -> idempotent.
    await prisma.donation.create({
      data: {
        userId: user.id,
        amountCents: amountCheck.cents,
        currency: CURRENCY,
        provider: "stripe",
        providerRef: intent.id,
        status: "pending",
        designation: dest.designation,
        designationLabel: dest.label,
        receiptEmail: user.email,
      },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error("Stripe payment intent error:", err);
    return NextResponse.json(
      { error: "Could not start the payment. Please try again." },
      { status: 500 }
    );
  }
}

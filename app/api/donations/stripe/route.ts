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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
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
  const { amount, designation, email, name } = (body ?? {}) as Record<string, unknown>;

  // Donor identity: signed-in account, or guest with an email for the receipt.
  const user = await getCurrentUser();
  let donorEmail: string;
  let donorName: string | null;
  if (user) {
    donorEmail = user.email;
    donorName = user.name ?? null;
  } else {
    donorEmail = typeof email === "string" ? email.toLowerCase().trim() : "";
    donorName = typeof name === "string" && name.trim() ? name.trim() : null;
    if (!EMAIL_RE.test(donorEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email for your receipt." },
        { status: 400 }
      );
    }
  }

  // Validate the amount SERVER-SIDE — never trust the client.
  const amountCheck = validateAmountCents(amount);
  if (!amountCheck.ok) {
    return NextResponse.json({ error: amountCheck.error }, { status: 400 });
  }

  // Re-derive the designation label server-side.
  const dest = resolveDesignation(typeof designation === "string" ? designation : null);
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
      receipt_email: donorEmail,
      metadata: {
        userId: user?.id ?? "guest",
        designation: dest.designation,
        designationLabel: dest.label,
      },
    });

    await prisma.donation.create({
      data: {
        userId: user?.id ?? null,
        donorName,
        amountCents: amountCheck.cents,
        currency: CURRENCY,
        provider: "stripe",
        providerRef: intent.id,
        status: "pending",
        designation: dest.designation,
        designationLabel: dest.label,
        receiptEmail: donorEmail,
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

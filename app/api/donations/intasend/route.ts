import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { validateAmountCents, resolveDesignation, CURRENCY } from "@/lib/donations";
import { intasendConfigured } from "@/lib/intasend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Prepares an IntaSend donation: validates the amount + designation
// SERVER-SIDE, records a PENDING donation, and returns a unique api_ref for
// the InlineJS widget to attach to the payment. The webhook
// (app/api/webhooks/intasend) matches that api_ref back to this row and flips
// it to "succeeded" once the money actually arrives, mirroring the Stripe
// PaymentIntent + webhook flow.
export async function POST(req: Request) {
  if (!intasendConfigured()) {
    return NextResponse.json(
      { error: "Online giving is not set up yet. Please try again later." },
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

  const amountCheck = validateAmountCents(amount);
  if (!amountCheck.ok) {
    return NextResponse.json({ error: amountCheck.error }, { status: 400 });
  }

  const dest = resolveDesignation(typeof designation === "string" ? designation : null);
  if (!dest) {
    return NextResponse.json(
      { error: "That project is not available for donations." },
      { status: 400 }
    );
  }

  // Unique ref that round-trips through IntaSend's api_ref and back via the
  // webhook. IntaSend's api_ref allows [a-zA-Z0-9-_: ] only.
  const apiRef = `JCFM-${crypto.randomUUID()}`;

  try {
    await prisma.donation.create({
      data: {
        userId: user?.id ?? null,
        donorName,
        amountCents: amountCheck.cents,
        currency: CURRENCY,
        provider: "intasend",
        providerRef: apiRef,
        status: "pending",
        designation: dest.designation,
        designationLabel: dest.label,
        receiptEmail: donorEmail,
      },
    });

    return NextResponse.json({
      apiRef,
      amountUsd: amountCheck.cents / 100,
      comment: `JCFM Donation - ${dest.label}`.slice(0, 140),
    });
  } catch (err) {
    console.error("IntaSend prepare error:", err);
    return NextResponse.json(
      { error: "Could not start the donation. Please try again." },
      { status: 500 }
    );
  }
}

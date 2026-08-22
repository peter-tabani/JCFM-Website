import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { appendDonation } from "@/lib/donations-store";

type PayPalCaptureResponse = {
  status?: string;
  payer?: {
    name?: { given_name?: string; surname?: string };
    email_address?: string;
  };
  purchase_units?: Array<{
    payments?: {
      captures?: Array<{
        id?: string;
        amount?: { value?: string; currency_code?: string };
      }>;
    };
  }>;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = typeof body?.orderId === "string" ? body.orderId.trim() : "";
    const purpose =
      typeof body?.purpose === "string" && body.purpose.trim()
        ? body.purpose.trim().slice(0, 100)
        : "General Fund";

    if (!orderId) {
      return NextResponse.json({ error: "Missing PayPal order ID" }, { status: 400 });
    }

    const capture = (await capturePayPalOrder(orderId)) as PayPalCaptureResponse;

    const captureInfo = capture.purchase_units?.[0]?.payments?.captures?.[0];
    const amountValue = Number(captureInfo?.amount?.value ?? 0);
    const currency = captureInfo?.amount?.currency_code ?? "USD";
    const payerName =
      [capture.payer?.name?.given_name, capture.payer?.name?.surname].filter(Boolean).join(" ") ||
      "Anonymous";

    if (capture.status === "COMPLETED" && amountValue > 0 && captureInfo?.id) {
      await appendDonation({
        id: captureInfo.id,
        date: new Date().toISOString(),
        donor: payerName,
        donorEmail: capture.payer?.email_address,
        channel: "PayPal",
        ref: orderId,
        allocation: purpose,
        amount: amountValue,
        currency,
        status: "received",
      });
    }

    return NextResponse.json({ status: capture.status ?? "UNKNOWN" });
  } catch (err) {
    console.error("PayPal capture-order error:", err);
    return NextResponse.json(
      { error: "Could not complete the PayPal payment. Please try again." },
      { status: 500 }
    );
  }
}

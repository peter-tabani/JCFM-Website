import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body?.amount);
    const purpose =
      typeof body?.purpose === "string" && body.purpose.trim()
        ? body.purpose.trim().slice(0, 100)
        : "General Fund";

    if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
      return NextResponse.json({ error: "Invalid donation amount" }, { status: 400 });
    }

    const order = await createPayPalOrder(amount, purpose);
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error("PayPal create-order error:", err);
    return NextResponse.json(
      { error: "Could not start PayPal checkout. Please try again shortly." },
      { status: 500 }
    );
  }
}

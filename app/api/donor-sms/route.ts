import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────
// Install Twilio: npm install twilio
// Sign up free at https://twilio.com (get $15 free credit)
// Add to .env.local:
//   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//   TWILIO_AUTH_TOKEN=your_auth_token
//   TWILIO_PHONE_NUMBER=+1xxxxxxxxxx  (your Twilio number)
// ─────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const { phone, name } = await req.json();

    if (!phone || !name) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    // Format phone number, ensure it has country code
    // If starts with 0, assume Kenya (+254)
    let formattedPhone = phone.trim();
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "+254" + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+" + formattedPhone;
    }

    const twilio = require("twilio");
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: `Hello ${name}! 🎓 Welcome to the Fountain of Hope Academy donor family. You can now log in to your portal at any time to support our children in Likoni, Mombasa. Thank you for making a difference! Fountain of Hope Academy`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("SMS error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
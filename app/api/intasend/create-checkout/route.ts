import { NextResponse } from "next/server";
import { createIntaSendCheckout } from "@/lib/intasend";
import { buildApiRef } from "@/lib/intasend-shared";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jcfm.online";

// Kept as a working fallback flow — the live donate button now uses
// IntaSend's InlineJS widget instead (see
// components/donate/IntaSendDonateButton.tsx), which creates checkouts
// directly from the browser. This redirect-based route still works if ever
// needed again.

// Only allow redirecting back to a same-site relative path — never let a
// client dictate an arbitrary off-site redirect_url.
function safeRedirectPath(path: unknown): string {
  if (typeof path === "string" && path.startsWith("/") && !path.startsWith("//")) {
    return path;
  }
  return "/donate";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amountUsd = Number(body?.amountUsd);
    const purpose =
      typeof body?.purpose === "string" && body.purpose.trim()
        ? body.purpose.trim().slice(0, 100)
        : "General Fund";
    const redirectPath = safeRedirectPath(body?.redirectPath);

    if (!Number.isFinite(amountUsd) || amountUsd <= 0 || amountUsd > 100_000) {
      return NextResponse.json({ error: "Invalid donation amount" }, { status: 400 });
    }

    // Donors give in USD, and the checkout now charges in USD directly (see
    // the currency note at the top of lib/intasend.ts) — no KES conversion
    // needed here.
    const checkout = await createIntaSendCheckout({
      amount: amountUsd,
      currency: "USD",
      apiRef: buildApiRef(purpose),
      comment: `JCFM Donation — ${purpose}`,
      redirectUrl: `${SITE_URL}${redirectPath}?ist=success`,
      host: SITE_URL,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    console.error("IntaSend create-checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again shortly." },
      { status: 500 }
    );
  }
}

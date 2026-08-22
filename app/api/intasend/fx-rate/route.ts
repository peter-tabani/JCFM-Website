import { NextResponse } from "next/server";
import { getUsdToKesRate } from "@/lib/intasend";

// Best-effort rate for the donate button to show "~ KSh X,xxx" next to the
// USD amount as the donor types. This is a DISPLAY estimate only — the
// authoritative conversion happens again, server-side, at checkout creation
// (see /api/intasend/create-checkout) moments later, so a few seconds of
// rate drift here is harmless.
export async function GET() {
  const rate = await getUsdToKesRate();
  return NextResponse.json({ rate });
}

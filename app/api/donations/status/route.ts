import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const ref = new URL(req.url).searchParams.get("ref");
  if (!ref || !/^JCFM-[0-9a-f-]{36}$/i.test(ref)) {
    return NextResponse.json({ error: "Invalid reference" }, { status: 400 });
  }

  const donation = await prisma.donation.findUnique({
    where: { providerRef: ref },
    select: { status: true, amountCents: true, currency: true, designationLabel: true },
  });
  if (!donation) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(donation, {
    headers: { "Cache-Control": "no-store" },
  });
}

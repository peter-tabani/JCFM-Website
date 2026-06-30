import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Returns the signed-in user's own donations + summary totals.
// Auth-gated: a user can only ever see their own records.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const rows = await prisma.donation.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const year = new Date().getFullYear();
  let lifetimeCents = 0;
  let thisYearCents = 0;
  for (const d of rows) {
    if (d.status !== "succeeded") continue;
    lifetimeCents += d.amountCents;
    if (d.createdAt.getFullYear() === year) thisYearCents += d.amountCents;
  }

  return NextResponse.json({
    memberSince: user.createdAt.toISOString(),
    totals: {
      lifetimeCents,
      thisYearCents,
      count: rows.filter((d) => d.status === "succeeded").length,
    },
    donations: rows.map((d) => ({
      id: d.id,
      amountCents: d.amountCents,
      currency: d.currency,
      provider: d.provider,
      status: d.status,
      designation: d.designation,
      designationLabel: d.designationLabel,
      createdAt: d.createdAt.toISOString(),
    })),
  });
}

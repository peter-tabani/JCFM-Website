import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Read-only: real donations from the live donate flow, for the admin ledger.
export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rows = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
    take: 500,
  });

  const now = new Date();
  let monthCents = 0;
  let lifetimeCents = 0;
  for (const d of rows) {
    if (d.status !== "succeeded") continue;
    lifetimeCents += d.amountCents;
    if (
      d.createdAt.getFullYear() === now.getFullYear() &&
      d.createdAt.getMonth() === now.getMonth()
    ) {
      monthCents += d.amountCents;
    }
  }

  return NextResponse.json({
    totals: {
      monthCents,
      lifetimeCents,
      succeededCount: rows.filter((d) => d.status === "succeeded").length,
      pendingCount: rows.filter((d) => d.status === "pending").length,
    },
    donations: rows.map((d) => ({
      id: d.id,
      donorName: d.user?.name ?? d.donorName ?? null,
      donorEmail: d.user?.email ?? d.receiptEmail ?? null,
      amountCents: d.amountCents,
      currency: d.currency,
      provider: d.provider,
      status: d.status,
      designationLabel: d.designationLabel,
      createdAt: d.createdAt.toISOString(),
    })),
  });
}

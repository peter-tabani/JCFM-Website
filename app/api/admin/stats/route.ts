import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [members, mediaPublished, mediaTotal, monthGifts] = await Promise.all([
    prisma.member.count(),
    prisma.mediaItem.count({ where: { published: true } }),
    prisma.mediaItem.count(),
    prisma.donation.findMany({
      where: { status: "succeeded", createdAt: { gte: monthStart } },
      select: { amountCents: true },
    }),
  ]);

  const givingMonthCents = monthGifts.reduce((s, d) => s + d.amountCents, 0);

  return NextResponse.json({
    members,
    mediaPublished,
    mediaTotal,
    givingMonthCents,
  });
}

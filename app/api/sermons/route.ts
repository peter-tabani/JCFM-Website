import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public: published sermons for the home page. No auth.
export async function GET() {
  const sermons = await prisma.sermon.findMany({
    where: { status: "published" },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    take: 12,
  });
  return NextResponse.json({
    sermons: sermons.map((s) => ({
      id: s.id,
      title: s.title,
      series: s.series,
      preacher: s.preacher,
      branch: s.branch,
      date: s.date ? s.date.toISOString() : null,
      mediaUrl: s.mediaUrl,
    })),
  });
}

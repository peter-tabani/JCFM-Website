import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public: published media for the "Life at JCFM" gallery. No auth.
export async function GET() {
  const media = await prisma.mediaItem.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 60,
  });
  return NextResponse.json({
    media: media.map((m) => ({
      id: m.id,
      type: m.type,
      title: m.title,
      category: m.category,
      url: m.url,
      thumbnail: m.thumbnail,
    })),
  });
}

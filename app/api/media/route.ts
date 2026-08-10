import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public: published media for a gallery. No auth.
// ?section=church (Life at JCFM, default) or ?section=school (Fountain of Hope).
export async function GET(req: Request) {
  const section = new URL(req.url).searchParams.get("section") ?? "church";
  const media = await prisma.mediaItem.findMany({
    where: { published: true, section },
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

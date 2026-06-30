import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public: published events for the home page. No auth.
export async function GET() {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: [{ date: "asc" }, { createdAt: "desc" }],
    take: 24,
  });
  return NextResponse.json({
    events: events.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      location: e.location,
      date: e.date ? e.date.toISOString() : null,
      imageUrl: e.imageUrl,
    })),
  });
}

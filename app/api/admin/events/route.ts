import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const events = await prisma.event.findMany({
    orderBy: [{ date: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ events });
}

export async function POST(req: Request) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });

  const dateRaw = body.date ? String(body.date) : "";
  const date = dateRaw ? new Date(dateRaw) : null;
  if (date && Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      title,
      description: body.description ? String(body.description).trim() : null,
      location: body.location ? String(body.location).trim() : null,
      imageUrl: body.imageUrl ? String(body.imageUrl).trim() : null,
      published: body.published === false ? false : true,
      date,
    },
  });
  return NextResponse.json({ event }, { status: 201 });
}

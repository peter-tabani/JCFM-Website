import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES = ["published", "draft", "scheduled"] as const;

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const sermons = await prisma.sermon.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ sermons });
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
  const preacher = String(body.preacher ?? "").trim();
  const status = String(body.status ?? "published");

  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  if (!preacher) return NextResponse.json({ error: "Preacher is required." }, { status: 400 });
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const dateRaw = body.date ? String(body.date) : "";
  const date = dateRaw ? new Date(dateRaw) : null;
  if (date && Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  const sermon = await prisma.sermon.create({
    data: {
      title,
      preacher,
      status: status as (typeof STATUSES)[number],
      series: body.series ? String(body.series).trim() : null,
      branch: body.branch ? String(body.branch).trim() : null,
      mediaUrl: body.mediaUrl ? String(body.mediaUrl).trim() : null,
      notes: body.notes ? String(body.notes).trim() : null,
      date,
    },
  });
  return NextResponse.json({ sermon }, { status: 201 });
}

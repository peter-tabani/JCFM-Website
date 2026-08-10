import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES = ["image", "video"] as const;
const SECTIONS = ["church", "school"] as const;

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const media = await prisma.mediaItem.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ media });
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

  const type = String(body.type ?? "");
  const title = String(body.title ?? "").trim();
  const category = String(body.category ?? "Worship").trim() || "Worship";
  const url = String(body.url ?? "").trim();
  const sectionRaw = String(body.section ?? "church");
  const section = SECTIONS.includes(sectionRaw as (typeof SECTIONS)[number])
    ? sectionRaw
    : "church";

  if (!TYPES.includes(type as (typeof TYPES)[number])) {
    return NextResponse.json({ error: "Choose image or video." }, { status: 400 });
  }
  if (!title) return NextResponse.json({ error: "A title is required." }, { status: 400 });
  if (!url) {
    return NextResponse.json(
      { error: type === "video" ? "Paste the video link." : "Paste the image URL." },
      { status: 400 }
    );
  }

  const media = await prisma.mediaItem.create({
    data: {
      type: type as (typeof TYPES)[number],
      title,
      category,
      section,
      url,
      thumbnail: body.thumbnail ? String(body.thumbnail).trim() : null,
      published: body.published === false ? false : true,
    },
  });
  return NextResponse.json({ media }, { status: 201 });
}

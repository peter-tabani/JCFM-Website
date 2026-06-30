import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const team = await prisma.teamMember.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json({ team });
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

  const name = String(body.name ?? "").trim();
  const role = String(body.role ?? "").trim();
  const bio = String(body.bio ?? "").trim();

  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!role) return NextResponse.json({ error: "Role is required." }, { status: 400 });
  if (!bio) return NextResponse.json({ error: "A short bio is required." }, { status: 400 });

  const sortRaw = Number(body.sortOrder);
  const member = await prisma.teamMember.create({
    data: {
      name,
      role,
      bio,
      tag: body.tag ? String(body.tag).trim() : null,
      quote: body.quote ? String(body.quote).trim() : null,
      photo: body.photo ? String(body.photo).trim() : null,
      email: body.email ? String(body.email).trim() : null,
      featured: body.featured === true || body.featured === "yes",
      sortOrder: Number.isFinite(sortRaw) ? Math.trunc(sortRaw) : 0,
    },
  });
  return NextResponse.json({ member }, { status: 201 });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES = ["active", "visitor", "inactive"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const members = await prisma.member.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ members });
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
  const branch = String(body.branch ?? "").trim();
  const role = String(body.role ?? "Member").trim() || "Member";
  const status = String(body.status ?? "active");
  const email = body.email ? String(body.email).trim() : "";

  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!branch) return NextResponse.json({ error: "Please choose a branch." }, { status: 400 });
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const member = await prisma.member.create({
    data: {
      name,
      branch,
      role,
      status: status as (typeof STATUSES)[number],
      phone: body.phone ? String(body.phone).trim() : null,
      email: email || null,
      joinedAt: new Date(),
    },
  });
  return NextResponse.json({ member }, { status: 201 });
}

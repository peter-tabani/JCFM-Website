import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/requireAdmin";
import { normalizeLoginPhone } from "@/lib/phone-login";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function newPin() {
  return String(randomInt(10_000_000, 100_000_000));
}

export async function GET() {
  if (!(await getAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const staff = await prisma.user.findMany({
    where: { role: "staff" },
    select: { id: true, name: true, loginPhone: true, createdAt: true, disabledAt: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ staff });
}

export async function POST(req: Request) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const phone = typeof body.phone === "string" ? normalizeLoginPhone(body.phone) : null;
  if (!name) return NextResponse.json({ error: "Enter the staff member's name." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Enter a valid phone number, such as +254 712 345 678." }, { status: 400 });

  const pin = newPin();
  const pinHash = await bcrypt.hash(pin, 12);
  try {
    const staff = await prisma.user.create({
      data: {
        name,
        phone,
        loginPhone: phone,
        email: null,
        role: "staff",
        pinHash,
        mustChangePin: true,
      },
      select: { id: true, name: true, loginPhone: true, createdAt: true, disabledAt: true },
    });
    return NextResponse.json({ staff, temporaryPin: pin }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "An account already uses that phone number." }, { status: 409 });
    }
    throw error;
  }
}

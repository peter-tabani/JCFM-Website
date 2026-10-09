import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";

function newPin() {
  return String(randomInt(10_000_000, 100_000_000));
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await context.params;
  let body: { action?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const account = await prisma.user.findFirst({ where: { id, role: "staff" } });
  if (!account) return NextResponse.json({ error: "Staff account not found." }, { status: 404 });

  if (body.action === "deactivate" || body.action === "activate") {
    const disabledAt = body.action === "deactivate" ? new Date() : null;
    const staff = await prisma.user.update({
      where: { id },
      data: { disabledAt },
      select: { id: true, name: true, loginPhone: true, createdAt: true, disabledAt: true },
    });
    return NextResponse.json({ staff });
  }

  if (body.action === "reset-pin") {
    const temporaryPin = newPin();
    const pinHash = await bcrypt.hash(temporaryPin, 12);
    const staff = await prisma.user.update({
      where: { id },
      data: {
        pinHash,
        mustChangePin: true,
        pinFailedAttempts: 0,
        pinLockedUntil: null,
      },
      select: { id: true, name: true, loginPhone: true, createdAt: true, disabledAt: true },
    });
    return NextResponse.json({ staff, temporaryPin });
  }

  return NextResponse.json({ error: "Unknown staff action." }, { status: 400 });
}

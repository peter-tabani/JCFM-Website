import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "staff" || user.disabledAt) {
    return NextResponse.json({ error: "Please sign in with an active staff account." }, { status: 403 });
  }

  let body: { currentPin?: unknown; newPin?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const currentPin = typeof body.currentPin === "string" ? body.currentPin : "";
  const newPin = typeof body.newPin === "string" ? body.newPin : "";
  if (!/^\d{8}$/.test(newPin)) {
    return NextResponse.json({ error: "Choose a new 8-digit PIN." }, { status: 400 });
  }
  if (!user.pinHash || !(await bcrypt.compare(currentPin, user.pinHash))) {
    return NextResponse.json({ error: "The temporary PIN is incorrect." }, { status: 400 });
  }
  if (currentPin === newPin) {
    return NextResponse.json({ error: "Choose a PIN different from the temporary PIN." }, { status: 400 });
  }

  const pinHash = await bcrypt.hash(newPin, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { pinHash, mustChangePin: false, pinFailedAttempts: 0, pinLockedUntil: null },
  });
  return NextResponse.json({ ok: true });
}

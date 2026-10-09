import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdmin } from "@/lib/requireAdmin";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
  if (newPassword.length < 12 || newPassword.length > 256) {
    return NextResponse.json({ error: "Use a new password with at least 12 characters." }, { status: 400 });
  }
  if (!admin.passwordHash || !(await bcrypt.compare(currentPassword, admin.passwordHash))) {
    return NextResponse.json({ error: "The current password is incorrect." }, { status: 400 });
  }
  if (await bcrypt.compare(newPassword, admin.passwordHash)) {
    return NextResponse.json({ error: "Choose a password different from the current one." }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { id: admin.id }, data: { passwordHash } });
  return NextResponse.json({ ok: true });
}

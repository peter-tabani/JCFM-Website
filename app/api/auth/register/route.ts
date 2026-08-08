import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, phone, password } = (body ?? {}) as Record<string, unknown>;

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.toLowerCase().trim() : "";
  const cleanPhone = typeof phone === "string" ? phone.trim() : "";
  const cleanPassword = typeof password === "string" ? password : "";

  if (!cleanName) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (cleanPassword.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
  if (existing) {
    // Generic message, do not reveal whether it was OAuth vs password.
    return NextResponse.json(
      { error: "An account with that email already exists. Please sign in." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(cleanPassword, 12);

  await prisma.user.create({
    data: {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone || null,
      passwordHash,
      role: isAdminEmail(cleanEmail) ? "admin" : "user",
    },
  });

  // Never return the hash or any secret.
  return NextResponse.json({ ok: true }, { status: 201 });
}

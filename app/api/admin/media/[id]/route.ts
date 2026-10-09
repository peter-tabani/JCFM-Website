import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { del } from "@vercel/blob";
import { getAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const item = await prisma.mediaItem.findUnique({ where: { id } });
  await prisma.mediaItem.deleteMany({ where: { id } });

  // Also remove the file itself if it was uploaded to Vercel Blob.
  if (item && /\.blob\.vercel-storage\.com\//.test(item.url) && process.env.BLOB_READ_WRITE_TOKEN) {
    await del(item.url).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}

// Show / hide an item without deleting it.
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { published?: unknown };
  if (typeof body.published !== "boolean") {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }
  const media = await prisma.mediaItem.update({ where: { id }, data: { published: body.published } });
  return NextResponse.json({ media });
}

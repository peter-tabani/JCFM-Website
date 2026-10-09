import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getPhotoUploader } from "@/lib/requirePhotoUploader";
import { isMediaSection } from "@/lib/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB per photo

// Issues short-lived upload tokens so the browser can send photos straight to
// Vercel Blob (avoids the ~4.5 MB serverless request limit). Admins and photo staff get a
// token. The DB record is created afterwards by POST /api/admin/media.
export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Photo storage is not connected yet. In Vercel, add a Blob store to this project, then redeploy." },
      { status: 503 }
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await req.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const uploader = await getPhotoUploader();
        if (!uploader) throw new Error("Please sign in with an active uploader account.");
        const section = pathname.split("/")[1];
        if (!pathname.startsWith("media/") || !isMediaSection(section)) {
          throw new Error("Unknown section.");
        }
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
          cacheControlMaxAge: 60 * 60 * 24 * 365,
        };
      },
      // Called by Vercel Blob after the upload; the record is saved by the client.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

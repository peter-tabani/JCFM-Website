"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import {
  ImagePlus,
  Loader2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  UploadCloud,
  Check,
  Church,
  GraduationCap,
  Images,
  TentTree,
} from "lucide-react";
import { MEDIA_SECTIONS, type MediaSection } from "@/lib/media";

type MediaItem = {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  section: string;
  url: string;
  thumbnail: string | null;
  published: boolean;
};

type Pending = {
  id: string;
  file: File;
  preview: string;
  status: "waiting" | "uploading" | "done" | "error";
  progress: number;
  error?: string;
};

const MAX_EDGE = 2400; // px, longest side after resizing

const SECTION_ICONS = {
  hero: Images,
  church: Church,
  school: GraduationCap,
  missions: TentTree,
} satisfies Record<MediaSection, typeof Images>;

// Shrink large phone photos in the browser before upload so pages load fast.
// Falls back to the original file if the browser can't decode it.
async function shrink(file: File): Promise<File> {
  if (file.type === "image/gif" || file.size < 600 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    if (!blob || blob.size >= file.size) return file;
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export default function UploadPhotos() {
  const [section, setSection] = useState<MediaSection>("church");
  const [pending, setPending] = useState<Pending[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = MEDIA_SECTIONS.find((s) => s.key === section)!;

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then((d) => setItems(d.media ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Free preview object URLs when the list changes / unmounts.
  const previews = useRef<string[]>([]);
  useEffect(() => {
    previews.current = pending.map((p) => p.preview);
  }, [pending]);
  useEffect(() => () => previews.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const inSection = useMemo(
    () => items.filter((m) => m.section === section && m.type === "image"),
    [items, section]
  );

  function addFiles(list: FileList | File[]) {
    const files = Array.from(list).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) {
      setNotice({ tone: "err", text: "Please choose image files (JPG, PNG or WebP)." });
      return;
    }
    setNotice(null);
    setPending((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
        status: "waiting" as const,
        progress: 0,
      })),
    ]);
  }

  function removePending(id: string) {
    setPending((prev) => {
      const p = prev.find((x) => x.id === id);
      if (p) URL.revokeObjectURL(p.preview);
      return prev.filter((x) => x.id !== id);
    });
  }

  const patch = (id: string, data: Partial<Pending>) =>
    setPending((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));

  async function uploadAll() {
    const queue = pending.filter((p) => p.status === "waiting" || p.status === "error");
    if (queue.length === 0) return;
    setBusy(true);
    setNotice(null);
    let ok = 0;
    let failed = 0;
    const completed = new Set<string>();

    for (const p of queue) {
      patch(p.id, { status: "uploading", progress: 0, error: undefined });
      try {
        const file = await shrink(p.file);
        const safeName = file.name.replace(/[^\w.-]+/g, "-").toLowerCase();
        const blob = await upload(`media/${section}/${safeName}`, file, {
          access: "public",
          handleUploadUrl: "/api/admin/media/upload",
          contentType: file.type,
          onUploadProgress: (e) => patch(p.id, { progress: Math.round(e.percentage) }),
        });
        const res = await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "image",
            section,
            title: section === "school" ? "Academy photo" : section === "missions" ? "Mission photo" : "Ministry photo",
            category: section === "school" ? "School" : section === "missions" ? "Outreach" : "Worship",
            url: blob.url,
            published: true,
          }),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error || "Could not save the photo.");
        }
        patch(p.id, { status: "done", progress: 100 });
        completed.add(p.id);
        ok++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed.";
        patch(p.id, { status: "error", error: msg });
        failed++;
      }
    }

    setBusy(false);
    load();
    // Clear finished items from the queue; keep failures so they can be retried.
    setPending((prev) => {
      prev.filter((x) => completed.has(x.id)).forEach((x) => URL.revokeObjectURL(x.preview));
      return prev.filter((x) => !completed.has(x.id));
    });
    setNotice(
      failed === 0
        ? { tone: "ok", text: `${ok} photo${ok === 1 ? "" : "s"} added to ${current.label}. They are live now.` }
        : { tone: "err", text: `${ok} uploaded, ${failed} failed. Check the messages below and try again.` }
    );
  }

  async function toggle(m: MediaItem) {
    try {
      const res = await fetch(`/api/admin/media/${m.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !m.published }),
      });
      if (!res.ok) throw new Error("Could not change photo visibility.");
      load();
    } catch {
      setNotice({ tone: "err", text: "Could not change photo visibility. Please try again." });
    }
  }

  async function remove(m: MediaItem) {
    if (!confirm("Delete this photo from the website?")) return;
    try {
      const res = await fetch(`/api/admin/media/${m.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not delete photo.");
      load();
    } catch {
      setNotice({ tone: "err", text: "Could not delete the photo. Please try again." });
    }
  }

  const waiting = pending.filter((p) => p.status !== "done").length;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#080808] text-white">
      <div className="mx-auto max-w-[1000px] space-y-9 px-5 py-8 md:px-8 md:py-12">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Upload photos</h1>

        <section>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {MEDIA_SECTIONS.map((s) => {
              const active = s.key === section;
              const Icon = SECTION_ICONS[s.key];
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSection(s.key)}
                  disabled={busy}
                  aria-pressed={active}
                  className={`flex min-h-[76px] items-center gap-4 rounded-xl border px-5 py-4 text-left transition ${
                    active
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-white/[0.04] text-white hover:border-white/45 hover:bg-white/[0.08]"
                  }`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${active ? "bg-black text-white" : "bg-white/10 text-white"}`}>
                    <Icon size={21} />
                  </span>
                  <span className="flex-1 text-[15px] font-semibold">{s.label}</span>
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${active ? "bg-black text-white" : "border border-white/25 text-transparent"}`}>
                    {active && <Check size={15} />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
            }}
            onClick={() => !busy && inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition ${
              dragging ? "border-white bg-white/10" : "border-white/25 bg-white/[0.03] hover:border-white/60 hover:bg-white/[0.06]"
            }`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white">
              <UploadCloud size={27} />
            </span>
            <p className="mt-4 text-base font-semibold text-white">Tap to choose photos, or drag them here</p>
            <p className="mt-2 text-sm text-white/65">You can pick several at once.</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {pending.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {pending.map((p) => (
                <div key={p.id} className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.preview} alt="" className="aspect-square w-full object-cover" />
                  {p.status === "waiting" && !busy && (
                    <button
                      type="button"
                      onClick={() => removePending(p.id)}
                      aria-label="Remove from selection"
                      className="absolute right-1.5 top-1.5 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    >
                      <X size={14} />
                    </button>
                  )}
                  {p.status === "uploading" && (
                    <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/20">
                      <div className="h-full bg-emerald-500 transition-all" style={{ width: `${p.progress}%` }} />
                    </div>
                  )}
                  {p.status === "error" && (
                    <p className="flex items-start gap-1 bg-red-950 p-2 text-[11px] leading-4 text-red-200">
                      <AlertCircle size={12} className="mt-0.5 shrink-0" /> {p.error}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div>
            {notice && (
                <p
                  className={`mb-3 flex items-start gap-2 rounded-md p-3 text-[13px] ${
                    notice.tone === "ok" ? "bg-emerald-950 text-emerald-200" : "bg-red-950 text-red-200"
                  }`}
                >
                  {notice.tone === "ok" ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <AlertCircle size={16} className="mt-0.5 shrink-0" />}
                  {notice.text}
                </p>
              )}
            <button
                type="button"
                onClick={uploadAll}
                disabled={busy || waiting === 0}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 font-semibold text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {busy ? (
                  <><Loader2 size={16} className="animate-spin" /> Uploading…</>
                ) : (
                  <><ImagePlus size={16} /> {waiting > 0 ? `Upload ${waiting} photo${waiting === 1 ? "" : "s"}` : "Upload photos"}</>
                )}
            </button>
          </div>
        </section>

        {/* Existing uploads in this section */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-white/85">
            Photos in {current.label}
          </h2>
          {loading ? (
            <div className="flex justify-center py-10 text-white/50"><Loader2 className="animate-spin" /></div>
          ) : inSection.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-white/55">
              No photos uploaded yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {inSection.map((m) => (
                <div key={m.id} className="overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.thumbnail || m.url}
                      alt="Uploaded photo"
                      className={`aspect-square w-full object-cover ${m.published ? "" : "opacity-40"}`}
                    />
                    {!m.published && (
                      <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">Hidden</span>
                    )}
                  </div>
                  <div className="p-2">
                    <div className="mt-1 flex justify-between">
                      <button
                        onClick={() => toggle(m)}
                        className="inline-flex min-h-11 items-center gap-1 rounded px-2 text-[11px] font-medium text-white/75 hover:bg-white/10"
                      >
                        {m.published ? <><EyeOff size={13} /> Hide</> : <><Eye size={13} /> Show</>}
                      </button>
                      <button
                        onClick={() => remove(m)}
                        className="inline-flex min-h-11 items-center gap-1 rounded px-2 text-[11px] font-medium text-red-300 hover:bg-red-950/60"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import {
  ImagePlus,
  Loader2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  UploadCloud,
} from "lucide-react";
import { PageHeader, GhostButton } from "@/components/admin/ui";
import { MEDIA_CATEGORIES, MEDIA_SECTIONS, type MediaSection } from "@/lib/media";

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

// Sections whose public display has category filters.
const HAS_CATEGORY: MediaSection[] = ["church", "school"];

const MAX_EDGE = 2400; // px, longest side after resizing

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

function titleFromFile(name: string) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || "Photo";
}

export default function UploadPhotos() {
  const [section, setSection] = useState<MediaSection>("church");
  const [category, setCategory] = useState<string>("Worship");
  const [caption, setCaption] = useState("");
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
            title: caption.trim() || titleFromFile(p.file.name),
            category: HAS_CATEGORY.includes(section) ? category : "Worship",
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
    if (ok > 0) setCaption("");
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
    <div>
      <PageHeader
        kicker="Content · Photos"
        title="Upload Photos"
        description="Choose where the photos should appear, select them, and upload. New photos show first in that section; the existing photos stay after them."
        actions={
          <GhostButton icon={ExternalLink} href={current.page}>
            View section
          </GhostButton>
        }
      />

      <div className="mx-auto max-w-[1100px] space-y-8 px-5 py-7 md:px-8 md:py-10">
        {/* 1. Section */}
        <section>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-slate-500">1 · Choose a section</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {MEDIA_SECTIONS.map((s) => {
              const count = items.filter((m) => m.section === s.key && m.type === "image").length;
              const active = s.key === section;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSection(s.key)}
                  disabled={busy}
                  className={`rounded-lg border p-4 text-left transition ${
                    active
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[14px] font-semibold">{s.label}</span>
                    <span className={`text-[11px] ${active ? "text-white/70" : "text-slate-400"}`}>
                      {count} uploaded
                    </span>
                  </span>
                  <span className={`mt-1 block text-[12px] leading-5 ${active ? "text-white/75" : "text-slate-500"}`}>
                    {s.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Photos */}
        <section>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-slate-500">2 · Select photos</h2>
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
              dragging ? "border-slate-900 bg-slate-100" : "border-slate-300 bg-white hover:border-slate-500"
            }`}
          >
            <UploadCloud size={30} className="text-slate-400" />
            <p className="mt-3 text-[14px] font-semibold text-slate-900">Tap to choose photos, or drag them here</p>
            <p className="mt-1 text-[12px] text-slate-500">You can pick several at once. JPG, PNG or WebP. Large photos are resized automatically.</p>
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
                <div key={p.id} className="relative overflow-hidden rounded-lg border border-slate-200 bg-white">
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
                    <p className="flex items-start gap-1 bg-rose-50 p-2 text-[11px] leading-4 text-rose-600">
                      <AlertCircle size={12} className="mt-0.5 shrink-0" /> {p.error}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. Details + upload */}
        <section>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-slate-500">3 · Upload</h2>
          <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-slate-700">Caption (optional)</span>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Sunday Worship Service"
                maxLength={120}
                className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-[14px] text-slate-900 outline-none focus:border-slate-500"
              />
              <span className="mt-1 block text-[11px] text-slate-400">Used for every photo in this batch. Leave blank to use the file names.</span>
            </label>
            {HAS_CATEGORY.includes(section) && (
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-slate-700">Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-[14px] text-slate-900 outline-none focus:border-slate-500"
                >
                  {MEDIA_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
            )}
            <div className="sm:col-span-2">
              {notice && (
                <p
                  className={`mb-3 flex items-start gap-2 rounded-md p-3 text-[13px] ${
                    notice.tone === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"
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
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
              >
                {busy ? (
                  <><Loader2 size={16} className="animate-spin" /> Uploading…</>
                ) : (
                  <><ImagePlus size={16} /> {waiting > 0 ? `Upload ${waiting} photo${waiting === 1 ? "" : "s"} to ${current.label}` : "Select photos first"}</>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Existing uploads in this section */}
        <section>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
            Uploaded to {current.label}
          </h2>
          {loading ? (
            <div className="flex justify-center py-10 text-slate-400"><Loader2 className="animate-spin" /></div>
          ) : inSection.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-center text-[13px] text-slate-500">
              No uploads here yet. The section is showing its built-in photos.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {inSection.map((m) => (
                <div key={m.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.thumbnail || m.url}
                      alt={m.title}
                      className={`aspect-square w-full object-cover ${m.published ? "" : "opacity-40"}`}
                    />
                    {!m.published && (
                      <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">Hidden</span>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="truncate text-[12px] font-medium text-slate-800">{m.title}</p>
                    <div className="mt-1 flex justify-between">
                      <button
                        onClick={() => toggle(m)}
                        className="inline-flex min-h-11 items-center gap-1 rounded px-2 text-[11px] font-medium text-slate-600 hover:bg-slate-100"
                      >
                        {m.published ? <><EyeOff size={13} /> Hide</> : <><Eye size={13} /> Show</>}
                      </button>
                      <button
                        onClick={() => remove(m)}
                        className="inline-flex min-h-11 items-center gap-1 rounded px-2 text-[11px] font-medium text-rose-600 hover:bg-rose-50"
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

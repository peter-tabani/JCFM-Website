"use client";

import { useCallback, useEffect, useState } from "react";
import { Images, Film, ImagePlus, Trash2, Loader2, Eye, EyeOff, PlayCircle, ExternalLink } from "lucide-react";
import {
  PageHeader,
  StatCard,
  StatusPill,
  PrimaryButton,
  GhostButton,
} from "@/components/admin/ui";
import { FormModal, Field, SelectField } from "@/components/admin/AdminForm";
import { MEDIA_CATEGORIES, videoThumb } from "@/lib/media";

type MediaItem = {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  section: "church" | "school";
  url: string;
  thumbnail: string | null;
  published: boolean;
};

const SECTION_LABELS: Record<string, string> = {
  church: "Life at JCFM",
  school: "Fountain of Hope",
};

export default function AdminMedia() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<"image" | "video">("image");
  const [tab, setTab] = useState<"all" | "church" | "school">("all");

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then((d) => setItems(d.media ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const shown = tab === "all" ? items : items.filter((m) => m.section === tab);
  const videos = shown.filter((m) => m.type === "video").length;
  const images = shown.filter((m) => m.type === "image").length;
  const published = shown.filter((m) => m.published).length;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = { ...raw, type, published: raw.published !== "no" };
    const res = await fetch("/api/admin/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Could not save.");
      return;
    }
    setOpen(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this item from the gallery?")) return;
    await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    load();
  }

  const thumbOf = (m: MediaItem) =>
    m.type === "video" ? videoThumb(m.url, m.thumbnail) : m.thumbnail || m.url;

  return (
    <div>
      <PageHeader
        kicker="Content · Galleries"
        title="Photos & Videos"
        description="Upload photos and videos (including sermons). Choose which gallery each item belongs to: Life at JCFM (church) or Fountain of Hope Academy (school)."
        actions={
          <>
            <GhostButton icon={ExternalLink} href="/#gallery">Life at JCFM</GhostButton>
            <GhostButton icon={ExternalLink} href="/school#gallery">Academy</GhostButton>
            <PrimaryButton icon={ImagePlus} onClick={() => { setError(null); setType("image"); setOpen(true); }}>
              Upload
            </PrimaryButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Images} label="Items" value={String(shown.length)} sub="Photos + videos" />
          <StatCard icon={ImagePlus} label="Photos" value={String(images)} sub="Images" />
          <StatCard icon={Film} label="Videos" value={String(videos)} sub="Incl. sermons" />
          <StatCard icon={Eye} label="Published" value={String(published)} sub="Visible on site" />
        </div>

        {/* Gallery filter */}
        <div className="flex flex-wrap gap-2">
          {([
            { key: "all", label: `All (${items.length})` },
            { key: "church", label: `Life at JCFM (${items.filter((m) => m.section === "church").length})` },
            { key: "school", label: `Fountain of Hope (${items.filter((m) => m.section === "school").length})` },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-md border px-3 py-2 text-[12px] font-semibold transition ${
                tab === t.key
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400"><Loader2 className="animate-spin" /></div>
        ) : shown.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center">
            <p className="text-[14px] font-semibold text-slate-900">Nothing here yet</p>
            <p className="mt-1 text-[13px] text-slate-500">Upload a photo or video and pick a gallery, it appears on the public site.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((m) => {
              const thumb = thumbOf(m);
              return (
                <div key={m.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <div className="relative aspect-[16/10] w-full bg-slate-100">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt={m.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <Film size={28} />
                      </div>
                    )}
                    {m.type === "video" && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle size={40} className="text-white drop-shadow-lg" />
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-slate-900">{m.title}</p>
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">{m.category} · {m.type}</p>
                        <span className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                          {SECTION_LABELS[m.section] ?? m.section}
                        </span>
                      </div>
                      <StatusPill label={m.published ? "Live" : "Hidden"} tone={m.published ? "success" : "neutral"} />
                    </div>
                    <div className="mt-3 flex justify-end border-t border-slate-100 pt-3">
                      <button onClick={() => handleDelete(m.id)} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md px-3 text-[12px] font-medium text-rose-600 hover:bg-rose-50">
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <FormModal title="Upload photo or video" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type toggle, what are you uploading? */}
          <div>
            <span className="mb-1.5 block text-[12px] font-medium text-slate-700">What are you uploading?</span>
            <div className="flex rounded-md border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setType("image")}
                className={`flex flex-1 items-center justify-center gap-2 rounded py-2.5 text-sm font-semibold transition ${type === "image" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
              >
                <ImagePlus size={15} /> Photo
              </button>
              <button
                type="button"
                onClick={() => setType("video")}
                className={`flex flex-1 items-center justify-center gap-2 rounded py-2.5 text-sm font-semibold transition ${type === "video" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
              >
                <Film size={15} /> Video / Sermon
              </button>
            </div>
          </div>

          <SelectField
            label="Which gallery?"
            name="section"
            required
            defaultValue={tab === "school" ? "school" : "church"}
            options={[
              { value: "church", label: "Life at JCFM (church home page)" },
              { value: "school", label: "Fountain of Hope Academy (school page)" },
            ]}
          />
          <Field label="Title" name="title" required placeholder={type === "video" ? "e.g. Sunday Sermon, Walking by Faith" : "e.g. Sunday Worship Service"} />
          <SelectField
            label="Category"
            name="category"
            required
            defaultValue="Worship"
            options={MEDIA_CATEGORIES.map((c) => ({ value: c, label: c }))}
          />
          <Field
            label={type === "video" ? "Video link (YouTube / Vimeo)" : "Image URL"}
            name="url"
            required
            placeholder={type === "video" ? "https://youtube.com/watch?v=…" : "https://… or /images/…"}
          />
          {type === "video" && (
            <Field label="Thumbnail image URL (optional)" name="thumbnail" placeholder="Leave blank to auto-use the YouTube still" />
          )}
          <SelectField
            label="Visibility"
            name="published"
            defaultValue="yes"
            options={[
              { value: "yes", label: "Published (show on site)" },
              { value: "no", label: "Hidden (draft)" },
            ]}
          />

          {error && <p className="rounded-md bg-rose-50 p-3 text-[13px] text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Add to gallery"}
          </button>
        </form>
      </FormModal>
    </div>
  );
}

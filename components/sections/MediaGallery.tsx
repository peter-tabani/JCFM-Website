"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Play, Images, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { toEmbedUrl, videoThumb, isDirectVideo } from "@/lib/media";

type GalleryItem = {
  type: "image" | "video";
  src: string; // image URL or video embed URL
  thumb: string; // thumbnail URL
  caption: string;
  tag: string;
};

// Fallback shown only until the admin uploads media (Admin → Life at JCFM).
const FALLBACK_ITEMS: GalleryItem[] = [
  { type: "image", src: "https://images.unsplash.com/photo-1438232992991-995b671e4668?w=800&q=80", thumb: "https://images.unsplash.com/photo-1438232992991-995b671e4668?w=400&q=70", caption: "Sunday Worship Service", tag: "Worship" },
  { type: "image", src: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80", thumb: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=70", caption: "Prayer & Intercession", tag: "Prayer" },
  { type: "image", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", thumb: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=70", caption: "Children's Sunday School", tag: "Children" },
  { type: "image", src: "https://images.unsplash.com/photo-1543269664-7eef42226a21?w=800&q=80", thumb: "https://images.unsplash.com/photo-1543269664-7eef42226a21?w=400&q=70", caption: "Community Outreach", tag: "Outreach" },
  { type: "image", src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80", thumb: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=70", caption: "Women's Fellowship", tag: "Fellowship" },
  { type: "image", src: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=800&q=80", thumb: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=400&q=70", caption: "Youth Ministry", tag: "Youth" },
];

type ApiMedia = {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  url: string;
  thumbnail: string | null;
};

export default function MediaGallery() {
  const [dbItems, setDbItems] = useState<GalleryItem[] | null>(null);
  const [activeTag, setActiveTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("/api/media")
      .then((r) => (r.ok ? r.json() : { media: [] }))
      .then((d: { media: ApiMedia[] }) => {
        const mapped: GalleryItem[] = (d.media ?? []).map((m) => ({
          type: m.type,
          src: m.type === "video" ? toEmbedUrl(m.url) : m.url,
          thumb:
            m.type === "video"
              ? videoThumb(m.url, m.thumbnail) ?? m.thumbnail ?? ""
              : m.thumbnail || m.url,
          caption: m.title,
          tag: m.category,
        }));
        setDbItems(mapped);
      })
      .catch(() => setDbItems([]));
  }, []);

  // Admin-uploaded media when present; otherwise the demo fallback.
  const items = dbItems && dbItems.length > 0 ? dbItems : FALLBACK_ITEMS;

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.tag)))],
    [items]
  );

  const filtered = useMemo(
    () => (activeTag === "All" ? items : items.filter((i) => i.tag === activeTag)),
    [items, activeTag]
  );

  // 8 boxes on desktop / 3 on mobile by default; the rest sit behind "See More".
  const desktopVisible = expanded ? filtered : filtered.slice(0, 8);
  const desktopHasMore = filtered.length > 8;
  const mobileVisible = expanded ? filtered : filtered.slice(0, 3);
  const mobileHasMore = filtered.length > 3;

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));
  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="gallery" className="border-b border-white/10 bg-[#0b0b1a]">
      {/* ── Parallax hero strip ── */}
      <div
        className="relative flex h-[340px] items-center justify-center overflow-hidden md:h-[440px]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b671e4668?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#0b0b1a]/70" />
        <div className="relative z-10 px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[1px] w-14 bg-[#15803d]" />
            <Images size={16} className="text-[#15803d]" strokeWidth={1.75} />
            <span className="h-[1px] w-14 bg-[#15803d]" />
          </div>
          <h2 className="font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.04em] text-white md:text-5xl">
            Life at JCFM
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-white/70 md:text-[15px]">
            Photos, sermons and moments from worship, fellowship and community across our branches.
          </p>
        </div>
      </div>

      {/* ── Filter tabs (desktop) ── */}
      <div className="mx-auto hidden max-w-[1400px] px-5 pt-10 sm:px-6 md:block">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] transition ${
                activeTag === tag
                  ? "border-[#15803d] bg-[#15803d] text-white"
                  : "border-white/20 text-white/60 hover:border-[#15803d] hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Media grid ── */}
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-6 md:py-14">
        {/* Mobile */}
        <div className="grid gap-4 md:hidden">
          {mobileVisible.map((item, idx) => (
            <GalleryCard key={idx} item={item} onClick={() => openLightbox(idx)} />
          ))}
          {mobileHasMore && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-[#86efac] hover:text-[#86efac]"
            >
              {expanded ? "Show Less" : "See More"}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden grid-cols-2 gap-4 sm:grid-cols-3 md:grid lg:grid-cols-3 xl:grid-cols-4">
          {desktopVisible.map((item, idx) => (
            <GalleryCard key={idx} item={item} onClick={() => openLightbox(idx)} />
          ))}
        </div>

        {/* See More (desktop) */}
        {desktopHasMore && (
          <div className="mt-8 hidden justify-center md:flex">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-[#86efac] hover:text-[#86efac]"
            >
              {expanded ? "Show Less" : "See More"}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        )}
      </div>

      {/* ── Lightbox (watch screen with arrows) ── */}
      {active && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4" onClick={closeLightbox}>
          <button className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-white/10 text-white transition hover:bg-white/20" onClick={closeLightbox}>
            <X size={20} />
          </button>
          <button className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition hover:bg-white/20 md:left-6" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={26} />
          </button>

          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {active.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={active.src} alt={active.caption} className="mx-auto max-h-[80vh] w-full object-contain" />
            ) : isDirectVideo(active.src) ? (
              <video
                src={active.src}
                controls
                autoPlay
                playsInline
                className="mx-auto max-h-[80vh] w-full bg-black"
              />
            ) : (
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe src={active.src} className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen" allowFullScreen />
              </div>
            )}
            <div className="mt-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#86efac]">{active.tag}</span>
              <p className="mt-1 text-[15px] font-semibold text-white">{active.caption}</p>
              <p className="mt-1 text-[12px] text-white/40">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>

          <button className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition hover:bg-white/20 md:right-6" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </section>
  );
}

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_18px_45px_rgba(15,23,42,0.9)] focus:outline-none"
    >
      <div className="aspect-[4/3] w-full">
        {item.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.thumb} alt={item.caption} className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-75" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/30">
            <Play size={28} />
          </div>
        )}
      </div>
      {item.type === "video" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
            <Play size={22} fill="currentColor" className="ml-1" />
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#86efac]">{item.tag}</span>
        <span className="mt-1 text-[13px] font-semibold leading-tight text-white">{item.caption}</span>
      </div>
    </button>
  );
}

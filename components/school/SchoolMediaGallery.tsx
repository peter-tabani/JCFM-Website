"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Play, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { toEmbedUrl, videoThumb, isDirectVideo } from "@/lib/media";

type GalleryItem = {
  type: "image" | "video";
  src: string; // image URL or video embed URL
  thumb: string; // thumbnail URL
  caption: string;
  tag: string;
};

// Shown only until the admin uploads Fountain of Hope media (Admin -> Photos &
// Videos -> "Fountain of Hope Academy"). Local files so it never looks empty.
const FALLBACK_ITEMS: GalleryItem[] = [
  { type: "image", src: "/images/fountain-of-hope-hero.jpg", thumb: "/images/fountain-of-hope-hero.jpg", caption: "Our Campus", tag: "Campus" },
  { type: "image", src: "/images/SundaySchoolSeatedLesson.jpg", thumb: "/images/SundaySchoolSeatedLesson.jpg", caption: "In the Classroom", tag: "Learning" },
  { type: "image", src: "/images/SundaySchoolSeated.jpg", thumb: "/images/SundaySchoolSeated.jpg", caption: "Pupils at Fountain of Hope", tag: "Pupils" },
];

type ApiMedia = {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  url: string;
  thumbnail: string | null;
};

export default function SchoolMediaGallery() {
  const [dbItems, setDbItems] = useState<GalleryItem[] | null>(null);
  const [activeTag, setActiveTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("/api/media?section=school")
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
    <section id="gallery" className="bg-white">
      {/* ── Header ── */}
      <div className="border-b border-[#d4d0c4] bg-[#f8f6ee]">
        <div className="mx-auto max-w-[1100px] px-5 py-12 text-center sm:px-6 md:py-16">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[2px] w-10 bg-[#15803d]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
              Gallery
            </p>
            <span className="h-[2px] w-10 bg-[#15803d]" />
          </div>
          <h2 className="mt-4 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] text-[#0b2545] sm:text-4xl md:text-5xl">
            Life at Fountain of Hope
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-slate-600 md:text-[15px]">
            Moments from our classrooms, worship, sports and community at Fountain
            of Hope Academy.
          </p>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      {tags.length > 2 && (
        <div className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-6 md:pt-10">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                  activeTag === tag
                    ? "border-[#0b2545] bg-[#0b2545] text-white"
                    : "border-[#d4d0c4] text-slate-500 hover:border-[#15803d] hover:text-[#0b2545]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

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
              className="mt-2 inline-flex items-center justify-center gap-2 border border-[#0b2545] bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0b2545] transition hover:bg-[#0b2545] hover:text-white"
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
              className="inline-flex items-center justify-center gap-2 border border-[#0b2545] bg-white px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0b2545] transition hover:bg-[#0b2545] hover:text-white"
            >
              {expanded ? "Show Less" : "See More"}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
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
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a961]">{active.tag}</span>
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
      className="group relative block w-full overflow-hidden border border-[#d4d0c4] bg-[#f8f6ee] shadow-sm focus:outline-none"
    >
      <div className="aspect-[4/3] w-full">
        {item.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.thumb} alt={item.caption} className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-90" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
            <Play size={28} />
          </div>
        )}
      </div>
      {item.type === "video" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#15803d] text-white shadow-lg">
            <Play size={22} fill="currentColor" className="ml-1" />
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0b2545]/85 via-[#0b2545]/20 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a961]">{item.tag}</span>
        <span className="mt-1 text-[13px] font-semibold leading-tight text-white">{item.caption}</span>
      </div>
    </button>
  );
}

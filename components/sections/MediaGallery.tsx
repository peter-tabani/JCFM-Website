"use client";

import { useState } from "react";
import { X, Play, Images, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

const GALLERY_ITEMS = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1438232992991-995b671e4668?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1438232992991-995b671e4668?w=400&q=70",
    caption: "Sunday Worship Service",
    tag: "Worship",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=70",
    caption: "Prayer & Intercession",
    tag: "Prayer",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=70",
    caption: "Children's Sunday School",
    tag: "Children",
  },
  {
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumb: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=70",
    caption: "Sermon Highlight",
    tag: "Sermon",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1543269664-7eef42226a21?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1543269664-7eef42226a21?w=400&q=70",
    caption: "Community Outreach",
    tag: "Outreach",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=70",
    caption: "Women's Fellowship",
    tag: "Fellowship",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=400&q=70",
    caption: "Youth Ministry",
    tag: "Youth",
  },
  {
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumb: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=400&q=70",
    caption: "Praise & Worship Night",
    tag: "Worship",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=70",
    caption: "Fountain of Hope Academy",
    tag: "School",
  },
];

const TAGS = ["All", ...Array.from(new Set(GALLERY_ITEMS.map((i) => i.tag)))];

export default function MediaGallery() {
  const [activeTag, setActiveTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showMobileAll, setShowMobileAll] = useState(false);

  const filtered =
    activeTag === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.tag === activeTag);

  const desktopVisible = filtered.slice(0, 8);
  const mobileVisible = showMobileAll ? filtered : filtered.slice(0, 3);
  const mobileHasMore = filtered.length > 3;

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="gallery" className="border-b border-slate-200 bg-[#0b0b1a]">

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
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[1px] w-14 bg-[#15803d]" />
            <Images size={16} className="text-[#15803d]" strokeWidth={1.75} />
            <span className="h-[1px] w-14 bg-[#15803d]" />
          </div>
          <h2 className="font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.04em] text-white md:text-5xl">
            Life at JCFM
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-white/70 md:text-[15px]">
            A glimpse into worship, fellowship, and community across our branches.
          </p>
        </div>
      </div>

      {/* ── Filter tabs (desktop only) ── */}
      <div className="mx-auto hidden max-w-[1400px] px-5 pt-10 sm:px-6 md:block">
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] transition border ${
                activeTag === tag
                  ? "bg-[#15803d] border-[#15803d] text-white"
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
        {/* Mobile: minimal peek with See More */}
        <div className="grid gap-4 md:hidden">
          {mobileVisible.map((item, idx) => (
            <button
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_14px_40px_rgba(15,23,42,0.55)] focus:outline-none"
            >
              <div className="aspect-[4/3] w-full">
                <img
                  src={item.thumb}
                  alt={item.caption}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-80"
                />
              </div>
              {item.type === "video" && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-[0_10px_26px_rgba(0,0,0,0.6)]">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#86efac]">
                  {item.tag}
                </span>
                <span className="mt-1 text-[13px] font-semibold text-white leading-tight">
                  {item.caption}
                </span>
              </div>
            </button>
          ))}

          {mobileHasMore && (
            <button
              onClick={() => setShowMobileAll((v) => !v)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-[#86efac] hover:text-[#86efac]"
            >
              {showMobileAll ? "Show Less" : "See More"}
              {showMobileAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>

        {/* Desktop grid (unchanged) */}
        <div className="hidden grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:grid">
          {desktopVisible.map((item, idx) => (
            <button
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_18px_45px_rgba(15,23,42,0.9)] focus:outline-none"
            >
              <div className="aspect-[4/3] w-full">
                <img
                  src={item.thumb}
                  alt={item.caption}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
              </div>
              {item.type === "video" && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
                    <Play size={22} fill="currentColor" className="ml-1" />
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 p-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#86efac]">
                  {item.tag}
                </span>
                <span className="mt-1 text-[13px] font-semibold text-white leading-tight">
                  {item.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {active && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition md:left-6"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={26} />
          </button>

          {/* Content */}
          <div
            className="relative max-h-[85vh] max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {active.type === "image" ? (
              <img
                src={active.src}
                alt={active.caption}
                className="mx-auto max-h-[80vh] w-full object-contain"
              />
            ) : (
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={active.src}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            )}
            <div className="mt-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#86efac]">
                {active.tag}
              </span>
              <p className="mt-1 text-[15px] font-semibold text-white">{active.caption}</p>
              <p className="mt-1 text-[12px] text-white/40">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition md:right-6"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </section>
  );
}

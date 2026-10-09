"use client";

import { useEffect, useState } from "react";

// Home hero slideshow. Admin uploads (Upload Photos → Homepage hero) come
// first, then the built-in images; the original hero image is last.
const IMAGES = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/JCFM_Hero.jpg",
];

export default function HeroSlideshow() {
  const [images, setImages] = useState<string[]>(IMAGES);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/media?section=hero")
      .then((r) => (r.ok ? r.json() : { media: [] }))
      .then((d: { media?: { type: string; url: string }[] }) => {
        const uploads = (d.media ?? []).filter((m) => m.type === "image").map((m) => m.url);
        if (uploads.length > 0) setImages([...uploads, ...IMAGES]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full scale-[1.03] object-cover object-center brightness-[0.72] contrast-[1.06] saturate-[1.05] transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

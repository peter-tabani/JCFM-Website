"use client";

import { useEffect, useState } from "react";

// Home hero slideshow. New images first; the original hero image is last.
const IMAGES = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/JCFM_Hero.jpg",
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0">
      {IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full scale-[1.03] object-cover object-center brightness-[0.72] contrast-[1.06] saturate-[1.05] transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

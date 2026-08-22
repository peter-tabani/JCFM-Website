"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselImage = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Auto-sliding image carousel.
 * - Advances on its own every `interval` ms
 * - Pauses while the pointer is hovering
 * - Prev/next arrows + clickable dots for manual control
 */
export default function ImageCarousel({
  images,
  interval = 5000,
  className = "",
}: {
  images: CarouselImage[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [paused, count, interval]);

  if (count === 0) return null;

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photo gallery"
    >
      {/* Sliding track */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={img.src + i} className="relative h-full w-full shrink-0">
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
            />
            {img.caption && (
              <>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-6 pb-8 text-center font-serif text-[13px] italic text-white/85 md:text-[14px]">
                  {img.caption}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Arrows */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/30 text-white opacity-0 backdrop-blur-sm transition hover:border-[#7c3aed] hover:bg-[#7c3aed] focus-visible:opacity-100 group-hover:opacity-100 md:left-5"
          >
            <ChevronLeft size={20} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/30 text-white opacity-0 backdrop-blur-sm transition hover:border-[#7c3aed] hover:bg-[#7c3aed] focus-visible:opacity-100 group-hover:opacity-100 md:right-5"
          >
            <ChevronRight size={20} strokeWidth={2.25} />
          </button>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-7 bg-[#15803d]"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

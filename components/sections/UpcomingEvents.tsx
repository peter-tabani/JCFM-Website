"use client";

import { siteData } from "@/data/site";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

export default function UpcomingEvents() {
  const posters = siteData.eventPosters ?? [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (!posters.length) return null;

  return (
    <section id="events" className="border-b border-white/10 bg-[#080b16]">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6 md:py-20">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Upcoming Events
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-20 bg-[#15803d]" />
        </div>

        <div className="mt-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-0 md:grid md:grid-cols-3 md:gap-6">
              {posters.map((poster) => (
                <div
                  key={`${poster.label}-${poster.note}`}
                  className="flex-[0_0_100%] md:flex-none"
                >
                  <figure className="group relative aspect-square w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_22px_55px_rgba(0,0,0,0.45)]">
                    {poster.image ? (
                      <img
                        src={poster.image}
                        alt={poster.label}
                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-white/20 bg-white/[0.03]">
                        <span className="sr-only">
                          {poster.label} - {poster.note}
                        </span>
                      </div>
                    )}
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "w-8 bg-[#15803d]"
                    : "w-2 bg-white/25"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

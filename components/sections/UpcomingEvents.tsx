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
    <section id="events" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6 md:py-20">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#0f172a] sm:text-4xl">
            Upcoming Events
          </h2>
        </div>

        <div className="mt-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-0 md:grid md:grid-cols-3 md:gap-6">
              {posters.map((poster) => (
                <div
                  key={`${poster.label}-${poster.note}`}
                  className="flex-[0_0_100%] md:flex-none"
                >
                  <figure className="group relative aspect-square w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-[0_18px_35px_rgba(15,23,42,0.18)]">
                    {poster.image ? (
                      <img
                        src={poster.image}
                        alt={poster.label}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-slate-300 bg-white">
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
                    : "w-2 bg-slate-300"
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

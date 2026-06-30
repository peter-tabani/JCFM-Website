"use client";

import { siteData } from "@/data/site";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

type DbEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  date: string | null;
  imageUrl: string | null;
};

type Slide = {
  key: string;
  image?: string | null;
  title?: string;
  meta?: string;
};

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

export default function UpcomingEvents() {
  const [dbEvents, setDbEvents] = useState<DbEvent[] | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => (r.ok ? r.json() : { events: [] }))
      .then((d) => setDbEvents(d.events ?? []))
      .catch(() => setDbEvents([]));
  }, []);

  // Use admin-created events when present; otherwise fall back to the static
  // poster placeholders so the section is never empty.
  const slides: Slide[] =
    dbEvents && dbEvents.length > 0
      ? dbEvents.map((e) => ({
          key: e.id,
          image: e.imageUrl,
          title: e.title,
          meta: [fmtDate(e.date), e.location].filter(Boolean).join(" · "),
        }))
      : (siteData.eventPosters ?? []).map((p, i) => ({ key: `${p.label}-${i}`, image: p.image }));

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
    emblaApi.reInit();
  }, [emblaApi, onSelect, slides.length]);

  if (!slides.length) return null;

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
              {slides.map((slide) => (
                <div key={slide.key} className="flex-[0_0_100%] md:flex-none">
                  <figure className="group relative aspect-square w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_22px_55px_rgba(0,0,0,0.45)]">
                    {slide.image ? (
                      <img
                        src={slide.image}
                        alt={slide.title ?? "Event"}
                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
                        <span className="font-serif text-2xl font-semibold leading-tight text-white">
                          {slide.title}
                        </span>
                        {slide.meta && (
                          <span className="text-[13px] uppercase tracking-[0.18em] text-[#86efac]">
                            {slide.meta}
                          </span>
                        )}
                      </div>
                    )}
                    {slide.image && slide.title && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left">
                        <p className="font-serif text-lg font-semibold text-white">{slide.title}</p>
                        {slide.meta && <p className="text-[12px] text-white/70">{slide.meta}</p>}
                      </figcaption>
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
                  index === selectedIndex ? "w-8 bg-[#15803d]" : "w-2 bg-white/25"
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

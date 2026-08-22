import { Camera } from "lucide-react";

const TILES = [
  { src: "/images/hero/kecs-gate.webp", caption: "Main Gate · Nzoia Campus", tag: "Campus" },
  { src: "/images/hero/jcfm-hero.webp", caption: "Sunday Worship at the HQ Sanctuary", tag: "Faith" },
  { src: "/images/stories/member-01.jpg", caption: "Morning Devotion & Assembly", tag: "Faith" },
  { src: "/images/stories/member-02.jpg", caption: "Lower Primary Classroom", tag: "Learning" },
  { src: "/images/stories/member-03.jpg", caption: "Co-Curricular: Athletics Day", tag: "Sport" },
  { src: "/images/staff/director.png", caption: "Head Teacher with Pupils", tag: "People" },
  { src: "/images/hero/jcfm-hero.webp", caption: "School Garden &amp; Agriculture Club", tag: "Talent" },
];

export default function SchoolGallery() {
  return (
    <section id="gallery" className="border-b border-[#d4d0c4] bg-white">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Camera size={16} strokeWidth={1.75} className="text-[#15803d]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
                A Look Around
              </p>
            </div>
            <h2 className="mt-3 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] text-[#0b2545] sm:text-3xl md:text-5xl">
              Life at the Academy
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
            A few snapshots from a typical week &mdash; in class, at chapel, on
            the field, and on the playground.
          </p>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div className="md:hidden">
          <div className="flex items-center justify-between border-b border-[#d4d0c4] pb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0b2545]">
              {TILES.length} Photos
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Swipe →
            </p>
          </div>
          <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {TILES.map((t, i) => (
              <figure
                key={i}
                className="relative w-[78vw] shrink-0 snap-center overflow-hidden border-2 border-[#d4d0c4] bg-[#f8f6ee]"
              >
                <div
                  className="h-56 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${t.src}')` }}
                />
                <figcaption className="border-t-2 border-[#15803d] bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                    {t.tag}
                  </p>
                  <p
                    className="mt-1 font-serif text-sm text-[#0b2545]"
                    dangerouslySetInnerHTML={{ __html: t.caption }}
                  />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Desktop: editorial mosaic grid */}
        <div className="hidden grid-cols-4 gap-3 md:grid lg:grid-cols-6 lg:gap-4">
          {TILES.map((t, i) => {
            const span =
              i === 0
                ? "lg:col-span-3 lg:row-span-2"
                : i === 1
                ? "lg:col-span-2"
                : i === 4
                ? "lg:col-span-2 lg:row-span-2"
                : "lg:col-span-1";
            const colSpanMd = i === 0 ? "md:col-span-2 md:row-span-2" : i === 4 ? "md:col-span-2" : "md:col-span-1";
            const height = i === 0 || i === 4 ? "h-72 md:h-[420px]" : "h-44 md:h-[200px]";
            return (
              <figure
                key={i}
                className={`group relative overflow-hidden border-2 border-[#d4d0c4] bg-[#f8f6ee] ${colSpanMd} ${span} ${height}`}
              >
                <div
                  className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${t.src}')` }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 border-t-2 border-[#15803d] bg-white/95 p-3 opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                    {t.tag}
                  </p>
                  <p
                    className="mt-0.5 font-serif text-[13px] text-[#0b2545]"
                    dangerouslySetInnerHTML={{ __html: t.caption }}
                  />
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p className="mt-8 text-center font-serif text-[13px] italic text-slate-600 md:mt-10 md:text-sm">
          A full photo journal will be published every term. Follow our
          social channels for the latest updates.
        </p>
      </div>
    </section>
  );
}

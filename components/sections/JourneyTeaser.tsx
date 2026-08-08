import Link from "next/link";
import { Flame, Building2, Network, ArrowRight, BookOpen } from "lucide-react";

const PREVIEW = [
  {
    icon: Flame,
    year: "2008",
    title: "Humble Beginnings",
    sub: "Sikalame · First gathering",
    accent: "bg-[#dc2626] border-[#dc2626]",
    text: "text-[#dc2626]",
  },
  {
    icon: Building2,
    year: "2015",
    title: "Brick & Mortar",
    sub: "Nzoia HQ · 250 worshippers",
    accent: "bg-[#4c1d95] border-[#4c1d95]",
    text: "text-[#4c1d95]",
  },
  {
    icon: Network,
    year: "Today",
    title: "Nine Branches",
    sub: "5 counties · 500+ weekly",
    accent: "bg-[#15803d] border-[#15803d]",
    text: "text-[#15803d]",
  },
];

export default function JourneyTeaser() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden border-b border-slate-200 bg-[#4c1d95] text-white"
    >
      {/* Decorative paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #c4b5fd 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Faint hero wash */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#4c1d95]/90 via-[#4c1d95]/85 to-[#4c1d95]" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-14 sm:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          {/* Left: copy & CTA */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#c4b5fd] md:w-16" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c4b5fd]">
                The Story So Far
              </p>
            </div>

            <h2 className="mt-5 font-serif text-[30px] font-semibold uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl md:text-[56px]">
              Growing in Grace
              <br />
              <span className="text-[#c4b5fd]">Across Kenya</span>
            </h2>

            <div className="mt-5 h-[2px] w-16 bg-[#15803d] md:mt-7 md:w-20" />

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/85 md:mt-7 md:text-[17px] md:leading-8">
              What began as a small gathering of believers in Sikalame has
              grown into a network of churches and a school reaching communities
              across Kenya.
            </p>
            <p className="mt-3 max-w-xl text-[14px] leading-7 text-white/70 md:text-[15px] md:leading-8">
              Through faith, prayer, and the generous support of many, Jesus
              Christ Founder Ministry continues to expand its work, establishing
              churches, educating children, and serving communities in the name of
              the Lord.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-0 md:mt-10">
              <Link
                href="/journey"
                className="group flex items-center gap-3 bg-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95] transition hover:bg-[#f5f3ff] sm:px-8 sm:py-4"
              >
                <BookOpen size={14} strokeWidth={2.5} />
                Read the Full Story
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
              <p className="ml-0 mt-3 w-full text-[11px] uppercase tracking-[0.22em] text-white/55 sm:ml-5 sm:mt-0 sm:w-auto">
                8 chapters · 4 min read
              </p>
            </div>
          </div>

          {/* Right: 3-era preview cards */}
          <div className="relative">
            {/* Vertical rail behind cards */}
            <div
              aria-hidden
              className="absolute left-[27px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#dc2626] via-[#4c1d95] to-[#15803d]"
            />

            <ul className="space-y-4 md:space-y-5">
              {PREVIEW.map((p) => (
                <li key={p.title} className="relative pl-16">
                  {/* Rail node */}
                  <div
                    className={`absolute left-0 top-1 flex h-14 w-14 items-center justify-center border-[3px] ${p.accent} bg-white shadow-sm`}
                  >
                    <p.icon size={20} strokeWidth={1.75} className={p.text} />
                  </div>

                  <div className="border-l-2 border-white/15 bg-white/[0.04] p-4 backdrop-blur-sm transition hover:border-[#c4b5fd] hover:bg-white/[0.07] md:p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#c4b5fd]">
                        {p.year}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                        {p.sub}
                      </p>
                    </div>
                    <p className="mt-1.5 font-serif text-lg font-semibold uppercase tracking-wide text-white md:text-xl">
                      {p.title}
                    </p>
                  </div>
                </li>
              ))}

              {/* Last node teases the rest */}
              <li className="relative pl-16">
                <div className="absolute left-0 top-1 flex h-14 w-14 items-center justify-center border-[3px] border-[#15803d] bg-[#4c1d95]">
                  <span className="font-serif text-base font-bold text-[#c4b5fd]">
                    +5
                  </span>
                </div>
                <Link
                  href="/journey"
                  className="block border-l-2 border-[#15803d] bg-[#15803d]/10 p-4 transition hover:bg-[#15803d]/20 md:p-5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#86efac]">
                    Five more chapters
                  </p>
                  <p className="mt-1.5 font-serif text-base italic text-white md:text-lg">
                    The land of promise · the borrowed room · how the school
                    was born, and how you can write the next chapter.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#86efac]">
                    Continue Reading <ArrowRight size={12} strokeWidth={2.5} />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

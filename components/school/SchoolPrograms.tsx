import { Sparkles, Check } from "lucide-react";
import { siteData } from "@/data/site";

export default function SchoolPrograms() {
  const s = siteData.school;

  return (
    <section id="programs" className="border-b border-[#d4d0c4] bg-[#f8f6ee]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-[#15803d] md:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
              Academic Programs
            </p>
            <span className="h-[1px] w-12 bg-[#15803d] md:w-16" />
          </div>
          <h2 className="mt-5 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] text-[#0b2545] sm:text-3xl md:text-5xl">
            From Playgroup to Junior School
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-slate-600 md:mt-5 md:text-[15px] md:leading-8">
            We deliver the full Kenya Competency-Based Curriculum (CBC) across
            four progressive levels &mdash; each rooted in Christian values
            and the love of the Lord.
          </p>
        </div>

        {/* Mobile: swipe-snap carousel */}
        <div className="md:hidden">
          <div className="flex items-center justify-between border-b border-[#d4d0c4] pb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0b2545]">
              {s.programs.length} Levels
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Swipe →
            </p>
          </div>
          <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {s.programs.map((p) => (
              <article
                key={p.code}
                className="flex w-[88vw] shrink-0 snap-center flex-col border-2 border-[#d4d0c4] bg-white"
              >
                <div className="flex items-center justify-between border-b-2 border-[#15803d] bg-[#0b2545] px-5 py-4">
                  <div className="flex h-12 w-12 items-center justify-center border-2 border-[#15803d] bg-[#15803d] font-serif text-base font-bold text-white">
                    {p.code}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                      {p.ages}
                    </p>
                    <p className="font-serif text-sm text-white">{p.grades}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl font-semibold uppercase leading-tight tracking-wide text-[#0b2545]">
                    {p.name}
                  </h3>
                  <div className="mt-3 h-[2px] w-12 bg-[#15803d]" />
                  <p className="mt-4 text-[14px] leading-7 text-slate-700">
                    {p.desc}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-[#d4d0c4] pt-4">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-[13px] text-slate-700"
                      >
                        <Check
                          size={14}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0 text-[#15803d]"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden grid-cols-2 gap-0 border border-[#d4d0c4] bg-white md:grid lg:grid-cols-4">
          {s.programs.map((p, i) => (
            <article
              key={p.code}
              className={`group flex flex-col p-7 transition hover:bg-[#f8f6ee] ${
                i % 2 === 1 ? "md:border-l md:border-[#d4d0c4]" : ""
              } ${i < 2 ? "md:border-b md:border-[#d4d0c4]" : ""} lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-[#d4d0c4]`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center border-2 border-[#15803d] bg-[#15803d] font-serif text-lg font-bold text-white transition group-hover:bg-white group-hover:text-[#15803d]">
                  {p.code}
                </div>
                <Sparkles size={16} className="text-[#c9a961]" strokeWidth={1.75} />
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                {p.ages}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold uppercase leading-tight tracking-wide text-[#0b2545]">
                {p.name}
              </h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                {p.grades}
              </p>

              <div className="mt-4 h-[2px] w-10 bg-[#c9a961]" />

              <p className="mt-4 flex-1 text-[13px] leading-7 text-slate-600">
                {p.desc}
              </p>

              <ul className="mt-5 space-y-2 border-t border-[#d4d0c4] pt-4">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-[12px] text-slate-700"
                  >
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-[#15803d]"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

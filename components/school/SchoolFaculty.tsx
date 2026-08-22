import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteData } from "@/data/site";

export default function SchoolFaculty() {
  const s = siteData.school;

  return (
    <section id="faculty" className="border-b border-[#d4d0c4] bg-[#f8f6ee]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
              Our Faculty
            </p>
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
          </div>
          <h2 className="mt-5 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] text-[#0b2545] sm:text-3xl md:text-5xl">
            Teachers Who Teach &amp; Care
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-slate-600 md:mt-5 md:text-[15px] md:leading-8">
            Every teacher at Fountain of Hope is registered, trained and
            personally interviewed for both academic competence and Christian
            character.
          </p>
          <Link
            href="/leadership"
            className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#15803d] hover:text-[#0b2545]"
          >
            Meet the Full Leadership Team
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile: swipe-snap row */}
        <div className="md:hidden">
          <div className="flex items-center justify-between border-b border-[#d4d0c4] pb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0b2545]">
              {s.faculty.length} Educators
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Swipe →
            </p>
          </div>
          <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {s.faculty.map((f) => (
              <article
                key={f.name}
                className="flex w-[72vw] shrink-0 snap-center flex-col border-2 border-[#d4d0c4] bg-white"
              >
                <div
                  className="h-56 w-full bg-[#0b2545] bg-cover bg-top"
                  style={{ backgroundImage: `url('${f.photo}')` }}
                  role="img"
                  aria-label={f.name}
                />
                <div className="h-[3px] w-full bg-[#15803d]" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                    {f.role}
                  </p>
                  <p className="mt-1.5 font-serif text-base font-semibold text-[#0b2545]">
                    {f.name}
                  </p>
                  <p className="mt-3 border-t border-[#d4d0c4] pt-3 text-[12px] text-slate-600">
                    {f.subject}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden grid-cols-2 gap-0 border border-[#d4d0c4] bg-white md:grid lg:grid-cols-3">
          {s.faculty.map((f, i) => (
            <article
              key={f.name}
              className={`group flex flex-col p-6 transition hover:bg-[#f8f6ee] ${
                i % 2 === 1 ? "md:border-l md:border-[#d4d0c4]" : ""
              } ${i < s.faculty.length - 2 ? "md:border-b md:border-[#d4d0c4]" : ""} lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n+3)]:border-l lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+2)]:border-[#d4d0c4] lg:[&:nth-child(3n+3)]:border-[#d4d0c4] lg:[&:nth-child(-n+3)]:border-b lg:[&:nth-child(-n+3)]:border-[#d4d0c4]`}
            >
              <div className="flex gap-5">
                <div
                  className="h-28 w-24 shrink-0 border-2 border-[#15803d] bg-[#0b2545] bg-cover bg-top"
                  style={{ backgroundImage: `url('${f.photo}')` }}
                  role="img"
                  aria-label={f.name}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                    {f.role}
                  </p>
                  <p className="mt-1.5 font-serif text-lg font-semibold leading-tight text-[#0b2545]">
                    {f.name}
                  </p>
                  <div className="mt-3 h-[2px] w-10 bg-[#c9a961]" />
                  <p className="mt-3 text-[12px] leading-6 text-slate-600">
                    {f.subject}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center font-serif text-[13px] italic text-slate-600 md:mt-10 md:text-sm">
          Plus a full team of class teachers, support staff and the school
          chaplain.
        </p>
      </div>
    </section>
  );
}

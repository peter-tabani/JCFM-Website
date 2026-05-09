import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, MapPin } from "lucide-react";
import { siteData } from "@/data/site";

export default function SchoolHero() {
  const s = siteData.school;

  const QUICK = [
    { icon: Users, label: "Levels", value: s.levels },
    { icon: BookOpen, label: "Curriculum", value: "CBC · Kenya" },
    { icon: Award, label: "Type", value: "Day School" },
    { icon: MapPin, label: "Campus", value: s.location },
  ];

  return (
    <>
      {/* Announcement strip */}
      <div className="border-b border-[#d4d0c4] bg-[#f8f6ee]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-2.5 text-[12px] sm:px-6">
          <p className="flex items-center gap-2 text-slate-700">
            <span className="inline-block h-2 w-2 rounded-full bg-[#15803d]" />
            <span className="font-bold uppercase tracking-[0.18em] text-[#15803d]">
              Admissions Open
            </span>
            <span className="hidden sm:inline">—</span>
            <span>Term {new Date().getMonth() < 4 ? "1" : new Date().getMonth() < 8 ? "2" : "3"} intake now in progress · Limited slots per class.</span>
          </p>
          <Link
            href="/school#admissions"
            className="font-semibold uppercase tracking-[0.18em] text-[#0b2545] transition hover:text-[#15803d]"
          >
            Apply Today →
          </Link>
        </div>
      </div>

      {/* ── Main banner ── */}
      <section className="relative overflow-hidden bg-[#0b2545]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2545] via-[#0b2545]/95 to-[#0b2545]/70" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 md:py-24">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#15803d]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
                An Education Ministry of {s.parent}
              </p>
            </div>

            {/* Title */}
            <h2 className="font-serif text-[34px] font-semibold uppercase leading-[1.05] tracking-[0.02em] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
              Fountain of Hope
              <br />
              <span className="text-[#c9a961]">Academy</span>
            </h2>

            {/* Gold separator */}
            <div className="mt-5 mb-5 h-[2px] w-20 bg-[#15803d] md:mt-7 md:mb-7 md:w-28" />

            {/* Motto */}
            <p className="mb-3 font-serif text-lg italic text-[#c9a961] sm:text-xl md:text-2xl">
              {s.motto}.
            </p>

            <p className="mb-8 max-w-2xl text-[15px] leading-7 text-white/85 md:mb-10 md:text-lg md:leading-8">
              {s.tagline} Founded in {s.founded} on the JCFM Headquarters
              compound in Nzoia, we educate the head, the hand and the heart
              under the lordship of Christ.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-0">
              <Link
                href="/school#admissions"
                className="flex items-center gap-3 bg-[#15803d] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#106030] sm:px-8 sm:py-4"
              >
                Begin Admission
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                href="/school#programs"
                className="flex items-center gap-3 border-2 border-white px-7 py-[12px] text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[#0b2545] sm:px-8 sm:py-[14px]"
              >
                Explore Programs
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Bible verse */}
            <div className="mt-10 max-w-2xl border-l-2 border-[#15803d] pl-5 md:mt-12">
              <p className="font-serif text-base italic leading-7 text-white/85 md:text-lg md:leading-8">
                &ldquo;{s.motoVerse.text}&rdquo;
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                — {s.motoVerse.ref}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick facts strip ── */}
      <section className="border-b border-[#d4d0c4] bg-white">
        {/* Mobile swipe header */}
        <div className="flex items-center justify-between border-b border-[#d4d0c4] bg-[#f8f6ee] px-5 py-2.5 md:hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0b2545]">
            At a Glance
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
            Swipe →
          </p>
        </div>
        <div className="mx-auto flex max-w-[1400px] snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-2 md:divide-x md:divide-[#d4d0c4] md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {QUICK.map((q) => (
            <div
              key={q.label}
              className="flex w-[78vw] shrink-0 snap-center items-start gap-4 border-r border-[#d4d0c4] p-5 md:w-auto md:shrink md:border-r-0 md:p-6"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#15803d] bg-[#15803d] text-white">
                <q.icon size={20} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                  {q.label}
                </p>
                <p className="mt-1 font-serif text-base font-semibold leading-tight text-[#0b2545]">
                  {q.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

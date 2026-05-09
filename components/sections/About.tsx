import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/site";

const FACTSHEET = [
  { k: "Founded By", v: siteData.generalOverseer },
  { k: "Headquarters", v: "Nzoia, Bungoma County" },
  { k: "Branches", v: `${siteData.branches.length} · Across Kenya` },
];

export default function About() {
  return (
    <section id="about" className="bg-white">

      {/* ── PART 1 · Tight gazette masthead ── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 pt-10 pb-10 sm:px-6 sm:pt-14 md:pt-20 md:pb-14">
          {/* Masthead title */}
          <div className="mt-8 text-center md:mt-10">
            <h2 className="mt-3 font-serif text-[32px] font-semibold uppercase leading-[1.05] tracking-[0.03em] text-[#4c1d95] sm:text-4xl md:text-6xl">
              Jesus Christ
              <br />
              Founder Ministry
            </h2>
            <div className="mx-auto mt-5 flex items-center justify-center gap-3 md:mt-6">
              <span className="h-[2px] w-10 bg-[#15803d] md:w-12" />
              <p className="font-serif text-sm italic text-slate-600">
                {siteData.motto}
              </p>
              <span className="h-[2px] w-10 bg-[#15803d] md:w-12" />
            </div>
          </div>

          {/* Double rule */}
          <div className="mt-8 border-t-2 border-b border-[#4c1d95] py-1 md:mt-10" />

          {/* Compact factsheet — 4 facts */}
          <dl className="grid grid-cols-1 gap-x-10 gap-y-2 px-2 py-5 sm:grid-cols-2">
            {FACTSHEET.map((item) => (
              <div
                key={item.k}
                className="flex items-baseline justify-between gap-4 border-b border-dotted border-slate-300 py-2"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                  {item.k}
                </dt>
                <dd className="font-serif text-[14px] text-slate-700 md:text-[15px]">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-b border-t-2 border-[#4c1d95] py-1" />

          {/* Tight, magnetic intro — single short paragraph */}
          <div className="mt-8 mx-auto max-w-3xl text-center md:mt-10">
            <p className="font-serif text-[17px] leading-[1.75] text-slate-800 first-letter:mr-2 first-letter:float-left first-letter:font-serif first-letter:text-[64px] first-letter:leading-[0.9] first-letter:font-semibold first-letter:text-[#4c1d95] md:text-[19px] md:leading-[1.8]">
              From a humble beginning in a village called Sikalame in Bungoma to a
              network of {siteData.branches.length} branches and an academy. The story
              of Jesus Christ Founder Ministry is, simply, a story of grace. And we
              believe God is doing more.
            </p>

            {/* Bridge to journey */}
            <div className="mt-8 flex flex-col items-center justify-center gap-0 md:mt-10">
              <Link
                href="/journey"
                className="group flex items-center gap-3 bg-[#4c1d95] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#3b0f80] sm:px-8 sm:py-4"
              >
                <BookOpen size={14} strokeWidth={2.25} />
                Read Our Journey
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── PART 2 · Pastor's Welcome Letter (kept; emotional invitation) ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-6 md:py-20">
          <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">

            {/* Portrait column */}
            <div className="relative bg-[#4c1d95] p-8 md:p-10">
              <div className="mx-auto max-w-[320px]">
                <div className="border-4 border-[#c4b5fd] bg-white">
                  <img
                    src="/images/staff/B and P.png"
                    alt="Bishop Nelson Barasa Wanjala and Pastor Sarah N. Wekesa"
                    className="h-[360px] w-full object-cover"
                  />
                </div>
                <div className="mt-5 text-center">
                  <p className="font-serif text-xl font-semibold text-white">
                    Bishop Nelson Barasa Wanjala
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4b5fd]">
                    Founder &amp; Bishop
                  </p>
                  <div className="mx-auto mt-4 h-[1px] w-10 bg-[#c4b5fd]" />
                  <p className="mt-4 font-serif text-lg font-semibold text-white">
                    Pastor Sarah N. Wekesa
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4b5fd]">
                    Co-Founder &amp; Pastor
                  </p>
                  <div className="mx-auto mt-4 h-[1px] w-10 bg-[#c4b5fd]" />
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/60">
                    Leadership Team
                  </p>
                </div>
              </div>
            </div>

            {/* Welcome letter — concise version */}
            <div className="border border-slate-200 bg-white p-7 md:p-12">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#dc2626]">
                  A Welcome Letter
                </p>
              </div>

              <h3 className="font-serif text-2xl font-semibold uppercase leading-tight tracking-[0.02em] text-[#4c1d95] sm:text-3xl md:text-[38px]">
                Welcome to Our Family
              </h3>

              <div className="mt-5 space-y-4 font-serif text-[15px] leading-7 text-slate-700 md:mt-6 md:leading-8">
                <p>Dear friend,</p>
                <p>
                  Welcome to our website. Jesus Christ Founder Ministry is a
                  community of believers walking together in faith, growing from
                  a small beginning in Bungoma to branches across Kenya.
                  Whether you are looking for a place to worship, a school for
                  your child, or simply curious about what God is doing here,
                  we are glad you stopped by.
                </p>
                <p>
                  Take a moment to explore our story, our branches, and the
                  work the Lord has entrusted to us. We would love to meet you
                  in person and share what God is doing in our midst.
                </p>
                <p>God bless you.</p>
              </div>

              {/* Signature */}
              <div className="mt-7 border-t border-slate-200 pt-5 md:mt-8 md:pt-6">
                <p className="font-serif text-xl italic text-[#4c1d95] md:text-2xl">
                  Bishop Nelson Barasa Wanjala
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600">
                  Founder &amp; Bishop · JCFM
                </p>
                <div className="mt-4 border-t border-slate-200 pt-5 md:pt-6">
                  <p className="font-serif text-xl italic text-[#4c1d95] md:text-2xl">
                    Pastor Sarah N. Wekesa
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600">
                    Co-Founder &amp; Pastor · JCFM
                  </p>
                </div>
              </div>

              {/* Compact CTA row */}
              <div className="mt-6 flex flex-wrap gap-0 md:mt-8">
                <Link
                  href="/#contact"
                  className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#15803d] via-[#16a34a] to-[#0f766e] px-6 py-[11px] text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-md transition hover:shadow-lg hover:brightness-110"
                >
                  Talk to the Bishop
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

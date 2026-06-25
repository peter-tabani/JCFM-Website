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
    <section id="about" className="bg-[#080b16]">

      {/* ── PART 1 · Tight gazette masthead ── */}
      <div className="border-b border-white/10 bg-[#080b16]">
        <div className="mx-auto max-w-[1100px] px-5 pt-10 pb-10 sm:px-6 sm:pt-14 md:pt-20 md:pb-14">
          {/* Masthead title */}
          <div className="mt-8 text-center md:mt-10">
            <h2 className="mt-3 font-serif text-[32px] font-semibold uppercase leading-[1.05] tracking-[0.03em] text-white sm:text-4xl md:text-6xl">
              Jesus Christ
              <br />
              Founder Ministry
            </h2>
            <div className="mx-auto mt-5 flex items-center justify-center gap-3 md:mt-6">
              <span className="h-[2px] w-10 bg-[#15803d] md:w-12" />
              <p className="font-serif text-sm italic text-white/62">
                {siteData.motto}
              </p>
              <span className="h-[2px] w-10 bg-[#15803d] md:w-12" />
            </div>
          </div>

          {/* Double rule */}
          <div className="mt-8 border-t-2 border-b border-[#7c3aed] py-1 md:mt-10" />

          {/* Compact factsheet — 4 facts */}
          <dl className="grid grid-cols-1 gap-x-10 gap-y-2 px-2 py-5 sm:grid-cols-2">
            {FACTSHEET.map((item) => (
              <div
                key={item.k}
                className="flex items-baseline justify-between gap-4 border-b border-dotted border-white/20 py-2"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                  {item.k}
                </dt>
                <dd className="font-serif text-[14px] text-white/70 md:text-[15px]">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-b border-t-2 border-[#7c3aed] py-1" />

          {/* Tight, magnetic intro — single short paragraph */}
          <div className="mt-8 mx-auto max-w-3xl text-center md:mt-10">
            <p className="font-serif text-[17px] leading-[1.75] text-white/78 first-letter:mr-2 first-letter:float-left first-letter:font-serif first-letter:text-[64px] first-letter:leading-[0.9] first-letter:font-semibold first-letter:text-[#c4b5fd] md:text-[19px] md:leading-[1.8]">
              From a humble beginning in a village called Sikalame in Bungoma to a
              network of {siteData.branches.length} branches and an academy. The story
              of Jesus Christ Founder Ministry is, simply, a story of grace. And we
              believe God is doing more.
            </p>

            {/* Bridge to journey */}
            <div className="mt-8 flex flex-col items-center justify-center gap-0 md:mt-10">
              <Link
                href="/journey"
                className="group flex items-center gap-3 bg-[#7c3aed] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6d28d9] sm:px-8 sm:py-4"
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

    </section>
  );
}

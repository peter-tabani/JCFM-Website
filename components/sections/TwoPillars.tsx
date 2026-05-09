import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { siteData } from "@/data/site";

export default function TwoPillars() {
  return (
    <section
      id="academy-callout"
      className="relative border-y border-slate-200 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/90" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-10 md:py-12">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto] md:gap-10">

          {/* Icon block */}
          <div className="flex shrink-0 items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center border-2 border-[#15803d] bg-white text-[#15803d]">
              <GraduationCap size={28} strokeWidth={1.75} />
            </div>
            <div className="hidden h-12 w-[1px] bg-[#15803d]/40 md:block" />
          </div>

          {/* Text */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
              Education Ministry · Under JCFM
            </p>
            <h3 className="mt-1.5 font-serif text-2xl font-semibold uppercase leading-tight tracking-[0.02em] text-[#4c1d95] md:text-3xl">
              {siteData.schoolName}
            </h3>
            <p className="mt-2 max-w-2xl text-[14px] leading-7 text-slate-600">
              Our faith-based school, where the values of the Ministry meet
              the classroom. Learn about programmes, admissions, staff and
              campus life on the Academy&apos;s own website.
            </p>
          </div>

          {/* CTA */}
          <Link
            href={siteData.schoolHref}
            className="inline-flex shrink-0 items-center justify-between gap-3 border-2 border-[#4c1d95] bg-[#4c1d95] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#3b0f80]"
          >
            Visit the Academy
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

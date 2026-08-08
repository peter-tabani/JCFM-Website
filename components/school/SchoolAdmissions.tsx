import { ArrowRight, Download } from "lucide-react";
import { siteData } from "@/data/site";

export default function SchoolAdmissions() {
  const s = siteData.school;

  return (
    <section id="admissions" className="bg-white">
      {/* ── Hero strip ── */}
      <div className="border-b-2 border-[#15803d] bg-[#0b2545] text-white">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-10 md:py-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#15803d]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
                Admissions
              </p>
            </div>
            <h2 className="mt-4 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] sm:text-3xl md:text-5xl">
              Begin Your Child&apos;s
              <br />
              <span className="text-[#c9a961]">Journey With Us</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[14px] leading-7 text-white/80 md:text-[15px] md:leading-8">
              We accept new learners every term as long as space allows.
              Below is the simple, four-step process to enrol your child at
              Fountain of Hope Academy.
            </p>
          </div>

          <div className="flex flex-col gap-0 md:justify-self-end">
            <a
              href={`mailto:${s.contacts.email}`}
              className="flex items-center justify-between gap-4 bg-[#15803d] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#106030]"
            >
              Email Admissions Office
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
            <a
              href={`mailto:${s.contacts.email}?subject=Admission%20Form%20Request`}
              className="flex items-center justify-between gap-4 border-x border-b border-white/30 bg-white/10 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-white/20"
            >
              Request Admission Form
              <Download size={13} strokeWidth={2.5} />
            </a>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.22em] text-white/60">
              {s.contacts.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

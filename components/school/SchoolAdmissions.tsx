import Link from "next/link";
import { ArrowRight, Download, FileText, CheckCircle2 } from "lucide-react";
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

      {/* ── Steps ── */}
      <div className="border-b border-[#d4d0c4] bg-[#f8f6ee]">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
          <div className="mb-10 text-center md:mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
              Four Simple Steps
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold uppercase tracking-wide text-[#0b2545] md:text-4xl">
              How to Apply
            </h3>
            <div className="mx-auto mt-5 h-[2px] w-16 bg-[#c9a961]" />
          </div>

          <div className="grid grid-cols-1 gap-0 border border-[#d4d0c4] bg-white md:grid-cols-2 lg:grid-cols-4">
            {s.admissionSteps.map((st, i) => (
              <div
                key={st.n}
                className={`flex flex-col p-6 md:p-7 ${
                  i % 2 === 1 ? "md:border-l md:border-[#d4d0c4]" : ""
                } ${i < 2 ? "md:border-b md:border-[#d4d0c4]" : ""} lg:[&:nth-child(2)]:border-l lg:[&:nth-child(3)]:border-l lg:[&:nth-child(4)]:border-l lg:[&:nth-child(2)]:border-[#d4d0c4] lg:[&:nth-child(3)]:border-[#d4d0c4] lg:[&:nth-child(4)]:border-[#d4d0c4] lg:[&:nth-child(-n+4)]:border-b-0 ${
                  i < s.admissionSteps.length - 1 ? "border-b border-[#d4d0c4] md:[&:nth-child(2)]:border-b lg:border-b-0" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center border-2 border-[#15803d] bg-[#15803d] font-serif text-base font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400">
                    {st.n}
                  </p>
                </div>
                <h4 className="mt-5 font-serif text-lg font-semibold uppercase tracking-wide text-[#0b2545]">
                  {st.title}
                </h4>
                <div className="mt-3 h-[2px] w-10 bg-[#c9a961]" />
                <p className="mt-4 text-[13px] leading-7 text-slate-600">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Requirements + Fees ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-14">
            {/* Requirements list */}
            <div>
              <div className="mb-5 flex items-center gap-3 md:mb-6">
                <div className="flex h-10 w-10 items-center justify-center border-2 border-[#0b2545] bg-[#0b2545] text-[#c9a961]">
                  <FileText size={18} strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-xl font-semibold uppercase tracking-wide text-[#0b2545] md:text-2xl">
                  What to Bring
                </h3>
              </div>

              <ul className="divide-y divide-[#d4d0c4] border border-[#d4d0c4] bg-[#f8f6ee]">
                {s.requirements.map((r, i) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 p-4 md:p-5"
                  >
                    <CheckCircle2
                      size={18}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-[#15803d]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                        № {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-0.5 text-[13px] font-semibold text-[#0b2545] md:text-[14px]">
                        {r}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-[12px] italic text-slate-500 md:text-[13px]">
                Documents are returned to the parent immediately after copies
                are made at the office.
              </p>
            </div>

            {/* Fees table */}
            <div>
              <div className="mb-5 flex items-center justify-between md:mb-6">
                <h3 className="font-serif text-xl font-semibold uppercase tracking-wide text-[#0b2545] md:text-2xl">
                  Fees Structure
                </h3>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  Per Term · KSh
                </p>
              </div>

              <div className="overflow-x-auto border border-[#0b2545]">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#0b2545] text-white">
                      <th className="border-b border-[#0b2545] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] md:px-5">
                        Level
                      </th>
                      <th className="border-b border-[#0b2545] px-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.22em] md:px-5">
                        Day
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.fees.map((row, i) => (
                      <tr
                        key={row.level}
                        className={i % 2 === 0 ? "bg-white" : "bg-[#f8f6ee]"}
                      >
                        <td className="border-b border-[#d4d0c4] px-4 py-4 align-top md:px-5">
                          <p className="font-serif text-sm font-semibold text-[#0b2545] md:text-[15px]">
                            {row.level}
                          </p>
                        </td>
                        <td className="border-b border-[#d4d0c4] px-4 py-4 text-right align-top text-[14px] font-semibold text-[#15803d] md:px-5 md:text-[15px]">
                          {row.day}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="border border-[#d4d0c4] bg-[#f8f6ee] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a8201a]">
                    One-off Charges
                  </p>
                  <p className="mt-1 text-[13px] text-slate-700">
                    Admission KSh 1,500 · Uniform &amp; books on collection.
                  </p>
                </div>
                <div className="border border-[#d4d0c4] bg-[#f8f6ee] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a8201a]">
                    Need-Based Bursaries
                  </p>
                  <p className="mt-1 text-[13px] text-slate-700">
                    Limited bursaries available &mdash; speak to the Head Teacher.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[11px] italic text-slate-500">
                Indicative fees. Confirm the current term&apos;s structure
                with the school office before paying.
              </p>

              <div className="mt-7 flex flex-wrap gap-0">
                <Link
                  href="/school#contact"
                  className="flex items-center gap-2 bg-[#15803d] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#106030]"
                >
                  Talk to Admissions
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
                <a
                  href={`mailto:${s.contacts.email}?subject=Admission%20Form%20Request`}
                  className="flex items-center gap-2 border-2 border-[#0b2545] px-6 py-[10px] text-[11px] font-bold uppercase tracking-[0.22em] text-[#0b2545] transition hover:bg-[#0b2545] hover:text-white"
                >
                  Request Form by Email
                  <Download size={13} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

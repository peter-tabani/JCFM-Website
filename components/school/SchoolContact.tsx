import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/site";

export default function SchoolContact() {
  const s = siteData.school;

  return (
    <section id="contact" className="border-b border-[#d4d0c4] bg-white">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
              School Office
            </p>
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
          </div>
          <h2 className="mt-5 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] text-[#0b2545] sm:text-3xl md:text-5xl">
            Talk With Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-slate-600 md:mt-5 md:text-[15px] md:leading-8">
            Whether you would like to enquire about admissions, book a campus
            visit, or simply ask a question &mdash; the office is available
            Monday to Saturday.
          </p>
        </div>

        {/* Two contact cards */}
        <div className="grid grid-cols-1 gap-0 border border-[#d4d0c4] md:grid-cols-2 md:divide-x md:divide-[#d4d0c4]">
          {/* Office */}
          <div className="flex flex-col">
            <div className="h-[3px] w-full bg-[#0b2545]" />
            <div className="flex flex-1 flex-col p-7 md:p-9">
              <span className="inline-flex w-fit items-center bg-[#0b2545] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a961]">
                School Office
              </span>
              <p className="mt-5 font-serif text-2xl font-semibold uppercase leading-tight tracking-wide text-[#0b2545]">
                General Enquiries
              </p>
              <div className="my-4 h-[2px] w-10 bg-[#c9a961]" />
              <p className="text-[13px] leading-7 text-slate-600 md:text-[14px]">
                For visits, fee queries, transcripts, lost items, or to leave
                a message for the Head Teacher.
              </p>

              <div className="mt-auto flex flex-col gap-0 pt-6">
                <a
                  href={`mailto:${s.contacts.email}`}
                  className="flex items-center justify-between gap-3 border border-[#0b2545] bg-white px-4 py-3 text-[13px] font-semibold text-[#0b2545] transition hover:bg-[#0b2545] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Mail size={14} strokeWidth={2.25} />
                    Email the Office
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Admissions */}
          <div className="flex flex-col border-t border-[#d4d0c4] md:border-t-0">
            <div className="h-[3px] w-full bg-[#15803d]" />
            <div className="flex flex-1 flex-col p-7 md:p-9">
              <span className="inline-flex w-fit items-center bg-[#15803d] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                Admissions Desk
              </span>
              <p className="mt-5 font-serif text-2xl font-semibold uppercase leading-tight tracking-wide text-[#0b2545]">
                Joining Fountain of Hope
              </p>
              <div className="my-4 h-[2px] w-10 bg-[#c9a961]" />
              <p className="text-[13px] leading-7 text-slate-600 md:text-[14px]">
                For new applications, intake dates, fees structure, bursaries
                and document checklists.
              </p>

              <div className="mt-auto flex flex-col gap-0 pt-6">
                <a
                  href={`mailto:${s.contacts.email}`}
                  className="flex items-center justify-between gap-3 border border-[#15803d] bg-white px-4 py-3 text-[13px] font-semibold text-[#15803d] transition hover:bg-[#15803d] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Mail size={14} strokeWidth={2.25} />
                    Email Admissions
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Office details strip */}
        <div className="mt-8 grid grid-cols-1 divide-y divide-[#d4d0c4] border border-[#d4d0c4] bg-[#f8f6ee] md:mt-10 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-start gap-4 p-5 md:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#0b2545] bg-[#0b2545] text-[#c9a961]">
              <MapPin size={18} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                Campus
              </p>
              <p className="mt-1 font-serif text-base font-semibold text-[#0b2545]">
                {s.location}
              </p>
              <p className="text-[12px] text-slate-600">On the JCFM HQ Compound</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 md:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#0b2545] bg-[#0b2545] text-[#c9a961]">
              <Mail size={18} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                Email
              </p>
              <a
                href={`mailto:${s.contacts.email}`}
                className="mt-1 block font-serif text-[15px] font-semibold text-[#0b2545] hover:text-[#15803d]"
              >
                {s.contacts.email}
              </a>
              <p className="text-[12px] text-slate-600">We reply within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 md:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#0b2545] bg-[#0b2545] text-[#c9a961]">
              <Clock size={18} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                Office Hours
              </p>
              <p className="mt-1 font-serif text-base font-semibold text-[#0b2545]">
                Mon &ndash; Fri · 8:00 AM &ndash; 5:00 PM
              </p>
              <p className="text-[12px] text-slate-600">Saturdays · 8:00 AM &ndash; 12:00 PM</p>
            </div>
          </div>
        </div>

        {/* Back to ministry callout */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-2 border-[#0b2545] bg-[#0b2545] p-5 text-white md:mt-14 md:flex-row md:gap-6 md:p-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#c9a961]">
              The Mother Ministry
            </p>
            <p className="mt-2 font-serif text-lg font-semibold leading-snug md:text-xl">
              Looking for the church? Visit Jesus Christ Founder Ministry.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#c9a961] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0b2545] transition hover:bg-[#b8975a]"
          >
            Visit JCFM Ministry
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

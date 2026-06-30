import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { siteData } from "@/data/site";

export default function SchoolFooter() {
  const s = siteData.school;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1e3a] text-white">
      {/* Forest stripe */}
      <div className="h-[3px] w-full bg-[#15803d]" />

      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-[#15803d] bg-[#15803d] text-white">
                <span className="font-serif text-base font-bold">FH</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
                  Education Ministry · JCFM
                </p>
                <p className="font-serif text-lg font-semibold leading-tight text-white">
                  {s.name}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[13px] leading-7 text-white/70">
              {s.tagline} An education ministry of {s.parent}, headquartered
              in Nzoia, Bungoma County.
            </p>
            <p className="mt-4 font-serif text-sm italic text-[#c9a961]">
              &ldquo;{s.motto}.&rdquo;
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {s.schoolNav.slice(0, 6).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-white/75 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Parents */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
              For Parents
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/school#admissions" className="text-[13px] text-white/75 transition hover:text-white">
                  Admissions Process
                </Link>
              </li>
              <li>
                <Link href="/school#admissions" className="text-[13px] text-white/75 transition hover:text-white">
                  Fees Structure
                </Link>
              </li>
              <li>
                <Link href="/school#life" className="text-[13px] text-white/75 transition hover:text-white">
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link href="/school#admissions" className="inline-flex items-center gap-1 text-[13px] text-white/75 transition hover:text-white">
                  Admission Form <ArrowUpRight size={12} strokeWidth={2.25} />
                </Link>
              </li>
              <li>
                <Link href="/login/parents" className="text-[13px] text-white/75 transition hover:text-white">
                  Parents Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Reach Us */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
              Reach Us
            </p>
            <ul className="mt-5 space-y-4 text-[13px]">
              <li className="flex items-start gap-2 text-white/80">
                <MapPin size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#15803d]" />
                {s.location}
              </li>
              <li>
                <a
                  href={`mailto:${s.contacts.email}`}
                  className="flex items-start gap-2 text-white/80 transition hover:text-white"
                >
                  <Mail size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#15803d]" />
                  {s.contacts.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-6 text-[11px] uppercase tracking-[0.22em] text-white/60 md:mt-14 md:flex-row md:items-center">
          <p>© {year} {s.name}. All rights reserved.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#c9a961] transition hover:text-white"
          >
            Visit Jesus Christ Founder Ministry
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

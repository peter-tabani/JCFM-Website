import { Clock, MapPin, GraduationCap } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/site";

export default function Header() {
  return (
    <section className="hidden border-b border-slate-200 bg-white lg:block">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-10 px-6 py-7">
        {/* Crest / Title lockup */}
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-slate-200 bg-white p-1.5">
            <img
              src="/images/logo.png"
              alt="Jesus Christ Founder Ministry — Official Seal"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="border-l-2 border-[#7c3aed] pl-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#dc2626]">
              Republic of Kenya · Headquarters · {siteData.location}
            </p>
            <h1 className="font-serif text-[26px] font-semibold uppercase leading-tight tracking-[0.04em] text-[#4c1d95] md:text-[30px]">
              {siteData.orgName}
            </h1>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-600">
              {siteData.motto}
            </p>
          </div>
        </div>

        {/* Contact panel */}
        <div className="flex items-stretch divide-x divide-slate-200 border border-slate-200 bg-white">
          <a
            href={siteData.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-50"
          >
            <MapPin size={18} className="shrink-0 text-[#4c1d95]" strokeWidth={1.75} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Location
              </p>
              <p className="text-sm font-semibold text-[#4c1d95]">{siteData.location}</p>
            </div>
          </a>

          <div className="flex items-center gap-3 px-5 py-3">
            <Clock size={18} className="shrink-0 text-[#4c1d95]" strokeWidth={1.75} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Service Hours
              </p>
              <p className="text-sm font-semibold text-[#4c1d95]">Sun 9:00 AM – 1:00 PM</p>
            </div>
          </div>

          <Link
            href="/school"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-50"
          >
            <GraduationCap size={18} className="shrink-0 text-[#4c1d95]" strokeWidth={1.75} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Our Academy
              </p>
              <p className="text-sm font-semibold text-[#4c1d95] transition hover:text-[#15803d]">
                Fountain of Hope
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

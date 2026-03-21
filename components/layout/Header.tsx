import { Mail, MapPin, Phone } from "lucide-react";
import { siteData } from "@/data/site";

export default function Header() {
  return (
    // Hidden on mobile — logo & contact shown in mobile Navbar instead
    <section className="hidden bg-[#fffaf2] lg:block">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d97706] text-xl font-bold text-[#d97706]">
            K
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-[#d97706] md:text-3xl">
              {siteData.shortName}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 md:text-sm">
              Knowledge • Integrity • Excellence
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-3 border-l border-slate-200 pl-4">
            <div className="mt-1 rounded-sm border border-slate-200 bg-white p-2 text-[#d97706]">
              <MapPin size={17} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Address</p>
              <p className="font-semibold text-slate-800">{siteData.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-l border-slate-200 pl-4">
            <div className="mt-1 rounded-sm border border-slate-200 bg-white p-2 text-[#d97706]">
              <Mail size={17} />
            </div>
            <div>
              <p className="text-sm text-slate-500">School Hours</p>
              <p className="font-semibold text-slate-800">{siteData.hours}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-l border-slate-200 pl-4">
            <div className="mt-1 rounded-sm border border-slate-200 bg-white p-2 text-[#d97706]">
              <Phone size={17} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Phone Number</p>
              <p className="font-semibold text-slate-800">{siteData.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { ArrowRight, Search, Grid3X3 } from "lucide-react";
import { siteData } from "@/data/site";

export default function Navbar() {
  return (
    <section className="relative z-20">
      <div className="mx-auto max-w-[1400px] px-0 lg:px-6">
        <div className="flex flex-col bg-white shadow-lg lg:flex-row lg:items-stretch">
          <a
            href="#contact"
            className="flex shrink-0 items-center justify-center gap-3 bg-[#0f172a] px-6 py-4 text-base font-semibold text-white hover:bg-[#1e293b] lg:min-w-[190px]"
          >
            Get More Info
            <ArrowRight size={18} />
          </a>

          <div className="flex flex-1 items-center gap-5 overflow-x-auto whitespace-nowrap px-5 py-4 text-[14px] font-medium text-slate-800">
            {siteData.navLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-[#d97706]">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center border-l border-slate-200 bg-[#f8f4ea]">
            <div className="hidden w-[150px] px-4 py-4 text-sm text-slate-500 xl:block">
              Search...
            </div>
            <button className="px-4 text-slate-600 hover:text-[#d97706]">
              <Search size={21} />
            </button>
            <button className="bg-[#d97706] px-4 py-4 text-white hover:bg-[#b45309]">
              <Grid3X3 size={21} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
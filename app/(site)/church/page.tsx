import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import ChurchLife from "@/components/sections/ChurchLife";
import MediaGallery from "@/components/sections/MediaGallery";
import { siteData } from "@/data/site";
import Breadcrumb from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: `Church Life & Sermons — ${siteData.orgName}`,
  description:
    "Weekly worship schedule, fellowship gatherings, and sermon highlights from Jesus Christ Founder Ministry.",
  alternates: { canonical: "/church" },
};

export default function ChurchPage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      <Breadcrumb items={[{ name: "Church Life", path: "/church" }]} />
      <ChurchLife />

      {/* Featured ministry callout */}
      <div className="border-b border-white/10 bg-[#080b16] px-5 py-12 lg:px-6">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4c1d95]/20 text-[#c4b5fd]">
              <HeartHandshake size={22} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9a961]">
                Featured Ministry
              </p>
              <p className="mt-1 font-serif text-xl font-semibold text-white">
                Hope for Young Women
              </p>
              <p className="mt-1 max-w-xl text-sm leading-6 text-white/60">
                Restoring dignity and rebuilding lives — walking with young
                women and the vulnerable through prayer, mentorship, and
                skills that restore hope.
              </p>
            </div>
          </div>
          <Link
            href="/hope-for-young-women"
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#6d28d9]"
          >
            Learn More
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <MediaGallery />
    </main>
  );
}

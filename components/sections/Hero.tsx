import { ArrowRight, Calendar, GraduationCap, MapPin, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/site";
import ReadMore from "@/components/ui/ReadMore";

export default function Hero() {
  return (
    <>
      {/* ── Announcement strip ── */}
      <div className="border-b border-[#15803d]/30 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-6 py-2.5 text-[12px]">
          <p className="flex items-center gap-2 text-slate-700">
            <span className="inline-block h-2 w-2 rounded-full bg-[#15803d]" />
            <span className="font-bold uppercase tracking-[0.18em] text-[#15803d]">
              Notice
            </span>
            <span className="hidden sm:inline">—</span>
            <span>
              Sunday Worship Service this week at 9:00 AM. You are welcome.
            </span>
          </p>
          <Link
            href="/#sermons"
            className="font-semibold uppercase tracking-[0.18em] text-[#4c1d95] transition hover:text-[#dc2626]"
          >
            View Latest Sermon →
          </Link>
        </div>
      </div>

      {/* ── Main banner ── */}
      <section className="relative overflow-hidden bg-[#0f172a]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/JCFM_Hero.jpg')" }}
        />
        {/* Neutral dark overlay — keeps image natural, text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 via-[#0f172a]/60 to-[#0f172a]/25" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-8 sm:px-6 sm:py-12 md:py-16">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[3px] w-12 bg-[#15803d]" />
              <p className="font-serif text-[28px] font-bold uppercase tracking-[0.28em] text-white sm:text-[32px] md:text-[36px]">
                JCFM
              </p>
              <span className="h-[3px] w-12 bg-[#15803d]" />
            </div>

            {/* Title — serif, formal */}
            <h2 className="font-serif text-[32px] font-semibold uppercase leading-[1.05] tracking-[0.02em] text-white sm:text-4xl md:text-6xl lg:text-[68px]">
              Jesus Christ
              <br />
              Founder Ministry
            </h2>

            {/* Gold separator */}
            <div className="mt-5 mb-5 h-[2px] w-20 bg-[#15803d] md:mt-7 md:mb-7 md:w-24" />

            {/* Motto */}
            <p className="mb-3 font-serif text-lg italic text-white/90 sm:text-xl md:text-2xl">
              &ldquo;{siteData.motto}.&rdquo;
            </p>

            {/* Subtitle — mission, church-led (collapsed on mobile) */}
            <ReadMore
              showAllFrom="md"
              tone="gold"
              openLabel="Read More"
              closeLabel="Show Less"
              className="mb-8 md:mb-10"
              more={
                <p className="max-w-2xl text-[15px] leading-7 text-white/85 md:text-lg md:leading-8">
                  A Christ-centered ministry headquartered in Nzoia, Bungoma,
                  with a growing network of branches across Kenya. Under the
                  leadership of{" "}
                  <span className="font-semibold text-white">
                    {siteData.generalOverseer}
                  </span>
                  , we exist to expand the Kingdom of God by establishing
                  socially and economically empowered communities.
                </p>
              }
            >
              <p className="max-w-2xl text-[15px] leading-7 text-white/85 md:hidden">
                A Christ-centered ministry headquartered in Nzoia, Bungoma,
                with a growing network of branches across Kenya.
              </p>
            </ReadMore>

            {/* CTAs — primary church, secondary academy */}
            <div className="flex flex-wrap items-center gap-0">
              <Link
                href="/#church"
                className="flex items-center gap-3 bg-[#7c3aed] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6d28d9]"
              >
                Worship With Us
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                href="/#branches"
                className="flex items-center gap-3 border-2 border-white px-8 py-[14px] text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[#4c1d95]"
              >
                Find a Branch
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Subtle academy link — secondary, not equal */}
            <Link
              href={siteData.schoolHref}
              className="mt-6 inline-flex items-center gap-2 border-b border-[#fbbf24]/60 pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fbbf24] transition hover:border-[#fcd34d] hover:text-[#fde68a]"
            >
              Looking for our school? Visit {siteData.schoolName} →
            </Link>

            {/* Bible verse footer */}
            <div className="mt-12 max-w-2xl border-l-2 border-[#15803d] pl-5">
              <p className="font-serif text-base italic leading-8 text-white/80 md:text-lg">
                &ldquo;Go therefore and make disciples of all nations… teaching
                them to observe all that I have commanded you.&rdquo;
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#86efac]">
                — Matthew 28:19–20
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick services bar ── */}
      <section className="border-b border-slate-200 bg-white">
        {/* Mobile: horizontal swipe-snap row */}
        <div className="md:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
              Quick Links
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Swipe →
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1400px] snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-2 md:divide-x md:divide-slate-200 md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {[
            {
              icon: Calendar,
              eyebrow: "Sundays · 9:00 AM",
              title: "Worship Service",
              desc: "Weekly worship at the Nzoia HQ and all branches.",
              href: "/#church",
            },
            {
              icon: MapPin,
              eyebrow: "Mission teams & visits",
              title: "Mission Trips to Kenya",
              desc: "Come preach, serve, and walk with JCFM on a focused mission visit.",
              href: "/mission-trips",
            },
            {
              icon: BookOpen,
              eyebrow: "Watch · Listen",
              title: "Latest Sermons",
              desc: "Past messages from our pastors and ministry leaders.",
              href: "/#sermons",
            },
            {
              icon: GraduationCap,
              eyebrow: "Education Ministry",
              title: siteData.schoolName,
              desc: "Our faith-based school under the JCFM Ministry.",
              href: siteData.schoolHref,
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex w-[78vw] shrink-0 snap-center items-start gap-4 border-r border-slate-200 p-5 transition hover:bg-white md:w-auto md:shrink md:border-r-0 md:p-6"
            >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#4c1d95] bg-[#4c1d95] text-[#c4b5fd] transition group-hover:bg-[#7c3aed] group-hover:text-white">
                  <item.icon size={20} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                    {item.eyebrow}
                  </p>
                  <p className="mt-1 font-serif text-lg font-semibold text-[#4c1d95]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-6 text-slate-600">
                    {item.desc}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95] group-hover:text-[#dc2626]">
                    Learn More <ChevronRight size={13} strokeWidth={2.5} />
                  </p>
                </div>
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}

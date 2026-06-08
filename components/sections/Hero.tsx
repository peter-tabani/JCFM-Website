import { ArrowRight, Calendar, GraduationCap, MapPin, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/site";

const demoHeroImage =
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=2400&q=85";

export default function Hero() {
  return (
    <>
      {/* ── Main banner ── */}
      <section className="relative isolate min-h-screen overflow-hidden bg-[#0f172a]">
        <img
          src={demoHeroImage}
          alt="Church community worship gathering"
          className="absolute inset-0 h-full w-full scale-[1.03] object-cover object-center brightness-[0.72] contrast-[1.06] saturate-[1.05]"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/65 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/65 to-transparent" />

        <header className="relative z-20 mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:py-7">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/90 p-1.5 shadow-lg sm:h-16 sm:w-16">
              <img
                src="/images/logo.png"
                alt="JCFM Seal"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="hidden text-[11px] font-bold uppercase leading-tight tracking-[0.22em] text-white sm:block">
              {siteData.shortName}
              <span className="block text-white/65">Kenya</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {siteData.navLinks
              .filter((link) => link.label !== "Home")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] font-black uppercase tracking-[0.12em] text-white transition hover:text-[#c4b5fd]"
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <details className="group relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center border border-white/50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white marker:hidden">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-64 border border-white/20 bg-[#0f172a]/95 p-3 shadow-2xl backdrop-blur">
              {siteData.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block border-b border-white/10 px-3 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-white last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-106px)] max-w-[1400px] flex-col items-center justify-center px-5 pb-16 text-center sm:px-6">
          <div className="max-w-5xl">
            <h1 className="font-serif text-[42px] font-semibold leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[86px]">
              {siteData.shortName}
            </h1>
            <p className="mt-4 text-sm font-black uppercase tracking-[0.3em] text-white sm:text-base">
              Welcome Home
            </p>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/#church"
                className="inline-flex items-center justify-center gap-3 bg-[#7c3aed] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_18px_35px_rgba(15,23,42,0.28)] transition hover:bg-[#6d28d9]"
              >
                Worship With Us
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                href="/#branches"
                className="inline-flex items-center justify-center gap-3 border-2 border-white px-8 py-[14px] text-[12px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#4c1d95]"
              >
                Find a Branch
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                href={siteData.schoolHref}
                className="inline-flex items-center justify-center border-b border-[#fbbf24]/70 bg-black/30 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fbbf24] backdrop-blur-sm transition hover:border-[#fcd34d] hover:bg-black/45 hover:text-[#fde68a] sm:ml-1"
              >
                Looking for our school? Visit {siteData.schoolName} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick services bar ── */}
      <section className="border-b border-white/10 bg-[#080b16]">
        {/* Mobile: horizontal swipe-snap row */}
        <div className="md:hidden">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#080b16] px-5 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
              Quick Links
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
              Swipe →
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1400px] snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-2 md:divide-x md:divide-white/10 md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
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
              className="group flex w-[78vw] shrink-0 snap-center items-start gap-4 border-r border-white/10 bg-[#0f172a] p-5 transition hover:bg-[#151f34] md:w-auto md:shrink md:border-r-0 md:bg-transparent md:p-6"
            >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#7c3aed]/60 bg-[#7c3aed]/20 text-[#c4b5fd] transition group-hover:bg-[#7c3aed] group-hover:text-white">
                  <item.icon size={20} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                    {item.eyebrow}
                  </p>
                  <p className="mt-1 font-serif text-lg font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-6 text-white/62">
                    {item.desc}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd] group-hover:text-[#fbbf24]">
                    Learn More <ChevronRight size={13} strokeWidth={2.5} />
                  </p>
                </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Ministry updates intro ── */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#0f172a] to-[#080b16]">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-12 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-16">
          <div>
            <h2 className="font-serif text-[32px] font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Stay Connected to the Mission
            </h2>
            <div className="mt-5 h-[3px] w-24 bg-[#15803d]" />
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              From worship services in Nzoia and the branch network across
              Kenya to the daily work at {siteData.schoolName}, follow the
              people, stories, and moments shaping the work God has entrusted
              to this ministry.
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] md:p-8">
            <p className="font-serif text-xl italic leading-9 text-white md:text-2xl">
              &ldquo;{siteData.motto}.&rdquo;
            </p>
            <div className="my-6 h-px bg-white/10" />
            <p className="font-serif text-base italic leading-8 text-white/68">
              &ldquo;Go therefore and make disciples of all nations… teaching them
              to observe all that I have commanded you.&rdquo;
            </p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
              Matthew 28:19–20
            </p>
          </div>
        </div>
      </section>

    </>
  );
}

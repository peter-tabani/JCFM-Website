import { ArrowRight } from "lucide-react";
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

      {/* ── Welcome / About intro ── */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center sm:py-14">
          <h2 className="font-serif text-3xl font-semibold tracking-[0.02em] text-white sm:text-[34px] lg:text-[38px]">
            Welcome to JCFM
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-[#15803d]" />
          <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-7 text-white sm:text-[15px] sm:leading-8">
            Jesus Christ Founder Ministry is a Christ-centred family rooted in
            Nzoia, Bungoma and reaching across Kenya through nine growing
            branches. Since {siteData.founded} we have worshipped, served and
            grown together — expanding the Kingdom of God, one community at a
            time. Wherever you join us, there is a place for you here. You are
            welcome home.
          </p>
        </div>
      </section>

      {/* ── Pathways: full-image overlay cards ── */}
      <section className="border-b border-white/10 bg-[#080b16]">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-3">
          {[
            {
              image: "/images/staff/together1.jpeg",
              title: "Worship With Us",
              cta: "Find a Branch",
              accent: "#dc2626",
              href: "/#church",
            },
            {
              image: "/images/mission-trip.jpeg",
              title: "Mission Trips to Kenya",
              cta: "Walk With JCFM",
              accent: "#15803d",
              href: "/mission-trips",
            },
            {
              image: "/images/programs/junior.jpg",
              title: siteData.schoolName,
              cta: "Visit the School",
              accent: "#fbbf24",
              href: siteData.schoolHref,
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative block h-[400px] overflow-hidden md:h-[460px] lg:h-[520px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover brightness-[0.82] transition duration-700 group-hover:scale-[1.05] group-hover:brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <h3 className="font-serif text-3xl font-semibold leading-[1.05] text-white drop-shadow-lg sm:text-[34px] lg:text-[38px]">
                  {item.title}
                </h3>
                <span className="mt-4 inline-flex flex-col">
                  <span className="inline-flex items-center gap-2 text-[15px] font-bold uppercase tracking-[0.12em] text-white sm:text-base">
                    {item.cta}
                    <ArrowRight size={16} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
                  </span>
                  <span
                    className="mt-1.5 h-[3px] w-full origin-left transition-transform duration-300 group-hover:scale-x-110"
                    style={{ backgroundColor: item.accent }}
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Welcome from leadership ── */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-14 md:grid-cols-[0.85fr_1fr] md:gap-14 md:py-20">

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div className="absolute -left-3 -top-3 h-full w-full border border-[#15803d]/50" aria-hidden />
            <img
              src="/images/staff/B and P.png"
              alt="Bishop Nelson Barasa Wanjala & Pastor Sarah N Wekesa"
              className="relative z-10 h-full w-full object-cover shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
            />
          </div>

          {/* Message */}
          <div className="text-left">
            <h2 className="font-serif text-[28px] font-semibold leading-tight tracking-[0.01em] text-white sm:text-[34px] lg:text-[40px]">
              Meet Bishop Nelson Barasa and Pastor Sarah Wekesa
            </h2>
            <div className="mt-5 h-px w-14 bg-[#15803d]" />
            <p className="mt-6 max-w-xl text-[15px] leading-[1.65] text-white/80">
              We started small in Bungoma and have grown to branches across
              Kenya. What began as a few families gathering to worship is now a
              community of believers serving together. Whether you are looking
              for a church home, a school for your child, or just want to see
              what God is doing here — you are welcome. We would love to meet
              you.
            </p>
            <div className="mt-8 flex flex-col items-start">
              <p className="font-serif text-lg italic text-white">
                {siteData.generalOverseer} &amp; {siteData.coLeader}
              </p>
            </div>
            <Link
              href="/#contact"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#15803d] px-6 py-[11px] text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#166534]"
            >
              Talk to us
              <ArrowRight size={14} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}

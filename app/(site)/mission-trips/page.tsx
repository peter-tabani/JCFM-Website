import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Cross,
  Eye,
  HandHeart,
  Heart,
  Home,
  Music,
  Pill,
  Stethoscope,
  Users,
} from "lucide-react";
import ImageCarousel from "@/components/ui/ImageCarousel";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { siteData } from "@/data/site";

export const metadata = {
  title: "Mission Trips | Jesus Christ Founder Ministry",
  description:
    "An invitation to come and serve in Kenya with Jesus Christ Founder Ministry — preaching, teaching, medical outreach, children's ministry, and home visits in Bungoma and across our branches.",
  alternates: { canonical: "/mission-trips" },
};

// ─────────────────────────────────────────────────────────────
// JCFM brand palette — matches the home page dark theme.
// Backgrounds: #080b16 / black. Text: white. Accent: green #15803d.
// Primary CTA: #7c3aed (hover #6d28d9). Light accent: #c4b5fd.
// ─────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: Cross, label: "Preaching" },
  { icon: BookOpen, label: "Teaching" },
  { icon: Stethoscope, label: "Medical Care" },
  { icon: Pill, label: "Pharmacy" },
  { icon: Eye, label: "Eye Glasses" },
  { icon: Users, label: "Children's Ministry" },
  { icon: Heart, label: "Counseling" },
  { icon: Home, label: "Home Visits" },
  { icon: Music, label: "Worship" },
  { icon: HandHeart, label: "Prayer" },
];

const TRIPS = [
  {
    image: "/images/staff/pulpit.jpeg",
    title: "Pulpit & Outreach Trip",
    blurb:
      "A preaching-focused visit across the Nzoia headquarters and our branches, with evening crusades and pastor encouragement.",
  },
  {
    image: "/images/programs/primary.jpg",
    title: "School & Children's Trip",
    blurb:
      "Spend the trip at Fountain of Hope Academy. Read with the learners, lead chapel, sit with the teachers, and pour into the next generation.",
  },
  {
    image: "/images/staff/clinic1.jpeg",
    title: "Medical Trip",
    blurb:
      "A village-centred trip combining a medical clinic, eye care, home visits, and a closing Sunday of worship at the headquarters.",
  },
];

// Add or remove photos here — just drop a file into /public/images
// and add an entry below. The carousel slides through them automatically.
const GALLERY = [
  {
    src: "/images/mission-trip.jpeg",
    alt: "Visiting team and JCFM family in Kenya",
  },
  {
    src: "/images/staff/together1.jpeg",
    alt: "Outdoor service in the villages of Bungoma County",
  },
  {
    src: "/images/staff/pulpit.jpeg",
    alt: "Preaching at the headquarters",
  },
  {
    src: "/images/staff/clinic1.jpeg",
    alt: "Medical outreach in the settlements",
  },
  {
    src: "/images/staff/charles1.jpeg",
    alt: "Serving alongside the JCFM family",
  },
  {
    src: "/images/staff/blevins1.jpeg",
    alt: "Spending time with the children",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We loved seeing you all! God bless you and we look forward to seeing you soon. Thank you all so much!",
    name: "Nell Alverson",
    role: "Kenya Mission 2025",
    image: "/images/testimonials/nell-alverson.png",
  },
  {
    quote:
      "I want to thank and commend everyone for making this mission such an excellent success. I was blessed by your fellowship in spirit and in deed.",
    name: "Charles Latham",
    role: "Kenya Mission 2025",
    image: "/images/testimonials/charles-latham.png",
  },
];

export default function MissionTripsPage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      <Breadcrumb items={[{ name: "Mission Trips", path: "/mission-trips" }]} />

      {/* ─────────────────────────────────────────────────────────
          1.  Hero banner — same as the JCFM home page hero:
              embedded nav, full-bleed image, dark overlay, CTAs.
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-screen overflow-hidden bg-[#0f172a]">
        <img
          src="/images/mission-trip.jpeg"
          alt="Mission team gathered in Kenya"
          className="absolute inset-0 h-full w-full scale-[1.03] object-cover object-center brightness-[0.9] contrast-[1.04] saturate-[1.05]"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/55 to-transparent" />

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
          <div className="max-w-4xl [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-white sm:text-base">
              Come &amp; Serve in Kenya
            </p>
            <h1 className="mt-4 font-serif text-[42px] font-semibold leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[80px]">
              Mission Trips
            </h1>
            <div className="mx-auto mt-6 h-px w-14 bg-[#15803d]" />
            <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-7 text-white/85 sm:text-base sm:leading-8">
              Jesus Christ Founder Ministry builds relationships in Kenyan
              communities through preaching, education, medical outreach, and
              children&rsquo;s programmes. You are all welcome to experience the
              Kingdom of God at work in Kenya.
            </p>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={`mailto:${siteData.email}`}
                className="inline-flex items-center justify-center gap-3 bg-[#7c3aed] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_18px_35px_rgba(15,23,42,0.28)] transition hover:bg-[#6d28d9]"
              >
                Plan Your Visit
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 border-2 border-white px-8 py-[14px] text-[12px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#4c1d95]"
              >
                Back to JCFM Home
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2.  Opening narrative — long flowing prose, single column.
          ───────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-[#080b16]">
        <div className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
          <p className="font-serif text-[19px] leading-[1.9] text-white/80 md:text-[20px] md:leading-[2]">
            Visits are arranged through{" "}
            <span className="text-[#c4b5fd]">Bishop Nelson Barasa Wanjala</span>{" "}
            and Pastor Sarah N. Wekesa, and you are free to come with your own
            plan for ministry. Many guests spend their days preaching in our
            branches, walking through the villages for evangelism, helping with
            medical outreach in the settlements, guiding and counselling young
            people, hosting children&rsquo;s programmes in the school or church, or
            bringing gifts and supplies to families in need. When the ministry
            work is complete, we can help you add a gentle visit to places like
            Amboseli, Maasai Mara, or other Kenyan landmarks if you wish.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3.  "Change a life, including your own"
          ───────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-[1180px] px-6 py-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14 lg:gap-20">
            {/* Stacked photos */}
            <div className="flex flex-col gap-6">
              <figure className="overflow-hidden">
                <img
                  src="/images/staff/charles1.jpeg"
                  alt="Charles serving with JCFM"
                  className="h-[260px] w-full object-cover md:h-[300px]"
                />
              </figure>
              <figure className="overflow-hidden">
                <img
                  src="/images/staff/blevins1.jpeg"
                  alt="Blevins spending time with the children"
                  className="h-[260px] w-full object-cover md:h-[300px]"
                />
              </figure>
            </div>

            {/* Heading + body + bullet list */}
            <div className="md:pt-2">
              <h2 className="font-serif text-[28px] font-semibold leading-tight text-white sm:text-[32px] md:text-[38px]">
                Change a life,
                <br />
                including your own.
              </h2>
              <div className="mt-5 h-px w-14 bg-[#15803d]" />

              <ul className="mt-7 space-y-3 font-serif text-[15px] leading-[1.85] text-white/80 md:text-[16px]">
                {[
                  "Preach and teach in Sunday services, midweek gatherings, and open-air meetings across our branches",
                  "Walk the villages for evangelism, home visits, and prayer with families, elders, and new believers",
                  "Host medical or counselling clinics alongside our nurses to serve settlements and rural communities",
                  "Lead children's and youth programmes at Fountain of Hope Academy and in church compounds",
                  "Encourage and equip local pastors through mentorship sessions, devotionals, and hands-on ministry support",
                ].map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803d]"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4.  Service icon grid
          ───────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-[#080b16]">
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:py-24">
          <div className="text-center">
            <h2 className="font-serif text-[28px] font-semibold leading-tight text-white sm:text-[32px] md:text-[38px]">
              What we do on the ground
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-[#15803d]" />
            <p className="mx-auto mt-6 max-w-[600px] font-serif text-[15px] leading-[1.85] text-white/66 md:text-[16px]">
              Every trip is shaped around the people we are serving and the
              gifts the team is bringing. These are the rhythms of ministry
              we move in.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:mt-16 md:grid-cols-5 md:gap-y-14">
            {SERVICES.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <s.icon
                  size={42}
                  strokeWidth={1.4}
                  className="text-[#c4b5fd]"
                />
                <p className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5.  Photo gallery — auto-sliding carousel of field moments.
          ───────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
          <div className="mb-8 text-center md:mb-10">
            <h2 className="font-serif text-[24px] font-semibold leading-tight text-white sm:text-[28px] md:text-[32px]">
              Moments from the field
            </h2>
            <div className="mx-auto mt-4 h-px w-12 bg-[#15803d]" />
          </div>
          <ImageCarousel
            images={GALLERY}
            className="h-[280px] w-full sm:h-[380px] md:h-[480px] lg:h-[540px]"
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          6.  Recent / featured trips — three cards.
          ───────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-[#080b16]">
        <div className="mx-auto max-w-[1180px] px-6 py-12 md:py-20">
          <h2 className="font-serif text-[24px] font-semibold leading-tight text-white sm:text-[28px] md:text-[32px]">
            Recent trips
          </h2>
          <div className="mt-4 h-px w-12 bg-[#15803d]" />

          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-7">
            {TRIPS.map((t) => (
              <article key={t.title} className="flex flex-col">
                <figure className="relative overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="h-[210px] w-full object-cover md:h-[230px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85">
                      JCFM · Kenya
                    </p>
                    <p className="mt-1 font-serif text-[20px] font-normal leading-tight text-white">
                      {t.title}
                    </p>
                  </figcaption>
                </figure>
                <p className="mt-4 font-serif text-[15px] font-semibold text-white">
                  {t.title}
                </p>
                <p className="mt-3 font-serif text-[14px] leading-[1.8] text-white/66 md:text-[15px]">
                  {t.blurb}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          7.  Application / contact — invitation block.
          ───────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-[940px] px-6 py-14 text-center md:py-20">
          <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[#15803d]">
            Application
          </p>
          <h2 className="mt-4 font-serif text-[30px] font-semibold leading-tight text-white sm:text-[36px] md:text-[42px]">
            Ready to plan your visit?
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#15803d]" />
          <p className="mx-auto mt-6 max-w-[640px] font-serif text-[16px] leading-[1.9] text-white/80 md:text-[17px]">
            Send a short note with your name, church, preferred dates, and the
            kind of ministry you feel called to bring. Our missions team will
            respond with the next steps and hosting details.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`mailto:${siteData.email}`}
              className="inline-flex items-center justify-center bg-[#7c3aed] px-8 py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#6d28d9]"
            >
              Email our missions team
            </Link>
          </div>

          <p className="mx-auto mt-6 max-w-[500px] font-serif text-[14px] leading-[1.9] text-white/66">
            Write to us at <span className="font-semibold text-white">{siteData.email}</span>.
            Let us know how many people are coming and any practical needs so we
            can prepare well.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          8.  Testimonies
          ───────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-[#080b16]">
        <div className="mx-auto max-w-[1080px] px-6 py-16 md:py-24">
          <div className="text-center">
            <h2 className="font-serif text-[30px] font-semibold leading-tight text-white sm:text-[34px] md:text-[40px]">
              Testimonies
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-[#15803d]" />
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="flex h-full flex-col rounded-[14px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                <p className="font-serif text-[18px] leading-[1.9] text-white/85 md:text-[19px]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  {t.image ? (
                    <div className="h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-white/10">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 font-serif text-[18px] text-[#c4b5fd]">
                      {t.name
                        .split(" ")
                        .map((part) => part.charAt(0))
                        .join("")}
                    </div>
                  )}
                  <p className="font-serif text-[16px] text-white">{t.name}</p>
                </div>
                <p className="mt-1 font-sans text-[12px] uppercase tracking-[0.24em] text-white/55">
                  {t.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import {
  BookOpen,
  Cross,
  Eye,
  HandHeart,
  Heart,
  Home,
  Music,
  Pill,
  Sparkles,
  Stethoscope,
  Users,
  Utensils,
} from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Mission Trips | Jesus Christ Founder Ministry",
  description:
    "An invitation to come and serve in Kenya with Jesus Christ Founder Ministry — preaching, teaching, medical outreach, children's ministry, and home visits in Bungoma and across our branches.",
};

// ─────────────────────────────────────────────────────────────
// Editorial palette — kept distinct from the home page so this
// page reads as a magazine spread, not another landing banner.
// Headings: deep navy-teal #0b3a53. Accent: teal #0e6e87.
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
    <main className="min-h-screen bg-white text-slate-800">
      <TopBar />
      <Header />
      <Navbar />

      {/* ─────────────────────────────────────────────────────────
          1.  Page header — sentence-case title with a thin rule.
              No banner. No overlay. Just an opening.
          ───────────────────────────────────────────────────────── */}
      <header className="bg-white">
        <div className="mx-auto max-w-[920px] px-6 pt-20 pb-8 text-center sm:pt-24 md:pt-28">
          <h1 className="font-serif text-[34px] font-normal leading-tight text-[#0b3a53] sm:text-[42px] md:text-[52px]">
            Mission Trips
          </h1>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0b3a53]/40" />
          <p className="mx-auto mt-7 max-w-[640px] font-serif text-[15px] leading-[1.85] text-slate-600 md:text-[16px]">
            Jesus Christ Founder Ministry builds relationships in Kenyan
            communities through preaching, education, medical outreach, and
            children&rsquo;s programmes. You are all welcome to experience the
            Kingdom of God at work in Kenya.
          </p>
        </div>

        <div className="mx-auto max-w-[1280px] px-6">
          <figure>
            <div className="relative overflow-hidden">
              <img
                src="/images/mission-trip.jpeg"
                alt="Mission team gathered in Kenya"
                className="h-[280px] w-full object-cover sm:h-[360px] md:h-[460px] lg:h-[520px]"
              />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent md:h-44" />
            </div>
            <figcaption className="mt-3 text-center font-serif text-[12px] italic text-slate-500">
              Visiting team and JCFM family — Nzoia headquarters, Bungoma County
            </figcaption>
          </figure>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────
          2.  Opening narrative — long flowing prose, single column.
              This is the heart of the page.  Magazine readability.
          ───────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
          <p className="font-serif text-[19px] leading-[1.9] text-slate-800 md:text-[20px] md:leading-[2]">
            Visits are arranged through{" "}
            <span className="text-[#0b3a53]">Bishop Nelson Barasa Wanjala</span>{" "}
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
              Two stacked photos on the LEFT, headed paragraph and
              bullet list on the RIGHT.  Direct mirror of image 3.
          ───────────────────────────────────────────────────────── */}
      <section className="bg-white">
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
              <h2 className="font-serif text-[28px] font-normal leading-tight text-[#0e6e87] sm:text-[32px] md:text-[38px]">
                Change a life,
                <br />
                including your own.
              </h2>

              <ul className="mt-7 space-y-3 font-serif text-[15px] leading-[1.85] text-slate-700 md:text-[16px]">
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
                      className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0e6e87]"
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
          4.  Service icon grid — line icons + simple labels,
              centered title, lots of whitespace.  Mirrors image 1.
          ───────────────────────────────────────────────────────── */}
      <section className="bg-[#faf8f3]">
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:py-24">
          <div className="text-center">
            <h2 className="font-serif text-[28px] font-normal leading-tight text-[#0b3a53] sm:text-[32px] md:text-[38px]">
              What we do on the ground
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-[#0b3a53]/40" />
            <p className="mx-auto mt-6 max-w-[600px] font-serif text-[15px] leading-[1.85] text-slate-600 md:text-[16px]">
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
                  className="text-[#0b3a53]"
                />
                <p className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b3a53]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5.  Wide atmospheric break — single photograph, no text.
              Lets the page breathe between dense sections.
          ───────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 pt-16 md:pt-20">
          <figure className="relative overflow-hidden">
            <img
              src="/images/staff/together1.jpeg"
              alt="Outdoor service in the villages of Bungoma County"
              className="h-[260px] w-full object-cover sm:h-[340px] md:h-[440px] lg:h-[500px]"
            />
            <figcaption className="mt-3 text-center font-serif text-[12px] italic text-slate-500">
              Outdoor service in the villages of Bungoma County
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          7.  Recent / featured trips — three cards, image with
              soft title bar, simple line under each.  Image 2.
          ───────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-12 md:py-20">
          <h2 className="font-serif text-[24px] font-normal leading-tight text-[#0b3a53] sm:text-[28px] md:text-[32px]">
            Recent trips
          </h2>
          <div className="mt-4 h-px w-12 bg-[#0b3a53]/40" />

          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-7">
            {TRIPS.map((t) => (
              <article key={t.title} className="flex flex-col">
                <figure className="relative overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="h-[210px] w-full object-cover md:h-[230px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b3a53]/85 via-[#0b3a53]/30 to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85">
                      JCFM · Kenya
                    </p>
                    <p className="mt-1 font-serif text-[20px] font-normal leading-tight text-white">
                      {t.title}
                    </p>
                  </figcaption>
                </figure>
                <p className="mt-4 font-serif text-[15px] font-semibold text-[#0b3a53]">
                  {t.title}
                </p>
                <p className="mt-3 font-serif text-[14px] leading-[1.8] text-slate-600 md:text-[15px]">
                  {t.blurb}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          8.  Application / contact — simple invitation card
          ───────────────────────────────────────────────────────── */}
      <section className="bg-[#faf8f3]">
        <div className="mx-auto max-w-[940px] px-6 py-14 text-center md:py-20">
          <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[#0b3a53]">
            Application
          </p>
          <h2 className="mt-4 font-serif text-[30px] font-normal leading-tight text-[#0b3a53] sm:text-[36px] md:text-[42px]">
            Ready to plan your visit?
          </h2>
          <p className="mx-auto mt-6 max-w-[640px] font-serif text-[16px] leading-[1.9] text-slate-700 md:text-[17px]">
            Send a short note with your name, church, preferred dates, and the
            kind of ministry you feel called to bring. Our missions team will
            respond with the next steps and hosting details.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="https://wa.me/254721683397"
              className="inline-flex items-center justify-center bg-[#0b3a53] px-8 py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#0e6e87]"
            >
              WhatsApp our missions team
            </Link>
            <Link
              href="tel:+254721683397"
              className="inline-flex items-center justify-center border border-[#0b3a53] px-8 py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.24em] text-[#0b3a53] transition hover:bg-white"
            >
              Call +254 721 683 397
            </Link>
          </div>

          <p className="mx-auto mt-6 max-w-[500px] font-serif text-[14px] leading-[1.9] text-slate-600">
            Email works too: <span className="font-semibold">info@jcfm.org</span>.
            Let us know how many people are coming and any practical needs so we
            can prepare well.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          9.  Testimonies — editorial quotes with soft styling
          ───────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-16 md:py-24">
          <div className="text-center">
            <h2 className="mt-3 font-serif text-[30px] font-normal leading-tight text-[#0b3a53] sm:text-[34px] md:text-[40px]">
              Testimonies
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-[#0b3a53]/30" />
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="flex h-full flex-col rounded-[14px] border border-slate-200 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,37,56,0.04)]"
              >
                <p className="font-serif text-[18px] leading-[1.9] text-[#0b3a53] md:text-[19px]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  {t.image ? (
                    <div className="h-14 w-14 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-50 font-serif text-[18px] text-[#0b3a53]">
                      {t.name
                        .split(" ")
                        .map((part) => part.charAt(0))
                        .join("")}
                    </div>
                  )}
                  <p className="font-serif text-[16px] text-slate-900">{t.name}</p>
                </div>
                <p className="mt-1 font-sans text-[12px] uppercase tracking-[0.24em] text-slate-500">
                  {t.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

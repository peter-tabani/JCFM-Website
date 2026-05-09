import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DonorContactForm from "@/components/sections/DonorContactForm";
import {
  Heart,
  Users,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Shirt,
  Building2,
  Star,
  Globe,
  ShieldCheck,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Support Our Children – Fountain of Hope Academy",
  description:
    "Help us educate and care for vulnerable children in Likoni, Mombasa. Your donation changes lives.",
};

const impactStats = [
  { number: "250+", label: "Sponsored Children", icon: <Heart size={22} /> },
  { number: "2013", label: "Year Founded", icon: <Star size={22} /> },
  { number: "150+", label: "Fee-Paying Learners", icon: <Users size={22} /> },
  { number: "10+", label: "National School Alumni", icon: <GraduationCap size={22} /> },
];

const tiers = [
  {
    name: "School Supplies",
    amount: "$10 / month",
    amountKes: "≈ KSh 1,300",
    description:
      "Covers exercise books, pens, pencils and basic stationery for one child for a full month.",
    icon: <BookOpen size={24} />,
    color: "border-orange-200 bg-orange-50",
    badge: "bg-[#d97706] text-white",
    items: ["Exercise books", "Pens & pencils", "A ruler & eraser", "A school bag"],
  },
  {
    name: "Uniform & Meals",
    amount: "$25 / month",
    amountKes: "≈ KSh 3,200",
    description:
      "Provides a full school uniform and daily meals so a child can focus on learning.",
    icon: <Shirt size={24} />,
    color: "border-slate-200 bg-white",
    badge: "bg-[#0f172a] text-white",
    items: ["Full school uniform", "Daily breakfast & lunch", "School shoes", "PE kit"],
    featured: true,
  },
  {
    name: "Full Sponsorship",
    amount: "$50 / month",
    amountKes: "≈ KSh 6,500",
    description:
      "Completely covers one child's education — tuition, meals, uniform, supplies and more.",
    icon: <GraduationCap size={24} />,
    color: "border-orange-200 bg-orange-50",
    badge: "bg-[#d97706] text-white",
    items: ["Full school tuition", "All meals & uniform", "All stationery", "Extra tuition support"],
  },
];

const oneTimeTiers = [
  { amount: "$50", desc: "Buys a full set of textbooks for one learner" },
  { amount: "$100", desc: "Funds a month of meals for 10 children" },
  { amount: "$250", desc: "Equips a classroom with new learning materials" },
  { amount: "$500", desc: "Sponsors a child's full term of education" },
  { amount: "$1,000", desc: "Funds classroom equipment and learning tools" },
  { amount: "Custom", desc: "Give any amount — every contribution matters" },
];

const corporateTiers = [
  {
    name: "Friend",
    amount: "From $500 / year",
    perks: ["Named on our website", "Annual impact report", "Director's personal thank-you letter"],
  },
  {
    name: "Partner",
    amount: "From $2,000 / year",
    perks: ["Logo on website & school banner", "Quarterly impact reports", "Site visit invitation", "Tax receipt documentation"],
    featured: true,
  },
  {
    name: "Champion",
    amount: "From $5,000 / year",
    perks: ["Named sponsorship of a classroom or facility", "Monthly impact reports", "Video updates from the school", "Board-level engagement with Director"],
  },
];

const supplies = [
  "Exercise books & stationery",
  "School uniforms & shoes",
  "Textbooks (CBC curriculum)",
  "Sports equipment",
  "Playground equipment",
  "Classroom furniture (desks & chairs)",
  "Musical instruments",
  "Art & craft supplies",
];

export default function DonorsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0f172a] py-20 text-white md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
        />
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0f172a]/95 to-[#7c2d12]/40" />

        <div className="relative mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-300">
              <Globe size={15} />
              Open to International Donors
            </div>

            <h1 className="hero-title mb-6 text-5xl font-medium leading-tight md:text-7xl">
              Every Child
              <br />
              <span className="text-[#d97706]">Deserves</span> to
              <br />
              Learn.
            </h1>

            <p className="mb-4 max-w-2xl text-lg leading-9 text-white/80">
              In 2013, Fountain of Hope Academy opened its doors in Likoni,
              Mombasa — not just as a school, but as a lifeline. Founded with a
              heart for orphans and children from the most disadvantaged
              families, Fountain of Hope Academy set an ambitious goal: that
              75% of its learners would be fully sponsored.
            </p>
            <p className="mb-10 max-w-2xl text-lg leading-9 text-white/80">
              Today, over <span className="font-bold text-white">250 children</span> who
              would otherwise have no access to education are sitting in
              classrooms, learning, growing, and dreaming — because of donors
              like you.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#sponsor"
                className="inline-flex items-center gap-3 rounded-full bg-[#d97706] px-8 py-4 font-semibold text-white transition hover:bg-[#b45309]"
              >
                <Heart size={18} />
                Sponsor a Child
              </a>
              <Link
                href="/donors/portal"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Donor Portal
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Stats ── */}
      <section className="border-b border-slate-100 bg-[#fffaf2] py-12">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-slate-900 md:text-4xl">{stat.number}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Story ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
              Our Story
            </p>
            <h2 className="hero-title mb-8 text-4xl leading-tight text-slate-900 md:text-5xl">
              Where It All Began
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <div
                className="h-[350px] w-full bg-cover bg-center md:h-[450px]"
                style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
              />
            </div>
            <div>
              <p className="mb-5 text-base leading-9 text-slate-600">
                It started with a simple but radical belief: that a child's
                circumstances of birth should not determine the ceiling of
                their future. Director <strong>Mr. Noah Mweruphe</strong> and
                a team of committed individuals pooled resources to open a
                school that would serve both fee-paying and sponsored learners
                side by side.
              </p>
              <p className="mb-5 text-base leading-9 text-slate-600">
                They began with just <strong>25 fee-paying students</strong> and
                <strong> 5 needy children</strong>. No fanfare, no large grants
                — just determination. Over a decade later, more than
                <strong> 250 sponsored children</strong> walk through those
                gates every morning.
              </p>
              <p className="mb-8 text-base leading-9 text-slate-600">
                Alumni from Fountain of Hope Academy have gone on to join
                competitive national schools including
                <strong>Maranda High School</strong>,
                <strong> Nyuki School</strong>, <strong>Kwale High</strong>, and
                <strong>Matuga Girls</strong> — proof that when you invest in a
                child, the returns are extraordinary.
              </p>
              <div className="rounded-2xl border-l-4 border-[#d97706] bg-[#fffaf2] p-5">
                <p className="text-base italic leading-8 text-slate-700">
                  "Our goal is that 75% of our learners are fully sponsored —
                  the fortunate and less fortunate, educated together, as equals."
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-500">
                  — Mr. Noah Mweruphe, Director, Fountain of Hope Academy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Where Your Money Goes ── */}
      <section className="bg-[#0f172a] py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
              Full Transparency
            </p>
            <h2 className="hero-title text-4xl leading-tight md:text-5xl">
              Where Your Money Goes
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/70">
              Every dollar donated goes directly to the children. Here is
              exactly how contributions are used.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { pct: "40%", label: "Daily Meals", desc: "Breakfast and lunch for sponsored learners every school day." },
              { pct: "25%", label: "School Supplies", desc: "Books, stationery, and learning materials for the full year." },
              { pct: "20%", label: "Uniforms", desc: "School uniform, shoes and PE kit for each sponsored child." },
              { pct: "15%", label: "Tuition & Support", desc: "Covers tuition fees, extra lessons and guidance counselling." },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="mb-2 text-4xl font-bold text-[#d97706]">{item.pct}</p>
                <p className="mb-2 font-semibold text-white">{item.label}</p>
                <p className="text-sm leading-7 text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsor a Child (Monthly) ── */}
      <section id="sponsor" className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
              Monthly Giving
            </p>
            <h2 className="hero-title text-4xl leading-tight text-slate-900 md:text-5xl">
              Sponsor a Child
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-600">
              Choose a monthly sponsorship level. You'll receive updates on
              the child you support through your donor portal.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl border-2 p-8 ${tier.color} ${tier.featured ? "ring-2 ring-[#d97706] ring-offset-2" : ""}`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#d97706] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                  {tier.icon}
                </div>
                <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${tier.badge}`}>
                  {tier.name}
                </span>
                <p className="mb-1 text-3xl font-bold text-slate-900">{tier.amount}</p>
                <p className="mb-4 text-sm text-slate-400">{tier.amountKes}</p>
                <p className="mb-6 text-sm leading-7 text-slate-600">{tier.description}</p>
                <ul className="mb-8 space-y-2">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <ShieldCheck size={14} className="shrink-0 text-[#d97706]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact-director"
                  className="block w-full rounded-full bg-[#d97706] py-3 text-center font-semibold text-white transition hover:bg-[#b45309]"
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── One-Time Donations ── */}
      <section className="bg-[#fffaf2] py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
              One-Time Gift
            </p>
            <h2 className="hero-title text-4xl leading-tight text-slate-900 md:text-5xl">
              Give Once, Impact Forever
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {oneTimeTiers.map((t) => (
              <a
                key={t.amount}
                href="#contact-director"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#d97706] hover:shadow-md"
              >
                <span className="text-2xl font-bold text-[#d97706] group-hover:scale-110 transition-transform">
                  {t.amount}
                </span>
                <p className="text-sm leading-6 text-slate-600">{t.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donate Supplies ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
                In-Kind Donations
              </p>
              <h2 className="hero-title mb-6 text-4xl leading-tight text-slate-900">
                Donate School Supplies & Materials
              </h2>
              <p className="mb-6 text-base leading-8 text-slate-600">
                Can't give cash? You can donate physical items that go directly
                into the hands of our children. We accept new or gently used
                supplies. Contact the director to arrange shipping or drop-off.
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {supplies.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-slate-700">
                    <ShieldCheck size={14} className="shrink-0 text-[#d97706]" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-[#fffaf2] p-8">
              <p className="mb-4 font-semibold text-slate-900">To donate supplies:</p>
              <ol className="space-y-4">
                {[
                  "Contact Director Mr. Noah Mweruphe using the form below",
                  "Agree on the items needed and shipping/delivery method",
                  "Ship to our address in Likoni, Mombasa or arrange with a local contact",
                  "Receive a confirmation and thank-you from the school",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d97706] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <a
                href="#contact-director"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-6 py-3 font-semibold text-white hover:bg-[#1e293b]"
              >
                Contact the Director
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Corporate Partnership ── */}
      <section className="bg-[#0f172a] py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
              For Organisations
            </p>
            <h2 className="hero-title text-4xl leading-tight md:text-5xl">
              Corporate & Organisation Partnership
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/70">
              Partner with Fountain of Hope Academy as part of your CSR
              programme. Make a measurable difference in children's lives while
              gaining recognition.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {corporateTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl border p-8 ${
                  tier.featured
                    ? "border-[#d97706] bg-[#d97706]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {tier.featured && (
                  <span className="mb-4 inline-block rounded-full bg-[#d97706] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Recommended
                  </span>
                )}
                <p className="mb-1 text-2xl font-bold text-white">{tier.name}</p>
                <p className="mb-6 text-[#d97706]">{tier.amount}</p>
                <ul className="space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm leading-6 text-white/75">
                      <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#d97706]" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact-director"
                  className="mt-8 flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Enquire Now <ArrowRight size={15} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donor Portal CTA ── */}
      <section className="bg-[#fffaf2] py-16">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-[#0f172a] text-white">
            <div className="p-8 md:p-12">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/20 text-[#d97706]">
                <Building2 size={28} />
              </div>
              <h2 className="hero-title mb-4 text-3xl leading-tight md:text-4xl">
                Already a Donor? Access Your Portal
              </h2>
              <p className="mb-8 max-w-xl text-base leading-8 text-white/75">
                Log in to your donor portal to see updates on the children you
                support, view your donation history, read school news, and send
                messages directly to the director.
              </p>
              <Link
                href="/donors/portal"
                className="inline-flex items-center gap-3 rounded-full bg-[#d97706] px-8 py-4 font-semibold text-white transition hover:bg-[#b45309]"
              >
                Go to Donor Portal
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Director Form ── */}
      <section id="contact-director" className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
                Get in Touch
              </p>
              <h2 className="hero-title mb-6 text-4xl leading-tight text-slate-900">
                Contact the Director
              </h2>
              <p className="mb-8 text-base leading-8 text-slate-600">
                All donation arrangements are handled personally by
                Director <strong>Mr. Noah Mweruphe</strong>. Fill in the form
                and he will respond within 48 hours to discuss how you can
                best support the children of Fountain of Hope Academy.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#fffaf2] p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email the Director</p>
                    <a
                      href="mailto:excellentkenya@gmail.com"
                      className="text-sm text-[#d97706] hover:underline"
                    >
                      excellentkenya@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#fffaf2] p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                    <Globe size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">International Callers</p>
                    <a
                      href="https://wa.me/254722916174"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#25D366] hover:underline"
                    >
                      WhatsApp: +254 722 916174
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-[#fffaf2] p-5">
                  <p className="mb-1 font-semibold text-slate-900">Trust & Transparency</p>
                  <p className="text-sm leading-7 text-slate-600">
                    Fountain of Hope Academy operates with full commitment to
                    child protection, safeguarding, discipline policy, and
                    health & safety standards. All donations are used directly
                    for the children's education and welfare.
                  </p>
                </div>
              </div>
            </div>

            <DonorContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
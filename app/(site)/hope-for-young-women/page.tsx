import type { Metadata } from "next";
import Link from "next/link";
import IntaSendDonateButton from "@/components/donate/IntaSendDonateButton";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { siteData } from "@/data/site";
import {
  HeartHandshake,
  Users,
  ShieldAlert,
  HandHeart,
  Sparkles,
  BookOpen,
  Handshake,
  GraduationCap,
  MessageCircleHeart,
  LifeBuoy,
  Quote,
  ArrowRight,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Hope for Young Women — ${siteData.orgName}`,
  description:
    "Hope for Young Women is a JCFM initiative walking with young women and the vulnerable from hardship into a life lived with dignity — through prayer, mentorship, and skills that restore hope.",
  alternates: { canonical: "/hope-for-young-women" },
};

const NEEDS = [
  {
    icon: HeartHandshake,
    title: "Early Marriage",
    desc: "Many girls are given in marriage before they are ready to face what life demands.",
  },
  {
    icon: Quote,
    title: "Loss & Grief",
    desc: "The sudden death of a spouse can plunge a woman into overwhelming darkness.",
  },
  {
    icon: Users,
    title: "Isolation",
    desc: "Unprocessed grief often deepens into depression and withdrawal from community.",
  },
  {
    icon: ShieldAlert,
    title: "No Safety Net",
    desc: "Without support, vulnerable women can be left with nowhere to turn.",
  },
];

const PILLARS = [
  {
    icon: BookOpen,
    title: "Nurture",
    desc: "Foster personal relationships between young women and God through prayer.",
    verse: "“Confess your sins to one another and pray for one another, that you may be healed.”",
    ref: "James 5:16",
  },
  {
    icon: Handshake,
    title: "Mentorship",
    desc: "Connecting young women with mature mentors who model faith and life convictions.",
    verse: "“I can do all things through Christ who strengthens me.”",
    ref: "Philippians 4:13",
  },
  {
    icon: Sparkles,
    title: "Outreach",
    desc: "Equipping young women with skills and knowledge to become self-reliant.",
    verse: "“The way of a fool is right in his own eyes, but a wise man listens to advice.”",
    ref: "Proverbs 18:15",
  },
];

const PROGRAMS = [
  {
    icon: MessageCircleHeart,
    title: "Counseling & Spiritual Support",
    desc: "One-on-one and group support to process grief and rebuild faith.",
  },
  {
    icon: GraduationCap,
    title: "Skills Training & Empowerment",
    desc: "Vocational training and small-business support toward financial independence.",
  },
  {
    icon: Users,
    title: "Community & Mentorship",
    desc: "Support circles where women walk alongside one another as they heal.",
  },
  {
    icon: LifeBuoy,
    title: "Emergency Support",
    desc: "Immediate practical assistance for widows and women in crisis.",
  },
];

const VALUES = ["Dignity", "Restoration", "Community", "Faith"];

const SCRIPTURES = [
  { verse: "Beauty for ashes, oil of gladness for mourning.", ref: "Isaiah 61:3" },
  { verse: "I will restore the years the locust has eaten.", ref: "Joel 2:25" },
  { verse: "Behold, I am making all things new.", ref: "Revelation 21:5" },
];

const PARTNER_LEVELS = [
  {
    title: "Prayer Partner",
    desc: "Cover a small circle of young women in prayer for 30 days. No cost — just a committed heart.",
  },
  {
    title: "Education Partner",
    desc: "Help sponsor school fees, materials, or transport for a young woman continuing her education.",
  },
  {
    title: "Empowerment Partner",
    desc: "Help sponsor a young woman through a skills or vocational course toward independence.",
  },
  {
    title: "Hope Builder",
    desc: "Help launch a new mentorship circle — and a team of mentors — in another community.",
  },
];

export default function HopeForYoungWomenPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Breadcrumb items={[{ name: "Hope for Young Women", path: "/hope-for-young-women" }]} />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#4c1d95] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4c1d95] via-[#4c1d95]/95 to-[#7c3aed]/30" />
        <div className="relative mx-auto max-w-[1100px] px-5 text-center lg:px-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[#c4b5fd]">
            A JCFM Initiative
          </p>
          <h1 className="hero-title mb-6 text-4xl leading-tight md:text-6xl">
            Hope for
            <br />
            <span className="text-[#c9a961]">Young Women</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-white/85 md:text-lg">
            Restoring dignity. Rebuilding lives. Showing God&rsquo;s love.
            We walk alongside young women and the vulnerable — from
            hardship into a life lived with dignity.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#give"
              className="inline-flex items-center gap-2 rounded-full bg-[#c9a961] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#0b2545] transition hover:bg-[#dab975]"
            >
              Give to This Ministry
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-[#4c1d95]"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Need ── */}
      <section className="bg-[#fafaf8] py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
              The Need We Answer
            </p>
            <h2 className="hero-title text-3xl leading-tight text-slate-900 md:text-4xl">
              A Story That Repeats Too Often
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Across our communities, countless young women face hardship
              that goes unseen — girls pushed into marriage before they are
              ready, wives widowed too soon, mothers left to carry grief
              alone. Without support, sorrow can harden into isolation, and
              isolation into hopelessness.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {NEEDS.map((n) => (
              <div key={n.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4c1d95]/10 text-[#4c1d95]">
                  <n.icon size={22} strokeWidth={1.75} />
                </div>
                <p className="font-semibold text-slate-900">{n.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{n.desc}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-lg italic text-slate-700">
            The question is not &ldquo;Who failed them?&rdquo; The question
            is &ldquo;Who will show up for them now?&rdquo;
          </p>
        </div>
      </section>

      {/* ── Where It Began (Pastor Sarah, kept general — full story is
          shared personally by Pastor Sarah in presentations, not published
          here) ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-5 text-center lg:px-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
            Where It Began
          </p>
          <h2 className="hero-title text-3xl leading-tight text-slate-900 md:text-4xl">
            Pastor Sarah&rsquo;s Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-600">
            Hope for Young Women was born out of Pastor Sarah&rsquo;s own
            journey through hardship, loss, and God&rsquo;s faithful
            restoration. Rather than let her story end at its lowest moment,
            she chose to turn that pain into purpose — and from that
            conviction, this ministry was born. Pastor Sarah shares her full
            testimony personally at ministry gatherings and presentations;
            here, we simply invite you into what her journey inspired.
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-2xl border-l-4 border-[#c9a961] bg-[#fffaf0] p-6 text-left">
            <Quote size={20} className="text-[#c9a961]" />
            <p className="mt-3 font-serif text-lg italic leading-8 text-slate-800">
              &ldquo;Every woman deserves a life lived in dignity — not
              defined by her lowest moment.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── A Life Restored (anonymised testimony) ── */}
      <section className="bg-[#4c1d95] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[800px] px-5 text-center lg:px-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd]">
            A Life Restored
          </p>
          <Quote size={24} className="mx-auto text-[#c9a961]" />
          <p className="mt-4 font-serif text-xl italic leading-9 text-white/90 md:text-2xl">
            One young woman we walked with faced a second pregnancy while
            still finishing school — a season when many around her said she
            should quit. We stayed with her instead: through hospital visits,
            back into the classroom, all the way to a certificate in
            Accounts and Computer Studies from Kitale Polytechnic.
          </p>
          <p className="mt-6 text-base text-white/70">
            Today she is working, raising her children, and telling her own
            testimony to other young women who feel like their story is
            over.
          </p>
        </div>
      </section>

      {/* ── Why We Exist / Pillars ── */}
      <section className="bg-[#fafaf8] py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
              Why We Exist
            </p>
            <h2 className="hero-title text-3xl leading-tight text-slate-900 md:text-4xl">
              Our Model: Three Pillars
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              We meet women in their darkest place and walk with them toward
              a life restored — because the end of one chapter should never
              be mistaken for the end of the story.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4c1d95]/10 text-[#4c1d95]">
                  <p.icon size={22} strokeWidth={1.75} />
                </div>
                <p className="font-serif text-xl font-semibold text-slate-900">{p.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{p.desc}</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="font-serif text-sm italic leading-6 text-slate-500">{p.verse}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c9a961]">
                    {p.ref}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-[#0b2545] py-16 text-white md:py-24">
        <div className="mx-auto max-w-[1100px] px-5 lg:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c9a961]">
                Mission
              </p>
              <p className="font-serif text-lg leading-8 text-white/90">
                To restore the dignity of young women and the vulnerable
                through counsel, community, and spiritual support —
                rebuilding lives marked by hope, and showing them the love
                of God at every step.
              </p>
            </div>
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c9a961]">
                Vision
              </p>
              <p className="font-serif text-lg leading-8 text-white/90">
                A community where no young woman sees hardship as the end
                of her story — where every woman knows a life of dignity,
                purpose, and God&rsquo;s love is still hers to live.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v} className="rounded-xl border border-white/15 bg-white/5 py-5 text-center">
                <p className="font-serif text-sm font-semibold uppercase tracking-[0.18em] text-[#c9a961]">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
              What We Do
            </p>
            <h2 className="hero-title text-3xl leading-tight text-slate-900 md:text-4xl">
              Walking With Her, Every Month
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-[#fafaf8] p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4c1d95]/10 text-[#4c1d95]">
                  <p.icon size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{p.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision / Goal ── */}
      <section className="bg-[#fffaf0] py-16 md:py-20">
        <div className="mx-auto max-w-[800px] px-5 text-center lg:px-6">
          <HandHeart size={28} className="mx-auto text-[#c9a961]" strokeWidth={1.75} />
          <p className="mt-4 text-base leading-8 text-slate-700">
            We believe when one young woman is restored, a generation is
            lifted. Our goal is to walk with{" "}
            <span className="font-semibold text-slate-900">
              1,000 young women over the next five years
            </span>{" "}
            — spiritually rooted, skilled, confident, and giving back.
          </p>
          <p className="mt-5 font-serif text-lg italic text-[#4c1d95]">
            &ldquo;Do not despise small beginnings.&rdquo; — Zechariah 4:10
          </p>
          <p className="mt-2 text-sm text-slate-500">
            We are starting small. But we are starting.
          </p>
        </div>
      </section>

      {/* ── Scripture Foundation ── */}
      <section className="bg-[#4c1d95] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1100px] px-5 lg:px-6">
          <p className="mb-10 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd]">
            Scripture Foundation
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {SCRIPTURES.map((s) => (
              <div key={s.ref} className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center">
                <p className="font-serif text-lg italic leading-8 text-white/90">
                  &ldquo;{s.verse}&rdquo;
                </p>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c9a961]">
                  {s.ref}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner With Us / Give ── */}
      <section id="give" className="bg-[#fafaf8] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-6">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
              How You Can Partner
            </p>
            <h2 className="hero-title mb-6 text-3xl leading-tight text-slate-900">
              Walk With Us
            </h2>
            <p className="mb-6 text-base leading-8 text-slate-600">
              Every dollar goes to direct support, mentorship, and training
              for young women rebuilding their lives. Every story is
              tracked, and we report testimonies and outcomes to our
              partners.
            </p>
            <div className="space-y-4">
              {PARTNER_LEVELS.map((p) => (
                <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="font-semibold text-slate-900">{p.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
              Give Now
            </p>
            <h2 className="hero-title mb-8 text-3xl leading-tight text-slate-900">
              Support Hope for Young Women
            </h2>
            <IntaSendDonateButton purpose="Hope for Young Women" />
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-[#4c1d95]" />
                <div>
                  <p className="font-semibold text-slate-900">Prefer to talk first?</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Reach the office directly, or churches and organisations
                    wanting to partner and expand this work into new
                    communities.
                  </p>
                  <a
                    href={`mailto:${siteData.email}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#4c1d95] hover:underline"
                  >
                    Email {siteData.email}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing Word ── */}
      <section className="bg-[#0b2545] py-16 text-white md:py-24">
        <div className="mx-auto max-w-[800px] px-5 text-center lg:px-6">
          <Quote size={26} className="mx-auto text-[#c9a961]" />
          <p className="mt-5 font-serif text-xl italic leading-9 text-white/90 md:text-2xl">
            This is not charity. This is redemption. You are not just
            paying school fees — you are restoring a name. You are not just
            funding a program — you are answering a 2am prayer.
          </p>
          <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#c9a961]">
            — Pastor Sarah
          </p>
          <p className="mt-8 font-serif text-lg text-white/75">
            Join us. Let&rsquo;s build hope, one girl at a time.
          </p>
          <p className="mt-3 text-sm italic text-white/50">
            Hope for Young Women — because no girl should walk alone.
          </p>
        </div>
      </section>
    </main>
  );
}

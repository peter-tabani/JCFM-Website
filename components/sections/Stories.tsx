import Link from "next/link";
import {
  Globe,
  Heart,
  HandHeart,
  GraduationCap,
  Users,
  ArrowRight,
  Church,
  Mail,
} from "lucide-react";

const PATHWAYS = [
  {
    icon: Church,
    title: "Minister With Us",
    desc: "Preach, teach, or lead worship at any of our branches. Share your gifts and experience the power of the Kenyan church firsthand.",
    accent: "bg-[#4c1d95]",
    hoverBg: "hover:bg-[#4c1d95]",
    ring: "border-[#4c1d95]",
    text: "text-[#4c1d95]",
    href: "/#contact",
    cta: "Apply Now",
  },
  {
    icon: Users,
    title: "Partner & Volunteer",
    desc: "Join our outreach teams, help at the school, assist with building projects, or serve alongside our medical and community programmes.",
    accent: "bg-[#15803d]",
    hoverBg: "hover:bg-[#15803d]",
    ring: "border-[#15803d]",
    text: "text-[#15803d]",
    href: "/#contact",
    cta: "Get Involved",
  },
  {
    icon: HandHeart,
    title: "Pray & Fellowship",
    desc: "Come for a season of prayer, spiritual retreat, and deep fellowship. Walk with us through worship, prayer nights, and home visits.",
    accent: "bg-[#dc2626]",
    hoverBg: "hover:bg-[#dc2626]",
    ring: "border-[#dc2626]",
    text: "text-[#dc2626]",
    href: "/journey",
    cta: "Learn More",
  },
  {
    icon: Heart,
    title: "Sponsor & Give",
    desc: "Support a pupil at Fountain of Hope Academy, fund a classroom, sponsor a pastor, or give toward a specific project that touches lives.",
    accent: "bg-[#a8201a]",
    hoverBg: "hover:bg-[#a8201a]",
    ring: "border-[#a8201a]",
    text: "text-[#a8201a]",
    href: "/donors/portal",
    cta: "Give Today",
  },
];

const FORMATIONS = [
  {
    icon: HandHeart,
    title: "Daily Prayer Circles",
    desc: "Join dawn and evening intercession with pastors, intercessors, and families believing for revival across Kenya.",
  },
  {
    icon: GraduationCap,
    title: "Teaching & Discipleship",
    desc: "Serve in Bible classes, mentor students at Fountain of Hope Academy, and help equip emerging leaders.",
  },
  {
    icon: Users,
    title: "Community Outreach",
    desc: "Walk with our visitation teams into villages, hospitals, and prisons to pray, encourage, and meet practical needs.",
  },
  {
    icon: Heart,
    title: "Home Fellowships",
    desc: "Live among local believers, share meals, testimonies, and nightly devotionals that knit the family of faith together.",
  },
];

export default function Stories() {
  return (
    <section id="stories" className="border-b border-white/10 bg-[#080b16]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">

        {/* ── Header ── */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] text-white sm:text-3xl md:text-5xl">
            Come &amp; Join Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-white/66 md:mt-5 md:text-[15px] md:leading-8">
            Jesus Christ Founder Ministry is rooted in Kenya, but our doors are
            open to the world. Whether you are a pastor, a student, a
            professional, or simply a believer with a willing heart, there is a
            place for you here.
          </p>
        </div>

        {/* ── Pathway cards ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PATHWAYS.map((p) => (
            <div
              key={p.title}
              className={`group flex flex-col border ${p.ring} bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:p-7`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center ${p.accent} text-white shadow-sm`}
              >
                <p.icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-serif text-lg font-semibold uppercase tracking-wide text-white md:text-xl">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-6 text-white/62 md:text-[14px] md:leading-7">
                {p.desc}
              </p>
              <Link
                href={p.href}
                className={`mt-5 inline-flex items-center gap-2 border-2 ${p.ring} px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] ${p.text} transition ${p.hoverBg} hover:text-white`}
              >
                {p.cta}
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          ))}
        </div>

        {/* ── Space Divider ── */}
        <div className="h-20 md:h-32" />

        {/* ── Experience with us ── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: copy */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#a8201a]">
              While You Are With Us
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-3xl md:text-[32px]">
              Grow With Us in Christ
            </h3>
            <p className="mt-4 text-[14px] leading-7 text-white/66 md:text-[15px] md:leading-8">
              Coming to serve with JCFM is first and foremost a spiritual
              journey. You will worship alongside Kenyan believers, pray with
              families in their homes, teach in our school, and share in the
              joy of seeing lives transformed by the Gospel.
            </p>
            <p className="mt-3 text-[14px] leading-7 text-white/66 md:text-[15px] md:leading-8">
              We welcome you not as a tourist, but as a brother or sister in
              Christ. Together we will study Scripture, serve the community,
              and encourage one another in faith. This is the heart of what we
              do — and we would be honoured to share it with you.
            </p>

            <div className="mt-8 flex flex-wrap gap-0 md:mt-10">
              <Link
                href="/#contact"
              className="flex items-center gap-2 bg-[#7c3aed] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6d28d9]"
              >
                <Mail size={14} strokeWidth={2.5} />
                Apply or Enquire
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Right: cards */}
          <div className="hidden gap-4 sm:grid-cols-2 md:grid">
            {FORMATIONS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#7c3aed]/50 hover:bg-white/[0.07] md:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-[#c4b5fd]/30 bg-[#7c3aed]/20 text-[#c4b5fd]">
                  <item.icon size={18} strokeWidth={1.75} />
                </div>
                <h4 className="mt-4 font-serif text-base font-semibold text-white">
                  {item.title}
                </h4>
                <p className="mt-1 text-[13px] leading-6 text-white/62">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Closing line ── */}
        <div className="mt-14 flex items-center justify-center gap-4 md:mt-20">
          <span className="h-[1px] flex-1 max-w-[120px] bg-white/15" />
          <p className="font-serif text-base italic text-white/62">
            &ldquo;How beautiful upon the mountains are the feet of him that bringeth
            good tidings.&rdquo; &mdash; Isaiah 52:7
          </p>
          <span className="h-[1px] flex-1 max-w-[120px] bg-white/15" />
        </div>
      </div>
    </section>
  );
}

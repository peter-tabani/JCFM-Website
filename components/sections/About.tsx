import { ShieldCheck, HeartHandshake, Trophy, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="bg-white">

      {/* ── Part 1: Dark intro strip ── */}
      <div className="bg-[#0f172a] px-4 py-16 md:py-24 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">

            {/* Heading + stats */}
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
                About KES
              </p>
              <h2 className="hero-title mb-6 text-4xl font-medium leading-tight text-white md:text-5xl lg:text-6xl">
                More than a school —
                <br />
                <span className="text-[#d97706]">a lifeline.</span>
              </h2>
              <p className="mb-8 max-w-xl text-base leading-9 text-white/65 md:text-lg">
                Founded in 2013 in Likoni, Mombasa, KES was built on one
                belief: that every child deserves quality education —
                regardless of what their family can afford.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { n: "250+", l: "Sponsored\nChildren" },
                  { n: "150+", l: "Fee-Paying\nLearners" },
                  { n: "10+", l: "National\nSchool Alumni" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-2xl font-bold text-[#d97706] md:text-3xl">{s.n}</p>
                    <p className="mt-1 whitespace-pre-line text-xs leading-5 text-white/50">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Story card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-9">
              <p className="mb-5 text-sm font-bold uppercase tracking-widest text-[#d97706]">
                Our Story
              </p>
              <p className="mb-5 text-base leading-9 text-white/75">
                It started with just{" "}
                <strong className="text-white">25 fee-paying students</strong>{" "}
                and <strong className="text-white">5 needy children</strong> —
                orphans and kids from the most disadvantaged families in
                Likoni. Director{" "}
                <strong className="text-white">Mr. Noah Mweruphe</strong> and a
                team of committed individuals believed the fortunate and less
                fortunate should learn side by side, as equals.
              </p>
              <p className="mb-6 text-base leading-9 text-white/75">
                Over a decade later, more than{" "}
                <strong className="text-white">250 sponsored children</strong>{" "}
                walk through those gates every morning — and alumni are gaining
                entry to national schools like{" "}
                <strong className="text-white">Maranda High</strong>,{" "}
                <strong className="text-white">Kwale High</strong>, and{" "}
                <strong className="text-white">Matuga Girls</strong>.
              </p>
              <div className="border-l-4 border-[#d97706] pl-4">
                <p className="text-sm italic leading-8 text-white/55">
                  &ldquo;Our goal is that 75% of our learners are fully sponsored —
                  the fortunate and less fortunate, educated together.&rdquo;
                </p>
                <p className="mt-2 text-xs font-bold text-[#d97706]">
                  — Mr. Noah Mweruphe, Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Part 2: Vision, Mission & Values ── */}
      <div className="bg-[#fffaf2] px-4 py-14 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
              What We Stand For
            </p>
            <h3 className="hero-title text-3xl text-slate-900 md:text-4xl">
              Vision, Mission & Values
            </h3>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
            {[
              {
                icon: <Trophy size={20} />,
                title: "Vision",
                body: "To be the best in providing quality education and care to the young.",
              },
              {
                icon: <Users size={20} />,
                title: "Mission",
                body: "To consolidate resources and partnerships to educate and care for all learners — fortunate and less fortunate alike.",
              },
              {
                icon: <ShieldCheck size={20} />,
                title: "Core Values",
                body: "Discipline, honesty, hard work, integrity, and close relationships among all staff and learners.",
              },
              {
                icon: <HeartHandshake size={20} />,
                title: "Our Promise",
                body: "Every child — sponsored or fee-paying — receives the same quality of education, attention, and care.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group w-[75vw] shrink-0 snap-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#d97706]/40 hover:shadow-md lg:w-auto lg:shrink"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706] transition group-hover:bg-[#d97706] group-hover:text-white">
                  {card.icon}
                </div>
                <h4 className="mb-2 font-bold text-slate-900">{card.title}</h4>
                <p className="text-sm leading-7 text-slate-500">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Part 3: Image + Achievements ── */}
      <div className="bg-white px-4 py-14 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-stretch lg:gap-12">

            {/* Image */}
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <div
                className="h-[260px] w-full bg-cover bg-center transition-transform duration-700 hover:scale-105 md:h-[380px] lg:h-full lg:min-h-[420px]"
                style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
              />
            </div>

            {/* Achievements */}
            <div className="flex flex-col justify-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
                What We Have Achieved
              </p>
              <h3 className="hero-title mb-6 text-3xl leading-tight text-slate-900 md:text-4xl">
                Results that speak for themselves.
              </h3>
              <div className="mb-8 space-y-4">
                {[
                  { badge: "Academics", text: "Best in Academics at sub-county level — consistently posting competitive KJSEA results." },
                  { badge: "Scouting", text: "Top performers in Scouting at sub-county level, building leadership and teamwork." },
                  { badge: "Sports", text: "Highly competitive in Athletics and Taekwondo, representing Likoni at county level." },
                  { badge: "Alumni", text: "Graduates admitted to Maranda High, Nyuki School, Kwale High and Matuga Girls." },
                ].map((item) => (
                  <div key={item.badge} className="flex items-start gap-4">
                    <span className="mt-0.5 shrink-0 rounded-full bg-[#d97706] px-3 py-0.5 text-xs font-bold text-white">
                      {item.badge}
                    </span>
                    <p className="text-sm leading-7 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#d97706]/30 bg-[#fffaf2] px-5 py-2.5 text-sm font-semibold text-[#d97706]">
                 Motto: Natuwe Mbele Daima
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-full bg-[#d97706] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#b45309]"
                >
                  Join KES <ArrowRight size={16} />
                </Link>
                <Link
                  href="/donors/portal"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-[#d97706] hover:text-[#d97706]"
                >
                  Support a Child <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
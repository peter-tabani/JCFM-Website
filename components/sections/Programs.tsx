"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    id: "ecde",
    title: "ECDE",
    subtitle: "PP1 - PP2",
    image: "/images/programs/ecde.jpg",
    fallbackColor: "from-blue-600 to-indigo-500",
    description:
      "Early childhood development focused on play-based learning, literacy, numeracy, confidence, and social skills. We welcome children from age 3 in a warm, Christ-centered environment that builds a lifelong love for learning.",
    details: ["Ages 3 and above", "PP1 & PP2", "CBC Curriculum"],
  },
  {
    id: "primary",
    title: "Primary School",
    subtitle: "Grade 1 - 6",
    image: "/images/programs/primary.jpg",
    fallbackColor: "from-blue-700 to-blue-500",
    description:
      "A balanced CBC-based programme emphasising Mathematics, Science, Social Studies, Communication, and Biblical character formation. Learners are guided to grow academically and develop strong moral values rooted in faith.",
    details: ["Grade 1 - 6", "CBC Curriculum", "KPSEA Assessment"],
  },
  {
    id: "junior",
    title: "Junior Secondary",
    subtitle: "Grade 7 - 9",
    image: "/images/programs/junior.jpg",
    fallbackColor: "from-slate-700 to-slate-600",
    description:
      "Learner-centred preparation developing critical thinking, creativity, and responsibility. Assessed through the Kenya Junior Secondary Education Assessment (KJSEA), our alumni have joined top national schools.",
    details: ["Grade 7 - 9", "CBC Curriculum", "KJSEA Assessment"],
  },
  {
    id: "islamic",
    title: "Integrated Faith",
    subtitle: "Spiritual Growth",
    image: "/images/programs/islamic.jpg",
    fallbackColor: "from-purple-700 to-indigo-600",
    description:
      "A Christ-centered approach to education where spiritual growth goes hand in hand with academic excellence. Morning devotions, Bible lessons, and chapel services nurture each child's relationship with God.",
    details: ["All levels", "Morning Devotions", "Bible Studies"],
  },
];

function FlipCard({ program }: { program: typeof programs[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group h-[380px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Card wrapper, rotates */}
      <div
        className="relative h-full w-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${program.image}')` }}
          />
          {/* Fallback gradient if no image */}
          <div className={`absolute inset-0 bg-gradient-to-br ${program.fallbackColor} opacity-30`} />
          {/* Dark overlay at bottom for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-7">
            {/* Top: emoji badge */}
            <div className="flex items-start justify-between">
              <span className="rounded-2xl bg-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {program.subtitle}
              </span>
              
            </div>

            {/* Bottom: title + hint */}
            <div>
              <h3 className="hero-title mb-1 text-2xl font-semibold text-white md:text-3xl">
                {program.title}
              </h3>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-white/60">
                <span className="hidden md:inline">Hover</span>
                <span className="md:hidden">Tap</span>
                to learn more
                <ArrowRight size={12} />
              </p>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl bg-[#1e3a5f] p-7 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Purple accent top bar */}
          <div className="mb-5 h-1 w-12 rounded-full bg-[#7c3aed]" />

          <span className="mb-4 inline-block rounded-full bg-[#7c3aed]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#c4b5fd]">
            {program.subtitle}
          </span>

          <h3 className="hero-title mb-4 text-2xl text-white">{program.title}</h3>

          <p className="mb-6 text-sm leading-8 text-white/70">
            {program.description}
          </p>

          {/* Detail tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {program.details.map((d) => (
              <span
                key={d}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
              >
                {d}
              </span>
            ))}
          </div>

          <Link
            href="/admissions"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1d4ed8] transition"
          >
            Apply Now <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  return (
    <section id="school" className="bg-[#fdfbf7] py-20">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#16a34a]">
            Our Learning Path, CBC Curriculum
          </p>
          <h2 className="hero-title text-4xl leading-tight text-slate-900 md:text-5xl">
            Programs for Every Stage of Growth
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-500">
            From early childhood through Junior Secondary, tap or hover each
            card to discover what we offer at JCFM School.
          </p>
        </div>

        {/* Flip Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {programs.map((program) => (
            <FlipCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { School, BookOpen, GraduationCap, Baby } from "lucide-react";

export default function Programs() {
  return (
    <section id="programs" className="relative overflow-hidden py-24">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/school-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#0f172a]/75" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 lg:px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Our Learning Path — CBC Curriculum
          </p>
          <h3 className="hero-title text-4xl leading-tight text-white md:text-5xl">
            Programs Designed for Every Stage of Growth
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/75">
            From early childhood through Junior Secondary (Grade 9), our
            programs follow the Competency-Based Curriculum (CBC) to nurture
            well-rounded, confident learners.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* ECDE */}
          <div className="rounded-2xl bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
              <Baby size={24} />
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#d97706]">PP1 – PP2</p>
            <h4 className="mb-3 text-2xl font-semibold text-slate-900">ECDE</h4>
            <p className="leading-8 text-slate-600">
              Early childhood development focused on play-based learning,
              literacy, numeracy, confidence, and social skills.
            </p>
          </div>

          {/* Primary */}
          <div className="rounded-2xl bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
              <School size={24} />
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#d97706]">Grade 1 – 6</p>
            <h4 className="mb-3 text-2xl font-semibold text-slate-900">Primary School</h4>
            <p className="leading-8 text-slate-600">
              A balanced CBC-based program emphasising mathematics, science,
              social studies, communication, and character formation.
            </p>
          </div>

          {/* Junior Secondary */}
          <div className="rounded-2xl bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
              <BookOpen size={24} />
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#d97706]">Grade 7 – 9</p>
            <h4 className="mb-3 text-2xl font-semibold text-slate-900">Junior Secondary</h4>
            <p className="leading-8 text-slate-600">
              Learner-centered preparation developing critical thinking,
              creativity, and responsibility — assessed through KJSEA.
            </p>
          </div>

          {/* Islamic Curriculum */}
          <div className="rounded-2xl bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
              <GraduationCap size={24} />
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#d97706]">Special Programme</p>
            <h4 className="mb-3 text-2xl font-semibold text-slate-900">Islamic Curriculum</h4>
            <p className="leading-8 text-slate-600">
              An integrated Madrasa programme offering Islamic studies
              alongside the standard curriculum for Muslim learners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
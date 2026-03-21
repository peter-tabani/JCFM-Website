import { School, BookOpen, GraduationCap } from "lucide-react";

export default function Programs() {
  return (
    <section id="programs" className="relative overflow-hidden py-24">
      {/* Performance-Optimized Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        {/* You will place your optimized mp4 video in the public/videos folder */}
        <source src="/videos/school-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay to make the text and cards readable */}
      <div className="absolute inset-0 bg-[#0f172a]/75" />

      {/* Content wrapper with relative z-index to sit above the video */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 lg:px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Our Learning Path
          </p>
          <h3 className="hero-title text-4xl leading-tight text-white md:text-5xl">
            Programs Designed for Every Stage of Growth
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
              <School size={24} />
            </div>
            <h4 className="mb-3 text-2xl font-semibold text-slate-900">
              Pre-Primary
            </h4>
            <p className="leading-8 text-slate-600">
              Early childhood learning focused on strong foundations in
              literacy, numeracy, confidence, and social development.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
              <BookOpen size={24} />
            </div>
            <h4 className="mb-3 text-2xl font-semibold text-slate-900">
              Primary School
            </h4>
            <p className="leading-8 text-slate-600">
              A balanced CBC-based program emphasizing mathematics, science,
              social studies, communication, and character formation.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
              <GraduationCap size={24} />
            </div>
            <h4 className="mb-3 text-2xl font-semibold text-slate-900">
              Secondary
            </h4>
            <p className="leading-8 text-slate-600">
              Learner-centered preparation that develops critical thinking,
              creativity, responsibility, and readiness for higher levels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
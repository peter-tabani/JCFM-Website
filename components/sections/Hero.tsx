import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-[center_35%]"
        style={{
          backgroundImage: "url('/images/hero/kecs-gate.webp')",
        }}
      />
      <div className="absolute inset-0 bg-[#0f172a]/72" />

      <div className="relative mx-auto flex min-h-[78vh] max-w-[1400px] items-center px-4 py-12 lg:px-6">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
              Welcome to KES
            </p>

            <h2 className="hero-title mb-6 text-5xl font-medium leading-[0.95] md:text-7xl">
              Kenya Excellent
              <br />
              Centre & School
            </h2>

            <p className="mb-8 max-w-2xl text-base leading-8 text-white/90 md:text-xl">
              A private school in Likoni, Mombasa offering a nurturing
              learning journey from early childhood to  secondary,
              grounded in academic excellence, discipline, and moral integrity.
            </p>

            <div className="mb-8 flex flex-wrap gap-4">
              <a
                href="#admissions"
                className="inline-flex items-center gap-3 bg-[#d97706] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#b45309]"
              >
                Apply for Admission
                <ArrowRight size={18} />
              </a>

              <a
                href="#programs"
                className="inline-flex items-center gap-3 border border-white/40 bg-black/20 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Explore Programs
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="max-w-2xl rounded-md border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-sm leading-7 text-white/90 md:text-base">
                <span className="font-semibold text-white">Motto:</span>{" "}
                Where junior heroes are graduated to senior skilled-experts.
              </p>
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <button className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-white text-[#d97706] shadow-2xl transition hover:scale-105">
              <span className="absolute inset-[-16px] rounded-full border border-white/40" />
              <span className="absolute inset-[-30px] rounded-full border border-white/20" />
              <span className="ml-1 text-2xl">▶</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
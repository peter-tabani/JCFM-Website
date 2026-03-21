import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/site";

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
              A private school in Likoni–Shelley Beach, Mombasa, offering a
              nurturing learning journey from early childhood to junior
              secondary, grounded in academic excellence, discipline, and moral
              integrity. Founded in 2013 to serve both sponsored and fee-paying
              learners alike.
            </p>

            <div className="mb-8 flex flex-wrap gap-4">
              {/* ✅ Links to the full admissions page */}
              <Link
                href="/admissions"
                className="inline-flex items-center gap-3 bg-[#d97706] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#b45309]"
              >
                Apply for Admission
                <ArrowRight size={18} />
              </Link>

              <Link
                href="#programs"
                className="inline-flex items-center gap-3 border border-white/40 bg-black/20 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Explore Programs
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Motto Banner */}
            <div className="max-w-2xl rounded-md border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-sm leading-7 text-white/90 md:text-base">
                <span className="font-semibold text-orange-300">Motto:</span>{" "}
                <span className="italic">&ldquo;{siteData.motto}&rdquo;</span>
                <span className="ml-2 text-white/60">— Always Ahead</span>
              </p>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="hidden lg:flex lg:flex-col lg:items-end lg:gap-6">
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-5 text-center">
                <p className="text-3xl font-bold text-orange-300">250+</p>
                <p className="mt-1 text-xs text-white/75 leading-5">Sponsored<br/>Children</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-5 text-center">
                <p className="text-3xl font-bold text-orange-300">150+</p>
                <p className="mt-1 text-xs text-white/75 leading-5">Fee-Paying<br/>Learners</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-5 text-center">
                <p className="text-3xl font-bold text-orange-300">2013</p>
                <p className="mt-1 text-xs text-white/75 leading-5">Year<br/>Founded</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-5 text-center">
                <p className="text-3xl font-bold text-orange-300">Gr. 9</p>
                <p className="mt-1 text-xs text-white/75 leading-5">Highest<br/>Grade</p>
              </div>
            </div>

            {/* Play button */}
            <button className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#d97706] shadow-2xl transition hover:scale-105">
              <span className="absolute inset-[-14px] rounded-full border border-white/40" />
              <span className="absolute inset-[-28px] rounded-full border border-white/20" />
              <span className="ml-1 text-xl">▶</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
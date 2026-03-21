import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import {
  ArrowRight,
  ShieldCheck,
  Bus,
  UtensilsCrossed,
  HeartHandshake,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Extracted Layout Components */}
      <TopBar />
      <Header />
      <Navbar />

      {/* Extracted Hero Component */}
      <Hero />

      {/* Extracted About Component */}
      <About />

      {/* Extracted Programs Component */}
      <Programs />

      {/* Why Choose KECS */}
      <section id="why-kecs" className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
              Why Choose KES
            </p>
            <h3 className="hero-title text-4xl leading-tight text-slate-900 md:text-5xl">
              A School Experience Built Around Learning, Care, and Support
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <ShieldCheck size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">Discipline & Values</h4>
              <p className="leading-8 text-slate-600">
                Learners are guided in discipline, honesty, respect, and moral
                responsibility.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <Bus size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">School Transport</h4>
              <p className="leading-8 text-slate-600">
                Reliable transport support is available for families depending
                on distance and route.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <UtensilsCrossed size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">Meals Included</h4>
              <p className="leading-8 text-slate-600">
                Breakfast and lunch support the daily school experience and help
                learners stay active and focused.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <HeartHandshake size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">Supportive Care</h4>
              <p className="leading-8 text-slate-600">
                We believe in noticing each learner and helping them grow with
                encouragement and attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section id="admissions" className="bg-[#0f172a] py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="rounded-3xl bg-white/5 px-8 py-12 backdrop-blur-sm lg:flex lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
                Admissions
              </p>
              <h3 className="hero-title mb-5 text-4xl leading-tight md:text-5xl">
                Begin Your Child’s Journey at KES
              </h3>
              <p className="max-w-2xl text-base leading-8 text-white/85">
                Admissions are open for learners joining our pre-primary,
                primary, and secondary sections. Placeholder information
                can later be updated with exact requirements, fee structure, and
                reporting dates.
              </p>
            </div>

            <div className="mt-8 lg:mt-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#d97706] px-7 py-4 font-semibold text-white transition hover:bg-[#b45309]"
              >
                Request Admission Details
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Extracted Footer Component */}
      <Footer />
    </main>
  );
}
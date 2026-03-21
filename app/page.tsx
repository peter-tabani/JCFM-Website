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
  Monitor,
  Music,
  FlaskConical,
  BookHeart,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />
      <Hero />
      <About />
      <Programs />

      {/* Why Choose KES */}
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

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <ShieldCheck size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">Discipline & Integrity</h4>
              <p className="leading-8 text-slate-600">
                High standards of discipline, hard work, and integrity are at
                the heart of daily school life at KES.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <Bus size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">School Transport</h4>
              <p className="leading-8 text-slate-600">
                Reliable school bus/van service available to ensure safe and
                convenient daily commuting for learners.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <Monitor size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">ICT & Online Research</h4>
              <p className="leading-8 text-slate-600">
                A computer lab and dedicated Online Research Centre give
                learners access to digital learning tools.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <FlaskConical size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">Science Lab</h4>
              <p className="leading-8 text-slate-600">
                Hands-on science experiments through our equipped science
                laboratory support curiosity and STEM learning.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <Music size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">Talent Development</h4>
              <p className="leading-8 text-slate-600">
                Music room, athletics, Taekwondo, and Scouting help learners
                discover and grow their unique talents.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 text-[#d97706]">
                <BookHeart size={24} />
              </div>
              <h4 className="mb-3 text-xl font-semibold">Guidance & Counselling</h4>
              <p className="leading-8 text-slate-600">
                Dedicated counselling support ensures every learner's
                emotional wellbeing is cared for alongside academics.
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
                Begin Your Child's Journey at KES
              </h3>
              <div className="space-y-3 text-base leading-8 text-white/85">
                <p>
                  Admissions are open for learners joining ECDE (from age 3),
                  Primary (Grade 1–6), and Junior Secondary (Grade 7–9).
                </p>
                <p>
                  <span className="font-semibold text-white">Requirements:</span>{" "}
                  For ECDE, learners must be 3 years and above. Transfer
                  students must provide duly filled, signed, and stamped forms.
                  Junior Secondary applicants must present a KPSEA certificate
                  or pass an entry exam.
                </p>
                <p>
                  <span className="font-semibold text-white">How to apply:</span>{" "}
                  Visit the main office along Approved-Shelleybeach Road, Likoni,
                  to obtain the fee structure and admission details. You can also
                  call us directly.
                </p>
                <p>
                  <span className="font-semibold text-white">Payment:</span>{" "}
                  Fees accepted via M-Pesa Paybill or Bank deposit.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 lg:mt-0 lg:items-end">
              <a
                href="tel:+254722916174"
                className="inline-flex items-center gap-3 rounded-full bg-[#d97706] px-7 py-4 font-semibold text-white transition hover:bg-[#b45309]"
              >
                Call +254 722 916174
                <ArrowRight size={18} />
              </a>
              <a
                href="mailto:excellentkenya@gmail.com"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Email Us
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
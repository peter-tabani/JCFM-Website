import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdmissionsForm from "@/components/sections/AdmissionsForm";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Admissions – Kenya Excellent Centre & School",
  description:
    "Apply for admission at KES – Likoni, Mombasa. Open for ECDE, Primary, and Junior Secondary learners.",
};

const requirements = [
  {
    level: "ECDE (PP1 – PP2)",
    age: "3 years and above",
    docs: [
      "Birth certificate (copy)",
      "Passport photo of child",
      "Parent/guardian ID copy",
    ],
    badge: "bg-[#d97706] text-white",
    border: "border-orange-200 bg-orange-50",
  },
  {
    level: "Primary (Grade 1–6)",
    age: "As per CBC guidelines",
    docs: [
      "Birth certificate (copy)",
      "Previous school leaving certificate",
      "Duly filled, signed & stamped transfer forms",
      "Passport photo of child",
    ],
    badge: "bg-[#0f172a] text-white",
    border: "border-slate-200 bg-slate-50",
  },
  {
    level: "Junior Secondary (Grade 7–9)",
    age: "As per CBC guidelines",
    docs: [
      "KPSEA certificate OR pass KES entry exam",
      "Birth certificate (copy)",
      "Transfer forms (duly filled, signed & stamped)",
      "Passport photo",
    ],
    badge: "bg-[#d97706] text-white",
    border: "border-orange-200 bg-orange-50",
  },
];

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      {/* ── Hero — compact on mobile ── */}
      <section className="relative overflow-hidden bg-[#0f172a] py-14 text-white md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-4 lg:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Admissions 
          </p>
          <h1 className="hero-title mb-4 text-4xl font-medium leading-tight md:text-6xl">
            Begin Your Child's
            <br className="hidden md:block" /> Journey at KES
          </h1>
          <p className="mb-6 max-w-xl text-base leading-8 text-white/80 md:mb-8 md:text-lg">
            Open for learners from age 3 through Grade 9 in Likoni, Mombasa.
            Reach us instantly via WhatsApp or fill the form below.
          </p>

          {/* Mobile: show WhatsApp CTA prominently in hero */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/254722916174?text=Hello%20KES%2C%20I%20would%20like%20to%20enquire%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle size={18} />
              WhatsApp Us Now
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full bg-[#d97706] px-6 py-3 font-semibold text-white transition hover:bg-[#b45309]"
            >
              Apply Online
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Requirements ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
              What You Need
            </p>
            <h2 className="hero-title text-3xl leading-tight text-slate-900 md:text-5xl">
              Admission Requirements
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Requirements vary by level. Bring all documents when visiting the school office.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {requirements.map((req) => (
              <div key={req.level} className={`rounded-2xl border p-6 md:p-8 ${req.border}`}>
                <span className={`mb-4 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider ${req.badge}`}>
                  {req.level}
                </span>
                <p className="mb-1 text-sm text-slate-500">Minimum Age</p>
                <p className="mb-4 font-semibold text-slate-800">{req.age}</p>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Required Documents
                </p>
                <ul className="space-y-2">
                  {req.docs.map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#d97706]" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fees ── */}
      <section className="bg-[#fffaf2] py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
              Fee Payments
            </p>
            <h2 className="hero-title mb-6 text-3xl text-slate-900 md:text-4xl">
              Flexible Payment Methods
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
                <p className="mb-1 font-bold text-slate-900">M-Pesa Paybill / Till</p>
                <p className="text-sm leading-7 text-slate-600">
                  Pay conveniently via M-Pesa. Contact the school office for
                  the current Paybill/Till number.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
                <p className="mb-1 font-bold text-slate-900">Bank Deposit</p>
                <p className="text-sm leading-7 text-slate-600">
                  Bank transfer accepted. Visit the office or call for
                  account details.
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-500">
              For the full fee structure, visit our office or call{" "}
              <a href="tel:+254722916174" className="font-semibold text-[#d97706]">
                +254 722 916174
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section id="apply" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
              Apply Now
            </p>
            <h2 className="hero-title text-3xl leading-tight text-slate-900 md:text-5xl">
              Fill in Your Application
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Complete the form and we'll get back to you within 1–2 business
              days. On mobile? Use the WhatsApp or Call buttons for instant help.
            </p>
          </div>

          <AdmissionsForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
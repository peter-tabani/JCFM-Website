import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdmissionsForm from "@/components/sections/AdmissionsForm";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

export const metadata = {
  title: "Admissions – Jesus Christ Founder Ministry",
  description:
    "Apply for admission at JCFM School – Likoni, Mombasa. Open for ECDE, Primary, and Junior Secondary learners.",
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
    badge: "bg-[#2563eb] text-white",
    border: "border-blue-200 bg-blue-50",
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
      "KPSEA certificate OR pass JCFM entry exam",
      "Birth certificate (copy)",
      "Transfer forms (duly filled, signed & stamped)",
      "Passport photo",
    ],
    badge: "bg-[#7c3aed] text-white",
    border: "border-purple-200 bg-purple-50",
  },
];

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      {/* ── Hero — compact on mobile ── */}
      <section className="relative overflow-hidden bg-[#1e3a5f] py-14 text-white md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/images/hero/jcfm-gate.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] via-[#1e3a5f]/90 to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-4 lg:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#a5f3fc]">
            Admissions
          </p>
          <h1 className="hero-title mb-4 text-4xl font-medium leading-tight md:text-6xl">
            Begin Your Child's
            <br className="hidden md:block" /> Journey at JCFM
          </h1>
          <p className="mb-6 max-w-xl text-base leading-8 text-white/80 md:mb-8 md:text-lg">
            Open for learners from age 3 through Grade 9 in Likoni, Mombasa.
            Email us or fill the form below.
          </p>

          {/* Mobile: show email CTA prominently in hero */}
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:info@fountainofhope.ac.ke?subject=Admissions%20Enquiry"
              className="inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-6 py-3 font-semibold text-white transition hover:bg-[#15803d]"
            >
              <Mail size={18} />
              Email Us Now
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3 font-semibold text-white transition hover:bg-[#6d28d9]"
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
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
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#16a34a]" />
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
      <section className="bg-[#fdfbf7] py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#16a34a]">
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
              For the full fee structure, visit our office or email{" "}
              <a href="mailto:info@fountainofhope.ac.ke" className="font-semibold text-[#2563eb]">
                info@fountainofhope.ac.ke
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section id="apply" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#7c3aed]">
              Apply Now
            </p>
            <h2 className="hero-title text-3xl leading-tight text-slate-900 md:text-5xl">
              Fill in Your Application
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Complete the form and we'll get back to you within 1–2 business
              days. On mobile? Use the Email button for instant help.
            </p>
          </div>

          <AdmissionsForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
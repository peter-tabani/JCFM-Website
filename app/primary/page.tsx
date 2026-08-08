import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Download, ArrowRight, Mail } from "lucide-react";

export const metadata = {
  title: "Primary School - Fountain of Hope Academy",
  description: "Primary School (Grade 1-6) at Fountain of Hope Academy, Likoni Mombasa. CBC curriculum. Download fee structure.",
};

export default function PrimaryPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-[#0f172a] px-4 py-14 text-white md:py-20 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#7c3aed]">
            Grade 1 - 6
          </p>
          <h1 className="hero-title mb-4 text-4xl font-medium leading-tight md:text-5xl">
            Primary School
          </h1>
          <p className="mb-8 max-w-xl text-base leading-8 text-white/60">
            A CBC-based programme at Fountain of Hope Academy, Likoni, nurturing learners from Grade 1 through Grade 6 in a disciplined,
            supportive environment.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/docs/primary-fee-structure.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3 text-sm font-bold text-white hover:bg-[#6d28d9] transition"
            >
              <Download size={16} /> Download Fee Structure
            </a>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
            >
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── What we know ── */}
      <section className="bg-[#f5f3ff] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Grades", value: "Grade 1 - 6" },
              { label: "Curriculum", value: "CBC (Competency-Based)" },
              { label: "School Type", value: "Day School, Mixed" },
              { label: "Location", value: "Likoni - Shelley Beach, Mombasa" },
              { label: "School Hours", value: "6:00 AM - 6:00 PM" },
              { label: "Enquiries", value: "info@fountainofhope.ac.ke" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                <p className="text-lg font-bold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fee Structure ── */}
      <section className="bg-white px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#7c3aed]">Fees</p>
            <h2 className="hero-title mb-4 text-3xl text-slate-900 md:text-4xl">Primary Fee Structure</h2>
            <p className="mb-8 text-base leading-8 text-slate-600">
              Download the current fee structure document for full details on
              tuition and payment. You can also contact the school office
              directly for any fee-related enquiries.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/docs/primary-fee-structure.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7c3aed] px-8 py-4 font-bold text-white hover:bg-[#6d28d9] transition"
              >
                <Download size={18} /> Download Fee Structure PDF
              </a>
              <a
                href="mailto:info@fountainofhope.ac.ke?subject=Primary%20School%20Fees%20Enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-[#f5f3ff] px-8 py-4 font-bold text-slate-700 hover:border-[#7c3aed] transition"
              >
                <Mail size={18} className="text-[#7c3aed]" /> Email the Office
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0f172a] px-4 py-14 text-white lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="hero-title mb-1 text-2xl md:text-3xl">Ready to enrol in Primary?</h2>
              <p className="text-sm text-white/60">Admissions are open for Grade 1-6. Apply today or visit our office.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admissions" className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3 text-sm font-bold text-white hover:bg-[#6d28d9] transition">
                Apply Now <ArrowRight size={15} />
              </Link>
              <a href="mailto:info@fountainofhope.ac.ke" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
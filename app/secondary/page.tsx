import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Download, ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Junior Secondary – Fountain of Hope Academy",
  description: "Junior Secondary School (Grade 7–9) at Fountain of Hope Academy, Likoni Mombasa. CBC curriculum. KJSEA. Download fee structure.",
};

export default function SecondaryPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-[#0f172a] px-4 py-14 text-white md:py-20 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
            Grade 7 – 9
          </p>
          <h1 className="hero-title mb-4 text-4xl font-medium leading-tight md:text-5xl">
            Junior Secondary School
          </h1>
          <p className="mb-8 max-w-xl text-base leading-8 text-white/60">
            Fountain of Hope Academy currently offers Junior Secondary up to
            Grade 9, following the CBC curriculum and preparing learners for
            the KJSEA assessment.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/docs/secondary-fee-structure.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#d97706] px-6 py-3 text-sm font-bold text-white hover:bg-[#b45309] transition"
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
      <section className="bg-[#fffaf2] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Grades", value: "Grade 7 – 9" },
              { label: "Curriculum", value: "CBC (Competency-Based)" },
              { label: "Assessment", value: "KJSEA" },
              { label: "Current Highest Grade", value: "Grade 9" },
              { label: "School Hours", value: "6:00 AM – 6:00 PM" },
              { label: "Enquiries", value: "+254 722 916174" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                <p className="text-lg font-bold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Admission requirements ── */}
      <section className="bg-white px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
                Entry Requirements
              </p>
              <h2 className="hero-title mb-6 text-3xl text-slate-900">
                How to Join Junior Secondary
              </h2>
              <div className="space-y-4">
                {[
                  "KPSEA certificate OR pass the entry assessment",
                  "Duly filled, signed and stamped transfer forms",
                  "Birth certificate (copy)",
                  "Passport-size photo of learner",
                ].map((req, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#d97706]" />
                    <p className="text-sm leading-7 text-slate-600">{req}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-[#fffaf2] p-5">
                <p className="text-sm leading-7 text-slate-600">
                  Visit our office along Approved-Shelleybeach Road, Likoni
                  or call{" "}
                  <a href="tel:+254722916174" className="font-semibold text-[#d97706]">
                    +254 722 916174
                  </a>{" "}
                  for admission details.
                </p>
              </div>
            </div>

            {/* Fee download */}
            <div className="rounded-3xl border border-[#d97706]/30 bg-[#fffaf2] p-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">Fees</p>
              <h3 className="hero-title mb-3 text-2xl text-slate-900">Junior Secondary Fee Structure</h3>
              <p className="mb-6 text-sm leading-8 text-slate-600">
                Download the current fee structure for full details on tuition
                and payment. Contact the school office for any fee-related
                enquiries.
              </p>
              <a
                href="/docs/secondary-fee-structure.pdf"
                download
                className="mb-3 flex items-center justify-center gap-2 rounded-full bg-[#d97706] px-6 py-3.5 font-bold text-white hover:bg-[#b45309] transition"
              >
                <Download size={18} /> Download Fee Structure PDF
              </a>
              <a
                href="https://wa.me/254722916174?text=Hello%20Fountain%20of%20Hope%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20Junior%20Secondary%20fees."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 hover:border-[#d97706] transition"
              >
                <MessageCircle size={18} className="text-[#25D366]" /> Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Alumni achievement ── */}
      <section className="bg-[#0f172a] px-4 py-14 text-white lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="hero-title mb-2 text-2xl md:text-3xl">Our Alumni Speak for Themselves</h2>
              <p className="max-w-xl text-sm leading-8 text-white/60">
                Fountain of Hope Academy Junior Secondary graduates have gained entry to competitive
                national schools including Maranda High School, Nyuki School,
                Kwale High and Matuga Girls — proof that excellence is possible
                for every learner.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admissions" className="inline-flex items-center gap-2 rounded-full bg-[#d97706] px-6 py-3 text-sm font-bold text-white hover:bg-[#b45309] transition">
                Apply Now <ArrowRight size={15} />
              </Link>
              <a href="tel:+254722916174" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
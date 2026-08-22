import type { Metadata } from "next";
import Link from "next/link";
import IntaSendDonateButton from "@/components/donate/IntaSendDonateButton";
import BankTransferDetails from "@/components/donate/BankTransferDetails";
import { siteData } from "@/data/site";
import Breadcrumb from "@/components/seo/Breadcrumb";
import {
  Heart,
  Church,
  Globe,
  Building2,
  ArrowRight,
  Check,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Donate — ${siteData.orgName}`,
  description:
    "Give to Jesus Christ Founder Ministry — tithes, offerings, missions and the building fund. Give securely online with M-Pesa, card or bank transfer.",
  alternates: { canonical: "/donate" },
};

const PURPOSES = [
  {
    icon: Church,
    title: "Tithes & Offerings",
    desc: "Support the ongoing life and work of the Ministry across all branches.",
  },
  {
    icon: Building2,
    title: "Building Fund",
    desc: "Help put up permanent classroom blocks, a second campus, and safe worship spaces.",
  },
  {
    icon: Globe,
    title: "Missions & Outreach",
    desc: "Fund travel, supplies and support for branch pastors and mission trips across Kenya.",
  },
  {
    icon: Heart,
    title: "Wherever It's Needed Most",
    desc: "A general gift the Ministry directs to its most urgent need this season.",
  },
];

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const justGave = sp.ist === "success";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Breadcrumb items={[{ name: "Donate", path: "/donate" }]} />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#4c1d95] py-20 text-white md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('${siteData.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4c1d95] via-[#4c1d95]/95 to-[#7c3aed]/30" />

        <div className="relative mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[#c4b5fd]">
              Give
            </p>
            <h1 className="hero-title mb-6 text-4xl leading-tight md:text-6xl">
              Partner With What
              <br />
              <span className="text-[#c9a961]">God Is Building</span>
            </h1>
            <p className="mx-auto max-w-xl text-base leading-8 text-white/80">
              Every gift — a tithe, an offering, or a one-time gift toward a
              project — helps {siteData.orgName} reach more communities across
              Kenya. Give securely below with M-Pesa, card or bank transfer.
            </p>
          </div>
        </div>
      </section>

      {/* ── Give ── */}
      <section className="bg-[#fafaf8] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 lg:grid-cols-[1fr_1.1fr] lg:px-6">
          {/* Purpose cards */}
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
              What Your Gift Supports
            </p>
            <h2 className="hero-title mb-8 text-3xl leading-tight text-slate-900">
              Where It Goes
            </h2>
            <div className="space-y-4">
              {PURPOSES.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4c1d95]/10 text-[#4c1d95]">
                    <p.icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{p.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#4c1d95]" />
                <p className="text-sm leading-7 text-slate-600">
                  Every gift is accounted for and directed by Ministry
                  leadership. Payments are processed securely by IntaSend —
                  we never see or store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* IntaSend donate card */}
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
              Give Now
            </p>
            <h2 className="hero-title mb-8 text-3xl leading-tight text-slate-900">
              Make a Gift
            </h2>
            {justGave && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <Check size={16} className="shrink-0" />
                Thank you! If your payment completed, it will reflect shortly.
                God bless you.
              </div>
            )}
            <IntaSendDonateButton purpose="General Fund" />
          </div>
        </div>
      </section>

      {/* ── Other ways to give ── */}
      <section className="border-t border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <BankTransferDetails />

            <div className="rounded-2xl border border-slate-200 bg-[#fafaf8] p-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#4c1d95]/10 text-[#4c1d95]">
                <GraduationCap size={20} strokeWidth={1.75} />
              </div>
              <p className="font-semibold text-slate-900">
                Sponsor a child at Fountain of Hope Academy
              </p>
              <p className="mt-1 mb-4 text-sm leading-7 text-slate-600">
                Looking to sponsor a specific pupil or school project instead
                of general Ministry giving? Visit the Academy's giving page.
              </p>
              <Link
                href="/donors"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4c1d95] hover:underline"
              >
                Go to School Giving
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

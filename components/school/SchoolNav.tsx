"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowLeft, Mail, ChevronRight } from "lucide-react";
import { siteData } from "@/data/site";

export default function SchoolNav() {
  const [open, setOpen] = useState(false);
  const s = siteData.school;

  return (
    <>
      {/* ── Top utility ribbon (desktop) ── */}
      <div className="hidden bg-[#0b2545] text-white lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-[12px] tracking-wide">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-[#c9a961] transition hover:text-white"
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
            Back to Jesus Christ Founder Ministry
          </Link>
          <div className="flex items-center divide-x divide-white/15">
            <a
              href={`mailto:${s.contacts.email}`}
              className="flex items-center gap-2 px-5 text-white/80 transition hover:text-white"
            >
              <Mail size={12} strokeWidth={2.25} />
              {s.contacts.email}
            </a>
          </div>
        </div>
      </div>

      {/* Forest-green school accent stripe */}
      <div className="h-[3px] w-full bg-[#15803d]" />

      {/* ── Desktop masthead row ── */}
      <header className="hidden border-b border-[#d4d0c4] bg-white lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-10 px-6 py-5">
          <Link href="/school" className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center border-2 border-[#15803d] bg-[#15803d] p-1 text-white">
              <span className="font-serif text-lg font-bold">FH</span>
            </div>
            <div className="border-l-2 border-[#15803d] pl-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
                An Education Ministry of {s.parent}
              </p>
              <h1 className="font-serif text-[22px] font-semibold uppercase leading-tight tracking-[0.04em] text-[#0b2545]">
                {s.name}
              </h1>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-600">
                Est. {s.founded} · {s.motto}
              </p>
            </div>
          </Link>

          <Link
            href="/school#admissions"
            className="hidden items-center gap-2 bg-[#15803d] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#106030] xl:flex"
          >
            Apply Now <ChevronRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Desktop nav links */}
        <nav className="border-t border-[#d4d0c4] bg-[#f8f6ee]">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6">
            <ul className="flex items-center gap-0">
              {s.schoolNav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center border-r border-[#d4d0c4] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0b2545] transition hover:bg-white hover:text-[#15803d]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
              {s.type}
            </p>
          </div>
        </nav>
      </header>

      {/* ── Mobile compact bar ── */}
      <header className="relative z-40 lg:hidden">
        <div className="flex items-center justify-between border-b border-[#d4d0c4] bg-white px-4 py-3">
          <Link href="/school" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-[#15803d] bg-[#15803d] text-white">
              <span className="font-serif text-sm font-bold">FH</span>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase leading-none tracking-[0.22em] text-[#15803d]">
                A Ministry of JCFM
              </p>
              <p className="mt-1 font-serif text-[14px] font-semibold uppercase leading-none tracking-wide text-[#0b2545]">
                {s.shortName}
              </p>
            </div>
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center border border-[#0b2545] text-[#0b2545]"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[320px] max-w-[90vw] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-b-[3px] border-[#15803d] bg-[#0b2545] px-5 py-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
                Education Ministry · JCFM
              </p>
              <p className="mt-1 font-serif text-lg font-semibold text-white">
                {s.name}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center border border-white/30 text-white"
              aria-label="Close menu"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-[#d4d0c4]">
            {s.schoolNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-5 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#0b2545] transition hover:bg-[#f8f6ee] hover:text-[#15803d]"
                >
                  {l.label}
                  <ChevronRight size={14} strokeWidth={2.25} className="text-slate-400" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="bg-[#f8f6ee] px-5 py-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
              School Office
            </p>
            <a
              href={`mailto:${s.contacts.email}`}
              className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-[#0b2545]"
            >
              <Mail size={12} strokeWidth={2.25} />
              {s.contacts.email}
            </a>
          </div>
        </nav>

        <div className="border-t border-[#d4d0c4] p-4">
          <Link
            href="/school#admissions"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 bg-[#15803d] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white"
          >
            Apply Now <ChevronRight size={14} strokeWidth={2.5} />
          </Link>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 border border-[#0b2545] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0b2545]"
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
            Back to JCFM Ministry
          </Link>
        </div>
      </div>
    </>
  );
}

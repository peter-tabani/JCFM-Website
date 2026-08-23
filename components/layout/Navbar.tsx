"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, Search, Menu, X, Mail,
  ChevronRight, GraduationCap,
  BookOpen, Users, MapPin, FileText, Home, Church, Radio,
} from "lucide-react";
import { siteData } from "@/data/site";

const searchIndex = [
  { title: "Home", desc: "Back to the JCFM homepage", href: "/", icon: <Home size={16} />, tags: ["home", "main", "jcfm"] },
  { title: "About JCFM", desc: "Ministry history, mission & leadership", href: "/#about", icon: <BookOpen size={16} />, tags: ["about", "history", "founded", "bishop", "nelson", "barasa", "mission", "story", "overseer"] },
  { title: "Our Branches", desc: "JCFM branch network across Kenya", href: "/#branches", icon: <MapPin size={16} />, tags: ["branches", "network", "nzoia", "bungoma", "tembelela", "chesamisi", "mombasa", "kimilili", "chelekei"] },
  { title: "Church Life", desc: "Sunday services, worship & fellowship", href: "/#church", icon: <Church size={16} />, tags: ["church", "service", "sunday", "worship", "fellowship", "prayer"] },
  { title: "Fountain of Hope Academy", desc: "The school under JCFM Ministry", href: "/school", icon: <GraduationCap size={16} />, tags: ["school", "academy", "fountain", "hope", "education", "primary", "cbc"] },
  { title: "Ministries", desc: "Youth, children, women & outreach", href: "/#ministries", icon: <Users size={16} />, tags: ["ministries", "youth", "children", "women", "outreach"] },
  { title: "Sermons", desc: "Watch or listen to past messages", href: "/#sermons", icon: <Radio size={16} />, tags: ["sermons", "messages", "preaching", "watch", "listen", "media"] },
  { title: "Contact Us", desc: "Talk to the Ministry leadership", href: "/#contact", icon: <MapPin size={16} />, tags: ["contact", "location", "address", "nzoia", "bungoma", "talk"] },
  { title: "Email JCFM", desc: "info@jcfm.online", href: "mailto:info@jcfm.online", icon: <Mail size={16} />, tags: ["email", "mail", "write", "contact", "info"] },
  { title: "Headquarters", desc: "Nzoia, Bungoma County, Kenya", href: "/#contact", icon: <MapPin size={16} />, tags: ["location", "where", "address", "nzoia", "bungoma", "hq", "headquarters"] },
  { title: "Sunday Service", desc: "Sundays · 9:00 AM - 1:00 PM", href: "/#church", icon: <BookOpen size={16} />, tags: ["hours", "time", "sunday", "service", "schedule", "when"] },
];

const QUICK_SEARCHES = ["Church", "School", "Give", "Sermons", "Contact", "Ministries", "Admissions"];

function useSearch(query: string) {
  if (query.trim().length < 1) return [];
  return searchIndex.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.tags.some((tag) => tag.includes(query.toLowerCase()))
  ).slice(0, 6);
}

function ResultItem({ item, query, onClick }: { item: typeof searchIndex[0]; query: string; onClick: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="flex items-center gap-3 border-b border-slate-50 px-4 py-3 last:border-0 hover:bg-[#fdfbf7] group transition-colors"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 group-hover:text-[#2563eb]">{item.title}</p>
        <p className="truncate text-xs text-slate-500">{item.desc}</p>
      </div>
      <ChevronRight size={14} className="shrink-0 text-slate-300 group-hover:text-[#2563eb]" />
    </Link>
  );
}

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useSearch(query);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };
  const onResultClick = () => {
    closeSearch();
    setDrawerOpen(false);
  };

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <section className="relative z-20 hidden border-b-[3px] border-[#7c3aed] bg-[#4c1d95] lg:block">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-stretch">
            {/* Nav links */}
            <nav className="flex flex-1 items-stretch">
              {siteData.navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="group relative flex items-center px-5 py-[18px] text-[12px] font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:text-white"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-[3px] origin-center scale-x-0 bg-[#c4b5fd] transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            {/* Search */}
            <div ref={searchRef} className="relative flex shrink-0 items-center border-l border-white/15">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-white px-3">
                  <Search size={15} className="shrink-0 text-[#4c1d95]" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search the website…"
                    className="w-[220px] bg-transparent py-[18px] text-sm text-[#4c1d95] outline-none placeholder:text-slate-400"
                    onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                  />
                  <button onClick={closeSearch} className="text-slate-400 hover:text-[#4c1d95]">
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openSearch}
                  className="flex items-center gap-2 px-5 py-[18px] text-[12px] font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:text-white"
                >
                  <Search size={14} strokeWidth={2.25} />
                  Search
                </button>
              )}

              {/* Dropdown */}
              {searchOpen && (
                <div className="absolute right-0 top-full z-50 w-[340px] overflow-hidden border border-slate-200 bg-white shadow-xl">
                  {query.trim().length === 0 ? (
                    <div className="p-4">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
                        Popular Searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_SEARCHES.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-[#4c1d95] transition hover:border-[#4c1d95] hover:bg-white"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : results.length > 0 ? (
                    <>
                      <div className="border-b border-slate-200 bg-white px-4 py-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
                        </p>
                      </div>
                      {results.map((item, i) => (
                        <ResultItem key={i} item={item} query={query} onClick={onResultClick} />
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Search size={22} className="mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-semibold text-[#4c1d95]">No results for &quot;{query}&quot;</p>
                      <p className="mt-1 text-xs text-slate-500">Try &quot;church&quot;, &quot;school&quot; or &quot;give&quot;</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Visit CTA, soft, non-transactional */}
            <Link
              href="/#contact"
              className="flex shrink-0 items-center gap-2 border-l border-white/15 bg-[#7c3aed] px-6 py-[18px] text-[12px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#6d28d9]"
            >
              <MapPin size={14} strokeWidth={2.25} />
              Visit Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── MOBILE NAVBAR ── */}
      <section className="relative z-50 lg:hidden">
        {/* Accent stripe */}
        <div className="h-[3px] w-full bg-[#7c3aed]" />
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#4c1d95] px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center border border-slate-200 bg-white p-1">
              <img
                src="/images/logo.png"
                alt="JCFM Seal"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="font-serif text-[13px] font-semibold uppercase tracking-[0.08em] leading-tight text-white">
                Jesus Christ Founder
              </p>
            </div>
          </Link>
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center border border-white/25 text-white"
          >
            <Menu size={22} />
          </button>
        </div>
      </section>

      {/* ── MOBILE DRAWER ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={() => setDrawerOpen(false)} />
      )}
      <div className={`fixed right-0 top-0 z-50 flex h-full w-[320px] max-w-[90vw] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="border-b-[3px] border-[#7c3aed] bg-[#4c1d95] px-5 py-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd]">
                Official Website
              </p>
              <p className="mt-1 font-serif text-lg font-semibold uppercase tracking-wide text-white">
                JCFM Menu
              </p>
              <p className="text-[11px] text-white/60">Jesus Christ Founder Ministry</p>
            </div>
            <button onClick={() => setDrawerOpen(false)} className="flex h-9 w-9 items-center justify-center border border-white/25 text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="border-b border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 border border-slate-200 bg-white px-3 py-2.5">
            <Search size={15} className="shrink-0 text-[#4c1d95]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the website…"
              className="flex-1 bg-transparent text-sm text-[#4c1d95] outline-none placeholder:text-slate-400"
            />
            {query && <button onClick={() => setQuery("")}><X size={14} className="text-slate-400" /></button>}
          </div>
          {query.trim().length > 0 && (
            <div className="mt-2 overflow-hidden border border-slate-200 bg-white">
              {results.length > 0 ? results.map((item, i) => (
                <ResultItem key={i} item={item} query={query} onClick={onResultClick} />
              )) : (
                <div className="px-3 py-4 text-center text-xs text-slate-500">No results for &quot;{query}&quot;</div>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-slate-200">
            <a href="mailto:info@jcfm.online" onClick={() => setDrawerOpen(false)} className="flex items-center justify-center gap-2 bg-[#4c1d95] py-4 text-white">
              <Mail size={16} /><span className="text-xs font-bold uppercase tracking-wider">Email Us</span>
            </a>
          </div>

          <div>
            <p className="border-b border-slate-200 bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
              Navigation
            </p>
            {siteData.navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#4c1d95] transition hover:bg-white"
              >
                {link.label}<ChevronRight size={15} className="text-[#a78bfa]" />
              </Link>
            ))}
          </div>

          <div>
            <p className="border-b border-slate-200 bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#4c1d95]">
              Portals
            </p>
            {[
              { label: "Donor Portal", href: "/donors/portal" },
              { label: "Parent Portal", href: "/login/parents" },
              { label: "Staff Portal", href: "/login/staff" },
              { label: "Alumni Portal", href: "/login/alumni" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between border-b border-slate-100 px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-700 transition hover:bg-white"
              >
                {item.label}<ChevronRight size={14} className="text-slate-400" />
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 p-4">
          <Link
            href="/#contact"
            onClick={() => setDrawerOpen(false)}
            className="flex w-full items-center justify-center gap-2 bg-[#7c3aed] py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6d28d9]"
          >
            <MapPin size={14} /> Visit Us <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}

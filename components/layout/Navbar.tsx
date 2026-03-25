"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, Search, Menu, X, Phone,
  MessageCircle, ChevronRight, GraduationCap,
  BookOpen, Users, Heart, MapPin, FileText, Home,
} from "lucide-react";
import { siteData } from "@/data/site";

const searchIndex = [
  { title: "Home", desc: "Back to the KES homepage", href: "/", icon: <Home size={16} />, tags: ["home", "main", "kes"] },
  { title: "About Us", desc: "School history, vision, mission & leadership", href: "/#about", icon: <BookOpen size={16} />, tags: ["about", "history", "founded", "2013", "director", "noah", "mweruphe", "vision", "mission", "story"] },
  { title: "Admissions", desc: "Apply for ECDE, Primary or Junior Secondary", href: "/admissions", icon: <FileText size={16} />, tags: ["admissions", "apply", "join", "enroll", "register", "application", "form"] },
  { title: "Primary School", desc: "Grade 1–6, CBC curriculum", href: "/#programs", icon: <GraduationCap size={16} />, tags: ["primary", "grade", "cbc", "curriculum", "grade 1", "grade 2", "grade 3", "grade 4", "grade 5", "grade 6"] },
  { title: "Junior Secondary", desc: "Grade 7–9, KJSEA exams", href: "/#programs", icon: <GraduationCap size={16} />, tags: ["secondary", "junior", "grade 7", "grade 8", "grade 9", "kjsea", "jss"] },
  { title: "ECDE / Pre-Primary", desc: "PP1 and PP2 for children from age 3", href: "/#programs", icon: <GraduationCap size={16} />, tags: ["ecde", "pre-primary", "pp1", "pp2", "nursery", "early childhood", "3 years"] },
  { title: "Donor Portal", desc: "Log in or create a donor account", href: "/donors/portal", icon: <Heart size={16} />, tags: ["donor", "donate", "sponsor", "give", "support", "charity", "fund", "portal", "login"] },
  { title: "Sponsor a Child", desc: "Help fund a child's full education", href: "/donors/portal", icon: <Heart size={16} />, tags: ["sponsor", "child", "orphan", "needy", "disadvantaged", "monthly", "giving"] },
  { title: "Contact Us", desc: "Get in touch with the school", href: "/#contact", icon: <MapPin size={16} />, tags: ["contact", "location", "address", "map", "find us", "likoni", "shelley beach", "mombasa"] },
  { title: "School Life", desc: "Facilities, programmes & why choose KES", href: "/#why-kecs", icon: <Users size={16} />, tags: ["school life", "facilities", "science lab", "computer", "music", "transport", "bus", "meals", "sports", "athletics", "taekwondo", "scouting"] },
  { title: "Call the School", desc: "+254 722 916174", href: "tel:+254722916174", icon: <Phone size={16} />, tags: ["call", "phone", "number", "telephone", "ring"] },
  { title: "WhatsApp KES", desc: "Chat with us on WhatsApp", href: "https://wa.me/254722916174", icon: <MessageCircle size={16} />, tags: ["whatsapp", "chat", "message", "wa"] },
  { title: "Fee Structure", desc: "Contact the office for fee details", href: "/admissions", icon: <FileText size={16} />, tags: ["fee", "fees", "cost", "price", "tuition", "payment", "mpesa", "school fees", "how much"] },
  { title: "Admission Requirements", desc: "Documents needed to join KES", href: "/admissions", icon: <FileText size={16} />, tags: ["requirements", "documents", "kpsea", "certificate", "transfer", "birth certificate"] },
  { title: "Islamic Curriculum", desc: "Integrated Madrasa programme at KES", href: "/#programs", icon: <BookOpen size={16} />, tags: ["islamic", "madrasa", "muslim", "quran", "religion"] },
  { title: "School Location", desc: "Along Shelleybeach Road, Likoni, Mombasa", href: "/#contact", icon: <MapPin size={16} />, tags: ["location", "where", "address", "likoni", "mombasa", "shelley beach", "how to get"] },
  { title: "School Hours", desc: "6:00 AM – 6:00 PM", href: "/#contact", icon: <BookOpen size={16} />, tags: ["hours", "time", "open", "close", "schedule", "when"] },
];

const QUICK_SEARCHES = ["Admissions", "Fees", "ECDE", "Grade 7", "Donate", "Contact", "Islamic", "CBC"];

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
      className="flex items-center gap-3 border-b border-slate-50 px-4 py-3 last:border-0 hover:bg-[#fffaf2] group transition-colors"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 group-hover:text-[#d97706]">{item.title}</p>
        <p className="truncate text-xs text-slate-500">{item.desc}</p>
      </div>
      <ChevronRight size={14} className="shrink-0 text-slate-300 group-hover:text-[#d97706]" />
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
      <section className="relative z-20 hidden lg:block">
        <div className="mx-auto max-w-[1400px] px-0 lg:px-6">
          <div className="flex bg-white shadow-lg lg:items-stretch">

            <a
              href="/#contact"
              className="flex shrink-0 items-center justify-center gap-3 bg-[#0f172a] px-6 py-4 text-base font-semibold text-white hover:bg-[#1e293b] lg:min-w-[190px]"
            >
              Get More Info <ArrowRight size={18} />
            </a>

            <div className="flex flex-1 items-center gap-5 overflow-x-auto whitespace-nowrap px-5 py-4 text-[14px] font-medium text-slate-800">
              {siteData.navLinks.map((link, i) => (
                <Link key={i} href={link.href} className="hover:text-[#d97706] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search */}
            <div ref={searchRef} className="relative flex shrink-0 items-center border-l border-slate-200 bg-[#f8f4ea]">
              {searchOpen ? (
                <div className="flex items-center gap-2 px-3">
                  <Search size={16} className="shrink-0 text-[#d97706]" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search KES..."
                    className="w-[180px] bg-transparent py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                  />
                  <button onClick={closeSearch} className="text-slate-400 hover:text-slate-600">
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openSearch}
                  className="flex items-center gap-2 px-5 py-4 text-sm text-slate-500 hover:text-[#d97706] transition-colors"
                >
                  <Search size={18} />
                  <span className="hidden xl:block">Search...</span>
                </button>
              )}

              {/* Dropdown */}
              {searchOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  {query.trim().length === 0 ? (
                    <div className="p-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Popular searches</p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_SEARCHES.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-[#d97706] hover:bg-[#fffaf2] hover:text-[#d97706] transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : results.length > 0 ? (
                    <>
                      <div className="border-b border-slate-100 px-4 py-2.5">
                        <p className="text-xs font-semibold text-slate-400">
                          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
                        </p>
                      </div>
                      {results.map((item, i) => (
                        <ResultItem key={i} item={item} query={query} onClick={onResultClick} />
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Search size={24} className="mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-600">No results for &quot;{query}&quot;</p>
                      <p className="mt-1 text-xs text-slate-400">Try &quot;admissions&quot;, &quot;fees&quot; or &quot;Grade 7&quot;</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE NAVBAR ── */}
      <section className="relative z-50 lg:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
          <Link href="/" className="flex items-center gap-2">
  <div className="flex h-11 w-11 items-center justify-center">
    <img
      src="/images/logo.png"
      alt="KES Logo"
      className="h-full w-full object-contain"
    />
  </div>
  <div>
    <p className="text-base font-bold text-[#d97706] leading-none">KES</p>
    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 leading-none mt-0.5">
      Natuwe Mbele Daima
    </p>
  </div>
</Link>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/254722916174"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* ── MOBILE DRAWER ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setDrawerOpen(false)} />
      )}
      <div className={`fixed right-0 top-0 z-50 flex h-full w-[300px] max-w-[90vw] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between bg-[#0f172a] px-5 py-4">
          <div>
            <p className="text-lg font-bold text-[#d97706]">KES Menu</p>
            <p className="text-xs text-white/60">Kenya Excellent Centre & School</p>
          </div>
          <button onClick={() => setDrawerOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
            <X size={20} />
          </button>
        </div>

        {/* Mobile search */}
        <div className="border-b border-slate-100 p-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <Search size={15} className="shrink-0 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search KES..."
              className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            {query && <button onClick={() => setQuery("")}><X size={14} className="text-slate-400" /></button>}
          </div>
          {query.trim().length > 0 && (
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              {results.length > 0 ? results.map((item, i) => (
                <ResultItem key={i} item={item} query={query} onClick={onResultClick} />
              )) : (
                <div className="px-3 py-4 text-center text-xs text-slate-500">No results for &quot;{query}&quot;</div>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 p-4">
            <a href="tel:+254722916174" onClick={() => setDrawerOpen(false)} className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#0f172a] py-4 text-white">
              <Phone size={20} /><span className="text-xs font-bold">Call Us</span>
            </a>
            <a href="https://wa.me/254722916174" target="_blank" rel="noopener noreferrer" onClick={() => setDrawerOpen(false)} className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#25D366] py-4 text-white">
              <MessageCircle size={20} /><span className="text-xs font-bold">WhatsApp</span>
            </a>
          </div>

          <div className="border-t border-slate-100 px-2 py-2">
            <p className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-400">Navigation</p>
            {siteData.navLinks.map((link, i) => (
              <Link key={i} href={link.href} onClick={() => setDrawerOpen(false)} className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-[#d97706]">
                {link.label}<ChevronRight size={16} className="text-slate-300" />
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 px-2 py-2">
            <p className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-400">Portals</p>
            {[
              { label: "Donors", href: "/donors/portal" },
              { label: "Staff", href: "/login/staff" },
              { label: "Alumni", href: "/login/alumni" },
              { label: "Parents", href: "/login/parents" },
              { label: "Community", href: "/login/community" },
            ].map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setDrawerOpen(false)} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
                {item.label}<ChevronRight size={16} className="text-slate-300" />
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 p-4">
          <Link href="/admissions" onClick={() => setDrawerOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d97706] py-3.5 text-sm font-bold text-white hover:bg-[#b45309]">
            Apply for Admission <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
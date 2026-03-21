"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, ArrowRight, X, ShieldCheck, HeartHandshake, Trophy, Users } from "lucide-react";
import Link from "next/link";

const leaders = [
  {
    name: "Mr. Noah Mweruphe",
    role: "Director",
    tag: "Founder & Director",
    image: null,
    initials: "NM",
    color: "bg-[#0f172a]",
    bio: "Mr. Noah Mweruphe is the visionary founder and director of the Kenya Excellent Centre and School. Since establishing KES in 2013, he has driven a mission to provide quality education to both fee-paying and sponsored learners from disadvantaged backgrounds. Under his leadership, the school has grown from 30 students to over 400 learners, with alumni gaining entry to some of Kenya's most competitive national schools.",
    quote: "Education is the greatest equalizer. Our doors are open to every child — regardless of their background.",
    phone: "+254 722 916174",
    email: "excellentkenya@gmail.com",
    featured: true,
  },
  {
    name: "Mr. Julius Mwaro",
    role: "Head of Institution — Primary School",
    tag: "Primary School",
    image: null,
    initials: "JM",
    color: "bg-[#d97706]",
    bio: "Mr. Julius Mwaro leads the Primary School (Grade 1–6), overseeing the implementation of the Competency-Based Curriculum (CBC) and ensuring every learner achieves their full potential. He is committed to creating a structured, nurturing environment where academic excellence and strong character development go hand in hand.",
    quote: "A strong primary foundation is the launchpad for everything a child will achieve in life.",
    phone: "+254 722 916174",
    email: "excellentkenya@gmail.com",
  },
  {
    name: "Mr. Idd Amani",
    role: "Head of Institution — Junior Secondary",
    tag: "Junior Secondary",
    image: null,
    initials: "IA",
    color: "bg-[#0f172a]",
    bio: "Mr. Idd Amani leads the Junior Secondary School (Grade 7–9), preparing learners for the Kenya Junior Secondary Education Assessment (KJSEA). His focus is on developing critical thinkers and responsible young adults who are ready for the next stage of their academic journey.",
    quote: "Junior secondary is where young people discover who they are. Our job is to give them the tools to become who they want to be.",
    phone: "+254 722 916174",
    email: "excellentkenya@gmail.com",
  },
  {
    name: "Md. Phoebe N. Mulama",
    role: "Head of Institution — Early Years",
    tag: "ECDE",
    image: null,
    initials: "PM",
    color: "bg-[#d97706]",
    bio: "Md. Phoebe N. Mulama leads the Early Years Education (ECDE) department, nurturing children from age 3 through PP1 and PP2. She creates a warm, stimulating environment where the youngest learners develop confidence, social skills, and a love for learning that carries them through their entire school journey.",
    quote: "The early years shape everything. Every smile, every discovery, every small step matters deeply.",
    phone: "+254 722 916174",
    email: "excellentkenya@gmail.com",
  },
  {
    name: "Mr. Mazera Dena",
    role: "Academic Master",
    tag: "Academics",
    image: null,
    initials: "MD",
    color: "bg-[#0f172a]",
    bio: "Mr. Mazera Dena serves as Academic Master at KES, overseeing academic programmes across all levels. He coordinates curriculum delivery, monitors learner performance, and ensures teaching standards remain high. His work is central to KES consistently producing competitive results at sub-county and national levels.",
    quote: "Academic excellence is not about pressure — it is about building a culture where every learner believes they can achieve.",
    phone: "+254 722 916174",
    email: "excellentkenya@gmail.com",
  },
];

type Leader = typeof leaders[0];

function Avatar({ image, initials, color, name, size = "md" }: {
  image: string | null; initials: string; color: string; name: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "lg" ? "h-36 w-36 text-4xl ring-4" : size === "md" ? "h-24 w-24 text-2xl ring-4" : "h-14 w-14 text-lg ring-2";
  if (image) return <img src={image} alt={name} className={`${dim} rounded-full object-cover ring-white shadow-lg`} />;
  return <div className={`${dim} ${color} flex shrink-0 items-center justify-center rounded-full font-bold text-white ring-white shadow-lg`}>{initials}</div>;
}

// ── Mobile bottom-sheet modal ──────────────────────
function LeaderModal({ leader, onClose }: { leader: Leader; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/60" onClick={onClose}>
      <div
        className="relative w-full max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>

        {/* Close */}
        <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <X size={16} />
        </button>

        {/* Header */}
        <div className={`${leader.color} mx-4 mt-2 flex items-center gap-4 rounded-2xl px-5 py-5 mb-6`}>
          <Avatar image={leader.image} initials={leader.initials} color={leader.color} name={leader.name} size="sm" />
          <div>
            <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-white">{leader.tag}</span>
            <p className="font-bold text-white">{leader.name}</p>
            <p className="text-xs text-white/60">{leader.role}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="px-6 pb-10 space-y-5">
          <p className="text-sm leading-8 text-slate-600">{leader.bio}</p>
          <div className="rounded-2xl border-l-4 border-[#d97706] bg-[#fffaf2] px-5 py-4">
            <p className="text-sm italic leading-8 text-slate-700">&ldquo;{leader.quote}&rdquo;</p>
            <p className="mt-2 text-xs font-bold text-[#d97706]">— {leader.name}</p>
          </div>
          <button onClick={onClose} className="w-full rounded-full bg-[#0f172a] py-3.5 text-sm font-bold text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LeadershipPage() {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);
  const director = leaders[0];
  const team = leaders.slice(1);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      {/* Modal — mobile only */}
      {activeLeader && <LeaderModal leader={activeLeader} onClose={() => setActiveLeader(null)} />}

      {/* ── Hero ── */}
      <section className="bg-[#0f172a] px-4 py-14 text-white md:py-20 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">Our People</p>
          <h1 className="hero-title mb-3 text-4xl font-medium leading-tight md:text-5xl">The Team Behind KES</h1>
          <p className="max-w-xl text-base leading-8 text-white/60">
            Meet the dedicated leaders committed to providing quality education and care to every learner at Kenya Excellent Centre and School.
          </p>
        </div>
      </section>

      {/* ── DESKTOP: Full cards (unchanged from original) ── */}
      <section className="hidden bg-[#fffaf2] px-4 py-16 lg:block lg:px-6">
        <div className="mx-auto max-w-[1400px]">

          {/* Featured Director */}
          <div className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[340px_1fr]">
              <div className={`${director.color} flex flex-col items-center justify-center gap-5 px-8 py-12 text-center`}>
                <Avatar image={director.image} initials={director.initials} color="bg-[#1e293b]" name={director.name} size="lg" />
                <div>
                  <span className="mb-2 inline-block rounded-full bg-[#d97706] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">{director.tag}</span>
                  <h2 className="hero-title text-2xl text-white">{director.name}</h2>
                  <p className="mt-1 text-sm text-white/50">{director.role}</p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <a href={`tel:${director.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white/70 hover:border-[#d97706] hover:text-[#d97706] transition">
                    <Phone size={13} /> {director.phone}
                  </a>
                  <a href={`mailto:${director.email}`} className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white/70 hover:border-[#d97706] hover:text-[#d97706] transition">
                    <Mail size={13} /> {director.email}
                  </a>
                </div>
              </div>
              <div className="flex flex-col justify-center px-10 py-12">
                <p className="mb-6 text-base leading-9 text-slate-600">{director.bio}</p>
                <div className="rounded-2xl border-l-4 border-[#d97706] bg-[#fffaf2] px-6 py-5">
                  <p className="text-base italic leading-8 text-slate-700">&ldquo;{director.quote}&rdquo;</p>
                  <p className="mt-3 text-xs font-bold text-[#d97706]">— {director.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team grid */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">Leadership Team</p>
            <h2 className="hero-title text-3xl text-slate-900">Heads of Institution</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {team.map((member) => (
              <div key={member.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className={`${member.color} flex items-center gap-5 px-7 py-6`}>
                  <Avatar image={member.image} initials={member.initials} color={member.color === "bg-[#d97706]" ? "bg-[#b45309]" : "bg-[#1e293b]"} name={member.name} size="md" />
                  <div>
                    <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-white">{member.tag}</span>
                    <h3 className="hero-title text-xl text-white">{member.name}</h3>
                    <p className="text-xs text-white/60">{member.role}</p>
                  </div>
                </div>
                <div className="px-7 py-6">
                  <p className="mb-5 text-sm leading-8 text-slate-600">{member.bio}</p>
                  <div className="rounded-xl border-l-4 border-[#d97706] bg-[#fffaf2] px-5 py-4">
                    <p className="text-sm italic leading-7 text-slate-700">&ldquo;{member.quote}&rdquo;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOBILE: Compact cards with Read More ── */}
      <section className="bg-[#fffaf2] px-4 py-10 lg:hidden">
        <div className="mx-auto max-w-lg space-y-4">

          {/* Director card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className={`${director.color} flex items-center gap-4 px-5 py-5`}>
              <Avatar image={director.image} initials={director.initials} color="bg-[#1e293b]" name={director.name} size="sm" />
              <div className="flex-1 min-w-0">
                <span className="mb-0.5 inline-block rounded-full bg-[#d97706] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{director.tag}</span>
                <p className="truncate font-bold text-white">{director.name}</p>
                <p className="truncate text-xs text-white/60">{director.role}</p>
              </div>
              <button
                onClick={() => setActiveLeader(director)}
                className="shrink-0 rounded-full bg-[#d97706] px-4 py-2 text-xs font-bold text-white"
              >
                Read More
              </button>
            </div>
          </div>

          {/* Team cards */}
          <p className="pt-2 text-xs font-bold uppercase tracking-widest text-slate-400">Heads of Institution</p>
          {team.map((member) => (
            <div key={member.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className={`${member.color} flex items-center gap-4 px-5 py-5`}>
                <Avatar image={member.image} initials={member.initials} color={member.color === "bg-[#d97706]" ? "bg-[#b45309]" : "bg-[#1e293b]"} name={member.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <span className="mb-0.5 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{member.tag}</span>
                  <p className="truncate font-bold text-white">{member.name}</p>
                  <p className="truncate text-xs text-white/60">{member.role}</p>
                </div>
                <button
                  onClick={() => setActiveLeader(member)}
                  className="shrink-0 rounded-full bg-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-[#d97706] transition"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Photo notice ── */}
      <section className="bg-white px-4 py-8 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-2xl border border-dashed border-[#d97706]/40 bg-[#fffaf2] p-5 text-center">
            <p className="mb-1 text-sm font-bold uppercase tracking-widest text-[#d97706]">📸 Photos Coming Soon</p>
            <p className="mx-auto max-w-md text-xs leading-7 text-slate-500">
              Replace <code className="rounded bg-slate-100 px-1 py-0.5">image: null</code> with the staff photo path in{" "}
              <code className="rounded bg-slate-100 px-1 py-0.5">app/leadership/page.tsx</code> to display real photos.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0f172a] px-4 py-14 text-white lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="hero-title mb-1 text-2xl md:text-3xl">Want to join our team?</h2>
              <p className="text-sm text-white/60">KES is always looking for passionate educators who believe in our mission.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:excellentkenya@gmail.com?subject=Teaching Position Enquiry" className="inline-flex items-center gap-2 rounded-full bg-[#d97706] px-6 py-3 text-sm font-bold text-white hover:bg-[#b45309] transition">
                <Mail size={15} /> Email the Director
              </a>
              <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition">
                Contact Us <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
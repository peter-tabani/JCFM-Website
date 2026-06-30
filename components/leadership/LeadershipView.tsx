"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, X } from "lucide-react";

export type Leader = {
  name: string;
  role: string;
  tag: string | null;
  bio: string;
  quote: string | null;
  photo: string | null;
  email: string | null;
};

const COLORS = ["bg-[#1e3a5f]", "bg-[#7c3aed]", "bg-[#16a34a]", "bg-[#1e293b]", "bg-[#6d28d9]"];
const colorFor = (i: number) => COLORS[i % COLORS.length];
const initialsOf = (name: string) =>
  name.split(" ").filter(Boolean).map((s) => s[0]).slice(0, 2).join("").toUpperCase();

function Avatar({ photo, name, color, size = "md" }: {
  photo: string | null; name: string; color: string; size?: "sm" | "md" | "lg";
}) {
  const dim = size === "lg" ? "h-36 w-36 text-4xl ring-4" : size === "md" ? "h-24 w-24 text-2xl ring-4" : "h-14 w-14 text-lg ring-2";
  if (photo) return <img src={photo} alt={name} className={`${dim} rounded-full object-cover ring-white shadow-lg`} />;
  return <div className={`${dim} ${color} flex shrink-0 items-center justify-center rounded-full font-bold text-white ring-white shadow-lg`}>{initialsOf(name)}</div>;
}

function LeaderModal({ leader, color, onClose }: { leader: Leader; color: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/60" onClick={onClose}>
      <div className="relative w-full max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1"><div className="h-1 w-10 rounded-full bg-slate-200" /></div>
        <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"><X size={16} /></button>
        <div className={`${color} mx-4 mt-2 mb-6 flex items-center gap-4 rounded-2xl px-5 py-5`}>
          <Avatar photo={leader.photo} name={leader.name} color={color} size="sm" />
          <div>
            {leader.tag && <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-white">{leader.tag}</span>}
            <p className="font-bold text-white">{leader.name}</p>
            <p className="text-xs text-white/60">{leader.role}</p>
          </div>
        </div>
        <div className="px-6 pb-10 space-y-5">
          <p className="text-sm leading-8 text-slate-600">{leader.bio}</p>
          {leader.quote && (
            <div className="rounded-2xl border-l-4 border-[#7c3aed] bg-[#f5f3ff] px-5 py-4">
              <p className="text-sm italic leading-8 text-slate-700">&ldquo;{leader.quote}&rdquo;</p>
              <p className="mt-2 text-xs font-bold text-[#7c3aed]">— {leader.name}</p>
            </div>
          )}
          <button onClick={onClose} className="w-full rounded-full bg-[#0f172a] py-3.5 text-sm font-bold text-white">Close</button>
        </div>
      </div>
    </div>
  );
}

export default function LeadershipView({ leaders }: { leaders: Leader[] }) {
  const [active, setActive] = useState<{ leader: Leader; color: string } | null>(null);
  if (leaders.length === 0) return null;

  const director = leaders[0];
  const team = leaders.slice(1);

  return (
    <>
      {active && <LeaderModal leader={active.leader} color={active.color} onClose={() => setActive(null)} />}

      {/* Hero */}
      <section className="bg-[#0f172a] px-4 py-14 text-white md:py-20 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#7c3aed]">Our People</p>
          <h1 className="hero-title mb-3 text-4xl font-medium leading-tight md:text-5xl">The Team Behind Fountain of Hope Academy</h1>
          <p className="max-w-xl text-base leading-8 text-white/60">
            Meet the dedicated leaders committed to providing quality education and care to every learner at Fountain of Hope Academy.
          </p>
        </div>
      </section>

      {/* DESKTOP */}
      <section className="hidden bg-[#f5f3ff] px-4 py-16 lg:block lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[340px_1fr]">
              <div className={`${colorFor(0)} flex flex-col items-center justify-center gap-5 px-8 py-12 text-center`}>
                <Avatar photo={director.photo} name={director.name} color={colorFor(0)} size="lg" />
                <div>
                  {director.tag && <span className="mb-2 inline-block rounded-full bg-[#7c3aed] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">{director.tag}</span>}
                  <h2 className="hero-title text-2xl text-white">{director.name}</h2>
                  <p className="mt-1 text-sm text-white/50">{director.role}</p>
                </div>
                {director.email && (
                  <a href={`mailto:${director.email}`} className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:border-[#7c3aed] hover:text-[#7c3aed]">
                    <Mail size={13} /> {director.email}
                  </a>
                )}
              </div>
              <div className="flex flex-col justify-center px-10 py-12">
                <p className="mb-6 text-base leading-9 text-slate-600">{director.bio}</p>
                {director.quote && (
                  <div className="rounded-2xl border-l-4 border-[#7c3aed] bg-[#f5f3ff] px-6 py-5">
                    <p className="text-base italic leading-8 text-slate-700">&ldquo;{director.quote}&rdquo;</p>
                    <p className="mt-3 text-xs font-bold text-[#7c3aed]">— {director.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {team.length > 0 && (
            <>
              <div className="mb-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#7c3aed]">Leadership Team</p>
                <h2 className="hero-title text-3xl text-slate-900">Heads of Institution</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {team.map((member, idx) => (
                  <div key={member.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className={`${colorFor(idx + 1)} flex items-center gap-5 px-7 py-6`}>
                      <Avatar photo={member.photo} name={member.name} color={colorFor(idx + 1)} size="md" />
                      <div>
                        {member.tag && <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-white">{member.tag}</span>}
                        <h3 className="hero-title text-xl text-white">{member.name}</h3>
                        <p className="text-xs text-white/60">{member.role}</p>
                      </div>
                    </div>
                    <div className="px-7 py-6">
                      <p className="mb-5 text-sm leading-8 text-slate-600">{member.bio}</p>
                      {member.quote && (
                        <div className="rounded-xl border-l-4 border-[#7c3aed] bg-[#f5f3ff] px-5 py-4">
                          <p className="text-sm italic leading-7 text-slate-700">&ldquo;{member.quote}&rdquo;</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* MOBILE */}
      <section className="bg-[#f5f3ff] px-4 py-10 lg:hidden">
        <div className="mx-auto max-w-lg space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className={`${colorFor(0)} flex items-center gap-4 px-5 py-5`}>
              <Avatar photo={director.photo} name={director.name} color={colorFor(0)} size="sm" />
              <div className="flex-1 min-w-0">
                {director.tag && <span className="mb-0.5 inline-block rounded-full bg-[#7c3aed] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{director.tag}</span>}
                <p className="truncate font-bold text-white">{director.name}</p>
                <p className="truncate text-xs text-white/60">{director.role}</p>
              </div>
            </div>
            <div className="px-5 py-4">
              {director.quote && <p className="mb-3 text-xs italic leading-6 text-slate-500 line-clamp-2">&ldquo;{director.quote}&rdquo;</p>}
              <button onClick={() => setActive({ leader: director, color: colorFor(0) })} className="rounded-full bg-[#7c3aed] px-4 py-2 text-xs font-bold text-white">Read More</button>
            </div>
          </div>

          {team.length > 0 && <p className="pt-2 text-xs font-bold uppercase tracking-widest text-slate-400">Heads of Institution</p>}
          {team.map((member, idx) => (
            <div key={member.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className={`${colorFor(idx + 1)} flex items-center gap-4 px-5 py-5`}>
                <Avatar photo={member.photo} name={member.name} color={colorFor(idx + 1)} size="sm" />
                <div className="flex-1 min-w-0">
                  {member.tag && <span className="mb-0.5 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{member.tag}</span>}
                  <p className="truncate font-bold text-white">{member.name}</p>
                  <p className="truncate text-xs text-white/60">{member.role}</p>
                </div>
              </div>
              <div className="px-5 py-4">
                {member.quote && <p className="mb-3 text-xs italic leading-6 text-slate-500 line-clamp-2">&ldquo;{member.quote}&rdquo;</p>}
                <button onClick={() => setActive({ leader: member, color: colorFor(idx + 1) })} className="rounded-full border border-[#7c3aed] px-4 py-2 text-xs font-bold text-[#7c3aed]">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f172a] px-4 py-14 text-white lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="hero-title mb-1 text-2xl md:text-3xl">Want to join our team?</h2>
              <p className="text-sm text-white/60">Fountain of Hope Academy is always looking for passionate educators who believe in our mission.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:excellentkenya@gmail.com?subject=Teaching Position Enquiry" className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#6d28d9]">
                <Mail size={15} /> Email the Director
              </a>
              <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Contact Us <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

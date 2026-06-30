"use client";

import { useEffect, useState } from "react";
import { Radio, PlayCircle, CalendarDays, User } from "lucide-react";

type Sermon = {
  id: string;
  title: string;
  series: string | null;
  preacher: string;
  branch: string | null;
  date: string | null;
  mediaUrl: string | null;
};

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

export default function Sermons() {
  const [sermons, setSermons] = useState<Sermon[] | null>(null);

  useEffect(() => {
    fetch("/api/sermons")
      .then((r) => (r.ok ? r.json() : { sermons: [] }))
      .then((d) => setSermons(d.sermons ?? []))
      .catch(() => setSermons([]));
  }, []);

  return (
    <section id="sermons" className="border-b border-white/10 bg-[#080b16]">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 bg-[#c4b5fd] md:w-14" />
            <Radio size={16} className="text-[#c4b5fd]" strokeWidth={1.75} />
            <span className="h-[1px] w-10 bg-[#c4b5fd] md:w-14" />
          </div>
          <h2 className="mt-4 font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.04em] text-white md:text-5xl">
            Sermons & Messages
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-white/66 md:text-[15px]">
            Listen again to the Word preached across our branches.
          </p>
        </div>

        {sermons === null ? (
          <p className="text-center text-sm text-white/40">Loading sermons…</p>
        ) : sermons.length === 0 ? (
          <div className="mx-auto max-w-md border border-white/10 bg-white/[0.04] p-10 text-center">
            <Radio size={26} className="mx-auto text-white/30" strokeWidth={1.5} />
            <p className="mt-4 font-serif text-lg text-white">Sermons coming soon</p>
            <p className="mt-2 text-[13px] leading-6 text-white/55">
              Published messages will appear here as they are added.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((s) => {
              const card = (
                <article className="group flex h-full flex-col border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-[#7c3aed]/50 hover:bg-white/[0.07]">
                  {s.series && (
                    <span className="mb-3 inline-flex w-fit items-center bg-[#7c3aed]/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd]">
                      {s.series}
                    </span>
                  )}
                  <h3 className="font-serif text-xl font-semibold leading-tight text-white">
                    {s.title}
                  </h3>
                  <div className="mt-3 flex flex-1 flex-col gap-1.5 text-[13px] text-white/60">
                    <span className="inline-flex items-center gap-2"><User size={13} className="text-[#86efac]" /> {s.preacher}</span>
                    {s.branch && <span className="inline-flex items-center gap-2"><Radio size={13} className="text-[#86efac]" /> {s.branch}</span>}
                    {s.date && <span className="inline-flex items-center gap-2"><CalendarDays size={13} className="text-[#86efac]" /> {fmtDate(s.date)}</span>}
                  </div>
                  {s.mediaUrl && (
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd] group-hover:text-white">
                      <PlayCircle size={16} /> Watch / Listen
                    </span>
                  )}
                </article>
              );
              return s.mediaUrl ? (
                <a key={s.id} href={s.mediaUrl} target="_blank" rel="noopener noreferrer" className="block">
                  {card}
                </a>
              ) : (
                <div key={s.id}>{card}</div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

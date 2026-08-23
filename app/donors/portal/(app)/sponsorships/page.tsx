"use client";

import Link from "next/link";
import {
  Sprout,
  HeartHandshake,
  CalendarDays,
  ArrowRight,
  Mail,
  Plus,
  Quote,
} from "lucide-react";
import {
  PageHeader,
  Stat,
  Card,
  CategoryPill,
  Progress,
  PrimaryButton,
  GhostButton,
} from "@/components/donor/ui";
import {
  sponsorships,
  fmtKSh,
  getProject,
} from "@/data/donor";

export default function MySponsorships() {
  const childSponsorships = sponsorships.filter((s) => s.kind === "child");
  const projectSponsorships = sponsorships.filter((s) => s.kind === "project");

  const totalMonthly = childSponsorships.reduce((s, x) => s + (x.monthly || 0), 0);
  const totalToDate = sponsorships.reduce((s, x) => s + x.totalGivenToDate, 0);

  return (
    <div>
      <PageHeader
        eyebrow="My Sponsorships"
        title="The children and projects you're walking with."
        description="Each card below is something you've committed to. Open one to see updates, photos, school reports and progress."
        actions={
          <>
            <PrimaryButton href="/donors/portal/projects?cat=children" icon={Plus}>
              Sponsor Another Child
            </PrimaryButton>
            <GhostButton href="/donors/portal/projects" icon={Sprout}>
              Browse Projects
            </GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1280px] space-y-8 px-5 py-7 md:px-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat icon={Sprout} tone="rose" label="Children Sponsored" value={String(childSponsorships.length)} sub="In school today" />
          <Stat icon={HeartHandshake} tone="navy" label="Project Backings" value={String(projectSponsorships.length)} sub="Active commitments" />
          <Stat icon={CalendarDays} tone="emerald" label="Monthly Commitment" value={fmtKSh(totalMonthly)} sub="Sum of recurring" />
          <Stat icon={CalendarDays} tone="sky" label="Given to Date" value={fmtKSh(totalToDate)} sub="Across all sponsorships" />
        </div>

        {/* Children */}
        {childSponsorships.length > 0 && (
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                  Children
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  Children you sponsor
                </h2>
                <p className="mt-1 max-w-xl text-[13px] text-white/45">
                  You support these children through monthly giving, fees, uniform,
                  meals, books and a steady, watchful presence.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {childSponsorships.map((s) => (
                <article
                  key={s.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1626]"
                >
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.photo}
                      alt={s.title}
                      className="aspect-[5/3] w-full object-cover"
                    />
                    <div className="absolute left-3 top-3">
                      <CategoryPill category={s.category} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white">{s.title}</h3>
                    <p className="mt-0.5 text-[13px] text-white/45">{s.subtitle}</p>

                    {s.child && (
                      <>
                        <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-white/35">Age</p>
                            <p className="mt-0.5 text-[14px] font-bold text-white">{s.child.age}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-white/35">Class</p>
                            <p className="mt-0.5 text-[14px] font-bold text-white">{s.child.grade}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-white/35">Since</p>
                            <p className="mt-0.5 text-[14px] font-bold text-white">{s.startedOn}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2 rounded-xl bg-amber-50 p-3 text-amber-900">
                          <Quote size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-amber-600" />
                          <p className="text-[12.5px] leading-6">{s.child.bio}</p>
                        </div>
                      </>
                    )}

                    <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
                      <div>
                        <p className="text-[10.5px] uppercase tracking-wider text-white/45">
                          Your monthly gift
                        </p>
                        <p className="mt-0.5 font-mono text-base font-bold text-white">
                          {fmtKSh(s.monthly || 0)}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/45">
                          Total to date:{" "}
                          <span className="font-mono font-semibold text-white/70">
                            {fmtKSh(s.totalGivenToDate)}
                          </span>
                        </p>
                      </div>
                      <a
                        href="mailto:info@jcfm.online?subject=Note%20for%20my%20sponsored%20child"
                        className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-2 text-[12px] font-semibold text-white hover:bg-violet-700"
                      >
                        <Mail size={12} strokeWidth={2.25} />
                        Write a Note
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Project sponsorships */}
        {projectSponsorships.length > 0 && (
          <section>
            <div className="mb-4">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                Projects
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">
                Projects you're backing
              </h2>
              <p className="mt-1 max-w-xl text-[13px] text-white/45">
                Multi-stage work that takes time and many hands. Open each to see
                where it stands today, with photos and milestones.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {projectSponsorships.map((s) => {
                const proj = s.projectId ? getProject(s.projectId) : undefined;
                return (
                  <Card key={s.id} padded={false}>
                    <div className="flex flex-col sm:flex-row">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.photo}
                        alt={s.title}
                        className="h-44 w-full object-cover sm:h-auto sm:w-44"
                      />
                      <div className="flex min-w-0 flex-1 flex-col p-5">
                        <CategoryPill category={s.category} />
                        <h3 className="mt-2 text-base font-bold text-white">
                          {s.title}
                        </h3>
                        <p className="mt-1 text-[12px] text-white/45">
                          You've given{" "}
                          <span className="font-semibold text-white/70">
                            {fmtKSh(s.totalGivenToDate)}
                          </span>{" "}
                          since {s.startedOn}.
                        </p>
                        {proj && (
                          <div className="mt-3">
                            <Progress value={proj.raised} goal={proj.goal} />
                          </div>
                        )}
                        <div className="mt-auto pt-4">
                          <Link
                            href={`/donors/portal/projects/${s.projectId}`}
                            className="inline-flex items-center gap-1 text-[12px] font-semibold text-amber-700 hover:text-amber-800"
                          >
                            See progress <ArrowRight size={12} strokeWidth={2.25} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

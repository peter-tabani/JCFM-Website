"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  HandHeart,
  Users,
  CalendarDays,
  Target,
  Clock,
  CheckCircle2,
  ImageIcon,
  Share2,
} from "lucide-react";
import {
  PageHeader,
  Card,
  CategoryPill,
  Progress,
  PrimaryButton,
  GhostButton,
} from "@/components/donor/ui";
import {
  getProject,
  fmtKSh,
  donationsForProject,
  totalGivenForProject,
} from "@/data/donor";

const STATUS_LABEL: Record<string, string> = {
  active: "Just Starting",
  "in-progress": "In Progress",
  "near-complete": "Almost There",
  complete: "Complete",
};

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = getProject(id);
  if (!project) notFound();

  const myGifts = donationsForProject(project.id);
  const myTotal = totalGivenForProject(project.id);

  return (
    <div>
      <PageHeader
        eyebrow={
          <Link
            href="/donors/portal/projects"
            className="inline-flex items-center gap-1 hover:text-amber-800"
          >
            <ArrowLeft size={11} strokeWidth={2.5} /> All projects
          </Link>
        }
        title={project.title}
        description={project.longDesc}
        actions={
          <>
            <PrimaryButton icon={HandHeart}>Give to This</PrimaryButton>
            <GhostButton icon={Share2}>Share</GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1280px] space-y-8 px-5 py-7 md:px-8 md:py-10">
        {/* ── Hero + summary ── */}
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1626]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.hero}
              alt={project.title}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-5 py-3">
              <CategoryPill category={project.category} />
              <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                {STATUS_LABEL[project.status]}
              </span>
              <span className="text-[11px] text-white/45">
                Started {project.startedOn}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                Funding
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-white">
                {fmtKSh(project.raised)}
              </p>
              <p className="mt-0.5 text-[12px] text-white/45">
                raised of {fmtKSh(project.goal)} goal
              </p>
              <div className="mt-4">
                <Progress value={project.raised} goal={project.goal} showLabel={false} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2">
                  <Users size={14} className="text-white/35" />
                  <span>
                    <span className="font-bold text-white">{project.donors}</span>{" "}
                    donors
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2">
                  <Target size={14} className="text-white/35" />
                  <span>
                    <span className="font-bold text-white">
                      {Math.round((project.raised / project.goal) * 100)}%
                    </span>{" "}
                    funded
                  </span>
                </div>
              </div>
              <PrimaryButton icon={HandHeart}>Give to This Project</PrimaryButton>
            </Card>

            <Card>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                Who benefits
              </p>
              <p className="mt-2 text-[14px] font-semibold text-white">
                {project.beneficiaries}
              </p>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                  Your contribution
                </p>
                {myGifts.length > 0 ? (
                  <>
                    <p className="mt-2 font-mono text-xl font-bold text-white">
                      {fmtKSh(myTotal)}
                    </p>
                    <p className="mt-0.5 text-[12px] text-white/45">
                      Across {myGifts.length} gift{myGifts.length === 1 ? "" : "s"}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-[12.5px] leading-6 text-white/45">
                    You haven&apos;t given to this project yet. Even a small gift
                    keeps the work moving.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* ── Before / After ── */}
        {project.beforeAfter && project.beforeAfter.length > 0 && (
          <section>
            <div className="mb-4">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                The change, in pictures
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">
                Before &amp; After
              </h2>
              <p className="mt-1 max-w-xl text-[13px] text-white/45">
                What was, and what is — paid for by gifts like yours.
              </p>
            </div>
            <div className="space-y-5">
              {project.beforeAfter.map((ba, i) => (
                <Card key={i} padded={false}>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <BeforeAfterTile
                      src={ba.before}
                      label="Before"
                      tone="bg-slate-900/80 text-white"
                    />
                    <BeforeAfterTile
                      src={ba.after}
                      label="Now"
                      tone="bg-amber-600 text-white"
                    />
                  </div>
                  <p className="border-t border-white/10 px-5 py-3 text-[13px] text-white/60">
                    <span className="mr-2 inline-flex items-center gap-1 text-amber-700">
                      <CheckCircle2 size={13} strokeWidth={2.25} />
                    </span>
                    {ba.caption}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── Milestones timeline ── */}
        {project.milestones.length > 0 && (
          <section>
            <div className="mb-4">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                Step by step
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">Milestones</h2>
              <p className="mt-1 max-w-xl text-[13px] text-white/45">
                Every meaningful moment, in order. Each one was made possible by
                someone giving toward this project.
              </p>
            </div>

            <div className="relative pl-8 sm:pl-10">
              {/* timeline line */}
              <div className="absolute left-3 top-0 h-full w-px bg-slate-200 sm:left-4" />

              <ul className="space-y-6">
                {project.milestones.map((m, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[22px] top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 ring-4 ring-amber-100 sm:-left-[26px]" />
                    <Card padded={false}>
                      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-stretch">
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-[11px] text-white/45">
                            <CalendarDays size={12} strokeWidth={2.25} />
                            <span>{m.date}</span>
                          </div>
                          <h3 className="mt-1 text-base font-semibold text-white">
                            {m.title}
                          </h3>
                          <p className="mt-1 text-[13px] leading-6 text-white/60">
                            {m.body}
                          </p>
                        </div>
                        {m.photo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={m.photo}
                            alt={m.title}
                            className="h-44 w-full object-cover sm:h-auto sm:w-56"
                          />
                        )}
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Gallery ── */}
        {project.gallery && project.gallery.length > 0 && (
          <section>
            <div className="mb-4">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                More from the field
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">Photos</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1626]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title} photo ${i + 1}`}
                    className="aspect-[5/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── My gifts to this project ── */}
        {myGifts.length > 0 && (
          <section>
            <div className="mb-4">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                Your part
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">
                Your gifts to this project
              </h2>
            </div>
            <Card padded={false}>
              <ul className="divide-y divide-white/10">
                {myGifts.map((g) => (
                  <li
                    key={g.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3.5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                      <Clock size={14} />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white">
                        {g.allocation}
                      </p>
                      <p className="text-[11px] text-white/45">
                        {g.date} · {g.channel} · {g.ref}
                      </p>
                    </div>
                    <p className="font-mono text-[13px] font-semibold text-white">
                      {fmtKSh(g.amount)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-5 py-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/45">
                  Your total here
                </span>
                <span className="font-mono text-base font-bold text-white">
                  {fmtKSh(myTotal)}
                </span>
              </div>
            </Card>
          </section>
        )}

        {/* ── Empty gallery fallback message ── */}
        {!project.gallery && !project.beforeAfter && (
          <Card>
            <div className="flex items-center gap-3 py-2 text-white/45">
              <ImageIcon size={18} />
              <p className="text-[13px]">
                More photos and updates will appear here as the project moves on.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function BeforeAfterTile({
  src,
  label,
  tone,
}: {
  src: string;
  label: string;
  tone: string;
}) {
  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="aspect-[5/3] w-full object-cover" />
      <span
        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider ${tone}`}
      >
        {label}
      </span>
    </div>
  );
}

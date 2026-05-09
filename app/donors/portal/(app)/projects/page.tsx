"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  FolderHeart,
  Search,
  ArrowRight,
  Users,
  Sparkles,
} from "lucide-react";
import {
  PageHeader,
  Card,
  CategoryPill,
  Progress,
  GhostButton,
} from "@/components/donor/ui";
import {
  projects,
  categories,
  fmtKSh,
  type CategoryKey,
} from "@/data/donor";

const STATUS_LABEL: Record<string, string> = {
  active: "Just Starting",
  "in-progress": "In Progress",
  "near-complete": "Almost There",
  complete: "Complete",
};

const STATUS_TONE: Record<string, string> = {
  active: "bg-amber-100 text-amber-800",
  "in-progress": "bg-sky-100 text-sky-800",
  "near-complete": "bg-emerald-100 text-emerald-800",
  complete: "bg-slate-200 text-slate-700",
};

export default function ProjectsBrowse() {
  const params = useSearchParams();
  const initialCat = (params.get("cat") as CategoryKey | null) || "All";
  const [cat, setCat] = useState<"All" | CategoryKey>(initialCat as "All" | CategoryKey);
  const [q, setQ] = useState("");

  // Sync cat with URL param on change
  useEffect(() => {
    const c = params.get("cat") as CategoryKey | null;
    if (c) setCat(c);
  }, [params]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      const t = q.toLowerCase();
      if (
        t &&
        !p.title.toLowerCase().includes(t) &&
        !p.shortDesc.toLowerCase().includes(t)
      )
        return false;
      return true;
    });
  }, [cat, q]);

  // Group by category for display when "All" is selected
  const grouped = useMemo(() => {
    if (cat !== "All") return null;
    const map = new Map<CategoryKey, typeof projects>();
    filtered.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    });
    return Array.from(map.entries());
  }, [filtered, cat]);

  return (
    <div>
      <PageHeader
        eyebrow="Active Projects"
        title="Where help is needed today."
        description="Browse the work currently underway. Each project shows you the goal, what's been raised, who benefits and where it stands — with photos."
        actions={
          <GhostButton href="/donors/portal/vision" icon={Sparkles}>
            See What's Next
          </GhostButton>
        }
      />

      <div className="mx-auto max-w-[1280px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat("All")}
            className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold transition ${
              cat === "All"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            All categories
          </button>
          {(Object.keys(categories) as CategoryKey[]).map((k) => {
            const c = categories[k];
            const active = cat === k;
            return (
              <button
                key={k}
                onClick={() => setCat(k)}
                className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold transition ${
                  active
                    ? `${c.tone}`
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search size={14} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects"
            className="h-10 w-full rounded-full border border-slate-200 bg-white pl-9 pr-4 text-[13px] outline-none transition focus:border-amber-400"
          />
        </div>

        {/* Listing */}
        {filtered.length === 0 ? (
          <Card>
            <div className="py-10 text-center">
              <FolderHeart size={28} className="mx-auto text-slate-300" />
              <p className="mt-3 text-[13px] text-slate-500">No projects match this filter.</p>
            </div>
          </Card>
        ) : grouped ? (
          <div className="space-y-10">
            {grouped.map(([key, list]) => {
              const c = categories[key];
              return (
                <section key={key}>
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber-700">
                        Category
                      </p>
                      <h2 className="mt-1 text-xl font-bold text-slate-900">{c.label}</h2>
                      <p className="mt-1 text-[13px] text-slate-500">{c.tagline}</p>
                    </div>
                    <button
                      onClick={() => setCat(key)}
                      className="inline-flex items-center gap-1 text-[12px] font-semibold text-amber-700 hover:text-amber-800"
                    >
                      Focus this category <ArrowRight size={12} strokeWidth={2.25} />
                    </button>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {list.map((p) => (
                      <ProjectCard key={p.id} p={p} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const pct = Math.min(100, Math.round((p.raised / p.goal) * 100));
  return (
    <Link
      href={`/donors/portal/projects/${p.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-amber-200"
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.hero}
          alt={p.title}
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <CategoryPill category={p.category} />
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_TONE[p.status]}`}
          >
            {STATUS_LABEL[p.status]}
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700">
          {p.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-slate-500">
          {p.shortDesc}
        </p>
        <div className="mt-4">
          <Progress value={p.raised} goal={p.goal} />
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Users size={11} strokeWidth={2} /> {p.donors} donors
            </span>
            <span>
              <span className="font-mono font-semibold text-slate-700">
                {fmtKSh(p.goal - p.raised)}
              </span>{" "}
              still needed
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

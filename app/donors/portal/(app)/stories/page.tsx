"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Newspaper, ArrowRight } from "lucide-react";
import {
  PageHeader,
  Card,
  CategoryPill,
} from "@/components/donor/ui";
import {
  stories,
  categories,
  type CategoryKey,
} from "@/data/donor";

export default function StoriesPage() {
  const [cat, setCat] = useState<"All" | CategoryKey>("All");

  const filtered = useMemo(
    () => (cat === "All" ? stories : stories.filter((s) => s.category === cat)),
    [cat]
  );

  return (
    <div>
      <PageHeader
        eyebrow="Stories & Progress"
        title="The work, in pictures and plain words."
        description="Updates from the field — what's been built, who's been helped, what's next. Every post is something you helped make happen."
      />

      <div className="mx-auto max-w-[1280px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat("All")}
            className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold transition ${
              cat === "All"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            All updates
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
                    ? c.tone
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <Card>
            <div className="py-10 text-center text-slate-500">
              <Newspaper size={28} className="mx-auto text-slate-300" />
              <p className="mt-3 text-[13px]">No stories in this category yet.</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((s) => (
              <article
                key={s.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.photo}
                  alt={s.title}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <CategoryPill category={s.category} />
                    <span className="text-[11px] text-slate-400">{s.date}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    {s.body}
                  </p>
                  {s.projectId && (
                    <Link
                      href={`/donors/portal/projects/${s.projectId}`}
                      className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-amber-700 hover:text-amber-800"
                    >
                      See the project <ArrowRight size={12} strokeWidth={2.25} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

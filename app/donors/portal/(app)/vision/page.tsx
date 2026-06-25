"use client";

import { useMemo, useState } from "react";
import { Sparkles, Compass, HandHeart, Mail } from "lucide-react";
import {
  PageHeader,
  Card,
  CategoryPill,
  PrimaryButton,
} from "@/components/donor/ui";
import {
  visionItems,
  categories,
  fmtKSh,
  type CategoryKey,
} from "@/data/donor";

export default function VisionPage() {
  const [cat, setCat] = useState<"All" | CategoryKey>("All");

  const filtered = useMemo(
    () => (cat === "All" ? visionItems : visionItems.filter((v) => v.category === cat)),
    [cat]
  );

  return (
    <div>
      <PageHeader
        eyebrow="Future Vision"
        title="What we hope to build next."
        description="Honest dreams with honest numbers. Nothing here has started yet — but each one could, with the right partner."
        actions={
          <a
            href="mailto:excellentkenya@gmail.com?subject=A%20vision%20item%20I%27d%20like%20to%20discuss"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-emerald-700"
          >
            <Mail size={15} strokeWidth={2.25} />
            Email the Director
          </a>
        }
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
            All future plans
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
              <Compass size={28} className="mx-auto text-slate-300" />
              <p className="mt-3 text-[13px]">No items in this category yet.</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filtered.map((v) => (
              <article
                key={v.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.hero}
                    alt={v.title}
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <CategoryPill category={v.category} />
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200">
                      <Sparkles size={10} className="mr-1 inline" /> Vision
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold leading-snug text-slate-900">
                    {v.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    {v.blurb}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {v.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[13px] text-slate-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        Estimated cost
                      </p>
                      <p className="mt-0.5 font-mono text-[13px] font-bold text-slate-900">
                        {fmtKSh(v.estimateFrom)}
                      </p>
                      <p className="text-[10.5px] text-slate-500">
                        to {fmtKSh(v.estimateTo)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        Earliest start
                      </p>
                      <p className="mt-0.5 text-[13px] font-bold text-slate-900">
                        {v.earliestStart}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <PrimaryButton icon={HandHeart}>
                      Help start this
                    </PrimaryButton>
                    <a
                      href={`mailto:excellentkenya@gmail.com?subject=${encodeURIComponent(`I'd like to discuss "${v.title}"`)}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Mail size={12} strokeWidth={2.25} />
                      Ask the Director
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Encouraging footer */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-[13px] text-slate-600">
            <span className="font-semibold text-slate-900">
              These plans don&apos;t need a single big donor.
            </span>{" "}
            Many small partners walking together is how every project on the
            &ldquo;Active&rdquo; page got started.
          </p>
        </div>
      </div>
    </div>
  );
}

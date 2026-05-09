"use client";

import { useState } from "react";
import {
  BookOpenText,
  Check,
  X,
  Eye,
  Search,
  Quote,
  Pencil,
  Trash2,
  PlusCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import {
  PageHeader,
  StatCard,
  Card,
  StatusPill,
  PrimaryButton,
  GhostButton,
} from "@/components/admin/ui";

type Story = {
  id: string;
  title: string;
  excerpt: string;
  by: string;
  branch: string;
  submitted: string;
  status: "pending" | "approved" | "rejected";
};

const STORIES: Story[] = [
  { id: "ST-038", title: "God restored our home", excerpt: "After three years of separation, I asked the Lord for one more chance — and He answered…", by: "Anne K.", branch: "Tembelela", submitted: "Today, 9:14 AM", status: "pending" },
  { id: "ST-037", title: "He healed my mother", excerpt: "The doctor had given up. We prayed at the Wednesday fellowship and by Sunday she was up…", by: "Brian S.", branch: "Mang'ana", submitted: "Yesterday", status: "pending" },
  { id: "ST-036", title: "From hopeless to hopeful", excerpt: "I came to the church carrying so much shame. The Bishop simply said: come and rest…", by: "Mercy W.", branch: "HQ Nzoia", submitted: "2 days ago", status: "pending" },
  { id: "ST-035", title: "A new beginning at 60", excerpt: "I thought it was too late for me. Then I heard the Word, and it was as if the Lord knew my name…", by: "Mzee Joseph", branch: "Sikalame", submitted: "5 days ago", status: "approved" },
  { id: "ST-034", title: "School fees, answered prayer", excerpt: "We had nothing left in the account. Within the week, two donors had stepped forward…", by: "Naomi & Peter", branch: "HQ Nzoia", submitted: "1 wk ago", status: "approved" },
  { id: "ST-033", title: "From the cells to the choir", excerpt: "I never imagined I would sing in the house of God. But here I am, leading praise…", by: "Kevin O.", branch: "Mombasa", submitted: "1 wk ago", status: "approved" },
  { id: "ST-032", title: "[Removed for review]", excerpt: "Submission did not meet our publishing guidelines. Returned to author with notes.", by: "Anonymous", branch: "—", submitted: "2 wks ago", status: "rejected" },
];

export default function AdminStories() {
  const [tab, setTab] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [q, setQ] = useState("");

  const filtered = STORIES.filter((s) => {
    if (tab !== "all" && s.status !== tab) return false;
    const t = q.toLowerCase();
    return !t || s.title.toLowerCase().includes(t) || s.by.toLowerCase().includes(t) || s.branch.toLowerCase().includes(t);
  });

  const counts = {
    all: STORIES.length,
    pending: STORIES.filter((s) => s.status === "pending").length,
    approved: STORIES.filter((s) => s.status === "approved").length,
    rejected: STORIES.filter((s) => s.status === "rejected").length,
  };

  return (
    <div>
      <PageHeader
        kicker="Ministry · Witness"
        title="Stories &amp; Testimonies"
        description="Moderate submissions from members and branches. Approved stories appear on the public site under 'Voices of the Branches.'"
        actions={
          <>
            <PrimaryButton icon={PlusCircle}>New Story</PrimaryButton>
            <GhostButton icon={Eye} href="/#stories">View Public Page</GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={BookOpenText} label="Total Submitted" value={String(counts.all)} sub="Lifetime" />
          <StatCard icon={Clock} label="Awaiting Review" value={String(counts.pending)} sub="Action required" delta={{ value: "+3 today", up: true }} />
          <StatCard icon={CheckCircle2} label="Approved & Live" value={String(counts.approved)} sub="On public site" />
          <StatCard icon={XCircle} label="Returned" value={String(counts.rejected)} sub="To authors with notes" />
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-0 border border-slate-200 bg-white">
            {(["all", "pending", "approved", "rejected"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex items-center gap-2 border-r border-slate-200 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] transition last:border-r-0 ${
                  tab === t ? "bg-slate-900 text-white" : "text-slate-900 hover:bg-slate-50"
                }`}
              >
                {t}
                <span className={`rounded-sm px-1.5 py-0.5 text-[9px] ${tab === t ? "bg-slate-900 text-slate-900" : "bg-slate-50 text-slate-600"}`}>{counts[t]}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-[300px]">
            <Search size={14} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title, author or branch"
              className="h-10 w-full border border-slate-200 bg-white pl-9 pr-4 text-[13px] outline-none focus:border-slate-900"
            />
          </div>
        </div>

        {/* Stories grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => (
            <article key={s.id} className="flex flex-col border border-slate-200 bg-white">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                <p className="font-mono text-[10px] text-slate-500">{s.id}</p>
                <StatusPill
                  label={s.status === "pending" ? "Pending" : s.status === "approved" ? "Approved" : "Returned"}
                  tone={s.status === "pending" ? "warn" : s.status === "approved" ? "success" : "danger"}
                />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <Quote size={28} strokeWidth={1} className="text-slate-300" fill="currentColor" />
                <h3 className="mt-2 text-lg font-semibold uppercase leading-tight tracking-wide text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-7 text-slate-600">&ldquo;{s.excerpt}&rdquo;</p>

                <div className="mt-5 border-t border-slate-200 pt-3">
                  <p className="text-[13px] font-semibold text-slate-900">{s.by}</p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    {s.branch} · {s.submitted}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex border-t border-slate-200">
                {s.status === "pending" ? (
                  <>
                    <button className="flex flex-1 items-center justify-center gap-2 border-r border-slate-200 bg-emerald-600 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white hover:bg-emerald-700">
                      <Check size={12} strokeWidth={2.5} />
                      Approve
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 border-r border-slate-200 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 hover:bg-slate-50">
                      <Pencil size={12} strokeWidth={2.5} />
                      Edit
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 hover:bg-slate-100">
                      <X size={12} strokeWidth={2.5} />
                      Return
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex flex-1 items-center justify-center gap-2 border-r border-slate-200 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 hover:bg-slate-50">
                      <Eye size={12} strokeWidth={2.5} />
                      View
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 border-r border-slate-200 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 hover:bg-slate-50">
                      <Pencil size={12} strokeWidth={2.5} />
                      Edit
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 hover:bg-slate-100">
                      <Trash2 size={12} strokeWidth={2.5} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full border border-dashed border-slate-200 bg-white p-12 text-center">
              <p className="text-[13px] italic text-slate-400">No stories match this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

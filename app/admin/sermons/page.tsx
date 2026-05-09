"use client";

import { useState } from "react";
import {
  Mic2,
  Upload,
  Search,
  Play,
  FileText,
  Calendar,
  Pencil,
  Trash2,
  Eye,
  Filter,
  Download,
  Clock,
} from "lucide-react";
import {
  PageHeader,
  StatCard,
  Card,
  StatusPill,
  PrimaryButton,
  GhostButton,
} from "@/components/admin/ui";

const SERMONS = [
  { id: "S-142", title: "Walking by Faith", series: "Hebrews 11", preacher: "Bishop Nelson Barasa", branch: "HQ Nzoia", date: "21 Apr 2026", duration: "42:18", status: "published" as const, plays: 312 },
  { id: "S-141", title: "The Lord is my Shepherd", series: "Psalms Reborn", preacher: "Pst. Sarah Wekesa", branch: "HQ Nzoia", date: "14 Apr 2026", duration: "38:05", status: "published" as const, plays: 248 },
  { id: "S-140", title: "Light in dark places", series: "Standalone", preacher: "Pst. Festas Soita", branch: "Mombasa", date: "14 Apr 2026", duration: "45:22", status: "published" as const, plays: 134 },
  { id: "S-139", title: "Carrying one another", series: "One Body", preacher: "Pst. Irene Wafula", branch: "HQ Nzoia", date: "07 Apr 2026", duration: "36:40", status: "published" as const, plays: 198 },
  { id: "S-138", title: "When the harvest comes", series: "Parables", preacher: "Rev. Hosea Mabonga", branch: "Tembelela", date: "07 Apr 2026", duration: "41:11", status: "published" as const, plays: 102 },
  { id: "S-DR3", title: "From mourning to dancing", series: "Sermon Series", preacher: "Bishop Nelson Barasa", branch: "HQ Nzoia", date: "—", duration: "—", status: "draft" as const, plays: 0 },
  { id: "S-DR2", title: "The unseen God", series: "Hebrews 11", preacher: "Pst. Sarah Wekesa", branch: "HQ Nzoia", date: "—", duration: "—", status: "draft" as const, plays: 0 },
  { id: "S-DR1", title: "Awaiting upload", series: "Mid-week study", preacher: "Pst. Wycliffe Simiyu", branch: "Mang'ana", date: "—", duration: "—", status: "scheduled" as const, plays: 0 },
];

export default function AdminSermons() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"all" | "published" | "draft" | "scheduled">("all");

  const filtered = SERMONS.filter((s) => {
    if (tab !== "all" && s.status !== tab) return false;
    const t = q.toLowerCase();
    return !t || s.title.toLowerCase().includes(t) || s.preacher.toLowerCase().includes(t) || s.branch.toLowerCase().includes(t);
  });

  const counts = {
    all: SERMONS.length,
    published: SERMONS.filter((s) => s.status === "published").length,
    draft: SERMONS.filter((s) => s.status === "draft").length,
    scheduled: SERMONS.filter((s) => s.status === "scheduled").length,
  };

  return (
    <div>
      <PageHeader
        kicker="Ministry · Sermons"
        title="Sermon Library"
        description="Upload, edit, and publish sermons across the network. Audio, video, transcripts and notes are all kept here."
        actions={
          <>
            <PrimaryButton icon={Upload}>Upload Sermon</PrimaryButton>
            <GhostButton icon={Download}>Export CSV</GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Mic2} label="Total Sermons" value={String(counts.all)} sub={`${counts.published} live · ${counts.draft} drafts`} />
          <StatCard icon={Play} label="Plays · 30 days" value="2,148" sub="HQ + branches" delta={{ value: "+18%", up: true }} />
          <StatCard icon={Clock} label="Avg. Duration" value="40:32" sub="Across last 10" />
          <StatCard icon={FileText} label="With Transcripts" value="64" sub={`of ${counts.published}`} />
        </div>

        {/* Tabs + search */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-0 border border-slate-200 bg-white">
            {(["all", "published", "draft", "scheduled"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex items-center gap-2 border-r border-slate-200 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] transition last:border-r-0 ${
                  tab === t ? "bg-slate-900 text-white" : "text-slate-900 hover:bg-slate-50"
                }`}
              >
                {t}
                <span className={`rounded-sm px-1.5 py-0.5 text-white ${tab === t ? "bg-slate-900" : "bg-slate-50 text-slate-600"}`}>
                  {counts[t]}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-[300px]">
              <Search size={14} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search sermons or preachers"
                className="h-10 w-full border border-slate-200 bg-white pl-9 pr-4 text-[13px] outline-none focus:border-slate-900"
              />
            </div>
            <button className="flex h-10 items-center gap-2 border border-slate-200 bg-white px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 hover:bg-slate-50">
              <Filter size={12} strokeWidth={2.25} />
              Filter
            </button>
          </div>
        </div>

        {/* Sermon table */}
        <Card kicker="Catalogue" title={`${filtered.length} sermon${filtered.length === 1 ? "" : "s"}`} padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-white">
                  {["Ref.", "Title & Series", "Preacher", "Branch", "Date", "Duration", "Plays", "Status", ""].map((h, i) => (
                    <th key={i} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} group hover:bg-slate-50`}>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500">{s.id}</td>
                    <td className="px-4 py-3.5">
                      <p className="text-[14px] font-semibold text-slate-900">{s.title}</p>
                      <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-slate-500">{s.series}</p>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-slate-700">{s.preacher}</td>
                    <td className="px-4 py-3.5 text-[12px] text-slate-500">{s.branch}</td>
                    <td className="px-4 py-3.5 text-[12px] text-slate-500">{s.date}</td>
                    <td className="px-4 py-3.5 font-mono text-[12px] text-slate-600">{s.duration}</td>
                    <td className="px-4 py-3.5 font-mono text-[13px] text-slate-900">{s.plays || "—"}</td>
                    <td className="px-4 py-3.5">
                      <StatusPill
                        label={s.status === "published" ? "Live" : s.status === "draft" ? "Draft" : "Scheduled"}
                        tone={s.status === "published" ? "success" : s.status === "draft" ? "warn" : "info"}
                      />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="inline-flex items-center gap-0 opacity-0 transition group-hover:opacity-100">
                        <button className="flex h-8 w-8 items-center justify-center border border-slate-200 bg-white text-slate-500 hover:text-slate-900" title="Preview"><Eye size={13} strokeWidth={2} /></button>
                        <button className="flex h-8 w-8 items-center justify-center border border-l-0 border-slate-200 bg-white text-slate-500 hover:text-slate-900" title="Edit"><Pencil size={13} strokeWidth={2} /></button>
                        <button className="flex h-8 w-8 items-center justify-center border border-l-0 border-slate-200 bg-white text-slate-500 hover:text-slate-500" title="Delete"><Trash2 size={13} strokeWidth={2} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-[13px] italic text-slate-400">No sermons match this filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

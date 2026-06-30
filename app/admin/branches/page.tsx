"use client";

import { useState } from "react";
import {
  PlusCircle,
  Search,
  Phone,
  MoreVertical,
  Download,
  Pencil,
  Eye,
  Pause,
} from "lucide-react";
import { siteData } from "@/data/site";
import {
  PageHeader,
  StatCard,
  Card,
  StatusPill,
  PrimaryButton,
  GhostButton,
  SampleDataBadge,
} from "@/components/admin/ui";
import { MapPin, Users as UsersIcon, Building2, Calendar } from "lucide-react";

const FAKE = [
  { members: 120, weekly: 145, founded: "2013", status: "active" as const, phone: "+254 721 683 397" },
  { members: 64, weekly: 71, founded: "2016", status: "active" as const, phone: "+254 720 111 222" },
  { members: 58, weekly: 62, founded: "2016", status: "active" as const, phone: "+254 720 222 333" },
  { members: 41, weekly: 48, founded: "2016", status: "active" as const, phone: "+254 720 333 444" },
  { members: 49, weekly: 53, founded: "2018", status: "active" as const, phone: "+254 720 444 555" },
  { members: 33, weekly: 36, founded: "2019", status: "active" as const, phone: "+254 720 555 666" },
  { members: 38, weekly: 42, founded: "2020", status: "active" as const, phone: "+254 720 666 777" },
  { members: 27, weekly: 30, founded: "2021", status: "planting" as const, phone: "+254 720 777 888" },
  { members: 98, weekly: 110, founded: "2022", status: "active" as const, phone: "+254 720 888 999" },
];

export default function AdminBranches() {
  const [q, setQ] = useState("");
  const branches = siteData.branches.map((b, i) => ({ ...b, ...FAKE[i] }));
  const filtered = branches.filter(
    (b) =>
      b.name.toLowerCase().includes(q.toLowerCase()) ||
      b.pastor.toLowerCase().includes(q.toLowerCase()) ||
      b.location.toLowerCase().includes(q.toLowerCase())
  );

  const totalMembers = branches.reduce((s, b) => s + b.members, 0);
  const totalWeekly = branches.reduce((s, b) => s + b.weekly, 0);

  return (
    <div>
      <PageHeader
        kicker="Ministry · Network"
        title="Branches"
        description="Manage the nine-branch JCFM network across Kenya — assign pastors, update contacts, and track weekly attendance."
        actions={
          <>
            <PrimaryButton icon={PlusCircle}>New Branch</PrimaryButton>
            <GhostButton icon={Download}>Export</GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        <SampleDataBadge note="branch directory and attendance figures are placeholders for now." />

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={MapPin} accent="navy" label="Total Branches" value={String(branches.length)} sub="HQ + 8 daughter churches" />
          <StatCard icon={UsersIcon} accent="gold" label="Members on Roll" value={totalMembers.toString()} sub="Across all branches" />
          <StatCard icon={Calendar} accent="green" label="Weekly Attendance" value={totalWeekly.toString()} sub="Last Sunday" delta={{ value: "+4%", up: true }} />
          <StatCard icon={Building2} accent="red" label="In Planting" value={String(branches.filter((b) => b.status === "planting").length)} sub="New work in progress" />
        </div>

        {/* Search */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search size={14} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, pastor or location"
              className="h-10 w-full border border-slate-200 bg-white pl-9 pr-4 text-[13px] outline-none transition focus:border-slate-900"
            />
          </div>
          <p className="text-[11px] uppercase tracking-tight text-slate-500">
            Showing <span className="font-bold text-slate-900">{filtered.length}</span> of {branches.length}
          </p>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {filtered.map((b, i) => (
            <div key={b.name} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-slate-900">
                    {b.name}
                    {b.isHq && (
                      <span className="ml-2 rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-tight text-slate-500">
                        HQ
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-[13px] text-slate-600">{b.pastor}</p>
                  <p className="mt-0.5 text-[12px] text-slate-500">{b.location}</p>
                </div>
                <StatusPill label={b.status === "active" ? "Active" : "Planting"} tone={b.status === "active" ? "success" : "warn"} />
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[12px]">
                <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 text-slate-600">
                  <Phone size={12} strokeWidth={2} />
                  {b.phone}
                </a>
                <span className="font-mono text-slate-900">{b.members} members</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-[13px] italic text-slate-400">
              No branches match &ldquo;{q}&rdquo;.
            </p>
          )}
        </div>

        {/* Table (md+) */}
        <Card kicker="Directory" title="All Branches" padded={false} className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-white">
                  {["#", "Branch", "Pastor", "Location", "Phone", "Members", "Founded", "Status", ""].map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-[10px] font-bold uppercase tracking-tight text-slate-900"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b.name} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} group hover:bg-slate-50`}>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400">{String(i + 1).padStart(2, "0")}</td>
                    <td className="px-4 py-3.5">
                      <p className="text-[14px] font-semibold text-slate-900">
                        {b.name}
                        {b.isHq && (
                          <span className="ml-2 border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-tight text-slate-500">
                            HQ
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-slate-700">{b.pastor}</td>
                    <td className="px-4 py-3.5 text-[12px] text-slate-500">{b.location}</td>
                    <td className="px-4 py-3.5 font-mono text-[12px] text-slate-600">
                      <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 hover:text-slate-900">
                        <Phone size={11} strokeWidth={2} />
                        {b.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[13px] text-slate-900">{b.members}</td>
                    <td className="px-4 py-3.5 text-[12px] text-slate-500">{b.founded}</td>
                    <td className="px-4 py-3.5">
                      <StatusPill
                        label={b.status === "active" ? "Active" : "Planting"}
                        tone={b.status === "active" ? "success" : "warn"}
                      />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="inline-flex items-center gap-0 opacity-0 transition group-hover:opacity-100">
                        <button className="flex h-8 w-8 items-center justify-center border border-slate-200 bg-white text-slate-500 hover:text-slate-900" title="View">
                          <Eye size={13} strokeWidth={2} />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center border border-l-0 border-slate-200 bg-white text-slate-500 hover:text-slate-900" title="Edit">
                          <Pencil size={13} strokeWidth={2} />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center border border-l-0 border-slate-200 bg-white text-slate-500 hover:text-slate-500" title="Suspend">
                          <Pause size={13} strokeWidth={2} />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center border border-l-0 border-slate-200 bg-white text-slate-500 hover:text-slate-900" title="More">
                          <MoreVertical size={13} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-[13px] italic text-slate-400">
                      No branches match &ldquo;{q}&rdquo;.
                    </td>
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

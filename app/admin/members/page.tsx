"use client";

import { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Phone,
  Mail,
  MapPin,
  Pencil,
  Eye,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Calendar,
} from "lucide-react";
import { siteData } from "@/data/site";
import {
  PageHeader,
  StatCard,
  Card,
  StatusPill,
  PrimaryButton,
  GhostButton,
} from "@/components/admin/ui";

type Member = {
  id: string;
  name: string;
  branch: string;
  role: string;
  phone: string;
  email: string;
  joined: string;
  status: "active" | "visitor" | "inactive";
};

const FIRST = ["Anne", "Brian", "Mercy", "Joseph", "Naomi", "Peter", "Kevin", "Sarah", "James", "Esther", "Daniel", "Phoebe", "Hosea", "Wycliffe", "Mary", "Evans", "Elizabeth", "Festas", "Patrick", "Janet", "Faith", "Brenda", "Isaiah", "Caleb", "Ruth"];
const LAST = ["Wekesa", "Simiyu", "Wafula", "Nasimiyu", "Nekesa", "Mabonga", "Soita", "Nyongesa", "Wamachari", "Juyuba", "Musawa", "Wanyama", "Mulama", "Barasa", "Kimani", "Otieno"];

function buildMembers(): Member[] {
  const branches = siteData.branches.map((b) => b.name);
  const out: Member[] = [];
  for (let i = 0; i < 60; i++) {
    const f = FIRST[(i * 7) % FIRST.length];
    const l = LAST[(i * 11) % LAST.length];
    const b = branches[i % branches.length];
    const r = ["Member", "Choir", "Usher", "Sunday School", "Elder", "Deacon", "Youth"][i % 7];
    const status = (i % 11 === 0 ? "visitor" : i % 17 === 0 ? "inactive" : "active") as Member["status"];
    out.push({
      id: `M-${String(1000 + i)}`,
      name: `${f} ${l}`,
      branch: b,
      role: r,
      phone: `+254 7${String(20 + (i % 60))} ${String((100 + i * 13) % 1000).padStart(3, "0")} ${String((200 + i * 19) % 1000).padStart(3, "0")}`,
      email: `${f.toLowerCase()}.${l.toLowerCase()}@example.org`,
      joined: `${(i % 28) + 1} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i % 12]} ${2018 + (i % 8)}`,
      status,
    });
  }
  return out;
}

const ALL = buildMembers();
const PAGE_SIZE = 12;

export default function AdminMembers() {
  const [q, setQ] = useState("");
  const [branch, setBranch] = useState<string>("All");
  const [page, setPage] = useState(1);

  const filtered = ALL.filter((m) => {
    if (branch !== "All" && m.branch !== branch) return false;
    const t = q.toLowerCase();
    return !t || m.name.toLowerCase().includes(t) || m.email.toLowerCase().includes(t) || m.id.toLowerCase().includes(t);
  });

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const view = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalActive = ALL.filter((m) => m.status === "active").length;
  const totalVisitors = ALL.filter((m) => m.status === "visitor").length;

  return (
    <div>
      <PageHeader
        kicker="Ministry · People"
        title="Members"
        description="The directory of every member, visitor and worker registered across the JCFM network."
        actions={
          <>
            <PrimaryButton icon={UserPlus}>Add Member</PrimaryButton>
            <GhostButton icon={Download}>Export</GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Members on Roll" value={String(ALL.length)} sub="Across all branches" />
          <StatCard icon={UserCheck} label="Active" value={String(totalActive)} sub="Regular attendance" delta={{ value: "+24 (30d)", up: true }} />
          <StatCard icon={UserPlus} label="Visitors" value={String(totalVisitors)} sub="In follow-up" />
          <StatCard icon={Calendar} label="Avg. Tenure" value="4.2 yrs" sub="Across active members" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-[320px]">
              <Search size={14} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Search by name, email or member ID"
                className="h-10 w-full border border-slate-200 bg-white pl-9 pr-4 text-[13px] outline-none focus:border-slate-900"
              />
            </div>

            <div className="relative">
              <select
                value={branch}
                onChange={(e) => { setBranch(e.target.value); setPage(1); }}
                className="h-10 appearance-none border border-slate-200 bg-white pl-9 pr-8 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-900 outline-none focus:border-slate-900"
              >
                <option value="All">All Branches</option>
                {siteData.branches.map((b) => (
                  <option key={b.name} value={b.name}>{b.name}</option>
                ))}
              </select>
              <Filter size={12} strokeWidth={2.25} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Showing <span className="font-bold text-slate-900">{view.length}</span> of {filtered.length} ({page}/{pages})
          </p>
        </div>

        {/* Table */}
        <Card kicker="Directory" title="Member List" padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-white">
                  {["ID", "Name", "Branch", "Role", "Contact", "Joined", "Status", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {view.map((m, i) => (
                  <tr key={m.id} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} group hover:bg-slate-50`}>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{m.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-slate-900 bg-slate-900 text-[11px] font-bold text-slate-700">
                          {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                        </span>
                        <p className="text-[14px] font-semibold text-slate-900">{m.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-slate-700">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={11} strokeWidth={2} className="text-slate-400" />
                        {m.branch}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-slate-500">{m.role}</td>
                    <td className="px-4 py-3 text-[11px] text-slate-600">
                      <div className="flex flex-col gap-0.5">
                        <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1 hover:text-slate-900">
                          <Phone size={10} strokeWidth={2} />
                          <span className="font-mono">{m.phone}</span>
                        </a>
                        <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 hover:text-slate-900">
                          <Mail size={10} strokeWidth={2} />
                          <span className="truncate">{m.email}</span>
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-slate-500">{m.joined}</td>
                    <td className="px-4 py-3">
                      <StatusPill
                        label={m.status === "active" ? "Active" : m.status === "visitor" ? "Visitor" : "Inactive"}
                        tone={m.status === "active" ? "success" : m.status === "visitor" ? "warn" : "neutral"}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-0 opacity-0 transition group-hover:opacity-100">
                        <button className="flex h-8 w-8 items-center justify-center border border-slate-200 bg-white text-slate-500 hover:text-slate-900" title="View"><Eye size={13} strokeWidth={2} /></button>
                        <button className="flex h-8 w-8 items-center justify-center border border-l-0 border-slate-200 bg-white text-slate-500 hover:text-slate-900" title="Edit"><Pencil size={13} strokeWidth={2} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {view.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-[13px] italic text-slate-400">No members match.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Page <span className="font-bold text-slate-900">{page}</span> of {pages}
            </p>
            <div className="flex items-center gap-0">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-8 items-center gap-1 border border-slate-200 bg-white px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 disabled:opacity-40"
              >
                <ChevronLeft size={12} strokeWidth={2.5} />
                Prev
              </button>
              <button
                disabled={page >= pages}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                className="flex h-8 items-center gap-1 border border-l-0 border-slate-200 bg-white px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 disabled:opacity-40"
              >
                Next
                <ChevronRight size={12} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

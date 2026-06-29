"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Users, UserPlus, Search, Phone, Mail, MapPin, UserCheck, Loader2 } from "lucide-react";
import { siteData } from "@/data/site";
import {
  PageHeader,
  StatCard,
  Card,
  StatusPill,
  PrimaryButton,
} from "@/components/admin/ui";
import { FormModal, Field, SelectField } from "@/components/admin/AdminForm";

type Member = {
  id: string;
  name: string;
  branch: string;
  role: string;
  phone: string | null;
  email: string | null;
  status: "active" | "visitor" | "inactive";
  joinedAt: string | null;
};

const tone = (s: Member["status"]) => (s === "active" ? "success" : s === "visitor" ? "warn" : "neutral");
const label = (s: Member["status"]) => (s === "active" ? "Active" : s === "visitor" ? "Visitor" : "Inactive");

export default function AdminMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [branch, setBranch] = useState("All");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/members")
      .then((r) => r.json())
      .then((d) => setMembers(d.members ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () =>
      members.filter((m) => {
        if (branch !== "All" && m.branch !== branch) return false;
        const t = q.toLowerCase();
        return !t || m.name.toLowerCase().includes(t) || (m.email ?? "").toLowerCase().includes(t);
      }),
    [members, q, branch]
  );

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    visitors: members.filter((m) => m.status === "visitor").length,
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Could not save the member.");
      return;
    }
    setOpen(false);
    load();
  }

  return (
    <div>
      <PageHeader
        kicker="Ministry · People"
        title="Members"
        description="The private directory of members across the JCFM network. Saved to the database."
        actions={
          <PrimaryButton icon={UserPlus} onClick={() => { setError(null); setOpen(true); }}>
            Add Member
          </PrimaryButton>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Users} label="Members on Roll" value={String(stats.total)} sub="All branches" />
          <StatCard icon={UserCheck} label="Active" value={String(stats.active)} sub="Regular attendance" />
          <StatCard icon={UserPlus} label="Visitors" value={String(stats.visitors)} sub="In follow-up" />
          <StatCard icon={MapPin} label="Branches" value={String(siteData.branches.length)} sub="Network" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative w-full sm:w-[280px]">
              <Search size={14} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or email"
                className="min-h-[44px] w-full rounded-md border border-slate-200 bg-white pl-9 pr-4 text-[14px] outline-none focus:border-slate-900"
              />
            </div>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="min-h-[44px] rounded-md border border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-900 outline-none focus:border-slate-900"
            >
              <option value="All">All Branches</option>
              {siteData.branches.map((b) => (
                <option key={b.name} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>
          <p className="text-[12px] text-slate-500">
            Showing <span className="font-bold text-slate-900">{filtered.length}</span> of {members.length}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400"><Loader2 className="animate-spin" /></div>
        ) : members.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center">
            <p className="text-[14px] font-semibold text-slate-900">No members yet</p>
            <p className="mt-1 text-[13px] text-slate-500">Add your first member to start the directory.</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {filtered.map((m) => (
                <div key={m.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-slate-900">{m.name}</p>
                      <p className="text-[12px] text-slate-500">{m.role} · {m.branch}</p>
                    </div>
                    <StatusPill label={label(m.status)} tone={tone(m.status)} />
                  </div>
                  {(m.phone || m.email) && (
                    <div className="mt-3 flex flex-col gap-1 border-t border-slate-100 pt-3 text-[12px] text-slate-600">
                      {m.phone && <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1.5"><Phone size={12} /> {m.phone}</a>}
                      {m.email && <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5"><Mail size={12} /> {m.email}</a>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <Card kicker="Directory" title="Member List" padded={false} className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-slate-900 bg-white">
                      {["Name", "Branch", "Role", "Contact", "Status"].map((h) => (
                        <th key={h} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-900">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((m, i) => (
                      <tr key={m.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 text-[14px] font-semibold text-slate-900">{m.name}</td>
                        <td className="px-4 py-3 text-[12px] text-slate-600">{m.branch}</td>
                        <td className="px-4 py-3 text-[12px] text-slate-500">{m.role}</td>
                        <td className="px-4 py-3 text-[12px] text-slate-600">
                          <div className="flex flex-col">
                            {m.phone && <span className="font-mono">{m.phone}</span>}
                            {m.email && <span className="truncate">{m.email}</span>}
                            {!m.phone && !m.email && <span className="text-slate-400">—</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3"><StatusPill label={label(m.status)} tone={tone(m.status)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>

      <FormModal title="Add Member" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full name" name="name" required placeholder="e.g. Anne Wekesa" />
          <SelectField
            label="Branch"
            name="branch"
            required
            defaultValue={siteData.branches[0]?.name}
            options={siteData.branches.map((b) => ({ value: b.name, label: b.name }))}
          />
          <Field label="Role" name="role" placeholder="e.g. Member, Choir, Usher, Elder" defaultValue="Member" />
          <Field label="Phone" name="phone" type="tel" placeholder="+254…" />
          <Field label="Email" name="email" type="email" placeholder="name@example.com" />
          <SelectField
            label="Status"
            name="status"
            required
            defaultValue="active"
            options={[
              { value: "active", label: "Active" },
              { value: "visitor", label: "Visitor" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
          {error && <p className="rounded-md bg-rose-50 p-3 text-[13px] text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Save Member"}
          </button>
        </form>
      </FormModal>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { Mic2, Upload, Play, Calendar, Trash2, Loader2, FileText } from "lucide-react";
import { siteData } from "@/data/site";
import {
  PageHeader,
  StatCard,
  Card,
  StatusPill,
  PrimaryButton,
} from "@/components/admin/ui";
import { FormModal, Field, SelectField, TextareaField } from "@/components/admin/AdminForm";

type Sermon = {
  id: string;
  title: string;
  series: string | null;
  preacher: string;
  branch: string | null;
  date: string | null;
  status: "published" | "draft" | "scheduled";
  mediaUrl: string | null;
};

const statusTone = (s: Sermon["status"]) =>
  s === "published" ? "success" : s === "draft" ? "warn" : "info";
const statusLabel = (s: Sermon["status"]) =>
  s === "published" ? "Live" : s === "draft" ? "Draft" : "Scheduled";
const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

export default function AdminSermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/sermons")
      .then((r) => r.json())
      .then((d) => setSermons(d.sermons ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = {
    all: sermons.length,
    published: sermons.filter((s) => s.status === "published").length,
    draft: sermons.filter((s) => s.status === "draft").length,
    scheduled: sermons.filter((s) => s.status === "scheduled").length,
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/admin/sermons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Could not save the sermon.");
      return;
    }
    setOpen(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this sermon? This cannot be undone.")) return;
    await fetch(`/api/admin/sermons/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <PageHeader
        kicker="Ministry · Sermons"
        title="Sermon Library"
        description="Add and manage sermons across the network. Saved to the database."
        actions={
          <PrimaryButton icon={Upload} onClick={() => { setError(null); setOpen(true); }}>
            Add Sermon
          </PrimaryButton>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Mic2} label="Total Sermons" value={String(counts.all)} sub={`${counts.published} live`} />
          <StatCard icon={Play} label="Published" value={String(counts.published)} sub="On the public site" />
          <StatCard icon={FileText} label="Drafts" value={String(counts.draft)} sub="Not yet live" />
          <StatCard icon={Calendar} label="Scheduled" value={String(counts.scheduled)} sub="Queued" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <Loader2 className="animate-spin" />
          </div>
        ) : sermons.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center">
            <p className="text-[14px] font-semibold text-slate-900">No sermons yet</p>
            <p className="mt-1 text-[13px] text-slate-500">Add your first sermon to get started.</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {sermons.map((s) => (
                <div key={s.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-slate-900">{s.title}</p>
                      {s.series && <p className="text-[11px] uppercase tracking-wide text-slate-500">{s.series}</p>}
                      <p className="mt-1 text-[13px] text-slate-600">{s.preacher}</p>
                      <p className="text-[12px] text-slate-500">{[s.branch, fmtDate(s.date)].filter(Boolean).join(" · ")}</p>
                    </div>
                    <StatusPill label={statusLabel(s.status)} tone={statusTone(s.status)} />
                  </div>
                  <div className="mt-3 flex justify-end border-t border-slate-100 pt-3">
                    <button onClick={() => handleDelete(s.id)} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md px-3 text-[12px] font-medium text-rose-600 hover:bg-rose-50">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <Card kicker="Catalogue" title={`${sermons.length} sermon${sermons.length === 1 ? "" : "s"}`} padded={false} className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-slate-900 bg-white">
                      {["Title & Series", "Preacher", "Branch", "Date", "Status", ""].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-900">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sermons.map((s, i) => (
                      <tr key={s.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3.5">
                          <p className="text-[14px] font-semibold text-slate-900">{s.title}</p>
                          {s.series && <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{s.series}</p>}
                        </td>
                        <td className="px-4 py-3.5 text-[13px] text-slate-700">{s.preacher}</td>
                        <td className="px-4 py-3.5 text-[12px] text-slate-500">{s.branch ?? "—"}</td>
                        <td className="px-4 py-3.5 text-[12px] text-slate-500">{fmtDate(s.date)}</td>
                        <td className="px-4 py-3.5"><StatusPill label={statusLabel(s.status)} tone={statusTone(s.status)} /></td>
                        <td className="px-4 py-3.5 text-right">
                          <button onClick={() => handleDelete(s.id)} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-rose-50 hover:text-rose-600" title="Delete">
                            <Trash2 size={14} strokeWidth={2} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>

      <FormModal title="Add Sermon" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title" name="title" required placeholder="e.g. Walking by Faith" />
          <Field label="Preacher" name="preacher" required placeholder="e.g. Bishop Nelson Barasa" />
          <Field label="Series" name="series" placeholder="e.g. Hebrews 11" />
          <SelectField
            label="Branch"
            name="branch"
            defaultValue=""
            options={[{ value: "", label: "— none —" }, ...siteData.branches.map((b) => ({ value: b.name, label: b.name }))]}
          />
          <Field label="Date" name="date" type="date" />
          <SelectField
            label="Status"
            name="status"
            required
            defaultValue="published"
            options={[
              { value: "published", label: "Published (live)" },
              { value: "draft", label: "Draft" },
              { value: "scheduled", label: "Scheduled" },
            ]}
          />
          <Field label="Media link (audio/video)" name="mediaUrl" placeholder="https://…" />
          <TextareaField label="Notes" name="notes" placeholder="Optional summary or notes" />

          {error && <p className="rounded-md bg-rose-50 p-3 text-[13px] text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Save Sermon"}
          </button>
        </form>
      </FormModal>
    </div>
  );
}

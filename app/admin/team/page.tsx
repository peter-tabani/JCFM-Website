"use client";

import { useCallback, useEffect, useState } from "react";
import { Users, UserPlus, Trash2, Loader2, Star, ExternalLink } from "lucide-react";
import {
  PageHeader,
  StatCard,
  StatusPill,
  PrimaryButton,
  GhostButton,
} from "@/components/admin/ui";
import { FormModal, Field, TextareaField, SelectField } from "@/components/admin/AdminForm";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  tag: string | null;
  bio: string;
  quote: string | null;
  photo: string | null;
  email: string | null;
  featured: boolean;
  sortOrder: number;
};

export default function AdminTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/team")
      .then((r) => r.json())
      .then((d) => setTeam(d.team ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = { ...raw, featured: raw.featured === "yes" };
    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Could not save the team member.");
      return;
    }
    setOpen(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this person from the public Leadership page?")) return;
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <PageHeader
        kicker="Ministry · Leadership"
        title="Team / Leadership"
        description="The people shown on the public Leadership page. Changes appear there immediately."
        actions={
          <>
            <GhostButton icon={ExternalLink} href="/leadership">View public page</GhostButton>
            <PrimaryButton icon={UserPlus} onClick={() => { setError(null); setOpen(true); }}>
              Add Person
            </PrimaryButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <StatCard icon={Users} label="Team Members" value={String(team.length)} sub="On the Leadership page" />
          <StatCard icon={Star} label="Featured" value={String(team.filter((t) => t.featured).length)} sub="Highlighted at the top" />
          <StatCard icon={Users} label="With Photo" value={String(team.filter((t) => t.photo).length)} sub="Have an image" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400"><Loader2 className="animate-spin" /></div>
        ) : team.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center">
            <p className="text-[14px] font-semibold text-slate-900">No team members yet</p>
            <p className="mt-1 text-[13px] text-slate-500">Add people to populate the public Leadership page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div key={m.id} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photo} alt={m.name} className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-[13px] font-bold text-slate-600">
                        {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-slate-900">{m.name}</p>
                      <p className="text-[12px] text-slate-500">{m.role}</p>
                    </div>
                  </div>
                  {m.featured && <StatusPill label="Featured" tone="info" />}
                </div>
                <p className="mt-3 line-clamp-3 text-[12.5px] leading-6 text-slate-600">{m.bio}</p>
                <div className="mt-3 flex justify-end border-t border-slate-100 pt-3">
                  <button onClick={() => handleDelete(m.id)} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md px-3 text-[12px] font-medium text-rose-600 hover:bg-rose-50">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FormModal title="Add Team Member" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name" name="name" required placeholder="e.g. Rev. Noah Mweruphe" />
          <Field label="Role" name="role" required placeholder="e.g. Senior Pastor & Founder" />
          <Field label="Tag (short label)" name="tag" placeholder="e.g. Founder & Pastor" />
          <TextareaField label="Bio" name="bio" placeholder="A short paragraph about this person" />
          <TextareaField label="Quote" name="quote" placeholder="An optional quote" />
          <Field label="Photo URL" name="photo" placeholder="/images/staff/name.png or https://…" />
          <Field label="Email" name="email" type="email" placeholder="info@jcfm.online" />
          <Field label="Sort order (lower = first)" name="sortOrder" type="number" defaultValue="10" />
          <SelectField
            label="Feature at the top?"
            name="featured"
            defaultValue="no"
            options={[
              { value: "no", label: "No, show in the team grid" },
              { value: "yes", label: "Yes, feature prominently" },
            ]}
          />
          {error && <p className="rounded-md bg-rose-50 p-3 text-[13px] text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Save Team Member"}
          </button>
        </form>
      </FormModal>
    </div>
  );
}

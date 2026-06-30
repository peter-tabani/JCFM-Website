"use client";

import { useCallback, useEffect, useState } from "react";
import { Calendar, PlusCircle, MapPin, Loader2, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import {
  PageHeader,
  StatCard,
  Card,
  StatusPill,
  PrimaryButton,
} from "@/components/admin/ui";
import { FormModal, Field, TextareaField, SelectField } from "@/components/admin/AdminForm";

type EventItem = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  date: string | null;
  imageUrl: string | null;
  published: boolean;
};

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Date TBC";

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((d) => setEvents(d.events ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const publishedCount = events.filter((e) => e.published).length;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = { ...raw, published: raw.published !== "no" };
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Could not save the event.");
      return;
    }
    setOpen(false);
    load();
  }

  return (
    <div>
      <PageHeader
        kicker="Ministry · Calendar"
        title="Events"
        description="Add upcoming events and posters. Published events appear on the public home page."
        actions={
          <PrimaryButton icon={PlusCircle} onClick={() => { setError(null); setOpen(true); }}>
            Add Event
          </PrimaryButton>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Calendar} label="Total Events" value={String(events.length)} sub="All time" />
          <StatCard icon={Eye} label="Published" value={String(publishedCount)} sub="Visible on the site" />
          <StatCard icon={EyeOff} label="Hidden" value={String(events.length - publishedCount)} sub="Not shown publicly" />
          <StatCard icon={ImageIcon} label="With Poster" value={String(events.filter((e) => e.imageUrl).length)} sub="Have an image" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400"><Loader2 className="animate-spin" /></div>
        ) : events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center">
            <p className="text-[14px] font-semibold text-slate-900">No events yet</p>
            <p className="mt-1 text-[13px] text-slate-500">Add an event — it will show on the public home page once published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => (
              <div key={ev.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                {ev.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ev.imageUrl} alt={ev.title} className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center bg-slate-100 text-slate-300">
                    <ImageIcon size={28} />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[15px] font-semibold text-slate-900">{ev.title}</p>
                    <StatusPill label={ev.published ? "Live" : "Hidden"} tone={ev.published ? "success" : "neutral"} />
                  </div>
                  <p className="mt-1 text-[12px] text-slate-500">
                    {fmtDate(ev.date)}{ev.location ? ` · ${ev.location}` : ""}
                  </p>
                  {ev.description && <p className="mt-2 text-[13px] leading-6 text-slate-600">{ev.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FormModal title="Add Event" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title" name="title" required placeholder="e.g. Youth Crusade 2026" />
          <Field label="Date" name="date" type="date" />
          <Field label="Location" name="location" placeholder="e.g. HQ Nzoia" />
          <Field label="Poster image URL" name="imageUrl" placeholder="https://… (optional)" />
          <TextareaField label="Description" name="description" placeholder="Short description (optional)" />
          <SelectField
            label="Visibility"
            name="published"
            defaultValue="yes"
            options={[
              { value: "yes", label: "Published (show on site)" },
              { value: "no", label: "Hidden (draft)" },
            ]}
          />
          {error && <p className="rounded-md bg-rose-50 p-3 text-[13px] text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Save Event"}
          </button>
        </form>
      </FormModal>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Mail,
  Palette,
  Database,
  Save,
  Check,
} from "lucide-react";
import { PageHeader, Card, PrimaryButton, GhostButton, StatusPill, SampleDataBadge } from "@/components/admin/ui";

type TabKey = "profile" | "ministry" | "notifications" | "security" | "appearance" | "system";

const TABS: { key: TabKey; label: string; icon: typeof User }[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "ministry", label: "Ministry", icon: Globe },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
  { key: "appearance", label: "Appearance", icon: Palette },
  { key: "system", label: "System", icon: Database },
];

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<TabKey>("profile");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        kicker="Administration"
        title="Settings & Preferences"
        description="Manage your administrator profile, ministry information, security, and platform behaviour."
        actions={
          saved ? (
            <span className="inline-flex items-center gap-2 border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              <Check size={13} strokeWidth={2.5} /> Saved
            </span>
          ) : (
            <PrimaryButton icon={Save} onClick={() => handleSave({ preventDefault: () => {} } as React.FormEvent)}>
              Save Changes
            </PrimaryButton>
          )
        }
      />

      <div className="px-5 pt-6 md:px-8">
        <SampleDataBadge note="settings are not saved yet — changes here do not persist." />
      </div>

      <div className="grid gap-6 px-5 py-6 md:grid-cols-[240px_1fr] md:px-8 md:py-8">
        {/* Sidebar tabs */}
        <aside className="border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-slate-500">Sections</p>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Settings Menu
            </h3>
          </div>
          <nav className="flex flex-col">
            {TABS.map((t) => {
              const active = tab === t.key;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-3 border-b border-slate-200 px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.16em] transition ${
                    active
                      ? "bg-slate-800 text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={14} strokeWidth={2} />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <form onSubmit={handleSave} className="space-y-6">
          {tab === "profile" && (
            <Card title="Administrator Profile" kicker="Account">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full Name" defaultValue={session?.user?.name || "Ministry Administrator"} />
                <Field label="Email Address" type="email" defaultValue={session?.user?.email || ""} disabled />
                <Field label="Phone Number" defaultValue="+254 700 000 000" />
                <Field label="Role" defaultValue="Administrator" disabled />
                <div className="md:col-span-2">
                  <FieldArea
                    label="Short Bio"
                    defaultValue="Serving the ministry through digital stewardship and member care."
                  />
                </div>
              </div>
            </Card>
          )}

          {tab === "ministry" && (
            <>
              <Card title="Ministry Information" kicker="Organisation">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Ministry Name" defaultValue="Jesus Christ Founder Ministry" />
                  <Field label="Motto" defaultValue="In Christ Alone" />
                  <Field label="Founded" defaultValue="2008" />
                  <Field label="Headquarters" defaultValue="Kakamega, Kenya" />
                  <Field label="Primary Phone" defaultValue="+254 700 000 000" />
                  <Field label="Email" type="email" defaultValue="info@jcfm.org" />
                  <div className="md:col-span-2">
                    <FieldArea
                      label="Mission Statement"
                      defaultValue="To proclaim the gospel of Jesus Christ, plant churches, and disciple believers across East Africa."
                    />
                  </div>
                </div>
              </Card>
              <Card title="Public Website" kicker="Visibility">
                <div className="space-y-3">
                  <Toggle label="Show donation banner on home page" defaultChecked={false} />
                  <Toggle label="Display upcoming events" defaultChecked />
                  <Toggle label="Show school admissions banner" defaultChecked />
                </div>
              </Card>
            </>
          )}

          {tab === "notifications" && (
            <Card title="Notification Preferences" kicker="Alerts">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500">Email</p>
                  <div className="mt-3 space-y-3">
                    <Toggle label="New member registrations" defaultChecked />
                    <Toggle label="Donation receipts" defaultChecked />
                    <Toggle label="Weekly attendance summary" defaultChecked={false} />
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500">SMS</p>
                  <div className="mt-3 space-y-3">
                    <Toggle label="Urgent prayer requests" defaultChecked />
                    <Toggle label="Large donations (above KSh 50,000)" defaultChecked />
                    <Toggle label="System security alerts" defaultChecked />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {tab === "security" && (
            <>
              <Card title="Password" kicker="Authentication">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Current Password" type="password" placeholder="••••••••" />
                  <div />
                  <Field label="New Password" type="password" placeholder="••••••••" />
                  <Field label="Confirm New Password" type="password" placeholder="••••••••" />
                </div>
              </Card>
              <Card title="Two-Factor Authentication" kicker="Account Safety">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Authenticator app</p>
                    <p className="mt-1 text-[12px] text-slate-600">
                      Use an app like Google Authenticator to generate one-time codes.
                    </p>
                  </div>
                  <StatusPill label="Not Enabled" tone="warn" />
                </div>
                <div className="mt-4">
                  <GhostButton icon={Shield}>Enable Two-Factor</GhostButton>
                </div>
              </Card>
              <Card title="Active Sessions" kicker="Devices">
                <ul className="divide-y divide-slate-200">
                  {[
                    { device: "Windows · Chrome", loc: "Kakamega, KE", current: true },
                    { device: "Android · Mobile", loc: "Nairobi, KE", current: false },
                  ].map((s) => (
                    <li key={s.device} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-[13px] font-semibold text-slate-900">{s.device}</p>
                        <p className="text-[11px] text-slate-500">{s.loc}</p>
                      </div>
                      {s.current ? (
                        <StatusPill label="This Device" tone="success" />
                      ) : (
                        <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:underline">
                          Sign Out
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>
            </>
          )}

          {tab === "appearance" && (
            <Card title="Appearance" kicker="Display">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500">Theme</p>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {[
                      { id: "light", label: "Light", bg: "bg-white" },
                      { id: "cream", label: "Cream", bg: "bg-slate-50" },
                      { id: "dark", label: "Dark", bg: "bg-slate-900" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        className={`border-2 ${
                          t.id === "cream" ? "border-slate-900" : "border-slate-200"
                        } p-3 text-left transition hover:border-slate-900`}
                      >
                        <div className={`h-12 w-full ${t.bg} border border-slate-200`} />
                        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">
                          {t.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <Toggle label="Compact table density" defaultChecked={false} />
                  <Toggle label="Show page descriptions" defaultChecked />
                </div>
              </div>
            </Card>
          )}

          {tab === "system" && (
            <>
              <Card title="Data & Backups" kicker="System">
                <div className="grid gap-3 md:grid-cols-2">
                  <InfoRow label="Last Backup" value="26 Apr 2026 · 03:00 EAT" />
                  <InfoRow label="Database Size" value="142 MB" />
                  <InfoRow label="Storage Used" value="2.3 GB / 10 GB" />
                  <InfoRow label="Active Users (30d)" value="48" />
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <GhostButton icon={Database}>Run Backup Now</GhostButton>
                  <GhostButton icon={Mail}>Export Member List</GhostButton>
                </div>
              </Card>
              <Card title="Platform" kicker="Build Info">
                <div className="grid gap-3 md:grid-cols-2">
                  <InfoRow label="Version" value="v1.0.0" />
                  <InfoRow label="Environment" value="Production" />
                  <InfoRow label="Region" value="Africa (Nairobi)" />
                  <InfoRow label="Support" value="support@jcfm.org" />
                </div>
              </Card>
            </>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
            <GhostButton>Cancel</GhostButton>
            <PrimaryButton type="submit" icon={Save}>
              Save Changes
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}

/* helpers */

function Field({
  label,
  type = "text",
  defaultValue,
  placeholder,
  disabled,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
        {label}
      </span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 text-[13px] text-slate-900 outline-none transition focus:border-slate-900 disabled:bg-slate-50 disabled:text-slate-500"
      />
    </label>
  );
}

function FieldArea({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
        {label}
      </span>
      <textarea
        defaultValue={defaultValue}
        rows={3}
        className="mt-1.5 w-full resize-none border border-slate-200 bg-white px-3 py-2.5 text-[13px] text-slate-900 outline-none transition focus:border-slate-900"
      />
    </label>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <label className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-[13px] text-slate-700">{label}</span>
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 transition ${on ? "bg-slate-900" : "bg-slate-200"}`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 bg-white transition-all ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 py-2.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </span>
      <span className="text-[13px] font-semibold text-slate-900">{value}</span>
    </div>
  );
}

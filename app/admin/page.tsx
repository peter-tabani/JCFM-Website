"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  MapPin,
  Users,
  Images,
  Banknote,
  PlusCircle,
  ArrowRight,
  ImagePlus,
  Banknote as BanknoteIcon,
  UserPlus,
  Calendar,
  ChevronRight,
  Activity,
} from "lucide-react";
import { siteData } from "@/data/site";
import { PageHeader, StatCard, Card, StatusPill, PrimaryButton, GhostButton, SampleDataBadge } from "@/components/admin/ui";

const fmtUSD = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(cents / 100);

type AdminStats = { members: number; mediaPublished: number; mediaTotal: number; givingMonthCents: number };

const ACTIVITY = [
  { t: "1 hr ago", who: "Bishop N. Barasa", what: "Uploaded a video", target: "“Walking by faith — Hebrews 11”", tone: "info" as const },
  { t: "3 hr ago", who: "Office HQ", what: "Logged donation", target: "KSh 25,000 · Water Project", tone: "success" as const },
  { t: "Yesterday", who: "Pst. Festas Soita", what: "Updated branch", target: "Mombasa · Jomvu", tone: "neutral" as const },
  { t: "2 days ago", who: "School Office", what: "Marked fees received", target: "12 pupils · Term 2", tone: "success" as const },
  { t: "3 days ago", who: "Pst. Sarah Wekesa", what: "Added member", target: "Tembelela branch", tone: "success" as const },
];

const UPCOMING = [
  { day: "Sun", date: "28 Apr", title: "HQ Sunday Worship", at: "9:00 AM · Nzoia" },
  { day: "Wed", date: "01 May", title: "Mid-week Bible Study", at: "5:30 PM · All branches" },
  { day: "Sat", date: "04 May", title: "Branch leaders' meeting", at: "10:00 AM · HQ" },
  { day: "Sun", date: "12 May", title: "Baptism service", at: "11:00 AM · Nzoia" },
];

export default function AdminOverview() {
  const { data } = useSession();
  const firstName = (data?.user?.name || "Friend").split(" ")[0];
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats(d))
      .catch(() => {});
  }, []);
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div>
      <PageHeader
        kicker="Ministry Console · Overview"
        title={`${greeting}, ${firstName}.`}
        description="A quick view of the Ministry today — branches, members, sermons published, and giving for the current month."
        actions={
          <>
            <PrimaryButton href="/admin/media" icon={ImagePlus}>
              Add to Life at JCFM
            </PrimaryButton>
            <GhostButton href="/admin/donations" icon={BanknoteIcon}>
              Log Donation
            </GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-8 px-5 py-7 md:px-8 md:py-10">
        {/* ── Stat row ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={MapPin}
            accent="navy"
            label="Branches"
            value={String(siteData.branches.length)}
            sub="HQ · 8 daughter churches"
            delta={{ value: "+1 this yr", up: true }}
          />
          <StatCard
            icon={Users}
            accent="gold"
            label="Members on Roll"
            value={stats ? String(stats.members) : "—"}
            sub="In the directory"
          />
          <StatCard
            icon={Images}
            accent="green"
            label="Life at JCFM"
            value={stats ? String(stats.mediaPublished) : "—"}
            sub={stats ? `${stats.mediaTotal} uploaded` : "Photos & videos"}
          />
          <StatCard
            icon={Banknote}
            accent="red"
            label="Giving · This Month"
            value={stats ? fmtUSD(stats.givingMonthCents) : "—"}
            sub="Online gifts (USD)"
          />
        </div>

        <SampleDataBadge note="the activity feed, calendar and per-branch attendance numbers below are still sample data." />

        {/* ── Two-col layout ── */}
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Recent activity */}
          <Card
            kicker="System Log"
            title="Recent Activity"
            action={
              <Link
                href="/admin/donations"
                className="text-[10px] font-bold uppercase tracking-tight text-slate-500 hover:text-slate-900"
              >
                View All →
              </Link>
            }
            padded={false}
          >
            <ul className="divide-y divide-slate-200">
              {ACTIVITY.map((a, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr_auto] items-start gap-4 px-5 py-3.5 transition hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-slate-50 text-slate-900">
                    <Activity size={14} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] text-slate-800">
                      <span className="font-semibold text-slate-900">{a.who}</span>{" "}
                      <span className="text-slate-500">{a.what}</span>{" "}
                      <span className="italic text-slate-900">{a.target}</span>
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-tight text-slate-400">
                      {a.t}
                    </p>
                  </div>
                  <StatusPill label={a.tone} tone={a.tone} />
                </li>
              ))}
            </ul>
          </Card>

          {/* Right column: quick actions + upcoming */}
          <div className="space-y-6">
            <Card kicker="Shortcuts" title="Quick Actions" padded={false}>
              <ul className="divide-y divide-slate-200">
                {[
                  { icon: ImagePlus, label: "Upload to Life at JCFM", href: "/admin/media", note: "Photos · Videos · Sermons" },
                  { icon: UserPlus, label: "Add a Member", href: "/admin/members", note: "Choose a branch" },
                  { icon: BanknoteIcon, label: "Record a Donation", href: "/admin/donations", note: "Tithe · Offering · Project" },
                ].map((q) => (
                  <li key={q.label}>
                    <Link
                      href={q.href}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 transition hover:bg-slate-50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center border border-slate-900 bg-slate-900 text-slate-300 transition group-hover:bg-slate-100 group-hover:text-slate-900">
                        <q.icon size={14} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-900">{q.label}</p>
                        <p className="text-[11px] text-slate-500">{q.note}</p>
                      </div>
                      <ChevronRight size={14} strokeWidth={2.25} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              kicker="Calendar"
              title="Upcoming"
              action={
                <Link
                  href="/admin/events"
                  className="text-[10px] font-bold uppercase tracking-tight text-slate-500 hover:text-slate-900"
                >
                  Full Calendar →
                </Link>
              }
              padded={false}
            >
              <ul className="divide-y divide-slate-200">
                {UPCOMING.map((e) => (
                  <li
                    key={e.title}
                    className="grid grid-cols-[auto_1fr] items-center gap-4 px-5 py-3.5"
                  >
                    <div className="flex w-12 flex-col items-center border border-slate-200 bg-slate-50 py-1.5">
                      <p className="text-[9px] font-bold uppercase tracking-tight text-slate-500">
                        {e.day}
                      </p>
                      <p className="text-base font-semibold leading-none text-slate-900">
                        {e.date.split(" ")[0]}
                      </p>
                      <p className="mt-0.5 text-[8px] uppercase tracking-tight text-slate-500">
                        {e.date.split(" ")[1]}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-slate-900">
                        {e.title}
                      </p>
                      <p className="text-[11px] text-slate-500">{e.at}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* ── Branch summary (HQ + a few) ── */}
        <Card
          kicker="Network · Snapshot"
          title="Branches at a glance"
          action={
            <Link
              href="/admin/branches"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight text-slate-500 hover:text-slate-900"
            >
              Manage All <ArrowRight size={12} strokeWidth={2.5} />
            </Link>
          }
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-white">
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-tight text-slate-900">Branch</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-tight text-slate-900">Pastor</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-tight text-slate-900">Location</th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-tight text-slate-900">Members</th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-tight text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {siteData.branches.slice(0, 5).map((b, i) => (
                  <tr
                    key={b.name}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-50`}
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-semibold text-slate-900">
                        {b.name}
                        {b.isHq && (
                          <span className="ml-2 border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-tight text-slate-600">
                            HQ
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-slate-700">{b.pastor}</td>
                    <td className="px-5 py-3.5 text-[12px] text-slate-500">{b.location}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-[13px] text-slate-900">
                      {[120, 64, 58, 41, 49, 33, 38, 27, 98][i] ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <StatusPill label="Active" tone="success" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  GraduationCap,
  Users,
  Banknote,
  ClipboardCheck,
  ExternalLink,
  PlusCircle,
  Download,
  AlertCircle,
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

const ENROLMENT_BY_LEVEL = [
  { code: "PG", level: "Playgroup & PP1/PP2", pupils: 38, capacity: 50 },
  { code: "LP", level: "Lower Primary (G1–3)", pupils: 84, capacity: 90 },
  { code: "UP", level: "Upper Primary (G4–6)", pupils: 76, capacity: 90 },
  { code: "JSS", level: "Junior School (G7–9)", pupils: 42, capacity: 60 },
];

const FEE_STATUS = [
  { level: "Playgroup / PP1 / PP2", expected: 247_000, collected: 232_500, balance: 14_500 },
  { level: "Lower Primary (G1–3)", expected: 672_000, collected: 598_400, balance: 73_600 },
  { level: "Upper Primary (G4–6)", expected: 684_000, collected: 605_500, balance: 78_500 },
  { level: "Junior School (G7–9)", expected: 441_000, collected: 388_000, balance: 53_000 },
];

const APPLICATIONS = [
  { id: "AP-046", name: "Aaliyah K.", level: "PP1", parent: "Mrs. Naliaka", date: "Today", status: "new" as const },
  { id: "AP-045", name: "Brian S.", level: "Grade 1", parent: "Mr. Wekesa", date: "Today", status: "review" as const },
  { id: "AP-044", name: "Mercy N.", level: "Grade 5", parent: "Mr. Otieno", date: "Yesterday", status: "review" as const },
  { id: "AP-043", name: "Joseph M.", level: "Grade 8 (JSS)", parent: "Mrs. Mulama", date: "2 days ago", status: "approved" as const },
  { id: "AP-042", name: "Naomi W.", level: "PP2", parent: "Mr. Simiyu", date: "3 days ago", status: "approved" as const },
];

const fmt = (n: number) => "KSh " + n.toLocaleString("en-KE");

export default function AdminSchool() {
  const totalPupils = ENROLMENT_BY_LEVEL.reduce((s, l) => s + l.pupils, 0);
  const totalCapacity = ENROLMENT_BY_LEVEL.reduce((s, l) => s + l.capacity, 0);
  const totalExpected = FEE_STATUS.reduce((s, r) => s + r.expected, 0);
  const totalCollected = FEE_STATUS.reduce((s, r) => s + r.collected, 0);
  const totalBalance = FEE_STATUS.reduce((s, r) => s + r.balance, 0);
  const collectionRate = Math.round((totalCollected / totalExpected) * 100);

  return (
    <div>
      <PageHeader
        kicker="Education Arm"
        title="Fountain of Hope Academy"
        description="Oversight of the Ministry's school — enrolment, fees collection, applications, and staff. The school's own admin tools live at the school office."
        actions={
          <>
            <PrimaryButton icon={PlusCircle}>Record Payment</PrimaryButton>
            <GhostButton icon={ExternalLink} href="/school">View School Site</GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        <SampleDataBadge note="school enrolment, fees and applications are placeholders managed by the school office." />

        {/* Identity strip */}
        <Card kicker="Profile" title="School at a Glance" padded={false}>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 px-5 py-5 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { k: "Established", v: siteData.school.founded },
              { k: "Head Teacher", v: siteData.school.head.name },
              { k: "Curriculum", v: "CBC · Kenya" },
              { k: "Type", v: "Day School" },
              { k: "Levels", v: "PG · ECDE · Primary · JSS" },
              { k: "Campus", v: siteData.school.location },
            ].map((f) => (
              <div key={f.k} className="border-b border-dotted border-slate-200 pb-2">
                <dt className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">{f.k}</dt>
                <dd className="mt-1 text-[13px] font-semibold text-slate-900">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={GraduationCap} label="Pupils on Roll" value={String(totalPupils)} sub={`of ${totalCapacity} capacity`} />
          <StatCard icon={Users} label="Teaching Staff" value="14" sub="Plus 6 support" />
          <StatCard icon={Banknote} label="Fees Collected · Term" value={fmt(totalCollected)} sub={`${collectionRate}% of expected`} delta={{ value: "+8%", up: true }} />
          <StatCard icon={ClipboardCheck} label="Outstanding Balances" value={fmt(totalBalance)} sub={`${FEE_STATUS.length} levels affected`} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Enrolment by level */}
          <Card kicker="Enrolment" title="Pupils by Level" padded={false}>
            <ul className="divide-y divide-slate-200">
              {ENROLMENT_BY_LEVEL.map((l) => {
                const pct = Math.round((l.pupils / l.capacity) * 100);
                return (
                  <li key={l.code} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center border-2 border-slate-900 bg-slate-900 text-[11px] font-bold text-white">
                          {l.code}
                        </span>
                        <div>
                          <p className="text-[14px] font-semibold text-slate-900">{l.level}</p>
                          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                            {l.pupils} pupils · {l.capacity - l.pupils} slots open
                          </p>
                        </div>
                      </div>
                      <p className="font-mono text-[12px] text-slate-600">{pct}%</p>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden border border-slate-200 bg-slate-50">
                      <div className="h-full bg-emerald-600" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Recent applications */}
          <Card
            kicker="Admissions"
            title="Recent Applications"
            action={
              <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 hover:text-slate-900">
                View All →
              </Link>
            }
            padded={false}
          >
            <ul className="divide-y divide-slate-200">
              {APPLICATIONS.map((a) => (
                <li key={a.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3.5">
                  <span className="font-mono text-[10px] text-slate-500">{a.id}</span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-slate-900">
                      {a.name} <span className="text-slate-500">· {a.level}</span>
                    </p>
                    <p className="truncate text-[11px] text-slate-500">
                      Parent: {a.parent} · {a.date}
                    </p>
                  </div>
                  <StatusPill
                    label={a.status === "new" ? "New" : a.status === "review" ? "In Review" : "Approved"}
                    tone={a.status === "new" ? "info" : a.status === "review" ? "warn" : "success"}
                  />
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Fees by level */}
        <Card
          kicker="Finance"
          title="Fees · Current Term"
          action={
            <button className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 hover:bg-slate-50">
              <Download size={11} strokeWidth={2.5} />
              Export
            </button>
          }
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-white">
                  {["Level", "Expected", "Collected", "Balance", "Rate"].map((h) => (
                    <th key={h} className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEE_STATUS.map((r, i) => {
                  const rate = Math.round((r.collected / r.expected) * 100);
                  return (
                    <tr key={r.level} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3.5 text-[14px] font-semibold text-slate-900">{r.level}</td>
                      <td className="px-5 py-3.5 font-mono text-[13px] text-slate-700">{fmt(r.expected)}</td>
                      <td className="px-5 py-3.5 font-mono text-[13px] text-emerald-700">{fmt(r.collected)}</td>
                      <td className="px-5 py-3.5 font-mono text-[13px] text-slate-500">{fmt(r.balance)}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-32 overflow-hidden border border-slate-200 bg-slate-50">
                            <div className="h-full bg-emerald-600" style={{ width: `${rate}%` }} />
                          </div>
                          <span className="font-mono text-[12px] text-slate-900">{rate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-900 bg-slate-50">
                  <td className="px-5 py-3 font-bold uppercase tracking-[0.22em] text-[10px] text-slate-900">Total</td>
                  <td className="px-5 py-3 font-mono text-[14px] font-bold text-slate-900">{fmt(totalExpected)}</td>
                  <td className="px-5 py-3 font-mono text-[14px] font-bold text-emerald-700">{fmt(totalCollected)}</td>
                  <td className="px-5 py-3 font-mono text-[14px] font-bold text-slate-500">{fmt(totalBalance)}</td>
                  <td className="px-5 py-3 font-mono text-[14px] font-bold text-slate-900">{collectionRate}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        {/* Note */}
        <div className="flex items-start gap-3 border-l-4 border-slate-200 bg-slate-50 px-5 py-4">
          <AlertCircle size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-slate-700" />
          <p className="text-[12px] leading-6 text-slate-700">
            <span className="font-bold uppercase tracking-[0.18em] text-slate-700">Note ·</span>{" "}
            Detailed pupil records, attendance, exam analysis and timetabling
            are managed inside the school office&apos;s own system. This page
            is a ministry-level summary only.
          </p>
        </div>
      </div>
    </div>
  );
}

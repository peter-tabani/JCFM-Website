"use client";

import { useState } from "react";
import {
  Banknote,
  PlusCircle,
  Download,
  Search,
  TrendingUp,
  Wallet,
  HandHeart,
  Smartphone,
  CreditCard,
  Building2,
  Receipt,
  Filter,
} from "lucide-react";
import {
  PageHeader,
  StatCard,
  Card,
  StatusPill,
  PrimaryButton,
  GhostButton,
} from "@/components/admin/ui";

type Channel = "M-Pesa" | "Bank" | "Cash" | "Card";
type Allocation = "Tithe" | "Offering" | "Project" | "Missions" | "School";

type Donation = {
  id: string;
  date: string;
  donor: string;
  channel: Channel;
  ref: string;
  allocation: Allocation;
  amount: number;
  status: "received" | "pending" | "reconciled";
};

const ROWS: Donation[] = [
  { id: "D-2614", date: "27 Apr · 11:42", donor: "Anonymous", channel: "M-Pesa", ref: "TGH7K2L9D1", allocation: "Tithe", amount: 5000, status: "received" },
  { id: "D-2613", date: "27 Apr · 10:18", donor: "Mary Wamachari", channel: "M-Pesa", ref: "TGH4P3Q2X9", allocation: "Tithe", amount: 2500, status: "received" },
  { id: "D-2612", date: "26 Apr · 17:30", donor: "Patrick Wanyama", channel: "Bank", ref: "EQ-2026-04-118", allocation: "School", amount: 25000, status: "reconciled" },
  { id: "D-2611", date: "26 Apr · 14:02", donor: "Sarah N. Wekesa", channel: "M-Pesa", ref: "TGH3D8M2A0", allocation: "Offering", amount: 1500, status: "received" },
  { id: "D-2610", date: "26 Apr · 11:55", donor: "Hosea Mabonga", channel: "Cash", ref: "OFF-Tembelela-04", allocation: "Offering", amount: 4200, status: "received" },
  { id: "D-2609", date: "25 Apr · 09:12", donor: "Kevin Wafula", channel: "M-Pesa", ref: "TGH1Z7B5C8", allocation: "Project", amount: 10000, status: "reconciled" },
  { id: "D-2608", date: "25 Apr · 08:44", donor: "Anonymous Donor (UK)", channel: "Card", ref: "STR_a1b2c3d4", allocation: "Missions", amount: 50000, status: "reconciled" },
  { id: "D-2607", date: "24 Apr · 19:20", donor: "Phoebe Mulama", channel: "M-Pesa", ref: "TGHK9V3W2Q", allocation: "Tithe", amount: 3000, status: "received" },
  { id: "D-2606", date: "24 Apr · 16:08", donor: "Faith Nekesa", channel: "M-Pesa", ref: "TGH8L0R4S6", allocation: "Tithe", amount: 2200, status: "received" },
  { id: "D-2605", date: "24 Apr · 12:50", donor: "Joseph Simiyu", channel: "Bank", ref: "KCB-04-7821", allocation: "Project", amount: 15000, status: "pending" },
  { id: "D-2604", date: "23 Apr · 18:11", donor: "Brenda C.", channel: "M-Pesa", ref: "TGH7K1L9D2", allocation: "Offering", amount: 800, status: "received" },
  { id: "D-2603", date: "23 Apr · 15:33", donor: "Festas Soita", channel: "M-Pesa", ref: "TGH3X9Y2Z4", allocation: "Tithe", amount: 6500, status: "received" },
];

const fmt = (n: number) => "KSh " + n.toLocaleString("en-KE");

export default function AdminDonations() {
  const [q, setQ] = useState("");
  const [channel, setChannel] = useState<"All" | Channel>("All");
  const [allocation, setAllocation] = useState<"All" | Allocation>("All");

  const filtered = ROWS.filter((r) => {
    if (channel !== "All" && r.channel !== channel) return false;
    if (allocation !== "All" && r.allocation !== allocation) return false;
    const t = q.toLowerCase();
    return !t || r.donor.toLowerCase().includes(t) || r.ref.toLowerCase().includes(t) || r.id.toLowerCase().includes(t);
  });

  const monthTotal = ROWS.reduce((s, r) => s + r.amount, 0);
  const tithes = ROWS.filter((r) => r.allocation === "Tithe").reduce((s, r) => s + r.amount, 0);
  const offerings = ROWS.filter((r) => r.allocation === "Offering").reduce((s, r) => s + r.amount, 0);
  const projects = ROWS.filter((r) => r.allocation === "Project" || r.allocation === "Missions").reduce((s, r) => s + r.amount, 0);

  // Simple bar values for the breakdown
  const max = Math.max(tithes, offerings, projects, 1);
  const bars = [
    { label: "Tithes", value: tithes, color: "bg-slate-900" },
    { label: "Offerings", value: offerings, color: "bg-slate-500" },
    { label: "Projects · Missions", value: projects, color: "bg-slate-300" },
  ];

  const channelIcon = (c: Channel) =>
    c === "M-Pesa" ? Smartphone : c === "Bank" ? Building2 : c === "Card" ? CreditCard : Wallet;

  return (
    <div>
      <PageHeader
        kicker="Finance · Giving"
        title="Donations Ledger"
        description="An honest, dated record of every shilling received — by channel, by allocation, by branch."
        actions={
          <>
            <PrimaryButton icon={PlusCircle}>Record Donation</PrimaryButton>
            <GhostButton icon={Download}>Export CSV</GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Banknote} label="Received · This Month" value={fmt(monthTotal)} sub="All channels combined" delta={{ value: "+12%", up: true }} />
          <StatCard icon={HandHeart} label="Tithes" value={fmt(tithes)} sub={`${ROWS.filter(r => r.allocation === "Tithe").length} entries`} />
          <StatCard icon={Receipt} label="Offerings" value={fmt(offerings)} sub="Sunday + mid-week" delta={{ value: "+4%", up: true }} />
          <StatCard icon={TrendingUp} label="Projects & Missions" value={fmt(projects)} sub="Designated giving" />
        </div>

        {/* Allocation chart */}
        <Card kicker="This Month" title="Allocation Breakdown">
          <div className="space-y-4">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="mb-1.5 flex items-center justify-between text-[12px]">
                  <span className="font-bold uppercase tracking-[0.18em] text-slate-900">{b.label}</span>
                  <span className="font-mono text-slate-600">{fmt(b.value)}</span>
                </div>
                <div className="h-3 w-full overflow-hidden border border-slate-200 bg-slate-50">
                  <div
                    className={`h-full ${b.color} transition-all`}
                    style={{ width: `${Math.max(4, (b.value / max) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-[280px]">
              <Search size={14} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by donor, ref or ID"
                className="h-10 w-full border border-slate-200 bg-white pl-9 pr-4 text-[13px] outline-none focus:border-slate-900"
              />
            </div>

            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as "All" | Channel)}
              className="h-10 border border-slate-200 bg-white px-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-900 outline-none focus:border-slate-900"
            >
              <option value="All">All Channels</option>
              <option>M-Pesa</option>
              <option>Bank</option>
              <option>Cash</option>
              <option>Card</option>
            </select>

            <select
              value={allocation}
              onChange={(e) => setAllocation(e.target.value as "All" | Allocation)}
              className="h-10 border border-slate-200 bg-white px-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-900 outline-none focus:border-slate-900"
            >
              <option value="All">All Allocations</option>
              <option>Tithe</option>
              <option>Offering</option>
              <option>Project</option>
              <option>Missions</option>
              <option>School</option>
            </select>

            <button className="flex h-10 items-center gap-2 border border-slate-200 bg-white px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 hover:bg-slate-50">
              <Filter size={12} strokeWidth={2.25} />
              More
            </button>
          </div>

          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            <span className="font-bold text-slate-900">{filtered.length}</span> entries · {fmt(filtered.reduce((s, r) => s + r.amount, 0))}
          </p>
        </div>

        {/* Ledger table */}
        <Card kicker="Ledger" title="Recent Entries" padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-white">
                  {["Ref.", "Date", "Donor", "Channel", "External Ref.", "Allocation", "Amount", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => {
                  const Icon = channelIcon(r.channel);
                  return (
                    <tr key={r.id} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-50`}>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{r.id}</td>
                      <td className="px-4 py-3 text-[12px] text-slate-600">{r.date}</td>
                      <td className="px-4 py-3 text-[14px] font-semibold text-slate-900">{r.donor}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2 border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-700">
                          <Icon size={11} strokeWidth={2} />
                          {r.channel}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{r.ref}</td>
                      <td className="px-4 py-3 text-[12px] text-slate-700">{r.allocation}</td>
                      <td className="px-4 py-3 text-right font-mono text-[14px] font-semibold text-slate-900">{fmt(r.amount)}</td>
                      <td className="px-4 py-3">
                        <StatusPill
                          label={r.status === "received" ? "Received" : r.status === "reconciled" ? "Reconciled" : "Pending"}
                          tone={r.status === "received" ? "success" : r.status === "reconciled" ? "info" : "warn"}
                        />
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-10 text-center text-[13px] italic text-slate-400">No entries match.</td></tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-900 bg-slate-50">
                  <td colSpan={6} className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900">Total</td>
                  <td className="px-4 py-3 text-right font-mono text-[15px] font-bold text-slate-900">
                    {fmt(filtered.reduce((s, r) => s + r.amount, 0))}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Banknote,
  Download,
  Search,
  Wallet,
  CreditCard,
  Receipt,
  Clock,
  Loader2,
  Info,
} from "lucide-react";
import {
  PageHeader,
  StatCard,
  Card,
  StatusPill,
  GhostButton,
} from "@/components/admin/ui";

type AdminDonation = {
  id: string;
  donorName: string | null;
  donorEmail: string | null;
  amountCents: number;
  currency: string;
  provider: "stripe" | "paypal" | "intasend";
  status: "pending" | "succeeded" | "failed";
  designationLabel: string;
  createdAt: string;
};

type Totals = { monthCents: number; lifetimeCents: number; succeededCount: number; pendingCount: number };

const fmtUSD = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents % 100 === 0 ? 0 : 2 }).format(cents / 100);
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const providerLabel = (p: string) =>
  p === "paypal" ? "PayPal" : p === "intasend" ? "M-Pesa / Card" : "Card";
const statusTone = (s: AdminDonation["status"]) => (s === "succeeded" ? "success" : s === "pending" ? "warn" : "danger");
const statusLabel = (s: AdminDonation["status"]) => (s === "succeeded" ? "Received" : s === "pending" ? "Pending" : "Failed");

export default function AdminDonations() {
  const [rows, setRows] = useState<AdminDonation[]>([]);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [provider, setProvider] = useState<"All" | "stripe" | "paypal" | "intasend">("All");
  const [status, setStatus] = useState<"All" | AdminDonation["status"]>("All");

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/donations")
      .then((r) => r.json())
      .then((d) => { setRows(d.donations ?? []); setTotals(d.totals ?? null); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        if (provider !== "All" && r.provider !== provider) return false;
        if (status !== "All" && r.status !== status) return false;
        const t = q.toLowerCase();
        return (
          !t ||
          (r.donorName ?? "").toLowerCase().includes(t) ||
          (r.donorEmail ?? "").toLowerCase().includes(t) ||
          r.designationLabel.toLowerCase().includes(t)
        );
      }),
    [rows, q, provider, status]
  );

  function exportCsv() {
    const header = ["Date", "Donor", "Email", "Designation", "Method", "Status", "Amount (USD)"];
    const lines = filtered.map((r) =>
      [fmtDate(r.createdAt), r.donorName ?? "", r.donorEmail ?? "", r.designationLabel, providerLabel(r.provider), r.status, (r.amountCents / 100).toFixed(2)]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jcfm-donations.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        kicker="Finance · Giving"
        title="Donations Ledger"
        description="Live record of every online gift received through the website."
        actions={<GhostButton icon={Download} onClick={exportCsv}>Export CSV</GhostButton>}
      />

      <div className="mx-auto max-w-[1400px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Banknote} label="Received · This Month" value={fmtUSD(totals?.monthCents ?? 0)} sub="Completed gifts" />
          <StatCard icon={Receipt} label="Lifetime Giving" value={fmtUSD(totals?.lifetimeCents ?? 0)} sub="All completed gifts" />
          <StatCard icon={CreditCard} label="Completed Gifts" value={String(totals?.succeededCount ?? 0)} sub="M-Pesa · Card · IntaSend" />
          <StatCard icon={Clock} label="Pending" value={String(totals?.pendingCount ?? 0)} sub="Awaiting confirmation" />
        </div>

        <div className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] leading-5 text-slate-600">
          <Info size={14} className="mt-0.5 shrink-0 text-slate-500" />
          Donations are recorded automatically from the online giving flow (IntaSend, M-Pesa &amp; card). Amounts are in US dollars.
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative w-full sm:w-[280px]">
            <Search size={14} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search donor, email or designation"
              className="min-h-[44px] w-full rounded-md border border-slate-200 bg-white pl-9 pr-4 text-[14px] outline-none focus:border-slate-900"
            />
          </div>
          <select value={provider} onChange={(e) => setProvider(e.target.value as typeof provider)} className="min-h-[44px] rounded-md border border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-900 outline-none focus:border-slate-900">
            <option value="All">All methods</option>
            <option value="intasend">M-Pesa / Card</option>
            <option value="paypal">PayPal</option>
            <option value="stripe">Card (legacy)</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="min-h-[44px] rounded-md border border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-900 outline-none focus:border-slate-900">
            <option value="All">All statuses</option>
            <option value="succeeded">Received</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400"><Loader2 className="animate-spin" /></div>
        ) : rows.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-10 text-center">
            <p className="text-[14px] font-semibold text-slate-900">No donations yet</p>
            <p className="mt-1 text-[13px] text-slate-500">Gifts made through the website will appear here automatically.</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {filtered.map((r) => (
                <div key={r.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-slate-900">{r.donorName || r.donorEmail || "Donor"}</p>
                      <p className="text-[12px] text-slate-500">{r.designationLabel}</p>
                    </div>
                    <p className="font-mono text-[15px] font-bold text-slate-900">{fmtUSD(r.amountCents)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                    <span>{fmtDate(r.createdAt)}</span>
                    <span>· {providerLabel(r.provider)}</span>
                    <StatusPill label={statusLabel(r.status)} tone={statusTone(r.status)} />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <Card kicker="Ledger" title="Recent Gifts" padded={false} className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-slate-900 bg-white">
                      {["Date", "Donor", "Designation", "Method", "Amount", "Status"].map((h) => (
                        <th key={h} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-900">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 text-[12px] text-slate-500">{fmtDate(r.createdAt)}</td>
                        <td className="px-4 py-3">
                          <p className="text-[13px] font-semibold text-slate-900">{r.donorName || "-"}</p>
                          <p className="text-[11px] text-slate-500">{r.donorEmail}</p>
                        </td>
                        <td className="px-4 py-3 text-[12px] text-slate-600">{r.designationLabel}</td>
                        <td className="px-4 py-3 text-[12px] text-slate-500">{providerLabel(r.provider)}</td>
                        <td className="px-4 py-3 text-right font-mono text-[14px] font-semibold text-slate-900">{fmtUSD(r.amountCents)}</td>
                        <td className="px-4 py-3"><StatusPill label={statusLabel(r.status)} tone={statusTone(r.status)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

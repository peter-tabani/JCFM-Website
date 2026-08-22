"use client";

import { useMemo, useState } from "react";
import {
  Receipt,
  Download,
  Search,
  Filter,
  HandHeart,
  CalendarHeart,
  Wallet,
  Smartphone,
  Building2,
  CreditCard,
} from "lucide-react";
import {
  PageHeader,
  Stat,
  Card,
  CategoryPill,
  StatusPill,
  PrimaryButton,
  GhostButton,
  Empty,
} from "@/components/donor/ui";
import {
  donations,
  fmtKSh,
  me,
  categories,
  type CategoryKey,
} from "@/data/donor";

const channelIcon = (c: string) =>
  c === "M-Pesa" ? Smartphone : c === "Bank" ? Building2 : c === "Card" ? CreditCard : Wallet;

export default function MyDonations() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | CategoryKey>("All");
  const [year, setYear] = useState<"All" | string>("All");

  const years = useMemo(
    () => Array.from(new Set(donations.map((d) => d.iso.slice(0, 4)))).sort().reverse(),
    []
  );

  const filtered = useMemo(() => {
    return donations.filter((d) => {
      if (cat !== "All" && d.category !== cat) return false;
      if (year !== "All" && !d.iso.startsWith(year)) return false;
      const t = q.toLowerCase();
      if (
        t &&
        !d.allocation.toLowerCase().includes(t) &&
        !d.ref.toLowerCase().includes(t) &&
        !d.id.toLowerCase().includes(t)
      )
        return false;
      return true;
    });
  }, [q, cat, year]);

  const filteredTotal = filtered.reduce((s, d) => s + d.amount, 0);

  // Group by month for the timeline view
  const grouped = useMemo(() => {
    const map = new Map<string, typeof donations>();
    filtered.forEach((d) => {
      const key = d.date.split(" ").slice(1).join(" "); // "Apr 2026"
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div>
      <PageHeader
        eyebrow="My Giving"
        title="Every gift, dated and accounted for."
        description="A clear record of every donation you've made, with categories, references and downloadable receipts."
        actions={
          <>
            <PrimaryButton icon={HandHeart} href="/donors/portal/projects">
              Give Again
            </PrimaryButton>
            <GhostButton icon={Download}>Download All Receipts</GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1280px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat icon={HandHeart} tone="navy" label="Lifetime Giving" value={fmtKSh(me.totalGiven)} sub={`Since ${me.joined}`} />
          <Stat icon={CalendarHeart} tone="emerald" label="This Year" value={fmtKSh(me.thisYear)} sub="So far" />
          <Stat icon={Receipt} tone="sky" label="Total Gifts" value={String(donations.length)} sub="Across all channels" />
          <Stat icon={Wallet} tone="rose" label="Preferred Channel" value={me.preferredChannel} sub="Most-used" />
        </div>

        {/* Toolbar */}
        <Card padded={false}>
          <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full md:w-[280px]">
                <Search size={14} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-700" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search a gift or reference"
                  className="h-10 w-full rounded-full border border-slate-200 bg-white pl-9 pr-4 text-[13px] outline-none transition focus:border-blue-500"
                />
              </div>

              <select
                value={cat}
                onChange={(e) => setCat(e.target.value as "All" | CategoryKey)}
                className="h-10 rounded-full border border-slate-200 bg-white px-4 text-[12px] font-semibold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="All">All categories</option>
                {(Object.keys(categories) as CategoryKey[]).map((k) => (
                  <option key={k} value={k}>
                    {categories[k].label}
                  </option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="h-10 rounded-full border border-slate-200 bg-white px-4 text-[12px] font-semibold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="All">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 text-[12px] text-slate-500">
              <Filter size={13} strokeWidth={2.25} className="text-slate-700" />
              <span>
                Showing <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
                of {donations.length} ·{" "}
                <span className="font-mono font-bold text-slate-900">{fmtKSh(filteredTotal)}</span>
              </span>
            </div>
          </div>
        </Card>

        {/* Timeline by month */}
        {filtered.length === 0 ? (
          <Empty
            icon={Receipt}
            title="No gifts match this filter"
            body="Try clearing the search or choosing a different category or year."
          />
        ) : (
          <div className="space-y-6">
            {grouped.map(([month, list]) => {
              const monthTotal = list.reduce((s, d) => s + d.amount, 0);
              return (
                <Card key={month} padded={false}>
                  <header className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                    <p className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                      {month}
                    </p>
                    <p className="font-mono text-[12px] font-semibold text-slate-700">
                      {fmtKSh(monthTotal)}
                    </p>
                  </header>
                  <ul className="divide-y divide-slate-100">
                    {list.map((d) => {
                      const Icon = channelIcon(d.channel);
                      return (
                        <li
                          key={d.id}
                          className="grid grid-cols-[auto_1fr_auto] items-start gap-4 px-5 py-4"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-800">
                            <Icon size={16} strokeWidth={2} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-slate-900">
                              {d.allocation}
                            </p>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <CategoryPill category={d.category} />
                              <span className="text-[11px] text-slate-700">
                                {d.date} · {d.channel}
                              </span>
                              <span className="font-mono text-[11px] text-slate-700">
                                Ref · {d.ref}
                              </span>
                              <StatusPill status={d.status} />
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-[15px] font-bold text-slate-900">
                              {fmtKSh(d.amount)}
                            </p>
                            <button className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 hover:text-blue-900">
                              <Download size={11} strokeWidth={2.25} /> Receipt
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

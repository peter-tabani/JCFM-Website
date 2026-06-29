"use client";

import { useMemo, useState } from "react";
import {
  Receipt,
  Search,
  Filter,
  HandHeart,
  CalendarHeart,
  Wallet,
  CreditCard,
  Clock,
  Loader2,
} from "lucide-react";
import {
  PageHeader,
  Stat,
  Card,
  PrimaryButton,
  Empty,
} from "@/components/donor/ui";
import {
  useMyDonations,
  fmtUSD,
  fmtDate,
  type MyDonation,
} from "@/components/donor/useMyDonations";

const providerIcon = (p: string) => (p === "paypal" ? Wallet : CreditCard);
const providerLabel = (p: string) => (p === "paypal" ? "PayPal" : "Card / Cash App");

function DonationStatusPill({ status }: { status: MyDonation["status"] }) {
  const map = {
    succeeded: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    failed: "bg-red-50 text-red-600 border-red-200",
  } as const;
  const label = { succeeded: "Received", pending: "Pending", failed: "Failed" }[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${map[status]}`}
    >
      {label}
    </span>
  );
}

export default function MyDonations() {
  const { data, loading, error } = useMyDonations();
  const [q, setQ] = useState("");
  const [year, setYear] = useState<"All" | string>("All");
  const [status, setStatus] = useState<"All" | MyDonation["status"]>("All");

  const donations = useMemo(() => data?.donations ?? [], [data]);

  const years = useMemo(
    () =>
      Array.from(
        new Set(donations.map((d) => d.createdAt.slice(0, 4)))
      ).sort().reverse(),
    [donations]
  );

  const filtered = useMemo(() => {
    return donations.filter((d) => {
      if (year !== "All" && !d.createdAt.startsWith(year)) return false;
      if (status !== "All" && d.status !== status) return false;
      const t = q.toLowerCase();
      if (
        t &&
        !d.designationLabel.toLowerCase().includes(t) &&
        !d.id.toLowerCase().includes(t)
      )
        return false;
      return true;
    });
  }, [donations, q, year, status]);

  const filteredTotal = filtered
    .filter((d) => d.status === "succeeded")
    .reduce((s, d) => s + d.amountCents, 0);

  // Group by "Mon YYYY"
  const grouped = useMemo(() => {
    const map = new Map<string, MyDonation[]>();
    filtered.forEach((d) => {
      const key = new Date(d.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const totals = data?.totals;
  const pendingCount = donations.filter((d) => d.status === "pending").length;

  return (
    <div>
      <PageHeader
        eyebrow="My Giving"
        title="Every gift, dated and accounted for."
        description="A clear record of every donation you've made through the website."
        actions={
          <PrimaryButton icon={HandHeart} href="/donate">
            Give Again
          </PrimaryButton>
        }
      />

      <div className="mx-auto max-w-[1280px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat
            icon={HandHeart}
            tone="navy"
            label="Lifetime Giving"
            value={fmtUSD(totals?.lifetimeCents ?? 0)}
            sub={data ? `Since ${fmtDate(data.memberSince)}` : ""}
          />
          <Stat
            icon={CalendarHeart}
            tone="emerald"
            label="This Year"
            value={fmtUSD(totals?.thisYearCents ?? 0)}
            sub="So far"
          />
          <Stat
            icon={Receipt}
            tone="sky"
            label="Completed Gifts"
            value={String(totals?.count ?? 0)}
            sub="Across all methods"
          />
          <Stat
            icon={Clock}
            tone="rose"
            label="Pending"
            value={String(pendingCount)}
            sub="Awaiting confirmation"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin" />
          </div>
        ) : error ? (
          <Empty
            icon={Receipt}
            title="Couldn't load your giving"
            body="Please refresh the page. If this keeps happening, contact us."
          />
        ) : donations.length === 0 ? (
          <Empty
            icon={Receipt}
            title="No donations yet"
            body="When you make your first gift, it will appear here with a full record."
            action={<PrimaryButton icon={HandHeart} href="/donate">Make your first gift</PrimaryButton>}
          />
        ) : (
          <>
            {/* Toolbar */}
            <Card padded={false}>
              <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full md:w-[280px]">
                    <Search
                      size={14}
                      strokeWidth={2}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-700"
                    />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search a gift or reference"
                      className="h-10 w-full rounded-full border border-slate-200 bg-white pl-9 pr-4 text-[13px] outline-none transition focus:border-blue-500"
                    />
                  </div>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as "All" | MyDonation["status"])
                    }
                    className="h-10 rounded-full border border-slate-200 bg-white px-4 text-[12px] font-semibold text-slate-700 outline-none focus:border-blue-500"
                  >
                    <option value="All">All statuses</option>
                    <option value="succeeded">Received</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
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
                    Showing{" "}
                    <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
                    of {donations.length} ·{" "}
                    <span className="font-mono font-bold text-slate-900">
                      {fmtUSD(filteredTotal)}
                    </span>
                  </span>
                </div>
              </div>
            </Card>

            {/* Timeline by month */}
            {filtered.length === 0 ? (
              <Empty
                icon={Receipt}
                title="No gifts match this filter"
                body="Try clearing the search or choosing a different year or status."
              />
            ) : (
              <div className="space-y-6">
                {grouped.map(([month, list]) => {
                  const monthTotal = list
                    .filter((d) => d.status === "succeeded")
                    .reduce((s, d) => s + d.amountCents, 0);
                  return (
                    <Card key={month} padded={false}>
                      <header className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                        <p className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                          {month}
                        </p>
                        <p className="font-mono text-[12px] font-semibold text-slate-700">
                          {fmtUSD(monthTotal)}
                        </p>
                      </header>
                      <ul className="divide-y divide-slate-100">
                        {list.map((d) => {
                          const Icon = providerIcon(d.provider);
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
                                  {d.designationLabel}
                                </p>
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                  <span className="text-[11px] text-slate-700">
                                    {fmtDate(d.createdAt)} · {providerLabel(d.provider)}
                                  </span>
                                  <span className="font-mono text-[11px] text-slate-500">
                                    Ref · {d.id.slice(0, 10)}
                                  </span>
                                  <DonationStatusPill status={d.status} />
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-mono text-[15px] font-bold text-slate-900">
                                  {fmtUSD(d.amountCents)}
                                </p>
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
          </>
        )}
      </div>
    </div>
  );
}

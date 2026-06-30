"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  HandHeart,
  Receipt,
  HeartHandshake,
  CalendarHeart,
  Sprout,
  FolderHeart,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  PageHeader,
  Stat,
  Card,
  CategoryPill,
  PrimaryButton,
  GhostButton,
} from "@/components/donor/ui";
import { projects, categories } from "@/data/donor";
import { useMyDonations, fmtUSD, fmtDate } from "@/components/donor/useMyDonations";

function greet() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DonorDashboard() {
  const { data: session } = useSession();
  const { data } = useMyDonations();
  const firstName = session?.user?.name?.split(" ")[0] || "Friend";

  const myDonations = data?.donations ?? [];
  const recentGifts = myDonations.slice(0, 3);

  // Projects this donor has already supported (real data) — used for a badge.
  const supportedSlugs = new Set(
    myDonations
      .filter((d) => d.status === "succeeded" && d.designation !== "general")
      .map((d) => d.designation)
  );

  // The feed: every project still open for funding.
  const feed = projects.filter((p) => p.status !== "complete");

  return (
    <div>
      <PageHeader
        eyebrow={`${greet()}, ${firstName}`}
        title="Your giving feed"
        description="Browse the projects you can support — tap Donate on any post to give."
        actions={
          <>
            <PrimaryButton href="/donate" icon={HandHeart}>
              Give Again
            </PrimaryButton>
            <GhostButton href="/donors/portal/giving" icon={Receipt}>
              My Receipts
            </GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[640px] space-y-6 px-4 py-6 sm:px-5 sm:py-8">
        {/* ── Compact stats ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon={HeartHandshake} tone="navy" label="Lifetime" value={fmtUSD(data?.totals.lifetimeCents ?? 0)} sub={data ? `Since ${fmtDate(data.memberSince)}` : ""} />
          <Stat icon={CalendarHeart} tone="emerald" label="This Year" value={fmtUSD(data?.totals.thisYearCents ?? 0)} sub="So far" />
          <Stat icon={Sprout} tone="rose" label="Gifts" value={String(data?.totals.count ?? 0)} sub="Completed" />
          <Stat icon={FolderHeart} tone="sky" label="Projects" value={String(supportedSlugs.size)} sub="Supported" />
        </div>

        {/* ── Recent gifts (compact) ── */}
        {recentGifts.length > 0 && (
          <Card eyebrow="Lately" title="Your recent gifts" padded={false}>
            <ul className="divide-y divide-white/10">
              {recentGifts.map((g) => (
                <li key={g.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-white">{g.designationLabel}</p>
                    <p className="text-[11px] text-white/45">
                      {fmtDate(g.createdAt)} · {g.provider === "paypal" ? "PayPal" : "Card / Cash App"}
                      {g.status === "pending" ? " · pending" : ""}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-[13px] font-semibold text-white">{fmtUSD(g.amountCents)}</p>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* ── Instagram-style project feed ── */}
        <div>
          <h2 className="mb-3 px-1 text-[12px] font-bold uppercase tracking-[0.18em] text-white/35">
            Projects to support
          </h2>
          <div className="space-y-5">
            {feed.map((p) => {
              const pct = Math.min(100, Math.round((p.raised / p.goal) * 100));
              const supported = supportedSlugs.has(p.id);
              const category = categories[p.category];
              return (
                <article
                  key={p.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1626] shadow-sm"
                >
                  {/* Post header — small title on top */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-800">
                      <Heart size={16} strokeWidth={2.25} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/donors/portal/projects/${p.id}`}
                        className="block truncate text-[14px] font-semibold leading-tight text-white hover:text-violet-800"
                      >
                        {p.title}
                      </Link>
                      <p className="truncate text-[11px] text-white/35">{category.label}</p>
                    </div>
                    {supported && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                        <CheckCircle2 size={11} /> You support this
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <Link href={`/donors/portal/projects/${p.id}`} className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.hero}
                      alt={p.title}
                      className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
                    />
                  </Link>

                  {/* Description below + progress + action */}
                  <div className="space-y-3 px-4 py-4">
                    <p className="text-[13.5px] leading-6 text-white/60">{p.shortDesc}</p>

                    <div>
                      <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-white/45">
                        <span>{pct}% funded</span>
                        <span>{p.donors} donors</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div className="h-full rounded-full bg-[#7c3aed]" style={{ width: `${Math.max(3, pct)}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        href={`/donate?step=amount&designation=${p.id}`}
                        className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-[#7c3aed] px-5 font-semibold text-white transition hover:bg-[#6d28d9]"
                      >
                        <Heart size={16} /> Donate
                      </Link>
                      <Link
                        href={`/donors/portal/projects/${p.id}`}
                        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-white/10 px-4 text-[13px] font-semibold text-white/70 transition hover:bg-white/[0.03]"
                      >
                        Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

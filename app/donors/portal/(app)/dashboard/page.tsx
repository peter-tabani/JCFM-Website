"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  HandHeart,
  Sprout,
  FolderHeart,
  HeartHandshake,
  Receipt,
  ArrowRight,
  Compass,
  Newspaper,
  CalendarHeart,
} from "lucide-react";
import {
  PageHeader,
  Stat,
  Card,
  CategoryPill,
  Progress,
  PrimaryButton,
  GhostButton,
  SeeMore,
} from "@/components/donor/ui";
import {
  me,
  donations,
  sponsorships,
  projects,
  stories,
  fmtKSh,
  categories,
} from "@/data/donor";

function greet() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DonorDashboard() {
  const { data: session } = useSession();
  const firstName =
    (session?.user?.name?.split(" ")[0] || me.shortName) ?? "Friend";

  // Most recent 3 gifts, top 2 sponsorships, top 3 projects this donor has touched
  const recentGifts = donations.slice(0, 3);
  const topSponsorships = sponsorships.slice(0, 2);
  const myProjects = projects
    .filter((p) => donations.some((d) => d.projectId === p.id))
    .slice(0, 3);
  const latestStory = stories[0];

  return (
    <div>
      <PageHeader
        eyebrow={`${greet()}, ${firstName}`}
        title="Welcome back to your portal."
        description="A simple, honest view of your giving — every shilling, every child, every brick. Choose where to look next."
        actions={
          <>
            <PrimaryButton href="/donors/portal/projects" icon={HandHeart}>
              Give Again
            </PrimaryButton>
            <GhostButton href="/donors/portal/giving" icon={Receipt}>
              My Receipts
            </GhostButton>
          </>
        }
      />

      <div className="mx-auto max-w-[1280px] space-y-8 px-5 py-7 md:px-8 md:py-10">
        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat
            icon={HeartHandshake}
            tone="navy"
            label="Lifetime Giving"
            value={fmtKSh(me.totalGiven)}
            sub={`Since ${me.joined}`}
          />
          <Stat
            icon={CalendarHeart}
            tone="emerald"
            label="This Year"
            value={fmtKSh(me.thisYear)}
            sub="Across all categories"
          />
          <Stat
            icon={Sprout}
            tone="rose"
            label="Active Sponsorships"
            value={String(me.activeSponsorships)}
            sub="Children & projects"
          />
          <Stat
            icon={FolderHeart}
            tone="sky"
            label="Projects Backed"
            value={String(me.projectsBacked)}
            sub="Lifetime"
          />
        </div>

        {/* ── Two column ── */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: my sponsorships + projects */}
          <div className="space-y-6">
            <Card
              eyebrow="What you are walking with"
              title="Your Sponsorships"
              action={<SeeMore href="/donors/portal/sponsorships">See all</SeeMore>}
              padded={false}
            >
              <ul className="divide-y divide-slate-100">
                {topSponsorships.map((s) => (
                  <li
                    key={s.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.photo}
                      alt={s.title}
                      className="h-14 w-14 rounded-2xl object-cover"
                    />
                    <div className="min-w-0">
                      <div className="mb-0.5 flex items-center gap-2">
                        <CategoryPill category={s.category} />
                        {s.kind === "child" && (
                          <span className="text-[10.5px] uppercase tracking-wider text-slate-400">
                            since {s.startedOn}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[14px] font-semibold text-slate-900">
                        {s.title}
                      </p>
                      <p className="truncate text-[12px] text-slate-500">
                        {s.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      {s.monthly ? (
                        <p className="font-mono text-[13px] font-semibold text-slate-900">
                          {fmtKSh(s.monthly)}
                          <span className="text-[11px] font-normal text-slate-500"> /mo</span>
                        </p>
                      ) : (
                        <p className="font-mono text-[13px] font-semibold text-slate-900">
                          {fmtKSh(s.totalGivenToDate)}
                        </p>
                      )}
                      <Link
                        href={`/donors/portal/sponsorships`}
                        className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 hover:text-blue-900"
                      >
                        View <ArrowRight size={11} strokeWidth={2.25} />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              eyebrow="What your gifts are building"
              title="Projects You've Helped"
              action={<SeeMore href="/donors/portal/projects">All projects</SeeMore>}
              padded={false}
            >
              <ul className="divide-y divide-slate-100">
                {myProjects.map((p) => (
                  <li key={p.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <CategoryPill category={p.category} />
                        <Link
                          href={`/donors/portal/projects/${p.id}`}
                          className="mt-1.5 block text-[15px] font-semibold text-slate-900 hover:text-blue-800"
                        >
                          {p.title}
                        </Link>
                        <p className="mt-0.5 text-[12px] text-slate-500">
                          {p.shortDesc}
                        </p>
                      </div>
                      <Link
                        href={`/donors/portal/projects/${p.id}`}
                        className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-400 transition hover:border-blue-200 hover:text-blue-800"
                      >
                        <ArrowRight size={14} strokeWidth={2.25} />
                      </Link>
                    </div>
                    <div className="mt-3">
                      <Progress value={p.raised} goal={p.goal} />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right: recent gifts + latest story */}
          <div className="space-y-6">
            <Card
              eyebrow="Lately"
              title="Your Recent Gifts"
              action={<SeeMore href="/donors/portal/giving">All gifts</SeeMore>}
              padded={false}
            >
              <ul className="divide-y divide-slate-100">
                {recentGifts.map((g) => (
                  <li key={g.id} className="px-5 py-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-slate-900">
                          {g.allocation}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {g.date} · {g.channel}
                        </p>
                      </div>
                      <p className="shrink-0 font-mono text-[13px] font-semibold text-slate-900">
                        {fmtKSh(g.amount)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {latestStory && (
              <Card
                eyebrow="Latest Update"
                title="Stories & Progress"
                action={<SeeMore href="/donors/portal/stories">All stories</SeeMore>}
                padded={false}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={latestStory.photo}
                  alt={latestStory.title}
                  className="h-44 w-full object-cover"
                />
                <div className="space-y-2 p-5">
                  <div className="flex items-center gap-2">
                    <CategoryPill category={latestStory.category} />
                    <span className="text-[11px] text-slate-400">
                      {latestStory.date}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-semibold leading-snug text-slate-900">
                    {latestStory.title}
                  </h3>
                  <p className="text-[12.5px] leading-6 text-slate-600">
                    {latestStory.body}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* ── Quick browse by category ── */}
        <Card eyebrow="Find a place to help" title="Browse by Category">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {(Object.keys(categories) as (keyof typeof categories)[]).map((key) => {
              const c = categories[key];
              return (
                <Link
                  key={key}
                  href={`/donors/portal/projects?cat=${key}`}
                  className={`group rounded-2xl border p-4 transition hover:-translate-y-0.5 ${c.tone}`}
                >
                  <p className="text-[13px] font-bold leading-snug">{c.label}</p>
                  <p className="mt-1 text-[11.5px] leading-5 opacity-75">
                    {c.tagline}
                  </p>
                  <ArrowRight
                    size={14}
                    strokeWidth={2.25}
                    className="mt-3 transition group-hover:translate-x-0.5"
                  />
                </Link>
              );
            })}
          </div>
        </Card>

        {/* ── Vision footer ── */}
        <div className="grid gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-800">
            <Compass size={20} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[13px] font-bold text-blue-950">
              Curious what we hope to build next?
            </p>
            <p className="mt-1 text-[12.5px] text-blue-900/80">
              Classrooms, playground improvements, more children to sponsor — the
              things still on our hearts.
            </p>
          </div>
          <Link
            href="/donors/portal/vision"
            className="inline-flex items-center gap-2 self-start rounded-full bg-blue-800 px-4 py-2 text-[12px] font-semibold text-white hover:bg-blue-900 sm:self-center"
          >
            See the vision <Newspaper size={13} strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </div>
  );
}

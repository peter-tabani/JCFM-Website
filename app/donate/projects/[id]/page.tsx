import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Users, CalendarDays, Heart } from "lucide-react";
import DonateChrome from "@/components/donate/DonateChrome";
import { getProject, categories } from "@/data/donor";

const STATUS_LABEL: Record<string, string> = {
  active: "Just Starting",
  "in-progress": "In Progress",
  "near-complete": "Almost There",
  complete: "Complete",
};

export default async function PublicProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const pct = Math.min(
    100,
    Math.round((project.raised / project.goal) * 100)
  );
  const category = categories[project.category];
  const fundable = project.status !== "complete";

  return (
    <DonateChrome backHref="/donate" backLabel="All projects">
      <div className="-mx-4 sm:mx-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.hero}
          alt={project.title}
          className="h-56 w-full object-cover sm:rounded-2xl"
        />
      </div>

      <div className="mt-6">
        <span
          className={`inline-block rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${category.tone}`}
        >
          {category.label}
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {project.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/45">
          <span className="inline-flex items-center gap-1.5">
            <Users size={15} /> {project.beneficiaries}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={15} /> Since {project.startedOn}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {STATUS_LABEL[project.status] ?? project.status}
          </span>
        </div>

        {/* Currency-agnostic progress (donations are charged in USD) */}
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-white/45">
            <span>{pct}% funded</span>
            <span>{project.donors} donors so far</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-[#7c3aed]"
              style={{ width: `${Math.max(3, pct)}%` }}
            />
          </div>
        </div>

        <p className="mt-6 text-[15px] leading-8 text-white/70">
          {project.longDesc}
        </p>

        {/* Milestones */}
        {project.milestones?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/35">
              Progress so far
            </h2>
            <ol className="mt-4 space-y-4 border-l-2 border-white/10 pl-5">
              {project.milestones.map((m, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[27px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#7c3aed] bg-[#0f1626]" />
                  <p className="text-xs font-semibold text-[#7c3aed]">{m.date}</p>
                  <p className="font-semibold text-white">{m.title}</p>
                  <p className="mt-0.5 text-sm leading-6 text-white/60">{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Sticky-ish CTA */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f1626] p-5">
        {fundable ? (
          <>
            <Link
              href={`/donate?step=amount&designation=${project.id}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7c3aed] py-4 font-semibold text-white transition hover:bg-[#6d28d9]"
            >
              <Heart size={18} /> Support this project
            </Link>
            <Link
              href="/donate?step=cause"
              className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-white/45 transition hover:text-white"
            >
              <ArrowLeft size={15} /> Choose a different cause
            </Link>
          </>
        ) : (
          <div className="text-center">
            <p className="text-sm font-semibold text-white">
              This project is fully funded — thank you!
            </p>
            <Link
              href="/donate?step=cause"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
            >
              Support another cause <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </DonateChrome>
  );
}

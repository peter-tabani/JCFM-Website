import { MapPin, Crown } from "lucide-react";
import { siteData } from "@/data/site";
import ReadMore from "@/components/ui/ReadMore";

type Branch = (typeof siteData.branches)[number];

function BranchRow({ b, num, isHq, striped }: { b: Branch; num: string; isHq: boolean; striped: boolean }) {
  return (
    <tr className={isHq ? "bg-[#151f34]" : striped ? "bg-[#0f172a]" : "bg-[#101827]"}>
      <td className="border-b border-white/10 px-5 py-5 align-top font-serif text-base font-semibold text-[#fbbf24]">
        {num}
      </td>
      <td className="border-b border-white/10 px-5 py-5 align-top">
        <div className="flex items-center gap-2">
          <p className="font-serif text-base font-semibold uppercase tracking-wide text-white">
            {b.name}
          </p>
          {isHq && (
            <span className="inline-flex items-center gap-1 border border-[#7c3aed] bg-[#7c3aed]/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd]">
              <Crown size={10} strokeWidth={2.5} />
              HQ
            </span>
          )}
        </div>
      </td>
      <td className="border-b border-white/10 px-5 py-5 align-top text-[14px] text-white/68">
        {b.pastor}
      </td>
      <td className="border-b border-white/10 px-5 py-5 align-top">
        <span className="inline-flex items-center gap-2 text-[14px] text-white/68">
          <MapPin size={13} className="text-[#15803d]" strokeWidth={2} />
          {b.location}
        </span>
      </td>
    </tr>
  );
}

function BranchCard({ b, num, isHq }: { b: Branch; num: string; isHq: boolean }) {
  return (
    <article className={`relative flex gap-4 border ${isHq ? "border-[#7c3aed]/70 bg-[#151f34]" : "border-white/10 bg-[#0f172a]"} p-4`}>
      <div className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center border ${isHq ? "border-[#7c3aed] bg-[#7c3aed] text-white" : "border-[#4c1d95] bg-[#4c1d95] text-white"}`}>
        <span className="font-serif text-base font-semibold leading-none">{num}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif text-base font-semibold uppercase leading-tight tracking-wide text-white">
            {b.name}
          </h4>
          {isHq && (
            <span className="inline-flex shrink-0 items-center gap-1 border border-[#7c3aed] bg-[#7c3aed]/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd]">
              <Crown size={9} strokeWidth={2.5} />
              HQ
            </span>
          )}
        </div>
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] text-white/62">
          <MapPin size={11} className="text-[#15803d]" strokeWidth={2} />
          {b.location}
        </p>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">
          Led by · <span className="text-[#c4b5fd]">{b.pastor}</span>
        </p>
      </div>
    </article>
  );
}

export default function Branches() {
  const branches = siteData.branches;
  const initial = branches.slice(0, 3);
  const rest = branches.slice(3);

  return (
    <section id="branches" className="border-b border-white/10 bg-[#080b16]">

      {/* Visual header banner — world map highlighting Kenya */}
      <div className="relative w-full overflow-hidden border-b border-white/10 bg-[#0b1322]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 py-8 text-center md:py-10">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 bg-[#86efac] md:w-14" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#86efac]">
              Our Network
            </p>
            <span className="h-[1px] w-10 bg-[#86efac] md:w-14" />
          </div>

          {/* Map with Kenya marker */}
          <div className="relative mt-5">
            <img
              src="/images/world-map.svg"
              alt="JCFM branches highlighted on Kenya, East Africa"
              className="h-[140px] w-auto opacity-95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] md:h-[200px]"
            />
            {/* Pulsing pin over Kenya */}
            <span className="absolute" style={{ left: "58.4%", top: "54.7%" }}>
              <span className="relative flex -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-[#22c55e]/70" />
                <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#86efac] ring-2 ring-[#15803d]" />
              </span>
            </span>
          </div>

          <h2 className="mt-5 font-serif text-[22px] font-semibold uppercase leading-tight tracking-[0.06em] text-white md:text-3xl">
            9 Branches Across Kenya
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-16">
        <div />

        {/* Desktop: full table */}
        <div className="hidden overflow-x-auto border border-white/10 bg-[#0f172a] shadow-[0_22px_55px_rgba(0,0,0,0.35)] md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#4c1d95] text-white">
                <th className="border-b border-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em]">№</th>
                <th className="border-b border-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em]">Branch</th>
                <th className="border-b border-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em]">Lead Pastor</th>
                <th className="border-b border-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em]">Location</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b, i) => (
                <BranchRow
                  key={b.name}
                  b={b}
                  num={String(i + 1).padStart(2, "0")}
                  isHq={!!b.isHq}
                  striped={i % 2 === 0}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: card list with progressive disclosure */}
        <div className="md:hidden">
          <ReadMore
            showAllFrom="md"
            tone="navy"
            openLabel={`Show All ${branches.length} Branches`}
            closeLabel="Show Less"
            more={
              <div className="mt-3 flex flex-col gap-3">
                {rest.map((b, i) => (
                  <BranchCard
                    key={b.name}
                    b={b}
                    num={String(i + 4).padStart(2, "0")}
                    isHq={!!b.isHq}
                  />
                ))}
              </div>
            }
          >
            <div className="flex flex-col gap-3">
              {initial.map((b, i) => (
                <BranchCard
                  key={b.name}
                  b={b}
                  num={String(i + 1).padStart(2, "0")}
                  isHq={!!b.isHq}
                />
              ))}
            </div>
          </ReadMore>
        </div>
      </div>
    </section>
  );
}

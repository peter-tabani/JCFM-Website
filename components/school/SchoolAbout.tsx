import { siteData } from "@/data/site";
import ReadMore from "@/components/ui/ReadMore";

export default function SchoolAbout() {
  const s = siteData.school;

  const FACTS = [
    { k: "Established", v: s.founded },
    { k: "Head Teacher", v: s.head.name },
    { k: "Campus", v: s.location },
    { k: "School Type", v: s.type },
    { k: "Levels Offered", v: s.levels },
    { k: "Sponsoring Body", v: s.parent },
  ];

  return (
    <section id="about" className="bg-white">
      {/* ── Masthead ── */}
      <div className="border-b border-[#d4d0c4] bg-[#f8f6ee]">
        <div className="mx-auto max-w-[1100px] px-5 pt-10 pb-10 sm:px-6 sm:pt-14 md:pt-20 md:pb-12">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
              About the Academy
            </p>
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
          </div>

          <div className="mt-8 text-center md:mt-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#a8201a]">
              Document № FHA / ABT / 2014
            </p>
            <h2 className="mt-3 font-serif text-[28px] font-semibold uppercase leading-[1.05] tracking-[0.03em] text-[#0b2545] sm:text-4xl md:text-5xl">
              A school where faith
              <br className="hidden sm:block" />
              <span className="text-[#15803d]"> and learning meet.</span>
            </h2>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <span className="h-[2px] w-10 bg-[#c9a961] md:w-12" />
              <p className="font-serif text-sm italic text-slate-600">{s.motto}</p>
              <span className="h-[2px] w-10 bg-[#c9a961] md:w-12" />
            </div>
          </div>

          <div className="mt-8 border-t-2 border-b border-[#0b2545] py-1 md:mt-10" />

          {/* Factsheet */}
          <dl className="grid grid-cols-1 gap-x-10 gap-y-3 px-2 py-6 md:grid-cols-2">
            {FACTS.map((f) => (
              <div
                key={f.k}
                className="flex items-baseline justify-between gap-4 border-b border-dotted border-[#0b2545]/30 py-2"
              >
                <dt className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0b2545]">
                  {f.k}
                </dt>
                <dd className="text-right font-serif text-[14px] text-slate-700 md:text-[15px]">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-b border-t-2 border-[#0b2545] py-1" />

          {/* Intro paragraphs (collapsed on mobile) */}
          <ReadMore
            showAllFrom="md"
            tone="navy"
            openLabel="Read the Full Story"
            closeLabel="Show Less"
            className="mt-8 md:mt-10"
            more={
              <div className="space-y-4 text-[15px] leading-7 text-slate-800 md:space-y-5 md:text-[15px] md:leading-8">
                <p className="hidden md:block">
                  Fountain of Hope Academy was founded in {s.founded} as the
                  education arm of {s.parent}. What began as a small classroom
                  block on the church compound in Nzoia, Bungoma, has grown
                  into a full {s.levels.toLowerCase()} institution serving the
                  surrounding community and welcoming day learners from across
                  the county.
                </p>
                <p>
                  We exist for one reason: to walk with each child &mdash;
                  intellectually, spiritually and socially &mdash; through the
                  most formative years of their life. We follow the Kenya
                  Competency-Based Curriculum (CBC) faithfully, with strong
                  emphasis on literacy, numeracy, ICT and life skills, and we
                  weave the Word of God through every subject and every day.
                </p>
                <p>
                  Our learners are known by name. Our teachers are not just
                  trained, they are called. Our fees are kept honest. And our
                  doors remain open to any family looking for a place where
                  their child will be loved, taught well, and raised in the
                  fear of the Lord.
                </p>
              </div>
            }
          >
            <p className="text-[15px] leading-7 text-slate-800 md:hidden">
              Founded in {s.founded} as the education arm of {s.parent},
              Fountain of Hope Academy serves learners on the JCFM compound in
              Nzoia &mdash; following the Kenya CBC curriculum within a deeply
              Christian environment.
            </p>
          </ReadMore>
        </div>
      </div>
    </section>
  );
}

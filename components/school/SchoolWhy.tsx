import { siteData } from "@/data/site";

export default function SchoolWhy() {
  const s = siteData.school;

  return (
    <section id="why" className="bg-[#0b2545] text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-[#15803d] md:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
              Why Fountain of Hope
            </p>
            <span className="h-[1px] w-12 bg-[#15803d] md:w-16" />
          </div>
          <h2 className="mt-5 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] sm:text-3xl md:text-5xl">
            Six Reasons Parents Choose Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-white/70 md:mt-5 md:text-[15px] md:leading-8">
            We are not the biggest school in the county, but we believe
            we are one of the most caring, the most honest, and the most
            faithful to the calling.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 gap-0 border border-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {s.pillars.map((p, i) => (
            <article
              key={p.n}
              className={`group relative flex flex-col gap-4 p-6 transition hover:bg-white/5 sm:p-7 md:p-8 ${
                i % 2 === 1 ? "sm:border-l sm:border-white/15" : ""
              } ${i % 3 !== 0 ? "lg:border-l lg:border-white/15" : ""} ${i % 3 === 0 ? "lg:border-l-0" : ""} ${
                i < (s.pillars.length - (s.pillars.length % 3 || 3)) ? "lg:border-b lg:border-white/15" : ""
              } ${i < s.pillars.length - 2 ? "border-b border-white/15 sm:[&:nth-last-child(-n+2)]:border-b-0" : "border-b border-white/15 sm:border-b-0"}`}
            >
              <div className="flex items-center gap-4">
                <span className="font-serif text-3xl font-semibold text-[#15803d]">
                  {p.n}
                </span>
                <span className="h-[1px] flex-1 bg-white/15" />
              </div>
              <h3 className="font-serif text-xl font-semibold uppercase leading-tight tracking-wide text-white md:text-[22px]">
                {p.title}
              </h3>
              <p
                className="text-[13px] leading-7 text-white/70 md:text-[14px] md:leading-7"
                dangerouslySetInnerHTML={{ __html: p.desc }}
              />
            </article>
          ))}
        </div>

        {/* Footer banner */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border border-[#15803d] bg-[#15803d]/10 p-5 text-center md:mt-14 md:flex-row md:gap-6 md:p-8 md:text-left">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
              Visit the Campus
            </p>
            <p className="mt-2 font-serif text-lg font-semibold leading-snug md:text-xl">
              The best way to understand Fountain of Hope is to walk through
              the gate. Come and see.
            </p>
          </div>
          <a
            href={`mailto:${s.contacts.email}`}
            className="shrink-0 bg-[#15803d] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#106030]"
          >
            Email to Book a Visit
          </a>
        </div>
      </div>
    </section>
  );
}

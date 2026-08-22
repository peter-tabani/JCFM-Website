const METRICS = [
  { n: "2013", l: "The year it all began", sub: "Founded in Nzoia, Bungoma" },
  { n: "9", l: "Branches across Kenya", sub: "From Nzoia HQ to Jomvu, Mombasa" },
  { n: "12+", l: "Years of faithful service", sub: "Under Bishop Nelson Barasa" },
  { n: "1", l: "Clean-water shallow well", sub: "Serving HQ, school & neighbours" },
  { n: "500+", l: "Worshippers every Sunday", sub: "Across all branches combined" },
  { n: "5", l: "Counties touched", sub: "Bungoma, Trans Nzoia, Mombasa & more" },
];

export default function Impact() {
  return (
    <section className="bg-[#4c1d95] text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">

        {/* Header — stated as fact, not boast */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-16 bg-[#c4b5fd]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c4b5fd]">
              The Quiet Record
            </p>
            <span className="h-[1px] w-16 bg-[#c4b5fd]" />
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.02em] md:text-5xl">
            Twelve Years.
            <br />
            <span className="text-[#86efac]">A Steady Hand.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-white/70">
            We have never been loud about our work. We have simply shown up —
            every Sunday, every school day, every harvest season — for over a
            decade. These numbers are not targets. They are testimony.
          </p>
        </div>

        {/* Metric grid — gazette ledger style */}
        <div className="grid grid-cols-1 divide-y divide-white/15 border border-white/20 md:grid-cols-3 md:divide-y-0">
          {METRICS.slice(0, 3).map((m, i) => (
            <div
              key={m.l}
              className={`flex flex-col items-start p-8 md:p-10 ${
                i > 0 ? "md:border-l md:border-white/15" : ""
              }`}
            >
              <p className="font-serif text-5xl font-semibold leading-none text-white md:text-6xl">
                {m.n}
              </p>
              <div className="mt-5 h-[2px] w-10 bg-[#15803d]" />
              <p className="mt-4 font-serif text-lg font-semibold uppercase tracking-wide text-white">
                {m.l}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-white/55">
                {m.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 divide-y divide-white/15 border-x border-b border-white/20 md:grid-cols-3 md:divide-y-0">
          {METRICS.slice(3).map((m, i) => (
            <div
              key={m.l}
              className={`flex flex-col items-start p-8 md:p-10 ${
                i > 0 ? "md:border-l md:border-white/15" : ""
              }`}
            >
              <p className="font-serif text-5xl font-semibold leading-none text-white md:text-6xl">
                {m.n}
              </p>
              <div className="mt-5 h-[2px] w-10 bg-[#15803d]" />
              <p className="mt-4 font-serif text-lg font-semibold uppercase tracking-wide text-white">
                {m.l}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-white/55">
                {m.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Footnote — attribution, no CTA */}
        <p className="mt-10 text-center font-serif text-sm italic text-white/55">
          Figures verified internally by the Ministry Council · Updated {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}

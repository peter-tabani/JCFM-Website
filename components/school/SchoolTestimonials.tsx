import { Quote } from "lucide-react";
import { siteData } from "@/data/site";

const ACCENTS = ["navy", "gold", "green"] as const;
const STYLES: Record<(typeof ACCENTS)[number], { bar: string; eyebrow: string; frame: string }> = {
  navy: { bar: "bg-[#0b2545]", eyebrow: "text-[#0b2545]", frame: "border-[#0b2545]" },
  gold: { bar: "bg-[#c9a961]", eyebrow: "text-[#0b2545]", frame: "border-[#c9a961]" },
  green: { bar: "bg-[#15803d]", eyebrow: "text-[#15803d]", frame: "border-[#15803d]" },
};

export default function SchoolTestimonials() {
  const s = siteData.school;

  return (
    <section className="border-b border-[#d4d0c4] bg-[#f8f6ee]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
              Voices from the Family
            </p>
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
          </div>
          <h2 className="mt-5 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] text-[#0b2545] sm:text-3xl md:text-5xl">
            What Parents &amp; Pupils Say
          </h2>
        </div>

        {/* Mobile: swipe carousel */}
        <div className="md:hidden">
          <div className="flex items-center justify-between border-b border-[#d4d0c4] pb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0b2545]">
              {s.testimonials.length} Voices
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Swipe →
            </p>
          </div>
          <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {s.testimonials.map((t, i) => {
              const a = STYLES[ACCENTS[i % ACCENTS.length]];
              return (
                <article
                  key={t.name}
                  className={`flex w-[88vw] shrink-0 snap-center flex-col border-[3px] ${a.frame} bg-white p-6`}
                >
                  <Quote
                    size={36}
                    strokeWidth={1}
                    className="text-[#c9a961]/50"
                    fill="currentColor"
                  />
                  <p className="mt-3 flex-1 font-serif text-[16px] leading-[1.7] text-slate-800">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className={`mt-5 h-[2px] w-12 ${a.bar}`} />
                  <p className="mt-4 font-serif text-base font-semibold text-[#0b2545]">
                    {t.name}
                  </p>
                  <p className={`mt-1 text-[10px] font-bold uppercase tracking-[0.22em] ${a.eyebrow}`}>
                    {t.role}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden grid-cols-3 gap-6 md:grid lg:gap-8">
          {s.testimonials.map((t, i) => {
            const a = STYLES[ACCENTS[i % ACCENTS.length]];
            return (
              <article
                key={t.name}
                className={`flex flex-col border-[3px] ${a.frame} bg-white p-7`}
              >
                <Quote
                  size={44}
                  strokeWidth={1}
                  className="text-[#c9a961]/50"
                  fill="currentColor"
                />
                <p className="mt-4 flex-1 font-serif text-[18px] leading-[1.7] text-slate-800">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className={`mt-6 h-[2px] w-12 ${a.bar}`} />
                <p className="mt-4 font-serif text-lg font-semibold text-[#0b2545]">
                  {t.name}
                </p>
                <p className={`mt-1 text-[10px] font-bold uppercase tracking-[0.22em] ${a.eyebrow}`}>
                  {t.role}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

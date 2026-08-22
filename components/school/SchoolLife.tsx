import { Clock, Trophy } from "lucide-react";
import { siteData } from "@/data/site";

export default function SchoolLife() {
  const s = siteData.school;

  return (
    <section id="life" className="border-b border-[#d4d0c4] bg-white">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
              School Life
            </p>
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
          </div>
          <h2 className="mt-5 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] text-[#0b2545] sm:text-3xl md:text-5xl">
            A Day at Fountain of Hope
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-slate-600 md:mt-5 md:text-[15px] md:leading-8">
            Our days are unhurried but full &mdash; balanced between learning,
            worship, play, and rest. Below is the rhythm a typical learner
            follows from sunrise to lights out.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          {/* Daily schedule timetable */}
          <div>
            <div className="mb-5 flex items-center gap-3 md:mb-6">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-[#15803d] bg-[#15803d] text-white">
                <Clock size={18} strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-xl font-semibold uppercase tracking-wide text-[#0b2545] md:text-2xl">
                Daily Routine
              </h3>
            </div>

            <div className="overflow-hidden border border-[#0b2545]">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#0b2545] text-white">
                    <th className="border-b border-[#0b2545] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] md:px-5">
                      Time
                    </th>
                    <th className="border-b border-[#0b2545] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] md:px-5">
                      Activity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {s.schedule.map((row, i) => (
                    <tr
                      key={row.time}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#f8f6ee]"}
                    >
                      <td className="border-b border-[#d4d0c4] px-4 py-3 align-top md:px-5 md:py-4">
                        <p className="font-serif text-sm font-semibold text-[#15803d] md:text-base">
                          {row.time}
                        </p>
                      </td>
                      <td className="border-b border-[#d4d0c4] px-4 py-3 align-top text-[13px] text-slate-700 md:px-5 md:py-4 md:text-[14px]">
                        {row.activity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Co-curricular */}
          <div>
            <div className="mb-5 flex items-center gap-3 md:mb-6">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-[#c9a961] bg-[#c9a961] text-[#0b2545]">
                <Trophy size={18} strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-xl font-semibold uppercase tracking-wide text-[#0b2545] md:text-2xl">
                Clubs & Co-Curricular
              </h3>
            </div>

            <p className="text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
              Beyond the timetable, every learner is encouraged to discover
              and grow a talent. Our co-curricular programme runs every
              afternoon and on Saturdays.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-0 border border-[#d4d0c4]">
              {s.coCurricular.map((c, i) => (
                <div
                  key={c}
                  className={`flex items-center gap-3 p-4 ${
                    i % 2 === 1 ? "border-l border-[#d4d0c4]" : ""
                  } ${i < s.coCurricular.length - 2 ? "border-b border-[#d4d0c4]" : ""}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#15803d] bg-[#15803d]/10 font-serif text-[11px] font-bold text-[#15803d]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[13px] font-semibold text-[#0b2545] md:text-[14px]">
                    {c}
                  </p>
                </div>
              ))}
            </div>

            {/* Calendar mini-strip */}
            <div className="mt-7 border-2 border-[#0b2545] bg-[#f8f6ee] p-5 md:mt-8 md:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#a8201a]">
                Academic Calendar
              </p>
              <div className="mt-4 space-y-3">
                {s.calendar.map((t) => (
                  <div
                    key={t.term}
                    className="flex items-baseline justify-between gap-3 border-b border-dotted border-[#0b2545]/30 pb-2"
                  >
                    <p className="font-serif text-sm font-semibold text-[#0b2545]">
                      {t.term}
                      <span className="ml-2 text-[11px] font-normal italic text-slate-500">
                        {t.note}
                      </span>
                    </p>
                    <p className="text-[12px] font-semibold text-[#15803d]">
                      {t.dates}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

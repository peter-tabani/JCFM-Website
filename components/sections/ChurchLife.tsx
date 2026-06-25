import { Calendar } from "lucide-react";

const SCHEDULE = [
  { day: "Sunday", time: "9:00 AM – 1:00 PM", activity: "Worship Service · Sunday School", primary: true },
  { day: "Wednesday", time: "5:30 PM – 7:00 PM", activity: "Mid-Week Bible Study & Prayer" },
  { day: "Friday", time: "5:00 PM – 7:00 PM", activity: "Youth Fellowship" },
  { day: "Saturday", time: "9:00 AM – 12:00 PM", activity: "Women's Fellowship · Outreach" },
];

export default function ChurchLife() {
  return (
    <section id="church" className="bg-[#080b16]">

      {/* ── Weekly Schedule ── */}
      <div className="border-b border-white/10 bg-[#080b16]">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#dc2626]">
                Order of Worship
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold uppercase tracking-wide text-white md:text-3xl">
                Weekly Schedule
              </h3>
            </div>
            <Calendar size={28} className="hidden text-[#c4b5fd] md:block" strokeWidth={1.5} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-white/10 bg-[#0f172a]">
              <thead>
                <tr className="bg-[#4c1d95] text-white">
                  <th className="border-b border-white/10 px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.22em]">
                    Day
                  </th>
                  <th className="border-b border-white/10 px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.22em]">
                    Time
                  </th>
                  <th className="border-b border-white/10 px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.22em]">
                    Activity
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row, i) => (
                  <tr key={row.day} className={row.primary ? "bg-[#151f34]" : i % 2 === 0 ? "bg-[#0f172a]" : "bg-[#101827]"}>
                    <td className="border-b border-white/10 px-5 py-4 align-top">
                      <p className="font-serif text-base font-semibold text-white">
                        {row.day}
                      </p>
                      {row.primary && (
                        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#dc2626]">
                          Main Service
                        </p>
                      )}
                    </td>
                    <td className="border-b border-white/10 px-5 py-4 align-top text-[14px] text-white/68">
                      {row.time}
                    </td>
                    <td className="border-b border-white/10 px-5 py-4 align-top text-[14px] text-white/68">
                      {row.activity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

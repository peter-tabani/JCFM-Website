import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Users,
  HandHeart,
  BookOpen,
  Music,
  Baby,
  Play,
  MapPin,
} from "lucide-react";
import { siteData } from "@/data/site";
import ReadMore from "@/components/ui/ReadMore";

const SCHEDULE = [
  { day: "Sunday", time: "9:00 AM – 1:00 PM", activity: "Worship Service · Sunday School", primary: true },
  { day: "Wednesday", time: "5:30 PM – 7:00 PM", activity: "Mid-Week Bible Study & Prayer" },
  { day: "Friday", time: "5:00 PM – 7:00 PM", activity: "Youth Fellowship" },
  { day: "Saturday", time: "9:00 AM – 12:00 PM", activity: "Women's Fellowship · Outreach" },
];

const MINISTRIES = [
  { icon: Users, name: "Youth Ministry", lead: "Youth Pastor", desc: "Discipleship, mentorship and creative arts for teens and young adults across all branches." },
  { icon: Baby, name: "Children's Ministry", lead: "Children's Coordinator", desc: "Sunday School and Bible-based programmes that nurture young hearts in every congregation." },
  { icon: HandHeart, name: "Women's Fellowship", lead: siteData.contacts.coordinator.name, desc: "Sisterhood, prayer, marriage support and community outreach — led from the HQ in Nzoia." },
  { icon: Music, name: "Worship & Music", lead: "Worship Team", desc: "Choir, praise team and instrumental ministry leading every Sunday service." },
  { icon: BookOpen, name: "Bible Study", lead: "Pastoral Team", desc: "Mid-week teaching and small-group fellowships in the HQ and every branch." },
  { icon: HandHeart, name: "Outreach & Evangelism", lead: "Outreach Team", desc: "Visiting the sick, supporting families, and carrying the Good News to new communities." },
];

export default function ChurchLife() {
  return (
    <section id="church" className="bg-[#080b16]">

      {/* ── Section Header ── */}
      <div className="border-b border-white/10 bg-[#0f172a]">
        <div className="grid lg:grid-cols-2 lg:min-h-[360px]">
          {/* Left: text */}
          <div className="mx-auto flex w-full max-w-2xl flex-col justify-center px-5 py-10 sm:px-10 md:py-16">
            <h2 className="mt-4 font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.02em] text-white md:text-5xl">
              Church Life at JCFM
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-white/66">
              Whether at the headquarters in Nzoia or at any of our
              branches across Kenya, every congregation keeps the same
              weekly rhythm of worship, the Word, and warm fellowship.
              You are welcome at any of them.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#7c3aed] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6d28d9]"
            >
              <MapPin size={16} strokeWidth={2} className="text-white" />
              Leardership at JCFM
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
          {/* Right: image */}
          <div
            className="hidden lg:block bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b671e4668?w=900&q=80')" }}
          />
        </div>
      </div>

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

      {/* ── Ministries Grid ── */}
      <div className="border-b border-white/10 bg-[#0f172a]">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-6 md:py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#dc2626]">
              Ministries & Fellowships
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold uppercase tracking-wide text-white md:text-4xl">
              Find Your Place to Serve
            </h3>
            <div className="mt-4 h-[2px] w-16 bg-[#15803d]" />
          </div>

          {/* Desktop: full 6-card grid */}
          <div className="hidden grid-cols-1 divide-y divide-white/10 border border-white/10 bg-[#080b16] md:grid md:grid-cols-2 md:divide-y-0 md:[&>*:nth-child(odd)]:border-r md:[&>*:nth-child(odd)]:border-white/10 md:[&>*:nth-child(-n+4)]:border-b md:[&>*:nth-child(-n+4)]:border-white/10 lg:grid-cols-3 lg:[&>*:nth-child(odd)]:border-r-0 lg:[&>*:nth-child(3n+1)]:border-r lg:[&>*:nth-child(3n+2)]:border-r lg:[&>*:nth-child(3n+1)]:border-white/10 lg:[&>*:nth-child(3n+2)]:border-white/10 lg:[&>*:nth-child(-n+3)]:border-b lg:[&>*:nth-child(-n+3)]:border-white/10">
            {MINISTRIES.map((m, i) => (
              <div key={m.name} className="group flex gap-5 p-7 transition hover:bg-white/[0.04]">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center border text-white ${
                  i % 2 === 0 ? "border-[#4c1d95] bg-[#4c1d95]" : "border-[#15803d] bg-[#15803d]"
                }`}>
                  <m.icon size={20} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
                    № 0{i + 1}
                  </p>
                  <h4 className="mt-1 font-serif text-lg font-semibold uppercase tracking-wide text-white">
                    {m.name}
                  </h4>
                  <p className="mt-2 text-[13px] leading-6 text-white/62">
                    {m.desc}
                  </p>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">
                    Led by · <span className="text-[#c4b5fd]">{m.lead}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: 3 visible + Show all 6 */}
          <div className="md:hidden">
            <ReadMore
              showAllFrom="md"
              tone="navy"
              openLabel={`Show All ${MINISTRIES.length} Ministries`}
              closeLabel="Show Less"
              more={
                <div className="flex flex-col divide-y divide-white/10 border-x border-b border-white/10 bg-[#0f172a]">
                  {MINISTRIES.slice(3).map((m, i) => (
                    <div key={m.name} className="flex gap-4 p-5">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center border text-white ${
                        (i + 3) % 2 === 0 ? "border-[#4c1d95] bg-[#4c1d95]" : "border-[#15803d] bg-[#15803d]"
                      }`}>
                        <m.icon size={18} strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
                          № 0{i + 4}
                        </p>
                        <h4 className="mt-1 font-serif text-base font-semibold uppercase tracking-wide text-white">
                          {m.name}
                        </h4>
                        <p className="mt-1.5 text-[13px] leading-6 text-white/62">
                          {m.desc}
                        </p>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">
                          Led by · <span className="text-[#c4b5fd]">{m.lead}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <div className="flex flex-col divide-y divide-white/10 border border-white/10 bg-[#0f172a]">
                {MINISTRIES.slice(0, 3).map((m, i) => (
                  <div key={m.name} className="flex gap-4 p-5">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center border text-white ${
                      i % 2 === 0 ? "border-[#4c1d95] bg-[#4c1d95]" : "border-[#15803d] bg-[#15803d]"
                    }`}>
                      <m.icon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-[10px] font-bold uppercase tracking-[0.32em] text-[#15803d]">
                        № 0{i + 1}
                      </p>
                      <h4 className="mt-1 font-serif text-base font-semibold uppercase tracking-wide text-white">
                        {m.name}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-6 text-white/62">
                        {m.desc}
                      </p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">
                        Led by · <span className="text-[#c4b5fd]">{m.lead}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ReadMore>
          </div>
        </div>
      </div>

      {/* ── Sermon Preview ── */}
      <div id="sermons" className="bg-[#4c1d95] text-white">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">

            {/* Left: video card */}
            <div className="relative">
              <div className="border-2 border-white/30 bg-black">
                <div
                  className="relative h-[280px] w-full bg-cover bg-center md:h-[400px]"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&q=80')" }}
                >
                  <div className="absolute inset-0 bg-[#4c1d95]/60" />
                  <button className="absolute inset-0 flex items-center justify-center transition hover:bg-[#4c1d95]/30">
                    <span className="flex h-20 w-20 items-center justify-center border-2 border-white bg-[#dc2626] text-white">
                      <Play size={28} className="ml-1" fill="currentColor" />
                    </span>
                  </button>
                </div>
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-white/60">
                Latest Sermon · Recorded {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>

            {/* Right: details */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#c4b5fd]">
                From the Pulpit
              </p>
              <h3 className="mt-3 font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.02em] md:text-4xl">
                Watch the Latest Sermon
              </h3>
              <div className="mt-5 mb-7 h-[2px] w-16 bg-[#15803d]" />

              <div className="border border-white/15 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd]">
                  Series · Faith for Today
                </p>
                <p className="mt-2 font-serif text-2xl font-semibold leading-tight text-white">
                  No Rest, No Silence Until Purpose Speaks
                </p>
                <p className="mt-3 text-[13px] leading-7 text-white/70">
                  A reflection on 1 Samuel 1:1-28 and the call to persist in prayer
                  until God answers.
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/60">
                  Preached by · <span className="text-white">Bishop Nelson Barasa Wanjala</span>
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-0">
                <Link
                  href="/#sermons"
                  className="flex items-center gap-2 bg-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c1d95] transition hover:bg-[#f5f3ff]"
                >
                  All Sermons <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
                <Link
                  href="/#stories"
                  className="flex items-center gap-2 border-2 border-[#c4b5fd] px-7 py-[12px] text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[#4c1d95]"
                >
                  Read Their Stories <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

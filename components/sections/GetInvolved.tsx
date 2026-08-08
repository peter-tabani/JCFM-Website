import Link from "next/link";

const DOORS = [
  {
    num: "I.",
    label: "For the Visitor",
    title: "Come Sit With Us",
    body: "Sunday service begins at 9:00 AM. You are all welcome.",
    link: { text: "See Sunday schedule", href: "/#church" },
  },
  {
    num: "II.",
    label: "For the Parent",
    title: "Let Your Child Belong Here",
    body: "From the first day a child walks through our gate, we treat them as our own.",
    link: { text: "Visit the school", href: "/admissions" },
  },
  {
    num: "III.",
    label: "For the Friend",
    title: "Walk Quietly Beside Us",
    body: "Pray, visit, or write. Every gesture of support is received with gratitude.",
    link: { text: "Talk to us", href: "/donors/portal" },
  },
];

export default function GetInvolved() {
  return (
    <section id="get-involved" className="border-b border-white/10 bg-[#080b16]">

      {/* Full-bleed image with overlay title */}
      <div
        className="relative h-[240px] w-full overflow-hidden md:h-[320px]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b16]/90 to-[#4c1d95]/55" />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 md:px-20">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-10 bg-[#86efac]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#86efac]">An Open Door</p>
          </div>
          <h2 className="mt-3 font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.02em] text-white md:text-5xl">
            You Are Already Welcome
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">

        {/* Three doors, editorial columns, no hard CTA buttons */}
        <div className="grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {DOORS.map((d) => (
            <div key={d.title} className="group flex flex-col bg-white/[0.03] p-8 transition hover:bg-white/[0.06] md:p-10">
              <p className="font-serif text-3xl font-semibold text-[#15803d]">
                {d.num}
              </p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#dc2626]">
                {d.label}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-white">
                {d.title}
              </h3>
              <div className="my-4 h-[2px] w-10 bg-[#15803d]" />
              <p className="flex-1 text-[14px] leading-7 text-white/62">
                {d.body}
              </p>
              <Link
                href={d.link.href}
                className="mt-6 inline-flex w-fit items-center gap-2 border-b border-[#c4b5fd] pb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c4b5fd] transition hover:border-[#fbbf24] hover:text-[#fbbf24]"
              >
                {d.link.text} →
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

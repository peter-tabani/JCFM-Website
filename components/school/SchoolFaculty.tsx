import { siteData } from "@/data/site";

// Initials from a name, e.g. "Rael H. Wafula" -> "RW".
function initials(name: string): string {
  const parts = name.replace(/\./g, "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function SchoolFaculty() {
  const s = siteData.school;

  return (
    <section id="faculty" className="border-b border-[#d4d0c4] bg-[#f8f6ee]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#15803d]">
              Our Team
            </p>
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
          </div>
          <h2 className="mt-5 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.02em] text-[#0b2545] sm:text-3xl md:text-5xl">
            Teachers Who Teach &amp; Care
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-slate-600 md:mt-5 md:text-[15px] md:leading-8">
            The people who look after your child every day, from the classroom
            to the kitchen and the gate, at Fountain of Hope Academy.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between border-b border-[#d4d0c4] pb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0b2545]">
            {s.faculty.length} Team Members
          </p>
        </div>

        {/* Roster */}
        <div className="grid grid-cols-1 gap-0 overflow-hidden border border-[#d4d0c4] bg-white sm:grid-cols-2 lg:grid-cols-3">
          {s.faculty.map((f, i) => (
            <article
              key={f.name}
              className={`flex items-center gap-4 p-5 transition hover:bg-[#f8f6ee] ${
                i % 2 === 1 ? "sm:border-l sm:border-[#d4d0c4]" : ""
              } ${i < s.faculty.length - 1 ? "border-b border-[#d4d0c4]" : ""} lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:not(:nth-child(3n+1))]:border-l lg:[&:not(:nth-child(3n+1))]:border-[#d4d0c4]`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#15803d] bg-[#0b2545] font-serif text-[15px] font-semibold text-[#c9a961]">
                {initials(f.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                  {f.role}
                </p>
                <p className="mt-1 font-serif text-base font-semibold leading-tight text-[#0b2545]">
                  {f.name}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center font-serif text-[13px] italic text-slate-600 md:mt-10 md:text-sm">
          Plus a full team of class teachers, support staff and the school
          chaplain.
        </p>
      </div>
    </section>
  );
}

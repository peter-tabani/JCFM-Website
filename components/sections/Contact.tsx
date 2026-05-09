import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { siteData } from "@/data/site";

const LEADERSHIP = [
  { ...siteData.contacts.bishop, accent: "navy" as const },
  { ...siteData.contacts.coordinator, accent: "gold" as const },
  { ...siteData.contacts.associate, accent: "red" as const },
];

const ACCENTS: Record<string, { bar: string; chip: string; chipText: string }> = {
  navy: { bar: "bg-[#4c1d95]", chip: "bg-[#4c1d95]", chipText: "text-white" },
  gold: { bar: "bg-[#15803d]", chip: "bg-[#15803d]", chipText: "text-white" },
  red: { bar: "bg-[#dc2626]", chip: "bg-[#dc2626]", chipText: "text-white" },
};

function digits(p: string) {
  return p.replace(/\s+/g, "").replace(/^\+/, "");
}

export default function Contact() {
  return (
    <section id="contact" className="border-b border-slate-200 bg-white">

      {/* Hero banner */}
      <div
        className="relative flex h-[200px] items-center justify-center overflow-hidden md:h-[260px]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1543269664-7eef42226a21?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#0b2545]/80" />
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-16 bg-[#86efac]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#86efac]">
              Office of the Ministry
            </p>
            <span className="h-[1px] w-16 bg-[#86efac]" />
          </div>
          <h2 className="mt-4 font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.02em] text-white md:text-5xl">
            Talk With Us
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:py-16">

        {/* Sub-header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mx-auto max-w-2xl text-[15px] leading-8 text-slate-600">
            Whether you would like to visit a service, ask about a branch, or
            simply say hello &mdash; our pastoral team is happy to hear from
            you. Reach the office directly on any of the lines below.
          </p>
        </div>

        {/* Leadership trio */}
        <div className="grid grid-cols-1 gap-0 border border-slate-200 md:grid-cols-3 md:divide-x md:divide-slate-200">
          {LEADERSHIP.map((p) => {
            const a = ACCENTS[p.accent];
            return (
              <div key={p.name} className="flex flex-col">
                <div className={`h-[3px] w-full ${a.bar}`} />
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <span className={`inline-flex w-fit items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${a.chip} ${a.chipText}`}>
                    {p.role}
                  </span>
                  <p className="mt-5 font-serif text-2xl font-semibold uppercase leading-tight tracking-wide text-[#4c1d95]">
                    {p.name}
                  </p>
                  <div className="my-4 h-[2px] w-10 bg-[#15803d]" />
                  <div className="mt-auto flex flex-col gap-0">
                    <a
                      href={`tel:${digits(p.phone)}`}
                      className="flex items-center justify-between gap-3 border border-[#4c1d95] bg-white px-4 py-3 text-[13px] font-semibold text-[#4c1d95] transition hover:bg-[#4c1d95] hover:text-white"
                    >
                      <span className="flex items-center gap-3">
                        <Phone size={14} strokeWidth={2.25} />
                        {p.phone}
                      </span>
                    </a>
                    <a
                      href={`https://wa.me/${digits(p.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 border-x border-b border-[#4c1d95] bg-[#15803d] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#0f5f2c]"
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle size={13} strokeWidth={2.5} />
                        WhatsApp
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Office details strip */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-slate-200 border border-slate-200 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-start gap-4 p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#15803d] bg-[#15803d] text-white">
              <MapPin size={18} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                Headquarters
              </p>
              <p className="mt-1 font-serif text-base font-semibold text-[#4c1d95]">
                Nzoia, Bungoma County
              </p>
              <p className="text-[12px] text-slate-600">Republic of Kenya</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#4c1d95] bg-[#4c1d95] text-white">
              <Mail size={18} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#dc2626]">
                Email
              </p>
              <a href={`mailto:${siteData.email}`} className="mt-1 block font-serif text-base font-semibold text-[#4c1d95] hover:text-[#dc2626]">
                {siteData.email}
              </a>
              <p className="text-[12px] text-slate-600">We reply within 48 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#15803d] bg-[#15803d] text-white">
              <Clock size={18} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15803d]">
                Sunday Service
              </p>
              <p className="mt-1 font-serif text-base font-semibold text-[#4c1d95]">
                {siteData.hours}
              </p>
              <p className="text-[12px] text-slate-600">At HQ &amp; every branch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

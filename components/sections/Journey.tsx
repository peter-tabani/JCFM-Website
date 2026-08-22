import Link from "next/link";
import {
  Flame,
  Hammer,
  Home,
  Sprout,
  Building2,
  GraduationCap,
  Network,
  Heart,
  ArrowRight,
  HandHeart,
  Handshake,
} from "lucide-react";

type Chapter = {
  n: string;
  year: string;
  era: string;
  location: string;
  material: string;
  title: string;
  narrative: string;
  metric: { k: string; v: string }[];
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  image: string;
  accent: "red" | "earth" | "navy" | "gold" | "green";
};

const CHAPTERS: Chapter[] = [
  {
    n: "01",
    year: "2008",
    era: "The Beginning",
    location: "Sitikho Sikalame, Bungoma",
    material: "Simple structure · Thatch roof",
    title: "The Beginning",
    narrative:
      "In Sitikho Sikalame, a small group of believers gathered under the leadership of Bishop Nelson Barasa. With faith and a shared hunger for God's Word, they began meeting regularly to pray, worship, and study Scripture. That small gathering would become the foundation of everything the Lord has done through this ministry.",
    metric: [
      { k: "Worshippers", v: "12" },
      { k: "Lamps", v: "1" },
      { k: "Seating", v: "Basic" },
    ],
    icon: Flame,
    image: "/images/hero/kecs-gate.webp",
    accent: "red",
  },
  {
    n: "02",
    year: "2010",
    era: "The First Bricks",
    location: "Sikalame · Same compound",
    material: "Local materials · Iron sheet roof",
    title: "A Place to Gather",
    narrative:
      "As the congregation grew, the community came together to build a more permanent meeting space. Through collective effort and the generosity of local supporters, a stronger structure took shape — a place where the church could gather, worship, and welcome more families into the fellowship.",
    metric: [
      { k: "Worshippers", v: "35" },
      { k: "Sunday School", v: "Began" },
      { k: "Roof", v: "First metal" },
    ],
    icon: Hammer,
    image: "/images/hero/kecs-gate.webp",
    accent: "earth",
  },
  {
    n: "03",
    year: "2012",
    era: "Outgrown Sikalame",
    location: "Nzoia Town, Bungoma · Rented",
    material: "Rented classroom",
    title: "Moving Forward",
    narrative:
      "As the congregation continued to grow, the church rented a primary-school classroom in Nzoia town for Sunday services. The members remained committed, gathering faithfully each week while trusting the Lord to provide a permanent home for the ministry.",
    metric: [
      { k: "Worshippers", v: "60" },
      { k: "Mid-week prayer", v: "Started" },
      { k: "Home", v: "In progress" },
    ],
    icon: Home,
    image: "/images/stories/member-01.jpg",
    accent: "navy",
  },
  {
    n: "04",
    year: "2013",
    era: "Ministry Founded",
    location: "Nzoia HQ · 1.5 acres",
    material: "Iron-sheet sanctuary · Wooden benches",
    title: "The Land of Promise",
    narrative:
      "A generous family gifted 1.5 acres of land in Nzoia to the ministry. An iron-sheet sanctuary was quickly built at the centre of the property, and soon after, Jesus Christ Founder Ministry was officially registered. For the first time, the work had a permanent home — a place to gather, grow, and serve the community.",
    metric: [
      { k: "Land", v: "1.5 acres" },
      { k: "Worshippers", v: "120" },
      { k: "Status", v: "Registered" },
    ],
    icon: Sprout,
    image: "/images/hero/jcfm-hero.webp",
    accent: "green",
  },
  {
    n: "05",
    year: "2015",
    era: "A Permanent Sanctuary",
    location: "Nzoia HQ · Same compound",
    material: "Permanent brick · Cement floor",
    title: "Brick &amp; Mortar",
    narrative:
      "Through community fundraising and dedicated labour, a permanent brick sanctuary was built to replace the iron-sheet structure. The new church featured pews, a wooden pulpit, plastered walls, and a cross above the door visible from the road. That December, the congregation celebrated its first baptisms in the new sanctuary.",
    metric: [
      { k: "Worshippers", v: "250" },
      { k: "Baptisms", v: "30 first year" },
      { k: "Pews", v: "Installed" },
    ],
    icon: Building2,
    image: "/images/stories/member-02.jpg",
    accent: "navy",
  },
  {
    n: "06",
    year: "2017",
    era: "Education Begins",
    location: "Nzoia HQ · Same compound",
    material: "4 classrooms · Cement & iron sheet",
    title: "A School Was Born",
    narrative:
      "Responding to the need for quality Christian education in the community, Fountain of Hope Academy opened its doors with four classrooms, twenty-eight pupils, and three dedicated teachers. From the beginning, the school was founded on a commitment to teach every child in the fear of the Lord.",
    metric: [
      { k: "Founding pupils", v: "28" },
      { k: "Teachers", v: "3" },
      { k: "Classrooms", v: "4" },
    ],
    icon: GraduationCap,
    image: "/images/staff/director.png",
    accent: "gold",
  },
  {
    n: "07",
    year: "2019 – 2024",
    era: "The Multiplication",
    location: "5 counties · Bungoma to Mombasa",
    material: "9 daughter churches",
    title: "Daughter Churches",
    narrative:
      "What began in Sikalame gradually extended across western Kenya and beyond — to Tembelela, Mang&apos;ana, Chesamisi, Mayanja, Chelekei, Kimilili, and even to Jomvu in Mombasa. Daughter churches were established one by one, each led by a faithful local pastor and rooted in the same faith that first gathered believers in Sikalame. A single church had become a network serving communities across five counties.",
    metric: [
      { k: "Branches", v: "9" },
      { k: "Counties", v: "5" },
      { k: "Weekly worship", v: "500+" },
    ],
    icon: Network,
    image: "/images/stories/member-03.jpg",
    accent: "navy",
  },
];

const ACCENTS: Record<
  Chapter["accent"],
  { bar: string; chip: string; chipText: string; ring: string; soft: string; iconFill: string }
> = {
  red:   { bar: "bg-[#a8201a]", chip: "bg-[#a8201a]", chipText: "text-white", ring: "border-[#a8201a]", soft: "bg-[#fdf3f2]", iconFill: "text-[#a8201a]" },
  earth: { bar: "bg-[#8b5e34]", chip: "bg-[#8b5e34]", chipText: "text-white", ring: "border-[#8b5e34]", soft: "bg-[#f7efe6]", iconFill: "text-[#8b5e34]" },
  navy:  { bar: "bg-[#0b2545]", chip: "bg-[#0b2545]", chipText: "text-[#c9a961]", ring: "border-[#0b2545]", soft: "bg-white", iconFill: "text-[#0b2545]" },
  gold:  { bar: "bg-[#c9a961]", chip: "bg-[#c9a961]", chipText: "text-[#0b2545]", ring: "border-[#c9a961]", soft: "bg-[#fbf6e6]", iconFill: "text-[#c9a961]" },
  green: { bar: "bg-[#15803d]", chip: "bg-[#15803d]", chipText: "text-white", ring: "border-[#15803d]", soft: "bg-[#f0f7f2]", iconFill: "text-[#15803d]" },
};

export default function Journey() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden border-b border-[#d4d0c4] bg-white"
    >
      {/* Decorative paper texture wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0b2545 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-14 sm:px-6 md:py-24">
        {/* ── Section masthead ── */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-20">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#a8201a]">
              The Story So Far
            </p>
            <span className="h-[1px] w-12 bg-[#0b2545] md:w-16" />
          </div>
          <h2 className="mt-5 font-serif text-[30px] font-semibold uppercase leading-[1.05] tracking-[0.02em] text-[#0b2545] sm:text-4xl md:text-[60px]">
            Growing in Grace
            <br />
            <span className="text-[#a8201a]">Across Kenya</span>
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-[2px] w-10 bg-[#c9a961] md:w-14" />
            <p className="font-serif text-sm italic text-slate-600 md:text-base">
              The journey of Jesus Christ Founder Ministry, in eight chapters.
            </p>
            <span className="h-[2px] w-10 bg-[#c9a961] md:w-14" />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-7 text-slate-600 md:mt-8 md:text-[15px] md:leading-8">
            Jesus Christ Founder Ministry began with a small gathering of
            believers in Sikalame and has grown into a network of churches and
            a school serving communities across Kenya. What follows is the
            story of how the Lord has led and expanded this work over the years.
          </p>
        </div>

        {/* ── Timeline rail wrapper ── */}
        <div className="relative">
          {/* Vertical rail — left on mobile, centered on desktop */}
          <div
            aria-hidden
            className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#a8201a] via-[#0b2545] to-[#15803d] lg:left-1/2 lg:-translate-x-1/2"
          />

          {/* Chapters */}
          <div className="space-y-12 md:space-y-16 lg:space-y-24">
            {CHAPTERS.map((c, i) => {
              const a = ACCENTS[c.accent];
              const flipped = i % 2 === 1; // alternate sides on desktop
              return (
                <article
                  key={c.n}
                  className="relative grid grid-cols-[56px_1fr] gap-5 lg:grid-cols-[1fr_56px_1fr] lg:gap-8"
                >
                  {/* Left half (desktop) — only when not flipped, contains card */}
                  {!flipped && (
                    <div className="hidden lg:block">
                      <ChapterCard chapter={c} accents={a} alignRight />
                    </div>
                  )}
                  {flipped && (
                    <div className="hidden lg:block" aria-hidden />
                  )}

                  {/* Center rail node */}
                  <div className="relative flex flex-col items-center">
                    {/* Year disc */}
                    <div
                      className={`relative z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center border-[3px] ${a.ring} bg-white shadow-md`}
                    >
                      <c.icon size={18} strokeWidth={1.75} className={a.iconFill} />
                    </div>

                    {/* Chapter no. badge */}
                    <div
                      className={`mt-2 ${a.chip} px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] ${a.chipText}`}
                    >
                      Ch. {c.n}
                    </div>
                  </div>

                  {/* Right half / mobile content */}
                  {!flipped ? (
                    <div className="lg:hidden">
                      <ChapterCard chapter={c} accents={a} />
                    </div>
                  ) : (
                    <div>
                      <ChapterCard chapter={c} accents={a} />
                    </div>
                  )}

                  {/* Right half (desktop) — only when flipped */}
                  {flipped && (
                    <div className="hidden" aria-hidden />
                  )}
                  {!flipped && (
                    <div className="hidden lg:block" aria-hidden />
                  )}
                </article>
              );
            })}

            {/* ── Final chapter: The Next Chapter is Yours ── */}
            <article className="relative grid grid-cols-[56px_1fr] gap-5 lg:grid-cols-[1fr_56px_1fr] lg:gap-8">
              <div className="hidden lg:block" aria-hidden />

              <div className="relative flex flex-col items-center">
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center border-[3px] border-[#c9a961] bg-[#0b2545] shadow-lg">
                  <Heart size={22} strokeWidth={1.75} className="text-[#c9a961]" fill="#c9a961" />
                </div>
                <div className="mt-2 bg-[#c9a961] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#0b2545]">
                  Ch. 08
                </div>
              </div>

              <div className="lg:col-span-1">
                <NextChapterCallout />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────
   Chapter card
   ────────────────────────────────────────────────────── */
function ChapterCard({
  chapter,
  accents,
  alignRight = false,
}: {
  chapter: Chapter;
  accents: (typeof ACCENTS)[Chapter["accent"]];
  alignRight?: boolean;
}) {
  return (
    <div
      className={`relative border-2 border-[#d4d0c4] bg-white ${
        alignRight ? "lg:text-right" : ""
      }`}
    >
      {/* Top accent bar */}
      <div className={`h-[3px] w-full ${accents.bar}`} />

      {/* Image strip */}
      <div
        className="relative h-44 w-full bg-cover bg-center md:h-52"
        style={{ backgroundImage: `url('${chapter.image}')` }}
      >
        {/* Year medallion */}
        <div className="absolute left-4 top-4 flex flex-col items-start bg-white/95 px-3 py-2 backdrop-blur md:left-5 md:top-5">
          <p className="font-serif text-2xl font-semibold leading-none text-[#0b2545] md:text-3xl">
            {chapter.year}
          </p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#a8201a]">
            {chapter.era}
          </p>
        </div>

        {/* Material badge */}
        <div
          className={`absolute right-4 bottom-4 ${accents.chip} px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${accents.chipText} md:right-5 md:bottom-5`}
        >
          {chapter.material}
        </div>
      </div>

      {/* Body */}
      <div className={`p-5 md:p-7 ${alignRight ? "lg:px-7" : ""}`}>
        {/* Location strip */}
        <p className={`text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500`}>
          {chapter.location}
        </p>

        {/* Title */}
        <h3
          className="mt-2 font-serif text-2xl font-semibold uppercase leading-tight tracking-wide text-[#0b2545] md:text-[28px]"
          dangerouslySetInnerHTML={{ __html: chapter.title }}
        />

        {/* Underline */}
        <div
          className={`mt-3 inline-block h-[2px] w-12 ${accents.bar} md:w-16`}
        />

        {/* Narrative */}
        <p
          className="mt-4 text-[14px] leading-7 text-slate-700 md:text-[15px] md:leading-8"
          dangerouslySetInnerHTML={{ __html: chapter.narrative }}
        />

        {/* Metrics row */}
        <dl
          className={`mt-5 grid grid-cols-3 gap-2 border-t border-[#d4d0c4] pt-4 md:mt-6 md:pt-5 ${
            alignRight ? "lg:[&>div]:items-end lg:[&>div]:text-right" : ""
          }`}
        >
          {chapter.metric.map((m) => (
            <div key={m.k} className="flex flex-col items-start">
              <dt className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
                {m.k}
              </dt>
              <dd className="mt-1 font-serif text-base font-semibold leading-tight text-[#0b2545] md:text-[17px]">
                {m.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   Final emotional CTA — The Next Chapter
   ────────────────────────────────────────────────────── */
function NextChapterCallout() {
  return (
    <div className="relative overflow-hidden border-2 border-[#c9a961] bg-[#0b2545] text-white shadow-xl">
      {/* Decorative gold corner ribbon */}
      <div className="absolute -right-12 top-7 rotate-45 bg-[#c9a961] px-14 py-1 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0b2545]">
        Today
      </div>

      <div className="p-7 md:p-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a961]">
          Chapter Eight · Today
        </p>
        <h3 className="mt-3 font-serif text-3xl font-semibold uppercase leading-[1.05] tracking-[0.02em] md:text-[40px]">
          The Next Chapter
          <br />
          <span className="text-[#c9a961]">Is Yours.</span>
        </h3>
        <div className="mt-5 h-[2px] w-16 bg-[#c9a961]" />

        <p className="mt-5 max-w-xl text-[14px] leading-7 text-white/85 md:text-[15px] md:leading-8">
          Permanent classroom blocks. A second campus. Clean water for every
          branch. A minibus for the bishop and the pastors who travel
          between counties. Scholarships for the next twenty-eight pupils.
        </p>
        <p className="mt-3 max-w-xl font-serif text-base italic text-[#c9a961] md:text-lg">
          None of these will be done by us alone &mdash; and that, too, is
          part of the design.
        </p>

        {/* Three pathways */}
        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-8">
          <PathwayCard
            icon={HandHeart}
            title="Pray With Us"
            desc="Stand quietly with the Ministry in prayer. We will share specific requests."
            href="/contact"
            cta="Receive Prayer List"
          />
          <PathwayCard
            icon={Handshake}
            title="Partner"
            desc="Walk alongside us as a long-term friend &mdash; through letters, visits or skill."
            href="/contact"
            cta="Become a Partner"
          />
          <PathwayCard
            icon={Heart}
            title="Give"
            desc="Sponsor a pupil, a project, or a season. Every shilling is accounted for."
            href="/donate"
            cta="Donate"
            primary
          />
        </div>

        {/* Footnote */}
        <p className="mt-7 border-t border-white/15 pt-5 text-center font-serif text-[13px] italic text-white/70 md:mt-8 md:pt-6 md:text-sm">
          &ldquo;Unless the Lord builds the house, they labour in vain that
          build it.&rdquo; &mdash; Psalm 127:1
        </p>
      </div>
    </div>
  );
}

function PathwayCard({
  icon: Icon,
  title,
  desc,
  href,
  cta,
  primary = false,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  desc: string;
  href: string;
  cta: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col border-2 p-5 transition ${
        primary
          ? "border-[#c9a961] bg-[#c9a961] text-[#0b2545] hover:bg-[#b8975a]"
          : "border-white/25 bg-white/5 text-white hover:border-[#c9a961] hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon
          size={20}
          strokeWidth={1.75}
          className={primary ? "text-[#0b2545]" : "text-[#c9a961]"}
        />
        <p
          className={`font-serif text-lg font-semibold uppercase tracking-wide ${
            primary ? "text-[#0b2545]" : "text-white"
          }`}
        >
          {title}
        </p>
      </div>
      <p
        className={`mt-3 flex-1 text-[12px] leading-6 ${
          primary ? "text-[#0b2545]/80" : "text-white/75"
        }`}
      >
        {desc}
      </p>
      <span
        className={`mt-4 inline-flex items-center gap-2 border-t pt-3 text-[10px] font-bold uppercase tracking-[0.22em] ${
          primary
            ? "border-[#0b2545]/30 text-[#0b2545]"
            : "border-white/20 text-[#c9a961]"
        }`}
      >
        {cta}
        <ArrowRight
          size={12}
          strokeWidth={2.5}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

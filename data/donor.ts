// ─────────────────────────────────────────────────────────
// Mock data for the Donor / Sponsor portal.
// In production, swap these for queries against your API.
// Images use picsum with seeds for stable, royalty-free demo art.
// ─────────────────────────────────────────────────────────

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ── Brand (from owner) ────────────────────────────────────
export const brand = {
  school: {
    name: "Fountain of Hope Academy",
    shortName: "Fountain of Hope",
    motto: "Integrity · Courage · Excellence",
    slogan: "We are led by the design established by God, God first.",
    vision:
      "To build confidence and hope in a child, to foster a better tomorrow and a stronger relationship with the community at large.",
    mission:
      "With a strong foundation in academics and spiritual guidance, we are committed to raising a dependable child with wholesome health and knowledge, living a stable, honest life.",
    colour: "navy",
    colourHex: "#1e3a8a", // blue-900-ish
  },
  ministry: {
    name: "Jesus Christ Foundation Ministries",
    colour: "purple",
    colourHex: "#6b21a8", // purple-800
  },
  director: {
    name: "Mr. Noah Mweruphe",
    whatsapp: "+254722916174",
    email: "excellentkenya@gmail.com",
  },
};

// ── Categories ────────────────────────────────────────────
export type CategoryKey =
  | "buildings"
  | "education"
  | "children"
  | "missions"
  | "community";

export const categories: Record<
  CategoryKey,
  { label: string; tagline: string; tone: string }
> = {
  buildings: {
    label: "Buildings & Spaces",
    tagline: "Classrooms, kitchen, administration.",
    tone: "bg-blue-50 text-blue-900 border-blue-200",
  },
  education: {
    label: "Education",
    tagline: "Books, learning, talent development.",
    tone: "bg-sky-50 text-sky-800 border-sky-200",
  },
  children: {
    label: "Sponsor a Child",
    tagline: "Walk a child through school.",
    tone: "bg-rose-50 text-rose-800 border-rose-200",
  },
  missions: {
    label: "Missions & Outreach",
    tagline: "Teaching, medical, construction trips.",
    tone: "bg-purple-50 text-purple-800 border-purple-200",
  },
  community: {
    label: "Community Care",
    tagline: "Clean water, food, families.",
    tone: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
};

// ── The current donor (mock) ──────────────────────────────
export const me = {
  id: "DR-0142",
  name: "Daniel & Mary Otieno",
  shortName: "Daniel",
  email: "daniel.otieno@example.com",
  phone: "+254 722 916 174",
  joined: "March 2022",
  totalGiven: 387_500,           // KSh, lifetime
  thisYear: 124_000,             // KSh, this year
  activeSponsorships: 3,
  projectsBacked: 5,
  preferredChannel: "M-Pesa",
  // Transparency preference (owner: anonymous by default, opt-in to Hall of Thanks)
  anonymous: true,
  hallOfThanksOptIn: false,
};

// ── My Donations (history) ────────────────────────────────
export type Donation = {
  id: string;
  date: string;
  iso: string;
  amount: number;
  channel: "M-Pesa" | "Bank" | "Card" | "Cash";
  ref: string;
  allocation: string;
  category: CategoryKey;
  projectId?: string;
  status: "received" | "reconciled" | "pending";
};

export const donations: Donation[] = [
  { id: "G-2614", date: "27 Apr 2026", iso: "2026-04-27", amount: 5000, channel: "M-Pesa", ref: "TGH7K2L9D1", allocation: "Sponsorship · Aaliyah K.", category: "children", projectId: "spon-aaliyah", status: "received" },
  { id: "G-2511", date: "27 Mar 2026", iso: "2026-03-27", amount: 5000, channel: "M-Pesa", ref: "TGB4P1Q9X2", allocation: "Sponsorship · Aaliyah K.", category: "children", projectId: "spon-aaliyah", status: "reconciled" },
  { id: "G-2510", date: "27 Mar 2026", iso: "2026-03-27", amount: 7500, channel: "M-Pesa", ref: "TGB4P3Q2X9", allocation: "Sponsorship · Brian S.", category: "children", projectId: "spon-brian", status: "reconciled" },
  { id: "G-2421", date: "12 Mar 2026", iso: "2026-03-12", amount: 25000, channel: "Bank", ref: "EQ-2026-03-118", allocation: "New Classrooms · Block B", category: "buildings", projectId: "proj-classrooms", status: "reconciled" },
  { id: "G-2310", date: "27 Feb 2026", iso: "2026-02-27", amount: 5000, channel: "M-Pesa", ref: "TGA3D8M2A0", allocation: "Sponsorship · Aaliyah K.", category: "children", projectId: "spon-aaliyah", status: "reconciled" },
  { id: "G-2309", date: "27 Feb 2026", iso: "2026-02-27", amount: 7500, channel: "M-Pesa", ref: "TGA3D8M2B1", allocation: "Sponsorship · Brian S.", category: "children", projectId: "spon-brian", status: "reconciled" },
  { id: "G-2208", date: "06 Feb 2026", iso: "2026-02-06", amount: 15000, channel: "Card", ref: "STR_a1b2c3d4", allocation: "Water Purification System", category: "community", projectId: "proj-water", status: "reconciled" },
  { id: "G-2107", date: "27 Jan 2026", iso: "2026-01-27", amount: 12500, channel: "M-Pesa", ref: "TGZ1Z7B5C8", allocation: "Sponsorships (Aaliyah, Brian)", category: "children", projectId: "spon-bundle", status: "reconciled" },
  { id: "G-2008", date: "11 Jan 2026", iso: "2026-01-11", amount: 10000, channel: "M-Pesa", ref: "TGY8L0R4S6", allocation: "Kitchen & Dining Hall", category: "buildings", projectId: "proj-kitchen", status: "reconciled" },
  { id: "G-1999", date: "20 Dec 2025", iso: "2025-12-20", amount: 30000, channel: "Bank", ref: "KCB-12-7821", allocation: "Christmas Food Drive", category: "community", projectId: "proj-food-2025", status: "reconciled" },
];

// ── My Sponsorships (active commitments) ──────────────────
export type Sponsorship = {
  id: string;
  kind: "child" | "project";
  title: string;
  subtitle: string;
  photo: string;
  monthly?: number;
  startedOn: string;
  totalGivenToDate: number;
  category: CategoryKey;
  projectId?: string;
  child?: {
    age: number;
    grade: string;
    school: string;
    bio: string;
  };
};

export const sponsorships: Sponsorship[] = [
  {
    id: "spon-aaliyah",
    kind: "child",
    title: "Aaliyah K.",
    subtitle: "Grade 4 · Fountain of Hope Academy",
    photo: img("aaliyah-portrait", 600, 600),
    monthly: 5000,
    startedOn: "Feb 2024",
    totalGivenToDate: 130_000,
    category: "children",
    projectId: "spon-aaliyah",
    child: {
      age: 10,
      grade: "Grade 4",
      school: "Fountain of Hope Academy",
      bio: "Aaliyah loves reading and dreams of becoming a doctor. She joined the school in 2023 and has been at the top of her class in Mathematics and English.",
    },
  },
  {
    id: "spon-brian",
    kind: "child",
    title: "Brian S.",
    subtitle: "Grade 1 · Fountain of Hope Academy",
    photo: img("brian-portrait", 600, 600),
    monthly: 7500,
    startedOn: "Sep 2024",
    totalGivenToDate: 67_500,
    category: "children",
    projectId: "spon-brian",
    child: {
      age: 7,
      grade: "Grade 1",
      school: "Fountain of Hope Academy",
      bio: "Brian started Grade 1 last year. He is bright, curious and rarely misses a day of school. His favourite subject is Science.",
    },
  },
  {
    id: "spon-classrooms",
    kind: "project",
    title: "New Classrooms · Block B",
    subtitle: "Buildings & Spaces · 38% funded",
    photo: img("classroom-construction", 800, 600),
    startedOn: "Mar 2026",
    totalGivenToDate: 25_000,
    category: "buildings",
    projectId: "proj-classrooms",
  },
];

// ── Active Projects (browse) ──────────────────────────────
export type ProjectStatus = "active" | "in-progress" | "near-complete" | "complete";

export type ProjectMilestone = {
  date: string;
  title: string;
  body: string;
  photo?: string;
};

export type Project = {
  id: string;
  title: string;
  category: CategoryKey;
  shortDesc: string;
  longDesc: string;
  hero: string;
  goal: number;
  raised: number;
  donors: number;
  status: ProjectStatus;
  startedOn: string;
  beneficiaries: string;
  beforeAfter?: { before: string; after: string; caption: string }[];
  gallery?: string[];
  milestones: ProjectMilestone[];
};

// Active projects are the five the owner named as currently being funded:
// Infrastructure, Classrooms, Administration, Kitchen, Water Purification, // plus the feeding programme and a completed Bibles drive.
export const projects: Project[] = [
  {
    id: "proj-classrooms",
    title: "New Classrooms · Block B",
    category: "buildings",
    shortDesc: "Four new classrooms to relieve crowding in lower primary.",
    longDesc:
      "Our lower-primary classes have grown well beyond what our current rooms can hold. Block B will add four proper classrooms with desks, ventilation and a small reading corner so every child has space to learn well.",
    hero: img("classroom-build-1", 1400, 800),
    goal: 1_800_000,
    raised: 684_000,
    donors: 47,
    status: "in-progress",
    startedOn: "Jan 2026",
    beneficiaries: "Lower-primary pupils (Grades 1-3)",
    beforeAfter: [
      {
        before: img("classroom-empty-plot", 900, 600),
        after: img("classroom-foundation-1", 900, 600),
        caption: "Cleared site → foundation laid (Feb 2026)",
      },
      {
        before: img("classroom-foundation-2", 900, 600),
        after: img("classroom-walls-1", 900, 600),
        caption: "Foundation → walls up to lintel (Apr 2026)",
      },
    ],
    milestones: [
      { date: "Jan 12, 2026", title: "Ground broken", body: "Parents, pupils and the headteacher gathered for a ground-breaking service.", photo: img("groundbreaking-1", 800, 500) },
      { date: "Feb 18, 2026", title: "Foundation complete", body: "Foundation poured and cured. Engineer's report filed.", photo: img("foundation-pour-1", 800, 500) },
      { date: "Mar 30, 2026", title: "Walls underway", body: "Block work has reached lintel level on two of the four rooms.", photo: img("wall-build-1", 800, 500) },
      { date: "Apr 22, 2026", title: "Roof timbers ordered", body: "Trusses are being prepared. Roofing scheduled for May.", photo: img("roof-timber-1", 800, 500) },
    ],
  },
  {
    id: "proj-admin",
    title: "Administration Block",
    category: "buildings",
    shortDesc: "A proper office, staffroom, and record room for the school.",
    longDesc:
      "At the moment the headteacher's office, the staffroom and our record-keeping all share one converted classroom. A small, purpose-built administration block will free that room for teaching and give staff a quiet place to plan and meet parents.",
    hero: img("admin-block-render-1", 1400, 800),
    goal: 1_200_000,
    raised: 186_000,
    donors: 14,
    status: "active",
    startedOn: "Apr 2026",
    beneficiaries: "Staff, parents, the whole school",
    gallery: [
      img("admin-block-plan-1", 800, 500),
      img("admin-block-site-1", 800, 500),
    ],
    milestones: [
      { date: "Apr 5, 2026", title: "Plans drawn up", body: "Architectural plans prepared and submitted for county approval.", photo: img("admin-block-blueprint-1", 800, 500) },
      { date: "Apr 20, 2026", title: "Site identified", body: "Plot at the north-east corner of the compound agreed with the Board.", photo: img("admin-block-site-2", 800, 500) },
    ],
  },
  {
    id: "proj-kitchen",
    title: "Kitchen & Dining Hall",
    category: "buildings",
    shortDesc: "A proper kitchen so every pupil gets a hot meal, safely.",
    longDesc:
      "Our cooks currently prepare meals in a small temporary shed. A real kitchen with a dining space will let us feed every pupil a hot, safe, dignified lunch every school day, and open the door to a wider feeding programme.",
    hero: img("kitchen-render-1", 1400, 800),
    goal: 1_500_000,
    raised: 420_000,
    donors: 26,
    status: "active",
    startedOn: "Feb 2026",
    beneficiaries: "All pupils, daily",
    beforeAfter: [
      {
        before: img("kitchen-temp-shed", 900, 600),
        after: img("kitchen-render-2", 900, 600),
        caption: "Temporary cooking shed → planned kitchen (render)",
      },
    ],
    milestones: [
      { date: "Feb 2026", title: "Fundraising opened", body: "The kitchen was added to our active fundraising list.", photo: img("kitchen-temp-shed-2", 800, 500) },
      { date: "Mar 2026", title: "Drawings finalised", body: "Kitchen, stores and a simple dining space drawn up together.", photo: img("kitchen-plan-1", 800, 500) },
    ],
  },
  {
    id: "proj-water",
    title: "Water Purification System",
    category: "community",
    shortDesc: "Clean, safe drinking water for every pupil and staff member.",
    longDesc:
      "The water we currently use is not always safe to drink. A proper purification system, filters, UV, storage, will give the whole school clean drinking water and save us hundreds of hours a term currently spent boiling.",
    hero: img("water-purifier-1", 1400, 800),
    goal: 480_000,
    raised: 295_000,
    donors: 22,
    status: "in-progress",
    startedOn: "Jan 2026",
    beneficiaries: "Every pupil & staff member",
    beforeAfter: [
      {
        before: img("water-jerrycan-1", 900, 600),
        after: img("water-purifier-2", 900, 600),
        caption: "Carrying from far and boiling → clean water at the tap",
      },
    ],
    milestones: [
      { date: "Jan 2026", title: "Quotes gathered", body: "Three companies quoted for filter + UV + 5,000 L storage.", photo: img("water-quote-1", 800, 500) },
      { date: "Mar 2026", title: "Storage tanks ordered", body: "Two 2,500 L tanks delivered and fixed on the base.", photo: img("water-tank-1", 800, 500) },
      { date: "Apr 2026", title: "Filter unit installed", body: "Sediment and carbon filters installed. UV stage still pending.", photo: img("water-filter-1", 800, 500) },
    ],
  },
  {
    id: "proj-infrastructure",
    title: "School Infrastructure Fund",
    category: "buildings",
    shortDesc: "The small, unglamorous fixes that keep a school running well.",
    longDesc:
      "The fence, the gate, pit latrines, the pathways, guttering, playground safety, none of these are \"projects\" on their own, but together they are what a school is. This fund keeps all of them in good order.",
    hero: img("infra-fence-1", 1400, 800),
    goal: 600_000,
    raised: 128_000,
    donors: 11,
    status: "active",
    startedOn: "Jan 2026",
    beneficiaries: "Every pupil, every day",
    gallery: [
      img("infra-gate-1", 800, 500),
      img("infra-path-1", 800, 500),
      img("infra-latrine-1", 800, 500),
    ],
    milestones: [
      { date: "Feb 2026", title: "Perimeter fence repaired", body: "40 m of the east fence rebuilt after storm damage.", photo: img("infra-fence-2", 800, 500) },
      { date: "Apr 2026", title: "New pit latrine block", body: "Two additional pit latrines dug and fitted for lower classes.", photo: img("infra-latrine-2", 800, 500) },
    ],
  },
  {
    id: "proj-food-2026",
    title: "Feeding Programme · 2026",
    category: "community",
    shortDesc: "A hot lunch for every pupil, every school day.",
    longDesc:
      "Many of our pupils used to come to school without a meal. The feeding programme guarantees a hot lunch, maize, beans, vegetables and the occasional treat.",
    hero: img("food-kitchen-1", 1400, 800),
    goal: 600_000,
    raised: 215_000,
    donors: 19,
    status: "active",
    startedOn: "Jan 2026",
    beneficiaries: "All pupils",
    gallery: [
      img("food-kitchen-2", 800, 500),
      img("food-serving-1", 800, 500),
      img("food-eating-1", 800, 500),
    ],
    milestones: [
      { date: "Jan 2026", title: "Term 1 funded", body: "First term meals fully covered through gifts in kind and cash.", photo: img("food-serving-2", 800, 500) },
      { date: "Mar 2026", title: "Term 2 short by KSh 110k", body: "We are seeking standing orders to cover Term 2.", photo: img("food-kitchen-3", 800, 500) },
    ],
  },
  {
    id: "proj-bibles",
    title: "Bibles for New Members",
    category: "missions",
    shortDesc: "A study Bible in the heart language of every new believer.",
    longDesc:
      "Across our branches we welcomed 240 new believers last year. Each one receives a hard-backed study Bible, Swahili, English or their heart language, at their first communion.",
    hero: img("bible-stack-1", 1400, 800),
    goal: 240_000,
    raised: 240_000,
    donors: 28,
    status: "complete",
    startedOn: "Jan 2025",
    beneficiaries: "240 new believers",
    gallery: [img("bible-handout-1", 800, 500), img("bible-handout-2", 800, 500)],
    milestones: [
      { date: "Mar 2025", title: "First 80 distributed", body: "Distributed at HQ and three branches.", photo: img("bible-handout-3", 800, 500) },
      { date: "Dec 2025", title: "All 240 distributed", body: "Final batch handed out at Christmas service.", photo: img("bible-handout-4", 800, 500) },
    ],
  },
];

// ── Vision (upcoming, fundable) ───────────────────────────
// Everything below is a "not started yet" dream, real facilities
// Fountain of Hope Academy hopes to add, reflecting what the
// school currently does NOT have (only a playground today).
export type VisionItem = {
  id: string;
  title: string;
  category: CategoryKey;
  hero: string;
  blurb: string;
  bullets: string[];
  estimateFrom: number;
  estimateTo: number;
  earliestStart: string;
};

export const visionItems: VisionItem[] = [
  {
    id: "vis-science-lab",
    title: "A Proper Science Lab",
    category: "education",
    hero: img("future-science-lab-1", 1400, 800),
    blurb:
      "The school teaches science from textbooks only. A real lab, benches, sinks, a store and basic apparatus, would change what our pupils can actually do and see.",
    bullets: [
      "One lab (8 m × 7 m) with six benches",
      "Apparatus set for Grades 4-8 experiments",
      "Locked store for chemicals and glassware",
    ],
    estimateFrom: 1_200_000,
    estimateTo: 1_600_000,
    earliestStart: "2027",
  },
  {
    id: "vis-computer-lab",
    title: "A Computer Lab",
    category: "education",
    hero: img("future-computer-lab-1", 1400, 800),
    blurb:
      "Today our pupils learn ICT on paper. A small lab with twenty machines and a stable internet line would let them actually practise what they read about.",
    bullets: [
      "20 refurbished desktops + projector",
      "Fibre line and UPS for power cuts",
      "Simple timetable for every class",
    ],
    estimateFrom: 850_000,
    estimateTo: 1_100_000,
    earliestStart: "Late 2026",
  },
  {
    id: "vis-library",
    title: "A School Library",
    category: "education",
    hero: img("future-library-1", 1400, 800),
    blurb:
      "Reading is the single strongest predictor of a child's future. A library with shelves, chairs and a thousand carefully-chosen books would do enormous good.",
    bullets: [
      "One converted classroom, shelved out",
      "~1,000 books across all levels",
      "Simple lending system run by pupils",
    ],
    estimateFrom: 450_000,
    estimateTo: 650_000,
    earliestStart: "2027",
  },
  {
    id: "vis-school-bus",
    title: "A School Bus",
    category: "education",
    hero: img("future-school-bus-1", 1400, 800),
    blurb:
      "For school trips, inter-school sports and the longest-walking pupils. One reliable 33-seater used bus, properly serviced, would change many lives.",
    bullets: [
      "33-seater used bus, fully inspected",
      "Livery and school branding",
      "First year of fuel and service fund",
    ],
    estimateFrom: 2_500_000,
    estimateTo: 3_200_000,
    earliestStart: "2027",
  },
  {
    id: "vis-dormitories",
    title: "Boarding Dormitories",
    category: "buildings",
    hero: img("future-dorms-1", 1400, 800),
    blurb:
      "We do not yet offer boarding. For pupils with difficult home lives, safe dormitories, boys' and girls', would open up a different kind of future.",
    bullets: [
      "Boys' dorm: 48 beds",
      "Girls' dorm: 48 beds + matron's quarters",
      "Bathrooms, laundry, supervised study room",
    ],
    estimateFrom: 8_500_000,
    estimateTo: 10_000_000,
    earliestStart: "2028",
  },
  {
    id: "vis-sponsor-pool",
    title: "Sponsor 12 More Children",
    category: "children",
    hero: img("future-children-1", 1400, 800),
    blurb:
      "Twelve children currently on our waiting list, bright, willing, from homes that cannot quite stretch to school fees.",
    bullets: [
      "From KSh 5,000 / month / child",
      "Covers fees, uniform, books, lunch",
      "Termly report cards & photos",
    ],
    estimateFrom: 60_000,
    estimateTo: 90_000,
    earliestStart: "Term 2, 2026",
  },
  {
    id: "vis-talent-rooms",
    title: "Art & Music Rooms",
    category: "education",
    hero: img("future-music-room-1", 1400, 800),
    blurb:
      "Talent development is one of our four special programmes, but at the moment we have no dedicated space for it. Two small rooms would change everything.",
    bullets: [
      "Music room with a few keyboards and drums",
      "Art room with basic supplies",
      "Storage for instruments and artworks",
    ],
    estimateFrom: 700_000,
    estimateTo: 950_000,
    earliestStart: "2027",
  },
];

// ── Helpers ───────────────────────────────────────────────
export const fmtKSh = (n: number) => "KSh " + n.toLocaleString("en-KE");

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function donationsForProject(projectId: string): Donation[] {
  return donations.filter((d) => d.projectId === projectId);
}

export function totalGivenForProject(projectId: string): number {
  return donationsForProject(projectId).reduce((s, d) => s + d.amount, 0);
}

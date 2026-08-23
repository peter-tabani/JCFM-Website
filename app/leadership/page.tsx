import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LeadershipView, { type Leader } from "@/components/leadership/LeadershipView";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Fallback used only if the database has no team members yet, so the page
// never renders empty.
const FALLBACK: Leader[] = [
  {
    name: "Bishop Nelson Barasa Wanjala",
    role: "General Overseer & Founder",
    tag: "Founder",
    photo: null,
    email: "info@jcfm.online",
    quote: null,
    bio: "Bishop Nelson Barasa Wanjala is the founder and General Overseer of Jesus Christ Founder Ministry, which began in Sitikho Sikalame in 2005 and has grown into a network of branches across Kenya.",
  },
  {
    name: "Pastor Sarah N Wekesa",
    role: "Co-Founder & Pastor",
    tag: "Co-Founder",
    photo: null,
    email: "info@jcfm.online",
    quote: null,
    bio: "Pastor Sarah N Wekesa co-founded Jesus Christ Founder Ministry and serves in pastoral leadership alongside Bishop Nelson.",
  },
  {
    name: "Rael H. Wafula",
    role: "Head Teacher, Fountain of Hope Academy",
    tag: "Head Teacher",
    photo: null,
    email: "info@jcfm.online",
    quote: null,
    bio: "Rael H. Wafula is the Head Teacher of Fountain of Hope Academy, leading teaching and learning across the school.",
  },
];

async function loadTeam(): Promise<Leader[]> {
  try {
    const rows = await prisma.teamMember.findMany({
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) return FALLBACK;
    return rows.map((r) => ({
      name: r.name,
      role: r.role,
      tag: r.tag,
      bio: r.bio,
      quote: r.quote,
      photo: r.photo,
      email: r.email,
    }));
  } catch {
    return FALLBACK;
  }
}

export default async function LeadershipPage() {
  const leaders = await loadTeam();
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />
      <LeadershipView leaders={leaders} />
      <Footer />
    </main>
  );
}

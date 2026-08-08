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
    name: "Rev. Noah Mweruphe",
    role: "Senior Pastor & Founder",
    tag: "Founder & Pastor",
    photo: "/images/staff/director.png",
    email: "info@jcfm.org",
    quote: "Our calling is to build lives through Christ, in the church, in the classroom, and in the community.",
    bio: "Rev. Noah Mweruphe is the visionary founder and senior pastor of Jesus Christ Founder Ministry. Since establishing JCFM in 2005, he has led a mission to build lives through Christ.",
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

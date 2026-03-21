"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart, LogOut, GraduationCap, Building2,
  Newspaper, ArrowRight, CheckCircle2,
  Monitor, Trophy, Hammer, Users,
  MessageCircle, Mail,
} from "lucide-react";

// ── Time-based greeting using browser local time ──────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good evening";
}

// ── Get first name cleanly ────────────────────────────
function getFirstName(name: string | null | undefined): string {
  if (!name) return "Donor";
  // If it looks like a phone number, return "there"
  if (name.match(/^\+?[\d\s]{7,}$/)) return "there";
  return name.split(" ")[0];
}

const donationOptions = [
  {
    id: "sponsor",
    icon: <Heart size={26} />,
    title: "Sponsor a Child",
    desc: "Cover a child's full education — meals, uniform, supplies & tuition.",
    amounts: ["$10 / mo", "$25 / mo", "$50 / mo"],
    color: "border-[#d97706]/30 bg-[#fffaf2]",
    iconBg: "bg-[#d97706]/10 text-[#d97706]",
  },
  {
    id: "school",
    icon: <Building2 size={26} />,
    title: "Donate to the School",
    desc: "Support the school's general fund — facilities, equipment & growth.",
    amounts: ["$25", "$50", "$100", "$250"],
    color: "border-slate-200 bg-white",
    iconBg: "bg-[#0f172a]/10 text-[#0f172a]",
  },
];

const news = [
  {
    icon: <Hammer size={18} />,
    tag: "Expansion",
    title: "Plans for New Classrooms Underway",
    date: "March 2025",
    body: "As enrolment grows, KES is planning to add 4 new classrooms. The director is actively seeking donor support to make this a reality in 2025.",
    urgent: true,
  },
  {
    icon: <Monitor size={18} />,
    tag: "Technology",
    title: "Computer Lab Upgrade — Goal: 20 New Computers",
    date: "February 2025",
    body: "Our current lab has 8 computers for 400+ learners. We are fundraising to add 12 more machines and upgrade internet access.",
    urgent: false,
  },
  {
    icon: <Trophy size={18} />,
    tag: "Achievement",
    title: "KES Students Top Sub-County in Scouting & Academics",
    date: "January 2025",
    body: "Our learners brought home top honours in the Likoni sub-county academics and scouting competitions.",
    urgent: false,
  },
  {
    icon: <Users size={18} />,
    tag: "Vision",
    title: "Sports Facilities — Building a Real Athletics Track",
    date: "December 2024",
    body: "KES is highly competitive in athletics and Taekwondo. The school vision is to build a proper athletics track and expand sports facilities.",
    urgent: false,
  },
];

export default function DonorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [donated, setDonated] = useState<string | null>(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/donors/portal");
    }
    // Set greeting on client side so it uses the user's local time
    setGreeting(getGreeting());
  }, [status, router]);

  const handleDonate = (id: string) => {
    setDonated(id);
    setTimeout(() => setDonated(null), 4000);
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d97706] text-lg font-bold text-[#d97706]">K</div>
          <p className="text-sm text-slate-500">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const firstName = getFirstName(session.user?.name);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 lg:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#d97706] text-sm font-bold text-[#d97706]">K</div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">KES Donor Portal</p>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5">Kenya Excellent Centre & School</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {session.user?.image ? (
              <img src={session.user.image} alt={session.user.name || ""} className="h-9 w-9 rounded-full border-2 border-[#d97706]" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d97706] text-sm font-bold text-white">
                {firstName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-none">{session.user?.name}</p>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5">{session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/donors/portal" })}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50"
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6">

        {/* ── Greeting ── */}
        <div className="mb-8">
          <h1 className="hero-title text-3xl text-slate-900">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Thank you for being part of the KES family. Here is how you can help today.
          </p>
        </div>

        {/* Success toast */}
        {donated && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
            <CheckCircle2 size={20} className="shrink-0" />
            <p className="text-sm font-semibold">
              Thank you! Director Mr. Mweruphe will contact you at{" "}
              <span className="underline">{session.user?.email}</span> to complete your donation.
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* ── Left ── */}
          <div className="space-y-6">

            {/* Donation Options */}
            <div>
              <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                <Heart size={18} className="text-[#d97706]" />
                How Would You Like to Help?
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {donationOptions.map((opt) => (
                  <div key={opt.id} className={`rounded-2xl border-2 p-6 ${opt.color}`}>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${opt.iconBg}`}>
                      {opt.icon}
                    </div>
                    <h3 className="mb-1 font-bold text-slate-900">{opt.title}</h3>
                    <p className="mb-5 text-sm leading-7 text-slate-500">{opt.desc}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {opt.amounts.map((amt) => (
                        <span key={amt} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                          {amt}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleDonate(opt.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d97706] py-3 text-sm font-semibold text-white hover:bg-[#b45309] transition"
                    >
                      {opt.id === "sponsor" ? "Sponsor a Child" : "Donate Now"}
                      <ArrowRight size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* School News */}
            <div>
              <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                <Newspaper size={18} className="text-[#d97706]" />
                School News & Vision
              </h2>
              <div className="space-y-4">
                {news.map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-2xl border bg-white p-5 shadow-sm ${item.urgent ? "border-[#d97706]/40" : "border-slate-200"}`}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full ${item.urgent ? "bg-[#d97706]/10 text-[#d97706]" : "bg-slate-100 text-slate-500"}`}>
                        {item.icon}
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${item.urgent ? "bg-[#d97706] text-white" : "bg-slate-100 text-slate-500"}`}>
                        {item.tag}
                      </span>
                      <span className="ml-auto text-xs text-slate-400">{item.date}</span>
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{item.body}</p>
                    {item.urgent && (
                      <button
                        onClick={() => handleDonate("school")}
                        className="mt-4 flex items-center gap-1.5 rounded-full bg-[#d97706] px-4 py-2 text-xs font-bold text-white hover:bg-[#b45309]"
                      >
                        <Heart size={13} /> Support This
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                <GraduationCap size={20} />
              </div>
              <h3 className="mb-3 font-bold text-slate-900">What Your Gift Does</h3>
              <ul className="space-y-3">
                {[
                  { amt: "$10/mo", desc: "School supplies for 1 child" },
                  { amt: "$25/mo", desc: "Uniform + daily meals" },
                  { amt: "$50/mo", desc: "Full child sponsorship" },
                  { amt: "$100", desc: "Meals for 10 children/month" },
                  { amt: "$250", desc: "Equips a full classroom" },
                ].map((item) => (
                  <li key={item.amt} className="flex items-center gap-3 text-sm">
                    <span className="shrink-0 rounded-full bg-[#d97706] px-2 py-0.5 text-xs font-bold text-white">{item.amt}</span>
                    <span className="text-slate-600">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-1 font-bold text-slate-900">Talk to the Director</h3>
              <p className="mb-4 text-sm leading-7 text-slate-500">
                Mr. Noah Mweruphe personally handles all donor arrangements.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/254722916174?text=Hello%20Mr.%20Mweruphe%2C%20I%20am%20a%20KES%20donor%20and%20would%20like%20to%20discuss%20my%20support."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-[#25D366] p-3 text-sm font-semibold text-white hover:bg-[#1ebe5d]"
                >
                  <MessageCircle size={17} /> WhatsApp the Director
                </a>
                <a
                  href="mailto:excellentkenya@gmail.com?subject=Donor Enquiry"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Mail size={17} className="text-[#d97706]" /> excellentkenya@gmail.com
                </a>
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm"
            >
              ← Back to KES Website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
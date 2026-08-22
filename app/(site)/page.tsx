import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import Newsletter from "@/components/sections/Newsletter";
import GetInvolved from "@/components/sections/GetInvolved";
import AcademyCallout from "@/components/sections/TwoPillars";
import { siteData } from "@/data/site";

export const metadata: Metadata = {
  title: `${siteData.orgName} — Church in Miritini, Mombasa & Bungoma, Kenya`,
  description:
    "Jesus Christ Founder Ministry (JCFM) is a Christ-centred church headquartered in Miritini, Mombasa with branches across Bungoma and Kenya. Join our Sunday services, explore Fountain of Hope Academy, or give online.",
  alternates: { canonical: "/" },
};

// Short landing page — full sections now live on their own tabs (About,
// Branches, Church Life, Stories, Contact, Donate) instead of being
// stacked here behind hash anchors.
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      {/* Church identity, motto & soft Academy link */}
      <Hero />

      {/* Instagram-style poster rail for Bishop uploads */}
      <UpcomingEvents />

      {/* Email subscription — JCFM & school updates */}
      <Newsletter />

      {/* Three ways in: visitor, parent, friend */}
      <GetInvolved />

      {/* Small callout for Fountain of Hope Academy */}
      <AcademyCallout />
    </main>
  );
}

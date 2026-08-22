import type { Metadata } from "next";
import About from "@/components/sections/About";
import { siteData } from "@/data/site";
import Breadcrumb from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: `About — ${siteData.orgName}`,
  description:
    "The history, mission and leadership of Jesus Christ Founder Ministry — a Christ-centred church rooted in Nzoia, Bungoma and now headquartered in Miritini, Mombasa, reaching across Kenya.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      <Breadcrumb items={[{ name: "About", path: "/about" }]} />
      <About />
    </main>
  );
}

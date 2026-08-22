import type { Metadata } from "next";
import Branches from "@/components/sections/Branches";
import { siteData } from "@/data/site";
import Breadcrumb from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: `Our Branches — ${siteData.orgName}`,
  description:
    "The JCFM branch network — nine congregations across Bungoma and Mombasa counties, each led by a pastor rooted in their community.",
  alternates: { canonical: "/branches" },
};

export default function BranchesPage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      <Breadcrumb items={[{ name: "Branches", path: "/branches" }]} />
      <Branches />
    </main>
  );
}

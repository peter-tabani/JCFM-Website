import type { Metadata } from "next";
import Stories from "@/components/sections/Stories";
import { siteData } from "@/data/site";
import Breadcrumb from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: `Stories — ${siteData.orgName}`,
  description:
    "Voices from the JCFM community — testimonies of what God is doing across our branches, the school, and beyond.",
  alternates: { canonical: "/stories" },
};

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      <Breadcrumb items={[{ name: "Stories", path: "/stories" }]} />
      <Stories />
    </main>
  );
}

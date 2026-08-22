import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import { siteData } from "@/data/site";
import Breadcrumb from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: `Contact — ${siteData.orgName}`,
  description:
    "Get in touch with Jesus Christ Founder Ministry leadership — location, service hours, and how to reach us.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      <Breadcrumb items={[{ name: "Contact", path: "/contact" }]} />
      <Contact />
    </main>
  );
}

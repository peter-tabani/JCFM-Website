import type { Metadata } from "next";
import Journey from "@/components/sections/Journey";
import Breadcrumb from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: "Our Journey — Jesus Christ Founder Ministry",
  description:
    "The story of Jesus Christ Founder Ministry — from a small gathering of believers in Sikalame to a network of churches and a school serving communities across Kenya.",
  alternates: { canonical: "/journey" },
};

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Breadcrumb items={[{ name: "Our Journey", path: "/journey" }]} />
      <Journey />
    </main>
  );
}

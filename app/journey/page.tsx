import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Journey from "@/components/sections/Journey";

export const metadata: Metadata = {
  title: "Our Journey — Jesus Christ Founder Ministry",
  description:
    "The story of Jesus Christ Founder Ministry — from a small gathering of believers in Sikalame to a network of churches and a school serving communities across Kenya.",
};

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />
      <Journey />
      <Footer />
    </main>
  );
}

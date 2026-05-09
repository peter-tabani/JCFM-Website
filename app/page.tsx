import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import Branches from "@/components/sections/Branches";
import ChurchLife from "@/components/sections/ChurchLife";
import Stories from "@/components/sections/Stories";
import MediaGallery from "@/components/sections/MediaGallery";
import AcademyCallout from "@/components/sections/TwoPillars";
import GetInvolved from "@/components/sections/GetInvolved";
import Newsletter from "@/components/sections/Newsletter";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      {/* Church identity, motto & soft Academy link */}
      <Hero />

      {/* Instagram-style poster rail for Bishop uploads */}
      <UpcomingEvents />

      {/* Email subscription — JCFM & school updates */}
      <Newsletter />

      {/* Ministry profile — short, attractive teaser */}
      <About />

      {/* The 9-branch network across Kenya */}
      <Branches />

      {/* Sunday services, ministries, sermon preview */}
      <ChurchLife />

      {/* Voices from the branches — witness, no ask */}
      <Stories />

      {/* Images & video gallery */}
      <MediaGallery />

      {/* Small callout for Fountain of Hope Academy */}
      <AcademyCallout />

      {/* "An Open Door" — soft invitation, no donation push */}
      <GetInvolved />

      {/* Talk with us — leadership phone numbers */}
      <Contact />

      <Footer />
    </main>
  );
}

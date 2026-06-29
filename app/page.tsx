import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import ChurchLife from "@/components/sections/ChurchLife";
import MediaGallery from "@/components/sections/MediaGallery";
import AcademyCallout from "@/components/sections/TwoPillars";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      {/* Church identity, motto & soft Academy link */}
      <Hero />

      {/* Instagram-style poster rail for Bishop uploads */}
      <UpcomingEvents />

      {/* Email subscription — JCFM & school updates */}
      <Newsletter />

      {/* Sunday services, ministries, sermon preview */}
      <ChurchLife />

      {/* Images & video gallery */}
      <MediaGallery />

      {/* Small callout for Fountain of Hope Academy */}
      <AcademyCallout />

      <Footer />
    </main>
  );
}

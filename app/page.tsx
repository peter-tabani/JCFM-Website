import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import ChurchLife from "@/components/sections/ChurchLife";
import Branches from "@/components/sections/Branches";
import Sermons from "@/components/sections/Sermons";
import MediaGallery from "@/components/sections/MediaGallery";
import AcademyCallout from "@/components/sections/TwoPillars";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      {/* Church identity, motto & soft Academy link */}
      <Hero />

      {/* About the ministry (#about) */}
      <About />

      {/* Instagram-style poster rail for Bishop uploads (#events) */}
      <UpcomingEvents />

      {/* Sunday services & weekly schedule (#church) */}
      <ChurchLife />

      {/* Branch network across Kenya (#branches) */}
      <Branches />

      {/* Published sermons (#sermons) */}
      <Sermons />

      {/* Images & video gallery (#gallery) */}
      <MediaGallery />

      {/* Email subscription — JCFM & school updates */}
      <Newsletter />

      {/* Small callout for Fountain of Hope Academy */}
      <AcademyCallout />

      <Footer />
    </main>
  );
}

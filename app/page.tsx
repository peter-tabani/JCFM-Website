import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import ChurchLife from "@/components/sections/ChurchLife";
import Branches from "@/components/sections/Branches";
import MediaGallery from "@/components/sections/MediaGallery";
import AcademyCallout from "@/components/sections/TwoPillars";
import Newsletter from "@/components/sections/Newsletter";
import { publicPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = publicPageMetadata({
  title: "Jesus Christ Founder Ministry | Church, Outreach and School in Kenya",
  description: "Explore worship, branches, community outreach and Fountain of Hope Academy at Jesus Christ Founder Ministry in Kenya.",
  path: "",
});

const churchSchema = {
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": `${SITE_URL}/#church`,
  name: "Jesus Christ Founder Ministry",
  alternateName: "JCFM",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/hero-1.jpg`,
  foundingDate: "2005",
  email: "info@jcfm.online",
  subOrganization: { "@id": `${SITE_URL}/school#school` },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }} />
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

      {/* Life at JCFM, admin-uploaded photos, videos & sermons (#gallery) */}
      <MediaGallery />

      {/* Email subscription, JCFM & school updates */}
      <Newsletter />

      {/* Small callout for Fountain of Hope Academy */}
      <AcademyCallout />

      <Footer />
    </main>
  );
}

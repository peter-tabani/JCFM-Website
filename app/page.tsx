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
  description: "Jesus Christ Founder Ministry in Kenya was founded by Bishop Nelson Barasa Wanjala and Pastor Sarah Nangila Wekesa. Explore worship, branches, outreach and Fountain of Hope Academy.",
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
  founder: [
    { "@id": `${SITE_URL}/#bishop-nelson-barasa-wanjala` },
    { "@id": `${SITE_URL}/#pastor-sarah-nangila-wekesa` },
  ],
  subOrganization: { "@id": `${SITE_URL}/school#school` },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Jesus Christ Founder Ministry",
  alternateName: "JCFM",
  url: SITE_URL,
};

const leaderSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#bishop-nelson-barasa-wanjala`,
    name: "Bishop Nelson Barasa Wanjala",
    jobTitle: "Founder and General Overseer",
    url: `${SITE_URL}/#bishop-nelson-barasa-wanjala`,
    worksFor: { "@id": `${SITE_URL}/#church` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#pastor-sarah-nangila-wekesa`,
    name: "Pastor Sarah Nangila Wekesa",
    jobTitle: "Co-founder and Pastor",
    url: `${SITE_URL}/#pastor-sarah-nangila-wekesa`,
    worksFor: { "@id": `${SITE_URL}/#church` },
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080b16] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(leaderSchemas) }} />
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

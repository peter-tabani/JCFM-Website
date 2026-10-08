import type { Metadata } from "next";
import SchoolNav from "@/components/school/SchoolNav";
import SchoolHero from "@/components/school/SchoolHero";
import SchoolAbout from "@/components/school/SchoolAbout";
import SchoolPrograms from "@/components/school/SchoolPrograms";
import SchoolWhy from "@/components/school/SchoolWhy";
import SchoolFaculty from "@/components/school/SchoolFaculty";
import SchoolMediaGallery from "@/components/school/SchoolMediaGallery";
import SchoolAdmissions from "@/components/school/SchoolAdmissions";
import SchoolContact from "@/components/school/SchoolContact";
import SchoolFooter from "@/components/school/SchoolFooter";
import { publicPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Fountain of Hope Academy | Baby Class to Grade 4",
  description:
    "Fountain of Hope Academy is a faith-based day school in Nzoia, Bungoma, offering Baby Class through Grade 4.",
  path: "/school",
  image: "/images/fountain-of-hope-hero.jpg",
});

const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "School",
  "@id": `${SITE_URL}/school#school`,
  name: "Fountain of Hope Academy",
  url: `${SITE_URL}/school`,
  image: `${SITE_URL}/images/fountain-of-hope-hero.jpg`,
  foundingDate: "2008",
  email: "info@jcfm.online",
  parentOrganization: { "@id": `${SITE_URL}/#church` },
};

export default function SchoolPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }} />
      <SchoolNav />
      <SchoolHero />
      <SchoolAbout />
      <SchoolPrograms />
      <SchoolWhy />
      <SchoolFaculty />
      <SchoolMediaGallery />
      <SchoolAdmissions />
      <SchoolContact />
      <SchoolFooter />
    </main>
  );
}

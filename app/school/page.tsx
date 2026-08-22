import type { Metadata } from "next";
import SchoolNav from "@/components/school/SchoolNav";
import SchoolHero from "@/components/school/SchoolHero";
import SchoolAbout from "@/components/school/SchoolAbout";
import SchoolPrograms from "@/components/school/SchoolPrograms";
import SchoolWhy from "@/components/school/SchoolWhy";
import SchoolLife from "@/components/school/SchoolLife";
import SchoolFaculty from "@/components/school/SchoolFaculty";
import SchoolAdmissions from "@/components/school/SchoolAdmissions";
import SchoolGallery from "@/components/school/SchoolGallery";
import SchoolTestimonials from "@/components/school/SchoolTestimonials";
import SchoolContact from "@/components/school/SchoolContact";
import SchoolFooter from "@/components/school/SchoolFooter";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { siteData } from "@/data/site";

export const metadata: Metadata = {
  title: "Fountain of Hope Academy — An Education Ministry of JCFM",
  description:
    "Fountain of Hope Academy — a faith-based, CBC-aligned day school in Nzoia, Bungoma. Playgroup, Primary and Junior School under the Jesus Christ Founder Ministry.",
  alternates: { canonical: "/school" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jcfm.online";

const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteData.school.name,
  alternateName: siteData.school.shortName,
  url: `${SITE_URL}/school`,
  description:
    "Fountain of Hope Academy — a faith-based, CBC-aligned day school in Nzoia, Bungoma. Playgroup, Primary and Junior School under the Jesus Christ Founder Ministry.",
  foundingDate: siteData.school.founded,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteData.school.location,
    addressCountry: "KE",
  },
  parentOrganization: {
    "@type": "Church",
    name: siteData.orgName,
  },
};

export default function SchoolPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
      />
      <Breadcrumb items={[{ name: "Fountain of Hope Academy", path: "/school" }]} />
      <SchoolNav />
      <SchoolHero />
      <SchoolAbout />
      <SchoolPrograms />
      <SchoolWhy />
      <SchoolLife />
      <SchoolFaculty />
      <SchoolAdmissions />
      <SchoolGallery />
      <SchoolTestimonials />
      <SchoolContact />
      <SchoolFooter />
    </main>
  );
}

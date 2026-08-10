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

export const metadata: Metadata = {
  title: "Fountain of Hope Academy, An Education Ministry of JCFM",
  description:
    "Fountain of Hope Academy, a faith-based, CBC-aligned day school in Nzoia, Bungoma. Playgroup, Primary and Junior School under the Jesus Christ Founder Ministry.",
};

export default function SchoolPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
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

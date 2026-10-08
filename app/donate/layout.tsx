import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Donate to JCFM",
  description: "Support the church and Fountain of Hope Academy through a secure online donation.",
  path: "/donate",
  image: "/images/PeopleStandingOutsideChurch.jpg",
});

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}

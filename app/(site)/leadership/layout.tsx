import type { Metadata } from "next";
import { siteData } from "@/data/site";

// leadership/page.tsx is a client component ("use client", for the bio
// modal state), so it can't export `metadata` itself — Next.js requires
// metadata to come from a Server Component. This layout wraps it purely
// to carry that metadata.
export const metadata: Metadata = {
  title: `Leadership — ${siteData.orgName}`,
  description:
    "Meet the pastors and school leadership of Jesus Christ Founder Ministry and Fountain of Hope Academy — shepherding the church and educating the next generation across Kenya.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Breadcrumb JSON-LD is rendered directly in page.tsx (a client
  // component — that's fine, only `metadata` needs a server component).
  return children;
}

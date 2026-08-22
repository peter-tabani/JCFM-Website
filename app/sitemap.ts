import type { MetadataRoute } from "next";

// Next.js serves this at /sitemap.xml automatically — robots.ts already
// points search engines at that URL. Only public marketing/school pages are
// listed here; everything under /admin, /api, /donors/portal and /login is
// intentionally excluded to match the disallow rules in robots.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://jcfm.online";
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/journey", priority: 0.6, changeFrequency: "monthly" },
    { path: "/mission-trips", priority: 0.6, changeFrequency: "monthly" },
    { path: "/branches", priority: 0.7, changeFrequency: "monthly" },
    { path: "/church", priority: 0.8, changeFrequency: "weekly" },
    { path: "/hope-for-young-women", priority: 0.7, changeFrequency: "monthly" },
    { path: "/stories", priority: 0.6, changeFrequency: "weekly" },
    { path: "/leadership", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/donate", priority: 0.9, changeFrequency: "yearly" },
    { path: "/school", priority: 0.8, changeFrequency: "monthly" },
    { path: "/admissions", priority: 0.7, changeFrequency: "monthly" },
    { path: "/primary", priority: 0.6, changeFrequency: "monthly" },
    { path: "/secondary", priority: 0.6, changeFrequency: "monthly" },
    { path: "/donors", priority: 0.5, changeFrequency: "monthly" },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

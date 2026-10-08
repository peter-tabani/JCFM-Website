import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/school`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/mission-trips`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/leadership`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/donate`, changeFrequency: "monthly", priority: 0.7 },
  ];
}

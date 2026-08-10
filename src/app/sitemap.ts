import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/library`,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/quiz`,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

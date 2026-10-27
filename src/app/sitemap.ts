import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://khodrochare.com/",
      lastModified: "2026-10-27",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

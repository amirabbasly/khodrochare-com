import type { MetadataRoute } from "next";
import { LANDINGS } from "@/lib/data";

const BASE = "https://khodrochare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      lastModified: "2026-10-28",
      changeFrequency: "weekly",
      priority: 1,
    },
    ...LANDINGS.map((landing) => ({
      url: `${BASE}/${landing.slug}`,
      lastModified: "2026-10-28",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}

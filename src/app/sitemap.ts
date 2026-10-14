import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { postsSorted } from "@/data/posts";
import { roads } from "@/data/roads";
import { services } from "@/data/services";
import { seoUrl } from "@/lib/site";

/**
 * نقشه سایت کامل — همه آدرس‌ها روی دامنه سئو (.ir) اعلام می‌شوند،
 * چون دامنه تبلیغاتی (.com) با هدر noindex سرو می‌شود.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: "daily" | "weekly" | "monthly";
  }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/areas", priority: 0.9, changeFrequency: "weekly" },
    { path: "/roads", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: seoUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),

    ...services.map((service) => ({
      url: seoUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),

    ...areas.map((area) => ({
      url: seoUrl(`/areas/${area.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: area.kind === "metropolis" ? 0.9 : 0.8,
    })),

    ...roads.map((road) => ({
      url: seoUrl(`/roads/${road.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: road.kind === "freeway" ? 0.9 : 0.8,
    })),

    ...postsSorted.map((post) => ({
      url: seoUrl(`/blog/${post.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

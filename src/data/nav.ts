import { areas } from "@/data/areas";
import { roads } from "@/data/roads";
import { services } from "@/data/services";

export const mainNav = [
  { label: "خدمات امداد", href: "/services" },
  { label: "مناطق تحت پوشش", href: "/areas" },
  { label: "آزادراه‌ها و محورها", href: "/roads" },
  { label: "تعرفه‌ها", href: "/pricing" },
  { label: "وبلاگ", href: "/blog" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس", href: "/contact" },
] as const;

/** گروه‌بندی مناطق برای منوی کشویی */
export const areaGroups: { title: string; slugs: string[] }[] = [
  { title: "تهران و شمیرانات", slugs: ["tehran", "shemiranat", "lavasan", "fasham"] },
  {
    title: "شرق و شمال شرق",
    slugs: ["pardis", "roodehen", "damavand", "firuzkuh", "pakdasht", "pishva", "varamin", "qarchak"],
  },
  {
    title: "جنوب و غرب",
    slugs: ["shahr-rey", "baghershahr", "eslamshahr", "shahriar", "qods", "malard", "robat-karim", "baharestan"],
  },
  { title: "محور شمال (کرج و مازندران)", slugs: ["karaj", "chalous"] },
];

export const navServices = services.map((service) => ({
  label: service.shortName,
  href: `/services/${service.slug}`,
  tagline: service.tagline,
}));

export const navAreas = areas.map((area) => ({
  label: area.name,
  href: `/areas/${area.slug}`,
  group: areaGroups.find((group) => group.slugs.includes(area.slug))?.title ?? "سایر مناطق",
}));

export const navRoads = roads.map((road) => ({
  label: road.name,
  href: `/roads/${road.slug}`,
}));

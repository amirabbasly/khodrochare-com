import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brand.fa} — ${siteConfig.brand.tagline}`,
    short_name: siteConfig.brand.fa,
    description:
      "امداد خودرو شبانه‌روزی در تهران، شهرهای استان تهران و آزادراه‌های منتهی به شمال: باتری، لاستیک، سوخت، قفل، یدک‌کشی و تعمیر در محل.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#080c1d",
    lang: "fa-IR",
    dir: "rtl",
    categories: ["automotive", "services"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}

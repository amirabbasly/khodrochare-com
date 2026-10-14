import type { MetadataRoute } from "next";
import { seoUrl } from "@/lib/site";

/**
 * robots.txt
 * نقشه سایت روی دامنه سئو (.ir) اعلام می‌شود. مسیر API بسته است و
 * صفحات بدون ارزش ایندکس (فرم درخواست، شرایط استفاده و حریم خصوصی)
 * از نقشه سایت حذف شده‌اند و متادیتای noindex دارند.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // فقط مسیر API بسته است؛ صفحه درخواست با متادیتای noindex مدیریت
        // می‌شود و برای بازبینی گوگل ادز باید قابل کراول بماند.
        disallow: ["/api/"],
      },
    ],
    sitemap: seoUrl("/sitemap.xml"),
    host: seoUrl("/"),
  };
}

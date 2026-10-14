import type { Metadata } from "next";
import { seoUrl, siteConfig } from "@/lib/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

export function truncate(text: string, max = 158): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3).trimEnd()}…`;
}

/**
 * سازنده متادیتا با قواعد یکسان در همه صفحات.
 * canonical همیشه روی دامنه سئو (khodrochare.ir) تنظیم می‌شود تا دامنه
 * تبلیغات (.com) برای گوگل محتوای تکراری نسازد؛ دامنه تبلیغات با هدر
 * X-Robots-Tag در proxy.ts مدیریت می‌شود.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
}: MetaInput): Metadata {
  const url = seoUrl(path);
  const description_ = truncate(description, 158);

  return {
    title,
    description: description_,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description: description_,
      siteName: siteConfig.brand.fa,
      locale: "fa_IR",
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [siteConfig.brand.fa],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description_,
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/** متادیتای صفحاتی که نباید ایندکس شوند (حریم خصوصی، درخواست کمک) */
export function noIndexMetadata(title: string, description: string, path: string) {
  return buildMetadata({ title, description, path, noindex: true });
}

/**
 * تنظیمات مرکزی برند و تماس.
 * همه مقادیر از متغیرهای محیطی خوانده می‌شوند تا بدون تغییر کد قابل تنظیم باشند.
 * راهنما: فایل .env.example را به .env.local کپی کنید.
 */

const env = (key: string, fallback: string): string => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
};

export const siteConfig = {
  brand: {
    fa: "خودرو چاره",
    en: "Khodrochare",
    legalFa: "خودرو چاره — سامانه امداد خودرو",
    tagline: "امداد خودرو شبانه‌روزی تهران و آزادراه‌های شمال",
    slogan: "هر جا خودرو چاره کند، ما راه می‌رسیم",
  },

  /** دامنه اصلی سئو (محتوایی) */
  seoHost: env("NEXT_PUBLIC_SEO_HOST", "khodrochare.ir"),
  /** دامنه تبلیغات (لندینگ ادز) */
  adsHost: env("NEXT_PUBLIC_ADS_HOST", "khodrochare.com"),
  /** اگر true: درخواست‌های دامنه تبلیغات noindex و canonical به دامنه سئو می‌شوند */
  noindexAdsDomain: env("NEXT_PUBLIC_NOINDEX_ADS_DOMAIN", "true") === "true",

  contact: {
    phoneE164: env("NEXT_PUBLIC_PHONE_E164", "+982188000000"),
    phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "۰۲۱ ۸۸۰۰۰۰۰۰"),
    mobileE164: env("NEXT_PUBLIC_MOBILE_E164", "+989120000000"),
    mobileDisplay: env("NEXT_PUBLIC_MOBILE_DISPLAY", "۰۹۱۲ ۰۰۰ ۰۰۰۰"),
    whatsapp: env("NEXT_PUBLIC_WHATSAPP", "989120000000"),
    telegram: env("NEXT_PUBLIC_TELEGRAM", "khodrochare"),
    email: env("NEXT_PUBLIC_EMAIL", "info@khodrochare.ir"),
    instagram: env("NEXT_PUBLIC_INSTAGRAM", ""),
  },

  address: {
    fa: env(
      "NEXT_PUBLIC_ADDRESS",
      "تهران، بزرگراه شهید همت، پایگاه امداد خودرو چاره",
    ),
    postalCode: env("NEXT_PUBLIC_POSTAL_CODE", ""),
    lat: Number(env("NEXT_PUBLIC_LAT", "35.7701")),
    lng: Number(env("NEXT_PUBLIC_LNG", "51.3719")),
  },

  /** ساعات کاری امداد: ۲۴/۷ */
  hours: "شبانه‌روزی، ۲۴ ساعت، ۷ روز هفته",
  foundedYear: 1396,
  /** سال جاری شمسی برای کپی‌رایت (در ابتدای هر سال به‌روزرسانی شود) */
  copyrightYear: 1405,
  /** تاریخ آخرین بازبینی محتوای صفحات کلیدی — شمسی */
  contentUpdated: "۲۲ مهر ۱۴۰۵",

  /** آمار کلیدی که در سراسر سایت نمایش داده می‌شود */
  stats: {
    respondedRequests: "۱۸۴٬۰۰۰",
    avgTehranMinutes: "۲۵",
    avgRoadMinutes: "۴۵",
    fleetCount: "۲۴۰",
    coveragePoints: "۹۶",
    satisfaction: "۹۸",
  },

  social: {
    whatsappDeepLink: (text: string) =>
      `https://wa.me/${env("NEXT_PUBLIC_WHATSAPP", "989120000000")}?text=${encodeURIComponent(text)}`,
  },
} as const;

/** آدرس مطلق صفحه روی دامنه سئو (برای canonical و داده ساخت‌یافته) */
export function seoUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `https://${siteConfig.seoHost}${clean === "/" ? "" : clean}`;
}

/** آدرس مطلق صفحه روی دامنه تبلیغات */
export function adsUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `https://${siteConfig.adsHost}${clean === "/" ? "" : clean}`;
}

export const telHref = `tel:${siteConfig.contact.mobileE164}`;
export const telLandlineHref = `tel:${siteConfig.contact.phoneE164}`;
export const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
  "سلام، از سایت خودرو چاره تماس می‌گیرم و به امداد خودرو نیاز دارم.",
)}`;
export const telegramHref = `https://t.me/${siteConfig.contact.telegram}`;
export const mailHref = `mailto:${siteConfig.contact.email}`;

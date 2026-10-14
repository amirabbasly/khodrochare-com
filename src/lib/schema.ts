import { seoUrl, siteConfig } from "@/lib/site";

type Json = Record<string, unknown>;

const ORG_ID = `${seoUrl("/")}#organization`;
const WEBSITE_ID = `${seoUrl("/")}#website`;

/** داده ساخت‌یافته سازمان + کسب‌وکار امداد خودرو */
export function organizationSchema(extra?: {
  areaServed?: string[];
  services?: string[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness", "EmergencyService"],
    "@id": ORG_ID,
    name: siteConfig.brand.fa,
    alternateName: [siteConfig.brand.en, "امداد خودرو چاره"],
    description:
      "امداد خودرو شبانه‌روزی در تهران، شهرهای استان تهران و آزادراه‌های منتهی به شمال؛ باتری‌به‌باتری، یدک‌کش، پنچرگیری، سوخت‌رسانی و تعمیر در محل.",
    url: seoUrl("/"),
    telephone: siteConfig.contact.mobileE164,
    email: siteConfig.contact.email,
    image: `${seoUrl("/")}opengraph-image`,
    logo: `${seoUrl("/")}icon.svg`,
    priceRange: "$$",
    currenciesAccepted: "IRR",
    paymentAccepted: "نقدی، کارت بانکی، پرداخت پس از انجام خدمت",
    openingHours: "Mo-Su 00:00-23:59",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.fa,
      addressLocality: "تهران",
      addressRegion: "تهران",
      addressCountry: "IR",
      ...(siteConfig.address.postalCode
        ? { postalCode: siteConfig.address.postalCode }
        : {}),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.lat,
      longitude: siteConfig.address.lng,
    },
    areaServed: (extra?.areaServed ?? [
      "تهران",
      "استان تهران",
      "آزادراه تهران-شمال",
      "جاده چالوس",
      "جاده هراز",
      "جاده فیروزکوه",
    ]).map((name) => ({ "@type": "AdministrativeArea", name })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.address.lat,
        longitude: siteConfig.address.lng,
      },
      geoRadius: 220000,
    },
    knowsAbout: [
      "امداد خودرو",
      "باتری به باتری",
      "یدک کش خودرو",
      "پنچرگیری سیار",
      "سوخت رسانی خودرو",
      "باز کردن قفل خودرو",
      "امداد خودرو برقی",
    ],
    ...(extra?.services ? { hasOfferCatalog: offerCatalog(extra.services) } : {}),
    sameAs: [siteConfig.contact.instagram].filter(Boolean),
  };
}

function offerCatalog(services: string[]): Json {
  return {
    "@type": "OfferCatalog",
    name: "خدمات امداد خودرو چاره",
    itemListElement: services.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: seoUrl("/"),
    name: siteConfig.brand.fa,
    inLanguage: "fa-IR",
    publisher: { "@id": ORG_ID },
  };
}

/** صفحه خدمت (Service) + محدوده ارائه */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
  serviceType?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType ?? "امداد خودرو",
    description: input.description,
    url: seoUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: (input.areaServed ?? ["تهران", "استان تهران"]).map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.mobileE164,
        contactType: "emergency",
        availableLanguage: ["fa"],
      },
      serviceUrl: seoUrl(input.path),
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "IRR",
      description: "اعلام تعرفه شفاف پیش از اعزام، پرداخت پس از انجام خدمت",
    },
  };
}

export function faqSchema(items: Array<{ q: string; a: string }>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(
  trail: Array<{ name: string; path: string }>,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: seoUrl(item.path),
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    inLanguage: "fa-IR",
    mainEntityOfPage: { "@type": "WebPage", "@id": seoUrl(input.path) },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@type": "Organization", name: siteConfig.brand.fa, url: seoUrl("/") },
    publisher: { "@id": ORG_ID },
    ...(input.keywords ? { keywords: input.keywords.join("، ") } : {}),
  };
}

export function itemListSchema(
  name: string,
  items: Array<{ name: string; path: string }>,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: seoUrl(item.path),
    })),
  };
}

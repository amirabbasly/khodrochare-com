export type QA = { q: string; a: string };

export type IconKey =
  | "battery"
  | "tire"
  | "fuel"
  | "lock"
  | "tow"
  | "wrench"
  | "bolt"
  | "road"
  | "motorcycle"
  | "checklist"
  | "clock"
  | "shield"
  | "pin"
  | "phone"
  | "wallet"
  | "star"
  | "users"
  | "tunnel"
  | "mountain"
  | "snow"
  | "traffic";

export type ContentBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "note"; title?: string; text: string }
  | { kind: "table"; head: string[]; rows: string[][] };

export type Service = {
  slug: string;
  /** نام کامل خدمت — تیتر H1 */
  name: string;
  /** نام کوتاه برای کارت‌ها و منو */
  shortName: string;
  icon: IconKey;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** تیتر تبلیغاتی کارت */
  tagline: string;
  intro: string[];
  includes: string[];
  symptoms: string[];
  steps: { title: string; text: string }[];
  /** سیاست قیمت‌گذاری — بدون عدد ساختگی */
  pricing: string[];
  timeEstimate: string;
  vehicles: string[];
  tips: string[];
  faqs: QA[];
  relatedServices: string[];
  relatedAreas: string[];
  relatedRoads: string[];
};

export type Area = {
  slug: string;
  name: string;
  /** نوع منطقه برای دسته‌بندی و متن‌سازی */
  kind: "metropolis" | "city" | "district" | "resort";
  county: string;
  population?: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  coords: { lat: number; lng: number };
  responseTime: { min: number; max: number };
  /** فاصله تقریبی رانندگی تا مرکز تهران */
  distanceFromCenterKm: number;
  intro: string[];
  /** محله‌ها، شهرک‌ها و روستاهای تحت پوشش */
  neighborhoods: string[];
  /** نشانه‌های مکانی، بزرگراه‌ها، میادین و نقاط شاخص */
  landmarks: string[];
  /** محورها و بزرگراه‌های دسترسی */
  accessRoads: string[];
  /** خرابی‌ها و درخواست‌های پرتکرار همین منطقه */
  commonIssues: string[];
  /** نکات محلی که فقط برای همین منطقه درست است */
  localNotes: string[];
  /** توضیح وزش بستگی/فصلی */
  seasonal: string;
  /** زیرناحیه‌ها برای پوشش کلمات کلیدی ریزتر */
  zones: { name: string; detail: string }[];
  faqs: QA[];
  relatedAreas: string[];
};

export type Road = {
  slug: string;
  name: string;
  /** نام رسمی و شماره راه */
  official: string;
  kind: "freeway" | "mountain-road" | "urban-corridor";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  from: string;
  to: string;
  lengthKm: number;
  coords: { lat: number; lng: number };
  intro: string[];
  /** قطعه‌ها یا بازه‌های مسیر با توضیح */
  segments: { name: string; detail: string }[];
  tunnels: string[];
  /** نقاط حادثه‌خیز و پرتقاضا برای امداد */
  hotspots: { name: string; note: string }[];
  rules: string[];
  risks: string[];
  /** زمان تقریبی رسیدن امداد در بازه‌های مختلف مسیر */
  coverage: { range: string; minutes: string }[];
  emergencySteps: string[];
  faqs: QA[];
  relatedRoads: string[];
  relatedAreas: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: string;
  readingMinutes: number;
  keywords: string[];
  blocks: ContentBlock[];
  faqs: QA[];
  relatedRoads: string[];
  relatedAreas: string[];
  relatedServices: string[];
};

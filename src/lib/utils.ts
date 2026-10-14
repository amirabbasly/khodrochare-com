/** ابزارهای مشترک پروژه */

/** ترکیب کلاس‌های شرطی بدون وابستگی اضافه */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** تبدیل رقم‌های لاتین به فارسی */
export function fa(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/** تبدیل رقم‌های فارسی/عربی به لاتین (برای اعتبارسنجی ورودی فرم) */
export function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/** جداکننده هزارگان با رقم فارسی */
export function faNumber(value: number): string {
  return fa(value.toLocaleString("en-US"));
}

/** نرمال‌سازی متن فارسی: یکسان‌سازی ی/ک عربی و حذف نیم‌فاصله‌های اضافه */
export function normalizeFa(input: string): string {
  return input
    .replace(/\u064A/g, "\u06CC")
    .replace(/\u0643/g, "\u06A9")
    .replace(/\u200C{2,}/g, "\u200C")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** جست‌وجوی متنی ساده و مقاوم (برای فیلتر پوشش مناطق) */
export function matches(query: string, ...haystack: string[]): boolean {
  const q = normalizeFa(query).toLowerCase().replace(/\u200C/g, " ");
  if (q.length === 0) return true;

  const terms = q.split(/\s+/).filter(Boolean);
  const target = normalizeFa(haystack.join(" "))
    .toLowerCase()
    .replace(/\u200C/g, " ");

  return terms.every((term) => target.includes(term));
}

/** فاصله‌ی تقریبی بر اساس مختصات (کیلومتر) */
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

/**
 * ارسال رویداد تبدیل (Conversion) به دیتالیر گوگل — آماده برای گوگل ادز و آنالیتیکس.
 * وقتی NEXT_PUBLIC_GTM_ID یا NEXT_PUBLIC_GA_ID تنظیم شود، رویدادها قابل اندازه‌گیری‌اند.
 */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}

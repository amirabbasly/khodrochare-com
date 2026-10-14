/**
 * ردیابی تبدیل‌ها (Google Ads / GA4)
 * ---------------------------------------------------------------
 * همه شناسه‌ها از متغیرهای محیطی خوانده می‌شوند و اگر تعریف نشده باشند،
 * هیچ اسکریپتی بارگذاری نمی‌شود و فراخوانی‌ها بی‌اثر (no-op) هستند.
 * بنابراین بدون تنظیم این متغیرها، سایت کاملاً بدون ردیاب کار می‌کند.
 */

export const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "";
export const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

/** برچسب تبدیل ثبت سرنخ (ساخت آن در پنل گوگل ادز) */
const leadLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL?.trim() ?? "";
/** برچسب تبدیل تماس تلفنی */
const callLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL?.trim() ?? "";
/** برچسب تبدیل کلیک واتساپ */
const whatsappLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL?.trim() ?? "";

export const analyticsEnabled = Boolean(googleAdsId || gaId);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** ارسال رویداد عمومی به gtag (اگر بارگذاری شده باشد) */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** ارسال تبدیل Google Ads با برچسب مشخص */
export function trackAdsConversion(label: string, params: Record<string, unknown> = {}) {
  if (!googleAdsId || !label) return;
  trackEvent("conversion", { send_to: `${googleAdsId}/${label}`, ...params });
}

/** ثبت تبدیل «درخواست امداد» — پس از موفقیت ارسال فرم */
export function trackLeadConversion(input: { service?: string; page?: string; urgent?: boolean }) {
  trackAdsConversion(leadLabel, {
    event_category: "lead",
    event_label: input.service ?? "امداد خودرو",
    value: 1,
  });
  trackEvent("generate_lead", {
    service: input.service,
    page_location: input.page,
    urgent: input.urgent ?? false,
  });
}

/** ثبت کلیک تماس تلفنی */
export function trackCallClick(source: string = "other") {
  trackAdsConversion(callLabel, { event_category: "contact", event_label: `تماس — ${source}` });
  trackEvent("contact_call", { source });
}

/** ثبت کلیک واتساپ */
export function trackWhatsAppClick(source: string = "other") {
  trackAdsConversion(whatsappLabel, { event_category: "contact", event_label: `واتساپ — ${source}` });
  trackEvent("contact_whatsapp", { source });
}

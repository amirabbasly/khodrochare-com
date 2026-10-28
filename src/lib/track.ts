/**
 * سیستم ردیابی تبلیغاتی خودرو چاره — آماده برای گوگل ادز، آنالیتیکس و تگ‌منیجر.
 *
 * با تنظیم متغیرهای زیر در هاست فعال می‌شود (بدون تغییر کد):
 * NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GADS_ID (AW-...),
 * NEXT_PUBLIC_GADS_CALL_LABEL, NEXT_PUBLIC_GADS_REQUEST_LABEL
 */

type AdsWindow = {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
};

const ATTRIBUTION_KEY = "khodrochare-attribution";
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const GADS_CALL_LABEL = process.env.NEXT_PUBLIC_GADS_CALL_LABEL;
const GADS_REQUEST_LABEL = process.env.NEXT_PUBLIC_GADS_REQUEST_LABEL;

const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

/** ذخیره پارامترهای تبلیغاتی لینک ورودی (gclid و UTM) برای نسبت‌دادن تبدیل‌ها به کمپین */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    ATTRIBUTION_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) found[key] = value;
    });
    if (Object.keys(found).length > 0) {
      localStorage.setItem(
        ATTRIBUTION_KEY,
        JSON.stringify({ ...found, landing_page: window.location.href, captured_at: Date.now() }),
      );
    }
  } catch {
    /* ذخیره‌سازی در دسترس نیست */
  }
}

export function getAttribution(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) ?? "{}") as Record<string, unknown>;
  } catch {
    return {};
  }
}

/** ارسال رویداد به دیتالیر + شلیک تبدیل مستقیم گوگل ادز در صورت تنظیم برچسب‌ها */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as AdsWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...getAttribution(), ...params });

  if (GADS_ID && typeof w.gtag === "function") {
    if (event === "call_click" && GADS_CALL_LABEL) {
      w.gtag("event", "conversion", { send_to: `${GADS_ID}/${GADS_CALL_LABEL}` });
    }
    if (event === "service_request" && GADS_REQUEST_LABEL) {
      w.gtag("event", "conversion", { send_to: `${GADS_ID}/${GADS_REQUEST_LABEL}` });
    }
  }
}

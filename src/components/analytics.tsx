"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  analyticsEnabled,
  gaId,
  googleAdsId,
  trackCallClick,
  trackWhatsAppClick,
} from "@/lib/analytics";

/**
 * بارگذاری تگ گوگل (Ads + GA4) و ردیابی خودکار کلیک‌های تماس و واتساپ.
 * فقط زمانی فعال می‌شود که شناسه‌ها در متغیرهای محیطی تنظیم شده باشند.
 */
export function Analytics() {
  useEffect(() => {
    if (!analyticsEnabled) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackCallClick(anchor.dataset.source ?? "other");
        return;
      }
      if (href.includes("wa.me") || href.includes("whatsapp")) {
        trackWhatsAppClick("link");
      }
    };

    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!analyticsEnabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId || gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
${gaId ? `gtag('config', '${gaId}');` : ""}
`}
      </Script>
    </>
  );
}

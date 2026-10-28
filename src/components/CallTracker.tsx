"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

/** ثبت کلیک روی همه دکمه‌های تماس (tel:) به‌عنوان رویداد تبدیل تبلیغاتی call_click */
export default function CallTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (link) {
        trackEvent("call_click", {
          phone: link.getAttribute("href")?.replace("tel:", ""),
          page_path: window.location.pathname,
        });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

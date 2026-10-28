"use client";

import { useEffect } from "react";
import { captureAttribution, trackEvent } from "@/lib/track";

/** ثبت پارامترهای تبلیغاتی ورودی (gclid/UTM) و کلیک روی دکمه‌های تماس (call_click) */
export default function CallTracker() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackEvent("call_click", {
          phone: href.replace("tel:", ""),
          page_path: window.location.pathname,
        });
      } else if (href.includes("wa.me")) {
        trackEvent("messenger_click", { channel: "whatsapp", page_path: window.location.pathname });
      } else if (href.includes("t.me")) {
        trackEvent("messenger_click", { channel: "telegram", page_path: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

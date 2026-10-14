import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "سؤالات متداول امداد خودرو";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "خودرو چاره | امداد خودرو",
    title: "سؤالات متداول امداد خودرو",
    subtitle: "پاسخ شفاف به پرسش‌های تعرفه، زمان اعزام، پوشش جاده‌ای و شرایط خاص خودروها",
  });
}

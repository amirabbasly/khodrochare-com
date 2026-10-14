import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "درباره خودرو چاره";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "خودرو چاره | امداد خودرو",
    title: "درباره خودرو چاره",
    subtitle: "سامانه امداد خودرو با تمرکز بر تهران، استان تهران و جاده‌های کوهستانی شمال",
  });
}

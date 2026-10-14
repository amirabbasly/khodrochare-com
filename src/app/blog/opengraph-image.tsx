import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "راهنمای سفر و امداد جاده‌ای";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "خودرو چاره | امداد خودرو",
    title: "راهنمای سفر و امداد جاده‌ای",
    subtitle: "مقالات کاربردی برای سفر ایمن به شمال، نگهداری خودرو و مدیریت خرابی در جاده",
  });
}

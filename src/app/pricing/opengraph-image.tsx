import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "تعرفه و سیاست قیمت‌گذاری";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "خودرو چاره | امداد خودرو",
    title: "تعرفه و سیاست قیمت‌گذاری",
    subtitle: "تعرفه پیش از اعزام اعلام می‌شود؛ پرداخت پس از انجام خدمت و بدون هزینه پنهان",
  });
}

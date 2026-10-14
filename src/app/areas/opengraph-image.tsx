import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "مناطق تحت پوشش امداد خودرو";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "خودرو چاره | امداد خودرو",
    title: "مناطق تحت پوشش امداد خودرو",
    subtitle: "تهران، همه شهرهای استان تهران و شهرهای مسیر شمال؛ با زمان پاسخ تقریبی هر منطقه",
  });
}

import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "امداد خودرو تهران و آزادراه‌های شمال";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "خودرو چاره | امداد خودرو",
    title: "امداد خودرو تهران و آزادراه‌های شمال",
    subtitle: "«امداد خودرو» با اعزام ۲۴ ساعته در تهران، شهرهای استان تهران و محورهای شمال",
  });
}

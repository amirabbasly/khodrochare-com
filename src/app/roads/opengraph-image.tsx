import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "امداد خودرو در محورهای شمال";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "خودرو چاره | امداد خودرو",
    title: "امداد خودرو در محورهای شمال",
    subtitle: "آزادراه تهران-شمال، چالوس، هراز، فیروزکوه و آزادراه‌های تهران-قم و تهران-ساوه",
  });
}

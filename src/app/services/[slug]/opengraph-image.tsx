import { getService } from "@/data/services";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getService(slug);
  return renderOg({
    eyebrow: "خدمات امداد خودرو",
    title: item ? item.metaTitle : "خدمات امداد خودرو",
    subtitle: "اعزام تیم مجهز در تهران، شهرهای استان تهران و محورهای شمال — ۲۴ ساعته",
  });
}

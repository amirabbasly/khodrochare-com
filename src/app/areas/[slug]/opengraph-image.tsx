import { getArea } from "@/data/areas";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getArea(slug);
  return renderOg({
    eyebrow: "مناطق تحت پوشش",
    title: item ? item.metaTitle : "مناطق تحت پوشش",
    subtitle: "زمان پاسخ، محله‌ها و نکات محلی این محدوده در صفحه اختصاصی",
  });
}

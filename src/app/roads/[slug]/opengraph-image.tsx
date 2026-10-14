import { getRoad } from "@/data/roads";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getRoad(slug);
  return renderOg({
    eyebrow: "محورهای جاده‌ای",
    title: item ? item.metaTitle : "محورهای جاده‌ای",
    subtitle: "بازه‌های پرحادثه، تونل‌ها، قواعد تردد و زمان رسیدن امداد در این محور",
  });
}

import { getPost } from "@/data/posts";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPost(slug);
  return renderOg({
    eyebrow: "مقالات خودرو چاره",
    title: item ? item.title : "مقالات خودرو چاره",
    subtitle: "راهنمای کاربردی برای سفر ایمن و مدیریت خرابی خودرو در جاده",
  });
}

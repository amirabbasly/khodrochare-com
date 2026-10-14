import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "تماس با امداد خودرو";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "خودرو چاره | امداد خودرو",
    title: "تماس با امداد خودرو",
    subtitle: "خطوط پاسخ‌گویی ۲۴ ساعته، واتساپ برای ارسال لوکیشن و فرم درخواست امداد آنلاین",
  });
}

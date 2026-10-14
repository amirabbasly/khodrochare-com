import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "خدمات امداد خودرو";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "خودرو چاره | امداد خودرو",
    title: "خدمات امداد خودرو",
    subtitle: "۱۰ سرویس تخصصی: باتری، لاستیک، سوخت، قفل، یدک‌کش، تعمیر در محل، خودرو برقی و بیشتر",
  });
}

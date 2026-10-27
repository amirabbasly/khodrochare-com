import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://khodrochare.com"),
  title: "خودرو چاره | امداد خودرو و خدمات خودرو در محل — شبانه‌روزی",
  description:
    "خودرو چاره؛ تعمیر خودرو در محل، پنچرگیری در محل، خودروبر و یدک‌کش، تعویض باتری و برق خودرو در محل. امداد خودرو شبانه‌روزی تهران با یک تماس: ۰۲۱۹۱۸۵۵",
  keywords: [
    "خودرو چاره",
    "امداد خودرو",
    "تعمیر خودرو در محل",
    "پنچرگیری در محل",
    "خودروبر",
    "یدک‌کش",
    "باتری در محل",
    "برق خودرو در محل",
    "خدمات خودرو در محل",
  ],
  authors: [{ name: "خودرو چاره" }],
  creator: "خودرو چاره",
  publisher: "خودرو چاره",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "خودرو چاره",
    title: "خودرو چاره | یک تماس، یک چاره",
    description:
      "امداد خودرو و خدمات خودرو در محل به‌صورت شبانه‌روزی؛ تعمیر در محل، پنچرگیری، خودروبر، باتری و برق خودرو.",
    images: [
      {
        url: "/images/fleet.webp",
        width: 1600,
        height: 1060,
        alt: "ناوگان امدادی خودرو چاره",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col bg-navy-950">{children}</body>
    </html>
  );
}

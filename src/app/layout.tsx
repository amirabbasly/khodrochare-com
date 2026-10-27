import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";

const TITLE = "خودرو چاره | امداد خودرو تهران شبانه‌روزی — تعمیر، پنچرگیری و باتری در محل";
const DESCRIPTION =
  "امداد خودرو شبانه‌روزی خودرو چاره در تهران: مکانیک سیار و تعمیر خودرو در محل، پنچرگیری سیار، باتری‌به‌باتری و تعویض باتری در محل، برق خودرو، خودروبر و یدک‌کش با نرخ مصوب اتحادیه و ضمانت خدمت. تماس فوری: ۰۲۱۹۱۸۵۵";

export const metadata: Metadata = {
  metadataBase: new URL("https://khodrochare.com"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "خودرو چاره",
    "امداد خودرو تهران",
    "امداد خودرو شبانه روزی",
    "شماره امداد خودرو تهران",
    "مکانیک سیار تهران",
    "تعمیر خودرو در محل تهران",
    "پنچرگیری سیار تهران",
    "پنچرگیری در محل",
    "یدک کش شبانه روزی تهران",
    "خودروبر تهران",
    "باتری به باتری تهران",
    "تعویض باتری در محل",
    "باتری در محل",
    "برق خودرو در محل",
    "خدمات خودرو در محل تهران",
    "سرویس دوره ای خودرو در محل",
  ],
  authors: [{ name: "خودرو چاره" }],
  creator: "خودرو چاره",
  publisher: "خودرو چاره",
  category: "Automotive",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "خودرو چاره",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/fleet.webp",
        width: 1600,
        height: 1061,
        alt: "ناوگان امداد خودرو چاره — امداد خودرو شبانه‌روزی تهران",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/fleet.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col bg-paper">{children}</body>
    </html>
  );
}

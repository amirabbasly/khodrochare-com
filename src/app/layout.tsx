import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource-variable/vazirmatn";
import "./globals.css";

const TITLE = "خودرو چاره | امداد خودرو تهران شبانه‌روزی — تعمیر، پنچرگیری و باتری در محل";
const DESCRIPTION =
  "امداد خودرو شبانه‌روزی خودرو چاره در تهران: مکانیک سیار و تعمیر خودرو در محل، پنچرگیری سیار، باتری‌به‌باتری و تعویض باتری در محل، برق خودرو، خودروبر و یدک‌کش با نرخ مصوب اتحادیه و ضمانت خدمت. تماس فوری: ۰۹۱۲۳۰۲۲۰۶۴";

// آماده برای تبلیغات: با تنظیم این متغیرها در هاست، ردیابی فعال می‌شود (بدون نیاز به تغییر کد)
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
      <body className="flex min-h-full flex-col overflow-x-clip bg-paper">
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {GTM_ID && (
          <noscript>
            <iframe
              title="Google Tag Manager"
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}

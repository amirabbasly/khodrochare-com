import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StickyCallBar } from "@/components/layout/sticky-call";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { services } from "@/data/services";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { seoUrl, siteConfig } from "@/lib/site";

const vazirmatn = localFont({
  src: [
    {
      path: "./fonts/Vazirmatn-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(seoUrl("/")),
  title: {
    default: `${siteConfig.brand.fa} | امداد خودرو شبانه‌روزی تهران و آزادراه‌های شمال`,
    template: `%s | ${siteConfig.brand.fa}`,
  },
  description: siteConfig.brand.tagline,
  applicationName: siteConfig.brand.fa,
  authors: [{ name: siteConfig.brand.fa, url: seoUrl("/") }],
  creator: siteConfig.brand.fa,
  publisher: siteConfig.brand.fa,
  formatDetection: { telephone: true, address: true, email: true },
  category: "خودرو و امداد جاده‌ای",
  alternates: { canonical: seoUrl("/") },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: siteConfig.brand.fa,
    url: seoUrl("/"),
    title: `${siteConfig.brand.fa} | امداد خودرو شبانه‌روزی`,
    description: siteConfig.brand.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#080c1d",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white">
        <a
          href="#main"
          className="no-print sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-brand-400 focus:px-4 focus:py-2 focus:text-sm focus:font-extrabold focus:text-ink-950"
        >
          رفتن به محتوای اصلی
        </a>
        <JsonLd
          data={[
            organizationSchema({ services: services.map((service) => service.name) }),
            websiteSchema(),
          ]}
        />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyCallBar />
        <Analytics />
      </body>
    </html>
  );
}

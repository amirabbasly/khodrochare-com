import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BatteryShop from "@/components/BatteryShop";
import Pricing from "@/components/Pricing";
import WhyUs from "@/components/WhyUs";
import Steps from "@/components/Steps";
import RequestForm from "@/components/RequestForm";
import Reviews from "@/components/Reviews";
import SeoAbout from "@/components/SeoAbout";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import CallTracker from "@/components/CallTracker";
import { ALL_COVERAGE, FAQS, RATING_BASE, SERVICES, SITE } from "@/lib/data";

const totalRatings = Object.values(RATING_BASE).reduce((a, b) => a + b, 0);
const averageRating = (
  Object.entries(RATING_BASE).reduce((a, [star, count]) => a + Number(star) * count, 0) /
  totalRatings
).toFixed(1);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoRepair",
      "@id": "https://khodrochare.com/#business",
      name: SITE.name,
      alternateName: "امداد خودرو چاره",
      url: "https://khodrochare.com/",
      description:
        "خودرو چاره؛ امداد خودرو شبانه‌روزی و خدمات خودرو در محل در تهران: مکانیک سیار و تعمیر خودرو در محل، پنچرگیری سیار، باتری‌به‌باتری و تعویض باتری در محل، برق خودرو، خودروبر و یدک‌کش با نرخ مصوب اتحادیه و ضمانت خدمت.",
      image: "https://khodrochare.com/images/fleet.webp",
      logo: "https://khodrochare.com/images/logo.webp",
      telephone: "+98-912-302-2064",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+98-912-302-2064",
          contactType: "emergency",
          areaServed: "IR",
          availableLanguage: "fa",
        },
        {
          "@type": "ContactPoint",
          telephone: "+98-21-82801043",
          contactType: "customer service",
          areaServed: "IR",
          availableLanguage: "fa",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "تهران",
        addressRegion: "تهران",
        addressCountry: "IR",
      },
      geo: { "@type": "GeoCoordinates", latitude: 35.6892, longitude: 51.389 },
      areaServed: ["تهران بزرگ", ...ALL_COVERAGE],
      openingHours: "Mo-Su 00:00-24:00",
      currenciesAccepted: "IRR",
      paymentAccepted: "Cash, Credit Card, Debit Card",
      knowsAbout: [
        "امداد خودرو تهران",
        "مکانیک سیار تهران",
        "خرید باتری خودرو",
        "فروش باتری در محل",
        "تعویض باتری در محل",
        "پنچرگیری سیار",
        "یدک کش شبانه روزی",
        "تعمیر خودرو در محل",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: averageRating,
        reviewCount: totalRatings,
        bestRating: 5,
        worstRating: 1,
      },
      makesOffer: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          areaServed: "تهران",
          provider: { "@id": "https://khodrochare.com/#business" },
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": "https://khodrochare.com/#faq",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@type": "WebSite",
      "@id": "https://khodrochare.com/#website",
      url: "https://khodrochare.com/",
      name: SITE.name,
      inLanguage: "fa-IR",
      publisher: { "@id": "https://khodrochare.com/#business" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <BatteryShop />
        <Pricing />
        <WhyUs />
        <Steps />
        <RequestForm />
        <Reviews />
        <SeoAbout />
        <Faq />
      </main>
      <Footer />
      <MobileCallBar />
      <CallTracker />
    </>
  );
}

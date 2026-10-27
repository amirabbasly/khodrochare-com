import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Steps from "@/components/Steps";
import FleetAndCenter from "@/components/FleetAndCenter";
import WhyUs from "@/components/WhyUs";
import Faq from "@/components/Faq";
import RequestForm from "@/components/RequestForm";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import { SERVICES, SITE } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: SITE.name,
  slogan: SITE.slogan,
  description:
    "خودرو چاره؛ امداد خودرو و خدمات خودرو در محل به‌صورت شبانه‌روزی در تهران: تعمیر در محل، پنچرگیری در محل، خودروبر و یدک‌کش، باتری و برق خودرو در محل.",
  image: "/images/fleet.webp",
  logo: "/images/logo.webp",
  telephone: "+98-21-91855",
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+98-21-91855", contactType: "emergency", availableLanguage: "fa" },
    { "@type": "ContactPoint", telephone: "+98-21-82801043", contactType: "customer service", availableLanguage: "fa" },
  ],
  areaServed: "تهران",
  openingHours: "Mo-Su 00:00-24:00",
  makesOffer: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Steps />
        <FleetAndCenter />
        <WhyUs />
        <Faq />
        <RequestForm />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ChevronLeft, ClipboardList, Phone, Star } from "lucide-react";
import Header from "@/components/Header";
import BatteryShop from "@/components/BatteryShop";
import RequestForm from "@/components/RequestForm";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import CallTracker from "@/components/CallTracker";
import Reveal from "@/components/Reveal";
import { LANDINGS, RATING_BASE, SERVICES, SITE } from "@/lib/data";

const ICON_IMAGES: Record<string, string> = {
  repair: "/images/icons/repair.jpg",
  tire: "/images/icons/tire.jpg",
  tow: "/images/icons/tow.jpg",
  battery: "/images/icons/battery.jpg",
  electric: "/images/icons/electric.jpg",
  periodic: "/images/icons/periodic.jpg",
};

function getLanding(slug: string) {
  return LANDINGS.find((l) => l.slug === slug);
}

export function generateStaticParams() {
  return LANDINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const landing = getLanding(slug);
  if (!landing) return {};
  const icon = ICON_IMAGES[landing.serviceId];
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    keywords: landing.keywords,
    alternates: { canonical: `/${landing.slug}` },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: `/${landing.slug}`,
      siteName: SITE.name,
      title: landing.metaTitle,
      description: landing.metaDescription,
      images: [{ url: icon, width: 512, height: 512, alt: landing.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: landing.metaTitle,
      description: landing.metaDescription,
      images: [icon],
    },
  };
}

const totalRatings = Object.values(RATING_BASE).reduce((a, b) => a + b, 0);
const averageRating = (
  Object.entries(RATING_BASE).reduce((a, [star, count]) => a + Number(star) * count, 0) /
  totalRatings
).toLocaleString("fa-IR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default async function LandingPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const landing = getLanding(slug);
  if (!landing) notFound();

  const service = SERVICES.find((s) => s.id === landing.serviceId);
  if (!service) notFound();

  const icon = ICON_IMAGES[landing.serviceId];
  const others = LANDINGS.filter((l) => l.slug !== landing.slug);
  const isBattery = landing.serviceId === "battery";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://khodrochare.com/${landing.slug}#service`,
        name: service.title,
        description: landing.metaDescription,
        provider: { "@id": "https://khodrochare.com/#business" },
        areaServed: "تهران بزرگ",
        availableChannel: {
          "@type": "ServiceChannel",
          servicePhone: "+98-912-302-2064",
          serviceUrl: `https://khodrochare.com/${landing.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "خودرو چاره", item: "https://khodrochare.com/" },
          {
            "@type": "ListItem",
            position: 2,
            name: service.title,
            item: `https://khodrochare.com/${landing.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1">
        {/* هیرو لندینگ */}
        <section className="relative overflow-hidden bg-paper">
          <div className="dot-grid-light absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:pt-12">
            <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-silver-600">
              <Link href="/" className="transition hover:text-brand-600">
                خودرو چاره
              </Link>
              <ChevronLeft className="size-4" aria-hidden />
              <Link href="/#services" className="transition hover:text-brand-600">
                خدمات
              </Link>
              <ChevronLeft className="size-4" aria-hidden />
              <span className="text-navy-900">{service.title}</span>
            </nav>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <Reveal>
                  <span className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-1.5 text-[13px] font-bold text-white">
                    <span className="size-2 animate-pulse rounded-full bg-brand-400" aria-hidden />
                    {service.eta} — شبانه‌روزی در سراسر تهران
                  </span>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="mt-5 text-3xl font-black leading-snug text-navy-900 sm:text-4xl lg:text-[2.9rem] lg:leading-[1.3]">
                    {landing.h1}
                  </h1>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-4 max-w-xl text-lg leading-9 text-silver-600">{service.description}</p>
                </Reveal>
                <Reveal delay={240}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href={SITE.phoneShortHref}
                      className="ring-pulse flex items-center gap-2.5 rounded-2xl bg-brand-500 px-6 py-4 font-extrabold text-navy-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
                    >
                      <Phone className="size-5 shrink-0" aria-hidden />
                      تماس فوری
                      <span dir="ltr" className="text-lg leading-none">
                        {SITE.phoneShort}
                      </span>
                    </a>
                    <a
                      href="#request"
                      className="flex items-center gap-2.5 rounded-2xl border-2 border-navy-900 px-6 py-[14px] font-extrabold text-navy-900 transition hover:bg-navy-900 hover:text-white"
                    >
                      <ClipboardList className="size-5 shrink-0" aria-hidden />
                      ثبت درخواست آنلاین
                    </a>
                    <a
                      href={SITE.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-2xl bg-[#1fa855] px-5 py-[15px] font-extrabold text-white transition hover:bg-[#25c05f]"
                    >
                      <Image
                        src="/images/icons/whatsapp.jpg"
                        alt=""
                        width={512}
                        height={512}
                        className="size-6 shrink-0 rounded-full object-cover"
                      />
                      ارسال لوکیشن در واتساپ
                    </a>
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <Link href="/#reviews" className="mt-7 inline-flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-navy-900/10 transition hover:ring-brand-500/50">
                    <span className="flex gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-brand-500 text-brand-500" />
                      ))}
                    </span>
                    <span className="text-sm font-extrabold text-navy-900">
                      امتیاز {averageRating} از ۵ — بر اساس {totalRatings.toLocaleString("fa-IR")} رضایت ثبت‌شده مشتریان
                    </span>
                  </Link>
                </Reveal>
              </div>

              <Reveal delay={150}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-3 rotate-2 rounded-[2.5rem] bg-brand-500/85" aria-hidden />
                  <Image
                    src={icon}
                    alt={landing.h1}
                    width={512}
                    height={512}
                    priority
                    className="relative w-full rounded-[2.5rem] object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-5 right-5 rounded-2xl bg-navy-900 px-4 py-3 text-white shadow-xl">
                    <p className="text-sm font-extrabold">{service.short}</p>
                    <p className="text-xs text-navy-200">اعلام هزینه قبل از اعزام + ضمانت خدمت</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* سکشن اختصاصی خرید باتری در لندینگ باتری */}
        {isBattery && <BatteryShop />}

        {/* جزئیات خدمت */}
        <section className="bg-white py-20" aria-label={`جزئیات ${service.title}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <Reveal className="lg:col-span-2">
                <h2 className="text-2xl font-black leading-snug text-navy-900 sm:text-3xl">
                  {service.title} با خودرو چاره چطور انجام می‌شود؟
                </h2>
                <div className="mt-5 space-y-5 text-[16px] leading-9 text-silver-600">
                  {landing.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 rounded-3xl bg-brand-50 px-6 py-5 ring-1 ring-brand-100">
                  <h3 className="font-black text-navy-900">هزینه {service.title} چطور محاسبه می‌شود؟</h3>
                  <p className="mt-2 text-[15px] font-medium leading-8 text-navy-800">
                    {landing.pricingNote}{" "}
                    <Link href="/#pricing" className="font-extrabold text-brand-600 hover:text-brand-500">
                      مشاهده تعرفه شفاف همه خدمات
                    </Link>
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="rounded-3xl bg-paper p-7 ring-1 ring-navy-900/5">
                  <h3 className="text-lg font-black text-navy-900">این خدمت شامل چیست؟</h3>
                  <ul className="mt-5 space-y-3.5">
                    {landing.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-[15px] font-semibold leading-7 text-navy-800">
                        <Check className="mt-1.5 size-5 shrink-0 text-brand-600" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={SITE.phoneShortHref}
                    className="mt-7 flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-3.5 font-extrabold text-navy-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
                  >
                    <Phone className="size-5 shrink-0" aria-hidden />
                    استعلام رایگان هزینه
                    <span dir="ltr">{SITE.phoneShort}</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <RequestForm defaultService={landing.serviceId} />

        {/* سایر خدمات */}
        <section className="bg-white py-20" aria-label="سایر خدمات خودرو چاره">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-center text-2xl font-black text-navy-900 sm:text-3xl">
                سایر خدمات خودرو چاره در محل
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {others.map((other, i) => {
                const otherService = SERVICES.find((s) => s.id === other.serviceId);
                if (!otherService) return null;
                return (
                  <Reveal key={other.slug} delay={i * 80}>
                    <Link
                      href={`/${other.slug}`}
                      className="group flex h-full flex-col rounded-3xl bg-paper p-5 ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-navy-900/10 hover:ring-brand-500/40"
                    >
                      <Image
                        src={ICON_IMAGES[other.serviceId]}
                        alt={`آیکون ${otherService.title}`}
                        width={512}
                        height={512}
                        className="size-14 rounded-2xl object-cover shadow-md shadow-navy-900/15 ring-1 ring-navy-900/10"
                      />
                      <span className="mt-4 flex-1 font-extrabold leading-7 text-navy-900">
                        {otherService.title}
                      </span>
                      <span className="mt-2 flex items-center gap-1.5 text-[13px] font-extrabold text-brand-600">
                        مشاهده و سفارش
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <Faq />
      </main>
      <Footer />
      <MobileCallBar />
      <CallTracker />
    </>
  );
}

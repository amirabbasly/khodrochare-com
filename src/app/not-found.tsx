import type { Metadata } from "next";
import Link from "next/link";
import { BtnLink } from "@/components/ui";
import { Icon } from "@/components/icons";
import { services } from "@/data/services";
import { roads } from "@/data/roads";
import { seoUrl, siteConfig, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد | امداد خودرو خودرو چاره",
  description:
    "این نشانی در سایت پیدا نشد. از میان خدمات امداد خودرو، مناطق تحت پوشش یا محورهای جاده‌ای مسیر خود را انتخاب کنید یا تماس بگیرید.",
  robots: { index: false, follow: true },
  alternates: { canonical: seoUrl("/") },
};

export default function NotFound() {
  const topServices = services.slice(0, 6);
  const topRoads = roads.slice(0, 4);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="wrap">
        <div className="mx-auto max-w-3xl text-center">
          <span className="nums inline-flex items-center rounded-full border border-alert-100 bg-alert-50 px-4 py-1.5 text-sm font-extrabold text-alert-600">
            ۴۰۴
          </span>
          <h1 className="mt-5 text-2xl leading-[1.6] sm:text-3xl">این صفحه پیدا نشد</h1>
          <p className="mt-4 text-[1.02rem] leading-9 text-ink-700">
            نشانی‌ای که وارد کرده‌اید وجود ندارد یا جابه‌جا شده است. اگر به امداد فوری نیاز دارید،
            معطل جست‌وجو در سایت نشوید؛ همین حالا تماس بگیرید.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <BtnLink href={telHref} variant="alert">
              <Icon name="phone" className="size-4" />
              <span className="nums">{siteConfig.contact.mobileDisplay}</span>
            </BtnLink>
            <BtnLink href={whatsappHref} variant="outline" external>
              ارسال موقعیت در واتساپ
            </BtnLink>
            <BtnLink href="/request" variant="outline">
              ثبت درخواست آنلاین
            </BtnLink>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-ink-900">
              <Icon name="wrench" className="size-5 text-brand-600" />
              خدمات پرتقاضا
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-bold text-ink-700 transition hover:text-brand-700"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-4 inline-block text-xs font-bold text-brand-700 underline"
            >
              همه خدمات امداد خودرو
            </Link>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-ink-900">
              <Icon name="road" className="size-5 text-brand-600" />
              محورهای شمال و مسیرهای اصلی
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {topRoads.map((road) => (
                <li key={road.slug}>
                  <Link
                    href={`/roads/${road.slug}`}
                    className="font-bold text-ink-700 transition hover:text-brand-700"
                  >
                    {road.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-4 text-xs font-bold">
              <Link href="/roads" className="text-brand-700 underline">
                همه محورها
              </Link>
              <Link href="/areas" className="text-brand-700 underline">
                مناطق تحت پوشش
              </Link>
              <Link href="/faq" className="text-brand-700 underline">
                سؤالات متداول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

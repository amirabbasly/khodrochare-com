"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { EXTRA_SERVICES, LANDINGS, SERVICES, SITE } from "@/lib/data";
import { trackEvent } from "@/lib/track";
import Reveal from "./Reveal";

/** آیکون‌های تصویری اختصاصی هر خدمت */
const ICON_IMAGES: Record<string, string> = {
  repair: "/images/icons/repair.jpg",
  tire: "/images/icons/tire.jpg",
  tow: "/images/icons/tow.jpg",
  battery: "/images/icons/battery.jpg",
  electric: "/images/icons/electric.jpg",
  periodic: "/images/icons/periodic.jpg",
};

export function selectService(id: string) {
  trackEvent("service_select", { service: id });
  window.dispatchEvent(new CustomEvent("khodrochare:select-service", { detail: id }));
  document.getElementById("request")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Services() {
  return (
    <section id="services" className="scroll-mt-28 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-[13px] font-extrabold text-brand-600 ring-1 ring-brand-100">
            خدمات خودرو چاره
          </span>
          <h2 className="mt-4 text-3xl font-black leading-snug text-navy-900 sm:text-4xl">
            هر خدمتی خودروتان لازم دارد، در محل شما انجام می‌شود
          </h2>
          <p className="mt-4 leading-8 text-silver-600">
            خدمت موردنیازتان را انتخاب کنید و درخواست ثبت کنید؛ نزدیک‌ترین تکنسین خودرو چاره با
            تجهیزات کامل اعزام می‌شود. هزینه هم پیش از اعزام، شفاف اعلام خواهد شد.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const iconSrc = ICON_IMAGES[service.id] ?? "/images/icons/repair.jpg";
            const landingSlug = LANDINGS.find((l) => l.serviceId === service.id)?.slug;
            return (
              <Reveal key={service.id} delay={(i % 3) * 100}>
                <article
                  id={`service-${service.id}`}
                  className="group flex h-full scroll-mt-32 flex-col rounded-3xl bg-paper p-6 ring-1 ring-navy-900/5 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-2xl hover:shadow-navy-900/10 hover:ring-brand-500/40"
                >
                  <div className="flex items-start justify-between">
                    <Image
                      src={iconSrc}
                      alt={`آیکون ${service.title}`}
                      width={512}
                      height={512}
                      className="size-16 shrink-0 rounded-2xl object-cover shadow-lg shadow-navy-900/20 ring-1 ring-navy-900/10 transition duration-300 group-hover:scale-105"
                    />
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-600 ring-1 ring-brand-100">
                      {service.eta}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-navy-900">
                    {landingSlug ? (
                      <Link href={`/${landingSlug}`} className="transition hover:text-brand-600">
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                  <p className="mt-1 text-[13px] font-bold text-brand-600">{service.short}</p>
                  <p className="mt-3 flex-1 text-[15px] leading-8 text-silver-600">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                        <Check className="size-4.5 shrink-0 text-brand-600" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => selectService(service.id)}
                    className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-500 hover:text-navy-950"
                  >
                    ثبت درخواست این خدمت
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-extrabold text-navy-900">خدمات دیگر خودرو چاره:</span>
            {EXTRA_SERVICES.map((item) => (
              <span
                key={item}
                className="rounded-full bg-navy-50 px-3.5 py-1.5 text-[13px] font-bold text-navy-800 ring-1 ring-navy-100"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        {/* عکس‌های مرکز تخصصی و نمایندگی مجاز خودرو چاره */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <figure className="group relative overflow-hidden rounded-[2rem] shadow-xl shadow-navy-900/10">
              <Image
                src="/images/workshop.webp"
                alt="کارگاه مجهز مرکز تخصصی تعمیرات خودرو چاره؛ خودرو روی جک دوستون در حال سرویس"
                width={739}
                height={415}
                className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-navy-950/85 px-6 py-4 text-white backdrop-blur-sm">
                <span className="flex items-center gap-3">
                  <Image
                    src="/images/icons/repair.jpg"
                    alt=""
                    width={512}
                    height={512}
                    className="size-11 shrink-0 rounded-xl object-cover ring-1 ring-white/20"
                  />
                  <span>
                    <span className="block font-extrabold">مرکز تخصصی تعمیرات خودرو چاره</span>
                    <span className="text-[13px] text-navy-200">
                      تعمیرگاه مجهز با جک‌های دوستون؛ سرویس و تعمیر تخصصی در مرکز
                    </span>
                  </span>
                </span>
                <a
                  href={SITE.phoneShortHref}
                  className="flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-extrabold text-navy-950 transition hover:bg-brand-400"
                >
                  <Phone className="size-4" aria-hidden />
                  <span dir="ltr">{SITE.phoneShort}</span>
                </a>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <figure className="group relative overflow-hidden rounded-[2rem] shadow-xl shadow-navy-900/10">
              <Image
                src="/images/center.webp"
                alt="مرکز و نمایندگی مجاز خودرو چاره"
                width={1600}
                height={1056}
                className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-navy-950/85 px-6 py-4 text-white backdrop-blur-sm">
                <span className="flex items-center gap-3">
                  <Image
                    src="/images/icons/technician.jpg"
                    alt=""
                    width={512}
                    height={512}
                    className="size-11 shrink-0 rounded-xl object-cover ring-1 ring-white/20"
                  />
                  <span>
                    <span className="block font-extrabold">مرکز خودرو چاره</span>
                    <span className="text-[13px] text-navy-200">
                      نمایندگی مجاز — پذیرش حضوری برای تعمیرهای تخصصی‌تر
                    </span>
                  </span>
                </span>
                <a
                  href={SITE.phoneMainHref}
                  className="flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-extrabold text-navy-950 transition hover:bg-brand-400"
                >
                  <Phone className="size-4" aria-hidden />
                  <span dir="ltr">{SITE.phoneMain}</span>
                </a>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

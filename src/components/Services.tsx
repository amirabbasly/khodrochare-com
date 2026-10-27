"use client";

import Image from "next/image";
import {
  ArrowLeft,
  BatteryCharging,
  Building2,
  CarFront,
  Check,
  ClipboardCheck,
  LifeBuoy,
  Phone,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { EXTRA_SERVICES, SERVICES, SITE } from "@/lib/data";
import Reveal from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  repair: Wrench,
  tire: LifeBuoy,
  tow: Truck,
  battery: BatteryCharging,
  electric: Zap,
  periodic: ClipboardCheck,
};

export function selectService(id: string) {
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
            const Icon = ICONS[service.id] ?? Wrench;
            return (
              <Reveal key={service.id} delay={(i % 3) * 100}>
                <article
                  id={`service-${service.id}`}
                  className="group flex h-full scroll-mt-32 flex-col rounded-3xl bg-paper p-6 ring-1 ring-navy-900/5 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-2xl hover:shadow-navy-900/10 hover:ring-brand-500/40"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-navy-900 text-brand-400 transition group-hover:bg-brand-500 group-hover:text-navy-950">
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-600 ring-1 ring-brand-100">
                      {service.eta}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-navy-900">{service.title}</h3>
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

        {/* عکس‌های ناوگان و مرکز خودرو چاره */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <figure className="group relative overflow-hidden rounded-[2rem] shadow-xl shadow-navy-900/10">
              <Image
                src="/images/fleet.webp"
                alt="ناوگان خودروهای امدادی خودرو چاره آماده اعزام"
                width={1600}
                height={1061}
                className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-navy-950/85 px-6 py-4 text-white backdrop-blur-sm">
                <span className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-navy-950">
                    <CarFront className="size-6" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-extrabold">ناوگان امداد خودرو چاره</span>
                    <span className="text-[13px] text-navy-200">
                      خودروهای امدادی مجهز، آماده اعزام شبانه‌روزی در تهران
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
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-navy-950">
                    <Building2 className="size-6" aria-hidden />
                  </span>
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

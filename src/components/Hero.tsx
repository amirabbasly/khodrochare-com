import Image from "next/image";
import { BadgeCheck, ClipboardList, MapPin, Phone, ShieldCheck, Star, Timer } from "lucide-react";
import { SITE, STATS } from "@/lib/data";
import Reveal from "./Reveal";

const TRUST = [
  { icon: ShieldCheck, text: "ضمانت خدمات و قطعه" },
  { icon: Timer, text: "رسیدن حدود ۳۰ دقیقه‌ای" },
  { icon: BadgeCheck, text: "فاکتور رسمی و قیمت شفاف" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <div className="dot-grid-light absolute inset-0" aria-hidden />
      <div className="absolute -top-24 left-1/4 size-72 rounded-full bg-brand-100 blur-3xl" aria-hidden />
      <div className="absolute bottom-0 right-0 size-80 rounded-full bg-navy-100 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* متن و شعار */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-1.5 text-[13px] font-bold text-white">
                <span className="size-2 animate-pulse rounded-full bg-brand-400" aria-hidden />
                امداد خودرو شبانه‌روزی تهران — خودرو چاره
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl font-black leading-[1.25] text-navy-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.2]">
                امداد خودرو شبانه‌روزی تهران
                <span className="block text-brand-600">تعمیر و خدمات خودرو در محل</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg leading-9 text-silver-600">
                خودرو چاره با ناوگان اختصاصی امداد خودرو در تهران، مکانیک سیار و تکنسین‌های مجرب را
                به محل شما می‌فرستد؛ تعمیر خودرو در محل، پنچرگیری سیار، باتری و برق خودرو، خودروبر و
                یدک‌کش شبانه‌روزی — هر ساعت از شبانه‌روز و در هر نقطه تهران، فقط با یک تماس یا ثبت
                درخواست آنلاین.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={SITE.phoneShortHref}
                  className="ring-pulse flex items-center gap-2.5 rounded-2xl bg-brand-500 px-6 py-4 font-extrabold text-navy-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
                >
                  <Phone className="size-5" aria-hidden />
                  تماس فوری با امداد
                  <span dir="ltr" className="text-lg leading-none">
                    {SITE.phoneShort}
                  </span>
                </a>
                <a
                  href="#request"
                  className="flex items-center gap-2.5 rounded-2xl border-2 border-navy-900 px-6 py-[14px] font-extrabold text-navy-900 transition hover:bg-navy-900 hover:text-white"
                >
                  <ClipboardList className="size-5" aria-hidden />
                  ثبت درخواست آنلاین
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {TRUST.map((item) => (
                  <li key={item.text} className="flex items-center gap-2 text-sm font-bold text-navy-800">
                    <item.icon className="size-5 text-brand-600" aria-hidden />
                    {item.text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* عکس ناوگان خودرو چاره */}
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-navy-900" aria-hidden />
              <div className="absolute -inset-3 -rotate-1 rounded-[2rem] bg-brand-500/85" aria-hidden />
              <Image
                src="/images/fleet.webp"
                alt="ناوگان خودروهای امدادی خودرو چاره"
                width={1600}
                height={1061}
                priority
                className="relative w-full rounded-[2rem] object-cover shadow-2xl"
              />

              {/* کارت رضایت مشتریان */}
              <a
                href="#reviews"
                className="float-soft absolute -top-5 right-4 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-navy-900/5 sm:right-8"
              >
                <span className="flex items-center gap-1" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-brand-500 text-brand-500" />
                  ))}
                </span>
                <span className="mt-1 block text-sm font-extrabold text-navy-900">
                  ۹۸٪ رضایت مشتریان
                </span>
                <span className="text-xs font-semibold text-brand-600">ثبت رضایت شما ←</span>
              </a>

              {/* کارت زمان رسیدن */}
              <div className="float-soft-delay absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-navy-900 px-4 py-3 text-white shadow-xl sm:left-8">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-500 text-navy-950">
                  <Timer className="size-6" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-extrabold">میانگین رسیدن: ۳۰ دقیقه</span>
                  <span className="flex items-center gap-1 text-xs text-navy-200">
                    <MapPin className="size-3.5" aria-hidden />
                    نزدیک‌ترین خودروی امداد اعزام می‌شود
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* نوار آمار */}
        <Reveal delay={150}>
          <dl className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-navy-100 shadow-xl shadow-navy-900/5 ring-1 ring-navy-900/5 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center bg-white px-4 py-6 text-center">
                <dd className="order-1 text-2xl font-black text-brand-600 sm:text-3xl">{stat.value}</dd>
                <dt className="order-2 mt-1.5 text-[13px] font-semibold text-silver-600">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import { BadgeCheck, Clock3, Phone, ShieldCheck, Timer, Wallet } from "lucide-react";
import { SITE, STATS } from "@/lib/data";
import Reveal from "./Reveal";

const TRUST = [
  { icon: Timer, text: "رسیدن سریع در تهران" },
  { icon: Wallet, text: "اعلام هزینه قبل از اعزام" },
  { icon: ShieldCheck, text: "ضمانت خدمت و قطعه" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-950">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      {/* نوارهای مورب الهام‌گرفته از پوشش خودروهای ناوگان */}
      <div className="pointer-events-none absolute -left-24 top-24 hidden h-64 w-10 -skew-x-[24deg] bg-brand-500/90 lg:block" aria-hidden />
      <div className="pointer-events-none absolute -left-8 top-24 hidden h-64 w-4 -skew-x-[24deg] bg-navy-600 lg:block" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-40 sm:px-6 sm:pt-44 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* متن اصلی */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-[13px] font-bold text-brand-300">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
                </span>
                امداد خودرو شبانه‌روزی خودرو چاره — همین حالا فعال است
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-6 text-4xl font-black leading-[1.15] text-white sm:text-5xl lg:text-[3.6rem]">
                خودرو خراب شده؟
                <span className="mt-2 block text-brand-500">یک تماس، یک چاره!</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-lg leading-9 text-silver-300">
                <strong className="font-bold text-white">خودرو چاره</strong> با ناوگان امدادی مجهز و
                تکنسین‌های مجرب، خدمات خودرو را در محل شما انجام می‌دهد؛ از تعمیر و پنچرگیری در محل
                تا باتری، برق خودرو و خودروبر — هر ساعت از شبانه‌روز، در سراسر تهران.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={SITE.phoneShortHref}
                  className="flex items-center gap-2.5 rounded-full bg-brand-500 px-7 py-3.5 text-base font-extrabold text-navy-950 shadow-[0_16px_36px_rgba(255,122,0,0.35)] transition hover:bg-brand-400"
                >
                  <Phone className="size-5" aria-hidden />
                  تماس فوری با امداد
                  <span dir="ltr">{SITE.phoneShort}</span>
                </a>
                <a
                  href="#request"
                  className="flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-bold text-white transition hover:border-brand-500 hover:text-brand-300"
                >
                  <BadgeCheck className="size-5 text-brand-400" aria-hidden />
                  ثبت درخواست خدمت
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-silver-300">
                {TRUST.map((item) => (
                  <li key={item.text} className="flex items-center gap-2">
                    <item.icon className="size-5 text-brand-400" aria-hidden />
                    {item.text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* تصویر ناوگان */}
          <Reveal delay={200} className="relative">
            <div className="relative">
              <div className="absolute -inset-3 -skew-x-3 rounded-[2rem] bg-navy-800" aria-hidden />
              <div className="absolute -inset-3 translate-x-4 translate-y-4 -skew-x-3 rounded-[2rem] border-2 border-brand-500/60" aria-hidden />
              <div className="relative overflow-hidden rounded-[1.7rem]">
                <Image
                  src="/images/fleet.webp"
                  alt="ناوگان خودروهای امدادی خودرو چاره آماده خدمت‌رسانی"
                  width={1600}
                  height={1060}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 bg-navy-950/10" aria-hidden />
              </div>

              <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-navy-900 shadow-[0_18px_40px_rgba(0,0,0,0.4)]">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Clock3 className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-lg font-black leading-5">میانگین ۳۰ دقیقه</p>
                  <p className="text-xs font-medium text-slate-500">زمان رسیدن امداد در تهران</p>
                </div>
              </div>

              <div className="absolute -top-5 left-5 hidden items-center gap-2 rounded-2xl bg-navy-900/95 px-4 py-2.5 text-sm font-bold text-white shadow-lg ring-1 ring-white/10 sm:flex">
                <ShieldCheck className="size-5 text-brand-400" aria-hidden />
                ضمانت خدمت خودرو چاره
              </div>
            </div>
          </Reveal>
        </div>

        {/* آمار */}
        <Reveal delay={150}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-navy-900 px-6 py-6 text-center">
                <dt className="order-2 mt-1 block text-[13px] font-medium text-silver-400">{stat.label}</dt>
                <dd className="text-3xl font-black text-brand-400">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="road-line relative h-1.5 w-full opacity-70" aria-hidden />
    </section>
  );
}

import Image from "next/image";
import { CarFront, MapPin, Phone, Satellite, Siren, Wrench } from "lucide-react";
import { SITE } from "@/lib/data";
import Reveal from "./Reveal";

const FLEET_POINTS = [
  {
    icon: CarFront,
    title: "ناوگان یکدست و مجهز",
    text: "خودروهای امدادی خودرو چاره با تجهیزات کامل مکانیکی، پنچرگیری و برق خودرو در نقاط مختلف شهر مستقر هستند.",
  },
  {
    icon: Siren,
    title: "اعزام از نزدیک‌ترین نقطه",
    text: "به‌محض ثبت درخواست، نزدیک‌ترین خودروی ناوگان به موقعیت شما اعزام می‌شود تا در کوتاه‌ترین زمان برسد.",
  },
  {
    icon: Satellite,
    title: "تکنسین‌های آموزش‌دیده",
    text: "کادر فنی خودرو چاره برای خودروهای ایرانی و خارجی دوره‌دیده‌اند و با یونیفرم و کارت شناسایی خدمت می‌رسانند.",
  },
];

const CENTER_POINTS = [
  "پذیرش خودرو برای تعمیرهای تخصصی موتور و گیربکس",
  "سرویس‌های دوره‌ای و بازدید کامل پیش از سفر",
  "تخصص در خودروهای ایرانی، چینی، کره‌ای و ژاپنی",
  "هماهنگی مستقیم با ناوگان امداد سیار خودرو چاره",
];

export default function FleetAndCenter() {
  return (
    <>
      {/* ناوگان امدادی */}
      <section id="fleet" className="scroll-mt-28 bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-extrabold tracking-wide text-brand-400">ناوگان امدادی</p>
              <h2 className="mt-3 text-3xl font-black leading-snug text-white sm:text-4xl">
                ناوگان خودرو چاره؛ همیشه آماده، در تمام شهر
              </h2>
              <p className="mt-4 text-base leading-9 text-silver-300">
                ده‌ها خودروی امدادی با نشان خودرو چاره روز و شب در سطح شهر فعال‌اند؛ کافی است یک تماس
                بگیرید تا نزدیک‌ترین آن‌ها راهی محل شما شود.
              </p>

              <div className="mt-9 space-y-6">
                {FLEET_POINTS.map((point, i) => (
                  <Reveal key={point.title} delay={i * 120}>
                    <div className="flex gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-navy-800 text-brand-400 ring-1 ring-white/10">
                        <point.icon className="size-6" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-extrabold text-white">{point.title}</h3>
                        <p className="mt-1 text-[15px] leading-8 text-silver-400">{point.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <figure className="relative">
                <div className="absolute -inset-3 skew-x-2 rounded-[2rem] bg-brand-500" aria-hidden />
                <div className="relative overflow-hidden rounded-[1.7rem]">
                  <Image
                    src="/images/fleet.webp"
                    alt="صف خودروهای امدادی ناوگان خودرو چاره"
                    width={1600}
                    height={1060}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <figcaption className="absolute bottom-4 right-4 rounded-2xl bg-navy-950/90 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/10">
                  ناوگان امدادی خودرو چاره — آماده اعزام شبانه‌روزی
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* مرکز خودرو چاره */}
      <section id="center" className="scroll-mt-28 bg-white text-navy-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <figure className="relative">
                <div className="dot-grid-light absolute -inset-6 rounded-[2rem]" aria-hidden />
                <div className="relative overflow-hidden rounded-[1.7rem] ring-1 ring-navy-900/10">
                  <Image
                    src="/images/center.webp"
                    alt="ساختمان مرکز و نمایندگی مجاز خودرو چاره"
                    width={1600}
                    height={1056}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <figcaption className="absolute -bottom-5 right-5 flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-2.5 text-sm font-extrabold text-navy-950 shadow-lg">
                  <MapPin className="size-5" aria-hidden />
                  نمایندگی مجاز مرکز خودرو چاره
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={120} className="order-1 lg:order-2">
              <p className="text-sm font-extrabold tracking-wide text-brand-600">مرکز خودرو چاره</p>
              <h2 className="mt-3 text-3xl font-black leading-snug sm:text-4xl">
                برای تعمیرهای سنگین‌تر، مرکز خودرو چاره پذیرای شماست
              </h2>
              <p className="mt-4 text-base leading-9 text-slate-600">
                بیشتر مشکلات خودرو در همان محل رفع می‌شود؛ اما اگر خودرو به تعمیر تخصصی نیاز داشته
                باشد، خودروبر ما آن را به «مرکز خودرو چاره» منتقل می‌کند تا زیر نظر تیم فنی و با
                قطعات استاندارد تعمیر شود. مرکز ما به‌عنوان نمایندگی مجاز، آماده پذیرش و
                خدمت‌رسانی حضوری به مشتریان است.
              </p>

              <ul className="mt-7 space-y-3.5">
                {CENTER_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] font-semibold">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Wrench className="size-3.5" aria-hidden />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={SITE.phoneMainHref}
                  className="flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-navy-800"
                >
                  <Phone className="size-4 text-brand-400" aria-hidden />
                  تماس با مرکز
                  <span dir="ltr">{SITE.phoneMain}</span>
                </a>
                <a
                  href="#request"
                  className="flex items-center gap-2 rounded-full border-2 border-navy-900 px-6 py-3 text-sm font-extrabold text-navy-900 transition hover:border-brand-500 hover:text-brand-600"
                >
                  رزرو نوبت یا درخواست امداد
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

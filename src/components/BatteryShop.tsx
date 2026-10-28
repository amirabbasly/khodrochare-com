"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, ClipboardList, Phone } from "lucide-react";
import { BATTERY_AMPS, BATTERY_CARS, SITE } from "@/lib/data";
import { selectService } from "./Services";
import { trackEvent } from "@/lib/track";
import Reveal from "./Reveal";

const POINTS = [
  "تست رایگان باتری و دینام قبل از خرید؛ اگر باتری سالم باشد چیزی نمی‌خرید",
  "باتری نو با گارانتی رسمی شرکتی (صبا باتری، سپاهان باتری، برنا، دورنا و برندهای معتبر)",
  "تحویل باتری فرسوده در محل و کسر مبلغ آن از فاکتور خرید",
  "نصب در محل و تست نهایی روشن شدن خودرو؛ پرداخت فقط بعد از نصب",
  "رسیدن و نصب در کمتر از یک ساعت در تهران؛ شبانه‌روزی حتی روزهای تعطیل",
];

export default function BatteryShop() {
  const [selected, setSelected] = useState<string>("");
  const car = BATTERY_CARS.find((c) => c.label === selected);

  const onSelect = (value: string) => {
    setSelected(value);
    if (value) trackEvent("battery_finder", { car: value });
  };

  return (
    <section id="battery" className="relative scroll-mt-28 overflow-hidden bg-navy-900 py-20 lg:py-24">
      <div className="dot-grid-dark absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* متن معرفی خرید باتری */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-1.5 text-[13px] font-extrabold text-navy-950">
                فروش و نصب باتری در محل — شبانه‌روزی
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl font-black leading-snug text-white sm:text-4xl">
                خرید باتری خودرو در تهران با نصب فوری در محل شما
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-[16px] leading-9 text-navy-100">
                برای خرید باتری ماشین دیگر لازم نیست دنبال باتری‌فروشی بگردید. خودرو چاره باتری
                مناسب خودروتان را با قیمت روز و گارانتی رسمی به محل شما می‌آورد، نصب می‌کند و باتری
                فرسوده را تحویل می‌گیرد. قیمت باتری خودرو پیش از اعزام تلفنی اعلام می‌شود و اگر
                تست رایگان نشان دهد باتری فعلی سالم است، فقط با شارژ یا باتری‌به‌باتری راه
                می‌افتید؛ بدون خرید اضافی.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <ul className="mt-6 space-y-3">
                {POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[15px] font-semibold leading-7 text-navy-100">
                    <Check className="mt-1.5 size-5 shrink-0 text-brand-400" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold text-white">آمپراژهای موجود:</span>
                {BATTERY_AMPS.map((amp) => (
                  <span
                    key={amp}
                    className="rounded-full bg-navy-800 px-3.5 py-1.5 text-[13px] font-bold text-navy-100 ring-1 ring-white/10"
                  >
                    {amp} آمپر
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ابزار انتخاب باتری مناسب خودرو */}
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
              <Image
                src="/images/icons/battery.jpg"
                alt="خرید باتری خودرو و تعویض باتری در محل با خودرو چاره"
                width={512}
                height={512}
                className="h-44 w-full object-cover sm:h-52"
              />
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-black text-navy-900">
                  باتری مناسب خودروی شما چند آمپره؟
                </h3>
                <p className="mt-1.5 text-sm leading-7 text-silver-600">
                  مدل خودرو را انتخاب کنید تا آمپراژ پیشنهادی را ببینید؛ انتخاب نهایی با تست رایگان
                  در محل تأیید می‌شود.
                </p>

                <label htmlFor="battery-car" className="mt-5 block text-sm font-extrabold text-navy-900">
                  مدل خودرو
                </label>
                <div className="relative mt-2">
                  <select
                    id="battery-car"
                    value={selected}
                    onChange={(e) => onSelect(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-navy-100 bg-paper px-4 py-3.5 text-[15px] font-semibold text-navy-900 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
                  >
                    <option value="">خودروی خود را انتخاب کنید…</option>
                    {BATTERY_CARS.map((c) => (
                      <option key={c.label} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-silver-500"
                    aria-hidden
                  />
                </div>

                {car ? (
                  <div className="mt-5 rounded-2xl bg-brand-50 px-5 py-4 ring-1 ring-brand-100" aria-live="polite">
                    <p className="text-sm font-bold text-navy-800">
                      باتری پیشنهادی برای {car.label}:
                      <span className="mr-2 text-xl font-black text-brand-600">{car.amp}</span>
                    </p>
                    <p className="mt-1 text-[13px] font-medium leading-6 text-silver-600">{car.note}</p>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl bg-paper px-5 py-4 text-sm font-semibold leading-7 text-silver-600 ring-1 ring-navy-100">
                    خودرو در فهرست نیست؟ با ما تماس بگیرید؛ باتری همه خودروهای ایرانی و خارجی موجود
                    است.
                  </div>
                )}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={SITE.phoneShortHref}
                    onClick={() => trackEvent("battery_call_click", { car: selected || "نامشخص" })}
                    className="ring-pulse flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-3.5 font-extrabold text-navy-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
                  >
                    <Phone className="size-5 shrink-0" aria-hidden />
                    تماس و استعلام قیمت باتری
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("battery_order_click", { car: selected || "نامشخص" });
                      selectService("battery");
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-5 py-3.5 font-extrabold text-white transition hover:bg-navy-800"
                  >
                    <ClipboardList className="size-5 shrink-0 text-brand-400" aria-hidden />
                    ثبت سفارش آنلاین باتری
                  </button>
                </div>
                <p className="mt-4 text-center text-xs font-semibold leading-6 text-silver-500">
                  فروش باتری در محل در سراسر تهران — تست و مشاوره رایگان:{" "}
                  <a href={SITE.phoneShortHref} className="font-extrabold text-brand-600">
                    <span dir="ltr">{SITE.phoneShort}</span>
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

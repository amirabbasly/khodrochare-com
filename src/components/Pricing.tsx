"use client";

import { BadgeCheck, Phone, ShieldCheck, Wallet } from "lucide-react";
import { PRICING, SITE } from "@/lib/data";
import { selectService } from "./Services";
import Reveal from "./Reveal";

const NOTES = [
  { icon: Wallet, text: "محاسبه قیمت بر اساس نرخ مصوب اتحادیه" },
  { icon: Phone, text: "اعلام هزینه پیش از اعزام؛ مشاوره تلفنی رایگان" },
  { icon: ShieldCheck, text: "بدون هزینه پنهان؛ فاکتور رسمی و ضمانت خدمت" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-28 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-[13px] font-extrabold text-brand-600 ring-1 ring-brand-100">
            تعرفه خدمات خودرو چاره
          </span>
          <h2 className="mt-4 text-3xl font-black leading-snug text-navy-900 sm:text-4xl">
            قیمت شفاف، پیش از اعزام اعلام می‌شود
          </h2>
          <p className="mt-4 leading-8 text-silver-600">
            در خودرو چاره قبل از حرکت خودروی امداد، هزینه خدمت را می‌دانید. تعرفه‌ها بر اساس نرخ
            مصوب اتحادیه محاسبه می‌شود و مبلغ نهایی بدون تأیید شما تغییر نمی‌کند.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl ring-1 ring-navy-900/10">
            <div className="hidden grid-cols-2 bg-navy-900 px-6 py-4 text-sm font-extrabold text-white sm:grid sm:px-8">
              <span>خدمت</span>
              <span>نحوه محاسبه هزینه</span>
            </div>
            <ul>
              {PRICING.map((row, i) => (
                <li
                  key={row.service}
                  className={`grid gap-1.5 px-6 py-4.5 sm:grid-cols-2 sm:gap-4 sm:px-8 ${
                    i % 2 === 0 ? "bg-paper" : "bg-white"
                  }`}
                >
                  <span className="flex items-center gap-2 font-extrabold text-navy-900">
                    <BadgeCheck className="size-5 shrink-0 text-brand-600" aria-hidden />
                    {row.service}
                  </span>
                  <span className="text-[15px] leading-7 text-silver-600">{row.basis}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {NOTES.map((note) => (
              <li key={note.text} className="flex items-center gap-2 text-sm font-bold text-navy-800">
                <note.icon className="size-5 shrink-0 text-brand-600" aria-hidden />
                {note.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.phoneShortHref}
              className="flex items-center gap-2.5 rounded-2xl bg-brand-500 px-6 py-3.5 font-extrabold text-navy-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
            >
              <Phone className="size-5" aria-hidden />
              استعلام رایگان قیمت
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
            <button
              type="button"
              onClick={() => selectService("tow")}
              className="rounded-2xl border-2 border-navy-900 px-6 py-3.5 font-extrabold text-navy-900 transition hover:bg-navy-900 hover:text-white"
            >
              استعلام هزینه خودروبر و یدک‌کش
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

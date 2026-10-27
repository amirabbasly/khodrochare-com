"use client";

import { useState } from "react";
import { ChevronDown, Headset } from "lucide-react";
import { FAQS, SITE } from "@/lib/data";
import Reveal from "./Reveal";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="scroll-mt-28 bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          <Reveal>
            <span className="inline-block rounded-full bg-navy-900 px-4 py-1.5 text-[13px] font-extrabold text-white">
              سوالات متداول
            </span>
            <h2 className="mt-4 text-3xl font-black leading-snug text-navy-900">
              پاسخ پرسش‌های شما درباره خودرو چاره
            </h2>
            <p className="mt-4 leading-8 text-silver-600">
              اگر سؤال دیگری دارید یا همین حالا به امداد نیاز دارید، کارشناسان خودرو چاره
              شبانه‌روزی پاسخگوی شما هستند.
            </p>
            <a
              href={SITE.phoneShortHref}
              className="mt-6 inline-flex items-center gap-2.5 rounded-2xl bg-brand-500 px-5 py-3.5 font-extrabold text-navy-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
            >
              <Headset className="size-5" aria-hidden />
              گفت‌وگو با کارشناس
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
          </Reveal>

          <div className="space-y-3.5 lg:col-span-2">
            {FAQS.map((faq, i) => {
              const open = openIndex === i;
              return (
                <Reveal key={faq.q} delay={i * 70}>
                  <div
                    className={`overflow-hidden rounded-3xl bg-white ring-1 transition ${
                      open ? "shadow-xl shadow-navy-900/8 ring-brand-500/50" : "ring-navy-900/5"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? -1 : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
                    >
                      <span className="text-[15px] font-extrabold text-navy-900 sm:text-base">
                        {faq.q}
                      </span>
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full transition ${
                          open ? "bg-brand-500 text-navy-950" : "bg-navy-50 text-navy-800"
                        }`}
                      >
                        <ChevronDown
                          className={`size-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                          aria-hidden
                        />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-[15px] leading-8 text-silver-600">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

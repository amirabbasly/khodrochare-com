"use client";

import { useState } from "react";
import { ChevronDown, Headset } from "lucide-react";
import { FAQS, SITE } from "@/lib/data";
import Reveal from "./Reveal";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="scroll-mt-28 bg-white text-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <p className="text-sm font-extrabold tracking-wide text-brand-600">پرسش‌های متداول</p>
            <h2 className="mt-3 text-3xl font-black leading-snug sm:text-4xl">
              هر سؤالی درباره امداد خودرو دارید، اینجاست
            </h2>
            <p className="mt-4 text-base leading-9 text-slate-600">
              پاسخ بیشتر پرسش‌های مشتریان خودرو چاره را اینجا جمع کرده‌ایم. اگر سؤال دیگری دارید،
              کارشناسان ما شبانه‌روزی پاسخگوی شما هستند.
            </p>
            <a
              href={SITE.phoneShortHref}
              className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-brand-500 px-6 py-3 text-sm font-extrabold text-navy-950 transition hover:bg-brand-400"
            >
              <Headset className="size-5" aria-hidden />
              گفت‌وگو با کارشناس خودرو چاره
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-3.5">
              {FAQS.map((faq, i) => {
                const open = openIndex === i;
                return (
                  <div
                    key={faq.q}
                    className={`overflow-hidden rounded-2xl ring-1 transition ${
                      open ? "bg-navy-900 ring-navy-900" : "bg-navy-50 ring-navy-900/5 hover:ring-brand-500/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? -1 : i)}
                      aria-expanded={open}
                      className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-right text-[15px] font-extrabold sm:text-base ${
                        open ? "text-white" : "text-navy-900"
                      }`}
                    >
                      {faq.q}
                      <ChevronDown
                        className={`size-5 shrink-0 transition-transform duration-300 ${
                          open ? "rotate-180 text-brand-400" : "text-brand-600"
                        }`}
                        aria-hidden
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`px-6 pb-6 text-[15px] leading-8 ${
                            open ? "text-silver-300" : "text-slate-600"
                          }`}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

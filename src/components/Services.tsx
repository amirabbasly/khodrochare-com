"use client";

import {
  ArrowLeft,
  BatteryCharging,
  Check,
  ClipboardCheck,
  LifeBuoy,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { EXTRA_SERVICES, SERVICES } from "@/lib/data";
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
    <section id="services" className="scroll-mt-28 bg-navy-50 text-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-extrabold tracking-wide text-brand-600">خدمات خودرو چاره</p>
          <h2 className="mt-3 text-3xl font-black leading-snug sm:text-4xl">
            خدمات خودرو در محل، بدون معطلی و دردسر
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            خدمت موردنیاز را انتخاب کنید؛ نزدیک‌ترین تکنسین خودرو چاره با تجهیزات کامل به محل شما
            اعزام می‌شود و هزینه پیش از شروع کار شفاف اعلام خواهد شد.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.id] ?? Wrench;
            return (
              <Reveal key={service.id} delay={(i % 3) * 120}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-navy-900/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(7,18,34,0.14)] hover:ring-brand-500/50">
                  <span
                    className="pointer-events-none absolute -left-3 -top-4 select-none text-[6.5rem] font-black leading-none text-navy-900/[0.045] transition group-hover:text-brand-500/10"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex items-start justify-between">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-navy-900 text-brand-400 transition group-hover:bg-brand-500 group-hover:text-navy-950">
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
                      {service.eta}
                    </span>
                  </div>

                  <h3 className="relative mt-5 text-xl font-extrabold">{service.title}</h3>
                  <p className="relative mt-1 text-[13px] font-semibold text-brand-600">
                    {service.short}
                  </p>
                  <p className="relative mt-3 flex-1 text-[15px] leading-8 text-slate-600">
                    {service.description}
                  </p>

                  <ul className="relative mt-4 space-y-2 text-sm font-medium text-navy-800">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-brand-500" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => selectService(service.id)}
                    className="relative mt-6 flex items-center justify-center gap-2 rounded-full border-2 border-navy-900 px-5 py-2.5 text-sm font-extrabold text-navy-900 transition hover:border-brand-500 hover:bg-brand-500 hover:text-navy-950"
                  >
                    ثبت درخواست این خدمت
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-sm font-bold text-navy-900">و همچنین:</span>
            {EXTRA_SERVICES.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-navy-800 ring-1 ring-navy-900/10"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

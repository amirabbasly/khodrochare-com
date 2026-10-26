import { MapPin, Quote, Star } from "lucide-react";
import { COVERAGE, TESTIMONIALS } from "@/lib/data";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <section className="bg-navy-50 text-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-extrabold tracking-wide text-brand-600">نظر مشتریان</p>
          <h2 className="mt-3 text-3xl font-black leading-snug sm:text-4xl">
            راننده‌هایی که خودرو چاره به کمک‌شان رسید
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} delay={i * 120}>
              <figure className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-navy-900/5 transition hover:shadow-[0_20px_45px_rgba(7,18,34,0.1)]">
                <Quote className="size-8 text-brand-500" aria-hidden />
                <div className="mt-3 flex gap-0.5" aria-label="امتیاز پنج از پنج">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-brand-500 text-brand-500" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-8 text-slate-600">
                  {item.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-dashed border-navy-900/10 pt-5">
                  <span className="flex size-11 items-center justify-center rounded-full bg-navy-900 text-base font-black text-brand-400">
                    {item.name.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold">{item.name}</span>
                    <span className="block text-xs font-medium text-slate-500">{item.car}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* مناطق تحت پوشش */}
        <Reveal delay={120}>
          <div className="mt-16 rounded-3xl bg-navy-900 p-8 text-center sm:p-10">
            <h3 className="flex items-center justify-center gap-2 text-xl font-black text-white">
              <MapPin className="size-6 text-brand-400" aria-hidden />
              مناطق تحت پوشش امداد خودرو چاره
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-silver-400">
              ناوگان خودرو چاره در سراسر تهران فعال است؛ از شمال تا جنوب و از شرق تا غرب شهر، یکی از
              خودروهای ما همیشه نزدیک شماست.
            </p>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {COVERAGE.map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-navy-800 px-4 py-1.5 text-[13px] font-semibold text-silver-300 ring-1 ring-white/10 transition hover:bg-brand-500 hover:text-navy-950"
                >
                  {area}
                </li>
              ))}
              <li className="rounded-full bg-brand-500 px-4 py-1.5 text-[13px] font-extrabold text-navy-950">
                و سایر مناطق تهران
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

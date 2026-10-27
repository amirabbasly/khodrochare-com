import { STEPS } from "@/lib/data";
import Reveal from "./Reveal";

const NUMBERS = ["۱", "۲", "۳", "۴"];

export default function Steps() {
  return (
    <section id="steps" className="scroll-mt-28 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-[13px] font-extrabold text-brand-600 ring-1 ring-brand-100">
            مراحل دریافت خدمت
          </span>
          <h2 className="mt-4 text-3xl font-black leading-snug text-navy-900 sm:text-4xl">
            فقط در چهار قدم، خودرو چاره کنار شماست
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div
            className="road-line-dark absolute inset-x-8 top-7 hidden h-1 lg:block"
            aria-hidden
          />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <li className="relative text-center">
                  <span className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-500 text-2xl font-black text-navy-950 shadow-lg shadow-brand-500/35 ring-8 ring-white">
                    {NUMBERS[i]}
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-navy-900">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-65 text-[15px] leading-8 text-silver-600">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

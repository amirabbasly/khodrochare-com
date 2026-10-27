import { STEPS } from "@/lib/data";
import Reveal from "./Reveal";

const NUMBERS = ["۱", "۲", "۳", "۴"];

export default function Steps() {
  return (
    <section id="steps" className="relative scroll-mt-28 overflow-hidden bg-navy-950">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-extrabold tracking-wide text-brand-400">نحوه درخواست</p>
          <h2 className="mt-3 text-3xl font-black leading-snug text-white sm:text-4xl">
            در چهار قدم ساده، امداد خودرو چاره بالای سر شماست
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="road-line absolute inset-x-0 top-8 hidden h-1 opacity-50 lg:block" aria-hidden />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 130}>
                <li className="relative text-center lg:text-right">
                  <span className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-full bg-brand-500 text-2xl font-black text-navy-950 ring-8 ring-navy-950 lg:mx-0">
                    {NUMBERS[i]}
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-white">{step.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-8 text-silver-400">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

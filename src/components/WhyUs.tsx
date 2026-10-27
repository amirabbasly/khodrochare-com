import { MapPin, ShieldCheck, Timer, Wallet, Wrench } from "lucide-react";
import { COVERAGE } from "@/lib/data";
import Reveal from "./Reveal";

const FEATURES = [
  {
    icon: Timer,
    title: "رسیدن سریع، حدود ۳۰ دقیقه",
    text: "خودروهای امداد خودرو چاره در نقاط مختلف تهران مستقرند؛ به‌محض ثبت درخواست، نزدیک‌ترین خودرو به سمت شما حرکت می‌کند.",
  },
  {
    icon: Wrench,
    title: "تکنسین‌های مجرب و مجهز",
    text: "تیم فنی خودرو چاره برای خودروهای ایرانی و خارجی آموزش دیده و با ابزار کامل و دستگاه دیاگ به محل می‌رسد.",
  },
  {
    icon: Wallet,
    title: "قیمت شفاف، بدون هزینه پنهان",
    text: "هزینه خدمت و قطعه پیش از شروع کار اعلام و با تأیید شما انجام می‌شود؛ در پایان هم فاکتور رسمی دریافت می‌کنید.",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت خدمات و قطعه",
    text: "همه خدمات خودرو چاره ضمانت اجرت دارد و قطعه‌هایی مثل باتری با گارانتی رسمی شرکت سازنده عرضه می‌شوند.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-28 bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy-900 px-4 py-1.5 text-[13px] font-extrabold text-white">
            چرا خودرو چاره؟
          </span>
          <h2 className="mt-4 text-3xl font-black leading-snug text-navy-900 sm:text-4xl">
            چون وقت و آرامش شما برای ما مهم است
          </h2>
          <p className="mt-4 leading-8 text-silver-600">
            خودرو چاره فقط یک امداد خودرو نیست؛ یک تیم آماده‌باش است که روز و شب کنار راننده‌های
            تهران می‌ایستد تا هیچ‌کس در راه نماند.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 100}>
              <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/8">
                <span className="flex size-13 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <feature.icon className="size-6.5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-navy-900">{feature.title}</h3>
                <p className="mt-2 text-[15px] leading-8 text-silver-600">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 rounded-[2rem] bg-navy-900 px-6 py-8 sm:px-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-500 text-navy-950">
                <MapPin className="size-6" aria-hidden />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-white">مناطق تحت پوشش خودرو چاره</h3>
                <p className="text-sm text-navy-200">
                  امداد شبانه‌روزی در سراسر تهران و حومه — هر کجا باشید، خودرو چاره می‌رسد.
                </p>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="فهرست مناطق تحت پوشش">
              {COVERAGE.map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-navy-800 px-3.5 py-1.5 text-[13px] font-bold text-navy-100 ring-1 ring-white/10"
                >
                  {area}
                </li>
              ))}
              <li className="rounded-full bg-brand-500 px-3.5 py-1.5 text-[13px] font-extrabold text-navy-950">
                + تمام محله‌های تهران
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

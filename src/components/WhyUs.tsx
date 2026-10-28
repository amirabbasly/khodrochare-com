import Image from "next/image";
import { Check, X } from "lucide-react";
import { COVERAGE } from "@/lib/data";
import Reveal from "./Reveal";

const FEATURES = [
  {
    icon: "/images/icons/timer.jpg",
    title: "رسیدن سریع، حدود ۳۰ دقیقه",
    text: "خودروهای امداد خودرو چاره در نقاط مختلف تهران مستقرند؛ به‌محض ثبت درخواست، نزدیک‌ترین خودرو به سمت شما حرکت می‌کند.",
  },
  {
    icon: "/images/icons/technician.jpg",
    title: "تکنسین‌های مجرب و مجهز",
    text: "تیم فنی خودرو چاره برای خودروهای ایرانی و خارجی آموزش دیده و با ابزار کامل و دستگاه دیاگ به محل می‌رسد.",
  },
  {
    icon: "/images/icons/wallet.jpg",
    title: "قیمت شفاف، بدون هزینه پنهان",
    text: "هزینه خدمت و قطعه پیش از شروع کار اعلام و با تأیید شما انجام می‌شود؛ در پایان هم فاکتور رسمی دریافت می‌کنید.",
  },
  {
    icon: "/images/icons/shield.jpg",
    title: "ضمانت خدمات و قطعه",
    text: "همه خدمات خودرو چاره ضمانت اجرت دارد و قطعه‌هایی مثل باتری با گارانتی رسمی شرکت سازنده عرضه می‌شوند.",
  },
];

const COMPARE: { feature: string; us: string; others: string }[] = [
  {
    feature: "ناوگان و تکنسین",
    us: "ناوگان اختصاصی خودرو چاره با خودروی سازمانی، لباس فرم و کارت شناسایی",
    others: "افراد متفرقه و ناشناس، بدون هویت سازمانی مشخص",
  },
  {
    feature: "اعلام قیمت",
    us: "پیش از اعزام و طبق نرخ مصوب اتحادیه؛ در پایان فاکتور رسمی",
    others: "اغلب پس از انجام کار، سلیقه‌ای و بدون فاکتور",
  },
  {
    feature: "ضمانت خدمت و قطعه",
    us: "ضمانت اجرت خدمت و گارانتی رسمی قطعه‌هایی مثل باتری",
    others: "معمولاً بدون هیچ ضمانت کتبی",
  },
  {
    feature: "پاسخگویی و اعزام",
    us: "مستقیم توسط خود مجموعه، شبانه‌روزی و بدون واسطه و کمیسیون",
    others: "ارجاع سفارش به افراد مختلف و ناهماهنگی در زمان رسیدن",
  },
  {
    feature: "پیگیری بعد از خدمت",
    us: "مرکز و نمایندگی مجاز خودرو چاره برای پیگیری و تعمیر تخصصی",
    others: "بدون مرکز ثابت؛ بعد از خدمت پاسخگویی وجود ندارد",
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
            خودرو چاره واسطه نیست؛ ناوگان امدادی، تکنسین‌ها و مرکز خدمات متعلق به خود مجموعه است و
            شبانه‌روز در سراسر تهران پاسخگوی راننده‌هاست.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 100}>
              <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/8">
                <Image
                  src={feature.icon}
                  alt={`آیکون ${feature.title}`}
                  width={512}
                  height={512}
                  className="size-14 shrink-0 rounded-2xl object-cover shadow-lg shadow-navy-900/15 ring-1 ring-navy-900/10"
                />
                <h3 className="mt-4 text-lg font-extrabold text-navy-900">{feature.title}</h3>
                <p className="mt-2 text-[15px] leading-8 text-silver-600">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* مقایسه خودرو چاره با امدادهای متفرقه و واسطه‌ها */}
        <Reveal delay={100}>
          <div className="mt-14">
            <h3 className="text-center text-2xl font-black text-navy-900">
              تفاوت خودرو چاره با امدادهای متفرقه و واسطه‌ها
            </h3>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto rounded-3xl bg-white ring-1 ring-navy-900/10">
              <table className="w-full min-w-[560px] text-right text-[15px]">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th scope="col" className="px-5 py-4 font-extrabold sm:px-7">
                      ویژگی
                    </th>
                    <th scope="col" className="px-5 py-4 font-extrabold text-brand-400 sm:px-7">
                      خودرو چاره
                    </th>
                    <th scope="col" className="px-5 py-4 font-extrabold sm:px-7">
                      امدادهای متفرقه و واسطه‌ها
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-paper" : "bg-white"}>
                      <th scope="row" className="px-5 py-4 font-extrabold text-navy-900 sm:px-7">
                        {row.feature}
                      </th>
                      <td className="px-5 py-4 font-semibold leading-7 text-navy-800 sm:px-7">
                        <span className="flex items-start gap-2">
                          <Check className="mt-1 size-5 shrink-0 text-brand-600" aria-hidden />
                          {row.us}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium leading-7 text-silver-600 sm:px-7">
                        <span className="flex items-start gap-2">
                          <X className="mt-1 size-5 shrink-0 text-silver-400" aria-hidden />
                          {row.others}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 rounded-[2rem] bg-navy-900 px-6 py-8 sm:px-10">
            <div className="flex flex-wrap items-center gap-3">
              <Image
                src="/images/icons/tow.jpg"
                alt=""
                width={512}
                height={512}
                className="size-11 shrink-0 rounded-xl object-cover ring-1 ring-white/20"
              />
              <div>
                <h3 className="text-lg font-extrabold text-white">مناطق تحت پوشش خودرو چاره</h3>
                <p className="text-sm text-navy-200">
                  امداد شبانه‌روزی در سراسر تهران و حومه؛ نزدیک‌ترین خودروی امداد اعزام می‌شود.
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

import { ArrowLeft } from "lucide-react";
import { SERVICES } from "@/lib/data";
import Reveal from "./Reveal";

export default function SeoAbout() {
  return (
    <section className="bg-white py-20 lg:py-24" aria-labelledby="seo-about-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-[13px] font-extrabold text-brand-600 ring-1 ring-brand-100">
              درباره خدمات خودرو چاره در تهران
            </span>
            <h2
              id="seo-about-title"
              className="mt-4 text-3xl font-black leading-snug text-navy-900"
            >
              امداد خودرو در تهران؛ مکانیک سیار و خدمات خودرو در محل با خودرو چاره
            </h2>
            <div className="mt-5 space-y-5 text-[16px] leading-9 text-silver-600">
              <p>
                خرابی خودرو همیشه بی‌خبر سر می‌رسد؛ نیمه‌شب در بزرگراه، صبح زود در پارکینگ خانه یا
                وسط یک روز شلوغ کاری. <strong className="font-extrabold text-navy-900">خودرو چاره</strong> به‌عنوان
                مجموعه امداد خودرو شبانه‌روزی در تهران، با ناوگان اختصاصی و تکنسین‌های مجرب خودش به
                محل شما می‌آید تا بیشتر مشکل‌ها همان‌جا و بدون انتقال خودرو به تعمیرگاه رفع شود؛ از
                تعمیر خودرو در محل و مکانیک سیار تا پنچرگیری سیار، باتری‌به‌باتری و تعویض باتری در
                محل، برق خودرو و دیاگ سیار، و در صورت نیاز حمل ایمن با خودروبر و یدک‌کش شبانه‌روزی.
              </p>
              <p>
                برخلاف واسطه‌ها و اپلیکیشن‌های ارجاع سفارش، در خودرو چاره از لحظه تماس با
                {" "}
                <a href="tel:+982191855" className="font-extrabold text-brand-600 hover:text-brand-500">
                  <span dir="ltr">۰۲۱ ۹۱۸۵۵</span>
                </a>{" "}
                مستقیم با خود مجموعه طرف هستید: هزینه پیش از اعزام و بر اساس نرخ مصوب اتحادیه اعلام
                می‌شود، نزدیک‌ترین خودروی امدادی اعزام می‌شود و در پایان برای خدمت و قطعه، فاکتور
                رسمی و ضمانت دریافت می‌کنید. اگر تعمیر به تجهیزات تعمیرگاهی نیاز داشته باشد، خودرو
                با خودروبر به مرکز و نمایندگی مجاز خودرو چاره منتقل می‌شود.
              </p>
              <p>
                خدمات خودرو در محل خودرو چاره برای همه خودروها ارائه می‌شود؛ محصولات ایران‌خودرو و
                سایپا، خودروهای چینی مانند جک، چری و ام‌وی‌ام، و خودروهای کره‌ای، ژاپنی و اروپایی.
                شمال، جنوب، شرق یا غرب تهران و حومه ـ از سعادت‌آباد و نیاوران تا تهرانپارس، پیروزی،
                صادقیه و شهر ری ـ خودروهای امدادی ما در نقاط مختلف شهر مستقرند تا میانگین زمان رسیدن
                حدود ۳۰ دقیقه باشد.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <nav
              className="rounded-3xl bg-paper p-7 ring-1 ring-navy-900/5"
              aria-label="لینک سریع خدمات خودرو چاره"
            >
              <h3 className="text-lg font-black text-navy-900">خدمات خودرو چاره در تهران</h3>
              <ul className="mt-5 space-y-1.5">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <a
                      href={`#service-${service.id}`}
                      className="group flex items-center justify-between rounded-2xl px-4 py-3 font-bold text-navy-800 transition hover:bg-white hover:text-brand-600 hover:shadow-md hover:shadow-navy-900/5"
                    >
                      <span>
                        {service.title}
                        <span className="block text-[13px] font-semibold text-silver-500">
                          {service.eta}
                        </span>
                      </span>
                      <ArrowLeft
                        className="size-5 shrink-0 text-brand-600 transition-transform group-hover:-translate-x-1"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#pricing"
                className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-5 py-3.5 font-extrabold text-white transition hover:bg-navy-800"
              >
                مشاهده نحوه محاسبه تعرفه‌ها
                <ArrowLeft className="size-5" aria-hidden />
              </a>
            </nav>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

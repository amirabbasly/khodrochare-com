import { Check, Icon, TelegramIcon, WhatsAppIcon } from "@/components/icons";
import { RequestForm } from "@/components/forms/request-form";
import { siteConfig, telHref, telegramHref, whatsappHref } from "@/lib/site";

const trustPoints = [
  "اعزام شبانه‌روزی و بدون تعطیلی",
  "تعرفه شفاف پیش از اعزام",
  "پرداخت پس از انجام خدمت",
  "پوشش تهران، استان تهران و آزادراه‌های شمال",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 pb-16 pt-12 text-white sm:pb-20 sm:pt-16">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-10 size-[26rem] rounded-full bg-brand-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-[22rem] rounded-full bg-alert-500/10 blur-3xl"
        aria-hidden
      />

      <div className="wrap relative grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="animate-rise">
          <div className="inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-alert-500/40 bg-alert-500/10 px-3 py-1.5 text-xs font-extrabold text-alert-300">
              <span className="animate-beacon size-2 rounded-full bg-alert-500" />
              امداد فوری ۲۴ ساعته
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-ink-200">
              <Icon name="road" className="size-4 text-brand-300" />
              تهران، استان تهران و محورهای شمال
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-[1.55] text-white sm:text-4xl sm:leading-[1.5] lg:text-[2.6rem]">
            امداد خودرو {siteConfig.brand.fa}
            <span className="mt-3 block text-xl font-extrabold text-brand-300 sm:text-2xl">
              تهران، همه شهرهای استان و آزادراه‌های منتهی به شمال
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-[1.02rem] leading-9 text-ink-200">
            خودرو در خانه، خیابان، پارکینگ طبقاتی یا شانه آزادراه تهران-شمال از کار افتاده؟ تیم
            امداد ما با اعزام از نزدیک‌ترین پایگاه، باتری‌به‌باتری، پنچرگیری، سوخت‌رسانی، باز کردن
            قفل، یدک‌کشی و تعمیر در محل را انجام می‌دهد. یک تماس، و مشکل در همان محل حل می‌شود.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={telHref}
              data-source="cta"
              className="btn animate-pulse-ring bg-alert-500 px-5 py-3.5 text-white hover:bg-alert-600"
            >
              <Icon name="phone" className="size-5" />
              تماس فوری: <span className="nums">{siteConfig.contact.mobileDisplay}</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-trust-600 px-5 py-3.5 text-white hover:bg-trust-700"
            >
              <WhatsAppIcon className="size-5" />
              ارسال لوکیشن در واتساپ
            </a>
            <a
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/20 px-5 py-3.5 text-white hover:bg-white/[0.06]"
            >
              <TelegramIcon className="size-5" />
              تلگرام
            </a>
          </div>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-ink-200">
                <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-400/20 text-brand-300">
                  <Check className="size-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: siteConfig.stats.avgTehranMinutes + " دقیقه", label: "میانگین رسیدن در تهران" },
              { value: siteConfig.stats.avgRoadMinutes + " دقیقه", label: "میانگین رسیدن در جاده" },
              { value: siteConfig.stats.coveragePoints + " نقطه", label: "نقاط پوشش امداد" },
              { value: "۲۴/۷", label: "شبانه‌روزی و تعطیلات" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center"
              >
                <dt className="nums text-lg font-extrabold text-brand-300">{item.value}</dt>
                <dd className="mt-1 text-[0.7rem] leading-5 text-ink-300">{item.label}</dd>
              </div>
            ))}
          </dl>

          <p className="nums mt-4 text-xs text-ink-400">
            توجه: اعداد میانگین بر اساس تجربه امداد در بازه‌های پرتردد است و در شرایط جوی یا
            محدودیت‌های ترافیکی تغییر می‌کند.
          </p>
        </div>

        <div className="animate-rise lg:pt-2" style={{ animationDelay: "120ms" }}>
          <RequestForm compact contextLabel="صفحه اصلی" />
        </div>
      </div>
    </section>
  );
}

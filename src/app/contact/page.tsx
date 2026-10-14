import { Breadcrumbs } from "@/components/breadcrumbs";
import { RequestForm } from "@/components/forms/request-form";
import { Icon, MailIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { CtaBand, FaqSection } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/ui";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  mailHref,
  siteConfig,
  telHref,
  telLandlineHref,
  telegramHref,
  whatsappHref,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "تماس با امداد خودرو | شماره تماس شبانه‌روزی و پشتیبانی",
  description:
    "راه‌های تماس با امداد خودرو چاره: شماره تماس شبانه‌روزی، واتساپ برای ارسال لوکیشن، تلگرام و ایمیل. درخواست امداد در تهران، استان تهران و محورهای شمال.",
  path: "/contact",
  keywords: ["تماس با امداد خودرو", "شماره امداد خودرو تهران", "امداد خودرو شبانه", "پشتیبانی امداد خودرو"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([{ name: "تماس", path: "/contact" }]),
        ]}
      />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "تماس" }]} />
          <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">تماس با {siteConfig.brand.fa}</h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">
            برای درخواست امداد، سریع‌ترین راه تماس تلفنی است؛ خطوط ما ۲۴ ساعته و در تمام روزهای سال
            پاسخ می‌دهند. برای ارسال موقعیت دقیق، واتساپ گزینه سریع و دقیقی است.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href={telHref} className="card flex flex-col gap-3 p-5 transition hover:border-alert-100">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-alert-50 text-alert-600">
              <Icon name="phone" className="size-6" />
            </span>
            <h2 className="text-sm font-extrabold text-ink-900">امداد فوری (موبایل)</h2>
            <p className="nums text-sm font-bold text-ink-700">{siteConfig.contact.mobileDisplay}</p>
            <p className="text-xs text-ink-500">۲۴ ساعته، ۷ روز هفته</p>
          </a>

          <a href={telLandlineHref} className="card flex flex-col gap-3 p-5">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              <Icon name="phone" className="size-6" />
            </span>
            <h2 className="text-sm font-extrabold text-ink-900">تلفن دفتر</h2>
            <p className="nums text-sm font-bold text-ink-700">{siteConfig.contact.phoneDisplay}</p>
            <p className="text-xs text-ink-500">هماهنگی‌های اداری و قرارداد ناوگان</p>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex flex-col gap-3 p-5"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-trust-50 text-trust-700">
              <WhatsAppIcon className="size-6" />
            </span>
            <h2 className="text-sm font-extrabold text-ink-900">واتساپ</h2>
            <p className="text-sm font-bold text-ink-700">ارسال لوکیشن و عکس خودرو</p>
            <p className="text-xs text-ink-500">مناسب برای اعلام موقعیت دقیق در جاده</p>
          </a>

          <a
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex flex-col gap-3 p-5"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
              <TelegramIcon className="size-6" />
            </span>
            <h2 className="text-sm font-extrabold text-ink-900">تلگرام</h2>
            <p className="text-sm font-bold text-ink-700">@{siteConfig.contact.telegram}</p>
            <p className="text-xs text-ink-500">پاسخ‌گویی و ارسال موقعیت</p>
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5">
          <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
            <MailIcon className="size-6" />
          </span>
          <div>
            <h2 className="text-sm font-extrabold text-ink-900">ایمیل سازمانی</h2>
            <a href={mailHref} className="text-sm font-bold text-brand-700">
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="sm:mr-auto">
            <h2 className="text-sm font-extrabold text-ink-900">ساعات کاری</h2>
            <p className="text-sm text-ink-600">{siteConfig.hours}</p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <RequestForm contextLabel="صفحه تماس" />

          <div className="flex flex-col gap-4">
            <div className="card p-5">
              <h2 className="text-base font-extrabold text-ink-900">نشانی و محدوده خدمات</h2>
              <p className="mt-3 text-sm leading-7 text-ink-600">{siteConfig.address.fa}</p>
              <p className="mt-3 text-sm leading-7 text-ink-600">
                خدمات ما در تهران، همه شهرهای استان تهران، کرج و محورهای شمال (آزادراه تهران-شمال،
                چالوس، هراز و فیروزکوه) و همچنین آزادراه‌های تهران-قم، تهران-ساوه و کرج-قزوین ارائه
                می‌شود.
              </p>
            </div>

            <div className="card p-5">
              <h2 className="text-base font-extrabold text-ink-900">
                برای همکاری و قرارداد ناوگان
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-600">
                شرکت‌ها، آژانس‌های مسافرتی، پیمانکاران و مجموعه‌های دارای ناوگان می‌توانند برای
                قرارداد امداد دوره‌ای، سرویس چکاپ گروهی و پوشش اختصاصی محورها با تیم بازرگانی ما
                تماس بگیرند.
              </p>
            </div>

            <div className="rounded-3xl border border-brand-200 bg-brand-50 p-5">
              <h2 className="text-base font-extrabold text-brand-900">پیشنهاد و انتقاد</h2>
              <p className="mt-3 text-sm leading-7 text-ink-700">
                بازخورد شما مستقیماً به مدیر پشتیبانی ارجاع داده می‌شود و در بازبینی دوره‌ای
                فرایندها لحاظ می‌گردد.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="قبل از تماس"
          title="این پرسش‌ها را قبل از تماس بررسی کنید"
          description="اگر پاسخ سؤال شما در فهرست نیست، در تماس بپرسید؛ مشاوره اولیه رایگان است."
        />
      </Section>

      <FaqSection />
      <CtaBand />
    </>
  );
}

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ServiceCard } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { CtaBand, FaqSection } from "@/components/sections/blocks";
import { BtnLink, Section, SectionHeading } from "@/components/ui";
import { services } from "@/data/services";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/site";

export const metadata = buildMetadata({
  title: "خدمات امداد خودرو | باتری، یدک‌کش، پنچرگیری و تعمیر در محل",
  description:
    "فهرست کامل خدمات امداد خودرو چاره: باتری‌به‌باتری، پنچرگیری سیار، سوخت‌رسانی، باز کردن قفل، یدک‌کشی، تعمیر در محل، امداد خودرو برقی، امداد جاده‌ای، موتورسیکلت و چکاپ پیش از سفر.",
  path: "/services",
  keywords: [
    "خدمات امداد خودرو",
    "امداد خودرو در محل",
    "باتری به باتری",
    "یدک کش",
    "پنچرگیری سیار",
    "سوخت رسانی خودرو",
  ],
});

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          "خدمات امداد خودرو چاره",
          services.map((service) => ({ name: service.name, path: `/services/${service.slug}` })),
        )}
      />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "خدمات امداد" }]} />
          <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">
            خدمات امداد خودرو؛ هر مشکل، یک خدمت تخصصی
          </h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">
            همه خدمات امداد خودرو چاره بر یک اصل استوارند: حل مشکل در همان محل، بدون جابه‌جایی
            غیرضروری خودرو و بدون هزینه پنهان. تیم‌ها بر اساس نوع خرابی انتخاب می‌شوند؛ برای باتری
            و پنچری، تیم‌های سبک و سریع و برای یدک‌کشی و تعمیرات، خودروهای امداد مجهز اعزام
            می‌شوند.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BtnLink href={telHref} className="px-5 py-3.5">
              تماس با امداد
            </BtnLink>
            <BtnLink href="/request" variant="outline" className="px-5 py-3.5">
              ثبت درخواست آنلاین
            </BtnLink>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="۱۰ خدمت اصلی"
          title="انتخاب خدمت بر اساس خرابی خودرو"
          description="اگر مطمئن نیستید کدام خدمت لازم است، تماس بگیرید؛ کارشناس ما بر اساس علائمی که توصیف می‌کنید، خدمت درست را مشخص می‌کند."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="راهنمای انتخاب سریع"
          title="کدام خدمت برای مشکل شما مناسب است؟"
        />
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-ink-100 bg-white">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-ink-50 text-start">
              <tr>
                <th className="border-b border-ink-100 px-4 py-3 text-start font-extrabold text-ink-800">
                  نشانه‌ای که می‌بینید
                </th>
                <th className="border-b border-ink-100 px-4 py-3 text-start font-extrabold text-ink-800">
                  خدمت مناسب
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["خودرو استارت نمی‌خورد و چراغ‌ها ضعیف است", "باتری و باتری‌به‌باتری", "/services/battery"],
                ["چرخ خودرو باد ندارد یا پنچر است", "پنچرگیری سیار", "/services/tire"],
                ["مخزن سوخت خالی شده و به جایگاه نمی‌رسید", "سوخت‌رسانی سیار", "/services/fuel"],
                ["کلید داخل خودرو یا صندوق جا مانده", "باز کردن قفل خودرو", "/services/lockout"],
                ["خودرو روشن می‌شود ولی حرکت نمی‌کند یا تصادف کرده", "یدک‌کشی و حمل خودرو", "/services/tow"],
                ["خودرو داغ کرده، ریپ می‌زند یا چراغ چک روشن است", "تعمیر در محل", "/services/repair"],
                ["خودرو برقی یا هیبریدی روشن نمی‌شود یا شارژ ندارد", "امداد خودرو برقی", "/services/ev"],
                ["خودرو در آزادراه یا جاده کوهستانی متوقف شده", "امداد جاده‌ای و آزادراهی", "/services/roadside"],
                ["موتورسیکلت یا اسکوتر از کار افتاده", "امداد موتورسیکلت", "/services/motorcycle"],
                ["می‌خواهید پیش از سفر مطمئن شوید خودرو سالم است", "چکاپ پیش از سفر", "/services/pre-trip"],
              ].map(([symptom, service, href]) => (
                <tr key={symptom} className="odd:bg-white even:bg-ink-50/60">
                  <td className="border-b border-ink-100 px-4 py-3 leading-7 text-ink-700">
                    {symptom}
                  </td>
                  <td className="border-b border-ink-100 px-4 py-3 leading-7">
                    <a href={href} className="font-bold text-brand-700 hover:underline">
                      {service}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <FaqSection
        title="پرسش‌های متداول درباره خدمات امداد خودرو"
      />
      <CtaBand />
    </>
  );
}

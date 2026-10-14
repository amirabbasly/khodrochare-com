import { Icon } from "@/components/icons";
import { ServiceCard } from "@/components/cards";
import { CoverageExplorer } from "@/components/sections/coverage-explorer";
import { Hero } from "@/components/sections/hero";
import {
  AdvantagesSection,
  BlogTeaser,
  CaseStudiesSection,
  CtaBand,
  FaqSection,
  ProcessSection,
  RoadsSection,
  TrustStrip,
} from "@/components/sections/blocks";
import { BtnLink, Section, SectionHeading } from "@/components/ui";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { fa } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "امداد خودرو تهران و آزادراه‌های شمال | خودرو چاره ۲۴ ساعته",
  description:
    "امداد خودرو شبانه‌روزی در تهران، شهرهای استان تهران و آزادراه تهران-شمال، چالوس، هراز و فیروزکوه: باتری‌به‌باتری، پنچرگیری، سوخت‌رسانی، قفل، یدک‌کشی و تعمیر در محل با تعرفه شفاف.",
  path: "/",
  keywords: [
    "امداد خودرو",
    "امداد خودرو تهران",
    "امداد خودرو آزادراه تهران شمال",
    "امداد خودرو جاده چالوس",
    "امداد خودرو هراز",
    "یدک کش تهران",
    "باتری به باتری",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      <Section id="services">
        <SectionHeading
          eyebrow="خدمات امداد خودرو"
          title="هر خرابی، یک راه‌حل تخصصی دارد"
          description="از باتری خوابیده در پارکینگ تا خودروی داغ‌کرده در گردنه گدوک؛ هر خدمت با تیم و تجهیزات مخصوص خودش انجام می‌شود تا مشکل در همان محل حل شود."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BtnLink href="/services" variant="outline" className="px-5 py-3.5">
            جزئیات کامل خدمات
          </BtnLink>
          <BtnLink href="/pricing" className="px-5 py-3.5">
            سیاست تعرفه‌ها
          </BtnLink>
        </div>
      </Section>

      <AdvantagesSection />

      <Section tone="muted" id="coverage">
        <SectionHeading
          eyebrow="مناطق تحت پوشش"
          title="از تجریش تا پرند و از فشم تا ورامین"
          description="۲۲ منطقه و شهر اصلی، با پوشش ریز محله‌ها و روستاهای اطراف. نام شهر یا محله خود را جست‌وجو کنید تا زمان تقریبی اعزام را ببینید."
        />
        <div className="mt-10">
          <CoverageExplorer />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BtnLink href="/areas" variant="outline" className="px-5 py-3.5">
            فهرست کامل مناطق
          </BtnLink>
        </div>
      </Section>

      <RoadsSection />

      <ProcessSection />
      <CaseStudiesSection />

      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              align="start"
              eyebrow="تعرفه‌ها"
              title="تعرفه شفاف؛ بدون هزینه پنهان"
              description="سیاست ما ساده است: پیش از اعزام، هزینه را می‌دانید و پس از انجام خدمت پرداخت می‌کنید. عددی که در تماس توافق شود، در پایان همان عدد پرداخت می‌شود."
            />
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "اعلام هزینه پیش از اعزام، بر اساس منطقه و نوع خدمت",
                "قطعات و باتری با فاکتور رسمی و ضمانت",
                "عدم دریافت هزینه در صورت انجام نشدن خدمت",
                "بدون مازاد تعرفه شبانه و تعطیلات",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-ink-700">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-trust-100 text-trust-700">
                    <Icon name="shield" className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <BtnLink href="/pricing" className="px-5 py-3.5">
                مشاهده جزئیات تعرفه‌ها
              </BtnLink>
            </div>
          </div>

          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
            <h3 className="text-lg font-extrabold text-ink-900">
              چه چیزی بر هزینه امداد تأثیر دارد؟
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { t: "فاصله تا محل", d: "بر اساس نزدیک‌ترین پایگاه امداد محاسبه می‌شود." },
                { t: "نوع خدمت", d: "باتری، پنچری و سوخت با تعرفه پایه؛ یدک‌کشی با تعرفه مسافت." },
                { t: "نوع خودرو", d: "سواری، شاسی‌بلند یا وانت؛ ابزار لازم بر همین اساس تعیین می‌شود." },
                { t: "شرایط دسترسی", d: "پارکینگ طبقاتی، مسیر خاکی یا شانه آزادراه." },
              ].map((item) => (
                <div key={item.t} className="rounded-2xl bg-ink-50 p-4">
                  <p className="text-sm font-extrabold text-ink-800">{item.t}</p>
                  <p className="mt-1.5 text-xs leading-6 text-ink-600">{item.d}</p>
                </div>
              ))}
            </div>
            <p className="nums mt-4 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-xs leading-6 text-brand-800">
              میانگین رسیدن تیم امداد در تهران {fa(25)} دقیقه و در محورهای جاده‌ای {fa(45)} تا{" "}
              {fa(60)} دقیقه است.
            </p>
          </div>
        </div>
      </Section>

      <BlogTeaser />
      <FaqSection />
      <CtaBand />
    </>
  );
}

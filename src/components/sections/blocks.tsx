import Link from "next/link";
import { ArrowLeft, Icon } from "@/components/icons";
import { CorridorMap } from "@/components/sections/corridor-map";
import { FaqAccordion } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Badge, BtnLink, FeatureCard, Section, SectionHeading } from "@/components/ui";
import { RoadCard } from "@/components/cards";
import { roads } from "@/data/roads";
import { postsSorted } from "@/data/posts";
import { advantages, caseStudies, generalFaqs, requestSteps } from "@/data/site-content";
import type { QA } from "@/data/types";
import { faqSchema } from "@/lib/schema";
import { fa } from "@/lib/utils";
import { siteConfig, telHref, whatsappHref } from "@/lib/site";

export function TrustStrip() {
  const items = [
    { icon: "clock" as const, text: "پاسخ‌گویی و اعزام ۲۴ ساعته" },
    { icon: "wallet" as const, text: "تعرفه شفاف پیش از اعزام" },
    { icon: "shield" as const, text: "پرداخت پس از انجام خدمت" },
    { icon: "road" as const, text: "پوشش آزادراه‌های منتهی به شمال" },
    { icon: "pin" as const, text: "تیم‌های مستقر در ۹۶ نقطه امدادی" },
  ];

  return (
    <div className="border-b border-ink-100 bg-white">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-xs font-bold text-ink-600">
            <Icon name={item.icon} className="size-4.5 text-brand-500" />
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdvantagesSection() {
  return (
    <Section tone="dark">
      <SectionHeading
        tone="dark"
        eyebrow="چرا خودرو چاره"
        title="امدادی که برنامه دارد، نه وعده"
        description="در لحظه خرابی خودرو، مهم‌ترین چیز رسیدن سریع و مطلع بودن از هزینه است. ساختار امداد ما بر همین دو اصل بنا شده است."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((item) => (
          <FeatureCard key={item.title} {...item} tone="dark" />
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <BtnLink href={telHref} data-source="cta" variant="primary" className="px-5 py-3.5">
          <Icon name="phone" className="size-5" />
          تماس با امداد
        </BtnLink>
        <BtnLink href="/services" variant="white" className="border border-white/20 bg-transparent text-white hover:bg-white/[0.08]">
          مشاهده همه خدمات
          <ArrowLeft className="size-4" />
        </BtnLink>
      </div>
    </Section>
  );
}

export function RoadsSection() {
  return (
    <Section tone="dark" id="roads">
      <SectionHeading
        tone="dark"
        eyebrow="پوشش محورها"
        title="آزادراه‌ها و محورهای منتهی به شمال، زیر پوشش امداد"
        description="آزادراه تهران-شمال، جاده چالوس، هراز، فیروزکوه و محورهای غرب و جنوب؛ برای هر محور، نقاط پرخطر، زمان رسیدن امداد و نکات ایمنی را جداگانه بررسی کرده‌ایم."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <CorridorMap />
        <div className="grid gap-4 sm:grid-cols-2">
          {roads.slice(0, 4).map((road) => (
            <RoadCard key={road.slug} road={road} tone="dark" />
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {roads.slice(4).map((road) => (
          <Link
            key={road.slug}
            href={`/roads/${road.slug}`}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-ink-100 transition hover:border-brand-400/40"
          >
            <Icon name="road" className="size-4 text-brand-300" />
            {road.name}
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function ProcessSection() {
  return (
    <Section tone="muted" id="process">
      <SectionHeading
        eyebrow="فرایند امداد"
        title="از تماس تا حل مشکل، در پنج گام روشن"
        description="بدون سردرگمی و بدون هزینه پنهان؛ در هر گام دقیقاً می‌دانید چه اتفاقی می‌افتد و چه مبلغی پرداخت می‌کنید."
      />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {requestSteps.map((step, index) => (
          <li
            key={step.title}
            className="relative flex h-full flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5"
          >
            <span className="nums absolute -top-3 right-5 inline-flex size-8 items-center justify-center rounded-xl bg-brand-400 text-sm font-extrabold text-ink-950">
              {fa(index + 1)}
            </span>
            <Icon name={step.icon} className="mt-2 size-7 text-brand-600" />
            <h3 className="text-sm font-extrabold leading-6 text-ink-900">{step.title}</h3>
            <p className="text-xs leading-6 text-ink-600">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <BtnLink href={telHref} data-source="cta" className="px-5 py-3.5">
          <Icon name="phone" className="size-5" />
          تماس فوری با امداد
        </BtnLink>
        <BtnLink href="/request" variant="outline" className="px-5 py-3.5">
          ثبت درخواست آنلاین
        </BtnLink>
      </div>
    </Section>
  );
}

export function CaseStudiesSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="نمونه‌های واقعی از نوع درخواست‌ها"
        title="چه خرابی‌هایی را در محل حل می‌کنیم؟"
        description="این‌ها نمونه‌هایی از سناریوهای رایج امداد در تهران، استان تهران و محورهای شمال هستند؛ ترکیبی از خدماتی که بیشترین فراوانی را دارند."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((item) => (
          <article key={item.title} className="card flex h-full flex-col gap-3 p-5">
            <div className="flex items-center justify-between gap-3">
              <Badge tone="brand">{item.service}</Badge>
              <span className="flex items-center gap-1.5 text-xs text-ink-500">
                <Icon name="pin" className="size-3.5" />
                {item.location}
              </span>
            </div>
            <h3 className="text-sm font-extrabold leading-7 text-ink-900">{item.title}</h3>
            <p className="text-sm leading-7 text-ink-600">{item.detail}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function BlogTeaser() {
  const latest = postsSorted.slice(0, 3);
  return (
    <Section tone="muted">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading
          align="start"
          eyebrow="راهنمای سفر و خودرو"
          title="دانستی‌هایی که سفر شما را نجات می‌دهد"
          description="پیش از سفر به شمال، این راهنماها را بخوانید؛ بخش بزرگی از خرابی‌های جاده‌ای با چند بررسی ساده پیشگیری می‌شود."
        />
        <BtnLink href="/blog" variant="outline" className="shrink-0">
          همه مقالات
          <ArrowLeft className="size-4" />
        </BtnLink>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {latest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
          >
            <div className="flex items-center justify-between gap-3">
              <Badge tone="ink">{post.category}</Badge>
              <span className="nums text-xs text-ink-400">{fa(post.readingMinutes)} دقیقه</span>
            </div>
            <h3 className="text-base font-extrabold leading-7 text-ink-900 group-hover:text-brand-700">
              {post.title}
            </h3>
            <p className="line-clamp-3 text-sm leading-7 text-ink-600">{post.excerpt}</p>
            <span className="mt-auto text-xs font-bold text-brand-700">خواندن مقاله</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function FaqSection({ items = generalFaqs, title }: { items?: QA[]; title?: string }) {
  return (
    <Section id="faq">
      <JsonLd data={faqSchema(items)} />
      <SectionHeading
        eyebrow="پرسش‌های متداول"
        title={title ?? "سؤال‌هایی که پیش از تماس خوب است بدانید"}
        description="اگر پاسخ سؤال خود را پیدا نکردید، در تماس با امداد بپرسید؛ مشاوره تلفنی رایگان است."
      />
      <div className="mx-auto mt-10 max-w-3xl">
        <FaqAccordion items={items} />
      </div>
    </Section>
  );
}

export function CtaBand({
  title = "همین حالا خودروی شما در جاده است؟",
  description = "یک تماس کافی است؛ موقعیت را ثبت می‌کنیم، تعرفه را اعلام می‌کنیم و نزدیک‌ترین تیم امداد اعزام می‌شود.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-ink-950 py-14 text-white">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-l from-ink-900 to-ink-950 p-6 sm:p-10">
          <div className="road-stripes absolute inset-x-0 top-0 h-1.5 opacity-70" aria-hidden />
          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-2xl leading-[1.6] text-white sm:text-3xl">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-ink-200">{description}</p>
              <p className="nums mt-4 text-xs text-ink-400">
                پوشش: تهران و همه شهرهای استان تهران — آزادراه تهران-شمال، چالوس، هراز، فیروزکوه و
                محورهای غرب و جنوب
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={telHref}
                data-source="cta"
                className="btn animate-pulse-ring bg-alert-500 px-5 py-4 text-white hover:bg-alert-600"
              >
                <Icon name="phone" className="size-5" />
                <span className="nums">{siteConfig.contact.mobileDisplay}</span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-trust-600 px-5 py-4 text-white hover:bg-trust-700"
              >
                ارسال لوکیشن در واتساپ
              </a>
              <BtnLink href="/request" variant="outline" className="border-white/20 bg-transparent px-5 py-4 text-white hover:bg-white/[0.08]">
                فرم درخواست امداد
              </BtnLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

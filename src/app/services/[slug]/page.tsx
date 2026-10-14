import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqAccordion } from "@/components/faq";
import { ArrowLeft, Check, Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { UpdatedNote } from "@/components/updated-note";
import { CtaBand } from "@/components/sections/blocks";
import { Badge, BtnLink, CheckList, Section, SectionHeading } from "@/components/ui";
import { areaBySlug } from "@/data/areas";
import { roadBySlug } from "@/data/roads";
import { getService, services } from "@/data/services";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref, whatsappHref } from "@/lib/site";
import { fa } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return buildMetadata({
      title: "خدمت یافت نشد",
      description: "خدمت مورد نظر یافت نشد.",
      path: `/services/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedServices = service.relatedServices
    .map((item) => services.find((candidate) => candidate.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path: `/services/${service.slug}`,
            serviceType: service.shortName,
            areaServed: ["تهران", "استان تهران", "آزادراه تهران-شمال", "جاده چالوس", "جاده هراز", "جاده فیروزکوه"],
          }),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "خدمات امداد", path: "/services" },
            { name: service.shortName, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs
            trail={[
              { name: "خدمات امداد", path: "/services" },
              { name: service.shortName },
            ]}
          />
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">
                  <Icon name={service.icon} className="size-4" />
                  {service.tagline}
                </Badge>
                <Badge tone="trust">۲۴ ساعته و بدون تعطیلی</Badge>
              </div>
              <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">{service.name}</h1>
              <div className="mt-4 flex flex-col gap-3.5">
                {service.intro.map((paragraph) => (
                  <p key={paragraph} className="text-[1.02rem] leading-9 text-ink-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={telHref} className="btn animate-pulse-ring bg-alert-500 px-5 py-3.5 text-white">
                  <Icon name="phone" className="size-5" />
                  تماس فوری: <span className="nums">{siteConfig.contact.mobileDisplay}</span>
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-trust-600 px-5 py-3.5 text-white"
                >
                  ارسال لوکیشن در واتساپ
                </a>
                <BtnLink href="/request" variant="outline" className="px-5 py-3.5">
                  ثبت درخواست آنلاین
                </BtnLink>
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-base font-extrabold text-ink-900">در یک نگاه</h2>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-ink-500">زمان تقریبی رسیدن</dt>
                  <dd className="max-w-[62%] text-end font-bold text-ink-800">
                    {service.timeEstimate}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-ink-500">پوشش</dt>
                  <dd className="max-w-[62%] text-end font-bold text-ink-800">
                    تهران، استان تهران و محورهای شمال
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-ink-500">پرداخت</dt>
                  <dd className="max-w-[62%] text-end font-bold text-ink-800">
                    پس از انجام خدمت
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-ink-500">پشتیبانی</dt>
                  <dd className="max-w-[62%] text-end font-bold text-ink-800">{siteConfig.hours}</dd>
                </div>
              </dl>

              <div className="hairline my-4" />

              <h3 className="text-sm font-extrabold text-ink-800">خودروهای تحت پوشش</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {service.vehicles.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-6 text-ink-600">
                    <Check className="mt-1 size-3.5 shrink-0 text-trust-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-xl sm:text-2xl">این خدمت شامل چه مواردی است؟</h2>
            <CheckList items={service.includes} className="mt-5" />
          </div>
          <div className="rounded-3xl border border-ink-100 bg-ink-50 p-5">
            <h2 className="text-base font-extrabold text-ink-900">
              چه زمانی به این خدمت نیاز دارید؟
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {service.symptoms.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-ink-700">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-alert-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="فرایند انجام کار"
          title="از تماس تا تحویل، گام به گام"
          description="در هر مرحله می‌دانید چه اتفاقی می‌افتد؛ هیچ اقدام فنی بدون تأیید شما انجام نمی‌شود."
        />
        <ol className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
          {service.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5">
              <span className="nums inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-sm font-extrabold text-brand-800">
                {fa(index + 1)}
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-ink-900">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-ink-600">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-brand-200 bg-brand-50 p-6">
            <h2 className="text-lg font-extrabold text-brand-900">سیاست تعرفه و پرداخت</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {service.pricing.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-ink-700">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-brand-700">
                    <Icon name="wallet" className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <BtnLink href="/pricing" variant="outline" className="bg-white px-4 py-3 text-sm">
                مشاهده صفحه تعرفه‌ها
                <ArrowLeft className="size-4" />
              </BtnLink>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-ink-900">
              توصیه‌های کاربردی برای جلوگیری از تکرار مشکل
            </h2>
            <ol className="mt-4 flex flex-col gap-3">
              {service.tips.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-ink-700">
                  <span className="nums mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-xs font-extrabold text-ink-700">
                    {fa(index + 1)}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="سؤالات متداول"
          title={`پرسش‌های پرتکرار درباره ${service.shortName}`}
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <FaqAccordion items={service.faqs} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-base font-extrabold text-ink-900">خدمات مرتبط</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {relatedServices.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                  >
                    {item.shortName}
                    <ArrowLeft className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-extrabold text-ink-900">مناطق مرتبط</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {service.relatedAreas.map((slug) => {
                const area = areaBySlug.get(slug);
                if (!area) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/areas/${slug}`}
                      className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                    >
                      {area.name}
                      <ArrowLeft className="size-4" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-extrabold text-ink-900">محورهای مرتبط</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {service.relatedRoads.map((slug) => {
                const road = roadBySlug.get(slug);
                if (!road) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/roads/${slug}`}
                      className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                    >
                      {road.name}
                      <ArrowLeft className="size-4" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <UpdatedNote scope="خدمات این صفحه با تعرفه‌ها، سناریوهای رایج و تجهیزات اعزامی بازبینی شده است." />
      </Section>

      <CtaBand
        title={`نیاز به ${service.shortName} دارید؟`}
        description="موقعیت خود را اعلام کنید تا نزدیک‌ترین تیم امداد اعزام شود و تعرفه دقیق پیش از حرکت به شما اعلام گردد."
      />
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqAccordion } from "@/components/faq";
import { ArrowLeft, Check, Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { UpdatedNote } from "@/components/updated-note";
import { CtaBand } from "@/components/sections/blocks";
import { Badge, BtnLink, Section, SectionHeading } from "@/components/ui";
import { areas, getArea } from "@/data/areas";
import { roadBySlug } from "@/data/roads";
import { services } from "@/data/services";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref, whatsappHref } from "@/lib/site";
import { fa } from "@/lib/utils";

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) {
    return buildMetadata({
      title: "منطقه یافت نشد",
      description: "منطقه مورد نظر یافت نشد.",
      path: `/areas/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/areas/${area.slug}`,
    keywords: area.keywords,
  });
}

export default async function AreaPage({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const relatedAreas = area.relatedAreas
    .map((item) => areas.find((candidate) => candidate.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: `امداد خودرو ${area.name}`,
            description: area.metaDescription,
            path: `/areas/${area.slug}`,
            serviceType: "امداد خودرو و خدمات جاده‌ای",
            areaServed: [area.name, area.county, "تهران", "استان تهران"],
          }),
          faqSchema(area.faqs),
          breadcrumbSchema([
            { name: "مناطق تحت پوشش", path: "/areas" },
            { name: area.name, path: `/areas/${area.slug}` },
          ]),
        ]}
      />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs
            trail={[{ name: "مناطق تحت پوشش", path: "/areas" }, { name: area.name }]}
          />
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">
                  <Icon name="pin" className="size-4" />
                  {area.kind === "metropolis"
                    ? "پوشش همه مناطق ۲۲گانه"
                    : area.kind === "resort"
                      ? "منطقه ییلاقی و کوهستانی"
                      : `شهرستان ${area.county}`}
                </Badge>
                <Badge tone="trust">اعزام شبانه‌روزی</Badge>
              </div>
              <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">امداد خودرو {area.name}</h1>
              <div className="mt-4 flex flex-col gap-3.5">
                {area.intro.map((paragraph) => (
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
              <h2 className="text-base font-extrabold text-ink-900">مشخصات پوشش</h2>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-ink-500">میانگین اعزام</dt>
                  <dd className="font-bold text-ink-800">
                    {fa(area.responseTime.min)} تا {fa(area.responseTime.max)} دقیقه
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-ink-500">موقعیت</dt>
                  <dd className="max-w-[62%] text-end font-bold text-ink-800">
                    {area.kind === "metropolis"
                      ? "مرکز استان تهران"
                      : `فاصله حدود ${fa(area.distanceFromCenterKm)} کیلومتر از مرکز تهران`}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-ink-500">شهرستان</dt>
                  <dd className="max-w-[62%] text-end font-bold text-ink-800">{area.county}</dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-ink-500">پشتیبانی</dt>
                  <dd className="max-w-[62%] text-end font-bold text-ink-800">{siteConfig.hours}</dd>
                </div>
              </dl>

              <div className="hairline my-4" />

              <h3 className="text-sm font-extrabold text-ink-800">خدمات فعال در این منطقه</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {services.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-1.5 text-xs font-bold text-ink-600 transition hover:text-brand-700"
                    >
                      <Icon name={service.icon} className="size-3.5 text-brand-500" />
                      {service.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-700"
              >
                همه خدمات <ArrowLeft className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl sm:text-2xl">محله‌ها و مناطق تحت پوشش {area.name}</h2>
            <p className="mt-3 text-sm leading-8 text-ink-600">
              خدمات امداد در همه محله‌های زیر انجام می‌شود؛ اگر نام محله شما در فهرست نیست، تماس
              بگیرید تا امکان اعزام بررسی شود.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {area.neighborhoods.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-ink-200 bg-white px-3 py-1.5 text-xs font-bold text-ink-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl">نقاط شاخص و دسترسی‌ها</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {area.landmarks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-ink-700">
                  <Icon name="pin" className="mt-1 size-4 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
            {area.accessRoads.length > 0 ? (
              <>
                <h3 className="mt-6 text-sm font-extrabold text-ink-800">محورهای دسترسی</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {area.accessRoads.map((roadSlug) => {
                    const road = roadBySlug.get(roadSlug);
                    if (!road) return null;
                    return (
                      <Link
                        key={roadSlug}
                        href={`/roads/${roadSlug}`}
                        className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-bold text-brand-800 transition hover:bg-brand-100"
                      >
                        {road.name}
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Section>

      {area.zones.length > 0 ? (
        <Section tone="muted">
          <SectionHeading
            eyebrow="پوشش جزئی‌تر"
            title={`زیرناحیه‌های امدادی ${area.name}`}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {area.zones.map((zone) => (
              <div key={zone.name} className="card flex h-full flex-col gap-2 p-5">
                <h3 className="text-sm font-extrabold leading-7 text-ink-900">{zone.name}</h3>
                <p className="text-sm leading-7 text-ink-600">{zone.detail}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="text-xl sm:text-2xl">پرتکرارترین درخواست‌های امداد در این منطقه</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {area.commonIssues.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-ink-700">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-alert-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-ink-100 bg-ink-50 p-5 sm:p-6">
            <h2 className="text-base font-extrabold text-ink-900">
              نکات محلی که باید بدانید
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {area.localNotes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-7 text-ink-700">
                  <Check className="mt-1 size-4 shrink-0 text-trust-600" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-2xl border border-brand-200 bg-white p-4">
              <p className="flex items-center gap-2 text-xs font-extrabold text-brand-800">
                <Icon name="snow" className="size-4" />
                شرایط فصلی
              </p>
              <p className="mt-2 text-sm leading-7 text-ink-600">{area.seasonal}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="سؤالات متداول"
          title={`امداد خودرو در ${area.name}؛ پرسش‌های پرتکرار`}
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <FaqAccordion items={area.faqs} />
        </div>
      </Section>

      {relatedAreas.length > 0 ? (
        <Section>
          <h2 className="text-xl sm:text-2xl">مناطق مجاور و مرتبط</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedAreas.map((item) => (
              <Link
                key={item.slug}
                href={`/areas/${item.slug}`}
                className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white px-4 py-4 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                امداد خودرو {item.name}
                <ArrowLeft className="size-4" />
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="pt-0">
        <UpdatedNote scope="زمان پاسخ، محله‌ها، نکات محلی و محورهای دسترسی این محدوده بازبینی شده است." />
      </Section>

      <CtaBand
        title={`در ${area.name} به امداد خودرو نیاز دارید؟`}
        description="موقعیت دقیق خود را اعلام کنید؛ نزدیک‌ترین تیم امداد به محل شما اعزام می‌شود و تعرفه پیش از حرکت اعلام می‌گردد."
      />
    </>
  );
}

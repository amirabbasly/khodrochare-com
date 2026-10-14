import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqAccordion } from "@/components/faq";
import { ArrowLeft, Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { UpdatedNote } from "@/components/updated-note";
import { CtaBand } from "@/components/sections/blocks";
import { Badge, BtnLink, Section, SectionHeading } from "@/components/ui";
import { areaBySlug } from "@/data/areas";
import { getRoad, roads } from "@/data/roads";
import { postsSorted } from "@/data/posts";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref, whatsappHref } from "@/lib/site";
import { fa } from "@/lib/utils";

export function generateStaticParams() {
  return roads.map((road) => ({ slug: road.slug }));
}

export async function generateMetadata({ params }: PageProps<"/roads/[slug]">) {
  const { slug } = await params;
  const road = getRoad(slug);
  if (!road) {
    return buildMetadata({
      title: "محور یافت نشد",
      description: "محور مورد نظر یافت نشد.",
      path: `/roads/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: road.metaTitle,
    description: road.metaDescription,
    path: `/roads/${road.slug}`,
    keywords: road.keywords,
  });
}

export default async function RoadPage({ params }: PageProps<"/roads/[slug]">) {
  const { slug } = await params;
  const road = getRoad(slug);
  if (!road) notFound();

  const relatedAreas = road.relatedAreas
    .map((item) => areaBySlug.get(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedRoads = road.relatedRoads
    .map((item) => roads.find((candidate) => candidate.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedPosts = postsSorted
    .filter((post) => post.relatedRoads.includes(road.slug))
    .slice(0, 3);

  const kindLabel = {
    freeway: "آزادراه",
    "mountain-road": "محور کوهستانی",
    "urban-corridor": "محور شهری",
  }[road.kind];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: `امداد خودرو در ${road.name}`,
            description: road.metaDescription,
            path: `/roads/${road.slug}`,
            serviceType: "امداد خودرو جاده‌ای",
            areaServed: [road.from, road.to, road.name, "استان تهران"],
          }),
          faqSchema(road.faqs),
          breadcrumbSchema([
            { name: "آزادراه‌ها و محورها", path: "/roads" },
            { name: road.name, path: `/roads/${road.slug}` },
          ]),
        ]}
      />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "آزادراه‌ها و محورها", path: "/roads" }, { name: road.name }]} />
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">
                  <Icon name="road" className="size-4" />
                  {kindLabel}
                </Badge>
                <Badge tone="ink">
                  <span className="nums">{fa(road.lengthKm)} کیلومتر</span>
                </Badge>
                <Badge tone="trust">پوشش امدادی ۲۴ ساعته</Badge>
              </div>
              <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">
                امداد خودرو {road.name}
              </h1>
              <p className="mt-3 text-sm font-bold text-ink-500">{road.official}</p>
              <div className="mt-4 flex flex-col gap-3.5">
                {road.intro.map((paragraph) => (
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
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-base font-extrabold text-ink-900">زمان تقریبی رسیدن امداد</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {road.coverage.map((item) => (
                  <li key={item.range} className="flex items-start justify-between gap-3 text-sm">
                    <span className="max-w-[60%] leading-7 text-ink-600">{item.range}</span>
                    <span className="nums shrink-0 font-bold text-brand-700">{item.minutes}</span>
                  </li>
                ))}
              </ul>
              <div className="hairline my-4" />
              <h3 className="text-sm font-extrabold text-ink-800">مسیر</h3>
              <p className="mt-2 text-xs leading-6 text-ink-600">
                از {road.from} تا {road.to}
              </p>
              {road.tunnels.length > 0 ? (
                <>
                  <h3 className="mt-4 text-sm font-extrabold text-ink-800">تونل‌ها و نقاط خاص</h3>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {road.tunnels.map((tunnel) => (
                      <li key={tunnel} className="flex items-start gap-2 text-xs leading-6 text-ink-600">
                        <Icon name="tunnel" className="mt-0.5 size-3.5 shrink-0 text-brand-500" />
                        {tunnel}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <p className="nums mt-4 rounded-xl border border-alert-100 bg-alert-50 px-3 py-2 text-[0.7rem] leading-6 text-alert-700">
                زمان‌های بالا تقریبی است و در شرایط جوی، ترافیک و محدودیت‌های ترافیکی پایان هفته
                تغییر می‌کند.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="بازه‌های مسیر"
          title={`${road.name} از کجا تا کجا؟`}
          description="شناخت بازه‌ها به شما کمک می‌کند موقعیت دقیق خود را بهتر اعلام کنید و زمان رسیدن امداد را کوتاه‌تر کنید."
        />
        <ol className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
          {road.segments.map((segment, index) => (
            <li key={segment.name} className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5">
              <span className="nums inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-sm font-extrabold text-brand-800">
                {fa(index + 1)}
              </span>
              <div>
                <h3 className="text-sm font-extrabold leading-7 text-ink-900">{segment.name}</h3>
                <p className="mt-1.5 text-sm leading-7 text-ink-600">{segment.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl sm:text-2xl">نقاط پرتوقف و حادثه‌خیز</h2>
            <p className="mt-3 text-sm leading-8 text-ink-600">
              در این نقاط بیشترین درخواست امداد ثبت می‌شود؛ اگر خودروی شما در این محدوده‌ها متوقف
              شد، ایمن‌سازی محل را جدی بگیرید.
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {road.hotspots.map((spot) => (
                <li key={spot.name} className="rounded-2xl border border-ink-100 bg-white p-4">
                  <h3 className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
                    <Icon name="traffic" className="size-4 text-alert-500" />
                    {spot.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-7 text-ink-600">{spot.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-ink-100 bg-white p-5">
              <h2 className="flex items-center gap-2 text-base font-extrabold text-ink-900">
                <Icon name="shield" className="size-5 text-brand-600" />
                قوانین و محدودیت‌های تردد
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {road.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5 text-sm leading-7 text-ink-700">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-300" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-alert-100 bg-alert-50 p-5">
              <h2 className="flex items-center gap-2 text-base font-extrabold text-alert-700">
                <Icon name="snow" className="size-5" />
                ریسک‌های اصلی این محور
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {road.risks.map((risk) => (
                  <li key={risk} className="flex items-start gap-2.5 text-sm leading-7 text-ink-700">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-alert-500" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="اقدامات اضطراری"
          title="اگر خودروی شما در این محور متوقف شد"
          description="ترتیب این گام‌ها را رعایت کنید؛ در جاده‌های کوهستانی، ایمنی شما مهم‌تر از خودرو است."
        />
        <ol className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {road.emergencySteps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-2xl border border-ink-100 bg-white p-5 text-sm leading-7 text-ink-700"
            >
              <span className="nums inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-alert-100 text-xs font-extrabold text-alert-700">
                {fa(index + 1)}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="text-xl sm:text-2xl">شهرها و مناطق روی این محور</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {relatedAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white px-4 py-3.5 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                >
                  امداد خودرو {area.name}
                  <ArrowLeft className="size-4" />
                </Link>
              ))}
            </div>

            {relatedRoads.length > 0 ? (
              <>
                <h2 className="mt-8 text-lg font-extrabold text-ink-900">محورهای مرتبط</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {relatedRoads.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/roads/${item.slug}`}
                      className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-bold text-brand-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : null}

            {relatedPosts.length > 0 ? (
              <>
                <h2 className="mt-8 text-lg font-extrabold text-ink-900">راهنماهای مرتبط</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedPosts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                      >
                        {post.title}
                        <ArrowLeft className="size-4 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl">پرسش‌های متداول این محور</h2>
            <div className="mt-5">
              <FaqAccordion items={road.faqs} />
            </div>
            <div className="mt-6">
              <BtnLink href="/services/roadside" className="px-5 py-3.5">
                جزئیات امداد خودرو جاده‌ای
              </BtnLink>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <UpdatedNote scope="بازه‌ها، تونل‌ها، قواعد تردد و زمان‌های اعزام این محور بازبینی شده است." />
      </Section>

      <CtaBand
        title={`خودروی شما در ${road.name} متوقف شده؟`}
        description="موقعیت دقیق (کیلومتر، تونل یا نزدیک‌ترین شهر) را اعلام کنید؛ هماهنگی با پلیس راه و اعزام تیم را ما انجام می‌دهیم."
      />
    </>
  );
}

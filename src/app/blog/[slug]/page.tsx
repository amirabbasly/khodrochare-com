import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqAccordion } from "@/components/faq";
import { ArrowLeft, Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { UpdatedNote } from "@/components/updated-note";
import { CtaBand } from "@/components/sections/blocks";
import { Badge, BtnLink, Prose, Section, SectionHeading } from "@/components/ui";
import { areaBySlug } from "@/data/areas";
import { getPost, posts, postsSorted } from "@/data/posts";
import { roadBySlug } from "@/data/roads";
import { services } from "@/data/services";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref } from "@/lib/site";
import { fa } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return buildMetadata({
      title: "مقاله یافت نشد",
      description: "مقاله مورد نظر یافت نشد.",
      path: `/blog/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relatedServices = post.relatedServices
    .map((item) => services.find((candidate) => candidate.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedRoads = post.relatedRoads
    .map((item) => roadBySlug.get(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedAreas = post.relatedAreas
    .map((item) => areaBySlug.get(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const morePosts = postsSorted.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            keywords: post.keywords,
          }),
          faqSchema(post.faqs),
          breadcrumbSchema([
            { name: "وبلاگ", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <section className="border-b border-ink-100 bg-ink-50 py-10">
          <div className="wrap">
            <Breadcrumbs trail={[{ name: "وبلاگ", path: "/blog" }, { name: post.title }]} />
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge tone="brand">{post.category}</Badge>
              <Badge tone="ink">
                <span className="nums">{fa(post.readingMinutes)} دقیقه مطالعه</span>
              </Badge>
            </div>
            <h1 className="mt-4 max-w-4xl text-2xl leading-[1.65] sm:text-3xl">{post.title}</h1>
            <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">{post.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-ink-500">
              <span className="nums">انتشار: {fa(post.date)}</span>
              {post.updated ? <span className="nums">آخرین به‌روزرسانی: {fa(post.updated)}</span> : null}
              <span>نویسنده: تیم فنی {siteConfig.brand.fa}</span>
            </div>
          </div>
        </section>

        <Section>
          <div className="mx-auto max-w-3xl">
            <Prose blocks={post.blocks} />

            {post.faqs.length > 0 ? (
              <div className="mt-12">
                <SectionHeading
                  align="start"
                  eyebrow="پرسش‌های متداول"
                  title="سؤال‌های مرتبط با این مقاله"
                />
                <div className="mt-6">
                  <FaqAccordion items={post.faqs} />
                </div>
              </div>
            ) : null}

            <div className="mt-10 rounded-3xl border border-brand-200 bg-brand-50 p-5 sm:p-6">
              <h2 className="text-base font-extrabold text-brand-900">
                اگر همین حالا در جاده مانده‌اید
              </h2>
              <p className="mt-2 text-sm leading-7 text-ink-700">
                مطالعه این مقاله مفید است، اما اگر خودروی شما متوقف شده، سریع‌ترین راه تماس مستقیم
                است. موقعیت خود را بگویید تا نزدیک‌ترین تیم امداد اعزام شود.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={telHref} className="btn animate-pulse-ring bg-alert-500 px-5 py-3.5 text-white">
                  <Icon name="phone" className="size-5" />
                  <span className="nums">{siteConfig.contact.mobileDisplay}</span>
                </a>
                <BtnLink href="/request" variant="outline" className="bg-white px-5 py-3.5">
                  ثبت درخواست آنلاین
                </BtnLink>
              </div>
            </div>
          </div>
        </Section>

        <Section tone="muted">
          <div className="grid gap-8 lg:grid-cols-3">
            {relatedServices.length > 0 ? (
              <div>
                <h2 className="text-base font-extrabold text-ink-900">خدمات مرتبط</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                      >
                        {service.shortName}
                        <ArrowLeft className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {relatedRoads.length > 0 ? (
              <div>
                <h2 className="text-base font-extrabold text-ink-900">محورهای مرتبط</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedRoads.map((road) => (
                    <li key={road.slug}>
                      <Link
                        href={`/roads/${road.slug}`}
                        className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                      >
                        {road.name}
                        <ArrowLeft className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {relatedAreas.length > 0 ? (
              <div>
                <h2 className="text-base font-extrabold text-ink-900">مناطق مرتبط</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedAreas.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={`/areas/${area.slug}`}
                        className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                      >
                        امداد خودرو {area.name}
                        <ArrowLeft className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>

        <Section>
          <SectionHeading
            eyebrow="مطالب بیشتر"
            title="مقالات پیشنهادی برای ادامه"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {morePosts.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
              >
                <Badge tone="ink">{item.category}</Badge>
                <h3 className="text-sm font-extrabold leading-7 text-ink-900 group-hover:text-brand-700">
                  {item.title}
                </h3>
                <span className="mt-auto text-xs font-bold text-brand-700">خواندن مقاله</span>
              </Link>
            ))}
          </div>
        </Section>
      </article>

      <Section className="pt-0">
        <UpdatedNote scope="این مقاله بر اساس تجربه عملیاتی تیم‌های امداد و بازخورد کاربران بازبینی شده است." />
      </Section>

      <CtaBand />
    </>
  );
}

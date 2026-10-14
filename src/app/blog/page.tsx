import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/sections/blocks";
import { BtnLink, Section, SectionHeading } from "@/components/ui";
import { postsSorted } from "@/data/posts";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/site";

export const metadata = buildMetadata({
  title: "وبلاگ خودرو چاره | راهنمای سفر، ایمنی جاده و نگهداری خودرو",
  description:
    "مقالات کاربردی درباره سفر ایمن به شمال، آزادراه تهران-شمال، جاده چالوس، هراز و فیروزکوه، باتری خودرو، جوش آوردن در جاده، ایمنی تونل و نگهداری خودرو.",
  path: "/blog",
  keywords: [
    "راهنمای سفر به شمال",
    "ایمنی جاده",
    "نگهداری خودرو",
    "باتری خودرو",
    "جوش آوردن خودرو",
  ],
});

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          "مقالات خودرو چاره",
          postsSorted.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })),
        )}
      />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "وبلاگ" }]} />
          <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">
            وبلاگ خودرو چاره؛ راهنمای سفر و نگهداری خودرو
          </h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">
            تجربه هزاران درخواست امداد در تهران و محورهای شمال را به راهنمای عملی تبدیل کرده‌ایم:
            از انتخاب ساعت حرکت در جاده چالوس تا دلیل خالی شدن باتری در سرما. خواندن این مطالب
            می‌تواند شما را از توقف در جاده دور نگه دارد.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BtnLink href={telHref} className="px-5 py-3.5">
              تماس با امداد
            </BtnLink>
            <BtnLink href="/services/pre-trip" variant="outline" className="px-5 py-3.5">
              چکاپ پیش از سفر
            </BtnLink>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="آخرین مقالات"
          title="انتخاب موضوع بر اساس نیاز شما"
          description="اگر عجله دارید و خودرو در جاده متوقف شده، مستقیم تماس بگیرید؛ این مقالات برای پیشگیری و سفرهای بعدی مفیدند."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {postsSorted.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

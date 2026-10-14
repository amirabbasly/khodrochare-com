import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CoverageExplorer } from "@/components/sections/coverage-explorer";
import { CtaBand, FaqSection } from "@/components/sections/blocks";
import { BtnLink, Section, SectionHeading } from "@/components/ui";
import { areas } from "@/data/areas";
import { coverageByCounty } from "@/data/site-content";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/site";

export const metadata = buildMetadata({
  title: "مناطق تحت پوشش امداد خودرو | تهران و همه شهرهای استان تهران",
  description:
    "فهرست مناطق تحت پوشش امداد خودرو چاره: همه مناطق تهران، شمیرانات، لواسانات، پردیس، دماوند، فیروزکوه، ورامین، پاکدشت، ری، اسلامشهر، شهریار، قدس، ملارد، رباط‌کریم، بهارستان، کرج و محورهای شمال.",
  path: "/areas",
  keywords: [
    "مناطق تحت پوشش امداد خودرو",
    "امداد خودرو شهرهای استان تهران",
    "امداد خودرو تهران و حومه",
    "پوشش امداد خودرو",
  ],
});

export default function AreasIndexPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          "مناطق تحت پوشش امداد خودرو چاره",
          areas.map((area) => ({ name: area.name, path: `/areas/${area.slug}` })),
        )}
      />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "مناطق تحت پوشش" }]} />
          <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">
            مناطق تحت پوشش امداد خودرو؛ از تهران تا محورهای شمال
          </h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">
            پوشش ما فقط فهرستی از نام شهرها نیست؛ برای هر منطقه، پایگاه امداد، زمان تقریبی اعزام،
            معابر اصلی، نقاط شاخص و خرابی‌های پرتکرار همان محدوده را مطالعه و مستند کرده‌ایم. این
            یعنی وقتی درخواست می‌دهید، تیم امداد از پیش می‌داند کدام مسیر را انتخاب کند و چه
            تجهیزاتی لازم است.
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
          eyebrow="جست‌وجوی منطقه"
          title="نام شهر یا محله خود را جست‌وجو کنید"
          description="۲۲ صفحه اختصاصی منطقه‌ای و پوشش ریز محله‌ها، شهرک‌ها و روستاهای اطراف."
        />
        <div className="mt-10">
          <CoverageExplorer />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="فهرست کامل پوشش"
          title="همه شهرها، محله‌ها و مسیرهای تحت پوشش"
          description="این فهرست بر اساس شهرستان مرتب شده است و به‌طور مستمر به‌روزرسانی می‌شود. اگر منطقه شما در فهرست نیست، تماس بگیرید."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coverageByCounty.map((group) => (
            <div key={group.county} className="card flex h-full flex-col gap-3 p-5">
              <h3 className="text-sm font-extrabold text-ink-900">{group.county}</h3>
              <ul className="flex flex-col gap-1.5">
                {group.places.map((place) => {
                  const area = group.areaSlug
                    ? areas.find((candidate) => candidate.slug === group.areaSlug)
                    : undefined;
                  return (
                    <li key={place} className="text-xs leading-6 text-ink-600">
                      {area ? (
                        <Link
                          href={`/areas/${area.slug}`}
                          className="transition hover:text-brand-700"
                        >
                          {place}
                        </Link>
                      ) : (
                        place
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <FaqSection title="پرسش‌های متداول درباره پوشش مناطق" />
      <CtaBand />
    </>
  );
}

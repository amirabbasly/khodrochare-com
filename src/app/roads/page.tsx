import { Breadcrumbs } from "@/components/breadcrumbs";
import { RoadCard } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { CorridorMap } from "@/components/sections/corridor-map";
import { CtaBand, FaqSection } from "@/components/sections/blocks";
import { BtnLink, Section, SectionHeading } from "@/components/ui";
import { roads } from "@/data/roads";
import { itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/site";

export const metadata = buildMetadata({
  title: "امداد خودرو در آزادراه‌ها و جاده‌های شمال | تهران-شمال، چالوس، هراز",
  description:
    "امداد خودرو در آزادراه تهران-شمال، جاده چالوس (۵۹)، جاده هراز (۷۷)، جاده فیروزکوه و سوادکوه (۷۹)، آزادراه کرج-قزوین، قزوین-رشت، تهران-قم و تهران-ساوه؛ نقاط پرخطر و زمان رسیدن امداد.",
  path: "/roads",
  keywords: [
    "امداد خودرو آزادراه تهران شمال",
    "امداد خودرو جاده چالوس",
    "امداد خودرو جاده هراز",
    "امداد خودرو جاده فیروزکوه",
    "امداد خودرو محورهای شمال",
  ],
});

export default function RoadsIndexPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          "آزادراه‌ها و محورهای تحت پوشش امداد خودرو چاره",
          roads.map((road) => ({ name: road.name, path: `/roads/${road.slug}` })),
        )}
      />

      <section className="bg-ink-950 py-12 text-white">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "آزادراه‌ها و محورها" }]} />
          <h1 className="mt-4 text-2xl leading-[1.6] text-white sm:text-3xl">
            امداد خودرو در آزادراه‌ها و محورهای تهران به شمال
          </h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-200">
            توقف در محورهای کوهستانی، سخت‌ترین شرایط امداد را ایجاد می‌کند: دید محدود، شانه باریک،
            محدودیت تردد خودروبر و گاهی فاصله چند ده کیلومتری تا نزدیک‌ترین تعمیرگاه. برای هر محور،
            بازه‌های بحرانی، نقاط پرتوقف، قوانین تردد و زمان تقریبی رسیدن امداد را مستند کرده‌ایم.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BtnLink href={telHref} className="px-5 py-3.5">
              تماس فوری با امداد
            </BtnLink>
            <BtnLink
              href="/services/roadside"
              variant="outline"
              className="border-white/20 bg-transparent px-5 py-3.5 text-white hover:bg-white/[0.08]"
            >
              جزئیات امداد جاده‌ای
            </BtnLink>
          </div>
        </div>
      </section>

      <Section tone="dark">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <CorridorMap />
          <div>
            <SectionHeading
              align="start"
              tone="dark"
              eyebrow="نقشه پوشش"
              title="چهار محور اصلی، یک شبکه امدادی"
              description="آزادراه تهران-شمال سریع‌ترین مسیر به غرب مازندران است، جاده چالوس پرمنظره‌ترین و پرترافیک‌ترین، جاده هراز مسیر آمل و شرق مازندران و جاده فیروزکوه امن‌ترین گزینه برای سفرهای زمستانی. پوشش ما روی هر چهار محور فعال است."
            />
            <ul className="mt-6 flex flex-col gap-3 text-sm text-ink-200">
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400" />
                تیم‌های مستقر در بازه‌های پرتردد هر محور (ورودی، گردنه‌ها و بهره‌برداری‌ها)
              </li>
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400" />
                هماهنگی با پلیس راه و مرکز کنترل تونل برای توقف در باند و داخل تونل‌ها
              </li>
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400" />
                خودروبر سکویی برای خودروهای آسیب‌دیده و برقی در محدوده‌های مجاز
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="فهرست محورها"
          title="محور خود را انتخاب کنید"
          description="برای هر محور، جزئیات بازه‌ها، تونل‌ها و نقاط پرخطر، قوانین تردد، زمان تقریبی رسیدن امداد و گام‌های ایمنی در توقف اضطراری آمده است."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roads.map((road) => (
            <RoadCard key={road.slug} road={road} />
          ))}
        </div>
      </Section>

      <FaqSection title="پرسش‌های متداول درباره امداد در محورهای جاده‌ای" />
      <CtaBand
        title="خودروی شما در محور شمال متوقف شده؟"
        description="نام محور، کیلومتر یا نزدیک‌ترین شهر را اعلام کنید تا نزدیک‌ترین تیم امداد اعزام شود."
      />
    </>
  );
}

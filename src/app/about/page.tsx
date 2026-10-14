import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icons";
import { CtaBand, ProcessSection, TrustStrip } from "@/components/sections/blocks";
import { BtnLink, FeatureCard, Section, SectionHeading, StatCard } from "@/components/ui";
import { advantages } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref } from "@/lib/site";

export const metadata = buildMetadata({
  title: "درباره خودرو چاره | سامانه امداد خودرو تهران و جاده‌های شمال",
  description:
    "خودرو چاره، سامانه امداد خودرو با تیم‌های مستقر در تهران، شهرهای استان تهران و آزادراه‌های منتهی به شمال؛ با تمرکز بر تعرفه شفاف، اعزام سریع و تخصص جاده کوهستانی.",
  path: "/about",
  keywords: ["درباره خودرو چاره", "سامانه امداد خودرو", "امداد خودرو تهران", "خدمات امداد جاده‌ای"],
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "درباره ما" }]} />
          <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">
            درباره {siteConfig.brand.fa}
          </h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">
            {siteConfig.brand.fa} با یک هدف شکل گرفته است: امداد خودرویی که در لحظه خرابی، هم سریع
            باشد و هم قابل پیش‌بینی. ما بر این باوریم که در شرایط اضطراری، بزرگ‌ترین کمک به راننده
            این است که بداند چه اتفاقی می‌افتد، چه مدت طول می‌کشد و چقدر هزینه دارد.
          </p>
        </div>
      </section>

      <TrustStrip />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-5">
            <SectionHeading
              align="start"
              eyebrow="چه می‌کنیم"
              title="امداد خودرو در شهر، جاده و همه مسیرهای میان این دو"
              description="تمرکز ما روی تهران و استان تهران است و از آنجا مسیرهای منتهی به شمال؛ همان مسیرهایی که هر هفته هزاران خودرو را با خود می‌برند و بازمی‌گردانند."
            />
            <p className="text-[1.02rem] leading-9 text-ink-700">
              در عمل، این تمرکز یعنی تیم‌های ما فقط در مرکز شهر مستقر نیستند؛ در منطقه‌های مختلف
              تهران، شهرهای استان و بازه‌های کلیدی محورهای کوهستانی حضور دارند. وقتی درخواست ثبت
              می‌شود، نزدیک‌ترین تیم اعزام می‌شود، نه دورترین.
            </p>
            <p className="text-[1.02rem] leading-9 text-ink-700">
              این ساختار به ما اجازه می‌دهد در جاده‌های کوهستانی که فاصله‌ها زیاد و شرایط متغیر
              است، هم سریع‌تر عمل کنیم و هم دقیق‌تر تصمیم بگیریم؛ مثلاً در سربالایی‌های چالوس مشکل
              شایع جوش آوردن است و در گدوک، برف و باتری.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard
                value={siteConfig.stats.coveragePoints}
                label="نقطه پوشش امداد"
                hint="تهران، استان تهران و محورهای شمال"
                tone="light"
              />
              <StatCard
                value={`${siteConfig.stats.satisfaction}٪`}
                label="رضایت ثبت‌شده کاربران"
                hint="بر اساس پیگیری پس از انجام خدمات"
                tone="light"
              />
            </div>
            <p className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-xs leading-6 text-brand-800">
              شفاف‌سازی: اعداد این بخش شاخص‌های عملیاتی ما هستند و به‌صورت دوره‌ای بازبینی و
              به‌روزرسانی می‌شوند. با روش محاسبه هر شاخص، در صورت درخواست، در اختیار شما قرار
              می‌گیریم.
            </p>
          </div>

          <div className="card p-5">
            <h2 className="text-base font-extrabold text-ink-900">تجهیزات و توان تیم‌ها</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "خودروهای امداد مجهز به بوستر پک (حتی برای باتری‌های AGM)",
                "خودروبر سکویی و یدک‌کش کم‌ارتفاع برای پارکینگ‌های طبقاتی",
                "کیت پنچرگیری سیار با پرس هیدرولیک و تنظیم فشار باد",
                "ظرف سوخت استاندارد و تجهیزات ایمنی انتقال سوخت",
                "کیت باز کردن قفل بدون آسیب و ابزار مخصوص خودروهای جدید",
                "دستگاه دیاگ چندمنظوره برای خواندن کدهای خطا",
                "تجهیزات ویژه خودروهای برقی (دستکش عایق و اندازه‌گیری ولتاژ بالا)",
                "تجهیزات زمستانی: زنجیر چرخ، بیل، شن و ابزار خروج از برف",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-7 text-ink-700">
                  <Icon name="checklist" className="mt-1 size-4 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="ارزش‌های کاری"
          title="سه اصلی که در هر درخواست رعایت می‌کنیم"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.slice(0, 3).map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-ink-100 bg-white p-5 text-center">
          <p className="text-sm leading-8 text-ink-700">
            اگر در فرایند امداد احساس کردید هر یک از این سه اصل رعایت نشده، به ما اطلاع دهید. صدای
            شما تنها مکانیزم اصلاح کار ما است — نه بخشنامه.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <BtnLink href="/contact" variant="outline" className="px-4 py-3 text-sm">
              ثبت بازخورد
            </BtnLink>
            <BtnLink href={telHref} className="px-4 py-3 text-sm">
              تماس با مدیر پشتیبانی
            </BtnLink>
          </div>
        </div>
      </Section>

      <ProcessSection />
      <CtaBand />
    </>
  );
}

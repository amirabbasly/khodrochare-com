import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqAccordion } from "@/components/faq";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { CaseStudiesSection, CtaBand } from "@/components/sections/blocks";
import { Badge, BtnLink, Section, SectionHeading } from "@/components/ui";
import type { QA } from "@/data/types";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref } from "@/lib/site";

export const metadata = buildMetadata({
  title: "تعرفه امداد خودرو | سیاست قیمت‌گذاری شفاف و بدون هزینه پنهان",
  description:
    "تعرفه امداد خودرو چاره چگونه محاسبه می‌شود؟ اعلام هزینه پیش از اعزام، پرداخت پس از انجام خدمت، فاکتور رسمی قطعات و ضمانت. عوامل مؤثر بر قیمت امداد خودرو.",
  path: "/pricing",
  keywords: [
    "تعرفه امداد خودرو",
    "هزینه امداد خودرو در تهران",
    "قیمت یدک کش",
    "هزینه باتری به باتری",
    "قیمت پنچرگیری سیار",
  ],
});

const pricingFaqs: QA[] = [
  {
    q: "چرا شما قیمت ثابت اعلام نمی‌کنید؟",
    a: "چون هزینه واقعی امداد به فاصله شما تا نزدیک‌ترین پایگاه، نوع خدمت و شرایط دسترسی بستگی دارد. به‌جای اعلام عددی غیرواقعی، در همان تماس اول تعرفه دقیق موقعیت شما اعلام می‌شود و شما آزادید تصمیم بگیرید.",
  },
  {
    q: "اگر پس از رسیدن تیم، تصمیم گرفتم از خدمات استفاده نکنم؟",
    a: "هیچ اجباری برای انجام خدمت وجود ندارد. اگر فقط بازدید انجام شده باشد، تعرفه بازدید محاسبه می‌شود؛ این مبلغ هم پیش از اعزام به شما اعلام شده است.",
  },
  {
    q: "هزینه قطعات چگونه محاسبه می‌شود؟",
    a: "قطعات (باتری، لاستیک، شلنگ و…) بر اساس نرخ روز بازار و با فاکتور رسمی و ضمانت ارائه می‌شوند. در صورت رد کردن قطعه از سوی شما، فقط تعرفه امداد محاسبه می‌شود.",
  },
  {
    q: "برای امداد شبانه یا تعطیلات، هزینه بیشتری دریافت می‌کنید؟",
    a: "خیر. تعرفه شبانه و روز یکسان است و در تعطیلات هم مبلغ اضافه‌ای دریافت نمی‌شود.",
  },
  {
    q: "اگر خودرو تحت پوشش بیمه یا امداد خودروی بیمه‌نامه باشد؟",
    a: "پیش از پرداخت، امکان استفاده از سرویس امداد بیمه‌نامه خود را بررسی کنید. ما می‌توانیم گزارش کار را برای ارائه به بیمه در اختیار شما قرار دهیم.",
  },
  {
    q: "در چه شرایطی هزینه‌ای دریافت نمی‌شود؟",
    a: "اگر به‌دلیل انسداد مسیر، محدودیت‌های ترافیکی یا شرایط جوی، امداد انجام نشود، هیچ هزینه‌ای دریافت نمی‌شود.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqSchema(pricingFaqs)} />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "تعرفه‌ها" }]} />
          <Badge tone="brand">
            <Icon name="wallet" className="size-4" />
            شفافیت کامل قیمت
          </Badge>
          <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">
            تعرفه امداد خودرو؛ پیش از اعزام می‌دانید چقدر پرداخت می‌کنید
          </h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">
            در شرایط اضطراری، نگرانی درباره هزینه آخرین چیزی است که باید ذهن شما را مشغول کند. به
            همین دلیل سیاست ما ساده و روشن است: پیش از حرکت تیم، تعرفه دقیق را اعلام می‌کنیم و
            پرداخت را به پس از انجام خدمت می‌سپاریم.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BtnLink href={telHref} className="px-5 py-3.5">
              <Icon name="phone" className="size-5" />
              استعلام تعرفه: <span className="nums">{siteConfig.contact.mobileDisplay}</span>
            </BtnLink>
            <BtnLink href="/request" variant="outline" className="px-5 py-3.5">
              ثبت درخواست آنلاین
            </BtnLink>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "wallet" as const,
              title: "اعلام پیش از اعزام",
              text: "تعرفه در همان تماس اول اعلام می‌شود؛ بدون تغییر در پایان کار.",
            },
            {
              icon: "shield" as const,
              title: "پرداخت پس از خدمت",
              text: "پس از انجام کار و تأیید شما تسویه می‌شود.",
            },
            {
              icon: "checklist" as const,
              title: "فاکتور رسمی",
              text: "قطعات با فاکتور و ضمانت تحویل داده می‌شوند.",
            },
            {
              icon: "clock" as const,
              title: "بدون مازاد شبانه",
              text: "تعرفه شب، تعطیلات و روزهای عادی یکسان است.",
            },
          ].map((item) => (
            <div key={item.title} className="card flex flex-col gap-3 p-5">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Icon name={item.icon} className="size-6" />
              </span>
              <h2 className="text-sm font-extrabold text-ink-900">{item.title}</h2>
              <p className="text-sm leading-7 text-ink-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="چه چیزی بر هزینه اثر دارد؟"
          title="چهار عامل اصلی محاسبه تعرفه"
          description="این عوامل باعث می‌شوند هزینه امداد در هر درخواست متفاوت باشد. وقتی موقعیت خود را اعلام می‌کنید، هر چهار عامل را با هم حساب می‌کنیم و یک عدد نهایی به شما می‌گوییم."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {[
            {
              title: "۱. فاصله تا نزدیک‌ترین پایگاه",
              text: "امداد شهر تهران با امداد در گردنه گدوک از نظر مسافت و زمان یکسان نیست. تعرفه بر اساس فاصله واقعی پایگاه تا شما محاسبه می‌شود.",
            },
            {
              title: "۲. نوع خدمت",
              text: "خدمات در محل مثل باتری، پنچری و سوخت تعرفه پایه دارند؛ یدک‌کشی و حمل بر اساس مسافت محاسبه می‌شود.",
            },
            {
              title: "۳. نوع و وزن خودرو",
              text: "خودروی سواری، شاسی‌بلند، وانت و خودروی برقی هر کدام تجهیزات و رویه خاص خود را دارند.",
            },
            {
              title: "۴. شرایط دسترسی",
              text: "پارکینگ طبقاتی کم‌ارتفاع، مسیر خاکی، شانه آزادراه یا توقف در تونل، هرکدام زمان و ابزار متفاوتی می‌خواهند.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-5">
              <h3 className="text-sm font-extrabold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-brand-200 bg-brand-50 p-5 sm:p-6">
          <h2 className="text-base font-extrabold text-brand-900">
            نکته مهم درباره اعداد سایت‌های دیگر
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-700">
            بسیاری از سایت‌ها تعرفه ثابت اعلام می‌کنند، اما در پایان کار مبلغ متفاوتی دریافت
            می‌شود. ما این کار را نمی‌کنیم: عددی که در تماس اعلام و توافق شود، همان مبلغ نهایی
            فاکتور شما است. اگر شرایط در محل با آنچه گفته‌اید متفاوت باشد (مثلاً مسیر بسته باشد یا
            خودرو در نقطه دیگری از آزادراه باشد)، تفاوت هزینه پیش از ادامه کار اعلام می‌شود.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="نمونه خدمات"
          title="چند سناریوی رایج و نحوه محاسبه آن"
        />
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-ink-100 bg-white">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead className="bg-ink-50">
              <tr>
                <th className="border-b border-ink-100 px-4 py-3 text-start font-extrabold text-ink-800">
                  وضعیت
                </th>
                <th className="border-b border-ink-100 px-4 py-3 text-start font-extrabold text-ink-800">
                  واحد محاسبه
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["باتری‌به‌باتری در تهران", "تعرفه پایه امداد + مسیر (قطعه باتری در صورت نیاز، جداگانه)"],
                ["پنچرگیری در شهر یا جاده", "تعرفه پایه امداد بر اساس منطقه و مسیر"],
                ["سوخت‌رسانی", "بهای سوخت طبق رسید + تعرفه سرویس سیار بر اساس فاصله"],
                ["باز کردن قفل خودرو", "تعرفه بر اساس نوع خودرو و سطح دسترسی (در، صندوق، سوئیچ)"],
                ["یدک‌کشی شهری", "تعرفه ثابت به‌ازای مسافت + نوع خودروبر"],
                ["حمل بین‌شهری (شمال به تهران)", "تعرفه مسافت + نوع خودروبر؛ اعلام پیش از بارگیری"],
                ["تعمیر در محل", "اجرت عیب‌یابی و تعمیر + قطعه در صورت وجود، با فاکتور"],
                ["چکاپ پیش از سفر", "تعرفه ثابت سرویس، مستقل از مسافت"],
              ].map(([situation, basis]) => (
                <tr key={situation} className="odd:bg-white even:bg-ink-50/60">
                  <td className="border-b border-ink-100 px-4 py-3 leading-7 text-ink-700">
                    {situation}
                  </td>
                  <td className="border-b border-ink-100 px-4 py-3 leading-7 text-ink-600">{basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <CaseStudiesSection />

      <Section tone="muted">
        <SectionHeading
          eyebrow="پرسش‌های متداول تعرفه"
          title="سؤال‌های رایج کاربران درباره هزینه امداد"
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <FaqAccordion items={pricingFaqs} />
        </div>
      </Section>

      <CtaBand
        title="برای استعلام تعرفه، همین حالا تماس بگیرید"
        description="موقعیت و نوع خرابی را بگویید؛ در همان تماس، هزینه و زمان رسیدن را به‌صورت دقیق اعلام می‌کنیم."
      />
    </>
  );
}

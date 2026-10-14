import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/sections/blocks";
import { Section } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/schema";
import { noIndexMetadata } from "@/lib/seo";
import { mailHref, siteConfig, telHref } from "@/lib/site";

export const metadata = noIndexMetadata(
  "شرایط استفاده و قواعد خدمات امداد خودرو",
  "شرایط استفاده از خدمات امداد خودرو چاره: دامنه خدمات، روند ثبت درخواست، تعرفه و پرداخت، مسئولیت‌ها و شرایط لغو درخواست.",
  "/terms",
);

const sections = [
  { id: "scope", title: "۱. دامنه خدمات" },
  { id: "request", title: "۲. روند ثبت درخواست" },
  { id: "pricing", title: "۳. تعرفه و پرداخت" },
  { id: "obligations", title: "۴. تعهدات کاربر" },
  { id: "liability", title: "۵. حدود مسئولیت" },
  { id: "cancel", title: "۶. لغو و انصراف" },
  { id: "data", title: "۷. داده‌ها و ارتباطات" },
  { id: "changes", title: "۸. تغییر شرایط" },
];

function Clause({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-lg font-extrabold text-ink-900">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-[0.98rem] leading-9 text-ink-700">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "شرایط استفاده", path: "/terms" }])} />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "شرایط استفاده" }]} />
          <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">شرایط استفاده از خدمات</h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">
            این صفحه چارچوب خدمات {siteConfig.brand.legalFa} را توضیح می‌دهد: چه خدماتی ارائه
            می‌شود، درخواست چگونه ثبت و اجرا می‌شود، تعرفه بر چه اساسی محاسبه می‌گردد و مسئولیت هر
            طرف چیست. با ثبت درخواست یا تماس با ما، این شرایط را پذیرفته‌اید.
          </p>
          <p className="mt-3 text-xs text-ink-500">آخرین به‌روزرسانی: ۲۲ مهر ۱۴۰۵</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr]">
          <nav aria-label="فهرست بندها" className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-4">
              <h2 className="text-sm font-extrabold text-ink-900">فهرست</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {sections.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-ink-600 transition hover:text-brand-700"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="flex flex-col gap-10">
            <Clause id="scope" title="۱. دامنه خدمات">
              <p>
                {siteConfig.brand.fa} خدمات امداد خودرو شامل باتری‌به‌باتری، پنچرگیری و تعمیر لاستیک،
                سوخت‌رسانی، باز کردن قفل خودرو، یدک‌کشی و حمل با خودروبر، تعمیرات سیار در محل، امداد
                خودروهای برقی و هیبریدی، امداد موتورسیکلت و بازدید پیش از سفر را در محدوده تهران،
                شهرهای استان تهران، کرج و محورهای اعلام‌شده در صفحه‌های پوشش ارائه می‌کند.
              </p>
              <p>
                خدماتی که به‌دلیل محدودیت قانونی، ایمنی یا فنی قابل انجام نباشد (مانند تعمیرات تخصصی
                گیربکس، موتور یا سیستم‌های ایمنی خودروهای پیشرفته) ارائه نمی‌شود؛ در این حالت تیم امداد
                تنها نسبت به ایمن‌سازی خودرو و انتقال آن به تعمیرگاه اقدام می‌کند.
              </p>
            </Clause>

            <Clause id="request" title="۲. روند ثبت درخواست">
              <ul className="flex list-disc flex-col gap-2 pe-5">
                <li>درخواست از طریق تماس تلفنی، واتساپ، تلگرام یا فرم درخواست آنلاین ثبت می‌شود.</li>
                <li>
                  اپراتور موقعیت، نوع خودرو و شرح مشکل را ثبت می‌کند و نوع خدمت مناسب را تعیین
                  می‌نماید.
                </li>
                <li>تعرفه و زمان تقریبی رسیدن تیم پیش از اعزام اعلام می‌شود.</li>
                <li>پس از تأیید شما، نزدیک‌ترین تیم امداد اعزام می‌گردد.</li>
                <li>
                  در صورت تغییر شرایط (بارش، انسداد مسیر، ترافیک) زمان تقریبی به‌روزرسانی و به شما
                  اطلاع داده می‌شود.
                </li>
              </ul>
              <p>
                ثبت درخواست به‌معنای قطعی بودن زمان رسیدن نیست؛ ولی تعهد ما اعلام واقع‌بینانه زمان و
                اطلاع‌رسانی شفاف در مسیر است.
              </p>
            </Clause>

            <Clause id="pricing" title="۳. تعرفه و پرداخت">
              <p>
                تعرفه بر اساس فاصله، زمان، نوع خودرو، نوع خدمت و شرایط مسیر محاسبه و پیش از اعزام
                اعلام می‌شود. عدد اعلام‌شده پس از تأیید شما تا پایان همان خدمت ثابت می‌ماند، مگر آنکه
                شما خودتان خدمت دیگری (مثلاً تغییر مقصد یدک‌کشی) درخواست کنید.
              </p>
              <ul className="flex list-disc flex-col gap-2 pe-5">
                <li>پرداخت پس از انجام خدمت و به‌صورت نقدی یا کارت‌خوان سیار انجام می‌شود.</li>
                <li>در صورت انجام نشدن خدمت، هزینه‌ای از شما دریافت نمی‌شود.</li>
                <li>برای ناوگان‌ها و اشخاص حقوقی، امکان تسویه دوره‌ای بر اساس قرارداد وجود دارد.</li>
                <li>
                  هیچ هزینه پنهانی وجود ندارد؛ هزینه‌های جانبی (اگر لازم باشد) پیش از انجام کار اعلام
                  می‌شود.
                </li>
              </ul>
            </Clause>

            <Clause id="obligations" title="۴. تعهدات کاربر">
              <ul className="flex list-disc flex-col gap-2 pe-5">
                <li>ارائه اطلاعات درست درباره خودرو، موقعیت و مشکل موجود.</li>
                <li>
                  رعایت اصول ایمنی تا رسیدن تیم امداد؛ از جمله توقف در ناحیه پارک ایمن، استفاده از
                  مثلث خطر، پوشیدن لباس روشن در شب و خروج از خودرو در محل‌های پرخطر.
                </li>
                <li>
                  در آزادراه‌ها و تونل‌ها، حرکت تا نزدیک‌ترین ناحیه پارک ایمن یا پناهگاه و تماس با
                  مرکز کنترل مسیر در صورت لزوم.
                </li>
                <li>اطمینان از داشتن مدارک خودرو و مجوزهای لازم برای حمل و جابه‌جایی.</li>
                <li>عدم دخالت در عملیات تیم امداد و رعایت دستورهای ایمنی راننده امداد.</li>
              </ul>
            </Clause>

            <Clause id="liability" title="۵. حدود مسئولیت">
              <p>
                خدمات ما شامل عیب‌یابی و رفع مشکل در سطح امداد جاده‌ای است، نه تعمیر اساسی. اگر مشکل
                خودرو ریشه‌ای باشد، تیم امداد راهکارهای پیش رو را اعلام می‌کند و تصمیم نهایی برای
                ادامه مسیر، با راننده است.
              </p>
              <ul className="flex list-disc flex-col gap-2 pe-5">
                <li>
                  مسئولیت تیم امداد محدود به خدمات انجام‌شده و مطابق استانداردهای فنی است؛ آسیب‌های
                  ناشی از نقص فنی خودرو، فرسودگی قطعات یا استفاده نادرست مالک مشمول نمی‌شود.
                </li>
                <li>
                  درباره اشیای قیمتی داخل خودرو، مسئولیتی متوجه تیم امداد نیست؛ همراه داشتن وسایل
                  مهم توصیه می‌شود.
                </li>
                <li>
                  در شرایط قهری مانند سیل، زمین‌لغزش، انسداد کامل مسیر یا دستور راهداری و پلیس،
                  اجرای خدمت می‌تواند معطوف به تأمین ایمنی و راهنمایی شود.
                </li>
              </ul>
            </Clause>

            <Clause id="cancel" title="۶. لغو و انصراف">
              <p>
                تا پیش از رسیدن تیم امداد می‌توانید بدون هیچ هزینه‌ای درخواست را لغو کنید؛ کافی است
                تماس بگیرید. پس از رسیدن تیم و شروع خدمت، در صورت لغو درخواست شما، هزینه ایاب‌وذهاب و
                خدمت انجام‌شده محاسبه می‌شود.
              </p>
            </Clause>

            <Clause id="data" title="۷. داده‌ها و ارتباطات">
              <p>
                اطلاعاتی که در زمان درخواست ثبت می‌کنید (نام، شماره تماس، مدل خودرو، موقعیت و شرح
                مشکل) تنها برای اجرای همان خدمت و پیگیری کیفیت استفاده می‌شود. جزئیات کامل در صفحه
                حریم خصوصی آمده است. اگر تمایلی به دریافت پیام‌های پیگیری یا پیشنهادها ندارید،
                می‌توانید هنگام درخواست یا پس از آن اعلام کنید.
              </p>
            </Clause>

            <Clause id="changes" title="۸. تغییر شرایط">
              <p>
                این شرایط می‌تواند متناسب با تغییر خدمات یا مقررات به‌روزرسانی شود؛ نسخه معتبر همیشه
                همین صفحه است. برای استعلام از آخرین نسخه یا پرسش درباره بندهای آن، از راه‌های تماس
                درج‌شده در صفحه تماس استفاده کنید.
              </p>
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  تلفن:{" "}
                  <a className="font-bold text-brand-700" href={telHref}>
                    {siteConfig.contact.mobileDisplay}
                  </a>
                </li>
                <li>
                  ایمیل:{" "}
                  <a className="font-bold text-brand-700" href={mailHref}>
                    {siteConfig.contact.email}
                  </a>
                </li>
              </ul>
            </Clause>
          </div>
        </div>
      </Section>

      <CtaBand
        title="پرسشی درباره شرایط خدمات دارید؟"
        description="کارشناسان ما در همه ساعات شبانه‌روز پاسخ می‌دهند و اگر نیاز به امداد داشتید، در همان تماس تعرفه و زمان رسیدن اعلام می‌شود."
      />
    </>
  );
}

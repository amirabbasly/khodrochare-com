import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/schema";
import { noIndexMetadata } from "@/lib/seo";
import { mailHref, siteConfig, telHref } from "@/lib/site";

export const metadata = noIndexMetadata(
  "حریم خصوصی و نگهداری اطلاعات کاربران",
  "سیاست حریم خصوصی خودرو چاره: چه اطلاعاتی هنگام درخواست امداد خودرو ثبت می‌شود، چگونه نگهداری و با چه محدوده‌ای استفاده می‌شود.",
  "/privacy",
);

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card p-5">
      <h2 className="text-base font-extrabold text-ink-900">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-8 text-ink-700">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "حریم خصوصی", path: "/privacy" }])} />

      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "حریم خصوصی" }]} />
          <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">حریم خصوصی</h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">
            برای ارائه امداد خودرو، دانستن موقعیت و مشخصات خودروی شما ضروری است. این صفحه توضیح
            می‌دهد چه اطلاعاتی دریافت می‌کنیم، چرا آن را می‌خواهیم، چقدر نگه می‌داریم و چگونه از آن
            محافظت می‌کنیم.
          </p>
          <p className="mt-3 text-xs text-ink-500">آخرین به‌روزرسانی: ۲۲ مهر ۱۴۰۵</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          <Block title="چه اطلاعاتی جمع‌آوری می‌شود؟">
            <p>بسته به اینکه از چه راهی با ما در تماس باشید، اطلاعات زیر ممکن است ثبت شود:</p>
            <ul className="flex list-disc flex-col gap-2 pe-5">
              <li>شماره تلفن تماس و — اگر خودتان اعلام کنید — نام شما.</li>
              <li>مشخصات خودرو: مدل، سال ساخت، نوع سوخت یا باتری.</li>
              <li>
                موقعیت خودرو: نشانی، نام معبر یا مختصات ارسال‌شده از طریق واتساپ یا فرم درخواست.
              </li>
              <li>شرح مشکل خودرو و توضیحاتی که خودتان ارائه می‌کنید.</li>
              <li>
                اطلاعات فنی محدود بازدیدکنندگان سایت مانند نوع دستگاه و مرورگر، برای بهبود سرعت و
                کارکرد صفحات.
              </li>
            </ul>
          </Block>

          <Block title="چرا این اطلاعات را لازم داریم؟">
            <ul className="flex list-disc flex-col gap-2 pe-5">
              <li>اعزام تیم مناسب و تجهیزات درست به موقعیت شما.</li>
              <li>اعلام تعرفه دقیق و زمان تقریبی رسیدن پیش از اعزام.</li>
              <li>پیگیری کیفیت خدمت و رفع مشکل در صورت بروز ایراد در کار تیم.</li>
              <li>پاسخ به پرسش‌ها و شکایات پس از انجام خدمت.</li>
              <li>بهبود کیفیت خدمات و زمان پاسخ‌گویی به‌صورت آماری و بی‌نام.</li>
            </ul>
          </Block>

          <Block title="با چه کسانی به اشتراک گذاشته می‌شود؟">
            <p>
              اطلاعات موقعیت و مشخصات خودرو تنها با تیم امداد اعزامی و در حد لازم برای انجام همان
              خدمت به اشتراک گذاشته می‌شود. در موارد خاص و در صورت لزوم هماهنگی با راهداری، پلیس راه
              یا مرکز کنترل تونل، تنها اطلاعات ضروری (مثل موقعیت خودرو) اعلام می‌گردد.
            </p>
            <p>
              اطلاعات شما فروخته نمی‌شود و در اختیار هیچ مجموعه تبلیغاتی، بیمه یا شرکت ثالثی قرار
              نمی‌گیرد؛ مگر در پیام‌رسان‌ها (واتساپ یا تلگرام) که ارتباط شما از طریق سرویس همان
              پیام‌رسان انجام می‌شود و قواعد حریم خصوصی آن سرویس نیز در جریان است.
            </p>
          </Block>

          <Block title="نگهداری و امنیت اطلاعات">
            <ul className="flex list-disc flex-col gap-2 pe-5">
              <li>
                سوابق درخواست‌ها برای پیگیری کیفیت و مسائل مالی نگهداری می‌شود و پس از پایان دوره
                نگهداری حذف یا بی‌نام می‌شود.
              </li>
              <li>
                دسترسی به سوابق درخواست‌ها محدود به کارشناسان پشتیبانی و مدیر عملیات است؛ ارتباط‌های
                سایت روی بستر امن انجام می‌شود.
              </li>
              <li>
                موقعیت مکانی شما پس از پایان خدمت و پیگیری‌های مرتبط، به‌صورت فعال نگه‌داری نمی‌شود.
              </li>
            </ul>
          </Block>

          <Block title="حقوق شما">
            <ul className="flex list-disc flex-col gap-2 pe-5">
              <li>درخواست اطلاع از اطلاعاتی که درباره شما ثبت شده است.</li>
              <li>درخواست اصلاح اطلاعات نادرست ثبت‌شده.</li>
              <li>درخواست حذف سوابق، در چارچوب الزامات قانونی و مالی.</li>
              <li>انصراف از دریافت پیام‌ها و پیشنهادهای غیرضروری در هر زمان.</li>
            </ul>
            <p>
              برای اعمال هر یک از این موارد کافی است با شماره تماس یا ایمیل ما در ارتباط باشید.
            </p>
          </Block>

          <Block title="کوکی‌ها و سنجش بازدید">
            <p>
              سایت ما از کوکی‌ها برای کارکردهای پایه استفاده می‌کند و ممکن است داده‌های آماری
              بی‌نام (بازدید صفحه، مدت حضور، نوع دستگاه) برای بهبود محتوا جمع‌آوری شود. این داده‌ها
              به فرد یا شماره تماس خاصی نسبت داده نمی‌شود.
            </p>
            <p>
              اگر فرم درخواست آنلاین را پر کنید، اطلاعات آن دقیقاً به همان مقصدی می‌فرستد که در تماس
              تلفنی استفاده می‌شود و برای هیچ کاربرد دیگری نگه‌داری نمی‌شود.
            </p>
          </Block>
        </div>

        <div className="mt-8 rounded-3xl border border-brand-200 bg-brand-50 p-5">
          <h2 className="text-base font-extrabold text-brand-900">پرسش یا درخواست حریم خصوصی</h2>
          <p className="mt-3 text-sm leading-8 text-ink-700">
            برای هر پرسش درباره داده‌های خود، تماس تلفنی سریع‌ترین راه است؛ در صورت تمایل می‌توانید
            درخواست مکتوب خود را از طریق ایمیل ارسال کنید.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-ink-800"
            >
              <Icon name="phone" className="size-4 text-brand-600" />
              <span className="nums">{siteConfig.contact.mobileDisplay}</span>
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-ink-800"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="یادآوری"
          title="اطلاعاتی که هرگز لازم نداریم"
          description="این موارد را برای هیچ سرویس امداد خودرو در اختیار نگذارید."
        />
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
          {[
            "رمز کارت بانکی یا رمز دوم و CVV2",
            "کد تأیید پیامک (OTP) و رمز عبور حساب کاربری",
            "شماره حساب بانکی یا اطلاعات تسهیلات",
            "کپی مدارک هویتی و کارت ملی بدون نیاز مشخص",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4 text-sm leading-7 text-ink-700"
            >
              <Icon name="shield" className="mt-0.5 size-5 shrink-0 text-alert-500" />
              {item}
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="به امداد خودرو نیاز دارید؟"
        description="در تماس، موقعیت و مشخصات خودرو را اعلام کنید؛ تعرفه و زمان رسیدن پیش از اعزام اعلام می‌شود."
      />
    </>
  );
}

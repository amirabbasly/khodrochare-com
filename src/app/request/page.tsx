import { Breadcrumbs } from "@/components/breadcrumbs";
import { RequestForm } from "@/components/forms/request-form";
import { Icon } from "@/components/icons";
import { BtnLink, Section, SectionHeading } from "@/components/ui";
import { noIndexMetadata } from "@/lib/seo";
import { siteConfig, telHref, whatsappHref } from "@/lib/site";

export const metadata = noIndexMetadata(
  "ثبت درخواست امداد خودرو",
  "فرم درخواست امداد خودرو: نام، شماره تماس و موقعیت خود را ثبت کنید تا کارشناس ما در سریع‌ترین زمان با شما تماس بگیرد.",
  "/request",
);

export default function RequestPage() {
  return (
    <>
      <section className="border-b border-ink-100 bg-ink-50 py-10">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: "درخواست امداد" }]} />
          <h1 className="mt-4 text-2xl leading-[1.6] sm:text-3xl">ثبت درخواست امداد خودرو</h1>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-9 text-ink-700">
            برای ثبت درخواست، فرم زیر را پر کنید؛ کارشناس ما بلافاصله با شما تماس می‌گیرد، موقعیت را
            دقیق می‌کند و تعرفه را اعلام می‌نماید. اگر وضعیت اضطراری است، تماس تلفنی سریع‌ترین راه
            است.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <RequestForm contextLabel="صفحه درخواست امداد" />

          <div className="flex flex-col gap-4">
            <div className="card p-5">
              <h2 className="text-base font-extrabold text-ink-900">راه‌های تماس</h2>
              <div className="mt-4 flex flex-col gap-3">
                <a href={telHref} className="flex items-center gap-3 rounded-2xl bg-alert-50 px-4 py-3.5">
                  <Icon name="phone" className="size-5 text-alert-600" />
                  <span>
                    <span className="block text-xs text-ink-500">تماس فوری (۲۴ ساعته)</span>
                    <span className="nums block text-sm font-extrabold text-ink-900">
                      {siteConfig.contact.mobileDisplay}
                    </span>
                  </span>
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-trust-50 px-4 py-3.5"
                >
                  <Icon name="pin" className="size-5 text-trust-700" />
                  <span>
                    <span className="block text-xs text-ink-500">ارسال لوکیشن</span>
                    <span className="block text-sm font-extrabold text-ink-900">
                      واتساپ خودرو چاره
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-base font-extrabold text-ink-900">
                قبل از تماس، این اطلاعات را آماده کنید
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {[
                  "نام و شماره تماس",
                  "مدل و سال خودرو",
                  "موقعیت دقیق (خیابان، کیلومتر یا نام محله)",
                  "نشانه‌های خرابی (صدا، دود، چراغ هشدار)",
                  "آیا خودرو در مسیر پرخطر (تونل، باند آزادراه) متوقف شده؟",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-7 text-ink-700">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <Icon name="checklist" className="size-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-ink-100 bg-ink-50 p-5">
              <h2 className="text-base font-extrabold text-ink-900">پس از ثبت چه می‌شود؟</h2>
              <ol className="mt-4 flex flex-col gap-2.5 text-sm leading-7 text-ink-700">
                <li>۱. تماس کارشناس برای تأیید موقعیت و نوع خدمت</li>
                <li>۲. اعلام تعرفه و زمان تقریبی رسیدن</li>
                <li>۳. اعزام نزدیک‌ترین تیم امداد پس از تأیید شما</li>
                <li>۴. انجام خدمت در محل و تسویه پس از تأیید نتیجه</li>
              </ol>
              <div className="mt-4">
                <BtnLink href="/services" variant="outline" className="bg-white px-4 py-3 text-sm">
                  مشاهده فهرست خدمات
                </BtnLink>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="توجه"
          title="در شرایط اضطراری، تماس تلفنی را انتخاب کنید"
          description="فرم آنلاین برای ثبت درخواست‌های غیرفوری و برنامه‌ریزی‌شده (چکاپ، حمل خودرو، مشاوره) بسیار مناسب است؛ اما اگر خودرو در باند آزادراه، داخل تونل یا مسیر پرخطر متوقف شده، تماس مستقیم سریع‌ترین راه است."
        />
        <div className="mt-8 flex justify-center">
          <BtnLink href={telHref} className="px-5 py-3.5">
            <Icon name="phone" className="size-5" />
            تماس فوری با امداد
          </BtnLink>
        </div>
      </Section>
    </>
  );
}

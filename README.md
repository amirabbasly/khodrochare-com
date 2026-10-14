# خودرو چاره — سایت امداد خودرو (khodrochare.com)

سایت امداد خودرو تهران، همه شهرهای استان تهران و آزادراه‌های منتهی به شمال ایران.
این مخزن، نسخه دامنه تبلیغاتی (`khodrochare.com`) است؛ محتوای یکسان روی دامنه سئو
(`khodrochare.ir`) هم سرو می‌شود و همه canonicalها به دامنه سئو اشاره می‌کنند.

---

## راه‌اندازی

```bash
npm install
cp .env.example .env.local     # مقادیر تماس، آدرس و ردیابی را وارد کنید
npm run dev                    # http://localhost:3000
npm run build && npm start      # اجرای نسخه production
npx tsc --noEmit                # بررسی تایپ‌ها
npx eslint .                    # بررسی کد
```

## معماری محتوا

همه محتوای تخصصی در `src/data/` نگهداری می‌شود و صفحه‌ها فقط آن را رندر می‌کنند؛
بنابراین افزودن شهر، محور یا خدمت جدید نیازی به تغییر کد صفحه ندارد.

| مسیر | توضیح |
| --- | --- |
| `src/data/types.ts` | مدل داده: `Service`، `Area`، `Road`، `Post`، `ContentBlock`، `IconKey` |
| `src/data/services.ts` | ۱۰ خدمت امداد (باتری، لاستیک، سوخت، قفل، یدک‌کش، تعمیر در محل، برقی، موتورسیکلت، جاده‌ای، چکاپ سفر) |
| `src/data/areas/part1.ts` + `part2.ts` + `index.ts` | ۲۲ منطقه: تهران، شمیرانات، لواسانات، فشم، پردیس، رودهن، دماوند، فیروزکوه، کرج، چالوس + ۱۲ شهر/شهرستان استان تهران |
| `src/data/roads.ts` | ۸ محور: آزادراه تهران-شمال، چالوس (۵۹)، هراز (۷۷)، فیروزکوه (۷۹)، کرج-قزوین، قزوین-رشت، تهران-قم، تهران-ساوه |
| `src/data/posts.ts` | ۱۰ مقاله راهنمای جاده و نگهداری خودرو |
| `src/data/site-content.ts` | مزیت‌ها، مراحل درخواست، نمونه‌های عملیاتی، پرسش‌های متداول، پوشش شهرستانی |
| `src/data/nav.ts` | منوی اصلی و مگامنوها (خودکار از داده‌ها ساخته می‌شود) |

### افزودن آیتم جدید

```ts
// src/data/areas/part2.ts
{
  slug: "new-city",            // آدرس صفحه: /areas/new-city
  name: "امداد خودرو شهر جدید",
  kind: "city",                // metropolis | city | district | resort
  /* ...همه فیلدهای نوع Area... */
}
```

پس از افزودن، صفحه دیتیل، لینک‌های منو، نقشه سایت، داده ساخت‌یافته و لینک‌های مرتبط
به‌صورت خودکار ساخته می‌شوند.

## ساختار صفحات

| مسیر | محتوا |
| --- | --- |
| `/` | صفحه اصلی: هیرو، خدمات، پوشش، محورها، فرایند، تعرفه، مقالات، پرسش‌ها |
| `/services` و `/services/[slug]` | فهرست خدمات + جدول «کدام خدمت برای مشکل شما؟» و صفحه اختصاصی هر خدمت |
| `/areas` و `/areas/[slug]` | مناطق تحت پوشش، گروه‌بندی‌شده بر اساس شهرستان |
| `/roads` و `/roads/[slug]` | محورها با نقشه کریدور، قطعه‌ها، نقاط پرحادثه، قواعد تردد و زمان اعزام |
| `/blog` و `/blog/[slug]` | مقالات، با پرسش‌های متداول و داده ساخت‌یافته Article |
| `/pricing` | سیاست تعرفه، عوامل هزینه و سناریوهای رایج |
| `/faq` | ۳۰+ پرسش متداول در ۵ گروه موضوعی |
| `/about`، `/contact` | اعتبار، تجهیزات، راه‌های تماس و فرم درخواست |
| `/request` | فرم درخواست امداد (noindex) |
| `/terms`، `/privacy` | شرایط استفاده و حریم خصوصی (noindex) |
| `/sitemap.xml`، `/robots.txt`، `/manifest.webmanifest` | فایل‌های سیستمی |

تصویر اوپن‌گراف برای همه صفحه‌ها به‌صورت داینامیک ساخته می‌شود
(`src/lib/og.tsx` + فایل‌های `opengraph-image.tsx`) با فونت محلی وزیرمتن.

## دو دامنه: سئو (.ir) و تبلیغات (.com)

منطق در `src/proxy.ts` (جایگزین middleware در Next.js 16) پیاده شده است:

- دامنه `khodrochare.com`: هدر `X-Robots-Tag: noindex, follow` + هدر `Link` با
  `rel="canonical"` به معادل همان صفحه روی دامنه سئو.
- دامنه `khodrochare.ir`: بدون هدر اضافه؛ همه canonicalها و JSON-LD روی این دامنه ساخته می‌شوند.
- برای غیرفعال کردن این رفتار: `NEXT_PUBLIC_NOINDEX_ADS_DOMAIN=false`.

## سرنخ‌ها (Lead)

- فرم‌ها به `POST /api/lead` ارسال می‌شوند (`src/app/api/lead/route.ts`):
  اعتبارسنجی شماره (تبدیل ارقام فارسی به لاتین)، محدودیت نرخ، تله ضدربات.
- ارسال به `LEAD_WEBHOOK_URL` و/یا ربات تلگرام (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`)
  و ثبت در لاگ سرور با پیشوند `[lead]`.
- ردیابی تبدیل‌ها با `src/lib/analytics.ts` و `src/components/analytics.tsx`
  فقط در صورت تنظیم `NEXT_PUBLIC_GOOGLE_ADS_ID` فعال می‌شود (ثبت سرنخ، کلیک تماس، کلیک واتساپ).

## متغیرهای محیطی مهم

همه در `.env.example` توضیح داده شده‌اند؛ مهم‌ترین‌ها:

```
NEXT_PUBLIC_PHONE_E164 / NEXT_PUBLIC_PHONE_DISPLAY        شماره ثابت
NEXT_PUBLIC_MOBILE_E164 / NEXT_PUBLIC_MOBILE_DISPLAY      شماره امداد ۲۴ ساعته
NEXT_PUBLIC_WHATSAPP / NEXT_PUBLIC_TELEGRAM               پیام‌رسان‌ها
NEXT_PUBLIC_ADDRESS / NEXT_PUBLIC_LAT / NEXT_PUBLIC_LNG   داده ساخت‌یافته LocalBusiness
NEXT_PUBLIC_GOOGLE_ADS_ID (+ برچسب‌های تبدیل)             ردیابی ادز
```

> پیش از انتشار، شماره‌های نمونه (`۰۹۱۲ ۰۰۰ ۰۰۰۰`) و آمار موجود در `src/lib/site.ts`
> باید با مقادیر واقعی جایگزین شوند.

## فناوری

Next.js 16 (App Router، Cache Components، React Compiler) · React 19 · TypeScript strict ·
Tailwind CSS v4 (طراحی RTL) · فونت وزیرمتن به‌صورت self-hosted (بدون وابستگی به CDN).

## چک‌لیست انتشار

1. مقادیر `.env.local` (شماره‌ها، آدرس، شناسه‌های ادز) را نهایی کنید.
2. `npm run build` را بدون خطا پاس کنید.
3. دامنه‌ها را روی سرویس میزبانی متصل کنید و هر دو دامنه را به یک استقرار اشاره دهید.
4. در Google Search Console، دامنه `khodrochare.ir` را ثبت و نقشه سایت را ارسال کنید.
5. در Google Ads، مقصد کمپین را `khodrochare.com` و برچسب‌های تبدیل را تنظیم کنید.

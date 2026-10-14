import Link from "next/link";
import { Icon, Logo, MailIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons";
import { services } from "@/data/services";
import { roads } from "@/data/roads";
import { areaGroups } from "@/data/nav";
import { areaBySlug } from "@/data/areas";
import { fa } from "@/lib/utils";
import {
  mailHref,
  siteConfig,
  telHref,
  telLandlineHref,
  telegramHref,
  whatsappHref,
} from "@/lib/site";

export function Footer() {

  return (
    <footer className="border-t border-ink-800 bg-ink-950 pb-24 pt-14 text-ink-300 sm:pb-14">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Logo className="size-11" />
              <div>
                <p className="text-base font-extrabold text-white">{siteConfig.brand.fa}</p>
                <p className="text-xs text-ink-400">{siteConfig.brand.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-8 text-ink-400">
              سامانه امداد خودرو {siteConfig.brand.fa} با تیم‌های مستقر در تهران، شهرهای استان
              تهران و آزادراه‌های منتهی به شمال، خدمات باتری، پنچرگیری، سوخت‌رسانی، قفل، یدک‌کشی و
              تعمیر در محل را شبانه‌روزی ارائه می‌دهد.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={telHref}
                data-source="footer"
                className="flex items-center gap-2 font-extrabold text-brand-300"
              >
                <Icon name="phone" className="size-4" />
                <span className="nums">{siteConfig.contact.mobileDisplay}</span>
              </a>
              <a
                href={telLandlineHref}
                data-source="footer"
                className="flex items-center gap-2 text-ink-300"
              >
                <Icon name="phone" className="size-4" />
                <span className="nums">{siteConfig.contact.phoneDisplay}</span>
              </a>
              <a href={mailHref} className="flex items-center gap-2 text-ink-300">
                <MailIcon className="size-4" />
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساپ"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 text-trust-500 transition hover:bg-white/[0.06]"
              >
                <WhatsAppIcon className="size-5" />
              </a>
              <a
                href={telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 text-brand-300 transition hover:bg-white/[0.06]"
              >
                <TelegramIcon className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-extrabold text-white">خدمات امداد خودرو</p>
            <ul className="flex flex-col gap-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-ink-400 transition hover:text-brand-300"
                  >
                    {service.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-extrabold text-white">مناطق و شهرها</p>
            <div className="flex flex-col gap-3">
              {areaGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-1.5 text-[0.7rem] font-bold text-ink-500">{group.title}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
                    {group.slugs.map((slug) => {
                      const area = areaBySlug.get(slug);
                      if (!area) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/areas/${slug}`}
                          className="text-ink-400 transition hover:text-brand-300"
                        >
                          {area.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
              <Link href="/areas" className="text-sm font-bold text-brand-300">
                همه مناطق تحت پوشش →
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-extrabold text-white">آزادراه‌ها و محورها</p>
            <ul className="flex flex-col gap-2 text-sm">
              {roads.map((road) => (
                <li key={road.slug}>
                  <Link
                    href={`/roads/${road.slug}`}
                    className="text-ink-400 transition hover:text-brand-300"
                  >
                    {road.name}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mb-3 mt-6 text-sm font-extrabold text-white">دسترسی سریع</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/request" className="text-ink-400 hover:text-brand-300">
                  درخواست امداد آنلاین
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-ink-400 hover:text-brand-300">
                  سیاست تعرفه‌ها
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-ink-400 hover:text-brand-300">
                  پرسش‌های متداول
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-ink-400 hover:text-brand-300">
                  راهنمای سفر و نگهداری خودرو
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink-400 hover:text-brand-300">
                  تماس و پشتیبانی
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {fa(siteConfig.copyrightYear)} {siteConfig.brand.legalFa} — همه حقوق محفوظ است.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="nums">
              دامنه‌ها: {siteConfig.seoHost} (سئو) و {siteConfig.adsHost} (تبلیغات)
            </span>
            <Link href="/terms" className="hover:text-brand-300">
              قوانین و شرایط
            </Link>
            <Link href="/privacy" className="hover:text-brand-300">
              حریم خصوصی
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

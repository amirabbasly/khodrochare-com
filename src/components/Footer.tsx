import Image from "next/image";
import { Clock3, Phone } from "lucide-react";
import { SERVICES, SITE } from "@/lib/data";

const QUICK_LINKS = [
  { href: "#services", label: "خدمات خودرو چاره" },
  { href: "#steps", label: "نحوه درخواست امداد" },
  { href: "#fleet", label: "ناوگان امدادی" },
  { href: "#center", label: "مرکز خودرو چاره" },
  { href: "#faq", label: "پرسش‌های متداول" },
  { href: "#request", label: "ثبت درخواست آنلاین" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* معرفی */}
          <div>
            <Image
              src="/images/logo.webp"
              alt="لوگوی خودرو چاره"
              width={2172}
              height={724}
              className="h-16 w-auto"
            />
            <p className="mt-5 max-w-sm text-[15px] leading-8 text-silver-400">
              «خودرو چاره» مرکز امداد و خدمات خودرو در محل است؛ با ناوگان امدادی مجهز و تکنسین‌های
              مجرب، شبانه‌روزی در کنار رانندگان تهران هستیم تا هیچ خودرویی در راه نماند.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy-800 px-4 py-1.5 text-[13px] font-bold text-brand-300 ring-1 ring-white/10">
              {SITE.slogan}
            </p>
          </div>

          {/* دسترسی سریع */}
          <nav aria-label="دسترسی سریع">
            <h3 className="text-base font-extrabold text-white">دسترسی سریع</h3>
            <ul className="mt-5 space-y-3 text-[15px] font-medium text-silver-400">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-brand-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* خدمات */}
          <nav aria-label="خدمات خودرو چاره">
            <h3 className="text-base font-extrabold text-white">خدمات ما</h3>
            <ul className="mt-5 space-y-3 text-[15px] font-medium text-silver-400">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="transition hover:text-brand-300">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* تماس */}
          <div>
            <h3 className="text-base font-extrabold text-white">تماس با خودرو چاره</h3>
            <div className="mt-5 space-y-3">
              <a
                href={SITE.phoneShortHref}
                className="flex items-center justify-between rounded-2xl bg-navy-800 px-5 py-3.5 ring-1 ring-white/10 transition hover:ring-brand-500/50"
              >
                <span className="flex items-center gap-2 text-sm font-bold text-silver-300">
                  <Phone className="size-4 text-brand-400" aria-hidden />
                  خط ویژه امداد
                </span>
                <span className="text-lg font-black text-white" dir="ltr">
                  {SITE.phoneShort}
                </span>
              </a>
              <a
                href={SITE.phoneMainHref}
                className="flex items-center justify-between rounded-2xl bg-navy-800 px-5 py-3.5 ring-1 ring-white/10 transition hover:ring-brand-500/50"
              >
                <span className="flex items-center gap-2 text-sm font-bold text-silver-300">
                  <Phone className="size-4 text-brand-400" aria-hidden />
                  مرکز خودرو چاره
                </span>
                <span className="text-lg font-black text-white" dir="ltr">
                  {SITE.phoneMain}
                </span>
              </a>
              <p className="flex items-center gap-2 px-1 pt-1 text-sm font-semibold text-silver-400">
                <Clock3 className="size-4 shrink-0 text-brand-400" aria-hidden />
                {SITE.hours}
              </p>
            </div>
          </div>
        </div>

        <div className="road-line mt-14 h-1 w-full opacity-40" aria-hidden />

        <div className="mt-7 flex flex-col items-center justify-between gap-3 text-[13px] font-medium text-silver-500 sm:flex-row">
          <p>© ۱۴۰۵ خودرو چاره — تمام حقوق مادی و معنوی این وب‌سایت محفوظ است.</p>
          <p>
            امداد خودرو و خدمات خودرو در محل در سراسر تهران — <span className="font-bold text-silver-300">{SITE.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

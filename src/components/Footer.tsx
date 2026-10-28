import Image from "next/image";
import { Clock, Phone } from "lucide-react";
import { SERVICES, SITE, SOCIALS } from "@/lib/data";
import Reveal from "./Reveal";
import SocialFloat from "./SocialFloat";

const QUICK_LINKS = [
  { href: "#services", label: "خدمات خودرو چاره" },
  { href: "#battery", label: "خرید باتری خودرو در محل" },
  { href: "#pricing", label: "تعرفه خدمات" },
  { href: "#why", label: "چرا خودرو چاره" },
  { href: "#steps", label: "مراحل دریافت خدمت" },
  { href: "#request", label: "ثبت درخواست آنلاین" },
  { href: "#reviews", label: "ثبت رضایت مشتری" },
  { href: "#faq", label: "سوالات متداول" },
];

export default function Footer() {
  return (
    <>
      {/* نوار دعوت به تماس */}
      <section className="bg-brand-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 text-center sm:px-6 lg:flex-row lg:text-right">
          <Reveal>
            <div>
              <h2 className="text-2xl font-black text-navy-950 sm:text-3xl">
                خودروتان همین حالا به کمک نیاز دارد؟
              </h2>
              <p className="mt-2 font-bold text-navy-900/80">
                امداد خودرو شبانه‌روزی خودرو چاره در سراسر تهران؛ مشاوره و اعلام هزینه رایگان است.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={SITE.phoneShortHref}
                className="flex items-center gap-2.5 rounded-2xl bg-navy-950 px-6 py-4 font-extrabold text-white shadow-xl transition hover:bg-navy-900"
              >
                <Phone className="size-5 text-brand-400" aria-hidden />
                <span dir="ltr" className="text-lg">
                  {SITE.phoneShort}
                </span>
              </a>
              <a
                href={SITE.phoneMainHref}
                className="flex items-center gap-2.5 rounded-2xl bg-white/15 px-6 py-4 font-extrabold text-navy-950 ring-2 ring-navy-950/70 transition hover:bg-white"
              >
                <Phone className="size-5" aria-hidden />
                <span dir="ltr" className="text-lg">
                  {SITE.phoneMain}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-navy-950 pb-28 text-navy-100 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Image
                src="/images/logo.webp"
                alt="لوگوی خودرو چاره"
                width={2172}
                height={724}
                className="h-14 w-auto"
              />
              <p className="mt-5 text-[15px] font-bold leading-8 text-brand-400">
                امداد خودرو تهران | مکانیک سیار و خدمات خودرو در محل
              </p>
              <p className="mt-2 text-[15px] leading-8 text-navy-200">
                خودرو چاره؛ امداد خودرو و خدمات خودرو در محل در سراسر تهران، با ناوگان مجهز و
                تکنسین‌های مجرب — شبانه‌روزی و با ضمانت.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {SOCIALS.filter((s) => s.href && s.icon).map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-navy-800 py-1.5 pl-4 pr-1.5 text-sm font-bold text-white ring-1 ring-white/10 transition hover:bg-navy-700"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={512}
                      height={512}
                      className="size-7 rounded-full object-cover"
                    />
                    {social.label.replace(" خودرو چاره", "")}
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="دسترسی سریع">
              <h3 className="text-lg font-extrabold text-white">دسترسی سریع</h3>
              <ul className="mt-5 space-y-3 text-[15px] font-semibold text-navy-200">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="transition hover:text-brand-400">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="خدمات خودرو چاره">
              <h3 className="text-lg font-extrabold text-white">خدمات ما</h3>
              <ul className="mt-5 space-y-3 text-[15px] font-semibold text-navy-200">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <a href="#services" className="transition hover:text-brand-400">
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-lg font-extrabold text-white">تماس با خودرو چاره</h3>
              <ul className="mt-5 space-y-4 text-[15px] font-semibold">
                <li>
                  <a href={SITE.phoneShortHref} className="flex items-center gap-3 transition hover:text-brand-400">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-navy-950">
                      <Phone className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[13px] text-navy-300">خط فوری امداد شبانه‌روزی</span>
                      <span dir="ltr" className="text-lg font-black text-white">
                        {SITE.phoneShort}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={SITE.phoneMainHref} className="flex items-center gap-3 transition hover:text-brand-400">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-brand-400 ring-1 ring-white/10">
                      <Phone className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[13px] text-navy-300">مرکز و نمایندگی مجاز خودرو چاره</span>
                      <span dir="ltr" className="text-lg font-black text-white">
                        {SITE.phoneMain}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-navy-200">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-brand-400 ring-1 ring-white/10">
                    <Clock className="size-5" aria-hidden />
                  </span>
                  {SITE.hours}
                </li>
              </ul>
            </div>
          </div>

          <div className="road-line mt-14 h-1 w-full opacity-30" aria-hidden />

          <div className="mt-8 flex flex-col items-center justify-between gap-3 text-center text-sm font-medium text-navy-300 sm:flex-row sm:text-right">
            <p>© ۱۴۰۵ خودرو چاره — تمامی حقوق محفوظ است.</p>
            <p>امداد خودرو و خدمات خودرو در محل | تهران و حومه</p>
          </div>
        </div>
      </footer>
      <SocialFloat />
    </>
  );
}

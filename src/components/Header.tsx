"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/data";

// «short» در دسکتاپ‌های کوچک (LG) نمایش داده می‌شود تا منو جمع‌وجور و بدون درهم‌رفتگی جا شود
const NAV = [
  { href: "#services", label: "خدمات ما", short: "خدمات" },
  { href: "#battery", label: "خرید باتری", short: "خرید باتری" },
  { href: "#pricing", label: "تعرفه خدمات", short: "تعرفه" },
  { href: "#why", label: "چرا خودرو چاره", short: "مزایا" },
  { href: "#steps", label: "مراحل دریافت خدمت", short: "مراحل خدمت" },
  { href: "#request", label: "ثبت درخواست", short: "ثبت درخواست" },
  { href: "#reviews", label: "رضایت مشتریان", short: "نظرات" },
  { href: "#faq", label: "سوالات متداول", short: "سوالات" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // قفل اسکرول صفحه هنگام باز بودن منوی کشویی + بستن با Escape و بزرگ شدن صفحه
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <>
      {/* نوار تماس بالای سایت */}
      <div className="bg-brand-500 text-navy-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-[12px] font-bold min-[480px]:text-[13px] sm:justify-between sm:px-6 lg:px-5 lg:text-[12px] xl:px-6 xl:text-[13px]">
          <p className="flex items-center gap-1.5">
            <Clock className="size-4 shrink-0" aria-hidden />
            امداد خودرو چاره — شبانه‌روزی در سراسر تهران
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE.phoneShortHref}
              className="flex items-center gap-1.5 whitespace-nowrap transition hover:text-white"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
            <a
              href={SITE.phoneMainHref}
              className="hidden items-center gap-1.5 whitespace-nowrap transition hover:text-white sm:flex"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              <span dir="ltr">{SITE.phoneMain}</span>
            </a>
          </div>
        </div>
      </div>

      {/* هدر اصلی */}
      <header
        className={`sticky top-0 z-50 bg-navy-900 transition-shadow ${
          scrolled ? "shadow-[0_10px_30px_rgba(4,11,22,0.35)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:gap-4 lg:px-5 xl:px-6">
          <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="خودرو چاره — بازگشت به بالای صفحه">
            <Image
              src="/images/logo.webp"
              alt="لوگوی خودرو چاره"
              width={2172}
              height={724}
              priority
              className="h-10 w-auto sm:h-12 lg:h-11 xl:h-12"
            />
          </a>

          {/* منوی دسکتاپ: در لپ‌تاپ کوچک فونت ریزتر + برچسب کوتاه؛ در دسکتاپ بزرگ نسخه کامل */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-2.5 text-[12.5px] font-semibold text-navy-100 lg:flex xl:gap-3.5 xl:text-[13px]"
            aria-label="ناوبری اصلی"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="whitespace-nowrap transition hover:text-brand-400"
              >
                <span className="xl:hidden">{item.short}</span>
                <span className="hidden xl:inline">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={SITE.phoneShortHref}
              className="ring-pulse hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-500 px-3 py-2 text-[13px] font-extrabold text-navy-950 transition hover:bg-brand-400 md:flex xl:gap-2 xl:px-4 xl:py-2.5 xl:text-sm"
            >
              <Phone className="size-4 shrink-0 xl:size-4.5" aria-hidden />
              <span className="hidden xl:inline">تماس فوری:</span>
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label="باز کردن منو"
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-brand-500 hover:text-brand-400 lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* منوی کشویی موبایل و تبلت — بازشونده از سمت راست به چپ */}
      <div
        style={{ visibility: open ? "visible" : "hidden", transitionDelay: open ? "0ms" : "300ms" }}
        className={`fixed inset-0 z-[70] transition-[visibility] lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* پس‌زمینه تیره */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-navy-950/65 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* پنل کشویی از راست */}
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="منوی اصلی سایت"
          className={`absolute inset-y-0 right-0 flex w-80 max-w-[86vw] flex-col bg-navy-900 shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
            <Image
              src="/images/logo.webp"
              alt="لوگوی خودرو چاره"
              width={2172}
              height={724}
              className="h-10 w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="بستن منو"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-brand-500 hover:text-brand-400"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="ناوبری موبایل">
            <ul className="space-y-1">
              {NAV.map((item, i) => (
                <li
                  key={item.href}
                  style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                  className={`transition-all duration-300 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  }`}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-bold text-navy-100 transition hover:bg-navy-800 hover:text-brand-300"
                  >
                    {item.label}
                    <span className="text-silver-500" aria-hidden>
                      ←
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-white/10 px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <a
              href={SITE.phoneShortHref}
              className="ring-pulse flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-3.5 font-extrabold text-navy-950"
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              تماس فوری با خودرو چاره
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
            <a
              href={SITE.phoneMainHref}
              className="flex items-center justify-center gap-2 rounded-2xl bg-navy-800 px-5 py-3.5 font-extrabold text-white ring-1 ring-white/10 transition hover:bg-navy-700"
            >
              <Phone className="size-5 shrink-0 text-brand-400" aria-hidden />
              مرکز خودرو چاره
              <span dir="ltr">{SITE.phoneMain}</span>
            </a>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#1fa855] px-5 py-3.5 font-extrabold text-white transition hover:bg-[#25c05f]"
            >
              <Image
                src="/images/icons/whatsapp.jpg"
                alt=""
                width={512}
                height={512}
                className="size-6 shrink-0 rounded-full object-cover"
              />
              ارسال لوکیشن در واتساپ
            </a>
            <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[13px] font-semibold text-navy-200">
              <Clock className="size-4 shrink-0 text-brand-400" aria-hidden />
              {SITE.hours}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

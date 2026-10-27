"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/data";

const NAV = [
  { href: "#services", label: "خدمات ما" },
  { href: "#pricing", label: "تعرفه خدمات" },
  { href: "#why", label: "چرا خودرو چاره" },
  { href: "#steps", label: "مراحل دریافت خدمت" },
  { href: "#request", label: "ثبت درخواست" },
  { href: "#reviews", label: "رضایت مشتریان" },
  { href: "#faq", label: "سوالات متداول" },
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

  return (
    <>
      {/* نوار تماس بالای سایت */}
      <div className="bg-brand-500 text-navy-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-[13px] font-bold sm:px-6">
          <p className="flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            امداد خودرو چاره — شبانه‌روزی در سراسر تهران
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE.phoneShortHref}
              className="flex items-center gap-1.5 transition hover:text-white"
            >
              <Phone className="size-4" aria-hidden />
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
            <a
              href={SITE.phoneMainHref}
              className="hidden items-center gap-1.5 transition hover:text-white sm:flex"
            >
              <Phone className="size-4" aria-hidden />
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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <a href="#top" className="flex items-center gap-3" aria-label="خودرو چاره — بازگشت به بالای صفحه">
            <Image
              src="/images/logo.webp"
              alt="لوگوی خودرو چاره"
              width={2172}
              height={724}
              priority
              className="h-11 w-auto sm:h-13"
            />
          </a>

          <nav className="hidden items-center gap-6 text-[15px] font-semibold text-navy-100 xl:flex" aria-label="ناوبری اصلی">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-brand-400">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneShortHref}
              className="ring-pulse hidden items-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-extrabold text-navy-950 transition hover:bg-brand-400 md:flex"
            >
              <Phone className="size-4.5" aria-hidden />
              تماس فوری:
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-brand-500 hover:text-brand-400 xl:hidden"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>

        {/* منوی موبایل */}
        {open && (
          <nav className="border-t border-white/10 xl:hidden" aria-label="ناوبری موبایل">
            <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:grid-cols-2 sm:px-6">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 font-semibold text-navy-100 transition hover:bg-navy-800 hover:text-brand-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mx-auto max-w-7xl px-4 pb-5 sm:px-6">
              <a
                href={SITE.phoneShortHref}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-3.5 font-extrabold text-navy-950"
              >
                <Phone className="size-5" aria-hidden />
                تماس فوری با خودرو چاره
                <span dir="ltr">{SITE.phoneShort}</span>
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

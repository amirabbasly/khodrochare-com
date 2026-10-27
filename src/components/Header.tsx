"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Clock, Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/data";

const NAV = [
  { href: "#services", label: "خدمات" },
  { href: "#steps", label: "نحوه درخواست" },
  { href: "#fleet", label: "ناوگان امدادی" },
  { href: "#center", label: "مرکز خودرو چاره" },
  { href: "#faq", label: "پرسش‌های متداول" },
  { href: "#request", label: "ثبت درخواست" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* نوار بالایی */}
      <div className="bg-brand-500 text-navy-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-[13px] font-semibold sm:px-6">
          <p className="flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            <span className="hidden sm:inline">{SITE.hours}</span>
            <span className="sm:hidden">شبانه‌روزی — ۲۴/۷</span>
          </p>
          <div className="flex items-center gap-4" dir="ltr">
            <a href={SITE.phoneShortHref} className="transition hover:text-white">
              {SITE.phoneShort}
            </a>
            <a href={SITE.phoneMainHref} className="hidden transition hover:text-white md:inline">
              {SITE.phoneMain}
            </a>
          </div>
        </div>
      </div>

      {/* هدر اصلی */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-navy-950/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur"
            : "border-transparent bg-navy-950/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <a href="#top" className="flex shrink-0 items-center" aria-label="خودرو چاره — صفحه اصلی">
            <Image
              src="/images/logo.webp"
              alt="لوگوی خودرو چاره"
              width={2172}
              height={724}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </a>

          <nav className="hidden items-center gap-7 text-[15px] font-medium text-silver-300 lg:flex" aria-label="ناوبری اصلی">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-brand-400">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneShortHref}
              className="ring-pulse hidden items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-extrabold text-navy-950 transition hover:bg-brand-400 sm:flex"
            >
              <Phone className="size-4" aria-hidden />
              تماس فوری
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-brand-500 hover:text-brand-400 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "بستن منو" : "باز کردن منو"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* منوی موبایل */}
        {open && (
          <nav className="border-t border-white/10 px-4 py-4 lg:hidden" aria-label="ناوبری موبایل">
            <ul className="space-y-1 text-[15px] font-medium text-silver-300">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 transition hover:bg-navy-800 hover:text-brand-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={SITE.phoneShortHref}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-extrabold text-navy-950"
            >
              <Phone className="size-4" aria-hidden />
              تماس با خودرو چاره
              <span dir="ltr">{SITE.phoneShort}</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

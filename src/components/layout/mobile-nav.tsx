"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, Icon, MenuIcon, WhatsAppIcon } from "@/components/icons";
import { areaGroups, mainNav, navServices } from "@/data/nav";
import { areaBySlug } from "@/data/areas";
import { roadBySlug } from "@/data/roads";
import { telHref, whatsappHref } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-xl border border-ink-200 text-ink-700 lg:hidden"
        aria-label="باز کردن منو"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <MenuIcon className="size-6" />
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="منوی سایت"
        >
          <button
            type="button"
            aria-label="بستن منو"
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-4 shadow-lift">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-ink-900">منو</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-ink-200 text-ink-700"
                aria-label="بستن منو"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={telHref}
                className="btn bg-brand-400 text-ink-950 text-sm"
                onClick={() => setOpen(false)}
              >
                <Icon name="phone" className="size-4" />
                تماس فوری
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-trust-600 text-white text-sm"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon className="size-4" />
                واتساپ
              </a>
            </div>

            <nav className="mt-5 flex flex-col gap-1" aria-label="ناوبری اصلی">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-bold text-ink-800 hover:bg-ink-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-ink-100 pt-4">
              <p className="px-3 text-xs font-extrabold text-ink-400">خدمات امداد</p>
              <div className="mt-2 flex flex-col">
                {navServices.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm text-ink-700 hover:bg-ink-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-ink-100 pt-4">
              <p className="px-3 text-xs font-extrabold text-ink-400">مناطق مهم</p>
              {areaGroups.map((group) => (
                <div key={group.title} className="mt-2">
                  <p className="px-3 text-[0.7rem] font-bold text-ink-400">{group.title}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5 px-3 pb-2">
                    {group.slugs.map((slug) => {
                      const area = areaBySlug.get(slug);
                      if (!area) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/areas/${slug}`}
                          onClick={() => setOpen(false)}
                          className="rounded-lg border border-ink-200 px-2 py-1 text-xs text-ink-700"
                        >
                          {area.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 border-t border-ink-100 pt-4">
              <p className="px-3 text-xs font-extrabold text-ink-400">آزادراه‌ها و محورها</p>
              <div className="mt-1 flex flex-wrap gap-1.5 px-3 pb-6">
                {["tehran-shomal-freeway", "chalous", "haraz", "firuzkuh", "karaj-qazvin", "qazvin-rasht", "tehran-qom", "tehran-saveh"].map(
                  (slug) => {
                    const road = roadBySlug.get(slug);
                    if (!road) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/roads/${slug}`}
                        onClick={() => setOpen(false)}
                        className="rounded-lg border border-ink-200 px-2 py-1 text-xs text-ink-700"
                      >
                        {road.name}
                      </Link>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

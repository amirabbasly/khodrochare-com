import Link from "next/link";
import { ChevronDown, Icon, Logo, WhatsAppIcon } from "@/components/icons";
import { MobileNav } from "@/components/layout/mobile-nav";
import { areaGroups, mainNav, navServices } from "@/data/nav";
import { areaBySlug } from "@/data/areas";
import { roads } from "@/data/roads";
import { siteConfig, telHref, whatsappHref } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label={siteConfig.brand.fa}>
          <Logo className="size-10 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold text-ink-900">{siteConfig.brand.fa}</span>
            <span className="text-[0.68rem] text-ink-500">امداد خودرو شبانه‌روزی</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="ناوبری اصلی">
          <div className="group relative">
            <Link
              href="/services"
              className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold text-ink-700 transition hover:bg-ink-50"
            >
              خدمات امداد
              <ChevronDown className="size-4 text-ink-400 transition group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute right-0 top-full z-50 w-[22rem] translate-y-1 rounded-2xl border border-ink-100 bg-white p-2 opacity-0 shadow-lift transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {navServices.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition hover:bg-ink-50"
                >
                  <span className="text-sm font-bold text-ink-800">{item.label}</span>
                  <span className="text-xs text-ink-500">{item.tagline}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/areas"
              className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold text-ink-700 transition hover:bg-ink-50"
            >
              مناطق
              <ChevronDown className="size-4 text-ink-400 transition group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute right-0 top-full z-50 grid w-[38rem] grid-cols-2 gap-2 rounded-2xl border border-ink-100 bg-white p-3 opacity-0 shadow-lift transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {areaGroups.map((group) => (
                <div key={group.title} className="rounded-xl bg-ink-50/70 p-2.5">
                  <p className="mb-1.5 text-xs font-extrabold text-ink-500">{group.title}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.slugs.map((slug) => {
                      const area = areaBySlug.get(slug);
                      if (!area) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/areas/${slug}`}
                          className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-ink-700 transition hover:text-brand-700"
                        >
                          {area.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
              <Link
                href="/areas"
                className="col-span-2 rounded-xl bg-brand-50 px-3 py-2 text-center text-xs font-extrabold text-brand-800"
              >
                مشاهده همه مناطق تحت پوشش
              </Link>
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/roads"
              className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold text-ink-700 transition hover:bg-ink-50"
            >
              محورها
              <ChevronDown className="size-4 text-ink-400 transition group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute right-0 top-full z-50 w-[20rem] rounded-2xl border border-ink-100 bg-white p-2 opacity-0 shadow-lift transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {roads.map((road) => (
                <Link
                  key={road.slug}
                  href={`/roads/${road.slug}`}
                  className="block rounded-xl px-3 py-2 text-sm font-bold text-ink-700 transition hover:bg-ink-50"
                >
                  {road.name}
                </Link>
              ))}
            </div>
          </div>

          {mainNav
            .filter((item) => ["/pricing", "/blog", "/about", "/contact"].includes(item.href))
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-bold text-ink-700 transition hover:bg-ink-50"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-xl border border-trust-100 bg-trust-50 px-3 py-2 text-xs font-extrabold text-trust-700 sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            واتساپ
          </a>
          <a
            href={telHref}
            data-source="header"
            className="hidden items-center gap-2 rounded-xl bg-brand-400 px-3.5 py-2.5 text-sm font-extrabold text-ink-950 shadow-[0_8px_24px_-12px_rgba(247,144,9,0.8)] sm:inline-flex"
          >
            <Icon name="phone" className="size-4" />
            <span className="nums">{siteConfig.contact.mobileDisplay}</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon, WhatsAppIcon } from "@/components/icons";
import { telHref, whatsappHref } from "@/lib/site";

/** نوار تماس چسبان موبایل که پس از اسکرول ظاهر می‌شود */
export function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`no-print fixed inset-x-0 bottom-0 z-40 border-t border-ink-800 bg-ink-950/95 px-3 py-2.5 backdrop-blur transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={telHref}
          data-source="sticky"
          className="btn animate-pulse-ring bg-alert-500 px-2 py-3 text-xs text-white"
          aria-label="تماس فوری با امداد خودرو"
        >
          <Icon name="phone" className="size-4" />
          تماس فوری
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-trust-600 px-2 py-3 text-xs text-white"
        >
          <WhatsAppIcon className="size-4" />
          واتساپ
        </a>
        <Link href="/request" className="btn border border-white/20 px-2 py-3 text-xs text-white">
          <Icon name="pin" className="size-4" />
          درخواست
        </Link>
      </div>
    </div>
  );
}

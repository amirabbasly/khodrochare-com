import { Phone } from "lucide-react";
import { SITE } from "@/lib/data";

export default function MobileCallBar() {
  return (
    <>
      {/* دکمه تماس فوری شناور موبایل — تنها دکمه نوار پایین */}
      <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <a
          href={SITE.phoneShortHref}
          className="ring-pulse flex items-center justify-center gap-2.5 rounded-3xl bg-brand-500 px-5 py-4 text-base font-extrabold text-navy-950 shadow-2xl shadow-brand-500/40"
          aria-label={`تماس فوری با خودرو چاره: ${SITE.phoneShort}`}
        >
          <Phone className="size-6 shrink-0" aria-hidden />
          تماس فوری شبانه‌روزی
          <span dir="ltr" className="text-lg leading-none">
            {SITE.phoneShort}
          </span>
        </a>
      </div>

      {/* دکمه تماس شناور دسکتاپ — مناسب لندینگ تبلیغاتی */}
      <a
        href={SITE.phoneShortHref}
        className="ring-pulse fixed bottom-6 left-6 z-50 hidden items-center gap-3 rounded-full bg-brand-500 py-3 pl-6 pr-3.5 font-extrabold text-navy-950 shadow-2xl shadow-brand-500/40 transition hover:bg-brand-400 lg:flex"
        aria-label={`تماس فوری با خودرو چاره: ${SITE.phoneShort}`}
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-navy-950 text-brand-400">
          <Phone className="size-5" aria-hidden />
        </span>
        <span className="leading-5">
          <span className="block text-xs font-bold text-navy-900/75">تماس فوری شبانه‌روزی</span>
          <span dir="ltr" className="block text-lg leading-6">
            {SITE.phoneShort}
          </span>
        </span>
      </a>
    </>
  );
}

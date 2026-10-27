import { ClipboardList, Phone, Star } from "lucide-react";
import { SITE } from "@/lib/data";

export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="mx-3 mb-3 grid grid-cols-[1.5fr_1fr_auto] items-stretch gap-2 rounded-3xl bg-navy-950/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur">
        <a
          href={SITE.phoneShortHref}
          className="ring-pulse flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-3 py-3.5 text-sm font-extrabold text-navy-950"
        >
          <Phone className="size-5 shrink-0" aria-hidden />
          تماس فوری
          <span dir="ltr">{SITE.phoneShort}</span>
        </a>
        <a
          href="#request"
          className="flex items-center justify-center gap-1.5 rounded-2xl bg-navy-800 px-3 py-3.5 text-sm font-extrabold text-white ring-1 ring-white/10"
        >
          <ClipboardList className="size-5 shrink-0 text-brand-400" aria-hidden />
          ثبت درخواست
        </a>
        <a
          href="#reviews"
          aria-label="ثبت رضایت مشتری"
          className="flex items-center justify-center rounded-2xl bg-navy-800 px-3.5 text-white ring-1 ring-white/10"
        >
          <Star className="size-5 fill-brand-400 text-brand-400" aria-hidden />
        </a>
      </div>
    </div>
  );
}

import { ClipboardList, Phone } from "lucide-react";
import { SITE } from "@/lib/data";

export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-950/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-3">
        <a
          href={SITE.phoneShortHref}
          className="ring-pulse flex items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-3 text-sm font-extrabold text-navy-950"
        >
          <Phone className="size-4" aria-hidden />
          تماس با امداد
          <span dir="ltr">{SITE.phoneShort}</span>
        </a>
        <a
          href="#request"
          className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-extrabold text-white transition hover:border-brand-500"
        >
          <ClipboardList className="size-4 text-brand-400" aria-hidden />
          ثبت درخواست
        </a>
      </div>
    </div>
  );
}

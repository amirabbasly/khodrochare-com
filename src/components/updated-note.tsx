import { Icon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

/**
 * یادداشت بازبینی محتوا (سیگنال تازگی و اعتبار برای کاربر و موتور جست‌وجو).
 * در پایین صفحه‌های خدمات، مناطق، محورها و مقالات نمایش داده می‌شود.
 */
export function UpdatedNote({
  scope,
  className,
}: {
  /** توضیح کوتاه اینکه چه چیزی بازبینی شده است */
  scope?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3 text-xs leading-6 text-ink-600 ${className ?? ""}`}
    >
      <span className="inline-flex items-center gap-1.5 font-bold text-ink-700">
        <Icon name="checklist" className="size-4 text-brand-600" />
        بازبینی محتوا: {siteConfig.contentUpdated}
      </span>
      <span className="text-ink-500">
        {scope ??
          "این صفحه بر اساس تجربه عملیاتی تیم‌های امداد و اطلاعات مسیرها بازبینی و به‌روزرسانی می‌شود."}
      </span>
    </div>
  );
}

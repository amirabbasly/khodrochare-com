import { ChevronDown } from "@/components/icons";
import type { QA } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * آکاردئون سؤالات متداول — بر پایه <details> تا بدون جاوااسکریپت هم کار کند
 * و برای کراولرها کاملاً قابل خواندن باشد.
 */
export function FaqAccordion({
  items,
  tone = "light",
  className,
}: {
  items: QA[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <details
          key={item.q}
          className={cn(
            "group rounded-2xl border transition",
            tone === "dark"
              ? "border-white/10 bg-white/[0.04] open:bg-white/[0.07]"
              : "border-ink-100 bg-white open:border-brand-200 open:shadow-soft",
          )}
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-4 p-4 text-start sm:p-5",
              "[&::-webkit-details-marker]:hidden",
            )}
          >
            <h3
              className={cn(
                "text-[1.02rem] font-extrabold leading-8",
                tone === "dark" ? "text-white" : "text-ink-900",
              )}
            >
              {item.q}
            </h3>
            <ChevronDown
              className={cn(
                "mt-1 size-5 shrink-0 transition-transform duration-200 group-open:rotate-180",
                tone === "dark" ? "text-brand-300" : "text-brand-500",
              )}
            />
          </summary>
          <div
            className={cn(
              "border-t px-4 py-4 text-[0.98rem] leading-8 sm:px-5",
              tone === "dark"
                ? "border-white/10 text-ink-200"
                : "border-ink-100 text-ink-600",
            )}
          >
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

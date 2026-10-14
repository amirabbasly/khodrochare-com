import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * نمایش تدریجی محتوا با اسکرول — کاملاً CSS، بدون جاوااسکریپت.
 * از `animation-timeline: view()` استفاده می‌کند؛ در مرورگرهایی که پشتیبانی
 * نمی‌کنند، محتوا بدون انیمیشن و کاملاً خوانا نمایش داده می‌شود
 * (بنابراین برای سئو و دسترس‌پذیری هیچ ریسکی ندارد و هیدریشن لازم نیست).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

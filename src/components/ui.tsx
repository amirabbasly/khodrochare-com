import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import type { ContentBlock, IconKey } from "@/data/types";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* دکمه‌ها                                                             */
/* ------------------------------------------------------------------ */

type BtnVariant = "primary" | "outline" | "ghost" | "alert" | "white";

const btnStyles: Record<BtnVariant, string> = {
  primary:
    "btn bg-brand-400 text-ink-950 hover:bg-brand-300 shadow-[0_10px_30px_-12px_rgba(247,144,9,0.7)]",
  outline:
    "btn border border-ink-200 bg-white text-ink-800 hover:border-ink-300 hover:bg-ink-50",
  ghost: "btn text-ink-700 hover:bg-ink-100",
  alert:
    "btn bg-alert-500 text-white hover:bg-alert-600 shadow-[0_10px_30px_-12px_rgba(229,72,77,0.65)]",
  white: "btn bg-white text-ink-900 hover:bg-ink-50 shadow-lift",
};

/** اجازه عبور صفت‌های data-* (مثلاً data-source برای ردیابی کلیک تماس) */
type DataAttributes = { [key: `data-${string}`]: string | undefined };

export function BtnLink({
  href,
  children,
  variant = "primary",
  className,
  external,
  ariaLabel,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
} & DataAttributes) {
  if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={cn(btnStyles[variant], className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(btnStyles[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* نشان، برچسب، عنوان بخش                                             */
/* ------------------------------------------------------------------ */

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "ink" | "alert" | "trust" | "white";
  className?: string;
}) {
  const tones = {
    brand: "bg-brand-100 text-brand-800 border-brand-200",
    ink: "bg-ink-100 text-ink-700 border-ink-200",
    alert: "bg-alert-50 text-alert-700 border-alert-100",
    trust: "bg-trust-50 text-trust-700 border-trust-100",
    white: "bg-white/10 text-white border-white/20",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  tone?: "light" | "dark";
  as?: "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-start",
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-extrabold tracking-wide",
            tone === "dark" ? "text-brand-300" : "text-brand-600",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <As
        className={cn(
          "text-2xl leading-[1.6] sm:text-3xl",
          tone === "dark" ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </As>
      {description ? (
        <p
          className={cn(
            "max-w-3xl text-[0.98rem] leading-8",
            tone === "dark" ? "text-ink-200" : "text-ink-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "muted" | "dark";
}) {
  const tones = {
    light: "bg-white",
    muted: "bg-ink-50",
    dark: "bg-ink-950 text-ink-100",
  } as const;
  return (
    <section id={id} className={cn("py-14 sm:py-20", tones[tone], className)}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* کارت ویژگی                                                          */
/* ------------------------------------------------------------------ */

export function FeatureCard({
  icon,
  title,
  text,
  tone = "light",
}: {
  icon: IconKey;
  title: string;
  text: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-3 rounded-2xl border p-5 transition",
        tone === "dark"
          ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
          : "border-ink-100 bg-white hover:border-brand-200 hover:shadow-lift",
      )}
    >
      <span
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-xl",
          tone === "dark" ? "bg-brand-400/15 text-brand-300" : "bg-brand-100 text-brand-700",
        )}
      >
        <Icon name={icon} className="size-6" />
      </span>
      <h3 className={cn("text-base font-extrabold", tone === "dark" && "text-white")}>{title}</h3>
      <p className={cn("text-sm leading-7", tone === "dark" ? "text-ink-300" : "text-ink-600")}>
        {text}
      </p>
    </div>
  );
}

export function StatCard({
  value,
  label,
  hint,
  tone = "dark",
}: {
  value: string;
  label: string;
  hint?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 text-center",
        tone === "dark" ? "border-white/10 bg-white/[0.04]" : "border-ink-100 bg-white",
      )}
    >
      <div
        className={cn(
          "nums text-2xl font-extrabold",
          tone === "dark" ? "text-brand-300" : "text-brand-600",
        )}
      >
        {value}
      </div>
      <div className={cn("mt-1 text-sm font-bold", tone === "dark" ? "text-white" : "text-ink-800")}>
        {label}
      </div>
      {hint ? (
        <div className={cn("mt-1 text-xs", tone === "dark" ? "text-ink-400" : "text-ink-500")}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* بلوک‌های محتوا                                                      */
/* ------------------------------------------------------------------ */

export function Prose({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "h2":
            return (
              <h2 key={index} className="mt-4 text-xl leading-9 sm:text-2xl">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="mt-2 text-lg">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="text-[1.02rem] leading-9 text-ink-700">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="flex flex-col gap-2.5">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[1.02rem] leading-8 text-ink-700">
                    <span className="mt-3 size-1.5 shrink-0 rounded-full bg-brand-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="flex flex-col gap-2.5">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[1.02rem] leading-8 text-ink-700">
                    <span className="nums mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-xs font-extrabold text-ink-700">
                      {(i + 1).toLocaleString("fa-IR")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <div
                key={index}
                className="rounded-2xl border border-brand-200 bg-brand-50 p-4 sm:p-5"
              >
                {block.title ? (
                  <div className="mb-1.5 flex items-center gap-2 text-sm font-extrabold text-brand-800">
                    <Icon name="shield" className="size-4.5" />
                    {block.title}
                  </div>
                ) : null}
                <p className="text-[0.98rem] leading-8 text-ink-700">{block.text}</p>
              </div>
            );
          case "table":
            return (
              <div key={index} className="overflow-x-auto rounded-2xl border border-ink-100">
                <table className="w-full min-w-[34rem] border-collapse text-start text-sm">
                  <thead className="bg-ink-50">
                    <tr>
                      {block.head.map((cell) => (
                        <th
                          key={cell}
                          className="border-b border-ink-100 px-4 py-3 text-start font-extrabold text-ink-800"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="odd:bg-white even:bg-ink-50/60">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="border-b border-ink-100 px-4 py-3 align-top leading-7 text-ink-700"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}

export function CheckList({
  items,
  tone = "light",
  className,
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "dark" ? "bg-brand-400/20 text-brand-300" : "bg-trust-100 text-trust-700",
            )}
          >
            <Icon name="shield" className="size-3.5" />
          </span>
          <span
            className={cn(
              "text-[0.98rem] leading-8",
              tone === "dark" ? "text-ink-200" : "text-ink-700",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

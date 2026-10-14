import Link from "next/link";
import { ArrowLeft, Icon } from "@/components/icons";
import { Badge } from "@/components/ui";
import type { Area, Post, Road, Service } from "@/data/types";
import { fa } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-400 group-hover:text-ink-950">
        <Icon name={service.icon} className="size-6" />
      </span>
      <h3 className="text-base font-extrabold leading-7 text-ink-900">{service.shortName}</h3>
      <p className="text-sm leading-7 text-ink-600">{service.tagline}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
        جزئیات خدمت
        <ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" />
      </span>
    </Link>
  );
}

export function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-ink-100 bg-white p-4 transition hover:border-brand-300 hover:shadow-soft"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-extrabold text-ink-900">{area.name}</h3>
        <Icon name="pin" className="size-4 text-brand-500" />
      </div>
      <p className="line-clamp-2 text-xs leading-6 text-ink-500">
        {area.kind === "metropolis"
          ? "پوشش همه مناطق ۲۲گانه تهران"
          : `شهرستان ${area.county}`}
      </p>
      <span className="mt-1 text-xs font-bold text-brand-700">
        میانگین اعزام: {fa(area.responseTime.min)} تا {fa(area.responseTime.max)} دقیقه
      </span>
    </Link>
  );
}

export function RoadCard({ road, tone = "light" }: { road: Road; tone?: "light" | "dark" }) {
  const kindLabel = {
    freeway: "آزادراه",
    "mountain-road": "محور کوهستانی",
    "urban-corridor": "محور شهری",
  }[road.kind];

  const isDark = tone === "dark";

  return (
    <Link
      href={`/roads/${road.slug}`}
      className={
        isDark
          ? "group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-brand-400/40 hover:bg-white/[0.07]"
          : "group flex h-full flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <Badge tone={isDark ? "white" : "ink"}>{kindLabel}</Badge>
        <span className={`nums text-xs ${isDark ? "text-ink-300" : "text-ink-400"}`}>
          {fa(road.lengthKm)} کیلومتر
        </span>
      </div>
      <h3 className={`text-lg font-extrabold ${isDark ? "text-white" : "text-ink-900"}`}>
        {road.name}
      </h3>
      <p className={`text-sm leading-7 ${isDark ? "text-ink-300" : "text-ink-600"}`}>
        {road.from} → {road.to}
      </p>
      <span
        className={`mt-auto inline-flex items-center gap-1.5 text-sm font-bold ${
          isDark ? "text-brand-300" : "text-brand-700"
        }`}
      >
        راهنمای امداد این مسیر
        <ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" />
      </span>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
    >
      <div className="flex items-center justify-between gap-3 text-xs">
        <Badge tone="ink">{post.category}</Badge>
        <span className="nums text-ink-400">{fa(post.readingMinutes)} دقیقه مطالعه</span>
      </div>
      <h3 className="text-base font-extrabold leading-7 text-ink-900 group-hover:text-brand-700">
        {post.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-7 text-ink-600">{post.excerpt}</p>
      <span className="mt-auto text-xs font-bold text-brand-700">ادامه مطلب</span>
    </Link>
  );
}

export function LinkChips({
  items,
  className,
}: {
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {items.map((item) => (
        <Link
          key={`${item.href}-${item.label}`}
          href={item.href}
          className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

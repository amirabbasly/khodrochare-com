"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { Badge } from "@/components/ui";
import { areas } from "@/data/areas";
import { coverageByCounty } from "@/data/site-content";
import type { Area } from "@/data/types";
import { fa, matches } from "@/lib/utils";

export function CoverageExplorer({
  initialAreas = areas,
  title = "منطقه خود را پیدا کنید",
}: {
  initialAreas?: Area[];
  title?: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      initialAreas.filter((area) =>
        matches(
          query,
          area.name,
          area.county,
          area.keywords.join(" "),
          area.neighborhoods.join(" "),
        ),
      ),
    [initialAreas, query],
  );

  const filteredPlaces = useMemo(() => {
    if (query.trim().length < 2) return [];
    return coverageByCounty
      .flatMap((group) => group.places.map((place) => ({ place, county: group.county, slug: group.areaSlug })))
      .filter((item) => matches(query, item.place, item.county))
      .slice(0, 14);
  }, [query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:flex-row sm:items-center">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
          <Icon name="pin" className="size-6" />
        </span>
        <div className="flex-1">
          <label htmlFor="coverage-search" className="mb-1.5 block text-sm font-extrabold text-ink-800">
            {title}
          </label>
          <input
            id="coverage-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="نام شهر، محله یا مسیر را بنویسید… (مثال: تجریش، پرند، کندوان)"
            className="w-full rounded-xl border border-ink-200 px-3.5 py-3 text-sm outline-none transition focus:border-brand-400"
            type="search"
          />
        </div>
      </div>

      {filteredPlaces.length > 0 ? (
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4">
          <p className="mb-2 text-xs font-extrabold text-brand-800">
            موارد یافت‌شده در فهرست محله‌ها و شهرها
          </p>
          <ul className="flex flex-wrap gap-2">
            {filteredPlaces.map((item) => (
              <li key={`${item.county}-${item.place}`}>
                {item.slug ? (
                  <Link
                    href={`/areas/${item.slug}`}
                    className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-ink-700 transition hover:text-brand-700"
                  >
                    {item.place}
                  </Link>
                ) : (
                  <span className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-ink-700">
                    {item.place}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6 text-center text-sm text-ink-600">
          برای این عبارت منطقه‌ای ثبت نشده است؛ اما پوشش ما محدود به فهرست زیر نیست. همین حالا
          تماس بگیرید تا امکان اعزام به موقعیت شما بررسی شود.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-ink-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-extrabold leading-6 text-ink-900 group-hover:text-brand-700">
                  {area.name}
                </h3>
                <Badge tone={area.kind === "metropolis" ? "brand" : "ink"}>
                  {area.kind === "metropolis" ? "کلان‌شهر" : area.kind === "resort" ? "ییلاقی" : "شهری"}
                </Badge>
              </div>
              <p className="text-xs leading-6 text-ink-500">
                {area.neighborhoods.slice(0, 5).join("، ")}
                {area.neighborhoods.length > 5 ? " و…" : ""}
              </p>
              <p className="mt-auto text-xs font-bold text-brand-700">
                اعزام: {fa(area.responseTime.min)} تا {fa(area.responseTime.max)} دقیقه
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

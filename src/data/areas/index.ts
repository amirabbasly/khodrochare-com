import type { Area } from "@/data/types";
import { areasPart1 } from "@/data/areas/part1";
import { areasPart2 } from "@/data/areas/part2";

export const areas: Area[] = [...areasPart1, ...areasPart2];

export const areaBySlug = new Map(areas.map((area) => [area.slug, area]));

export function getArea(slug: string): Area | undefined {
  return areaBySlug.get(slug);
}

/** تبدیل slug به نام برای لینک‌سازی داخلی */
export function areaLabel(slug: string): string {
  return areaBySlug.get(slug)?.name ?? slug;
}

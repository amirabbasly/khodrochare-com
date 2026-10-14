import Link from "next/link";
import { ChevronDown } from "@/components/icons";

export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; path?: string }[];
}) {
  return (
    <nav aria-label="مسیر صفحه" className="text-xs text-ink-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-brand-600">
            خانه
          </Link>
        </li>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              <ChevronDown className="size-3.5 -rotate-90 text-ink-300" />
              {item.path && !isLast ? (
                <Link href={item.path} className="hover:text-brand-600">
                  {item.name}
                </Link>
              ) : (
                <span className={isLast ? "font-bold text-ink-700" : undefined} aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

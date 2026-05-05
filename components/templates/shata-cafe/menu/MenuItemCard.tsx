"use client";

import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/lib/shata-cafe/types";
import { MenuBadge } from "@/components/templates/shata-cafe/ui/Atoms";

export function MenuItemCard({
  item,
  basePath,
}: {
  item: MenuItem;
  basePath: string;
}) {
  const href = `${basePath}/menu/${item.handle}`;
  const image = item.images[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link href={href} className="relative block h-48 overflow-hidden bg-[color:var(--cafe-surface)]">
        {image && (
          <Image
            src={image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            unoptimized
          />
        )}
        {item.badge && (
          <div className="absolute left-3 top-3">
            <MenuBadge kind={item.badge} />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={href}>
            <h3 className="font-bold text-[color:var(--cafe-fg)] hover:text-[color:var(--cafe-accent)] transition-colors leading-snug text-sm">
              {item.name}
            </h3>
          </Link>
          <span className="shrink-0 font-bold text-[color:var(--cafe-accent)] text-sm">{item.price}</span>
        </div>

        {item.shortDescription && (
          <p className="mt-1.5 text-[13px] text-[color:var(--cafe-muted)] leading-5 flex-1 line-clamp-2">
            {item.shortDescription}
          </p>
        )}

        <div className="mt-3 pt-3 border-t border-[color:var(--cafe-border)] flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--cafe-muted)]">
            {item.category}
          </span>
          <Link
            href={href}
            className="text-[12px] font-semibold text-[color:var(--cafe-accent)] hover:underline"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function MenuItemGrid({
  items,
  basePath,
}: {
  items: MenuItem[];
  basePath: string;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} basePath={basePath} />
      ))}
    </div>
  );
}

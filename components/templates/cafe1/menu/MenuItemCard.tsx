import Link from "next/link";
import Image from "next/image";
import type { MenuItem } from "@/lib/cafe1/types";

const BADGE_CLS: Record<string, string> = {
  new:      "bg-green-100 text-green-800",
  popular:  "bg-amber-100 text-amber-800",
  spicy:    "bg-red-100 text-red-700",
  vegan:    "bg-emerald-100 text-emerald-700",
  seasonal: "bg-blue-100 text-blue-700",
};

export function MenuItemCard({ item, href }: { item: MenuItem; href: string }) {
  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-[var(--c1-radius,4px)] bg-white border border-[color:var(--c1-primary)] transition-shadow hover:shadow-md">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] bg-[color:var(--c1-primary)] overflow-hidden">
          {item.images[0] ? (
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[color:var(--c1-accent)] opacity-30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {item.badge && (
            <span
              className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${BADGE_CLS[item.badge] ?? "bg-gray-100 text-gray-700"}`}
            >
              {item.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-[color:var(--c1-header)] leading-snug group-hover:text-[color:var(--c1-accent)] transition-colors line-clamp-2">
              {item.name}
            </h3>
            <span className="shrink-0 text-sm font-bold text-[color:var(--c1-accent)]">{item.price}</span>
          </div>
          {(item.shortDescription || item.description) && (
            <p className="mt-1.5 text-xs text-[color:var(--c1-body)] opacity-80 line-clamp-2">
              {item.shortDescription || item.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

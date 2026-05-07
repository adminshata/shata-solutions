import type { ReactNode } from "react";
import type { ProductBadge } from "@/lib/supermarket4/types";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container mx-auto px-4 ${className}`}>{children}</div>;
}

const BADGE_STYLES: Record<string, string> = {
  sale: "bg-red-600 text-white",
  new: "bg-[#F97316] text-white",
  hot: "bg-orange-500 text-white",
  organic: "bg-emerald-600 text-white",
};

export function Badge({ badge }: { badge?: string | null }) {
  if (!badge) return null;
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${BADGE_STYLES[badge]}`}
    >
      {badge}
    </span>
  );
}

export function SectionTitle({
  title,
  subtitle,
  center = false,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-2xl font-bold text-[#1f2937] md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-[#6b7280]">{subtitle}</p>}
    </div>
  );
}

export function Quantity({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center rounded border border-[#e5e7eb] bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="px-2.5 py-1 text-sm font-bold text-[#F97316] hover:bg-[#f3f4f6]"
      >
        −
      </button>
      <span className="min-w-[32px] text-center text-sm font-semibold">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="px-2.5 py-1 text-sm font-bold text-[#F97316] hover:bg-[#f3f4f6]"
      >
        +
      </button>
    </div>
  );
}

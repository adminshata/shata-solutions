"use client";

import { TEMPLATE_CATEGORIES, type TemplateCategoryFilter } from "@/lib/templates/registry";

interface Props {
  active: TemplateCategoryFilter;
  onChange: (cat: TemplateCategoryFilter) => void;
  isDark?: boolean;
  counts?: Partial<Record<TemplateCategoryFilter, number>>;
}

export default function TemplateFilters({ active, onChange, isDark = true, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {TEMPLATE_CATEGORIES.map((cat) => {
        const isActive = cat === active;
        const count = counts?.[cat];
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              isActive
                ? "bg-blue-600 border-blue-500 text-white shadow-[0_6px_20px_rgba(59,130,246,0.4)]"
                : isDark
                ? "bg-white/5 border-white/10 text-white/65 hover:bg-white/10 hover:border-white/20 hover:text-white"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            {cat}
            {count !== undefined && (
              <span
                className={`text-[11px] font-bold min-w-[18px] text-center leading-none px-1 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/25 text-white"
                    : isDark
                    ? "bg-white/10 text-white/45"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

import Link from "next/link";

type TemplatePreviewBarProps = {
  title: string;
  subtitle?: string;
  startHref: string;
  backHref: string;
};

export default function TemplatePreviewBar({
  title,
  subtitle,
  startHref,
  backHref,
}: TemplatePreviewBarProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-500">
            Template preview
          </p>
          <h1 className="text-base font-semibold text-slate-950 dark:text-white">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 dark:text-white/55">{subtitle}</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={backHref}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
          >
            Back to industry
          </Link>
          <Link
            href={startHref}
            className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-4 py-2 text-xs font-black text-white shadow-[0_18px_40px_-18px_rgba(99,91,255,0.9)] transition hover:-translate-y-0.5"
          >
            Start with this template
          </Link>
        </div>
      </div>
    </div>
  );
}

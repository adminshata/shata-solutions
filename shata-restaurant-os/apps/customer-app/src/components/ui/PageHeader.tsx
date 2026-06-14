import { cn } from "@shata/ui";
import type { HTMLAttributes, ReactNode } from "react";

interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  badge?: ReactNode;
  right?: ReactNode;
}

export function PageHeader({ title, badge, right, className, ...props }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-sm transition-all duration-200",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">
        <h1 className="truncate font-bold text-primary-dark">{title}</h1>
        {badge}
      </div>
      {right && <div className="flex shrink-0 items-center gap-2">{right}</div>}
    </header>
  );
}

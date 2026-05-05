import type { CSSProperties, ReactNode } from "react";
import type { TemplateBrand } from "@/lib/templates/types";

type TemplateShellProps = {
  brand: TemplateBrand;
  children: ReactNode;
};

export default function TemplateShell({ brand, children }: TemplateShellProps) {
  const style = {
    "--template-primary": brand.primaryColor,
    "--template-accent": brand.accentColor,
    "--template-bg": brand.backgroundColor,
  } as CSSProperties;

  return (
    <div style={style} className="min-h-screen bg-[var(--template-bg)] text-slate-950">
      {children}
    </div>
  );
}

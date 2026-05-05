import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Badge({ kind }: { kind: string }) {
  const map: Record<string, string> = {
    sale: "bg-[var(--color-primary)] text-white",
    new: "bg-emerald-500 text-white",
    hot: "bg-orange-500 text-white",
    organic: "bg-green-600 text-white",
  };
  const label: Record<string, string> = { sale: "SALE", new: "NEW", hot: "HOT", organic: "ORGANIC" };
  return (
    <span className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${map[kind] ?? "bg-gray-500 text-white"}`}>
      {label[kind] ?? kind.toUpperCase()}
    </span>
  );
}

export function SectionTitle({ children, sub, center = false }: { children: ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--sm-fg)] md:text-3xl">{children}</h2>
      {sub && <p className={`mt-2 text-sm text-[var(--sm-muted)] ${center ? "mx-auto max-w-lg" : ""}`}>{sub}</p>}
    </div>
  );
}

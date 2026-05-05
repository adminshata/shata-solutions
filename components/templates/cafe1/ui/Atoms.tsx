import type { ReactNode } from "react";
import Link from "next/link";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  subtitle,
  title,
  align = "center",
  className = "",
}: {
  subtitle?: string;
  title: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""} ${className}`}>
      {subtitle && (
        <span className="block text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--c1-accent)] mb-2">
          {subtitle}
        </span>
      )}
      <h2
        className="text-3xl font-bold text-[color:var(--c1-header)]"
        style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
      >
        {title}
      </h2>
    </div>
  );
}

export function PageBanner({
  title,
  crumbs,
}: {
  title: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-[color:var(--c1-primary)] py-14 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[color:var(--c1-header)]" />
      <Container className="relative">
        <h1
          className="text-4xl font-bold text-[color:var(--c1-header)] capitalize"
          style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
        >
          {title}
        </h1>
        {crumbs && (
          <nav className="mt-4 flex justify-center gap-2 text-sm text-[color:var(--c1-body)]">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-[color:var(--c1-accent)]">/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-[color:var(--c1-accent)] transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-[color:var(--c1-header)] font-medium">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </Container>
    </section>
  );
}

export function EmptyState({ title, body }: { title: string; body?: string }) {
  return (
    <div className="py-20 text-center">
      <p className="text-lg font-semibold text-[color:var(--c1-header)]">{title}</p>
      {body && <p className="mt-2 text-sm text-[color:var(--c1-body)]">{body}</p>}
    </div>
  );
}

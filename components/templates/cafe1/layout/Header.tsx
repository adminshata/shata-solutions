"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/lib/cafe1/context";
import { LogoSVG } from "../ui/LogoSVG";

export function Header() {
  const site = useSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--c1-light)] border-b border-[color:var(--c1-primary)] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[70px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={site.navigation[0]?.href ?? "/"}
            className="flex items-center gap-2.5 text-[color:var(--c1-header)] shrink-0"
          >
            <LogoSVG width={30} height={34} />
            <span
              className="text-xl font-bold tracking-wide"
              style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
            >
              {site.brand.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {site.navigation.map((n) => {
              const active = pathname === n.href || pathname?.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`text-[11px] font-bold tracking-[0.18em] uppercase transition-colors ${
                    active
                      ? "text-[color:var(--c1-accent)]"
                      : "text-[color:var(--c1-header)] hover:text-[color:var(--c1-accent)]"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          {/* Reservation CTA */}
          <Link
            href={site.navigation.find((n) => n.label.toLowerCase().includes("reserv"))?.href ?? "/"}
            className="hidden md:inline-flex items-center px-5 py-2 text-[11px] font-bold tracking-[0.18em] uppercase rounded-[var(--c1-radius,4px)] bg-[color:var(--c1-accent)] text-white hover:opacity-90 transition shrink-0"
          >
            Reserve
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-[color:var(--c1-header)]"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="md:hidden border-t border-[color:var(--c1-primary)] py-3 space-y-1">
            {site.navigation.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block py-2 px-1 text-[11px] font-bold tracking-[0.18em] uppercase text-[color:var(--c1-header)] hover:text-[color:var(--c1-accent)] transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

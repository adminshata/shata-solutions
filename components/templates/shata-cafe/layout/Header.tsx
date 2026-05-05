"use client";

import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/lib/shata-cafe/context";

export function AnnouncementBar() {
  const config = useSite();
  const ann = config.sections.announcement;
  if (!ann?.enabled) return null;
  return (
    <div className="bg-[color:var(--cafe-accent)] text-white py-2 text-center text-[13px] font-medium">
      {ann.text}
    </div>
  );
}

export function Header() {
  const config = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--cafe-bg)]/95 backdrop-blur border-b border-[color:var(--cafe-border)] shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/templates/restaurants-cafes"
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--cafe-primary)] text-white text-[10px] font-black leading-none tracking-tight">
            AC
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-[color:var(--cafe-fg)] text-sm leading-tight">{config.name}</div>
            <div className="text-[10px] text-[color:var(--cafe-muted)]">{config.tagline}</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {config.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[color:var(--cafe-fg)] hover:text-[color:var(--cafe-accent)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+15552345679"
            className="text-[13px] font-medium text-[color:var(--cafe-muted)] hover:text-[color:var(--cafe-fg)] transition-colors"
          >
            {config.contact.phone}
          </a>
          <a
            href="#reservation"
            className="rounded-[var(--cafe-radius)] bg-[color:var(--cafe-primary)] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[color:var(--cafe-accent)] transition-colors"
          >
            Book a Table
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-[color:var(--cafe-muted)] hover:text-[color:var(--cafe-fg)]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[color:var(--cafe-border)] bg-[color:var(--cafe-bg)] px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {config.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-[color:var(--cafe-fg)] hover:text-[color:var(--cafe-accent)] hover:bg-[color:var(--cafe-surface)] rounded transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3">
            <a
              href="#reservation"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-[var(--cafe-radius)] bg-[color:var(--cafe-primary)] px-4 py-2.5 text-center text-[13px] font-semibold text-white"
            >
              Book a Table
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/lib/shata-medical/context";
import { LinkButton } from "@/components/templates/shata-medical/ui/Button";

export function AnnouncementBar() {
  const config = useSite();
  const ann = config.sections.announcement;
  if (!ann?.enabled) return null;
  return (
    <div className="bg-[color:var(--med-primary)] text-[color:var(--med-primary-fg)] py-2 text-center text-[13px] font-medium">
      {ann.text}
    </div>
  );
}

export function Header() {
  const config = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[color:var(--med-border)] shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/templates/medical-center-1/preview"
          className="flex items-center gap-2 shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--med-primary)] text-white text-[11px] font-black">
            SM
          </div>
          <span className="hidden sm:block font-bold text-[color:var(--med-fg)] text-sm leading-tight">
            {config.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {config.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[color:var(--med-fg)] hover:text-[color:var(--med-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Admin */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/templates/medical-center-1/preview/admin"
            className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--med-muted)] hover:text-[color:var(--med-primary)] transition-colors"
          >
            Edit ✏
          </Link>
          <LinkButton
            href="/templates/medical-center-1/preview/appointment/request"
            size="sm"
          >
            Book Appointment
          </LinkButton>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-[color:var(--med-muted)] hover:text-[color:var(--med-fg)]"
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
        <div className="md:hidden border-t border-[color:var(--med-border)] bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {config.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-[color:var(--med-fg)] hover:text-[color:var(--med-primary)] hover:bg-[color:var(--med-surface)] rounded transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3">
            <LinkButton
              href="/templates/medical-center-1/preview/appointment/request"
              full
              size="md"
            >
              Book Appointment
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}

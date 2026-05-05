"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, useStore } from "@/lib/shata-store/context";

export function Header() {
  const config = useStore();
  const cart = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--store-border)] bg-[color:var(--store-bg)]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-8 lg:px-12">
        {/* Mobile menu */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-2 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-4 w-4">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/templates/ecommerce/preview" className="flex flex-none items-center gap-2">
          {config.logo.src ? (
            <Image src={config.logo.src} alt={config.logo.alt} width={28} height={28} className="rounded-md" unoptimized />
          ) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[color:var(--store-primary)] text-[10px] font-bold text-[color:var(--store-primary-fg)]">
              {config.logo.text.charAt(0)}
            </span>
          )}
          <span className="text-base font-semibold tracking-tight text-[color:var(--store-fg)]">{config.logo.text}</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-7 text-sm">
            {config.navigation.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="font-medium text-[color:var(--store-fg)]/80 transition hover:text-[color:var(--store-fg)]"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex flex-none items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-[var(--store-radius)] p-2 text-[color:var(--store-fg)] hover:bg-black/[0.04]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-4 w-4">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
          </button>
          <Link
            href="/templates/ecommerce/preview/admin"
            aria-label="Edit store"
            title="Edit store (Tier 1 demo editor)"
            className="hidden rounded-[var(--store-radius)] p-2 text-[color:var(--store-fg)] hover:bg-black/[0.04] md:inline-flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-4 w-4">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => cart.openDrawer()}
            aria-label={`Cart (${cart.itemCount})`}
            className="relative rounded-[var(--store-radius)] p-2 text-[color:var(--store-fg)] hover:bg-black/[0.04]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-4 w-4">
              <path d="M6 6h15l-1.5 9H7.5z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M6 6L4 2H2" />
            </svg>
            {cart.itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[color:var(--store-accent)] px-1 text-[10px] font-bold text-white">
                {cart.itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div className="border-t border-[color:var(--store-border)] bg-[color:var(--store-bg)]">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-8">
            <input
              autoFocus
              type="search"
              placeholder="Search products…"
              className="w-full bg-transparent text-sm text-[color:var(--store-fg)] outline-none placeholder:text-[color:var(--store-muted)]"
            />
            <button type="button" onClick={() => setSearchOpen(false)} className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--store-muted)]">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  const config = useStore();
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" aria-hidden />
      <aside className="fixed inset-y-0 left-0 z-50 w-[280px] bg-[color:var(--store-bg)] p-5 md:hidden">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">{config.logo.text}</span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="rounded p-1 text-[color:var(--store-muted)]">✕</button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-1">
            {config.navigation.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={onClose}
                  className="block rounded-[var(--store-radius)] px-3 py-3 text-sm font-medium text-[color:var(--store-fg)] hover:bg-black/[0.04]"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/templates/ecommerce/preview/admin"
                onClick={onClose}
                className="block rounded-[var(--store-radius)] px-3 py-3 text-sm font-medium text-[color:var(--store-accent)] hover:bg-black/[0.04]"
              >
                Edit store →
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

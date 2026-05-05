"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, useStore } from "@/lib/shata-home/context";

export function Header() {
  const config = useStore();
  const cart = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      {/* Main header row */}
      <div className="border-b border-[color:var(--store-border)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-8 lg:px-12">
          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="p-2 text-[color:var(--store-fg)] md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/templates/ecommerce-2/preview" className="flex flex-none items-center gap-2">
            {config.logo.src ? (
              <Image src={config.logo.src} alt={config.logo.alt} width={32} height={32} unoptimized />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center bg-[color:var(--store-primary)] text-xs font-black text-white">
                {config.logo.text.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div className="text-sm font-black text-[color:var(--store-fg)]">{config.logo.text}</div>
              <div className="hidden text-[9px] font-semibold uppercase tracking-widest text-[color:var(--store-muted)] sm:block">
                Furniture &amp; Decor
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden flex-1 justify-center md:flex">
            <ul className="flex items-center gap-6 text-sm">
              {config.navigation.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="font-semibold text-[color:var(--store-fg)] hover:text-[color:var(--store-primary)] transition-colors">
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
              className="p-2 text-[color:var(--store-fg)] hover:text-[color:var(--store-primary)] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3-3" />
              </svg>
            </button>

            <Link
              href="/templates/ecommerce-2/preview/admin"
              aria-label="Edit store"
              title="Edit store (Tier 1 demo editor)"
              className="hidden p-2 text-[color:var(--store-fg)] hover:text-[color:var(--store-primary)] transition-colors md:inline-flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={() => cart.openDrawer()}
              aria-label={`Cart (${cart.itemCount})`}
              className="relative p-2 text-[color:var(--store-fg)] hover:text-[color:var(--store-primary)] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5">
                <path d="M6 6h15l-1.5 9H7.5z" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M6 6L4 2H2" />
              </svg>
              {cart.itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[color:var(--store-primary)] px-1 text-[10px] font-bold text-white">
                  {cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div className="border-b border-[color:var(--store-border)] bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-8">
            <input
              autoFocus
              type="search"
              placeholder="Search products…"
              className="w-full bg-transparent text-sm text-[color:var(--store-fg)] outline-none placeholder:text-[color:var(--store-muted)]"
            />
            <button type="button" onClick={() => setSearchOpen(false)} className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--store-muted)]">
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
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 md:hidden" aria-hidden />
      <aside className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white p-5 md:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-[color:var(--store-fg)]">{config.logo.text}</span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="p-1 text-[color:var(--store-muted)]">✕</button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-1">
            {config.navigation.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={onClose}
                  className="block px-3 py-3 text-sm font-semibold text-[color:var(--store-fg)] hover:text-[color:var(--store-primary)]">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/templates/ecommerce-2/preview/admin" onClick={onClose}
                className="block px-3 py-3 text-sm font-bold text-[color:var(--store-primary)] hover:underline">
                Edit store →
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSite } from "@/lib/supermarket1/context";
import { useCart } from "@/lib/supermarket1/context";

const BASE_PATH = "/templates/supermarket-1/preview";

function useCountdown(targetDate: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function calc() {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTime({ days, hours, minutes, seconds });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

const PROMO_END = new Date("2026-12-31T23:59:59");

export function Header() {
  const config = useSite();
  const cart = useCart();
  const countdown = useCountdown(PROMO_END);
  const [sticky, setSticky] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setSticky(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <header className={`w-full z-50 ${sticky ? "sticky top-0 shadow-md" : ""}`} style={{ background: "#fff" }}>
      {/* Layer 1 — Top bar */}
      {config.announcement.active && (
        <div style={{ background: "#629D23" }} className="text-white">
          <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="font-medium">Get up to 30% off on your first $150 purchase</span>
              <span className="hidden sm:inline text-white/60">|</span>
              <div className="flex items-center gap-1 font-mono text-xs font-bold">
                <TimeBlock v={pad(countdown.days)} label="Days" />
                <span className="mx-0.5">:</span>
                <TimeBlock v={pad(countdown.hours)} label="Hrs" />
                <span className="mx-0.5">:</span>
                <TimeBlock v={pad(countdown.minutes)} label="Min" />
                <span className="mx-0.5">:</span>
                <TimeBlock v={pad(countdown.seconds)} label="Sec" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 0.87h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.42-1.42a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{config.contact.phone}</span>
            </div>
          </div>
        </div>
      )}

      {/* Layer 2 — Mid */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          {/* Left */}
          <div className="hidden lg:flex items-center gap-4 text-xs text-gray-500 flex-none">
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4 text-[#629D23]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Free delivery over $50
            </span>
          </div>

          {/* Logo */}
          <Link href={BASE_PATH} className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <span className="text-2xl font-extrabold tracking-tight" style={{ color: "#629D23" }}>
              {config.logo.text}
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full rounded border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-12 text-sm outline-none focus:border-[#629D23] focus:ring-1 focus:ring-[#629D23]"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center justify-center rounded-r px-4 text-white"
                style={{ background: "#629D23" }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-none">
            <button
              type="button"
              onClick={() => setSearchOpen(v => !v)}
              className="md:hidden p-2 rounded text-gray-600 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" />
              </svg>
            </button>

            {/* Wishlist */}
            <button type="button" className="relative p-2 text-gray-600 hover:text-[#629D23] transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={() => cart.openDrawer()}
              className="relative flex items-center gap-2 rounded border border-[#629D23] px-3 py-2 text-sm font-semibold text-[#629D23] hover:bg-[#629D23] hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M6 6h15l-1.5 9H7.5z" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M6 6L4 2H2" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {cart.itemCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#f59e0b] px-1 text-[10px] font-bold text-white">
                  {cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="border-b border-gray-100 p-3 md:hidden">
          <input
            autoFocus
            type="text"
            placeholder="Search for products..."
            className="w-full rounded border border-gray-200 bg-gray-50 py-2.5 px-4 text-sm outline-none focus:border-[#629D23]"
          />
        </div>
      )}

      {/* Layer 3 — Bottom nav */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="container mx-auto px-4 flex items-center">
          {/* All Categories dropdown */}
          <div className="relative flex-none">
            <button
              type="button"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white"
              style={{ background: "#629D23" }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              All Categories
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {catOpen && (
              <div
                className="absolute left-0 top-full z-50 w-56 bg-white shadow-lg border border-gray-100 py-1"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                {config.categories.filter(c => c.active !== false).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`${BASE_PATH}/categories/${cat.handle}`}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#629D23]/10 hover:text-[#629D23]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center flex-1 px-2">
            {[
              { label: "Home", href: BASE_PATH },
              { label: "Shop", href: `${BASE_PATH}/shop` },
              { label: "About", href: `${BASE_PATH}/about` },
              { label: "Contact", href: `${BASE_PATH}/contact` },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#629D23] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="ml-auto md:hidden p-3 text-gray-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold" style={{ color: "#629D23" }}>{config.logo.text}</span>
              <button type="button" onClick={() => setMobileOpen(false)} className="p-1 text-gray-500">✕</button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {[
                { label: "Home", href: BASE_PATH },
                { label: "Shop", href: `${BASE_PATH}/shop` },
                { label: "About", href: `${BASE_PATH}/about` },
                { label: "Contact", href: `${BASE_PATH}/contact` },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded text-sm font-medium text-gray-700 hover:bg-[#629D23]/10 hover:text-[#629D23]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 py-2">Categories</div>
                {config.categories.filter(c => c.active !== false).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`${BASE_PATH}/categories/${cat.handle}`}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-[#629D23]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}

function TimeBlock({ v, label }: { v: string; label: string }) {
  return (
    <span className="flex flex-col items-center">
      <span className="text-sm font-bold leading-none">{v}</span>
      <span className="text-[8px] font-normal opacity-75">{label}</span>
    </span>
  );
}

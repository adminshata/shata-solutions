"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BASE, FIRM } from "@/lib/multiLawyer1/data";

const NAV_LINKS = [
  { label: "Home", href: `${BASE}` },
  { label: "About", href: `${BASE}/about` },
  { label: "Practice Areas", href: `${BASE}/practice-areas` },
  { label: "Attorneys", href: `${BASE}/attorneys` },
  { label: "Case Results", href: `${BASE}/case-results` },
  { label: "Blog", href: `${BASE}/blog` },
  { label: "Contact", href: `${BASE}/contact` },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050d1f]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.4)] border-b border-[#c9a84c]/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href={`${BASE}`} className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#c9a84c] text-[#050d1f] font-bold text-sm tracking-wider">
              M&G
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-semibold text-lg leading-none tracking-tight">
                {FIRM.name}
              </p>
              <p className="text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase mt-0.5">
                Attorneys at Law
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.slice(1, -1).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-white/70 hover:text-[#c9a84c] transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={`${BASE}/contact`}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#c9a84c] text-[#050d1f] text-sm font-semibold rounded-sm hover:bg-[#e4b96a] transition-colors duration-200"
            >
              Book Consultation
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden flex flex-col gap-1.5 p-2"
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#050d1f]/98 backdrop-blur-md border-t border-[#c9a84c]/20">
          <nav className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-base text-white/80 hover:text-[#c9a84c] transition-colors border-b border-white/[0.05] font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/contact`}
              onClick={() => setMenuOpen(false)}
              className="mt-4 w-full text-center py-3 bg-[#c9a84c] text-[#050d1f] font-semibold rounded-sm hover:bg-[#e4b96a] transition-colors"
            >
              Book a Free Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

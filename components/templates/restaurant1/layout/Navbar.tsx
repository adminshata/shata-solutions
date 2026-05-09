"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/lib/restaurant1/context";

const menuItems = [
  {
    label: "Home",
    href: "/templates/restaurant-1/preview",
    children: [],
  },
  {
    label: "About",
    href: "/templates/restaurant-1/preview/about",
    children: [
      { label: "Our Story", href: "/templates/restaurant-1/preview/about" },
      { label: "Our Chefs", href: "/templates/restaurant-1/preview/chefs" },
      { label: "Gallery", href: "/templates/restaurant-1/preview/gallery" },
    ],
  },
  {
    label: "Menu",
    href: "/templates/restaurant-1/preview/menu",
    children: [
      { label: "Food Menu", href: "/templates/restaurant-1/preview/menu" },
      { label: "Daily Specials", href: "/templates/restaurant-1/preview/menu?tab=specials" },
    ],
  },
  {
    label: "Reservation",
    href: "/templates/restaurant-1/preview/reservation",
    children: [],
  },
  {
    label: "Blog",
    href: "/templates/restaurant-1/preview/blog",
    children: [],
  },
  {
    label: "Contact",
    href: "/templates/restaurant-1/preview/contact",
    children: [],
  },
];

export function Navbar() {
  const site = useSite();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/templates/restaurant-1/preview";
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: transparent ? "transparent" : site.theme.darkColor,
          borderBottom: transparent ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          {/* Logo — text-based, no image dependency */}
          <Link href="/templates/restaurant-1/preview" className="flex-shrink-0">
            <div className="flex flex-col leading-none">
              <span
                className="text-2xl tracking-wide"
                style={{
                  fontFamily: "var(--font-r1-heading, 'Great Vibes', cursive)",
                  color: transparent ? "#fff" : site.theme.primaryColor,
                }}
              >
                {site.brand.name}
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase mt-0.5"
                style={{ color: transparent ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.5)" }}
              >
                {site.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.children.length > 0 && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-6 text-xs tracking-[0.15em] uppercase font-semibold transition-colors duration-200"
                    style={{
                      color: transparent
                        ? active
                          ? site.theme.primaryColor
                          : "#fff"
                        : active
                        ? site.theme.primaryColor
                        : "rgba(255,255,255,0.8)",
                    }}
                  >
                    {item.label}
                    {item.children.length > 0 && (
                      <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children.length > 0 && (
                    <ul
                      className={`absolute top-full left-0 min-w-[200px] py-2 transition-all duration-200 ${
                        openDropdown === item.label
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                      style={{ background: site.theme.darkColor, border: `1px solid ${site.theme.primaryColor}20` }}
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block px-5 py-3 text-xs tracking-widest uppercase transition-colors hover:text-white"
                            style={{ color: site.theme.primaryColor }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Reservation CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/templates/restaurant-1/preview/reservation"
              className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors"
              style={{ color: transparent ? "#fff" : site.theme.primaryColor }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
              </svg>
              Reservation
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-white transition-all" style={{ transform: mobileOpen ? "rotate(45deg) translateY(8px)" : undefined }} />
            <span className="block w-6 h-0.5 bg-white transition-all" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="block w-6 h-0.5 bg-white transition-all" style={{ transform: mobileOpen ? "rotate(-45deg) translateY(-8px)" : undefined }} />
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10" style={{ background: site.theme.darkColor }}>
            {menuItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-4 text-xs tracking-widest uppercase border-b border-white/5"
                  style={{ color: pathname === item.href ? site.theme.primaryColor : "rgba(255,255,255,0.8)" }}
                >
                  {item.label}
                </Link>
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-10 py-3 text-xs tracking-widest uppercase border-b border-white/5"
                    style={{ color: site.theme.primaryColor }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="p-4">
              <Link
                href="/templates/restaurant-1/preview/reservation"
                className="block text-center py-3 text-xs tracking-widest uppercase font-semibold"
                style={{ background: site.theme.primaryColor, color: "#fff" }}
                onClick={() => setMobileOpen(false)}
              >
                Make A Reservation
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

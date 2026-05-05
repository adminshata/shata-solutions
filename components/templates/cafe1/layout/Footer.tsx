import Link from "next/link";
import { useSite } from "@/lib/cafe1/context";
import { LogoSVG } from "../ui/LogoSVG";

export function Footer() {
  const site = useSite();
  return (
    <footer className="bg-[color:var(--c1-header)] text-[color:var(--c1-light)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={site.navigation[0]?.href ?? "/"}
              className="flex items-center gap-2.5 text-[color:var(--c1-primary)] mb-4"
            >
              <LogoSVG width={28} height={31} />
              <span
                className="text-xl font-bold tracking-wide"
                style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
              >
                {site.brand.name}
              </span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed text-[color:var(--c1-primary)]">
              {site.contact.address}
            </p>
            <p className="mt-5 text-[11px] opacity-40 text-[color:var(--c1-primary)]">
              &copy; {new Date().getFullYear()} {site.brand.name}. All Rights Reserved.
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--c1-accent)] mb-5">
              Contact Info
            </h4>
            <ul className="space-y-2.5 text-sm text-[color:var(--c1-primary)] opacity-80">
              <li>
                <a href={`tel:${site.contact.phone}`} className="hover:text-[color:var(--c1-accent)] transition-colors">
                  {site.contact.phone}
                </a>
              </li>
              {site.contact.phone2 && (
                <li>
                  <a href={`tel:${site.contact.phone2}`} className="hover:text-[color:var(--c1-accent)] transition-colors">
                    {site.contact.phone2}
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-[color:var(--c1-accent)] transition-colors">
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--c1-accent)] mb-5">
              Opening Hours
            </h4>
            <ul className="space-y-2 text-sm text-[color:var(--c1-primary)] opacity-80">
              {site.contact.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span className="font-semibold">{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--c1-accent)] mb-5">
              Follow Our Activity
            </h4>
            <p className="text-sm opacity-70 text-[color:var(--c1-primary)] mb-4">We are in social networks</p>
            <div className="flex gap-3">
              {site.contact.twitter && (
                <a
                  href={site.contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded border border-white/20 text-[color:var(--c1-accent)] hover:bg-white/10 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.952-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {site.contact.facebook && (
                <a
                  href={site.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded border border-white/20 text-[color:var(--c1-accent)] hover:bg-white/10 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {site.contact.instagram && (
                <a
                  href={site.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded border border-white/20 text-[color:var(--c1-accent)] hover:bg-white/10 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

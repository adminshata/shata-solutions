"use client";

import Link from "next/link";
import { useSite } from "@/lib/shata-cafe/context";

export function Footer() {
  const config = useSite();

  return (
    <footer className="bg-[color:var(--cafe-primary)] text-white/70">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/templates/restaurants-cafes" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--cafe-accent)] text-white text-[10px] font-black">
                AC
              </div>
              <div>
                <div className="font-bold text-white text-sm">{config.name}</div>
                <div className="text-[11px] text-white/60">{config.tagline}</div>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/60 max-w-xs">
              {config.description}
            </p>
            <div className="mt-5 space-y-2 text-[13px]">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-[color:var(--cafe-accent)]">✉</span>
                <a href={`mailto:${config.contact.email}`} className="hover:text-white transition-colors">
                  {config.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-[color:var(--cafe-accent)]">✆</span>
                <a href={`tel:${config.contact.phone}`} className="hover:text-white transition-colors">
                  {config.contact.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-[color:var(--cafe-accent)]">◎</span>
                <span>{config.contact.address}</span>
              </div>
              {config.contact.hours && (
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-[color:var(--cafe-accent)]">◷</span>
                  <span>{config.contact.hours}</span>
                </div>
              )}
            </div>
            {/* Social */}
            <div className="mt-5 flex gap-2">
              {config.social.instagram && (
                <a href={config.social.instagram} target="_blank" rel="noopener" aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white/60 hover:bg-[color:var(--cafe-accent)] hover:text-white transition-colors text-xs font-bold">ig</a>
              )}
              {config.social.facebook && (
                <a href={config.social.facebook} target="_blank" rel="noopener" aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white/60 hover:bg-[color:var(--cafe-accent)] hover:text-white transition-colors text-xs font-bold">f</a>
              )}
              {config.social.tripadvisor && (
                <a href={config.social.tripadvisor} target="_blank" rel="noopener" aria-label="TripAdvisor"
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white/60 hover:bg-[color:var(--cafe-accent)] hover:text-white transition-colors text-xs font-bold">ta</a>
              )}
            </div>
          </div>

          {/* Footer link columns */}
          {config.footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.items.map((item, i) => (
                  <li key={`${col.title}-${i}`}>
                    <a
                      href={item.href}
                      className="text-[13px] text-white/60 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-[12px] text-white/40 sm:flex-row sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} {config.name}. All rights reserved.</span>
          <div className="flex gap-4">
            {config.legal.privacy && (
              <Link href={config.legal.privacy} className="hover:text-white/70 transition-colors">Privacy</Link>
            )}
            {config.legal.terms && (
              <Link href={config.legal.terms} className="hover:text-white/70 transition-colors">Terms</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

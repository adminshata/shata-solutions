"use client";

import Link from "next/link";
import { useSite } from "@/lib/shata-medical/context";

export function Footer() {
  const config = useSite();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/templates/medical-center-1/preview" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--med-primary)] text-white text-[11px] font-black">
                SM
              </div>
              <span className="font-bold text-white text-sm">{config.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-gray-400 max-w-xs">
              {config.tagline} — {config.description.split(".")[0]}.
            </p>
            <div className="mt-5 space-y-1.5 text-[13px]">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-[color:var(--med-accent)]">📧</span>
                <a href={`mailto:${config.contact.email}`} className="hover:text-white transition-colors">
                  {config.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-[color:var(--med-accent)]">📞</span>
                <a href={`tel:${config.contact.phone}`} className="hover:text-white transition-colors">
                  {config.contact.phone}
                </a>
              </div>
              {config.contact.emergencyPhone && (
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">🚨</span>
                  <a href={`tel:${config.contact.emergencyPhone}`} className="text-red-400 hover:text-red-300 transition-colors font-medium">
                    Emergency: {config.contact.emergencyPhone}
                  </a>
                </div>
              )}
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-[color:var(--med-accent)]">📍</span>
                <span>{config.contact.address}</span>
              </div>
            </div>
            {/* Social */}
            <div className="mt-5 flex gap-3">
              {config.social.facebook && (
                <a href={config.social.facebook} target="_blank" rel="noopener" aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-800 text-gray-400 hover:bg-[color:var(--med-primary)] hover:text-white transition-colors text-xs font-bold">f</a>
              )}
              {config.social.instagram && (
                <a href={config.social.instagram} target="_blank" rel="noopener" aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-800 text-gray-400 hover:bg-[color:var(--med-primary)] hover:text-white transition-colors text-xs font-bold">ig</a>
              )}
              {config.social.twitter && (
                <a href={config.social.twitter} target="_blank" rel="noopener" aria-label="Twitter"
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-800 text-gray-400 hover:bg-[color:var(--med-primary)] hover:text-white transition-colors text-xs font-bold">tw</a>
              )}
              {config.social.linkedin && (
                <a href={config.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-800 text-gray-400 hover:bg-[color:var(--med-primary)] hover:text-white transition-colors text-xs font-bold">in</a>
              )}
              {config.social.youtube && (
                <a href={config.social.youtube} target="_blank" rel="noopener" aria-label="YouTube"
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-800 text-gray-400 hover:bg-[color:var(--med-primary)] hover:text-white transition-colors text-xs font-bold">yt</a>
              )}
            </div>
          </div>

          {/* Footer link columns */}
          {config.footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.items.map((item, itemIndex) => (
                  <li key={`${col.title}-${item.label}-${item.href}-${itemIndex}`}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-[12px] text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} {config.name}. All rights reserved.</span>
          <div className="flex gap-4">
            {config.legal.privacy && (
              <Link href={config.legal.privacy} className="hover:text-gray-300 transition-colors">Privacy</Link>
            )}
            {config.legal.terms && (
              <Link href={config.legal.terms} className="hover:text-gray-300 transition-colors">Terms</Link>
            )}
            {config.legal.cookies && (
              <Link href={config.legal.cookies} className="hover:text-gray-300 transition-colors">Cookies</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

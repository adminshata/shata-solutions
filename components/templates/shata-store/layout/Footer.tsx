"use client";

import Link from "next/link";
import { useStore } from "@/lib/shata-store/context";
import { Container } from "../ui/Atoms";

export function Footer() {
  const config = useStore();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[color:var(--store-border)] bg-[color:var(--store-surface)]">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--store-primary)] text-xs font-bold text-[color:var(--store-primary-fg)]">
                {config.logo.text.charAt(0)}
              </span>
              <span className="text-base font-semibold tracking-tight">{config.logo.text}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[color:var(--store-muted)]">{config.tagline}</p>

            <ul className="mt-5 space-y-1.5 text-sm text-[color:var(--store-muted)]">
              <li>{config.contact.address}</li>
              <li>
                <a href={`mailto:${config.contact.email}`} className="hover:text-[color:var(--store-fg)]">
                  {config.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${config.contact.phone}`} className="hover:text-[color:var(--store-fg)]">
                  {config.contact.phone}
                </a>
              </li>
              {config.contact.hours && <li>{config.contact.hours}</li>}
            </ul>

            <div className="mt-5 flex items-center gap-2">
              {Object.entries(config.social).map(([k, v]) =>
                v ? (
                  <a
                    key={k}
                    href={v}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={k}
                    className="rounded-full border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-2 text-xs text-[color:var(--store-fg)] hover:bg-black/[0.04]"
                  >
                    {socialIcon(k as keyof typeof config.social)}
                  </a>
                ) : null
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {config.footerLinks.map((col) => (
              <div key={col.title}>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">{col.title}</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {col.items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className="text-[color:var(--store-fg)]/85 hover:text-[color:var(--store-fg)]">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[color:var(--store-border)] pt-6 text-xs text-[color:var(--store-muted)] sm:flex-row sm:items-center">
          <span>© {year} {config.name}. Demo store powered by Shata Platform.</span>
          <span>
            Built on{" "}
            <Link href="/services/website-platform" className="font-semibold text-[color:var(--store-fg)] hover:underline">
              Shata Website Platform
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}

function socialIcon(kind: "instagram" | "facebook" | "twitter" | "tiktok" | "youtube" | "whatsapp"): string {
  switch (kind) {
    case "instagram": return "IG";
    case "facebook":  return "FB";
    case "twitter":   return "X";
    case "tiktok":    return "TT";
    case "youtube":   return "YT";
    case "whatsapp":  return "WA";
  }
}

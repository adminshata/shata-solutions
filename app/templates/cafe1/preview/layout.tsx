import type { ReactNode } from "react";
import { CafeProvider } from "@/lib/shata-cafe/context";
import { SiteShell } from "@/components/templates/shata-cafe/layout/SiteShell";
import { SHATA_CAFE_DEFAULTS } from "@/lib/shata-cafe/defaults";
import type { SiteConfig } from "@/lib/shata-cafe/types";

const BASE = "/templates/cafe1/preview";

const CAFE1_CONFIG: SiteConfig = {
  ...SHATA_CAFE_DEFAULTS,
  navigation: [
    { label: "Menu",     href: `${BASE}/menu` },
    { label: "About",    href: `${BASE}/about` },
    { label: "Our Team", href: `${BASE}/team` },
    { label: "Gallery",  href: `${BASE}#gallery` },
    { label: "Contact",  href: `${BASE}/contact` },
  ],
};

export default function Cafe1PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <CafeProvider config={CAFE1_CONFIG}>
      <SiteShell>{children}</SiteShell>
    </CafeProvider>
  );
}

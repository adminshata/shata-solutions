"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSite } from "@/lib/shata-medical/context";
import { themeVars } from "@/lib/shata-medical/utils";
import { AnnouncementBar, Header } from "./Header";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: ReactNode }) {
  const config = useSite();
  return (
    <div
      className="min-h-screen bg-[color:var(--med-bg)] text-[color:var(--med-fg)] antialiased"
      style={themeVars(config.theme) as CSSProperties}
      data-site={config.slug}
    >
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

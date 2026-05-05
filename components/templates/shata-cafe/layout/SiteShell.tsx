"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSite } from "@/lib/shata-cafe/context";
import { themeVars } from "@/lib/shata-cafe/utils";
import { AnnouncementBar, Header } from "./Header";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: ReactNode }) {
  const config = useSite();
  return (
    <div
      className="min-h-screen bg-[color:var(--cafe-bg)] text-[color:var(--cafe-fg)] antialiased"
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

"use client";

import type { CSSProperties, ReactNode } from "react";
import { useStore } from "@/lib/shata-home/context";
import { themeVars } from "@/lib/shata-home/utils";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

export function StoreShell({ children }: { children: ReactNode }) {
  const config = useStore();
  return (
    <div
      className="min-h-screen bg-[color:var(--store-bg)] text-[color:var(--store-fg)] antialiased"
      style={themeVars(config.theme) as CSSProperties}
      data-store={config.slug}
    >
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

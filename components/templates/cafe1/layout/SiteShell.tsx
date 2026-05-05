"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSite } from "@/lib/cafe1/context";
import { themeVars } from "@/lib/cafe1/utils";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: ReactNode }) {
  const site = useSite();
  return (
    <div
      className="min-h-screen flex flex-col bg-[color:var(--c1-light)] text-[color:var(--c1-body)] antialiased"
      style={{
        fontFamily: "var(--font-c1-body, 'Montserrat', sans-serif)",
        ...(themeVars(site.theme) as CSSProperties),
      }}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

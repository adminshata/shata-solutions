"use client";

import { useSite } from "@/lib/restaurant1/context";
import { themeVars } from "@/lib/restaurant1/utils";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const site = useSite();
  const vars = themeVars(site.theme);

  return (
    <div
      style={vars as React.CSSProperties}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

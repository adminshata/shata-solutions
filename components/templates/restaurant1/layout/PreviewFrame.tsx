"use client";

import { usePathname } from "next/navigation";
import { useSite } from "@/lib/restaurant1/context";
import { themeVars } from "@/lib/restaurant1/utils";
import { SiteShell } from "./SiteShell";

interface PreviewFrameProps {
  children: React.ReactNode;
}

export function PreviewFrame({ children }: PreviewFrameProps) {
  const pathname = usePathname();
  const site = useSite();
  const vars = themeVars(site.theme);

  // Admin route gets no shell (no nav/footer)
  if (pathname.includes("/admin")) {
    return (
      <div style={vars as React.CSSProperties}>
        {children}
      </div>
    );
  }

  return <SiteShell>{children}</SiteShell>;
}

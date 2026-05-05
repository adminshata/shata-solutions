"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Cafe1Provider } from "@/lib/cafe1/context";
import { SiteShell } from "./SiteShell";

export function PreviewFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/templates/cafe-1/preview/admin")) {
    return <>{children}</>;
  }

  return (
    <Cafe1Provider>
      <SiteShell>{children}</SiteShell>
    </Cafe1Provider>
  );
}

import type { ReactNode } from "react";
import { CafeProvider } from "@/lib/shata-cafe/context";
import { SiteShell } from "@/components/templates/shata-cafe/layout/SiteShell";

export default function CafePreviewLayout({ children }: { children: ReactNode }) {
  return (
    <CafeProvider>
      <SiteShell>{children}</SiteShell>
    </CafeProvider>
  );
}

import type { ReactNode } from "react";
import { MedicalProvider } from "@/lib/shata-medical/context";
import { SiteShell } from "@/components/templates/shata-medical/layout/SiteShell";

export const dynamic = "force-dynamic";

export default function MedicalPreviewLayout({ children }: { children: ReactNode }) {
  return (
    <MedicalProvider>
      <SiteShell>{children}</SiteShell>
    </MedicalProvider>
  );
}

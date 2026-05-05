import type { ReactNode } from "react";
import { StoreProvider } from "@/lib/shata-home/context";
import { StoreShell } from "@/components/templates/shata-home/layout/StoreShell";

export const metadata = {
  title: "Shata Home — Premium Furniture & Decor Template",
  description:
    "Live preview of Shata Home, a premium furniture and home decor template powered by the Shata Website Platform. Fully editable from a single config.",
};

export default function ShataHomePreviewLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <StoreShell>{children}</StoreShell>
    </StoreProvider>
  );
}

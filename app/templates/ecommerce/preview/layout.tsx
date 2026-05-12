import type { ReactNode } from "react";
import { StoreProvider } from "@/lib/shata-store/context";
import { StoreShell } from "@/components/templates/shata-store/layout/StoreShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shata Store — premium ecommerce template",
  description:
    "Live preview of Shata Store, a premium ecommerce template powered by the Shata Website Platform. Editable from a single config.",
};

export default function ShataStorePreviewLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <StoreShell>{children}</StoreShell>
    </StoreProvider>
  );
}

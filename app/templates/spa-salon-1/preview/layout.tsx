// app/templates/spa-salon-1/preview/layout.tsx
import { SpaSalon1Provider } from "@/lib/spaSalon1/context";

export const dynamic = "force-dynamic";

export default function SpaSalon1PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpaSalon1Provider>{children}</SpaSalon1Provider>;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Pharmacy1Provider } from "../../../../lib/pharmacy1/context";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shata Pharmacy",
  description: "Pharmacy ecommerce template preview.",
};

export default function Pharmacy1PreviewLayout({ children }: { children: ReactNode }) {
  return <Pharmacy1Provider>{children}</Pharmacy1Provider>;
}

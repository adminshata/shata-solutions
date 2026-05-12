import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FlowerShop1Provider } from "../../../../lib/flowerShop1/context";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shata Flowers",
  description: "Flower shop ecommerce template preview.",
};

export default function FlowerShop1PreviewLayout({ children }: { children: ReactNode }) {
  return <FlowerShop1Provider>{children}</FlowerShop1Provider>;
}

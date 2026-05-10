import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JewelryShop1Provider } from "@/lib/jewelryShop1/context";

export const metadata: Metadata = {
  title: "Shata Jewelry — Website Preview",
  description: "Preview of the Shata Jewelry e-commerce template.",
};

export default function JewelryShop1Layout({ children }: { children: ReactNode }) {
  return <JewelryShop1Provider>{children}</JewelryShop1Provider>;
}

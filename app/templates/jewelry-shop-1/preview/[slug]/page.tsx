"use client";

import { useParams } from "next/navigation";
import JewelryShop1Frame from "@/components/templates/jewelryShop1/JewelryShop1Frame";

const routeMap: Record<string, string> = {
  shortcodes: "shortcodes.html",
};

export default function JewelryShop1SlugPage() {
  const params = useParams<{ slug: string }>();
  const page = routeMap[params.slug] ?? "home.html";

  return <JewelryShop1Frame page={page} title={`Shata Jewelry — ${params.slug}`} />;
}

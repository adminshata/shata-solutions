import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Agency6Provider } from "../../../../lib/agency6/context";

export const metadata: Metadata = {
  title: "Shata SEO Agency - Website Preview",
  description:
    "Shata SEO Agency is a website template for seo strategy, technical search, and organic growth systems.",
};

export default function Agency6PreviewLayout({ children }: { children: ReactNode }) {
  return <Agency6Provider>{children}</Agency6Provider>;
}

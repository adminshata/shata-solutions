import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Agency8Provider } from "../../../../lib/agency8/context";

export const metadata: Metadata = {
  title: "Shata SaaS & Startups - Website Preview",
  description:
    "Shata SaaS & Startups is a website template for saas product strategy, startup systems, and launch operations.",
};

export default function Agency8PreviewLayout({ children }: { children: ReactNode }) {
  return <Agency8Provider>{children}</Agency8Provider>;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Agency5Provider } from "../../../../lib/agency5/context";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shata Marketing Agency - Website Preview",
  description:
    "Shata Marketing Agency is a website template for digital marketing, campaigns, content, and growth systems.",
};

export default function Agency5PreviewLayout({ children }: { children: ReactNode }) {
  return <Agency5Provider>{children}</Agency5Provider>;
}

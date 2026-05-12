import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Agency7Provider } from "../../../../lib/agency7/context";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shata Cyber Security Agency - Website Preview",
  description:
    "Shata Cyber Security Agency is a website template for cyber security, risk management, and resilient digital protection.",
};

export default function Agency7PreviewLayout({ children }: { children: ReactNode }) {
  return <Agency7Provider>{children}</Agency7Provider>;
}

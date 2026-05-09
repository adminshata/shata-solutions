import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Agency4Provider } from "../../../../lib/agency4/context";

export const metadata: Metadata = {
  title: "Shata Software Agency - Website Preview",
  description:
    "Shata Software Agency is a website template for software strategy, product engineering, and delivery systems.",
};

export default function Agency4PreviewLayout({ children }: { children: ReactNode }) {
  return <Agency4Provider>{children}</Agency4Provider>;
}

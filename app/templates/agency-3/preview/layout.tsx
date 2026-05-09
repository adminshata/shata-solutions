import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Agency3Provider } from "../../../../lib/agency3/context";

export const metadata: Metadata = {
  title: "Shata IT Solutions - Website Preview",
  description:
    "Shata IT Solutions is a website template for it solutions, automation, cloud systems, and digital technology.",
};

export default function Agency3PreviewLayout({ children }: { children: ReactNode }) {
  return <Agency3Provider>{children}</Agency3Provider>;
}

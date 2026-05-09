import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Agency2Provider } from "../../../../lib/agency2/context";

export const metadata: Metadata = {
  title: "Shata AI Robotics - Website Preview",
  description:
    "Shata AI Robotics is a website template for ai robotics, automation, and intelligent digital systems.",
};

export default function Agency2PreviewLayout({ children }: { children: ReactNode }) {
  return <Agency2Provider>{children}</Agency2Provider>;
}

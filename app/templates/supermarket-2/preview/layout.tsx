import type { ReactNode } from "react";
import { Supermarket2Provider } from "@/lib/supermarket2/context";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "QuickMart — Fresh Grocery Deals",
  description: "Live preview of the QuickMart supermarket template by Shata Solutions.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket2/bootstrap.min.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket2/plugins.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket2/style.css" precedence="default" />
      <style>{`:root { --color-primary: #DC2626; --color-heading-1: #7a0f0f; }`}</style>
      <Supermarket2Provider>{children}</Supermarket2Provider>
    </>
  );
}

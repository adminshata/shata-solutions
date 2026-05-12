import type { ReactNode } from "react";
import { Supermarket1Provider } from "@/lib/supermarket1/context";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FreshMart — Premium Grocery Template",
  description: "Live preview of the FreshMart supermarket template by Shata Solutions.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket1/bootstrap.min.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket1/plugins.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket1/style.css" precedence="default" />
      <style>{`:root { --color-primary: #629D23; }`}</style>
      <Supermarket1Provider>{children}</Supermarket1Provider>
    </>
  );
}

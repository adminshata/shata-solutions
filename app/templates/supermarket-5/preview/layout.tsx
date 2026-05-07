import type { ReactNode } from "react";
import { Supermarket5Provider } from "@/lib/supermarket5/context";

export const metadata = {
  title: "VividMart — Premium Grocery Deals",
  description: "Live preview of the VividMart supermarket template by Shata Solutions.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket5/bootstrap.min.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket5/plugins.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket5/style.css" precedence="default" />
      <style>{`:root { --color-primary: #7C3AED; --color-heading-1: #4C1D95; }`}</style>
      <Supermarket5Provider>{children}</Supermarket5Provider>
    </>
  );
}

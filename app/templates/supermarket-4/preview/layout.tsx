import type { ReactNode } from "react";
import { Supermarket4Provider } from "@/lib/supermarket4/context";

export const metadata = {
  title: "OrangeMart — Orange Grocery Deals",
  description: "Live preview of the OrangeMart supermarket template by Shata Solutions.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket4/bootstrap.min.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket4/plugins.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket4/style.css" precedence="default" />
      <style>{`:root { --color-primary: #F97316; --color-heading-1: #9A3412; }`}</style>
      <Supermarket4Provider>{children}</Supermarket4Provider>
    </>
  );
}

import type { ReactNode } from "react";
import { Supermarket5Provider } from "@/lib/supermarket5/context";

export const metadata = {
  title: "VividMart — Premium Grocery Template",
  description: "Live preview of a premium supermarket ecommerce template powered by the Shata Website Platform.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket5/bootstrap.min.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket5/plugins.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket5/style.css" precedence="default" />
      <style>{":root { --color-primary: #7C3AED; }"}</style>
      <Supermarket5Provider>{children}</Supermarket5Provider>
    </>
  );
}

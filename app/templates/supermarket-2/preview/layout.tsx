import type { ReactNode } from "react";
import { Supermarket2Provider } from "@/lib/supermarket2/context";

export const metadata = {
  title: "QuickMart — Premium Grocery Template",
  description: "Live preview of a premium supermarket ecommerce template powered by the Shata Website Platform.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket2/bootstrap.min.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket2/plugins.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket2/style.css" precedence="default" />
      <style>{":root { --color-primary: #DC2626; }"}</style>
      <Supermarket2Provider>{children}</Supermarket2Provider>
    </>
  );
}

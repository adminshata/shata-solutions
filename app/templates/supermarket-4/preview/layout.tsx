import type { ReactNode } from "react";
import { Supermarket4Provider } from "@/lib/supermarket4/context";

export const metadata = {
  title: "OrangeMart — Premium Grocery Template",
  description: "Live preview of a premium supermarket ecommerce template powered by the Shata Website Platform.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket4/bootstrap.min.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket4/plugins.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket4/style.css" precedence="default" />
      <style>{":root { --color-primary: #EA580C; }"}</style>
      <Supermarket4Provider>{children}</Supermarket4Provider>
    </>
  );
}

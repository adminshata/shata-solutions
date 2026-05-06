import type { ReactNode } from "react";
import { Supermarket3Provider } from "@/lib/supermarket3/context";

export const metadata = {
  title: "BlueMart — Premium Grocery Template",
  description: "Live preview of a premium supermarket ecommerce template powered by the Shata Website Platform.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket3/bootstrap.min.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket3/plugins.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket3/style.css" precedence="default" />
      <style>{":root { --color-primary: #1D6CE3; }"}</style>
      <Supermarket3Provider>{children}</Supermarket3Provider>
    </>
  );
}

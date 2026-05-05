import type { ReactNode } from "react";
import { Supermarket1Provider } from "@/lib/supermarket1/context";

export const metadata = {
  title: "FreshMart — Premium Grocery Template",
  description: "Live preview of FreshMart, a premium supermarket ecommerce template powered by the Shata Website Platform.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/templates/supermarket1/bootstrap.min.css" />
        <link rel="stylesheet" href="/templates/supermarket1/plugins.css" />
        <link rel="stylesheet" href="/templates/supermarket1/style.css" />
        <style>{`:root { --color-primary: #629D23; }`}</style>
      </head>
      <body>
        <Supermarket1Provider>{children}</Supermarket1Provider>
      </body>
    </html>
  );
}

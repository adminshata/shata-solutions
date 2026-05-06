import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket1/dashboard/css/table.css" precedence="default" />
      <link rel="stylesheet" href="/templates/supermarket1/dashboard/css/style.css" precedence="default" />
      <div className="dashboard-wrapper">{children}</div>
    </>
  );
}

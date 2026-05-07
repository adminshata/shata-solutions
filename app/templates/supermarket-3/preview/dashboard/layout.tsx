import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket3/dashboard-assets/css/plugins.css" precedence="dashboard-plugins" />
      <link rel="stylesheet" href="/templates/supermarket3/dashboard-assets/css/style.css" precedence="dashboard-style" />
      <link rel="stylesheet" href="/templates/supermarket3/dashboard-assets/css/table.css" precedence="dashboard-table" />
      <style>{`
        :root { --color-primary: #1D6CE3; }
        .bluemart-dashboard .sidebar_left { background: #fff; border-right: 1px solid #e8e8e8; }
        .bluemart-dashboard .body-root-inner { margin-left: 280px; transition: margin .2s ease; }
        .bluemart-dashboard .body-root-inner.collapsed { margin-left: 88px; }
        .bluemart-dashboard .sidebar_left.collapsed { width: 88px; }
        @media (max-width: 991px) {
          .bluemart-dashboard .body-root-inner,
          .bluemart-dashboard .body-root-inner.collapsed { margin-left: 0; }
          .bluemart-dashboard .sidebar_left { display: none; }
        }
      `}</style>
      {children}
    </>
  );
}

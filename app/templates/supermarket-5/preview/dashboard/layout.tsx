import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket5/dashboard-assets/css/plugins.css" precedence="dashboard-plugins" />
      <link rel="stylesheet" href="/templates/supermarket5/dashboard-assets/css/style.css" precedence="dashboard-style" />
      <link rel="stylesheet" href="/templates/supermarket5/dashboard-assets/css/table.css" precedence="dashboard-table" />
      <style>{`
        :root { --color-primary: #7C3AED; }
        .vividmart-dashboard .sidebar_left { background: #fff; border-right: 1px solid #e8e8e8; }
        .vividmart-dashboard .body-root-inner { margin-left: 280px; transition: margin .2s ease; }
        .vividmart-dashboard .body-root-inner.collapsed { margin-left: 88px; }
        .vividmart-dashboard .sidebar_left.collapsed { width: 88px; }
        @media (max-width: 991px) {
          .vividmart-dashboard .body-root-inner,
          .vividmart-dashboard .body-root-inner.collapsed { margin-left: 0; }
          .vividmart-dashboard .sidebar_left { display: none; }
        }
      `}</style>
      {children}
    </>
  );
}

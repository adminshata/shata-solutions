import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket4/dashboard-assets/css/plugins.css" precedence="dashboard-plugins" />
      <link rel="stylesheet" href="/templates/supermarket4/dashboard-assets/css/style.css" precedence="dashboard-style" />
      <link rel="stylesheet" href="/templates/supermarket4/dashboard-assets/css/table.css" precedence="dashboard-table" />
      <style>{`
        :root { --color-primary: #F97316; }
        .orangemart-dashboard .sidebar_left { background: #fff; border-right: 1px solid #e8e8e8; }
        .orangemart-dashboard .body-root-inner { margin-left: 280px; transition: margin .2s ease; }
        .orangemart-dashboard .body-root-inner.collapsed { margin-left: 88px; }
        .orangemart-dashboard .sidebar_left.collapsed { width: 88px; }
        @media (max-width: 991px) {
          .orangemart-dashboard .body-root-inner,
          .orangemart-dashboard .body-root-inner.collapsed { margin-left: 0; }
          .orangemart-dashboard .sidebar_left { display: none; }
        }
      `}</style>
      {children}
    </>
  );
}

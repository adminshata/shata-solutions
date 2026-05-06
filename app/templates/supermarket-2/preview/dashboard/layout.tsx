import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/templates/supermarket2/dashboard-assets/css/plugins.css" precedence="dashboard-plugins" />
      <link rel="stylesheet" href="/templates/supermarket2/dashboard-assets/css/style.css" precedence="dashboard-style" />
      <link rel="stylesheet" href="/templates/supermarket2/dashboard-assets/css/table.css" precedence="dashboard-table" />
      <style>{`
        :root { --color-primary: #DC2626; }
        .quickmart-dashboard .sidebar_left { background: #fff; border-right: 1px solid #e8e8e8; }
        .quickmart-dashboard .body-root-inner { margin-left: 280px; transition: margin .2s ease; }
        .quickmart-dashboard .body-root-inner.collapsed { margin-left: 88px; }
        .quickmart-dashboard .sidebar_left.collapsed { width: 88px; }
        @media (max-width: 991px) {
          .quickmart-dashboard .body-root-inner,
          .quickmart-dashboard .body-root-inner.collapsed { margin-left: 0; }
          .quickmart-dashboard .sidebar_left { display: none; }
        }
      `}</style>
      {children}
    </>
  );
}

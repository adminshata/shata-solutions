"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/orders", label: "Live Orders", icon: "⚡" },
  { href: "/dashboard/tables", label: "Tables", icon: "🪑" },
  { href: "/dashboard/menu", label: "Menu", icon: "📋" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "📊" },
  { href: "/dashboard/staff", label: "Staff", icon: "👥" },
  { href: "/dashboard/refunds", label: "Refunds", icon: "↩" },
  { href: "/dashboard/nfc", label: "NFC Tags", icon: "⬡" },
  { href: "/dashboard/billing", label: "Billing", icon: "$" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col border-r bg-white shadow-sm">
        <div className="flex h-16 items-center gap-2.5 border-b px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold">S</span>
          <span className="font-bold text-slate-900">Shata OS</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-brand/10 text-brand"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}

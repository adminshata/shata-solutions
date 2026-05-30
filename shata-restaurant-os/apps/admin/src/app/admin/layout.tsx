"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/merchants", label: "Merchants" },
  { href: "/admin/plans", label: "Plans" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="flex w-56 flex-col border-r bg-white shadow-sm">
        <div className="flex h-14 items-center gap-2.5 border-b px-5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white text-xs font-bold">
            A
          </span>
          <span className="font-bold text-slate-900 text-sm">Shata Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand/10 text-brand"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <p className="text-[10px] text-slate-400 text-center">
            Shata Restaurant OS — Admin
          </p>
        </div>
      </aside>
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
}

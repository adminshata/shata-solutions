"use client";

import { useEffect, useState } from "react";

interface Table {
  id: string;
  number: number;
  capacity: number;
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED" | "CLEANING";
  activeOrderId?: string;
}

const STATUS_STYLES: Record<string, string> = {
  AVAILABLE: "bg-green-50 border-green-200 text-green-700",
  OCCUPIED: "bg-orange-50 border-orange-300 text-orange-800",
  RESERVED: "bg-blue-50 border-blue-200 text-blue-700",
  CLEANING: "bg-slate-50 border-slate-200 text-slate-600",
};

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    fetch(`${apiUrl}/api/dashboard/tables?restaurantId=REPLACE_WITH_RESTAURANT_ID`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setTables)
      .catch(() => setTables([]))
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    total: tables.length,
    available: tables.filter((t) => t.status === "AVAILABLE").length,
    occupied: tables.filter((t) => t.status === "OCCUPIED").length,
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="font-bold text-slate-900">Tables</h1>
          <p className="text-xs text-slate-500">
            {counts.occupied} occupied · {counts.available} available · {counts.total} total
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex h-32 items-center justify-center text-sm text-slate-400">
            Loading tables…
          </div>
        ) : tables.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-slate-400">
            No tables configured — add tables in your restaurant settings.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all ${STATUS_STYLES[table.status] ?? STATUS_STYLES.AVAILABLE}`}
              >
                <p className="text-2xl font-black">{table.number}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide">
                  {table.status}
                </p>
                <p className="mt-0.5 text-[10px] opacity-70">{table.capacity} seats</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

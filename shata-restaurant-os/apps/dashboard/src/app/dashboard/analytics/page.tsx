"use client";

import { useEffect, useState } from "react";

interface DayStat {
  date: string;
  orders: number;
  revenue: number;
}

interface Stats {
  todayRevenue: number;
  todayOrders: number;
  avgOrderValue: number;
  currency: string;
  last7Days: DayStat[];
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    fetch(`${apiUrl}/api/dashboard/analytics?restaurantId=REPLACE_WITH_RESTAURANT_ID`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const maxRevenue = stats
    ? Math.max(...stats.last7Days.map((d) => d.revenue), 1)
    : 1;

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">Analytics</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {loading ? (
          <div className="flex h-32 items-center justify-center text-sm text-slate-400">
            Loading analytics…
          </div>
        ) : !stats ? (
          <div className="flex h-32 items-center justify-center text-sm text-slate-400">
            Analytics unavailable — connect your restaurant first.
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Today's Revenue", value: `${stats.todayRevenue.toFixed(2)} ${stats.currency}` },
                { label: "Today's Orders", value: String(stats.todayOrders) },
                { label: "Avg Order Value", value: `${stats.avgOrderValue.toFixed(2)} ${stats.currency}` },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-2xl border bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {kpi.label}
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* 7-day revenue bar chart */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-slate-700">
                Revenue — Last 7 Days
              </h2>
              <div className="flex items-end gap-2 h-40">
                {stats.last7Days.map((day) => {
                  const pct = (day.revenue / maxRevenue) * 100;
                  return (
                    <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
                      <p className="text-[9px] text-slate-400 rotate-0">
                        {day.revenue.toFixed(0)}
                      </p>
                      <div className="w-full rounded-t-md bg-brand/20 relative overflow-hidden"
                        style={{ height: "100px" }}>
                        <div
                          className="absolute bottom-0 w-full rounded-t-md bg-brand transition-all"
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <p className="text-[9px] text-slate-400">
                        {new Date(day.date).toLocaleDateString("en", { weekday: "short" })}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

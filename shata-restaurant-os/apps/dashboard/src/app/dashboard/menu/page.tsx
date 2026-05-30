"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  category: string;
  available: boolean;
  imageUrl?: string;
}

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    fetch(`${apiUrl}/api/dashboard/menu?restaurantId=REPLACE_WITH_RESTAURANT_ID`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  async function toggleAvailability(item: MenuItem) {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, available: !i.available } : i))
    );
    await fetch(`${apiUrl}/api/dashboard/menu/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !item.available, restaurantId: "REPLACE_WITH_RESTAURANT_ID" }),
    });
  }

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(filtered.map((i) => i.category))];

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="font-bold text-slate-900">Menu</h1>
          <p className="text-xs text-slate-500">{items.length} items</p>
        </div>
        <input
          type="search"
          placeholder="Search menu…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-3 py-1.5 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {loading ? (
          <div className="flex h-32 items-center justify-center text-sm text-slate-400">
            Loading menu…
          </div>
        ) : categories.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-slate-400">
            No menu items found.
          </div>
        ) : (
          categories.map((cat) => (
            <section key={cat}>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                {cat}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered
                  .filter((i) => i.category === cat)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-2xl border bg-white p-4 shadow-sm transition-opacity ${
                        item.available ? "" : "opacity-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{item.name}</p>
                          {item.description && (
                            <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => toggleAvailability(item)}
                          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                            item.available ? "bg-brand" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                              item.available ? "translate-x-4" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                      <p className="mt-2 font-bold text-brand">
                        {item.price.toFixed(2)} {item.currency}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

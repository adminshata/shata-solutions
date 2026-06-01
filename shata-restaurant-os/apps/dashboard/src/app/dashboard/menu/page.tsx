"use client";

import { useEffect, useRef, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RESTAURANT_ID = "REPLACE_WITH_RESTAURANT_ID";

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

// ── Image uploader ────────────────────────────────────────────────
function ProductImage({
  item,
  onUploaded,
}: {
  item: MenuItem;
  onUploaded: (id: string, url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      // 1. Get presigned URL
      const presignRes = await fetch(
        `${API}/api/dashboard/media/presign?restaurantId=${RESTAURANT_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            contentLength: file.size,
            folder: "products",
          }),
        }
      );
      if (!presignRes.ok) throw new Error("Failed to get upload URL");
      const { uploadUrl, publicUrl } = (await presignRes.json()) as {
        uploadUrl: string;
        publicUrl: string;
      };

      // 2. Upload directly to R2
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putRes.ok) throw new Error("Upload to storage failed");

      // 3. Save URL on product
      const patchRes = await fetch(
        `${API}/api/dashboard/media/products/${item.id}/image?restaurantId=${RESTAURANT_ID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: publicUrl }),
        }
      );
      if (!patchRes.ok) throw new Error("Failed to save image URL");

      onUploaded(item.id, publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function removeImage() {
    setUploading(true);
    try {
      await fetch(
        `${API}/api/dashboard/media/products/${item.id}/image?restaurantId=${RESTAURANT_ID}`,
        { method: "DELETE" }
      );
      onUploaded(item.id, null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl bg-slate-50 border border-dashed border-slate-200 group">
      {item.imageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-slate-800 hover:bg-white"
            >
              Replace
            </button>
            <button
              onClick={removeImage}
              disabled={uploading}
              className="rounded-lg bg-red-500/90 px-2 py-1 text-xs font-medium text-white hover:bg-red-500"
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          {uploading ? (
            <span className="text-xs">Uploading…</span>
          ) : (
            <>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
              <span className="text-xs">Add photo</span>
            </>
          )}
        </button>
      )}
      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      )}
      {error && (
        <p className="absolute bottom-0 inset-x-0 bg-red-500 px-2 py-0.5 text-[10px] text-white text-center">
          {error}
        </p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void upload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/api/dashboard/menu?restaurantId=${RESTAURANT_ID}`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  function handleImageUpdate(id: string, url: string | null) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, imageUrl: url ?? undefined } : i))
    );
  }

  async function toggleAvailability(item: MenuItem) {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, available: !i.available } : i))
    );
    await fetch(`${API}/api/dashboard/menu/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !item.available, restaurantId: RESTAURANT_ID }),
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
                      <ProductImage item={item} onUploaded={handleImageUpdate} />

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

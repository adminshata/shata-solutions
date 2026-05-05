"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { SHATA_STORE_DEFAULTS } from "@/lib/shata-store/defaults";
import { StoreProvider } from "@/lib/shata-store/context";
import type { Product, StoreConfig, StoreTheme } from "@/lib/shata-store/types";
import { themeVars } from "@/lib/shata-store/utils";
import { buildProductsSchema } from "@/lib/shata-store/products-manager-schema";
import { StoreShell } from "@/components/templates/shata-store/layout/StoreShell";
import { Hero, Categories, FeaturedProducts, BannerOffer, ValueProps, Testimonials, Newsletter } from "@/components/templates/shata-store/sections/HomeSections";
import { ItemsManager } from "@/components/templates/shared/items-manager";
import { listAllStoreImages } from "./actions";

/**
 * Tier 1 demo editor — a single live-editable client form mounted next to a
 * live preview of the store. Saves to localStorage so the operator (or later,
 * the client) can refresh without losing changes.
 *
 * Tier 2 swap path:
 *  - Replace `useEditableConfig` with a server-action `loadConfig()` and a
 *    `saveConfig()` mutation against a `store_configs` row in Supabase.
 *  - Wrap the page in your auth gate.
 *  - That's it — no UI changes required.
 */

const STORAGE_KEY = "shata-store/config-draft";

function useEditableConfig() {
  const [config, setConfig] = useState<StoreConfig>(SHATA_STORE_DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig(JSON.parse(raw) as StoreConfig);
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  function save(next: StoreConfig) {
    setConfig(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setSavedAt(new Date());
      } catch { /* ignore */ }
    }
  }
  function reset() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setConfig(SHATA_STORE_DEFAULTS);
    setSavedAt(new Date());
  }
  return { config, save, reset, hydrated, savedAt };
}

export default function StoreEditorPage() {
  const { config, save, reset, hydrated, savedAt } = useEditableConfig();
  const [tab, setTab] = useState<"brand" | "theme" | "sections" | "products" | "contact">("brand");

  // Live update helpers
  function update<K extends keyof StoreConfig>(key: K, value: StoreConfig[K]) {
    save({ ...config, [key]: value });
  }
  function updateTheme(patch: Partial<StoreTheme>) {
    save({ ...config, theme: { ...config.theme, ...patch } });
  }
  function toggleSection(id: typeof config.homeSectionOrder[number]["id"]) {
    save({
      ...config,
      homeSectionOrder: config.homeSectionOrder.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    });
  }
  function moveSection(id: typeof config.homeSectionOrder[number]["id"], dir: -1 | 1) {
    const arr = [...config.homeSectionOrder];
    const i = arr.findIndex((s) => s.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    save({ ...config, homeSectionOrder: arr });
  }
  // Products are managed via <ProductsManagerPanel /> which uses the
  // generic <ItemsManager /> component. The patch helper is no longer needed
  // here — the panel writes the entire products array via `save()`.

  if (!hydrated) {
    return <div className="min-h-screen bg-slate-950 p-10 text-sm text-white/60">Loading editor…</div>;
  }

  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050b16]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/templates/ecommerce/preview"
              target="_blank"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/80 hover:bg-white/[0.08]"
            >
              ← Back to live storefront
            </Link>
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">Editor</span>
              <span className="text-sm font-semibold">{config.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200 sm:inline-flex">
              Tier 1 demo · localStorage
            </span>
            {savedAt && <span className="text-[10px] text-white/45">Saved {savedAt.toLocaleTimeString()}</span>}
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/[0.08]"
            >
              Reset to defaults
            </button>
          </div>
        </div>
      </header>

      <div className={`grid grid-cols-1 ${tab === "products" ? "lg:grid-cols-[minmax(560px,640px)_1fr]" : "lg:grid-cols-[420px_1fr]"}`}>
        {/* Editor panel */}
        <aside className="border-r border-white/10 p-5 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <nav className="flex flex-wrap gap-1">
            {(["brand", "theme", "sections", "products", "contact"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  tab === t
                    ? "bg-gradient-to-r from-[#635bff] to-cyan-400 text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]"
                    : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>

          <div className="mt-6 space-y-6">
            {tab === "brand" && (
              <Group title="Brand">
                <Input label="Store name" value={config.name} onChange={(v) => update("name", v)} />
                <Input label="Tagline" value={config.tagline} onChange={(v) => update("tagline", v)} />
                <Input
                  label="Logo wordmark"
                  value={config.logo.text}
                  onChange={(v) => update("logo", { ...config.logo, text: v })}
                />
                <Input
                  label="Logo image path (optional)"
                  value={config.logo.src ?? ""}
                  onChange={(v) => update("logo", { ...config.logo, src: v || undefined })}
                  placeholder="/templates/shata-store/your-logo.png"
                />
                <p className="text-[11px] text-white/45">
                  Drop a custom logo into <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px]">public/templates/shata-store/</code> and reference it here.
                </p>
              </Group>
            )}

            {tab === "theme" && (
              <Group title="Theme">
                <ColorInput label="Primary"     value={config.theme.primary}    onChange={(v) => updateTheme({ primary: v })} />
                <ColorInput label="Primary text" value={config.theme.primaryFg}  onChange={(v) => updateTheme({ primaryFg: v })} />
                <ColorInput label="Accent"      value={config.theme.accent}     onChange={(v) => updateTheme({ accent: v })} />
                <ColorInput label="Background"  value={config.theme.background} onChange={(v) => updateTheme({ background: v })} />
                <ColorInput label="Foreground"  value={config.theme.foreground} onChange={(v) => updateTheme({ foreground: v })} />
                <ColorInput label="Surface"     value={config.theme.surface}    onChange={(v) => updateTheme({ surface: v })} />
                <ColorInput label="Border"      value={config.theme.border}     onChange={(v) => updateTheme({ border: v })} />
                <Group title="Corner radius" inset>
                  <div className="flex gap-2">
                    {(["sm", "md", "lg"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => updateTheme({ radius: r })}
                        className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                          config.theme.radius === r
                            ? "border-[#635bff] bg-[#635bff]/15 text-white"
                            : "border-white/10 bg-white/[0.04] text-white/65"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </Group>
              </Group>
            )}

            {tab === "sections" && (
              <Group title="Home sections">
                <p className="text-[11px] text-white/55">Toggle and reorder. Live preview updates instantly.</p>
                <ul className="space-y-2">
                  {config.homeSectionOrder.map((s, idx) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <div>
                        <div className="text-sm font-semibold capitalize">{s.id.replace(/-/g, " ")}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/45">
                          Position {idx + 1} · {s.enabled ? "On" : "Off"}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconButton onClick={() => moveSection(s.id, -1)} title="Move up">↑</IconButton>
                        <IconButton onClick={() => moveSection(s.id, 1)} title="Move down">↓</IconButton>
                        <Toggle on={s.enabled} onClick={() => toggleSection(s.id)} />
                      </div>
                    </li>
                  ))}
                </ul>
              </Group>
            )}

            {tab === "products" && (
              <ProductsManagerPanel config={config} onChange={(next) => save({ ...config, products: next })} />
            )}

            {tab === "contact" && (
              <Group title="Contact">
                <Input label="Email"   value={config.contact.email}   onChange={(v) => update("contact", { ...config.contact, email: v })} />
                <Input label="Phone"   value={config.contact.phone}   onChange={(v) => update("contact", { ...config.contact, phone: v })} />
                <Input label="Address" value={config.contact.address} onChange={(v) => update("contact", { ...config.contact, address: v })} />
                <Input label="Hours"   value={config.contact.hours ?? ""} onChange={(v) => update("contact", { ...config.contact, hours: v })} />
                <h4 className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Social links</h4>
                {(["instagram", "facebook", "twitter", "tiktok", "youtube", "whatsapp"] as const).map((k) => (
                  <Input
                    key={k}
                    label={k}
                    value={config.social[k] ?? ""}
                    onChange={(v) => update("social", { ...config.social, [k]: v || undefined })}
                  />
                ))}
              </Group>
            )}
          </div>
        </aside>

        {/* Live preview */}
        <section className="lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <PreviewFrame config={config} />
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Preview                                                             */
/* ------------------------------------------------------------------ */

function PreviewFrame({ config }: { config: StoreConfig }) {
  // Render a live composed home page with the user's config, isolated in a
  // wrapper that sets store CSS vars so the preview reflects the active theme.
  const style = useMemo(() => themeVars(config.theme) as CSSProperties, [config.theme]);
  return (
    <div className="bg-[#fafaf7] text-[#0f172a]" style={style}>
      <div className="border-b border-white/10 bg-white/5 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
        Live preview · changes are instant
      </div>
      <StoreProvider config={config}>
        <StoreShell>
          {config.homeSectionOrder.map((s) => {
            if (!s.enabled) return null;
            switch (s.id) {
              case "hero":              return <Hero key={s.id} />;
              case "categories":        return <Categories key={s.id} />;
              case "featured-products": return <FeaturedProducts key={s.id} />;
              case "banner-offer":      return <BannerOffer key={s.id} />;
              case "value-props":       return <ValueProps key={s.id} />;
              case "testimonials":      return <Testimonials key={s.id} />;
              case "newsletter":        return <Newsletter key={s.id} />;
              default:                  return null;
            }
          })}
        </StoreShell>
      </StoreProvider>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tiny editor primitives                                              */
/* ------------------------------------------------------------------ */

function Group({ title, children, inset }: { title: string; children: ReactNode; inset?: boolean }) {
  return (
    <section className={inset ? "" : "rounded-xl border border-white/10 bg-white/[0.02] p-4"}>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
      />
    </label>
  );
}
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-3">
      <span className="flex-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</span>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-white/10 bg-transparent" />
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-24 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white outline-none focus:border-[#635bff]" />
    </label>
  );
}
function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${on ? "bg-gradient-to-r from-[#635bff] to-cyan-400" : "bg-white/15"}`}
    >
      <span className={`absolute h-4 w-4 transform rounded-full bg-white shadow transition ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}
function IconButton({ children, onClick, title }: { children: ReactNode; onClick: () => void; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-xs text-white/75 hover:bg-white/[0.08]"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* ProductsManagerPanel — the products tab body                        */
/* ------------------------------------------------------------------ */

function ProductsManagerPanel({
  config,
  onChange,
}: {
  config: StoreConfig;
  onChange: (next: Product[]) => void;
}) {
  const [imagePool, setImagePool] = useState<string[]>(() =>
    Array.from(new Set(config.products.flatMap((p) => p.images))).sort()
  );

  // Pull the live image directory from the server on mount so newly-dropped
  // files in public/templates/shata-store/products/ are immediately pickable.
  useEffect(() => {
    let cancelled = false;
    listAllStoreImages()
      .then((paths) => {
        if (!cancelled && paths.length > 0) {
          // Merge with any images currently used (defensive — they're typically a subset).
          const used = config.products.flatMap((p) => p.images);
          const merged = Array.from(new Set([...paths, ...used])).sort();
          setImagePool(merged);
        }
      })
      .catch(() => { /* server action may not be available in static export — fall back to in-use images */ });
    return () => { cancelled = true; };
    // We intentionally only re-fetch when the catalog grows — not on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = useMemo(
    () => buildProductsSchema({ config, imagePool }),
    [config, imagePool]
  );

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <header className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">Products manager</h3>
          <p className="mt-1 text-[11px] text-white/55">
            Add, edit, duplicate, hide, and reorder products. The same component will power Services, Menu, Rooms, and Properties for other industry templates.
          </p>
        </div>
      </header>
      <ItemsManager items={config.products} onChange={onChange} schema={schema} />
    </section>
  );
}

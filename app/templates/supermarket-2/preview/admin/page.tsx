"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SUPERMARKET2_DEFAULTS } from "@/lib/supermarket2/defaults";
import type { SiteConfig } from "@/lib/supermarket2/types";
import { themeVars } from "@/lib/supermarket2/utils";
import { buildProductsSchema } from "@/lib/supermarket2/products-manager-schema";
import { ItemsManager } from "@/components/templates/shared/items-manager";
import { Supermarket2Provider } from "@/lib/supermarket2/context";
import { SiteShell } from "@/components/templates/supermarket2/layout/SiteShell";
import { Header } from "@/components/templates/supermarket2/layout/Header";
import { Footer } from "@/components/templates/supermarket2/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket2/layout/CartDrawer";
import {
  BannerSlider,
  CategoryQuickLinks,
  FeaturesRow,
  FeaturedProducts,
  DiscountProducts,
  WeeklyBestSelling,
  TrendingProducts,
  BlogPosts,
} from "@/components/templates/supermarket2/sections/HomeSections";
import { listAllSupermarket2Images, listProductImages, checkSupermarket2Images } from "./actions";

const STORAGE_KEY = "supermarket2/config-draft";
const PRIMARY = "#DC2626";
const BASE_PATH = "/templates/supermarket-2/preview";

type Tab = "brand" | "theme" | "sections" | "products" | "contact";

export default function Supermarket2AdminPage() {
  const [config, setConfig] = useState<SiteConfig>(SUPERMARKET2_DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>("brand");
  const [imagePool, setImagePool] = useState<string[]>([]);
  const [productImagePool, setProductImagePool] = useState<string[]>([]);
  const [imageReport, setImageReport] = useState<{ checked: number; missing: string[] }>({ checked: 0, missing: [] });
  const [savedMsg, setSavedMsg] = useState("");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig(JSON.parse(raw) as SiteConfig);
    } catch { /* ignore */ }
    listAllSupermarket2Images().then(setImagePool).catch(() => {});
    listProductImages().then(setProductImagePool).catch(() => {});
  }, []);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        setSavedAt(new Date());
      } catch { /* ignore */ }
    }, 800);
  }, [config]);

  useEffect(() => {
    const paths = config.products.flatMap((p) => p.images);
    const id = setTimeout(() => {
      checkSupermarket2Images(paths).then(setImageReport).catch(() => {
        setImageReport({ checked: paths.length, missing: [] });
      });
    }, 400);
    return () => clearTimeout(id);
  }, [config.products]);

  useEffect(() => {
    if (!savedAt) return;
    const update = () => {
      const secs = Math.round((Date.now() - savedAt.getTime()) / 1000);
      if (secs < 5) setSavedMsg("Draft saved just now");
      else if (secs < 60) setSavedMsg(`Draft saved ${secs}s ago`);
      else setSavedMsg(`Draft saved ${Math.round(secs / 60)}m ago`);
    };
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, [savedAt]);

  function patch(delta: Partial<SiteConfig>) {
    setConfig((prev) => ({ ...prev, ...delta }));
  }
  function patchTheme(delta: Partial<SiteConfig["theme"]>) {
    setConfig((prev) => ({ ...prev, theme: { ...prev.theme, ...delta } }));
  }
  function patchContact(delta: Partial<SiteConfig["contact"]>) {
    setConfig((prev) => ({ ...prev, contact: { ...prev.contact, ...delta } }));
  }

  const sectionMap: Record<string, React.ReactNode> = {
    features: <FeaturesRow />,
    featured: <FeaturedProducts />,
    discount: <DiscountProducts />,
    weekly: <WeeklyBestSelling />,
    trending: <TrendingProducts />,
    blog: <BlogPosts />,
  };

  const productsSchema = buildProductsSchema({ config, imagePool: productImagePool });

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f1117] text-white" style={themeVars(config.theme) as CSSProperties}>
      {/* Left Panel */}
      <div className="flex w-[420px] shrink-0 flex-col border-r border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Admin</div>
            <div className="text-sm font-bold text-white">{config.name}</div>
          </div>
          <div className="flex items-center gap-2">
            {savedMsg && <span className="text-[10px] text-white/40">{savedMsg}</span>}
            <Link
              href={BASE_PATH}
              target="_blank"
              className="rounded px-3 py-1.5 text-[11px] font-bold text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
            >
              Preview ↗
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {(["brand", "theme", "sections", "products", "contact"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                activeTab === tab
                  ? "text-white border-b-2"
                  : "text-white/40 hover:text-white/70"
              }`}
              style={activeTab === tab ? { borderColor: PRIMARY } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === "brand" && (
            <>
              <Field label="Store Name">
                <input
                  value={config.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Tagline">
                <input
                  value={config.tagline}
                  onChange={(e) => patch({ tagline: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Logo Text">
                <input
                  value={config.logo.text}
                  onChange={(e) => patch({ logo: { ...config.logo, text: e.target.value } })}
                  className={inputCls}
                />
              </Field>
              <Field label="Announcement Text">
                <input
                  value={config.announcement.text}
                  onChange={(e) => patch({ announcement: { ...config.announcement, text: e.target.value } })}
                  className={inputCls}
                />
              </Field>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.announcement.active}
                  onChange={(e) => patch({ announcement: { ...config.announcement, active: e.target.checked } })}
                  className="rounded"
                />
                <span className="text-[11px] font-semibold text-white/70">Show announcement bar</span>
              </label>
            </>
          )}

          {activeTab === "theme" && (
            <>
              {(
                [
                  ["Primary Color", "primary"],
                  ["Primary Foreground", "primaryFg"],
                  ["Accent Color", "accent"],
                  ["Background", "background"],
                  ["Foreground", "foreground"],
                  ["Muted", "muted"],
                  ["Surface", "surface"],
                  ["Border", "border"],
                ] as [string, keyof SiteConfig["theme"]][]
              ).map(([label, key]) => (
                <Field key={key} label={label}>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.theme[key] as string}
                      onChange={(e) => patchTheme({ [key]: e.target.value })}
                      className="h-9 w-9 rounded border border-white/10 bg-transparent p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme[key] as string}
                      onChange={(e) => patchTheme({ [key]: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                </Field>
              ))}
              <Field label="Border Radius">
                <select
                  value={config.theme.radius}
                  onChange={(e) => patchTheme({ radius: e.target.value as "sm" | "md" | "lg" })}
                  className={inputCls}
                >
                  <option value="sm">Small (4px)</option>
                  <option value="md">Medium (8px)</option>
                  <option value="lg">Large (14px)</option>
                </select>
              </Field>
            </>
          )}

          {activeTab === "sections" && (
            <>
              <p className="text-[11px] text-white/40">Toggle home page sections on/off.</p>
              <div className="space-y-2">
                {config.sections.map((section) => (
                  <label key={section.id} className="flex items-center gap-3 cursor-pointer rounded border border-white/10 p-3 hover:border-white/20">
                    <input
                      type="checkbox"
                      checked={section.active}
                      onChange={(e) => {
                        patch({
                          sections: config.sections.map((s) =>
                            s.id === section.id ? { ...s, active: e.target.checked } : s
                          ),
                        });
                      }}
                      className="rounded"
                    />
                    <span className="text-sm font-semibold text-white/80">{section.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {activeTab === "products" && (
            <>
              {imageReport.checked > 0 && imageReport.missing.length > 0 && (
                <div className="rounded border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-[11px] text-yellow-300">
                  {imageReport.missing.length} missing image{imageReport.missing.length !== 1 ? "s" : ""} detected.
                </div>
              )}
              <ItemsManager
                schema={productsSchema}
                items={config.products}
                onChange={(products) => patch({ products })}
              />
            </>
          )}

          {activeTab === "contact" && (
            <>
              <Field label="Email">
                <input value={config.contact.email} onChange={(e) => patchContact({ email: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Phone">
                <input value={config.contact.phone} onChange={(e) => patchContact({ phone: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Phone 2">
                <input value={config.contact.phone2 ?? ""} onChange={(e) => patchContact({ phone2: e.target.value || undefined })} className={inputCls} />
              </Field>
              <Field label="Address">
                <input value={config.contact.address} onChange={(e) => patchContact({ address: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Hours">
                <input value={config.contact.hours ?? ""} onChange={(e) => patchContact({ hours: e.target.value || undefined })} className={inputCls} />
              </Field>
            </>
          )}
        </div>

        {/* Reset */}
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => { setConfig(SUPERMARKET2_DEFAULTS); window.localStorage.removeItem(STORAGE_KEY); }}
            className="w-full rounded border border-white/10 py-2 text-[11px] font-bold uppercase tracking-wider text-white/40 hover:border-white/20 hover:text-white/60 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1 overflow-y-auto bg-white">
        <Supermarket2Provider config={config}>
          <SiteShell>
            <Header />
            <main>
              <BannerSlider />
              <CategoryQuickLinks />
              {config.sections
                .filter((s) => s.active)
                .map((s) => (
                  <div key={s.id}>{sectionMap[s.id] ?? null}</div>
                ))}
            </main>
            <Footer />
            <CartDrawer />
          </SiteShell>
        </Supermarket2Provider>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#DC2626] transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-1">{label}</span>
      {children}
    </label>
  );
}

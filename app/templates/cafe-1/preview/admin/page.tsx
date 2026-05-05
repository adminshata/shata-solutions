"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { CAFE1_DEFAULTS } from "@/lib/cafe1/defaults";
import type { SiteConfig } from "@/lib/cafe1/types";
import { themeVars } from "@/lib/cafe1/utils";
import { buildMenuSchema } from "@/lib/cafe1/menu-manager-schema";
import { ItemsManager } from "@/components/templates/shared/items-manager";
import { Cafe1Provider } from "@/lib/cafe1/context";
import { SiteShell } from "@/components/templates/cafe1/layout/SiteShell";
import { HomeSections } from "@/components/templates/cafe1/sections/HomeSections";
import { checkCafe1Images, listAllCafe1Images, listMenuImages } from "./actions";

const STORAGE_KEY = "cafe1/config-draft";

type Tab = "brand" | "theme" | "sections" | "menu" | "contact";

export default function Cafe1AdminPage() {
  const [config, setConfig] = useState<SiteConfig>(CAFE1_DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>("brand");
  const [imagePool, setImagePool] = useState<string[]>([]);
  const [menuImagePool, setMenuImagePool] = useState<string[]>([]);
  const [imageReport, setImageReport] = useState<{ checked: number; missing: string[] }>({
    checked: 0,
    missing: [],
  });
  const [savedMsg, setSavedMsg] = useState("");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage + load image pools
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig(JSON.parse(raw) as SiteConfig);
    } catch { /* ignore */ }
    listAllCafe1Images().then(setImagePool).catch(() => {});
    listMenuImages().then(setMenuImagePool).catch(() => {});
  }, []);

  // Auto-save
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
    const paths = config.menuItems.flatMap((item) => item.images);
    const id = setTimeout(() => {
      checkCafe1Images(paths).then(setImageReport).catch(() => {
        setImageReport({ checked: paths.length, missing: [] });
      });
    }, 400);
    return () => clearTimeout(id);
  }, [config.menuItems]);

  // "Saved X ago" ticker
  useEffect(() => {
    if (!savedAt) return;
    const update = () => {
      const secs = Math.round((Date.now() - savedAt.getTime()) / 1000);
      if (secs < 5)       setSavedMsg("Draft saved just now");
      else if (secs < 60) setSavedMsg(`Draft saved ${secs}s ago`);
      else                setSavedMsg(`Draft saved ${Math.round(secs / 60)}m ago`);
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
  function patchBrand(delta: Partial<SiteConfig["brand"]>) {
    setConfig((prev) => ({ ...prev, brand: { ...prev.brand, ...delta } }));
  }
  function patchContact(delta: Partial<SiteConfig["contact"]>) {
    setConfig((prev) => ({ ...prev, contact: { ...prev.contact, ...delta } }));
  }
  function patchSection<K extends keyof SiteConfig["sections"]>(
    key: K,
    delta: Partial<SiteConfig["sections"][K]>
  ) {
    setConfig((prev) => ({
      ...prev,
      sections: { ...prev.sections, [key]: { ...prev.sections[key], ...delta } },
    }));
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "brand",    label: "Brand" },
    { id: "theme",    label: "Theme" },
    { id: "sections", label: "Sections" },
    { id: "menu",     label: "Menu" },
    { id: "contact",  label: "Contact" },
  ];

  const menuSchema = buildMenuSchema(menuImagePool, config.menuItems);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 text-white">
      {/* ── Editor panel ── */}
      <aside className="flex w-[420px] shrink-0 flex-col overflow-hidden border-r border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <div>
            <div className="text-sm font-bold">Cafert Editor</div>
            <div className="text-[11px] text-gray-500">{savedMsg || "No changes yet"}</div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/templates/cafe-1/preview"
              target="_blank"
              rel="noopener"
              className="text-[11px] text-gray-500 hover:text-[#B38E6A] transition-colors"
            >
              Preview ↗
            </a>
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset to defaults? This will clear all changes.")) {
                  window.localStorage.removeItem(STORAGE_KEY);
                  setConfig(CAFE1_DEFAULTS);
                }
              }}
              className="text-[11px] text-gray-500 hover:text-red-400 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 border-b border-gray-800">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 text-[11px] font-semibold transition-colors ${
                activeTab === t.id
                  ? "border-b-2 border-[#B38E6A] text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* ── BRAND ── */}
          {activeTab === "brand" && (
            <>
              <EditorSection title="Identity">
                <Field label="Brand Name">
                  <input value={config.brand.name} onChange={(e) => patchBrand({ name: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Tagline">
                  <input value={config.brand.tagline} onChange={(e) => patchBrand({ tagline: e.target.value })} className={inputCls} />
                </Field>
              </EditorSection>
              <EditorSection title="Navigation Links">
                {config.navigation.map((n, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input
                      value={n.label}
                      onChange={(e) => {
                        const nav = [...config.navigation];
                        nav[i] = { ...nav[i], label: e.target.value };
                        patch({ navigation: nav });
                      }}
                      placeholder="Label"
                      className={inputCls}
                    />
                    <input
                      value={n.href}
                      onChange={(e) => {
                        const nav = [...config.navigation];
                        nav[i] = { ...nav[i], href: e.target.value };
                        patch({ navigation: nav });
                      }}
                      placeholder="/path"
                      className={inputCls}
                    />
                  </div>
                ))}
              </EditorSection>
            </>
          )}

          {/* ── THEME ── */}
          {activeTab === "theme" && (
            <EditorSection title="Colors & Radius">
              {(
                [
                  ["headerColor", "Header / Heading Color"],
                  ["bodyColor",   "Body Text Color"],
                  ["accentColor", "Accent Color"],
                  ["primaryBg",   "Primary Background"],
                  ["lightBg",     "Light Background"],
                ] as [keyof SiteConfig["theme"], string][]
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={config.theme[key]}
                      onChange={(e) => patchTheme({ [key]: e.target.value })}
                      className="w-9 h-9 rounded border border-gray-600 bg-transparent cursor-pointer"
                    />
                    <input
                      value={config.theme[key]}
                      onChange={(e) => patchTheme({ [key]: e.target.value })}
                      className={`${inputCls} flex-1`}
                      placeholder="#000000"
                    />
                  </div>
                </Field>
              ))}
              <Field label="Border Radius">
                <input
                  value={config.theme.radius}
                  onChange={(e) => patchTheme({ radius: e.target.value })}
                  placeholder="4px"
                  className={inputCls}
                />
              </Field>
            </EditorSection>
          )}

          {/* ── SECTIONS ── */}
          {activeTab === "sections" && (
            <>
              <EditorSection title="Hero">
                <Field label="Subtitle">
                  <input value={config.sections.hero.subtitle} onChange={(e) => patchSection("hero", { subtitle: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Heading">
                  <input value={config.sections.hero.heading} onChange={(e) => patchSection("hero", { heading: e.target.value })} className={inputCls} />
                </Field>
                <Field label="CTA Label">
                  <input value={config.sections.hero.ctaLabel} onChange={(e) => patchSection("hero", { ctaLabel: e.target.value })} className={inputCls} />
                </Field>
              </EditorSection>

              <EditorSection title="Offer Banner">
                <Toggle
                  label="Enable"
                  checked={config.sections.offer.enabled}
                  onChange={(v) => patchSection("offer", { enabled: v })}
                />
                <Field label="Heading">
                  <input value={config.sections.offer.heading} onChange={(e) => patchSection("offer", { heading: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Subtitle">
                  <input value={config.sections.offer.subtitle} onChange={(e) => patchSection("offer", { subtitle: e.target.value })} className={inputCls} />
                </Field>
              </EditorSection>

              <EditorSection title="Menu Section">
                <Toggle
                  label="Enable"
                  checked={config.sections.menu.enabled}
                  onChange={(v) => patchSection("menu", { enabled: v })}
                />
                <Field label="Heading">
                  <input value={config.sections.menu.heading} onChange={(e) => patchSection("menu", { heading: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Subtitle">
                  <input value={config.sections.menu.subtitle} onChange={(e) => patchSection("menu", { subtitle: e.target.value })} className={inputCls} />
                </Field>
              </EditorSection>

              <EditorSection title="Private Dining CTA">
                <Toggle
                  label="Enable"
                  checked={config.sections.privateDining.enabled}
                  onChange={(v) => patchSection("privateDining", { enabled: v })}
                />
                <Field label="Subtitle">
                  <input value={config.sections.privateDining.subtitle} onChange={(e) => patchSection("privateDining", { subtitle: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Heading">
                  <input value={config.sections.privateDining.heading} onChange={(e) => patchSection("privateDining", { heading: e.target.value })} className={inputCls} />
                </Field>
                <Field label="CTA Label">
                  <input value={config.sections.privateDining.ctaLabel} onChange={(e) => patchSection("privateDining", { ctaLabel: e.target.value })} className={inputCls} />
                </Field>
              </EditorSection>

              <EditorSection title="Testimonials">
                <Toggle
                  label="Enable"
                  checked={config.sections.testimonials.enabled}
                  onChange={(v) => patchSection("testimonials", { enabled: v })}
                />
                <Field label="Heading">
                  <input value={config.sections.testimonials.heading} onChange={(e) => patchSection("testimonials", { heading: e.target.value })} className={inputCls} />
                </Field>
              </EditorSection>

              <EditorSection title="Booking CTA">
                <Toggle
                  label="Enable"
                  checked={config.sections.booking.enabled}
                  onChange={(v) => patchSection("booking", { enabled: v })}
                />
                <Field label="Subtitle">
                  <input value={config.sections.booking.subtitle} onChange={(e) => patchSection("booking", { subtitle: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Heading">
                  <input value={config.sections.booking.heading} onChange={(e) => patchSection("booking", { heading: e.target.value })} className={inputCls} />
                </Field>
                <Field label="CTA Label">
                  <input value={config.sections.booking.ctaLabel} onChange={(e) => patchSection("booking", { ctaLabel: e.target.value })} className={inputCls} />
                </Field>
              </EditorSection>
            </>
          )}

          {/* ── MENU ITEMS ── */}
          {activeTab === "menu" && (
            <>
              <EditorSection title="Image Library">
                <div className="rounded border border-gray-800 bg-gray-900/60 p-3 text-[11px] leading-5 text-gray-400">
                  <div className="flex items-center justify-between gap-3">
                    <span>Available cafe assets</span>
                    <span className="font-semibold text-gray-200">{imagePool.length}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Menu image choices</span>
                    <span className="font-semibold text-gray-200">{menuImagePool.length}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Referenced item images checked</span>
                    <span className={imageReport.missing.length ? "font-semibold text-red-300" : "font-semibold text-emerald-300"}>
                      {imageReport.checked}
                    </span>
                  </div>
                  {imageReport.missing.length > 0 && (
                    <div className="mt-2 rounded border border-red-500/30 bg-red-500/10 p-2 text-red-200">
                      Missing: {imageReport.missing.join(", ")}
                    </div>
                  )}
                </div>
              </EditorSection>
              <ItemsManager
                items={config.menuItems}
                onChange={(next) => patch({ menuItems: next })}
                schema={menuSchema}
                theme="dark"
              />
            </>
          )}

          {/* ── CONTACT ── */}
          {activeTab === "contact" && (
            <>
              <EditorSection title="Info">
                <Field label="Address">
                  <input value={config.contact.address} onChange={(e) => patchContact({ address: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Phone">
                  <input value={config.contact.phone} onChange={(e) => patchContact({ phone: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Phone 2">
                  <input value={config.contact.phone2 ?? ""} onChange={(e) => patchContact({ phone2: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Email">
                  <input type="email" value={config.contact.email} onChange={(e) => patchContact({ email: e.target.value })} className={inputCls} />
                </Field>
              </EditorSection>

              <EditorSection title="Opening Hours">
                {config.contact.hours.map((h, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input
                      value={h.day}
                      onChange={(e) => {
                        const hrs = [...config.contact.hours];
                        hrs[i] = { ...hrs[i], day: e.target.value };
                        patchContact({ hours: hrs });
                      }}
                      placeholder="Mon – Fri"
                      className={inputCls}
                    />
                    <input
                      value={h.time}
                      onChange={(e) => {
                        const hrs = [...config.contact.hours];
                        hrs[i] = { ...hrs[i], time: e.target.value };
                        patchContact({ hours: hrs });
                      }}
                      placeholder="8am – 9pm"
                      className={inputCls}
                    />
                  </div>
                ))}
              </EditorSection>

              <EditorSection title="Social Links">
                {(["twitter", "facebook", "instagram"] as const).map((k) => (
                  <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}>
                    <input
                      type="url"
                      value={config.contact[k] ?? ""}
                      onChange={(e) => patchContact({ [k]: e.target.value })}
                      placeholder={`https://${k}.com/...`}
                      className={inputCls}
                    />
                  </Field>
                ))}
              </EditorSection>
            </>
          )}
        </div>
      </aside>

      {/* ── Live preview ── */}
      <div className="flex-1 overflow-auto bg-white">
        <div
          style={themeVars(config.theme) as CSSProperties}
          className="min-h-full antialiased"
        >
          <Cafe1Provider config={config}>
            <SiteShell>
              <HomeSections />
            </SiteShell>
          </Cafe1Provider>
        </div>
      </div>
    </div>
  );
}

/* ── Helper components ── */
function EditorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-1">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? "bg-[#B38E6A]" : "bg-gray-700"}`}
      >
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : ""}`} />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">{label}</span>
    </label>
  );
}

const inputCls =
  "w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-[#B38E6A] transition";

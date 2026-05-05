"use client";

import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { SHATA_CAFE_DEFAULTS } from "@/lib/shata-cafe/defaults";
import type { SiteConfig, SectionId } from "@/lib/shata-cafe/types";
import { themeVars } from "@/lib/shata-cafe/utils";
import { buildMenuSchema } from "@/lib/shata-cafe/menu-manager-schema";
import { ItemsManager } from "@/components/templates/shared/items-manager";
import { CafeProvider } from "@/lib/shata-cafe/context";
import { SiteShell } from "@/components/templates/shata-cafe/layout/SiteShell";
import { SECTION_MAP } from "@/components/templates/shata-cafe/sections/HomeSections";
import { listAllCafeImages } from "./actions";

const STORAGE_KEY = "shata-cafe/config-draft";

const BASE = "/templates/cafe1/preview";

const SECTION_LABELS: Record<SectionId, string> = {
  "hero":            "Hero Slideshow",
  "menu-categories": "Menu Categories",
  "about":           "About / Story",
  "featured-menu":   "Chef's Favourites",
  "stats":           "Stats / Counters",
  "gallery":         "Photo Gallery",
  "team":            "Our Team",
  "testimonials":    "Guest Reviews",
  "reservation":     "Reservation / Contact",
  "newsletter":      "Newsletter",
};

type Tab = "brand" | "theme" | "sections" | "menu" | "contact";

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig>(() => ({
    ...SHATA_CAFE_DEFAULTS,
    navigation: [
      { label: "Menu",     href: `${BASE}/menu` },
      { label: "About",    href: `${BASE}/about` },
      { label: "Our Team", href: `${BASE}/team` },
      { label: "Gallery",  href: `${BASE}#gallery` },
      { label: "Contact",  href: `${BASE}/contact` },
    ],
  }));
  const [activeTab, setActiveTab] = useState<Tab>("brand");
  const [imagePool, setImagePool] = useState<string[]>([]);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [savedMsg, setSavedMsg] = useState("");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SiteConfig;
        if (parsed?.slug) setConfig((prev) => ({
          ...parsed,
          navigation: prev.navigation,
        }));
      }
    } catch { /* ignore */ }
    listAllCafeImages().then(setImagePool).catch(() => {});
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        setSavedAt(new Date());
      } catch { /* ignore */ }
    }, 800);
  }, [config]);

  // "Saved X ago" label
  useEffect(() => {
    if (!savedAt) return;
    const update = () => {
      const secs = Math.round((Date.now() - savedAt.getTime()) / 1000);
      if (secs < 5)        setSavedMsg("Draft saved just now");
      else if (secs < 60)  setSavedMsg(`Draft saved ${secs}s ago`);
      else                 setSavedMsg(`Draft saved ${Math.round(secs / 60)}m ago`);
    };
    update();
    const id = setInterval(update, 15000);
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
  function patchSocial(delta: Partial<SiteConfig["social"]>) {
    setConfig((prev) => ({ ...prev, social: { ...prev.social, ...delta } }));
  }

  function moveSectionUp(id: SectionId) {
    const arr = [...config.homeSectionOrder];
    const i = arr.findIndex((s) => s.id === id);
    if (i <= 0) return;
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    patch({ homeSectionOrder: arr });
  }
  function moveSectionDown(id: SectionId) {
    const arr = [...config.homeSectionOrder];
    const i = arr.findIndex((s) => s.id === id);
    if (i < 0 || i >= arr.length - 1) return;
    [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
    patch({ homeSectionOrder: arr });
  }
  function toggleSection(id: SectionId) {
    patch({
      homeSectionOrder: config.homeSectionOrder.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    });
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "brand",    label: "Brand" },
    { id: "theme",    label: "Theme" },
    { id: "sections", label: "Sections" },
    { id: "menu",     label: "Menu" },
    { id: "contact",  label: "Contact" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 text-white">
      {/* ── Editor panel ── */}
      <aside className="flex w-[420px] shrink-0 flex-col overflow-hidden border-r border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <div>
            <div className="text-sm font-bold">Avenue Café Editor</div>
            <div className="text-[11px] text-gray-500">{savedMsg || "No changes yet"}</div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={BASE}
              target="_blank"
              rel="noopener"
              className="text-[11px] text-gray-500 hover:text-amber-400 transition-colors"
            >
              Preview ↗
            </a>
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset to defaults? This clears all draft changes.")) {
                  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
                  setConfig({
                    ...SHATA_CAFE_DEFAULTS,
                    navigation: config.navigation,
                  });
                }
              }}
              className="text-[11px] text-gray-500 hover:text-red-400 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex shrink-0 border-b border-gray-800">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 text-[12px] font-semibold transition-colors ${
                activeTab === t.id
                  ? "border-b-2 border-amber-500 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* ── BRAND ── */}
          {activeTab === "brand" && (
            <>
              <EditorSection title="Site Identity">
                <Field label="Café Name">
                  <input value={config.name} onChange={(e) => patch({ name: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Tagline">
                  <input value={config.tagline} onChange={(e) => patch({ tagline: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Description">
                  <textarea rows={3} value={config.description} onChange={(e) => patch({ description: e.target.value })} className={inputCls} />
                </Field>
              </EditorSection>

              <EditorSection title="Announcement Bar">
                <div className="flex items-center gap-3 mb-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.sections.announcement?.enabled ?? false}
                      onChange={(e) =>
                        patch({
                          sections: {
                            ...config.sections,
                            announcement: {
                              text: config.sections.announcement?.text ?? "",
                              enabled: e.target.checked,
                            },
                          },
                        })
                      }
                      className="accent-amber-500"
                    />
                    Show announcement bar
                  </label>
                </div>
                <Field label="Text">
                  <input
                    value={config.sections.announcement?.text ?? ""}
                    onChange={(e) =>
                      patch({
                        sections: {
                          ...config.sections,
                          announcement: {
                            enabled: config.sections.announcement?.enabled ?? true,
                            text: e.target.value,
                          },
                        },
                      })
                    }
                    className={inputCls}
                  />
                </Field>
              </EditorSection>
            </>
          )}

          {/* ── THEME ── */}
          {activeTab === "theme" && (
            <>
              <EditorSection title="Colors">
                {(
                  [
                    ["primary",    "Primary (nav, footer, buttons)"],
                    ["primaryFg",  "Primary Foreground (text on primary)"],
                    ["accent",     "Accent (amber/gold highlights)"],
                    ["background", "Page Background"],
                    ["foreground", "Body Text"],
                    ["muted",      "Muted / Secondary Text"],
                    ["surface",    "Card / Surface Background"],
                    ["border",     "Border Color"],
                  ] as [keyof SiteConfig["theme"], string][]
                ).map(([key, label]) =>
                  key !== "radius" ? (
                    <div key={key} className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.theme[key] as string}
                        onChange={(e) => patchTheme({ [key]: e.target.value })}
                        className="h-8 w-8 shrink-0 cursor-pointer rounded border border-gray-600 bg-transparent p-0"
                      />
                      <div className="flex-1">
                        <div className="text-[11px] text-gray-400">{label}</div>
                        <input
                          type="text"
                          value={config.theme[key] as string}
                          onChange={(e) => patchTheme({ [key]: e.target.value })}
                          className="mt-0.5 w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-white outline-none focus:border-amber-500 font-mono"
                        />
                      </div>
                    </div>
                  ) : null
                )}
              </EditorSection>
              <EditorSection title="Corner Radius">
                <div className="flex gap-3">
                  {(["sm", "md", "lg"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => patchTheme({ radius: r })}
                      className={`flex-1 rounded py-2 text-xs font-semibold transition-colors ${
                        config.theme.radius === r
                          ? "bg-amber-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {r === "sm" ? "Sharp" : r === "md" ? "Rounded" : "Pill"}
                    </button>
                  ))}
                </div>
              </EditorSection>
            </>
          )}

          {/* ── SECTIONS ── */}
          {activeTab === "sections" && (
            <EditorSection title="Home Page Sections">
              <p className="text-[11px] text-gray-500 mb-3">Toggle visibility and drag to reorder.</p>
              <ul className="space-y-1.5">
                {config.homeSectionOrder.map((item, i) => (
                  <li
                    key={item.id}
                    className={`flex items-center gap-2 rounded border p-2.5 text-sm ${
                      item.enabled ? "border-gray-700 bg-gray-800" : "border-gray-800 bg-gray-900 opacity-50"
                    }`}
                  >
                    <button type="button" onClick={() => toggleSection(item.id)} className="shrink-0">
                      <div className={`h-4 w-4 rounded border flex items-center justify-center text-[10px] text-white ${
                        item.enabled ? "border-amber-500 bg-amber-500" : "border-gray-600"
                      }`}>
                        {item.enabled ? "✓" : ""}
                      </div>
                    </button>
                    <span className="flex-1 text-[13px]">{SECTION_LABELS[item.id]}</span>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => moveSectionUp(item.id)} disabled={i === 0} className="px-1.5 text-gray-500 hover:text-white disabled:opacity-30">↑</button>
                      <button type="button" onClick={() => moveSectionDown(item.id)} disabled={i === config.homeSectionOrder.length - 1} className="px-1.5 text-gray-500 hover:text-white disabled:opacity-30">↓</button>
                    </div>
                  </li>
                ))}
              </ul>
            </EditorSection>
          )}

          {/* ── MENU ── */}
          {activeTab === "menu" && (
            <div className="-mx-4 -my-4">
              <ItemsManager
                items={config.menuItems}
                onChange={(menuItems) => patch({ menuItems })}
                schema={buildMenuSchema(config.menuItems, imagePool)}
                theme="dark"
              />
            </div>
          )}

          {/* ── CONTACT ── */}
          {activeTab === "contact" && (
            <>
              <EditorSection title="Contact Details">
                <Field label="Email">
                  <input value={config.contact.email} onChange={(e) => patchContact({ email: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Phone">
                  <input value={config.contact.phone} onChange={(e) => patchContact({ phone: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Reservations Phone">
                  <input value={config.contact.reservationPhone ?? ""} onChange={(e) => patchContact({ reservationPhone: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Address">
                  <input value={config.contact.address} onChange={(e) => patchContact({ address: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Hours (short)">
                  <input value={config.contact.hours ?? ""} onChange={(e) => patchContact({ hours: e.target.value })} placeholder="Mon–Fri 7am–10pm · Sat–Sun 8am–11pm" className={inputCls} />
                </Field>
              </EditorSection>
              <EditorSection title="Social Links">
                {(["instagram", "facebook", "tripadvisor", "whatsapp"] as const).map((k) => (
                  <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}>
                    <input
                      type="url"
                      value={config.social[k] ?? ""}
                      onChange={(e) => patchSocial({ [k]: e.target.value })}
                      placeholder={`https://${k}.com/yourpage`}
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
      <div className="flex-1 overflow-auto">
        <div
          style={themeVars(config.theme) as CSSProperties}
          className="min-h-full bg-[color:var(--cafe-bg)] text-[color:var(--cafe-fg)] antialiased"
        >
          <CafeProvider config={config}>
            <SiteShell>
              <div>
                {config.homeSectionOrder
                  .filter((s) => s.enabled)
                  .map((s) => {
                    const Section = SECTION_MAP[s.id];
                    return Section ? <Section key={s.id} /> : null;
                  })}
              </div>
            </SiteShell>
          </CafeProvider>
        </div>
      </div>
    </div>
  );
}

/* ── Helper sub-components ── */
function EditorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-1">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-amber-500 transition";

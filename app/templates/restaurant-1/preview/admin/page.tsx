"use client";

import { useState } from "react";
import Link from "next/link";
import { useSite, useUpdateSite } from "@/lib/restaurant1/context";
import type { SiteConfig, HomeSection, CustomPage } from "@/lib/restaurant1/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

function arr_del<T>(a: T[], i: number): T[] {
  return a.filter((_, x) => x !== i);
}
function arr_dup<T>(a: T[], i: number): T[] {
  const c = [...a];
  const orig = c[i];
  const copy =
    orig && typeof orig === "object" && "id" in orig
      ? ({ ...orig, id: uid() } as T)
      : ({ ...(orig as object) } as T);
  c.splice(i + 1, 0, copy);
  return c;
}
function arr_up<T>(a: T[], i: number): T[] {
  if (i === 0) return a;
  const c = [...a];
  [c[i - 1], c[i]] = [c[i], c[i - 1]];
  return c;
}
function arr_dn<T>(a: T[], i: number): T[] {
  if (i === a.length - 1) return a;
  const c = [...a];
  [c[i], c[i + 1]] = [c[i + 1], c[i]];
  return c;
}

// ─── Mini Components ──────────────────────────────────────────────────────────
function ImgPrev({ src }: { src: string }) {
  if (!src) return null;
  return (
    <div className="mt-1.5 h-20 w-full overflow-hidden rounded border border-gray-100 bg-gray-50">
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

function Actions({
  i,
  len,
  onDel,
  onDup,
  onUp,
  onDn,
}: {
  i: number;
  len: number;
  onDel: () => void;
  onDup: () => void;
  onUp: () => void;
  onDn: () => void;
}) {
  const b =
    "px-1.5 py-0.5 text-xs rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors";
  return (
    <div className="flex flex-shrink-0 gap-1">
      <button className={b} onClick={onUp} disabled={i === 0} title="Move up">
        ↑
      </button>
      <button className={b} onClick={onDn} disabled={i === len - 1} title="Move down">
        ↓
      </button>
      <button className={b} onClick={onDup} title="Duplicate">
        ⧉
      </button>
      <button
        className={`${b} hover:border-red-300 hover:text-red-500`}
        onClick={onDel}
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  "Brand",
  "Theme",
  "Navigation",
  "Hero / Banners",
  "About",
  "Menu Items",
  "Menu Categories",
  "Daily Specials",
  "Gallery",
  "Chefs",
  "Testimonials",
  "Blog",
  "Reservation",
  "Contact",
  "Footer",
  "Home Sections",
  "Pages",
] as const;
type Tab = (typeof TABS)[number];

// ─── Default sections ─────────────────────────────────────────────────────────
const DEFAULT_HOME_SECTIONS: HomeSection[] = [
  { id: "hero", label: "Hero Slider", enabled: true },
  { id: "about", label: "About / Story Tabs", enabled: true },
  { id: "specials", label: "Daily Specials", enabled: true },
  { id: "menu", label: "Menu Preview", enabled: true },
  { id: "testimonials", label: "Testimonials Carousel", enabled: true },
  { id: "blog", label: "Blog Preview", enabled: true },
  { id: "reservation", label: "Reservation Banner", enabled: true },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const site = useSite();
  const { update, reset } = useUpdateSite();
  const [activeTab, setActiveTab] = useState<Tab>("Brand");
  const [draft, setDraft] = useState<SiteConfig>({ ...site });
  const [homeSections, setHomeSections] = useState<HomeSection[]>(
    site.homeSections ?? DEFAULT_HOME_SECTIONS
  );
  const [customPages, setCustomPages] = useState<CustomPage[]>(
    site.customPages ?? []
  );

  const save = () => update({ ...draft, homeSections, customPages });

  const set = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const inp =
    "w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-amber-400 rounded bg-white transition-colors";
  const lbl = "block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide";
  const addBtn =
    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border-2 border-dashed border-amber-300 text-amber-600 hover:bg-amber-50 transition-colors";

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="flex w-56 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Restaurant-1
          </p>
          <p className="mt-0.5 text-sm font-semibold text-gray-800">Admin Editor</p>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full rounded px-3 py-2 text-left text-xs transition-colors ${
                activeTab === tab
                  ? "bg-amber-50 font-semibold text-amber-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="space-y-2 border-t border-gray-200 p-3">
          <button
            onClick={save}
            className="w-full rounded py-2 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:opacity-80"
            style={{ background: "#c8a97e" }}
          >
            Save Changes
          </button>
          <button
            onClick={reset}
            className="w-full rounded border border-gray-200 py-2 text-xs font-semibold uppercase tracking-widest text-gray-500 transition-all hover:bg-gray-50"
          >
            Reset Defaults
          </button>
          <Link
            href="/templates/restaurant-1/preview"
            target="_blank"
            className="block py-2 text-center text-xs font-semibold uppercase tracking-widest text-blue-600 hover:underline"
          >
            View Preview ↗
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-xl font-semibold text-gray-800">{activeTab}</h1>

          {/* ── BRAND ─────────────────────────────────────────────────────── */}
          {activeTab === "Brand" && (
            <div className="space-y-4 rounded border border-gray-200 bg-white p-6">
              {(
                [
                  ["Restaurant Name", "name"],
                  ["Tagline", "tagline"],
                  ["Logo (dark bg) URL", "logo"],
                  ["Logo (light) URL", "logoLight"],
                ] as const
              ).map(([l, k]) => (
                <div key={k}>
                  <label className={lbl}>{l}</label>
                  <input
                    className={inp}
                    value={draft.brand[k]}
                    onChange={(e) =>
                      set("brand", { ...draft.brand, [k]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── THEME ─────────────────────────────────────────────────────── */}
          {activeTab === "Theme" && (
            <div className="space-y-4 rounded border border-gray-200 bg-white p-6">
              {(
                [
                  ["Primary Color", "primaryColor"],
                  ["Accent Color", "accentColor"],
                  ["Dark Color", "darkColor"],
                  ["Light Color", "lightColor"],
                ] as const
              ).map(([l, k]) => (
                <div key={k} className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className={lbl}>{l}</label>
                    <input
                      className={inp}
                      value={draft.theme[k]}
                      onChange={(e) =>
                        set("theme", { ...draft.theme, [k]: e.target.value })
                      }
                    />
                  </div>
                  <input
                    type="color"
                    value={draft.theme[k]}
                    onChange={(e) =>
                      set("theme", { ...draft.theme, [k]: e.target.value })
                    }
                    className="mb-0.5 h-10 w-10 cursor-pointer rounded border border-gray-200"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── NAVIGATION ────────────────────────────────────────────────── */}
          {activeTab === "Navigation" && (
            <div className="space-y-3">
              <button
                className={addBtn}
                onClick={() =>
                  set("navigation", [
                    ...draft.navigation,
                    { label: "New Page", href: "/" },
                  ])
                }
              >
                + Add Link
              </button>
              {draft.navigation.map((nav, i) => (
                <div key={i} className="rounded border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400">
                      Link {i + 1}
                    </span>
                    <Actions
                      i={i}
                      len={draft.navigation.length}
                      onDel={() => set("navigation", arr_del(draft.navigation, i))}
                      onDup={() => set("navigation", arr_dup(draft.navigation, i))}
                      onUp={() => set("navigation", arr_up(draft.navigation, i))}
                      onDn={() => set("navigation", arr_dn(draft.navigation, i))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Label</label>
                      <input
                        className={inp}
                        value={nav.label}
                        onChange={(e) => {
                          const n = [...draft.navigation];
                          n[i] = { ...n[i], label: e.target.value };
                          set("navigation", n);
                        }}
                      />
                    </div>
                    <div>
                      <label className={lbl}>URL</label>
                      <input
                        className={inp}
                        value={nav.href}
                        onChange={(e) => {
                          const n = [...draft.navigation];
                          n[i] = { ...n[i], href: e.target.value };
                          set("navigation", n);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── HERO / BANNERS ────────────────────────────────────────────── */}
          {activeTab === "Hero / Banners" && (
            <div className="space-y-4">
              <button
                className={addBtn}
                onClick={() =>
                  set("hero", {
                    slides: [
                      ...draft.hero.slides,
                      {
                        id: uid(),
                        image: "",
                        subheadline: "A New Experience",
                        headline: "New Slide",
                        bio: "",
                        ctaLabel: "Explore",
                        ctaHref: "/templates/restaurant-1/preview/menu",
                      },
                    ],
                  })
                }
              >
                + Add Slide
              </button>
              {draft.hero.slides.map((slide, i) => (
                <div key={i} className="rounded border border-gray-200 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400">
                      Slide {i + 1}
                    </span>
                    <Actions
                      i={i}
                      len={draft.hero.slides.length}
                      onDel={() =>
                        set("hero", { slides: arr_del(draft.hero.slides, i) })
                      }
                      onDup={() =>
                        set("hero", { slides: arr_dup(draft.hero.slides, i) })
                      }
                      onUp={() =>
                        set("hero", { slides: arr_up(draft.hero.slides, i) })
                      }
                      onDn={() =>
                        set("hero", { slides: arr_dn(draft.hero.slides, i) })
                      }
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className={lbl}>Image URL</label>
                      <input
                        className={inp}
                        value={slide.image}
                        onChange={(e) => {
                          const s = [...draft.hero.slides];
                          s[i] = { ...s[i], image: e.target.value };
                          set("hero", { slides: s });
                        }}
                      />
                      <ImgPrev src={slide.image} />
                    </div>
                    {(
                      [
                        ["Subheadline", "subheadline"],
                        ["Headline", "headline"],
                        ["Bio / Description", "bio"],
                        ["CTA Label", "ctaLabel"],
                        ["CTA URL", "ctaHref"],
                      ] as const
                    ).map(([l, k]) => (
                      <div key={k}>
                        <label className={lbl}>{l}</label>
                        <input
                          className={inp}
                          value={slide[k]}
                          onChange={(e) => {
                            const s = [...draft.hero.slides];
                            s[i] = { ...s[i], [k]: e.target.value };
                            set("hero", { slides: s });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ABOUT ─────────────────────────────────────────────────────── */}
          {activeTab === "About" && (
            <div className="space-y-4 rounded border border-gray-200 bg-white p-6">
              <div>
                <label className={lbl}>Subtitle</label>
                <input
                  className={inp}
                  value={draft.about.subtitle}
                  onChange={(e) =>
                    set("about", { ...draft.about, subtitle: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={lbl}>Heading</label>
                <input
                  className={inp}
                  value={draft.about.heading}
                  onChange={(e) =>
                    set("about", { ...draft.about, heading: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={lbl}>Description</label>
                <textarea
                  rows={4}
                  className={`${inp} resize-none`}
                  value={draft.about.description}
                  onChange={(e) =>
                    set("about", { ...draft.about, description: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* ── MENU ITEMS ────────────────────────────────────────────────── */}
          {activeTab === "Menu Items" && (
            <div className="space-y-4">
              <button
                className={addBtn}
                onClick={() =>
                  set("menuItems", [
                    ...draft.menuItems,
                    {
                      id: uid(),
                      handle: uid(),
                      name: "New Item",
                      description: "Item description",
                      price: "$0.00",
                      image: "",
                      category: draft.menuSection.categories[0]?.id ?? "starters",
                      active: true,
                    },
                  ])
                }
              >
                + Add Menu Item
              </button>
              {draft.menuItems.map((item, i) => (
                <div key={item.id} className="rounded border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="mr-2 truncate text-xs font-bold uppercase text-gray-400">
                      {item.name}
                    </span>
                    <Actions
                      i={i}
                      len={draft.menuItems.length}
                      onDel={() => set("menuItems", arr_del(draft.menuItems, i))}
                      onDup={() => set("menuItems", arr_dup(draft.menuItems, i))}
                      onUp={() => set("menuItems", arr_up(draft.menuItems, i))}
                      onDn={() => set("menuItems", arr_dn(draft.menuItems, i))}
                    />
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-2">
                    <div>
                      <label className={lbl}>Name</label>
                      <input
                        className={inp}
                        value={item.name}
                        onChange={(e) => {
                          const a = [...draft.menuItems];
                          a[i] = { ...a[i], name: e.target.value };
                          set("menuItems", a);
                        }}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Price</label>
                      <input
                        className={inp}
                        value={item.price}
                        onChange={(e) => {
                          const a = [...draft.menuItems];
                          a[i] = { ...a[i], price: e.target.value };
                          set("menuItems", a);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className={lbl}>Description</label>
                    <input
                      className={inp}
                      value={item.description}
                      onChange={(e) => {
                        const a = [...draft.menuItems];
                        a[i] = { ...a[i], description: e.target.value };
                        set("menuItems", a);
                      }}
                    />
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-2">
                    <div>
                      <label className={lbl}>Category</label>
                      <select
                        className={inp}
                        value={item.category}
                        onChange={(e) => {
                          const a = [...draft.menuItems];
                          a[i] = { ...a[i], category: e.target.value };
                          set("menuItems", a);
                        }}
                      >
                        {draft.menuSection.categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={lbl}>Badge (optional)</label>
                      <input
                        className={inp}
                        value={item.badge ?? ""}
                        placeholder="e.g. Popular"
                        onChange={(e) => {
                          const a = [...draft.menuItems];
                          a[i] = { ...a[i], badge: e.target.value };
                          set("menuItems", a);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Image URL</label>
                    <input
                      className={inp}
                      value={item.image}
                      onChange={(e) => {
                        const a = [...draft.menuItems];
                        a[i] = { ...a[i], image: e.target.value };
                        set("menuItems", a);
                      }}
                    />
                    <ImgPrev src={item.image} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── MENU CATEGORIES ───────────────────────────────────────────── */}
          {activeTab === "Menu Categories" && (
            <div className="space-y-4">
              <div className="space-y-3 rounded border border-gray-200 bg-white p-5">
                <div>
                  <label className={lbl}>Section Subtitle</label>
                  <input
                    className={inp}
                    value={draft.menuSection.subtitle}
                    onChange={(e) =>
                      set("menuSection", {
                        ...draft.menuSection,
                        subtitle: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className={lbl}>Section Heading</label>
                  <input
                    className={inp}
                    value={draft.menuSection.heading}
                    onChange={(e) =>
                      set("menuSection", {
                        ...draft.menuSection,
                        heading: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className={lbl}>Description</label>
                  <textarea
                    rows={3}
                    className={`${inp} resize-none`}
                    value={draft.menuSection.description}
                    onChange={(e) =>
                      set("menuSection", {
                        ...draft.menuSection,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <button
                className={addBtn}
                onClick={() =>
                  set("menuSection", {
                    ...draft.menuSection,
                    categories: [
                      ...draft.menuSection.categories,
                      { id: uid(), label: "New Category", handle: uid() },
                    ],
                  })
                }
              >
                + Add Category
              </button>
              {draft.menuSection.categories.map((cat, i) => (
                <div key={cat.id} className="rounded border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400">
                      {cat.label}
                    </span>
                    <Actions
                      i={i}
                      len={draft.menuSection.categories.length}
                      onDel={() =>
                        set("menuSection", {
                          ...draft.menuSection,
                          categories: arr_del(draft.menuSection.categories, i),
                        })
                      }
                      onDup={() =>
                        set("menuSection", {
                          ...draft.menuSection,
                          categories: arr_dup(draft.menuSection.categories, i),
                        })
                      }
                      onUp={() =>
                        set("menuSection", {
                          ...draft.menuSection,
                          categories: arr_up(draft.menuSection.categories, i),
                        })
                      }
                      onDn={() =>
                        set("menuSection", {
                          ...draft.menuSection,
                          categories: arr_dn(draft.menuSection.categories, i),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Label</label>
                      <input
                        className={inp}
                        value={cat.label}
                        onChange={(e) => {
                          const c = [...draft.menuSection.categories];
                          c[i] = { ...c[i], label: e.target.value };
                          set("menuSection", { ...draft.menuSection, categories: c });
                        }}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Handle (slug)</label>
                      <input
                        className={inp}
                        value={cat.handle}
                        onChange={(e) => {
                          const c = [...draft.menuSection.categories];
                          c[i] = { ...c[i], handle: e.target.value };
                          set("menuSection", { ...draft.menuSection, categories: c });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── DAILY SPECIALS ────────────────────────────────────────────── */}
          {activeTab === "Daily Specials" && (
            <div className="space-y-4">
              <div className="space-y-3 rounded border border-gray-200 bg-white p-5">
                <div>
                  <label className={lbl}>Subtitle</label>
                  <input
                    className={inp}
                    value={draft.specials.subtitle}
                    onChange={(e) =>
                      set("specials", { ...draft.specials, subtitle: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={lbl}>Heading</label>
                  <input
                    className={inp}
                    value={draft.specials.heading}
                    onChange={(e) =>
                      set("specials", { ...draft.specials, heading: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={lbl}>Background Image URL</label>
                  <input
                    className={inp}
                    value={draft.specials.bgImage}
                    onChange={(e) =>
                      set("specials", { ...draft.specials, bgImage: e.target.value })
                    }
                  />
                  <ImgPrev src={draft.specials.bgImage} />
                </div>
              </div>
              <button
                className={addBtn}
                onClick={() =>
                  set("specials", {
                    ...draft.specials,
                    dishes: [
                      ...draft.specials.dishes,
                      { id: uid(), title: "New Special", price: "$0.00", description: "" },
                    ],
                  })
                }
              >
                + Add Special
              </button>
              {draft.specials.dishes.map((dish, i) => (
                <div key={dish.id} className="rounded border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400">
                      {dish.title}
                    </span>
                    <Actions
                      i={i}
                      len={draft.specials.dishes.length}
                      onDel={() =>
                        set("specials", {
                          ...draft.specials,
                          dishes: arr_del(draft.specials.dishes, i),
                        })
                      }
                      onDup={() =>
                        set("specials", {
                          ...draft.specials,
                          dishes: arr_dup(draft.specials.dishes, i),
                        })
                      }
                      onUp={() =>
                        set("specials", {
                          ...draft.specials,
                          dishes: arr_up(draft.specials.dishes, i),
                        })
                      }
                      onDn={() =>
                        set("specials", {
                          ...draft.specials,
                          dishes: arr_dn(draft.specials.dishes, i),
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Title</label>
                      <input
                        className={inp}
                        value={dish.title}
                        onChange={(e) => {
                          const d = [...draft.specials.dishes];
                          d[i] = { ...d[i], title: e.target.value };
                          set("specials", { ...draft.specials, dishes: d });
                        }}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Price</label>
                      <input
                        className={inp}
                        value={dish.price}
                        onChange={(e) => {
                          const d = [...draft.specials.dishes];
                          d[i] = { ...d[i], price: e.target.value };
                          set("specials", { ...draft.specials, dishes: d });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Description</label>
                    <textarea
                      rows={2}
                      className={`${inp} resize-none`}
                      value={dish.description}
                      onChange={(e) => {
                        const d = [...draft.specials.dishes];
                        d[i] = { ...d[i], description: e.target.value };
                        set("specials", { ...draft.specials, dishes: d });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── GALLERY ───────────────────────────────────────────────────── */}
          {activeTab === "Gallery" && (
            <div className="space-y-4">
              <button
                className={addBtn}
                onClick={() =>
                  set("gallery", {
                    items: [
                      ...draft.gallery.items,
                      { id: uid(), src: "", alt: "Gallery Image", category: "all" },
                    ],
                  })
                }
              >
                + Add Image
              </button>
              {draft.gallery.items.map((item, i) => (
                <div key={item.id} className="rounded border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400">
                      {item.alt || `Image ${i + 1}`}
                    </span>
                    <Actions
                      i={i}
                      len={draft.gallery.items.length}
                      onDel={() =>
                        set("gallery", { items: arr_del(draft.gallery.items, i) })
                      }
                      onDup={() =>
                        set("gallery", { items: arr_dup(draft.gallery.items, i) })
                      }
                      onUp={() =>
                        set("gallery", { items: arr_up(draft.gallery.items, i) })
                      }
                      onDn={() =>
                        set("gallery", { items: arr_dn(draft.gallery.items, i) })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className={lbl}>Image URL</label>
                    <input
                      className={inp}
                      value={item.src}
                      onChange={(e) => {
                        const a = [...draft.gallery.items];
                        a[i] = { ...a[i], src: e.target.value };
                        set("gallery", { items: a });
                      }}
                    />
                    <ImgPrev src={item.src} />
                  </div>
                  <div>
                    <label className={lbl}>Alt Text</label>
                    <input
                      className={inp}
                      value={item.alt}
                      onChange={(e) => {
                        const a = [...draft.gallery.items];
                        a[i] = { ...a[i], alt: e.target.value };
                        set("gallery", { items: a });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CHEFS ─────────────────────────────────────────────────────── */}
          {activeTab === "Chefs" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 rounded border border-gray-200 bg-white p-5">
                <div>
                  <label className={lbl}>Subtitle</label>
                  <input
                    className={inp}
                    value={draft.chefs.subtitle}
                    onChange={(e) =>
                      set("chefs", { ...draft.chefs, subtitle: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={lbl}>Heading</label>
                  <input
                    className={inp}
                    value={draft.chefs.heading}
                    onChange={(e) =>
                      set("chefs", { ...draft.chefs, heading: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                className={addBtn}
                onClick={() =>
                  set("chefs", {
                    ...draft.chefs,
                    items: [
                      ...draft.chefs.items,
                      { id: uid(), name: "New Chef", role: "Chef", image: "", bio: "" },
                    ],
                  })
                }
              >
                + Add Chef
              </button>
              {draft.chefs.items.map((chef, i) => (
                <div key={chef.id} className="rounded border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400">
                      {chef.name}
                    </span>
                    <Actions
                      i={i}
                      len={draft.chefs.items.length}
                      onDel={() =>
                        set("chefs", {
                          ...draft.chefs,
                          items: arr_del(draft.chefs.items, i),
                        })
                      }
                      onDup={() =>
                        set("chefs", {
                          ...draft.chefs,
                          items: arr_dup(draft.chefs.items, i),
                        })
                      }
                      onUp={() =>
                        set("chefs", {
                          ...draft.chefs,
                          items: arr_up(draft.chefs.items, i),
                        })
                      }
                      onDn={() =>
                        set("chefs", {
                          ...draft.chefs,
                          items: arr_dn(draft.chefs.items, i),
                        })
                      }
                    />
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Name</label>
                      <input
                        className={inp}
                        value={chef.name}
                        onChange={(e) => {
                          const a = [...draft.chefs.items];
                          a[i] = { ...a[i], name: e.target.value };
                          set("chefs", { ...draft.chefs, items: a });
                        }}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Role</label>
                      <input
                        className={inp}
                        value={chef.role}
                        onChange={(e) => {
                          const a = [...draft.chefs.items];
                          a[i] = { ...a[i], role: e.target.value };
                          set("chefs", { ...draft.chefs, items: a });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className={lbl}>Image URL</label>
                    <input
                      className={inp}
                      value={chef.image}
                      onChange={(e) => {
                        const a = [...draft.chefs.items];
                        a[i] = { ...a[i], image: e.target.value };
                        set("chefs", { ...draft.chefs, items: a });
                      }}
                    />
                    <ImgPrev src={chef.image} />
                  </div>
                  <div>
                    <label className={lbl}>Bio</label>
                    <textarea
                      rows={2}
                      className={`${inp} resize-none`}
                      value={chef.bio ?? ""}
                      onChange={(e) => {
                        const a = [...draft.chefs.items];
                        a[i] = { ...a[i], bio: e.target.value };
                        set("chefs", { ...draft.chefs, items: a });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
          {activeTab === "Testimonials" && (
            <div className="space-y-4">
              <div className="space-y-3 rounded border border-gray-200 bg-white p-5">
                <div>
                  <label className={lbl}>Subtitle</label>
                  <input
                    className={inp}
                    value={draft.testimonials.subtitle}
                    onChange={(e) =>
                      set("testimonials", {
                        ...draft.testimonials,
                        subtitle: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className={lbl}>Heading</label>
                  <input
                    className={inp}
                    value={draft.testimonials.heading}
                    onChange={(e) =>
                      set("testimonials", {
                        ...draft.testimonials,
                        heading: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className={lbl}>Background Image URL</label>
                  <input
                    className={inp}
                    value={draft.testimonials.bgImage}
                    onChange={(e) =>
                      set("testimonials", {
                        ...draft.testimonials,
                        bgImage: e.target.value,
                      })
                    }
                  />
                  <ImgPrev src={draft.testimonials.bgImage} />
                </div>
              </div>
              <button
                className={addBtn}
                onClick={() =>
                  set("testimonials", {
                    ...draft.testimonials,
                    items: [
                      ...draft.testimonials.items,
                      {
                        id: uid(),
                        author: "New Guest",
                        role: "Visitor",
                        image: "",
                        rating: 5,
                        text: "Great experience!",
                      },
                    ],
                  })
                }
              >
                + Add Testimonial
              </button>
              {draft.testimonials.items.map((item, i) => (
                <div key={item.id} className="rounded border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400">
                      {item.author}
                    </span>
                    <Actions
                      i={i}
                      len={draft.testimonials.items.length}
                      onDel={() =>
                        set("testimonials", {
                          ...draft.testimonials,
                          items: arr_del(draft.testimonials.items, i),
                        })
                      }
                      onDup={() =>
                        set("testimonials", {
                          ...draft.testimonials,
                          items: arr_dup(draft.testimonials.items, i),
                        })
                      }
                      onUp={() =>
                        set("testimonials", {
                          ...draft.testimonials,
                          items: arr_up(draft.testimonials.items, i),
                        })
                      }
                      onDn={() =>
                        set("testimonials", {
                          ...draft.testimonials,
                          items: arr_dn(draft.testimonials.items, i),
                        })
                      }
                    />
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Author</label>
                      <input
                        className={inp}
                        value={item.author}
                        onChange={(e) => {
                          const a = [...draft.testimonials.items];
                          a[i] = { ...a[i], author: e.target.value };
                          set("testimonials", { ...draft.testimonials, items: a });
                        }}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Role</label>
                      <input
                        className={inp}
                        value={item.role ?? ""}
                        onChange={(e) => {
                          const a = [...draft.testimonials.items];
                          a[i] = { ...a[i], role: e.target.value };
                          set("testimonials", { ...draft.testimonials, items: a });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className={lbl}>Image URL</label>
                    <input
                      className={inp}
                      value={item.image}
                      onChange={(e) => {
                        const a = [...draft.testimonials.items];
                        a[i] = { ...a[i], image: e.target.value };
                        set("testimonials", { ...draft.testimonials, items: a });
                      }}
                    />
                    <ImgPrev src={item.image} />
                  </div>
                  <div className="mb-2">
                    <label className={lbl}>Rating (1–5)</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      className={inp}
                      value={item.rating}
                      onChange={(e) => {
                        const a = [...draft.testimonials.items];
                        a[i] = { ...a[i], rating: Number(e.target.value) };
                        set("testimonials", { ...draft.testimonials, items: a });
                      }}
                    />
                  </div>
                  <div>
                    <label className={lbl}>Review Text</label>
                    <textarea
                      rows={3}
                      className={`${inp} resize-none`}
                      value={item.text}
                      onChange={(e) => {
                        const a = [...draft.testimonials.items];
                        a[i] = { ...a[i], text: e.target.value };
                        set("testimonials", { ...draft.testimonials, items: a });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── BLOG ──────────────────────────────────────────────────────── */}
          {activeTab === "Blog" && (
            <div className="space-y-4">
              <div className="space-y-3 rounded border border-gray-200 bg-white p-5">
                <div>
                  <label className={lbl}>Subtitle</label>
                  <input
                    className={inp}
                    value={draft.blog.subtitle}
                    onChange={(e) =>
                      set("blog", { ...draft.blog, subtitle: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={lbl}>Heading</label>
                  <input
                    className={inp}
                    value={draft.blog.heading}
                    onChange={(e) =>
                      set("blog", { ...draft.blog, heading: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                className={addBtn}
                onClick={() =>
                  set("blog", {
                    ...draft.blog,
                    posts: [
                      ...draft.blog.posts,
                      {
                        id: uid(),
                        slug: uid(),
                        title: "New Post",
                        excerpt: "",
                        image: "",
                        category: "News",
                        date: new Date().toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }),
                      },
                    ],
                  })
                }
              >
                + Add Post
              </button>
              {draft.blog.posts.map((post, i) => (
                <div key={post.id} className="rounded border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="mr-2 truncate text-xs font-bold uppercase text-gray-400">
                      {post.title}
                    </span>
                    <Actions
                      i={i}
                      len={draft.blog.posts.length}
                      onDel={() =>
                        set("blog", { ...draft.blog, posts: arr_del(draft.blog.posts, i) })
                      }
                      onDup={() =>
                        set("blog", { ...draft.blog, posts: arr_dup(draft.blog.posts, i) })
                      }
                      onUp={() =>
                        set("blog", { ...draft.blog, posts: arr_up(draft.blog.posts, i) })
                      }
                      onDn={() =>
                        set("blog", { ...draft.blog, posts: arr_dn(draft.blog.posts, i) })
                      }
                    />
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Title</label>
                      <input
                        className={inp}
                        value={post.title}
                        onChange={(e) => {
                          const a = [...draft.blog.posts];
                          a[i] = { ...a[i], title: e.target.value };
                          set("blog", { ...draft.blog, posts: a });
                        }}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Category</label>
                      <input
                        className={inp}
                        value={post.category}
                        onChange={(e) => {
                          const a = [...draft.blog.posts];
                          a[i] = { ...a[i], category: e.target.value };
                          set("blog", { ...draft.blog, posts: a });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Slug</label>
                      <input
                        className={inp}
                        value={post.slug}
                        onChange={(e) => {
                          const a = [...draft.blog.posts];
                          a[i] = { ...a[i], slug: e.target.value };
                          set("blog", { ...draft.blog, posts: a });
                        }}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Date</label>
                      <input
                        className={inp}
                        value={post.date}
                        onChange={(e) => {
                          const a = [...draft.blog.posts];
                          a[i] = { ...a[i], date: e.target.value };
                          set("blog", { ...draft.blog, posts: a });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className={lbl}>Image URL</label>
                    <input
                      className={inp}
                      value={post.image}
                      onChange={(e) => {
                        const a = [...draft.blog.posts];
                        a[i] = { ...a[i], image: e.target.value };
                        set("blog", { ...draft.blog, posts: a });
                      }}
                    />
                    <ImgPrev src={post.image} />
                  </div>
                  <div>
                    <label className={lbl}>Excerpt</label>
                    <textarea
                      rows={2}
                      className={`${inp} resize-none`}
                      value={post.excerpt}
                      onChange={(e) => {
                        const a = [...draft.blog.posts];
                        a[i] = { ...a[i], excerpt: e.target.value };
                        set("blog", { ...draft.blog, posts: a });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── RESERVATION ───────────────────────────────────────────────── */}
          {activeTab === "Reservation" && (
            <div className="space-y-4 rounded border border-gray-200 bg-white p-6">
              <div>
                <label className={lbl}>Section Heading</label>
                <input
                  className={inp}
                  value={draft.reservation.heading}
                  onChange={(e) =>
                    set("reservation", { ...draft.reservation, heading: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={lbl}>Description</label>
                <textarea
                  rows={4}
                  className={`${inp} resize-none`}
                  value={draft.reservation.description}
                  onChange={(e) =>
                    set("reservation", {
                      ...draft.reservation,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* ── CONTACT ───────────────────────────────────────────────────── */}
          {activeTab === "Contact" && (
            <div className="space-y-4 rounded border border-gray-200 bg-white p-6">
              {(
                [
                  ["Address", "address"],
                  ["Phone", "phone"],
                  ["Email", "email"],
                  ["Facebook URL", "facebook"],
                  ["Twitter URL", "twitter"],
                  ["Instagram URL", "instagram"],
                  ["Pinterest URL", "pinterest"],
                ] as const
              ).map(([l, k]) => (
                <div key={k}>
                  <label className={lbl}>{l}</label>
                  <input
                    className={inp}
                    value={draft.contact[k] ?? ""}
                    onChange={(e) =>
                      set("contact", { ...draft.contact, [k]: e.target.value })
                    }
                  />
                </div>
              ))}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className={lbl}>Opening Hours</label>
                  <button
                    className={addBtn}
                    onClick={() =>
                      set("contact", {
                        ...draft.contact,
                        hours: [...draft.contact.hours, { day: "Monday", hours: "Closed" }],
                      })
                    }
                  >
                    + Add Row
                  </button>
                </div>
                {draft.contact.hours.map((h, i) => (
                  <div key={i} className="mb-2 flex items-center gap-2">
                    <input
                      className={inp}
                      value={h.day}
                      placeholder="Day(s)"
                      onChange={(e) => {
                        const hs = [...draft.contact.hours];
                        hs[i] = { ...hs[i], day: e.target.value };
                        set("contact", { ...draft.contact, hours: hs });
                      }}
                    />
                    <input
                      className={inp}
                      value={h.hours}
                      placeholder="Hours"
                      onChange={(e) => {
                        const hs = [...draft.contact.hours];
                        hs[i] = { ...hs[i], hours: e.target.value };
                        set("contact", { ...draft.contact, hours: hs });
                      }}
                    />
                    <button
                      className="flex-shrink-0 px-2 py-2 text-xs text-red-400 hover:text-red-600"
                      onClick={() =>
                        set("contact", {
                          ...draft.contact,
                          hours: arr_del(draft.contact.hours, i),
                        })
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FOOTER ────────────────────────────────────────────────────── */}
          {activeTab === "Footer" && (
            <div className="space-y-4 rounded border border-gray-200 bg-white p-6">
              <div>
                <label className={lbl}>Copyright Text</label>
                <input
                  className={inp}
                  value={draft.footer.copyright}
                  onChange={(e) =>
                    set("footer", { ...draft.footer, copyright: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={lbl}>Newsletter Placeholder</label>
                <input
                  className={inp}
                  value={draft.footer.newsletterPlaceholder}
                  onChange={(e) =>
                    set("footer", {
                      ...draft.footer,
                      newsletterPlaceholder: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* ── HOME SECTIONS ─────────────────────────────────────────────── */}
          {activeTab === "Home Sections" && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">
                Toggle visibility, reorder, or add sections. Save to apply.
              </p>
              <button
                className={addBtn}
                onClick={() =>
                  setHomeSections([
                    ...homeSections,
                    { id: uid(), label: "New Section", enabled: true },
                  ])
                }
              >
                + Add Section
              </button>
              {homeSections.map((section, i) => (
                <div
                  key={section.id}
                  className="rounded border border-gray-200 bg-white p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Toggle */}
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={section.enabled}
                          onChange={(e) => {
                            const s = [...homeSections];
                            s[i] = { ...s[i], enabled: e.target.checked };
                            setHomeSections(s);
                          }}
                          className="peer sr-only"
                        />
                        <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-checked:after:border-white" />
                      </label>
                      <span
                        className={`text-xs font-semibold ${
                          section.enabled ? "text-gray-800" : "text-gray-400 line-through"
                        }`}
                      >
                        {section.label}
                      </span>
                    </div>
                    <Actions
                      i={i}
                      len={homeSections.length}
                      onDel={() => setHomeSections(arr_del(homeSections, i))}
                      onDup={() => setHomeSections(arr_dup(homeSections, i))}
                      onUp={() => setHomeSections(arr_up(homeSections, i))}
                      onDn={() => setHomeSections(arr_dn(homeSections, i))}
                    />
                  </div>
                  <div>
                    <label className={lbl}>Section Label</label>
                    <input
                      className={inp}
                      value={section.label}
                      onChange={(e) => {
                        const s = [...homeSections];
                        s[i] = { ...s[i], label: e.target.value };
                        setHomeSections(s);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── PAGES ─────────────────────────────────────────────────────── */}
          {activeTab === "Pages" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-500">
                Add custom pages. Enabled pages can be linked from Navigation.
              </p>
              <button
                className={addBtn}
                onClick={() =>
                  setCustomPages([
                    ...customPages,
                    {
                      id: uid(),
                      title: "New Page",
                      slug: "new-page",
                      content: "",
                      enabled: true,
                    },
                  ])
                }
              >
                + Add Page
              </button>
              {customPages.length === 0 && (
                <p className="rounded border border-dashed border-gray-200 py-8 text-center text-xs text-gray-400">
                  No custom pages yet. Click &quot;+ Add Page&quot; to create one.
                </p>
              )}
              {customPages.map((page, i) => (
                <div key={page.id} className="rounded border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Toggle */}
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={page.enabled}
                          onChange={(e) => {
                            const p = [...customPages];
                            p[i] = { ...p[i], enabled: e.target.checked };
                            setCustomPages(p);
                          }}
                          className="peer sr-only"
                        />
                        <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-checked:after:border-white" />
                      </label>
                      <span
                        className={`text-xs font-semibold ${
                          page.enabled ? "text-gray-800" : "text-gray-400"
                        }`}
                      >
                        {page.title}
                      </span>
                    </div>
                    <Actions
                      i={i}
                      len={customPages.length}
                      onDel={() => setCustomPages(arr_del(customPages, i))}
                      onDup={() => setCustomPages(arr_dup(customPages, i))}
                      onUp={() => setCustomPages(arr_up(customPages, i))}
                      onDn={() => setCustomPages(arr_dn(customPages, i))}
                    />
                  </div>
                  <div className="mb-3 grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Page Title</label>
                      <input
                        className={inp}
                        value={page.title}
                        onChange={(e) => {
                          const p = [...customPages];
                          p[i] = { ...p[i], title: e.target.value };
                          setCustomPages(p);
                        }}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Slug (URL path)</label>
                      <input
                        className={inp}
                        value={page.slug}
                        placeholder="my-page"
                        onChange={(e) => {
                          const p = [...customPages];
                          p[i] = { ...p[i], slug: e.target.value };
                          setCustomPages(p);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Content</label>
                    <textarea
                      rows={5}
                      className={`${inp} resize-none`}
                      value={page.content}
                      placeholder="Page content (HTML or plain text)"
                      onChange={(e) => {
                        const p = [...customPages];
                        p[i] = { ...p[i], content: e.target.value };
                        setCustomPages(p);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Save */}
          <div className="mt-8">
            <button
              onClick={save}
              className="rounded px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:opacity-80"
              style={{ background: "#c8a97e" }}
            >
              Save & Apply
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

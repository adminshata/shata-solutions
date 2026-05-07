"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ItemsManager } from "@/components/templates/shared/items-manager";
import { SUPERMARKET3_DEFAULTS, SUPERMARKET3_STORAGE_KEY } from "@/lib/supermarket3/defaults";
import { buildProductsSchema } from "@/lib/supermarket3/products-manager-schema";
import type {
  HeaderNavConfig,
  HeroSlide,
  HomeSection,
  OfferDeal,
  SiteConfig,
  StaticPageContent,
  StoreBlogPost,
  StoreCategory,
  StoreVendor,
} from "@/lib/supermarket3/types";
import { themeVars } from "@/lib/supermarket3/utils";
import { checkSupermarket3Images, listAllSupermarket3Images, listProductImages } from "./actions";

const BASE_PATH = "/templates/supermarket-3/preview";

type Tab =
  | "brand"
  | "theme"
  | "nav"
  | "sections"
  | "slides"
  | "categories"
  | "products"
  | "offers"
  | "blog"
  | "vendors"
  | "pages"
  | "contact"
  | "footer";

const TABS: { id: Tab; label: string; helper: string }[] = [
  { id: "brand", label: "Brand", helper: "Store name, logo, tagline, and social links." },
  { id: "theme", label: "Theme", helper: "Colors, font style, and corner radius." },
  { id: "nav", label: "Header / Navigation", helper: "Top bar, menus, dropdowns, and sale text." },
  { id: "sections", label: "Home Sections", helper: "Show, rename, and order homepage sections." },
  { id: "slides", label: "Banners / Slides", helper: "Hero slides with text, links, images, and visibility." },
  { id: "categories", label: "Categories", helper: "Category names, images, hierarchy, and visibility." },
  { id: "products", label: "Products", helper: "Full product manager with add, edit, duplicate, reorder, import, and export." },
  { id: "offers", label: "Offers / Deals", helper: "Discount banners, countdowns, and deal buttons." },
  { id: "blog", label: "Blog", helper: "Posts, images, excerpts, author/date/category, and visibility." },
  { id: "vendors", label: "Vendors", helper: "Vendor stores, logos, ratings, contact details, and visibility." },
  { id: "pages", label: "Pages", helper: "Static page hero and body content." },
  { id: "contact", label: "Contact", helper: "Address, phones, map text, form labels, and business hours." },
  { id: "footer", label: "Footer", helper: "Footer columns, newsletter, copyright, and payment labels." },
];

function normalizeSiteConfig(input: unknown): SiteConfig {
  if (!input || typeof input !== "object") return SUPERMARKET3_DEFAULTS;

  const draft = input as Partial<SiteConfig>;
  const defaults = SUPERMARKET3_DEFAULTS;
  const contact = (draft.contact ?? {}) as Partial<SiteConfig["contact"]>;
  const header = (draft.header ?? {}) as Partial<HeaderNavConfig>;
  const footer = (draft.footer ?? {}) as Partial<SiteConfig["footer"]>;

  return {
    ...defaults,
    ...draft,
    logo: { ...defaults.logo, ...(draft.logo ?? {}) },
    theme: { ...defaults.theme, ...(draft.theme ?? {}) },
    contact: {
      ...defaults.contact,
      ...contact,
      formLabels: {
        name: contact.formLabels?.name ?? defaults.contact.formLabels?.name ?? "",
        email: contact.formLabels?.email ?? defaults.contact.formLabels?.email ?? "",
        phone: contact.formLabels?.phone ?? defaults.contact.formLabels?.phone ?? "",
        message: contact.formLabels?.message ?? defaults.contact.formLabels?.message ?? "",
        button: contact.formLabels?.button ?? defaults.contact.formLabels?.button ?? "",
      },
    },
    social: { ...defaults.social, ...(draft.social ?? {}) },
    announcement: { ...defaults.announcement, ...(draft.announcement ?? {}) },
    header: {
      ...defaults.header,
      ...header,
      menuItems: Array.isArray(header.menuItems) ? header.menuItems : defaults.header.menuItems,
      shopMegaMenu: Array.isArray(header.shopMegaMenu) ? header.shopMegaMenu : defaults.header.shopMegaMenu,
      pagesDropdown: Array.isArray(header.pagesDropdown) ? header.pagesDropdown : defaults.header.pagesDropdown,
    },
    sections: Array.isArray(draft.sections) ? draft.sections : defaults.sections,
    slides: Array.isArray(draft.slides) ? draft.slides : defaults.slides,
    categories: Array.isArray(draft.categories) ? draft.categories : defaults.categories,
    products: Array.isArray(draft.products) ? draft.products.map(normalizeProduct) : defaults.products,
    offers: Array.isArray(draft.offers) ? draft.offers : defaults.offers,
    blog: Array.isArray(draft.blog) ? draft.blog : defaults.blog,
    vendors: Array.isArray(draft.vendors) ? draft.vendors : defaults.vendors,
    pages: Array.isArray(draft.pages) ? draft.pages : defaults.pages,
    footer: {
      ...defaults.footer,
      ...footer,
      columns: Array.isArray(footer.columns) ? footer.columns : defaults.footer.columns,
      paymentIcons: Array.isArray(footer.paymentIcons) ? footer.paymentIcons : defaults.footer.paymentIcons,
    },
  };
}

function normalizeProduct(product: unknown, index: number): SiteConfig["products"][number] {
  const fallback = SUPERMARKET3_DEFAULTS.products[index % SUPERMARKET3_DEFAULTS.products.length];
  if (!product || typeof product !== "object") return fallback;

  const row = product as Record<string, unknown>;
  const image = typeof row.image === "string" ? row.image : "";
  const images = Array.isArray(row.images)
    ? row.images.filter((src): src is string => typeof src === "string")
    : image
      ? [image.startsWith("/") ? image : `/templates/supermarket3/products/${image}`]
      : fallback.images;

  const rawPrice = row.price;
  const price =
    typeof rawPrice === "number"
      ? rawPrice
      : typeof rawPrice === "string"
        ? Math.round(Number(rawPrice) * 100)
        : fallback.price;

  return {
    ...fallback,
    id: String(row.id ?? fallback.id),
    handle: String(row.handle ?? row.slug ?? fallback.handle),
    name: String(row.name ?? row.title ?? fallback.name),
    shortDescription: typeof row.shortDescription === "string" ? row.shortDescription : fallback.shortDescription,
    description: String(row.description ?? row.descripTion ?? fallback.description ?? ""),
    category: typeof row.category === "string" ? row.category : fallback.category,
    images,
    badge: typeof row.badge === "string" ? row.badge : fallback.badge,
    featured: typeof row.featured === "boolean" ? row.featured : fallback.featured,
    active: typeof row.active === "boolean" ? row.active : fallback.active,
    price: Number.isFinite(price) ? price : fallback.price,
    compareAtPrice: typeof row.compareAtPrice === "number" ? row.compareAtPrice : fallback.compareAtPrice,
    unit: typeof row.unit === "string" ? row.unit : fallback.unit,
    stock: typeof row.stock === "number" ? row.stock : fallback.stock,
    rating: typeof row.rating === "number" ? row.rating : fallback.rating,
  };
}

export default function Supermarket3AdminPage() {
  const [config, setConfig] = useState<SiteConfig>(SUPERMARKET3_DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>("brand");
  const [imagePool, setImagePool] = useState<string[]>([]);
  const [productImagePool, setProductImagePool] = useState<string[]>([]);
  const [imageReport, setImageReport] = useState<{ checked: number; missing: string[] }>({ checked: 0, missing: [] });
  const [savedMsg, setSavedMsg] = useState("Draft ready");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SUPERMARKET3_STORAGE_KEY);
      if (raw) setConfig(normalizeSiteConfig(JSON.parse(raw)));
    } catch {
      window.localStorage.removeItem(SUPERMARKET3_STORAGE_KEY);
    }
    listAllSupermarket3Images().then(setImagePool).catch(() => {});
    listProductImages().then(setProductImagePool).catch(() => {});
  }, []);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(SUPERMARKET3_STORAGE_KEY, JSON.stringify(config));
        setSavedMsg("Draft saved just now");
      } catch {
        setSavedMsg("Could not save draft");
      }
    }, 500);
  }, [config]);

  useEffect(() => {
    const paths = [
      ...config.products.flatMap((product) => product.images),
      ...config.categories.flatMap((category) => [category.image, category.icon].filter(Boolean) as string[]),
      ...config.slides.map((slide) => slide.image),
      ...config.offers.map((offer) => offer.image),
      ...config.blog.map((post) => post.image),
      ...config.vendors.flatMap((vendor) => [vendor.logo, vendor.image].filter(Boolean) as string[]),
    ];
    const id = setTimeout(() => {
      checkSupermarket3Images(paths).then(setImageReport).catch(() => {
        setImageReport({ checked: paths.length, missing: [] });
      });
    }, 350);
    return () => clearTimeout(id);
  }, [config]);

  const productsSchema = useMemo(
    () => buildProductsSchema({ config, imagePool: productImagePool }),
    [config, productImagePool]
  );

  function patch(delta: Partial<SiteConfig>) {
    setConfig((prev) => ({ ...prev, ...delta }));
  }

  function reset() {
    setConfig(SUPERMARKET3_DEFAULTS);
    window.localStorage.removeItem(SUPERMARKET3_STORAGE_KEY);
    setSavedMsg("Reset to defaults");
  }

  const active = TABS.find((tab) => tab.id === activeTab) ?? TABS[0];

  return (
    <div
      className="sm3-admin min-h-screen bg-[#10141c] text-white"
      style={themeVars(config.theme) as CSSProperties}
    >
      <style>{`
        .sm3-admin {
          font-size: 18px;
          line-height: 1.6;
        }
        .sm3-admin .admin-sidebar-button {
          padding: 18px 20px !important;
        }
        .sm3-admin .admin-sidebar-button-title {
          display: block;
          font-size: 18px !important;
          line-height: 1.25 !important;
          font-weight: 900 !important;
        }
        .sm3-admin .admin-sidebar-button-helper {
          display: block;
          margin-top: 7px;
          font-size: 14px !important;
          line-height: 1.45 !important;
          opacity: .86;
        }
        .sm3-admin .admin-panel {
          padding: 28px !important;
        }
        .sm3-admin .admin-field-label {
          display: block;
          margin-bottom: 10px;
          font-size: 16px !important;
          line-height: 1.3 !important;
          font-weight: 900 !important;
          color: #111827 !important;
        }
        .sm3-admin .admin-input {
          min-height: 58px;
          font-size: 18px !important;
          line-height: 1.5 !important;
          color: #111827 !important;
        }
        .sm3-admin textarea.admin-input {
          min-height: 150px;
        }
        .sm3-admin .admin-toggle-label {
          font-size: 18px !important;
          line-height: 1.35 !important;
        }
        .sm3-admin .admin-small-button {
          font-size: 14px !important;
          line-height: 1.2 !important;
        }
        .sm3-admin [class*="text-[10px]"],
        .sm3-admin [class*="text-xs"] {
          font-size: 14px !important;
          line-height: 1.45 !important;
        }
        .sm3-admin [class*="text-sm"] {
          font-size: 16px !important;
          line-height: 1.5 !important;
        }
      `}</style>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080c13]/95 backdrop-blur">
        <div className="flex flex-wrap items-center gap-4 px-6 py-4">
          <Link
            href={BASE_PATH}
            target="_blank"
            className="rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white hover:border-white"
          >
            Open preview
          </Link>
          <div className="min-w-0">
            <div className="text-sm font-bold uppercase tracking-[0.25em] text-[#93c5fd]">Template editor</div>
            <h1 className="text-2xl font-black leading-tight">{config.name} customization</h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="rounded-full border border-[#1D6CE3]/50 px-4 py-2 text-sm font-semibold text-[#bfdbfe]">
              {savedMsg}
            </span>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-white/30 px-5 py-2 text-base font-bold hover:bg-white hover:text-[#10141c]"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      <main className="grid min-h-[calc(100vh-82px)] lg:grid-cols-[330px_1fr]">
        <aside className="border-r border-white/10 bg-[#0b1018] p-5">
          <div className="mb-5 rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-base font-bold text-[#93c5fd]">Simple editor</p>
            <h2 className="mt-2 text-3xl font-black leading-tight">Pick what you want to change.</h2>
            <p className="mt-3 text-base leading-7 text-white/70">
              Changes save automatically. The public ecommerce dashboard stays separate at{" "}
              <Link href={`${BASE_PATH}/dashboard`} target="_blank" className="font-bold text-[#93c5fd]">
                /preview/dashboard
              </Link>.
            </p>
          </div>
          <nav className="space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  activeTab === tab.id
                    ? "border-[#1D6CE3] bg-[#1D6CE3] text-white"
                    : "border-white/10 bg-white/[0.03] text-white/78 hover:border-white/35"
                } admin-sidebar-button`}
              >
                <span className="admin-sidebar-button-title">{tab.label}</span>
                <span className="admin-sidebar-button-helper">{tab.helper}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="overflow-y-auto bg-[#f5f7fb] p-6 text-[#18212f]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-base font-bold uppercase tracking-[0.18em] text-[#1D6CE3]">{active.label}</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight">Edit {active.label.toLowerCase()}</h2>
              <p className="mt-2 text-lg leading-8 text-slate-600">{active.helper}</p>
              {imageReport.missing.length > 0 && (
                <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-base text-amber-900">
                  {imageReport.missing.length} missing image path{imageReport.missing.length === 1 ? "" : "s"} detected.
                </div>
              )}
            </div>

            {activeTab === "brand" && <BrandTab config={config} patch={patch} />}
            {activeTab === "theme" && <ThemeTab config={config} patch={patch} />}
            {activeTab === "nav" && <NavTab config={config} patch={patch} />}
            {activeTab === "sections" && <SectionsTab config={config} patch={patch} />}
            {activeTab === "slides" && <SlidesTab config={config} patch={patch} imagePool={imagePool} />}
            {activeTab === "categories" && <CategoriesTab config={config} patch={patch} imagePool={imagePool} />}
            {activeTab === "products" && (
              <Panel>
                <ItemsManager
                  schema={productsSchema}
                  items={config.products}
                  onChange={(products) => patch({ products })}
                />
              </Panel>
            )}
            {activeTab === "offers" && <OffersTab config={config} patch={patch} imagePool={imagePool} />}
            {activeTab === "blog" && <BlogTab config={config} patch={patch} imagePool={imagePool} />}
            {activeTab === "vendors" && <VendorsTab config={config} patch={patch} imagePool={imagePool} />}
            {activeTab === "pages" && <PagesTab config={config} patch={patch} imagePool={imagePool} />}
            {activeTab === "contact" && <ContactTab config={config} patch={patch} />}
            {activeTab === "footer" && <FooterTab config={config} patch={patch} />}
          </div>
        </section>
      </main>
    </div>
  );
}

function BrandTab({ config, patch }: EditorProps) {
  return (
    <Panel>
      <Grid>
        <TextField label="Business name" value={config.name} onChange={(name) => patch({ name })} />
        <TextField label="Logo text" value={config.logo.text} onChange={(text) => patch({ logo: { ...config.logo, text } })} />
        <TextField label="Logo image path" value={config.logo.image ?? ""} onChange={(image) => patch({ logo: { ...config.logo, image: image || undefined } })} />
        <TextField label="Tagline" value={config.tagline} onChange={(tagline) => patch({ tagline })} />
        <TextField label="Phone" value={config.contact.phone} onChange={(phone) => patch({ contact: { ...config.contact, phone } })} />
        <TextField label="Email" value={config.contact.email} onChange={(email) => patch({ contact: { ...config.contact, email } })} />
        <TextField label="Address" value={config.contact.address} onChange={(address) => patch({ contact: { ...config.contact, address } })} wide />
        <TextField label="Delivery / opening hours" value={config.contact.deliveryHours ?? ""} onChange={(deliveryHours) => patch({ contact: { ...config.contact, deliveryHours } })} wide />
        <TextField label="Facebook" value={config.social.facebook ?? ""} onChange={(facebook) => patch({ social: { ...config.social, facebook } })} />
        <TextField label="Instagram" value={config.social.instagram ?? ""} onChange={(instagram) => patch({ social: { ...config.social, instagram } })} />
        <TextField label="Twitter" value={config.social.twitter ?? ""} onChange={(twitter) => patch({ social: { ...config.social, twitter } })} />
        <TextField label="YouTube" value={config.social.youtube ?? ""} onChange={(youtube) => patch({ social: { ...config.social, youtube } })} />
      </Grid>
    </Panel>
  );
}

function ThemeTab({ config, patch }: EditorProps) {
  const theme = config.theme;
  const colorKeys: { key: keyof typeof theme; label: string }[] = [
    { key: "primary", label: "Primary color" },
    { key: "secondary", label: "Secondary color" },
    { key: "accent", label: "Accent color" },
    { key: "background", label: "Background color" },
    { key: "foreground", label: "Text color" },
    { key: "surface", label: "Surface color" },
  ];
  return (
    <Panel>
      <Grid>
        {colorKeys.map(({ key, label }) => (
          <label key={key} className="block">
            <span className={labelCls}>{label}</span>
            <div className="flex gap-3">
              <input
                type="color"
                value={theme[key] as string}
                onChange={(event) => patch({ theme: { ...theme, [key]: event.target.value } })}
                className="h-12 w-14 rounded-lg border border-slate-300 bg-white p-1"
              />
              <input
                value={theme[key] as string}
                onChange={(event) => patch({ theme: { ...theme, [key]: event.target.value } })}
                className={inputCls}
              />
            </div>
          </label>
        ))}
        <SelectField label="Button / card radius" value={theme.radius} onChange={(radius) => patch({ theme: { ...theme, radius: radius as SiteConfig["theme"]["radius"] } })} options={["sm", "md", "lg"]} />
        <SelectField label="Font style" value={theme.fontStyle} onChange={(fontStyle) => patch({ theme: { ...theme, fontStyle: fontStyle as SiteConfig["theme"]["fontStyle"] } })} options={["clean", "classic", "rounded"]} />
      </Grid>
    </Panel>
  );
}

function NavTab({ config, patch }: EditorProps) {
  const header = config.header;
  const patchHeader = (delta: Partial<HeaderNavConfig>) => patch({ header: { ...header, ...delta } });
  return (
    <div className="space-y-5">
      <Panel>
        <Grid>
          <TextField label="Top bar text" value={header.topBarText} onChange={(topBarText) => patchHeader({ topBarText })} wide />
          <TextField label="Countdown text" value={header.countdownText} onChange={(countdownText) => patchHeader({ countdownText })} />
          <TextField label="Countdown date/time" value={header.countdownDate} onChange={(countdownDate) => patchHeader({ countdownDate })} />
          <TextField label="Sale block text" value={header.saleBlockText} onChange={(saleBlockText) => patchHeader({ saleBlockText })} />
          <TextField label="Trending products text" value={header.trendingText} onChange={(trendingText) => patchHeader({ trendingText })} />
        </Grid>
      </Panel>
      <EditableList
        title="Main menu items"
        items={header.menuItems}
        addLabel="Add menu item"
        create={() => ({ id: `nav-${Date.now()}`, label: "New item", href: BASE_PATH, visible: true })}
        onChange={(menuItems) => patchHeader({ menuItems })}
        render={(item, update) => (
          <Grid>
            <TextField label="Label" value={item.label} onChange={(label) => update({ label })} />
            <TextField label="Link" value={item.href} onChange={(href) => update({ href })} />
            <ToggleField label="Show item" checked={item.visible} onChange={(visible) => update({ visible })} />
          </Grid>
        )}
      />
      <Panel title="Shop mega menu groups">
        <div className="space-y-4">
          {header.shopMegaMenu.map((group, groupIndex) => (
            <div key={group.group} className="rounded-xl border border-slate-200 p-4">
              <TextField
                label="Group title"
                value={group.group}
                onChange={(value) => patchHeader({
                  shopMegaMenu: header.shopMegaMenu.map((entry, index) =>
                    index === groupIndex ? { ...entry, group: value } : entry
                  ),
                })}
              />
              <div className="mt-4 space-y-3">
                {group.items.map((item, itemIndex) => (
                  <Grid key={`${group.group}-${itemIndex}`}>
                    <TextField label="Item label" value={item.label} onChange={(label) => patchHeader({
                      shopMegaMenu: header.shopMegaMenu.map((entry, index) =>
                        index === groupIndex
                          ? { ...entry, items: entry.items.map((link, linkIndex) => linkIndex === itemIndex ? { ...link, label } : link) }
                          : entry
                      ),
                    })} />
                    <TextField label="Item link" value={item.href} onChange={(href) => patchHeader({
                      shopMegaMenu: header.shopMegaMenu.map((entry, index) =>
                        index === groupIndex
                          ? { ...entry, items: entry.items.map((link, linkIndex) => linkIndex === itemIndex ? { ...link, href } : link) }
                          : entry
                      ),
                    })} />
                  </Grid>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <EditableList
        title="Pages dropdown items"
        items={header.pagesDropdown}
        addLabel="Add page link"
        create={() => ({ label: "New page", href: BASE_PATH })}
        onChange={(pagesDropdown) => patchHeader({ pagesDropdown })}
        render={(item, update) => (
          <Grid>
            <TextField label="Label" value={item.label} onChange={(label) => update({ label })} />
            <TextField label="Link" value={item.href} onChange={(href) => update({ href })} />
          </Grid>
        )}
      />
    </div>
  );
}

function SectionsTab({ config, patch }: EditorProps) {
  return (
    <EditableList
      title="Homepage sections"
      items={config.sections}
      addLabel="Add section"
      create={() => ({ id: `section-${Date.now()}`, label: "New section", title: "New section", subtitle: "", active: true, order: config.sections.length + 1 })}
      onChange={(sections) => patch({ sections })}
      render={(section, update) => (
        <Grid>
          <TextField label="Label" value={section.label} onChange={(label) => update({ label })} />
          <TextField label="Title" value={section.title} onChange={(title) => update({ title })} />
          <TextField label="Subtitle" value={section.subtitle ?? ""} onChange={(subtitle) => update({ subtitle })} wide />
          <TextField label="Order" type="number" value={String(section.order)} onChange={(order) => update({ order: Number(order) })} />
          <ToggleField label="Show section" checked={section.active} onChange={(active) => update({ active })} />
        </Grid>
      )}
    />
  );
}

function SlidesTab({ config, patch, imagePool }: EditorProps & { imagePool: string[] }) {
  return (
    <EditableList
      title="Hero slides"
      items={config.slides}
      addLabel="Add slide"
      create={() => ({ id: `slide-${Date.now()}`, eyebrow: "New", title: "New slide", subtitle: "", ctaText: "Shop now", ctaLink: `${BASE_PATH}/shop`, image: imagePool[0] ?? "", active: true })}
      onChange={(slides) => patch({ slides })}
      render={(slide, update) => (
        <Grid>
          <TextField label="Eyebrow" value={slide.eyebrow ?? ""} onChange={(eyebrow) => update({ eyebrow })} />
          <TextField label="Title" value={slide.title} onChange={(title) => update({ title })} />
          <TextAreaField label="Subtitle" value={slide.subtitle} onChange={(subtitle) => update({ subtitle })} wide />
          <TextField label="CTA text" value={slide.ctaText} onChange={(ctaText) => update({ ctaText })} />
          <TextField label="CTA link" value={slide.ctaLink} onChange={(ctaLink) => update({ ctaLink })} />
          <TextField label="Image path" value={slide.image} onChange={(image) => update({ image })} wide />
          <ToggleField label="Active slide" checked={slide.active} onChange={(active) => update({ active })} />
        </Grid>
      )}
    />
  );
}

function CategoriesTab({ config, patch, imagePool }: EditorProps & { imagePool: string[] }) {
  return (
    <EditableList
      title="Categories"
      items={config.categories}
      addLabel="Add category"
      create={() => ({ id: `cat-${Date.now()}`, handle: "new-category", name: "New category", image: imagePool[0] ?? "", icon: "", parent: "", active: true })}
      onChange={(categories) => patch({ categories })}
      render={(category, update) => (
        <Grid>
          <TextField label="Name" value={category.name} onChange={(name) => update({ name })} />
          <TextField label="Handle" value={category.handle} onChange={(handle) => update({ handle })} />
          <TextField label="Image path" value={category.image ?? ""} onChange={(image) => update({ image })} />
          <TextField label="Icon path" value={category.icon ?? ""} onChange={(icon) => update({ icon })} />
          <TextField label="Parent category" value={category.parent ?? ""} onChange={(parent) => update({ parent })} />
          <ToggleField label="Active category" checked={category.active !== false} onChange={(active) => update({ active })} />
        </Grid>
      )}
    />
  );
}

function OffersTab({ config, patch, imagePool }: EditorProps & { imagePool: string[] }) {
  return (
    <EditableList
      title="Offers and deals"
      items={config.offers}
      addLabel="Add offer"
      create={() => ({ id: `deal-${Date.now()}`, title: "New deal", discountText: "Save 20%", countdownDate: "2026-12-31T23:59:59", image: imagePool[0] ?? "", ctaText: "Shop deal", ctaLink: `${BASE_PATH}/shop`, active: true })}
      onChange={(offers) => patch({ offers })}
      render={(offer, update) => (
        <Grid>
          <TextField label="Deal title" value={offer.title} onChange={(title) => update({ title })} />
          <TextField label="Discount text" value={offer.discountText} onChange={(discountText) => update({ discountText })} />
          <TextField label="Countdown date/time" value={offer.countdownDate} onChange={(countdownDate) => update({ countdownDate })} />
          <TextField label="Deal image" value={offer.image} onChange={(image) => update({ image })} />
          <TextField label="CTA text" value={offer.ctaText} onChange={(ctaText) => update({ ctaText })} />
          <TextField label="CTA link" value={offer.ctaLink} onChange={(ctaLink) => update({ ctaLink })} />
          <ToggleField label="Active deal" checked={offer.active} onChange={(active) => update({ active })} />
        </Grid>
      )}
    />
  );
}

function BlogTab({ config, patch, imagePool }: EditorProps & { imagePool: string[] }) {
  return (
    <EditableList
      title="Blog posts"
      items={config.blog}
      addLabel="Add post"
      create={() => ({ id: `post-${Date.now()}`, title: "New post", slug: "new-post", image: imagePool[0] ?? "", excerpt: "", content: "", author: "BlueMart Team", date: "May 6, 2026", category: "Grocery", active: true })}
      onChange={(blog) => patch({ blog })}
      render={(post, update) => (
        <Grid>
          <TextField label="Title" value={post.title} onChange={(title) => update({ title })} />
          <TextField label="Slug" value={post.slug} onChange={(slug) => update({ slug })} />
          <TextField label="Image" value={post.image} onChange={(image) => update({ image })} wide />
          <TextAreaField label="Excerpt" value={post.excerpt} onChange={(excerpt) => update({ excerpt })} wide />
          <TextAreaField label="Content" value={post.content} onChange={(content) => update({ content })} wide />
          <TextField label="Author" value={post.author} onChange={(author) => update({ author })} />
          <TextField label="Date" value={post.date} onChange={(date) => update({ date })} />
          <TextField label="Category" value={post.category} onChange={(category) => update({ category })} />
          <ToggleField label="Active post" checked={post.active} onChange={(active) => update({ active })} />
        </Grid>
      )}
    />
  );
}

function VendorsTab({ config, patch, imagePool }: EditorProps & { imagePool: string[] }) {
  return (
    <EditableList
      title="Vendors"
      items={config.vendors}
      addLabel="Add vendor"
      create={() => ({ id: `vendor-${Date.now()}`, name: "New vendor", handle: "new-vendor", logo: "", image: imagePool[0] ?? "", description: "", rating: 4.8, address: "", contact: "", active: true })}
      onChange={(vendors) => patch({ vendors })}
      render={(vendor, update) => (
        <Grid>
          <TextField label="Name" value={vendor.name} onChange={(name) => update({ name })} />
          <TextField label="Handle" value={vendor.handle} onChange={(handle) => update({ handle })} />
          <TextField label="Logo path" value={vendor.logo ?? ""} onChange={(logo) => update({ logo })} />
          <TextField label="Image path" value={vendor.image} onChange={(image) => update({ image })} />
          <TextAreaField label="Description" value={vendor.description} onChange={(description) => update({ description })} wide />
          <TextField label="Rating" type="number" value={String(vendor.rating)} onChange={(rating) => update({ rating: Number(rating) })} />
          <TextField label="Address" value={vendor.address} onChange={(address) => update({ address })} />
          <TextField label="Contact" value={vendor.contact} onChange={(contact) => update({ contact })} />
          <ToggleField label="Active vendor" checked={vendor.active} onChange={(active) => update({ active })} />
        </Grid>
      )}
    />
  );
}

function PagesTab({ config, patch, imagePool }: EditorProps & { imagePool: string[] }) {
  return (
    <EditableList
      title="Static pages"
      items={config.pages}
      addLabel="Add page"
      create={() => ({ id: `page-${Date.now()}`, title: "New page", subtitle: "", heroImage: imagePool[0] ?? "", content: "", active: true })}
      onChange={(pages) => patch({ pages })}
      render={(page, update) => (
        <Grid>
          <TextField label="Page key" value={page.id} onChange={(id) => update({ id })} />
          <TextField label="Hero title" value={page.title} onChange={(title) => update({ title })} />
          <TextField label="Hero subtitle" value={page.subtitle ?? ""} onChange={(subtitle) => update({ subtitle })} wide />
          <TextField label="Hero image" value={page.heroImage ?? ""} onChange={(heroImage) => update({ heroImage })} wide />
          <TextAreaField label="Page content" value={page.content} onChange={(content) => update({ content })} wide />
          <ToggleField label="Active page" checked={page.active} onChange={(active) => update({ active })} />
        </Grid>
      )}
    />
  );
}

function ContactTab({ config, patch }: EditorProps) {
  const contact = config.contact;
  const labels = contact.formLabels ?? { name: "", email: "", phone: "", message: "", button: "" };
  return (
    <Panel>
      <Grid>
        <TextField label="Phone" value={contact.phone} onChange={(phone) => patch({ contact: { ...contact, phone } })} />
        <TextField label="Second phone" value={contact.phone2 ?? ""} onChange={(phone2) => patch({ contact: { ...contact, phone2 } })} />
        <TextField label="Email" value={contact.email} onChange={(email) => patch({ contact: { ...contact, email } })} />
        <TextField label="Address" value={contact.address} onChange={(address) => patch({ contact: { ...contact, address } })} wide />
        <TextField label="Map / embed text" value={contact.mapText ?? ""} onChange={(mapText) => patch({ contact: { ...contact, mapText } })} wide />
        <TextField label="Business hours" value={contact.hours ?? ""} onChange={(hours) => patch({ contact: { ...contact, hours } })} />
        <TextField label="Delivery hours" value={contact.deliveryHours ?? ""} onChange={(deliveryHours) => patch({ contact: { ...contact, deliveryHours } })} />
        <TextField label="Form name label" value={labels.name} onChange={(name) => patch({ contact: { ...contact, formLabels: { ...labels, name } } })} />
        <TextField label="Form email label" value={labels.email} onChange={(email) => patch({ contact: { ...contact, formLabels: { ...labels, email } } })} />
        <TextField label="Form phone label" value={labels.phone} onChange={(phone) => patch({ contact: { ...contact, formLabels: { ...labels, phone } } })} />
        <TextField label="Form message label" value={labels.message} onChange={(message) => patch({ contact: { ...contact, formLabels: { ...labels, message } } })} />
        <TextField label="Form button text" value={labels.button} onChange={(button) => patch({ contact: { ...contact, formLabels: { ...labels, button } } })} />
      </Grid>
    </Panel>
  );
}

function FooterTab({ config, patch }: EditorProps) {
  const footer = config.footer;
  return (
    <div className="space-y-5">
      <Panel>
        <Grid>
          <TextField label="Newsletter title" value={footer.newsletterTitle} onChange={(newsletterTitle) => patch({ footer: { ...footer, newsletterTitle } })} />
          <TextAreaField label="Newsletter text" value={footer.newsletterText} onChange={(newsletterText) => patch({ footer: { ...footer, newsletterText } })} wide />
          <TextField label="Copyright text" value={footer.copyright} onChange={(copyright) => patch({ footer: { ...footer, copyright } })} wide />
          <TextField label="Payment icons" value={footer.paymentIcons.join(", ")} onChange={(value) => patch({ footer: { ...footer, paymentIcons: value.split(",").map((item) => item.trim()).filter(Boolean) } })} wide />
        </Grid>
      </Panel>
      <EditableList
        title="Footer columns"
        items={footer.columns}
        addLabel="Add column"
        create={() => ({ title: "New column", links: [] })}
        onChange={(columns) => patch({ footer: { ...footer, columns } })}
        render={(column, update) => (
          <Grid>
            <TextField label="Column title" value={column.title} onChange={(title) => update({ title })} />
            <TextAreaField
              label="Links (one per line: Label | /link)"
              value={column.links.map((link) => `${link.label} | ${link.href}`).join("\n")}
              onChange={(value) => update({
                links: value.split("\n").map((line) => {
                  const [label, href = "#"] = line.split("|").map((part) => part.trim());
                  return { label: label || "Link", href };
                }).filter((link) => link.label),
              })}
              wide
            />
          </Grid>
        )}
      />
    </div>
  );
}

type EditorProps = {
  config: SiteConfig;
  patch: (delta: Partial<SiteConfig>) => void;
};

type EditableItem =
  | HomeSection
  | HeroSlide
  | StoreCategory
  | OfferDeal
  | StoreBlogPost
  | StoreVendor
  | StaticPageContent
  | SiteConfig["header"]["menuItems"][number]
  | SiteConfig["header"]["pagesDropdown"][number]
  | SiteConfig["footer"]["columns"][number];

function EditableList<T extends EditableItem>({
  title,
  items,
  addLabel,
  create,
  onChange,
  render,
}: {
  title: string;
  items: T[];
  addLabel: string;
  create: () => T;
  onChange: (items: T[]) => void;
  render: (item: T, update: (delta: Partial<T>) => void) => React.ReactNode;
}) {
  return (
    <Panel title={title}>
      <div className="space-y-5">
        {items.map((item, index) => (
          <div key={getItemKey(item, index)} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-lg font-black text-slate-900">{getItemTitle(item, index)}</div>
              <div className="ml-auto flex gap-2">
                <button type="button" onClick={() => onChange(move(items, index, -1))} className={smallBtnCls}>Up</button>
                <button type="button" onClick={() => onChange(move(items, index, 1))} className={smallBtnCls}>Down</button>
                <button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} className={dangerBtnCls}>Delete</button>
              </div>
            </div>
            {render(item, (delta) => onChange(items.map((entry, i) => i === index ? { ...entry, ...delta } : entry)))}
          </div>
        ))}
        <button type="button" onClick={() => onChange([...items, create()])} className="rounded-xl bg-[#1D6CE3] px-5 py-3 text-base font-black text-white">
          {addLabel}
        </button>
      </div>
    </Panel>
  );
}

function Panel({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="admin-panel rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {title && <h3 className="mb-5 text-2xl font-black text-slate-900">{title}</h3>}
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

function TextField({ label, value, onChange, type = "text", wide = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; wide?: boolean }) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <span className={labelCls}>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className={inputCls} />
    </label>
  );
}

function TextAreaField({ label, value, onChange, wide = false }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <span className={labelCls}>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className={`${inputCls} min-h-32`} />
    </label>
  );
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-[#1D6CE3]" />
      <span className="admin-toggle-label text-lg font-bold text-slate-800">{label}</span>
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label>
      <span className={labelCls}>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={inputCls}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function move<T>(items: T[], index: number, direction: -1 | 1) {
  const next = [...items];
  const target = index + direction;
  if (target < 0 || target >= next.length) return next;
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

function getItemKey(item: EditableItem, index: number) {
  return "id" in item ? item.id : "label" in item ? `${item.label}-${index}` : `${index}`;
}

function getItemTitle(item: EditableItem, index: number) {
  if ("name" in item) return item.name;
  if ("title" in item) return item.title;
  if ("label" in item) return item.label;
  return `Item ${index + 1}`;
}

const labelCls = "admin-field-label mb-2 block text-base font-extrabold text-slate-800";
const inputCls = "admin-input w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg text-slate-950 outline-none focus:border-[#1D6CE3] focus:ring-4 focus:ring-[#1D6CE3]/10";
const smallBtnCls = "admin-small-button rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:border-[#1D6CE3]";
const dangerBtnCls = "admin-small-button rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100";

"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ItemsManager, makeId, slugify } from "@/components/templates/shared/items-manager";
import { SUPERMARKET1_DEFAULTS, SUPERMARKET1_STORAGE_KEY } from "@/lib/supermarket1/defaults";
import type { Category, Product, SiteConfig, StoreTheme } from "@/lib/supermarket1/types";
import { buildProductsSchema } from "@/lib/supermarket1/products-manager-schema";
import { checkSupermarket1Images, listAllSupermarket1Images, listProductImages } from "./actions";

const PREVIEW_HREF = "/templates/supermarket-1/preview";

type Tab =
  | "brand"
  | "theme"
  | "header"
  | "home"
  | "banners"
  | "categories"
  | "products"
  | "offers"
  | "blog"
  | "vendors"
  | "pages"
  | "contact"
  | "footer";

type LinkItem = { id: string; label: string; href: string; active: boolean };
type MegaGroup = { id: string; title: string; items: LinkItem[] };
type HeroSlide = { id: string; title: string; subtitle: string; ctaText: string; ctaLink: string; image: string; active: boolean };
type OfferDeal = { id: string; title: string; discountText: string; countdown: string; image: string; ctaText: string; ctaLink: string; active: boolean };
type BlogPost = { id: string; title: string; slug: string; image: string; excerpt: string; content: string; author: string; date: string; category: string; active: boolean };
type Vendor = { id: string; name: string; handle: string; image: string; description: string; rating: number; address: string; contact: string; active: boolean };
type PageContent = { id: string; label: string; heroTitle: string; heroSubtitle: string; heroImage: string; content: string; active: boolean };
type FooterColumn = { id: string; title: string; links: LinkItem[] };

type HeaderSettings = {
  topBarText: string;
  countdownText: string;
  countdownTarget: string;
  menuItems: LinkItem[];
  shopMegaMenu: MegaGroup[];
  pagesDropdown: LinkItem[];
  saleBlockText: string;
  saleBlockBadge: string;
  trendingProductsText: string;
  visibleItems: Record<string, boolean>;
};

type ContactEditor = {
  mapEmbed: string;
  formNameLabel: string;
  formEmailLabel: string;
  formMessageLabel: string;
  formSubmitLabel: string;
  businessHours: string;
};

type FooterSettings = {
  newsletterTitle: string;
  newsletterText: string;
  copyrightText: string;
  paymentIcons: string;
  columns: FooterColumn[];
};

type EditorConfig = SiteConfig & {
  header: HeaderSettings;
  heroSlides: HeroSlide[];
  offers: OfferDeal[];
  blogPosts: BlogPost[];
  vendors: Vendor[];
  pages: PageContent[];
  contactEditor: ContactEditor;
  footer: FooterSettings;
};

const TABS: { id: Tab; label: string; description: string }[] = [
  { id: "brand", label: "Brand", description: "Store name, logo, tagline, phone, email, address, hours, and social links." },
  { id: "theme", label: "Theme", description: "Colors, text color, corner radius, and font style." },
  { id: "header", label: "Header / Navigation", description: "Top bar, countdown, menus, dropdowns, sale button, and visibility switches." },
  { id: "home", label: "Home Sections", description: "Show, hide, rename, and reorder homepage sections." },
  { id: "banners", label: "Banners / Slides", description: "Hero slides: title, subtitle, button, link, image, and active state." },
  { id: "categories", label: "Categories", description: "Category names, handles, icons, images, parent categories, and active state." },
  { id: "products", label: "Products", description: "Full product catalog using the shared products manager." },
  { id: "offers", label: "Offers / Deals", description: "Deal banners, discount text, countdown, images, and buttons." },
  { id: "blog", label: "Blog", description: "Blog posts, slugs, images, excerpts, content, author, date, and category." },
  { id: "vendors", label: "Vendors", description: "Vendor profiles, handles, images, descriptions, ratings, address, and contact." },
  { id: "pages", label: "Pages", description: "About, Contact, Privacy, Cookies, Terms, Store, Invoice, and Track Order content." },
  { id: "contact", label: "Contact", description: "Contact details, business hours, map text, and contact form labels." },
  { id: "footer", label: "Footer", description: "Footer columns, links, newsletter text, copyright, and payment icons." },
];

const TAB_GROUPS: { title: string; ids: Tab[] }[] = [
  { title: "Start here", ids: ["brand", "theme", "header"] },
  { title: "Homepage", ids: ["home", "banners", "categories", "offers"] },
  { title: "Catalog", ids: ["products", "vendors"] },
  { title: "Content", ids: ["blog", "pages", "contact", "footer"] },
];

const DEFAULT_EDITOR_CONFIG: EditorConfig = {
  ...SUPERMARKET1_DEFAULTS,
  header: {
    topBarText: "FREE delivery & 40% Discount for next 3 orders! Place your 1st order in.",
    countdownText: "Place your 1st order in.",
    countdownTarget: "02/02/2026 10:20:00",
    menuItems: [
      link("Home", PREVIEW_HREF),
      link("About", `${PREVIEW_HREF}/about`),
      link("Shop", `${PREVIEW_HREF}/shop`),
      link("Vendors", `${PREVIEW_HREF}/vendors`),
      link("Pages", "#"),
      link("Blog", `${PREVIEW_HREF}/blog`),
      link("Dashboard", `${PREVIEW_HREF}/dashboard`),
      link("Contact", `${PREVIEW_HREF}/contact`),
    ],
    shopMegaMenu: [
      group("Shop Layout", ["Shop Grid Sidebar|/templates/supermarket-1/preview/shop", "Shop list Sidebar|/templates/supermarket-1/preview/shop/list-sidebar", "Shop Top Filter Grid|/templates/supermarket-1/preview/shop/grid-top-filter", "Shop Top Filter List|/templates/supermarket-1/preview/shop/list-top-filter"]),
      group("Shop Details", ["Shop Details|/templates/supermarket-1/preview/shop/firebase-business-makes-your-profit", "Shop Details V2|/templates/supermarket-1/preview/shop/firebase-business-makes-your-profit", "Shop Details V3|/templates/supermarket-1/preview/shop/firebase-business-makes-your-profit", "Shop Details V4|/templates/supermarket-1/preview/shop/firebase-business-makes-your-profit"]),
      group("Product Feature", ["Variable product|/templates/supermarket-1/preview/shop/firebase-business-makes-your-profit", "Affiliate product|/templates/supermarket-1/preview/shop/firebase-business-makes-your-profit", "Shop Compare|/templates/supermarket-1/preview/compare"]),
      group("Shop Others", ["Cart|/templates/supermarket-1/preview/cart", "Checkout|/templates/supermarket-1/preview/checkout", "Track Order|/templates/supermarket-1/preview/trackorder"]),
    ],
    pagesDropdown: [
      link("Dashboard", `${PREVIEW_HREF}/dashboard`),
      link("About", `${PREVIEW_HREF}/about`),
      link("Store", `${PREVIEW_HREF}/store`),
      link("Invoice", `${PREVIEW_HREF}/invoice`),
      link("Contact", `${PREVIEW_HREF}/contact`),
      link("Register", `${PREVIEW_HREF}/register`),
      link("Login", `${PREVIEW_HREF}/login`),
      link("Privacy Policy", `${PREVIEW_HREF}/privacy-policy`),
      link("Cookies Policy", `${PREVIEW_HREF}/cookies-policy`),
      link("Terms & Condition", `${PREVIEW_HREF}/terms-condition`),
    ],
    saleBlockText: "Get 30% Discount Now",
    saleBlockBadge: "Sale",
    trendingProductsText: "Trending Products",
    visibleItems: {
      about: true,
      account: true,
      wishlist: true,
      language: true,
      currency: true,
      trackOrder: true,
      compare: true,
      cart: true,
      vendors: true,
      dashboard: true,
    },
  },
  sections: SUPERMARKET1_DEFAULTS.sections.map((section) => ({
    ...section,
    title: section.label,
    subtitle: `FreshMart ${section.label.toLowerCase()} content`,
  })),
  heroSlides: [
    { id: "hero-1", title: "Fresh Grocery Deals", subtitle: "Premium quality vegetables, dairy, bakery, and daily essentials.", ctaText: "Shop Now", ctaLink: `${PREVIEW_HREF}/shop`, image: "/templates/supermarket1/banner/01.webp", active: true },
    { id: "hero-2", title: "Organic Food For Every Day", subtitle: "Handpicked produce and market staples delivered fresh.", ctaText: "Browse Categories", ctaLink: `${PREVIEW_HREF}/shop`, image: "/templates/supermarket1/banner/02.webp", active: true },
  ],
  offers: [
    { id: "deal-1", title: "Weekly Fresh Deal", discountText: "Up to 30% off", countdown: "2026-12-31T23:59", image: "/templates/supermarket1/images/offer/01.png", ctaText: "Shop Deals", ctaLink: `${PREVIEW_HREF}/shop`, active: true },
  ],
  blogPosts: [
    { id: "post-1", title: "How to keep produce fresh for longer", slug: "keep-produce-fresh", image: "/templates/supermarket1/images/blog/01.jpg", excerpt: "Simple storage tips for weekly grocery runs.", content: "Use breathable storage, keep herbs trimmed, and separate ethylene-producing fruits.", author: "FreshMart Team", date: "2026-05-01", category: "Guide", active: true },
    { id: "post-2", title: "Organic staples worth keeping stocked", slug: "organic-staples", image: "/templates/supermarket1/images/blog/02.jpg", excerpt: "Everyday pantry basics for fast family meals.", content: "Rice, pasta, beans, oils, and frozen produce make weekly cooking easier.", author: "FreshMart Team", date: "2026-05-02", category: "Organic", active: true },
  ],
  vendors: [
    { id: "vendor-1", name: "Fresh Juice Bar", handle: "fresh-juice-bar", image: "/templates/supermarket1/images/vendor/01.jpg", description: "Fresh pressed juices, smoothies, and fruit boxes.", rating: 4.9, address: "530 Post Ct, El Dorado Hills", contact: "hello@freshjuice.example", active: true },
    { id: "vendor-2", name: "Organic Farm", handle: "organic-farm", image: "/templates/supermarket1/images/vendor/02.jpg", description: "Seasonal organic fruits and vegetables.", rating: 4.8, address: "284 Market Road", contact: "orders@organicfarm.example", active: true },
  ],
  pages: [
    page("about", "About", "About FreshMart", "A full-service grocery template for daily essentials.", "/templates/supermarket1/images/about/01.jpg"),
    page("contact", "Contact", "Contact Us", "Reach the FreshMart team.", "/templates/supermarket1/images/contact/02.jpg"),
    page("privacy-policy", "Privacy Policy", "Privacy Policy", "How customer data is handled.", ""),
    page("cookies-policy", "Cookies Policy", "Cookies Policy", "Cookie and tracking preferences.", ""),
    page("terms-condition", "Terms & Condition", "Terms & Condition", "Store terms and service policies.", ""),
    page("store", "Store", "FreshMart Stores", "Local store locations and pickup points.", "/templates/supermarket1/images/store/01.jpg"),
    page("invoice", "Invoice", "Invoice", "Order invoice template content.", ""),
    page("trackorder", "Track Order", "Track Order", "Track grocery delivery progress.", ""),
  ],
  contactEditor: {
    mapEmbed: "530 Post Ct El Dorado Hills California, United States",
    formNameLabel: "Your Name",
    formEmailLabel: "Email Address",
    formMessageLabel: "Message",
    formSubmitLabel: "Send Message",
    businessHours: "Mon-Fri: 8:00-20:00, Sat-Sun: 9:00-18:00",
  },
  footer: {
    newsletterTitle: "Subscribe to our newsletter",
    newsletterText: "Get weekly grocery deals, recipes, and vendor updates.",
    copyrightText: "Copyright 2026 FreshMart. All rights reserved.",
    paymentIcons: "/templates/supermarket1/images/payment/01.png, /templates/supermarket1/images/payment/02.png, /templates/supermarket1/images/payment/03.png",
    columns: [
      { id: "footer-1", title: "Company", links: [link("About", `${PREVIEW_HREF}/about`), link("Contact", `${PREVIEW_HREF}/contact`), link("Store", `${PREVIEW_HREF}/store`)] },
      { id: "footer-2", title: "Customer", links: [link("My Account", `${PREVIEW_HREF}/account`), link("Wishlist", `${PREVIEW_HREF}/wishlist`), link("Track Order", `${PREVIEW_HREF}/trackorder`)] },
    ],
  },
};

function link(label: string, href: string): LinkItem {
  return { id: makeId("link"), label, href, active: true };
}

function group(title: string, rows: string[]): MegaGroup {
  return {
    id: makeId("group"),
    title,
    items: rows.map((row) => {
      const [label, href = "#"] = row.split("|");
      return link(label.trim(), href.trim());
    }),
  };
}

function page(id: string, label: string, heroTitle: string, heroSubtitle: string, heroImage: string): PageContent {
  return { id, label, heroTitle, heroSubtitle, heroImage, content: `${label} page content.`, active: true };
}

function cloneConfig(value: EditorConfig): EditorConfig {
  return JSON.parse(JSON.stringify(value)) as EditorConfig;
}

function normalizeConfig(raw: unknown): EditorConfig {
  if (!raw || typeof raw !== "object") return cloneConfig(DEFAULT_EDITOR_CONFIG);
  const partial = raw as Partial<EditorConfig>;
  return {
    ...cloneConfig(DEFAULT_EDITOR_CONFIG),
    ...partial,
    logo: { ...DEFAULT_EDITOR_CONFIG.logo, ...partial.logo },
    theme: { ...DEFAULT_EDITOR_CONFIG.theme, ...partial.theme },
    contact: { ...DEFAULT_EDITOR_CONFIG.contact, ...partial.contact },
    social: { ...DEFAULT_EDITOR_CONFIG.social, ...partial.social },
    announcement: { ...DEFAULT_EDITOR_CONFIG.announcement, ...partial.announcement },
    header: { ...DEFAULT_EDITOR_CONFIG.header, ...partial.header },
    contactEditor: { ...DEFAULT_EDITOR_CONFIG.contactEditor, ...partial.contactEditor },
    footer: { ...DEFAULT_EDITOR_CONFIG.footer, ...partial.footer },
    sections: partial.sections ?? DEFAULT_EDITOR_CONFIG.sections,
    categories: partial.categories ?? DEFAULT_EDITOR_CONFIG.categories,
    products: partial.products ?? DEFAULT_EDITOR_CONFIG.products,
    heroSlides: partial.heroSlides ?? DEFAULT_EDITOR_CONFIG.heroSlides,
    offers: partial.offers ?? DEFAULT_EDITOR_CONFIG.offers,
    blogPosts: partial.blogPosts ?? DEFAULT_EDITOR_CONFIG.blogPosts,
    vendors: partial.vendors ?? DEFAULT_EDITOR_CONFIG.vendors,
    pages: partial.pages ?? DEFAULT_EDITOR_CONFIG.pages,
  };
}

export default function Supermarket1AdminPage() {
  const [config, setConfig] = useState<EditorConfig>(() => cloneConfig(DEFAULT_EDITOR_CONFIG));
  const [tab, setTab] = useState<Tab>("brand");
  const [imagePool, setImagePool] = useState<string[]>([]);
  const [productImagePool, setProductImagePool] = useState<string[]>([]);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [savedMsg, setSavedMsg] = useState("No changes yet");
  const [imageReport, setImageReport] = useState<{ checked: number; missing: string[] }>({ checked: 0, missing: [] });
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SUPERMARKET1_STORAGE_KEY);
      if (raw) setConfig(normalizeConfig(JSON.parse(raw)));
    } catch {
      setConfig(cloneConfig(DEFAULT_EDITOR_CONFIG));
    }
    listAllSupermarket1Images().then(setImagePool).catch(() => {});
    listProductImages().then(setProductImagePool).catch(() => {});
  }, []);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(SUPERMARKET1_STORAGE_KEY, JSON.stringify(config));
        setSavedAt(new Date());
      } catch { /* localStorage unavailable */ }
    }, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [config]);

  useEffect(() => {
    if (!savedAt) return;
    const update = () => {
      const secs = Math.round((Date.now() - savedAt.getTime()) / 1000);
      setSavedMsg(secs < 5 ? "Draft saved just now" : secs < 60 ? `Draft saved ${secs}s ago` : `Draft saved ${Math.round(secs / 60)}m ago`);
    };
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, [savedAt]);

  const referencedImages = useMemo(() => {
    const values = [
      config.logo.src,
      ...config.products.flatMap((product) => product.images),
      ...config.categories.flatMap((category) => [category.image, category.icon]),
      ...config.heroSlides.map((slide) => slide.image),
      ...config.offers.map((offer) => offer.image),
      ...config.blogPosts.map((post) => post.image),
      ...config.vendors.map((vendor) => vendor.image),
      ...config.pages.map((templatePage) => templatePage.heroImage),
      ...config.footer.paymentIcons.split(",").map((value) => value.trim()),
    ];
    return values.filter((value): value is string => !!value && value.startsWith("/templates/supermarket1/"));
  }, [config]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      checkSupermarket1Images(referencedImages).then(setImageReport).catch(() => {
        setImageReport({ checked: referencedImages.length, missing: [] });
      });
    }, 300);
    return () => window.clearTimeout(id);
  }, [referencedImages]);

  function save(next: EditorConfig) {
    setConfig(next);
  }
  function update<K extends keyof EditorConfig>(key: K, value: EditorConfig[K]) {
    save({ ...config, [key]: value });
  }
  function updateTheme(delta: Partial<StoreTheme>) {
    save({ ...config, theme: { ...config.theme, ...delta } });
  }
  function updateContact(delta: Partial<EditorConfig["contact"]>) {
    save({ ...config, contact: { ...config.contact, ...delta } });
  }
  function updateSocial(key: keyof EditorConfig["social"], value: string) {
    save({ ...config, social: { ...config.social, [key]: value || undefined } });
  }

  const productsSchema = buildProductsSchema({ config, imagePool: productImagePool });
  const activeTab = TABS.find((item) => item.id === tab) ?? TABS[0];

  return (
    <div className="supermarket-admin-editor min-h-screen bg-[#050b16] text-white">
      <style>{`
        .supermarket-admin-editor {
          font-size: 17px;
          line-height: 1.55;
        }
        .supermarket-admin-editor .editor-sidebar {
          font-size: 17px;
        }
        .supermarket-admin-editor .editor-nav-label {
          color: #ffffff;
          display: block;
          font-size: 18px;
          font-weight: 800;
          line-height: 1.35;
        }
        .supermarket-admin-editor .editor-nav-description {
          color: rgba(255,255,255,0.82);
          display: block;
          font-size: 15px;
          line-height: 1.5;
          margin-top: 6px;
        }
        .supermarket-admin-editor .editor-section-title {
          color: rgba(255,255,255,0.86);
          font-size: 16px;
          letter-spacing: 0.08em;
        }
        .supermarket-admin-editor .editor-helper-text {
          color: rgba(255,255,255,0.86);
          font-size: 16px;
          line-height: 1.65;
        }
        .supermarket-admin-editor .editor-field-label {
          color: rgba(255,255,255,0.9);
          font-size: 15px;
          letter-spacing: 0.08em;
        }
        .supermarket-admin-editor .editor-input {
          color: #ffffff;
          font-size: 18px;
          min-height: 48px;
        }
        .supermarket-admin-editor .editor-toggle {
          color: rgba(255,255,255,0.92);
          font-size: 17px;
          line-height: 1.4;
        }
        .supermarket-admin-editor .editor-small {
          color: rgba(255,255,255,0.78);
          font-size: 15px;
          line-height: 1.5;
        }
      `}</style>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050b16]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1720px] items-center justify-between gap-3 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <Link href={PREVIEW_HREF} target="_blank" className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/80 hover:bg-white/[0.08]">
              ← Open preview
            </Link>
            <div className="hidden md:block">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b8ff7d]">Template editor</div>
              <div className="text-base font-semibold text-white">{config.name} customization</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-amber-300/40 bg-amber-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-100 sm:inline-flex">
              localStorage draft
            </span>
            <span className="text-xs text-white/75">{savedMsg}</span>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset supermarket-1 editor draft to defaults?")) {
                  window.localStorage.removeItem(SUPERMARKET1_STORAGE_KEY);
                  setConfig(cloneConfig(DEFAULT_EDITOR_CONFIG));
                  setSavedAt(new Date());
                }
              }}
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/[0.08]"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className={`grid grid-cols-1 ${tab === "products" ? "lg:grid-cols-[minmax(620px,720px)_1fr]" : "lg:grid-cols-[480px_1fr]"}`}>
        <aside className="editor-sidebar border-r border-white/10 p-5 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#b8ff7d]">Simple editor</div>
            <div className="mt-2 text-2xl font-bold leading-tight text-white">What do you want to edit?</div>
            <p className="editor-helper-text mt-3">
              Pick a section below. Changes save automatically and the public preview reads the saved draft.
            </p>
          </div>

          <nav className="mt-4 space-y-4">
            {TAB_GROUPS.map((groupItem) => (
              <div key={groupItem.title}>
                <div className="editor-section-title mb-2 font-bold uppercase">{groupItem.title}</div>
                <div className="grid gap-1">
                  {groupItem.ids.map((id) => {
                    const item = TABS.find((candidate) => candidate.id === id)!;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTab(item.id)}
                        className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                          tab === item.id
                            ? "border-[#8fc950]/80 bg-[#629D23]/22 text-white shadow-[0_12px_30px_-18px_rgba(98,157,35,0.85)]"
                            : "border-white/20 bg-white/[0.055] text-white/85 hover:bg-white/[0.09] hover:text-white"
                        }`}
                      >
                        <span className="editor-nav-label">{item.label}</span>
                        <span className="editor-nav-description">{item.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-[#629D23]/25 bg-[#629D23]/10 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#caff96]">Now editing</div>
              <div className="mt-1 text-lg font-semibold text-white">{activeTab.label}</div>
              <p className="editor-helper-text mt-2">{activeTab.description}</p>
            </div>

            {tab === "brand" && (
              <Group title="Brand">
                <Input label="Business name" value={config.name} onChange={(value) => update("name", value)} />
                <Input label="Logo text" value={config.logo.text} onChange={(value) => update("logo", { ...config.logo, text: value })} />
                <Input label="Logo image path" value={config.logo.src ?? ""} onChange={(value) => update("logo", { ...config.logo, src: value || undefined })} placeholder="/templates/supermarket1/images/logo/logo.svg" list="supermarket1-images" />
                <Input label="Tagline" value={config.tagline} onChange={(value) => update("tagline", value)} />
                <Input label="Phone" value={config.contact.phone} onChange={(value) => updateContact({ phone: value })} />
                <Input label="Email" value={config.contact.email} onChange={(value) => updateContact({ email: value })} />
                <Textarea label="Address" value={config.contact.address} onChange={(value) => updateContact({ address: value })} />
                <Input label="Delivery / opening hours" value={config.contact.hours ?? ""} onChange={(value) => updateContact({ hours: value })} />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {(["facebook", "twitter", "instagram", "youtube"] as const).map((key) => (
                    <Input key={key} label={`${key} link`} value={config.social[key] ?? ""} onChange={(value) => updateSocial(key, value)} />
                  ))}
                </div>
              </Group>
            )}

            {tab === "theme" && (
              <Group title="Theme">
                <ColorInput label="Primary color" value={config.theme.primary} onChange={(value) => updateTheme({ primary: value })} />
                <ColorInput label="Secondary color" value={config.theme.secondary ?? "#2C3C28"} onChange={(value) => updateTheme({ secondary: value })} />
                <ColorInput label="Accent color" value={config.theme.accent} onChange={(value) => updateTheme({ accent: value })} />
                <ColorInput label="Background color" value={config.theme.background} onChange={(value) => updateTheme({ background: value })} />
                <ColorInput label="Text color" value={config.theme.text ?? config.theme.foreground} onChange={(value) => updateTheme({ text: value, foreground: value })} />
                <Input label="Button radius" value={config.theme.buttonRadius ?? ""} onChange={(value) => updateTheme({ buttonRadius: value })} placeholder="6px" />
                <Input label="Card radius" value={config.theme.cardRadius ?? ""} onChange={(value) => updateTheme({ cardRadius: value })} placeholder="10px" />
                <Input label="Font style" value={config.theme.fontStyle ?? ""} onChange={(value) => updateTheme({ fontStyle: value })} placeholder="Inter / system" />
                <div className="grid grid-cols-3 gap-2">
                  {(["sm", "md", "lg"] as const).map((radius) => (
                    <button key={radius} type="button" onClick={() => updateTheme({ radius })} className={`rounded-lg border px-3 py-2 text-xs font-semibold uppercase ${config.theme.radius === radius ? "border-[#629D23] bg-[#629D23]/20 text-white" : "border-white/10 bg-white/[0.04] text-white/60"}`}>
                      {radius}
                    </button>
                  ))}
                </div>
              </Group>
            )}

            {tab === "header" && (
              <>
                <Group title="Top bar and sale block">
                  <Textarea label="Top bar text" value={config.header.topBarText} onChange={(value) => update("header", { ...config.header, topBarText: value })} />
                  <Input label="Countdown text" value={config.header.countdownText} onChange={(value) => update("header", { ...config.header, countdownText: value })} />
                  <Input label="Countdown target" value={config.header.countdownTarget} onChange={(value) => update("header", { ...config.header, countdownTarget: value })} placeholder="MM/DD/YYYY HH:mm:ss" />
                  <Input label="Trending products text" value={config.header.trendingProductsText} onChange={(value) => update("header", { ...config.header, trendingProductsText: value })} />
                  <Input label="Sale block text" value={config.header.saleBlockText} onChange={(value) => update("header", { ...config.header, saleBlockText: value })} />
                  <Input label="Sale badge" value={config.header.saleBlockBadge} onChange={(value) => update("header", { ...config.header, saleBlockBadge: value })} />
                </Group>
                <Group title="Show / hide nav items">
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(config.header.visibleItems).map(([key, checked]) => (
                      <Toggle key={key} label={key.replace(/([A-Z])/g, " $1")} checked={checked} onChange={(value) => update("header", { ...config.header, visibleItems: { ...config.header.visibleItems, [key]: value } })} />
                    ))}
                  </div>
                </Group>
                <LinksEditor title="Main menu items" items={config.header.menuItems} onChange={(items) => update("header", { ...config.header, menuItems: items })} />
                <MegaMenuEditor groups={config.header.shopMegaMenu} onChange={(shopMegaMenu) => update("header", { ...config.header, shopMegaMenu })} />
                <LinksEditor title="Pages dropdown items" items={config.header.pagesDropdown} onChange={(pagesDropdown) => update("header", { ...config.header, pagesDropdown })} />
              </>
            )}

            {tab === "home" && (
              <Group title="Home sections">
                <p className="editor-helper-text">Toggle, rename, and reorder the template home sections.</p>
                <div className="space-y-3">
                  {config.sections.map((section, index) => (
                    <div key={section.id} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <Toggle label={section.label} checked={section.active} onChange={(active) => update("sections", config.sections.map((item) => item.id === section.id ? { ...item, active } : item))} />
                        <MoveButtons index={index} length={config.sections.length} onMove={(dir) => update("sections", move(config.sections, index, index + dir))} />
                      </div>
                      <Input label="Section title" value={section.title ?? ""} onChange={(value) => update("sections", config.sections.map((item) => item.id === section.id ? { ...item, title: value } : item))} />
                      <Input label="Section subtitle" value={section.subtitle ?? ""} onChange={(value) => update("sections", config.sections.map((item) => item.id === section.id ? { ...item, subtitle: value } : item))} />
                    </div>
                  ))}
                </div>
              </Group>
            )}

            {tab === "banners" && (
              <CollectionGroup title="Hero slides" addLabel="Add slide" onAdd={() => update("heroSlides", [...config.heroSlides, { id: makeId("slide"), title: "New slide", subtitle: "", ctaText: "Shop Now", ctaLink: `${PREVIEW_HREF}/shop`, image: "", active: true }])}>
                {config.heroSlides.map((slide, index) => (
                  <Card key={slide.id} title={slide.title || "Untitled slide"} active={slide.active} index={index} length={config.heroSlides.length} onMove={(dir) => update("heroSlides", move(config.heroSlides, index, index + dir))} onDuplicate={() => update("heroSlides", duplicate(config.heroSlides, slide, "slide"))} onDelete={() => update("heroSlides", config.heroSlides.filter((item) => item.id !== slide.id))}>
                    <Input label="Slide title" value={slide.title} onChange={(value) => patchInList(config.heroSlides, slide.id, { title: value }, (heroSlides) => update("heroSlides", heroSlides))} />
                    <Input label="Subtitle" value={slide.subtitle} onChange={(value) => patchInList(config.heroSlides, slide.id, { subtitle: value }, (heroSlides) => update("heroSlides", heroSlides))} />
                    <Input label="CTA text" value={slide.ctaText} onChange={(value) => patchInList(config.heroSlides, slide.id, { ctaText: value }, (heroSlides) => update("heroSlides", heroSlides))} />
                    <Input label="CTA link" value={slide.ctaLink} onChange={(value) => patchInList(config.heroSlides, slide.id, { ctaLink: value }, (heroSlides) => update("heroSlides", heroSlides))} />
                    <Input label="Image path" value={slide.image} list="supermarket1-images" onChange={(value) => patchInList(config.heroSlides, slide.id, { image: value }, (heroSlides) => update("heroSlides", heroSlides))} />
                    <Toggle label="Active" checked={slide.active} onChange={(value) => patchInList(config.heroSlides, slide.id, { active: value }, (heroSlides) => update("heroSlides", heroSlides))} />
                  </Card>
                ))}
              </CollectionGroup>
            )}

            {tab === "categories" && (
              <CollectionGroup title="Categories" addLabel="Add category" onAdd={() => update("categories", [...config.categories, { id: makeId("cat"), name: "New Category", handle: "new-category", image: "", active: true }])}>
                {config.categories.map((category, index) => (
                  <Card key={category.id} title={category.name} active={category.active !== false} index={index} length={config.categories.length} onMove={(dir) => update("categories", move(config.categories, index, index + dir))} onDuplicate={() => update("categories", duplicate(config.categories, category, "cat"))} onDelete={() => update("categories", config.categories.filter((item) => item.id !== category.id))}>
                    <Input label="Name" value={category.name} onChange={(value) => patchInList(config.categories, category.id, { name: value }, (categories) => update("categories", categories))} />
                    <Input label="Handle" value={category.handle} onChange={(value) => patchInList(config.categories, category.id, { handle: slugify(value) }, (categories) => update("categories", categories))} />
                    <Input label="Image" value={category.image ?? ""} list="supermarket1-images" onChange={(value) => patchInList(config.categories, category.id, { image: value }, (categories) => update("categories", categories))} />
                    <Input label="Icon" value={category.icon ?? ""} list="supermarket1-images" onChange={(value) => patchInList(config.categories, category.id, { icon: value }, (categories) => update("categories", categories))} />
                    <Input label="Parent / subcategory" value={category.parent ?? ""} onChange={(value) => patchInList(config.categories, category.id, { parent: value || undefined }, (categories) => update("categories", categories))} />
                    <Toggle label="Active" checked={category.active !== false} onChange={(value) => patchInList(config.categories, category.id, { active: value }, (categories) => update("categories", categories))} />
                  </Card>
                ))}
              </CollectionGroup>
            )}

            {tab === "products" && (
              <Group title="Products">
                <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3 text-[11px] text-white/55">
                  <div className="editor-small flex justify-between"><span>Product image choices</span><span className="font-semibold text-white">{productImagePool.length}</span></div>
                  <div className="editor-small flex justify-between"><span>Referenced images checked</span><span className={imageReport.missing.length ? "font-semibold text-red-300" : "font-semibold text-emerald-300"}>{imageReport.checked}</span></div>
                  {imageReport.missing.length > 0 && <div className="mt-2 rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-200">Missing: {imageReport.missing.join(", ")}</div>}
                </div>
                <ItemsManager items={config.products} onChange={(products) => update("products", products)} schema={productsSchema} theme="dark" />
              </Group>
            )}

            {tab === "offers" && (
              <CollectionGroup title="Offers / deals" addLabel="Add deal" onAdd={() => update("offers", [...config.offers, { id: makeId("deal"), title: "New Deal", discountText: "Save 20%", countdown: "", image: "", ctaText: "Shop Deal", ctaLink: `${PREVIEW_HREF}/shop`, active: true }])}>
                {config.offers.map((offer, index) => (
                  <Card key={offer.id} title={offer.title} active={offer.active} index={index} length={config.offers.length} onMove={(dir) => update("offers", move(config.offers, index, index + dir))} onDuplicate={() => update("offers", duplicate(config.offers, offer, "deal"))} onDelete={() => update("offers", config.offers.filter((item) => item.id !== offer.id))}>
                    <Input label="Deal title" value={offer.title} onChange={(value) => patchInList(config.offers, offer.id, { title: value }, (offers) => update("offers", offers))} />
                    <Input label="Discount text" value={offer.discountText} onChange={(value) => patchInList(config.offers, offer.id, { discountText: value }, (offers) => update("offers", offers))} />
                    <Input label="Countdown date/time" value={offer.countdown} onChange={(value) => patchInList(config.offers, offer.id, { countdown: value }, (offers) => update("offers", offers))} />
                    <Input label="Deal image" value={offer.image} list="supermarket1-images" onChange={(value) => patchInList(config.offers, offer.id, { image: value }, (offers) => update("offers", offers))} />
                    <Input label="CTA text" value={offer.ctaText} onChange={(value) => patchInList(config.offers, offer.id, { ctaText: value }, (offers) => update("offers", offers))} />
                    <Input label="CTA link" value={offer.ctaLink} onChange={(value) => patchInList(config.offers, offer.id, { ctaLink: value }, (offers) => update("offers", offers))} />
                    <Toggle label="Active" checked={offer.active} onChange={(value) => patchInList(config.offers, offer.id, { active: value }, (offers) => update("offers", offers))} />
                  </Card>
                ))}
              </CollectionGroup>
            )}

            {tab === "blog" && (
              <CollectionGroup title="Blog posts" addLabel="Add post" onAdd={() => update("blogPosts", [...config.blogPosts, { id: makeId("post"), title: "New Post", slug: "new-post", image: "", excerpt: "", content: "", author: "FreshMart Team", date: new Date().toISOString().slice(0, 10), category: "Guide", active: true }])}>
                {config.blogPosts.map((post, index) => (
                  <Card key={post.id} title={post.title} active={post.active} index={index} length={config.blogPosts.length} onMove={(dir) => update("blogPosts", move(config.blogPosts, index, index + dir))} onDuplicate={() => update("blogPosts", duplicate(config.blogPosts, post, "post"))} onDelete={() => update("blogPosts", config.blogPosts.filter((item) => item.id !== post.id))}>
                    <Input label="Title" value={post.title} onChange={(value) => patchInList(config.blogPosts, post.id, { title: value }, (blogPosts) => update("blogPosts", blogPosts))} />
                    <Input label="Slug" value={post.slug} onChange={(value) => patchInList(config.blogPosts, post.id, { slug: slugify(value) }, (blogPosts) => update("blogPosts", blogPosts))} />
                    <Input label="Image" value={post.image} list="supermarket1-images" onChange={(value) => patchInList(config.blogPosts, post.id, { image: value }, (blogPosts) => update("blogPosts", blogPosts))} />
                    <Textarea label="Excerpt" value={post.excerpt} onChange={(value) => patchInList(config.blogPosts, post.id, { excerpt: value }, (blogPosts) => update("blogPosts", blogPosts))} />
                    <Textarea label="Content" value={post.content} onChange={(value) => patchInList(config.blogPosts, post.id, { content: value }, (blogPosts) => update("blogPosts", blogPosts))} />
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <Input label="Author" value={post.author} onChange={(value) => patchInList(config.blogPosts, post.id, { author: value }, (blogPosts) => update("blogPosts", blogPosts))} />
                      <Input label="Date" value={post.date} onChange={(value) => patchInList(config.blogPosts, post.id, { date: value }, (blogPosts) => update("blogPosts", blogPosts))} />
                      <Input label="Category" value={post.category} onChange={(value) => patchInList(config.blogPosts, post.id, { category: value }, (blogPosts) => update("blogPosts", blogPosts))} />
                    </div>
                    <Toggle label="Active" checked={post.active} onChange={(value) => patchInList(config.blogPosts, post.id, { active: value }, (blogPosts) => update("blogPosts", blogPosts))} />
                  </Card>
                ))}
              </CollectionGroup>
            )}

            {tab === "vendors" && (
              <CollectionGroup title="Vendors" addLabel="Add vendor" onAdd={() => update("vendors", [...config.vendors, { id: makeId("vendor"), name: "New Vendor", handle: "new-vendor", image: "", description: "", rating: 4.8, address: "", contact: "", active: true }])}>
                {config.vendors.map((vendor, index) => (
                  <Card key={vendor.id} title={vendor.name} active={vendor.active} index={index} length={config.vendors.length} onMove={(dir) => update("vendors", move(config.vendors, index, index + dir))} onDuplicate={() => update("vendors", duplicate(config.vendors, vendor, "vendor"))} onDelete={() => update("vendors", config.vendors.filter((item) => item.id !== vendor.id))}>
                    <Input label="Name" value={vendor.name} onChange={(value) => patchInList(config.vendors, vendor.id, { name: value }, (vendors) => update("vendors", vendors))} />
                    <Input label="Handle" value={vendor.handle} onChange={(value) => patchInList(config.vendors, vendor.id, { handle: slugify(value) }, (vendors) => update("vendors", vendors))} />
                    <Input label="Logo / image" value={vendor.image} list="supermarket1-images" onChange={(value) => patchInList(config.vendors, vendor.id, { image: value }, (vendors) => update("vendors", vendors))} />
                    <Textarea label="Description" value={vendor.description} onChange={(value) => patchInList(config.vendors, vendor.id, { description: value }, (vendors) => update("vendors", vendors))} />
                    <Input label="Rating" type="number" value={String(vendor.rating)} onChange={(value) => patchInList(config.vendors, vendor.id, { rating: Number(value) || 0 }, (vendors) => update("vendors", vendors))} />
                    <Input label="Address" value={vendor.address} onChange={(value) => patchInList(config.vendors, vendor.id, { address: value }, (vendors) => update("vendors", vendors))} />
                    <Input label="Contact" value={vendor.contact} onChange={(value) => patchInList(config.vendors, vendor.id, { contact: value }, (vendors) => update("vendors", vendors))} />
                    <Toggle label="Active" checked={vendor.active} onChange={(value) => patchInList(config.vendors, vendor.id, { active: value }, (vendors) => update("vendors", vendors))} />
                  </Card>
                ))}
              </CollectionGroup>
            )}

            {tab === "pages" && (
              <Group title="Static / template pages">
                <div className="space-y-3">
                  {config.pages.map((templatePage) => (
                    <div key={templatePage.id} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="font-semibold">{templatePage.label}</div>
                        <Toggle label="Active" checked={templatePage.active} onChange={(active) => patchInList(config.pages, templatePage.id, { active }, (pages) => update("pages", pages))} />
                      </div>
                      <Input label="Hero title" value={templatePage.heroTitle} onChange={(value) => patchInList(config.pages, templatePage.id, { heroTitle: value }, (pages) => update("pages", pages))} />
                      <Input label="Hero subtitle" value={templatePage.heroSubtitle} onChange={(value) => patchInList(config.pages, templatePage.id, { heroSubtitle: value }, (pages) => update("pages", pages))} />
                      <Input label="Hero image" value={templatePage.heroImage} list="supermarket1-images" onChange={(value) => patchInList(config.pages, templatePage.id, { heroImage: value }, (pages) => update("pages", pages))} />
                      <Textarea label="Page content" value={templatePage.content} onChange={(value) => patchInList(config.pages, templatePage.id, { content: value }, (pages) => update("pages", pages))} />
                    </div>
                  ))}
                </div>
              </Group>
            )}

            {tab === "contact" && (
              <Group title="Contact">
                <Input label="Phone" value={config.contact.phone} onChange={(value) => updateContact({ phone: value })} />
                <Input label="Secondary phone" value={config.contact.phone2 ?? ""} onChange={(value) => updateContact({ phone2: value })} />
                <Input label="Email" value={config.contact.email} onChange={(value) => updateContact({ email: value })} />
                <Textarea label="Address" value={config.contact.address} onChange={(value) => updateContact({ address: value })} />
                <Textarea label="Map / embed text" value={config.contactEditor.mapEmbed} onChange={(value) => update("contactEditor", { ...config.contactEditor, mapEmbed: value })} />
                <Input label="Business hours" value={config.contactEditor.businessHours} onChange={(value) => update("contactEditor", { ...config.contactEditor, businessHours: value })} />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input label="Name field label" value={config.contactEditor.formNameLabel} onChange={(value) => update("contactEditor", { ...config.contactEditor, formNameLabel: value })} />
                  <Input label="Email field label" value={config.contactEditor.formEmailLabel} onChange={(value) => update("contactEditor", { ...config.contactEditor, formEmailLabel: value })} />
                  <Input label="Message field label" value={config.contactEditor.formMessageLabel} onChange={(value) => update("contactEditor", { ...config.contactEditor, formMessageLabel: value })} />
                  <Input label="Submit button label" value={config.contactEditor.formSubmitLabel} onChange={(value) => update("contactEditor", { ...config.contactEditor, formSubmitLabel: value })} />
                </div>
              </Group>
            )}

            {tab === "footer" && (
              <>
                <Group title="Footer">
                  <Input label="Newsletter title" value={config.footer.newsletterTitle} onChange={(value) => update("footer", { ...config.footer, newsletterTitle: value })} />
                  <Textarea label="Newsletter text" value={config.footer.newsletterText} onChange={(value) => update("footer", { ...config.footer, newsletterText: value })} />
                  <Input label="Copyright text" value={config.footer.copyrightText} onChange={(value) => update("footer", { ...config.footer, copyrightText: value })} />
                  <Textarea label="Payment icons" value={config.footer.paymentIcons} onChange={(value) => update("footer", { ...config.footer, paymentIcons: value })} />
                </Group>
                <CollectionGroup title="Footer columns" addLabel="Add column" onAdd={() => update("footer", { ...config.footer, columns: [...config.footer.columns, { id: makeId("footer"), title: "New Column", links: [] }] })}>
                  {config.footer.columns.map((column, index) => (
                    <Card key={column.id} title={column.title} index={index} length={config.footer.columns.length} onMove={(dir) => update("footer", { ...config.footer, columns: move(config.footer.columns, index, index + dir) })} onDuplicate={() => update("footer", { ...config.footer, columns: duplicate(config.footer.columns, column, "footer") })} onDelete={() => update("footer", { ...config.footer, columns: config.footer.columns.filter((item) => item.id !== column.id) })}>
                      <Input label="Column title" value={column.title} onChange={(value) => update("footer", { ...config.footer, columns: config.footer.columns.map((item) => item.id === column.id ? { ...item, title: value } : item) })} />
                      <LinksEditor title="Footer links" compact items={column.links} onChange={(links) => update("footer", { ...config.footer, columns: config.footer.columns.map((item) => item.id === column.id ? { ...item, links } : item) })} />
                    </Card>
                  ))}
                </CollectionGroup>
              </>
            )}
          </div>
        </aside>

        <main className="min-h-[calc(100vh-4rem)] bg-white text-slate-950">
          <div className="sticky top-16 z-10 border-b border-slate-200 bg-white/90 px-5 py-3 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.16em] text-[#4f821b]">FreshMart draft</div>
                <div className="mt-1 text-4xl font-bold leading-tight text-[#2C3C28]">{config.name}</div>
              </div>
              <div className="text-xs text-slate-500">
                {config.products.length} products · {config.categories.length} categories · {config.heroSlides.filter((slide) => slide.active).length} active slides
              </div>
            </div>
          </div>
          <div className="space-y-5 p-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-600">Admin quick start</div>
              <div className="mt-1 text-3xl font-bold leading-tight text-[#2C3C28]">Edit the website in small steps.</div>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                This page is for changing the template content. The ecommerce dashboard is still separate at <code className="rounded bg-slate-200 px-1">/preview/dashboard</code>.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <QuickAction title="1. Store details" copy="Name, logo, phone, address, and hours." onClick={() => setTab("brand")} />
                <QuickAction title="2. Colors" copy="Primary color, text color, and corner radius." onClick={() => setTab("theme")} />
                <QuickAction title="3. Products" copy="Add, edit, duplicate, delete, reorder, import, and export products." onClick={() => setTab("products")} />
                <QuickAction title="4. Homepage" copy="Slides, categories, offers, and section visibility." onClick={() => setTab("banners")} />
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <PreviewCard title="Brand" value={config.logo.text || config.name} detail={config.tagline} />
              <PreviewCard title="Theme" value={config.theme.primary} detail={`${config.theme.buttonRadius ?? "6px"} buttons · ${config.theme.cardRadius ?? "10px"} cards`} swatch={config.theme.primary} />
              <PreviewCard title="Contact" value={config.contact.phone} detail={config.contact.email} />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 text-2xl font-bold text-[#2C3C28]">Draft status</div>
              <div className="grid gap-3 md:grid-cols-3">
                <PreviewCard title="Images available" value={String(imagePool.length)} detail="Reusable supermarket-1 images" />
                <PreviewCard title="Image check" value={imageReport.missing.length ? "Needs review" : "Looks good"} detail={imageReport.missing.length ? `${imageReport.missing.length} missing path(s)` : `${imageReport.checked} referenced path(s) checked`} />
                <PreviewCard title="Autosave" value="On" detail="Saved in this browser as a draft" />
              </div>
              {imageReport.missing.length > 0 && (
                <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  {imageReport.missing.join(", ")}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <datalist id="supermarket1-images">
        {imagePool.map((src) => <option key={src} value={src} />)}
      </datalist>
    </div>
  );
}

function LinksEditor({ title, items, onChange, compact = false }: { title: string; items: LinkItem[]; onChange: (items: LinkItem[]) => void; compact?: boolean }) {
  return (
    <Group title={title} inset={compact}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <Toggle label={item.label || "Menu item"} checked={item.active} onChange={(active) => onChange(items.map((entry) => entry.id === item.id ? { ...entry, active } : entry))} />
              <div className="flex gap-1">
                <MoveButtons index={index} length={items.length} onMove={(dir) => onChange(move(items, index, index + dir))} />
                <button type="button" onClick={() => onChange(items.filter((entry) => entry.id !== item.id))} className={dangerBtnCls}>Delete</button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <Input label="Label" value={item.label} onChange={(value) => onChange(items.map((entry) => entry.id === item.id ? { ...entry, label: value } : entry))} />
              <Input label="Link" value={item.href} onChange={(value) => onChange(items.map((entry) => entry.id === item.id ? { ...entry, href: value } : entry))} />
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, link("New link", "#")])} className={secondaryBtnCls}>Add link</button>
    </Group>
  );
}

function MegaMenuEditor({ groups, onChange }: { groups: MegaGroup[]; onChange: (groups: MegaGroup[]) => void }) {
  return (
    <Group title="Shop mega menu groups">
      {groups.map((menuGroup, index) => (
        <div key={menuGroup.id} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
          <div className="mb-2 flex justify-between gap-2">
            <Input label="Group title" value={menuGroup.title} onChange={(value) => onChange(groups.map((item) => item.id === menuGroup.id ? { ...item, title: value } : item))} />
            <div className="flex items-end gap-1 pb-1">
              <MoveButtons index={index} length={groups.length} onMove={(dir) => onChange(move(groups, index, index + dir))} />
              <button type="button" className={dangerBtnCls} onClick={() => onChange(groups.filter((item) => item.id !== menuGroup.id))}>Delete</button>
            </div>
          </div>
          <LinksEditor compact title="Group items" items={menuGroup.items} onChange={(items) => onChange(groups.map((item) => item.id === menuGroup.id ? { ...item, items } : item))} />
        </div>
      ))}
      <button type="button" className={secondaryBtnCls} onClick={() => onChange([...groups, { id: makeId("group"), title: "New Group", items: [] }])}>Add mega menu group</button>
    </Group>
  );
}

function Group({ title, children, inset = false }: { title: string; children: ReactNode; inset?: boolean }) {
  return (
    <section className={inset ? "space-y-3" : "space-y-3"}>
      <div className="editor-section-title font-bold uppercase">{title}</div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function CollectionGroup({ title, addLabel, onAdd, children }: { title: string; addLabel: string; onAdd: () => void; children: ReactNode }) {
  return (
    <Group title={title}>
      <button type="button" onClick={onAdd} className={primaryBtnCls}>+ {addLabel}</button>
      <div className="space-y-3">{children}</div>
    </Group>
  );
}

function Card({ title, active, index, length, onMove, onDuplicate, onDelete, children }: { title: string; active?: boolean; index: number; length: number; onMove: (dir: -1 | 1) => void; onDuplicate: () => void; onDelete: () => void; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {typeof active === "boolean" && <div className={active ? "text-[10px] uppercase tracking-wider text-emerald-300" : "text-[10px] uppercase tracking-wider text-rose-300"}>{active ? "Active" : "Inactive"}</div>}
        </div>
        <div className="flex gap-1">
          <MoveButtons index={index} length={length} onMove={onMove} />
          <button type="button" className={secondaryBtnCls} onClick={onDuplicate}>Duplicate</button>
          <button type="button" className={dangerBtnCls} onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function MoveButtons({ index, length, onMove }: { index: number; length: number; onMove: (dir: -1 | 1) => void }) {
  return (
    <>
      <button type="button" disabled={index === 0} onClick={() => onMove(-1)} className={miniBtnCls}>↑</button>
      <button type="button" disabled={index >= length - 1} onClick={() => onMove(1)} className={miniBtnCls}>↓</button>
    </>
  );
}

function Input({ label, value, onChange, placeholder, list, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; list?: string; type?: string }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input type={type} value={value} placeholder={placeholder} list={list} onChange={(event) => onChange(event.target.value)} className={inputCls} />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <textarea rows={3} value={value} onChange={(event) => onChange(event.target.value)} className={`${inputCls} min-h-24 resize-y`} />
    </label>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <div className="flex gap-2">
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-11 rounded-lg border border-white/10 bg-white/[0.04]" />
        <input value={value} onChange={(event) => onChange(event.target.value)} className={inputCls} />
      </div>
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="editor-toggle flex cursor-pointer items-center gap-2 font-semibold">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-[#629D23]" />
      <span className="capitalize">{label}</span>
    </label>
  );
}

function PreviewCard({ title, value, detail, swatch }: { title: string; value: string; detail: string; swatch?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">{title}</div>
      <div className="mt-2 flex items-center gap-2">
        {swatch && <span className="h-4 w-4 rounded-full border border-slate-200" style={{ background: swatch }} />}
        <div className="text-xl font-bold text-slate-950">{value}</div>
      </div>
      <div className="mt-1 text-sm leading-5 text-slate-600">{detail}</div>
    </div>
  );
}

function QuickAction({ title, copy, onClick }: { title: string; copy: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#629D23]/40 hover:shadow-lg"
    >
      <span className="block text-base font-bold text-slate-950">{title}</span>
      <span className="mt-2 block text-sm leading-6 text-slate-600">{copy}</span>
      <span className="mt-4 inline-flex rounded-full bg-[#629D23]/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#4f821b]">
        Edit
      </span>
    </button>
  );
}

function move<T>(items: T[], from: number, to: number): T[] {
  if (from < 0 || to < 0 || from >= items.length || to >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function duplicate<T extends { id: string; name?: string; title?: string; handle?: string; slug?: string }>(items: T[], item: T, prefix: string): T[] {
  const copy = { ...item, id: makeId(prefix) };
  if (copy.name) copy.name = `${copy.name} Copy`;
  if (copy.title) copy.title = `${copy.title} Copy`;
  if (copy.handle) copy.handle = slugify(copy.name ?? copy.title ?? copy.handle);
  if (copy.slug) copy.slug = slugify(copy.title ?? copy.name ?? copy.slug);
  const index = items.findIndex((entry) => entry.id === item.id);
  return [...items.slice(0, index + 1), copy, ...items.slice(index + 1)];
}

function patchInList<T extends { id: string }>(items: T[], id: string, delta: Partial<T>, commit: (items: T[]) => void) {
  commit(items.map((item) => item.id === id ? { ...item, ...delta } : item));
}

const labelCls = "editor-field-label mb-1.5 block font-semibold uppercase";
const inputCls = "editor-input w-full rounded-lg border border-white/25 bg-white/[0.09] px-3 py-2.5 outline-none transition placeholder:text-white/50 focus:border-[#8fc950]";
const primaryBtnCls = "rounded-full bg-gradient-to-r from-[#629D23] to-emerald-400 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_25px_-10px_rgba(98,157,35,0.8)]";
const secondaryBtnCls = "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 hover:bg-white/[0.08]";
const dangerBtnCls = "rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-200 hover:bg-red-500/20";
const miniBtnCls = "rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-semibold text-white/70 enabled:hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-30";

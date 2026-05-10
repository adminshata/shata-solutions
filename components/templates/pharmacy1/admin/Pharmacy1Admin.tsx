"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Pharmacy1Frame from "../Pharmacy1Frame";
import { PHARMACY1_DEFAULTS } from "../../../../lib/pharmacy1/defaults";
import { usePharmacy1 } from "../../../../lib/pharmacy1/context";
import type { Pharmacy1Config, Pharmacy1EditableItem, Pharmacy1HomeSection, Pharmacy1NavItem, Pharmacy1Page } from "../../../../lib/pharmacy1/types";

type TabId =
  | "brand"
  | "theme"
  | "header"
  | "home"
  | "hero"
  | "categories"
  | "products"
  | "offers"
  | "services"
  | "brands"
  | "testimonials"
  | "blog"
  | "pages"
  | "contact"
  | "footer";

const tabs: { id: TabId; label: string }[] = [
  { id: "brand", label: "Brand" },
  { id: "theme", label: "Theme" },
  { id: "header", label: "Header / Navigation" },
  { id: "home", label: "Home Sections" },
  { id: "hero", label: "Hero / Banners" },
  { id: "categories", label: "Categories" },
  { id: "products", label: "Products" },
  { id: "offers", label: "Offers / Deals" },
  { id: "services", label: "Services" },
  { id: "brands", label: "Brands" },
  { id: "testimonials", label: "Testimonials" },
  { id: "blog", label: "Blog" },
  { id: "pages", label: "Pages" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
];

const S: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#eef5f1",
    color: "#071c1f",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "18px 24px",
    background: "#071c1f",
    color: "#fff",
  },
  shell: {
    display: "grid",
    gridTemplateColumns: "230px minmax(360px, 560px) minmax(480px, 1fr)",
    minHeight: "calc(100vh - 76px)",
  },
  sidebar: {
    background: "#ffffff",
    borderRight: "1px solid #dce8e2",
    padding: 16,
  },
  controls: {
    overflow: "auto",
    maxHeight: "calc(100vh - 76px)",
    padding: 22,
  },
  preview: {
    overflow: "auto",
    maxHeight: "calc(100vh - 76px)",
    background: "#fff",
    borderLeft: "1px solid #dce8e2",
  },
  panel: {
    background: "#fff",
    border: "1px solid #dce8e2",
    borderRadius: 8,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0 1px 3px rgba(7,28,31,.06)",
  },
  label: {
    display: "block",
    color: "#24504b",
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 7,
  },
  input: {
    width: "100%",
    border: "1px solid #cbded6",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#071c1f",
    background: "#fff",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: 84,
    border: "1px solid #cbded6",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#071c1f",
    background: "#fff",
    boxSizing: "border-box",
    resize: "vertical",
  },
  button: {
    border: 0,
    borderRadius: 8,
    background: "#0a9a73",
    color: "#fff",
    padding: "9px 13px",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
  },
  ghost: {
    border: "1px solid #cbded6",
    borderRadius: 8,
    background: "#fff",
    color: "#24504b",
    padding: "8px 11px",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
  },
  danger: {
    border: "1px solid #fecaca",
    borderRadius: 8,
    background: "#fff",
    color: "#dc2626",
    padding: "8px 11px",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
  },
};

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "color";
}) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span style={S.label}>{label}</span>
      {type === "textarea" ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} style={S.textarea} />
      ) : type === "color" ? (
        <span style={{ display: "grid", gridTemplateColumns: "46px 1fr", gap: 10 }}>
          <input type="color" value={value} onChange={(event) => onChange(event.target.value)} style={{ height: 40 }} />
          <input value={value} onChange={(event) => onChange(event.target.value)} style={S.input} />
        </span>
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} style={S.input} />
      )}
    </label>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        ...S.ghost,
        minWidth: 72,
        background: checked ? "#dcfce7" : "#f9fafb",
        color: checked ? "#166534" : "#64748b",
      }}
    >
      {checked ? "On" : "Off"}
    </button>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={S.panel}>
      <h2 style={{ fontSize: 18, margin: "0 0 16px" }}>{title}</h2>
      {children}
    </section>
  );
}

function EditableItemsManager<T extends Pharmacy1EditableItem | Pharmacy1HomeSection | Pharmacy1NavItem | Pharmacy1Page>({
  title,
  items,
  onChange,
  create,
  renderForm,
}: {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  renderForm: (item: T, update: (value: Partial<T>) => void) => ReactNode;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <Section title={title}>
      <button
        type="button"
        style={{ ...S.button, marginBottom: 14 }}
        onClick={() => {
          const item = create();
          onChange([...items, item]);
          setEditingId(item.id);
        }}
      >
        Add New
      </button>
      {items.map((item, index) => {
        const isEditing = editingId === item.id;
        const labeled = item as T & { name?: string; label?: string; title?: string };
        const label = labeled.name ?? labeled.label ?? labeled.title ?? item.id;
        const update = (value: Partial<T>) => onChange(items.map((current) => (current.id === item.id ? { ...current, ...value } : current)));

        return (
          <div key={item.id} style={{ border: "1px solid #dce8e2", borderRadius: 8, marginBottom: 10, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, background: "#f7fbf9" }}>
              <strong style={{ flex: 1 }}>{label}</strong>
              {"enabled" in item && <Toggle checked={Boolean(item.enabled)} onChange={(enabled) => update({ enabled } as Partial<T>)} />}
              <button type="button" style={S.ghost} onClick={() => onChange(moveItem(items, index, -1))} disabled={index === 0}>
                Up
              </button>
              <button type="button" style={S.ghost} onClick={() => onChange(moveItem(items, index, 1))} disabled={index === items.length - 1}>
                Down
              </button>
              <button
                type="button"
                style={S.ghost}
                onClick={() => {
                  const copy = { ...item, id: makeId(item.id), ...( "name" in item ? { name: `${item.name} Copy`, handle: slugify(`${item.name} copy`) } : {}) } as T;
                  onChange([...items.slice(0, index + 1), copy, ...items.slice(index + 1)]);
                }}
              >
                Duplicate
              </button>
              <button type="button" style={S.ghost} onClick={() => setEditingId(isEditing ? null : item.id)}>
                {isEditing ? "Close" : "Edit"}
              </button>
              <button type="button" style={S.danger} onClick={() => onChange(items.filter((current) => current.id !== item.id))}>
                Delete
              </button>
            </div>
            {isEditing && <div style={{ padding: 14 }}>{renderForm(item, update)}</div>}
          </div>
        );
      })}
    </Section>
  );
}

function createEditable(prefix: string, name: string): Pharmacy1EditableItem {
  return {
    id: makeId(prefix),
    handle: slugify(name),
    name,
    shortDescription: "",
    description: "",
    image: "/templates/pharmacy1/img/product/1.png",
    enabled: true,
    featured: false,
  };
}

function editableItemFields(item: Pharmacy1EditableItem, update: (value: Partial<Pharmacy1EditableItem>) => void) {
  return (
    <>
      <Field label="Name" value={item.name} onChange={(name) => update({ name, handle: slugify(name) })} />
      <Field label="Handle" value={item.handle} onChange={(handle) => update({ handle: slugify(handle) })} />
      <Field label="Short Description" value={item.shortDescription} onChange={(shortDescription) => update({ shortDescription })} />
      <Field label="Description" value={item.description} onChange={(description) => update({ description })} type="textarea" />
      <Field label="Image" value={item.image} onChange={(image) => update({ image })} />
      <Field label="Price" value={item.price ?? ""} onChange={(price) => update({ price })} />
      <Field label="Category" value={item.category ?? ""} onChange={(category) => update({ category })} />
      <Field label="Badge" value={item.badge ?? ""} onChange={(badge) => update({ badge })} />
      <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <span style={S.label}>Featured</span>
        <Toggle checked={item.featured} onChange={(featured) => update({ featured })} />
      </label>
    </>
  );
}

export default function Pharmacy1Admin() {
  const { config, setConfig, resetConfig } = usePharmacy1();
  const [tab, setTab] = useState<TabId>("brand");
  const activePage = useMemo(() => tabs.find((item) => item.id === tab)?.label ?? "Brand", [tab]);

  const patch = (value: Partial<Pharmacy1Config>) => setConfig((current) => ({ ...current, ...value }));

  return (
    <main style={S.page}>
      <header style={S.topbar}>
        <div>
          <p style={{ margin: 0, color: "#8ee7cf", fontSize: 12, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Template editor
          </p>
          <h1 style={{ margin: "4px 0 0", fontSize: 22 }}>Shata Pharmacy</h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/templates/pharmacy-1/preview" style={{ ...S.ghost, textDecoration: "none" }}>
            Open Preview
          </a>
          <button type="button" style={S.danger} onClick={resetConfig}>
            Reset to Defaults
          </button>
        </div>
      </header>

      <div style={S.shell}>
        <aside style={S.sidebar}>
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              style={{
                width: "100%",
                border: "1px solid #dce8e2",
                borderRadius: 8,
                marginBottom: 8,
                padding: "10px 12px",
                textAlign: "left",
                fontWeight: 800,
                cursor: "pointer",
                background: tab === item.id ? "#0a9a73" : "#fff",
                color: tab === item.id ? "#fff" : "#24504b",
              }}
            >
              {item.label}
            </button>
          ))}
        </aside>

        <section style={S.controls}>
          <h2 style={{ margin: "0 0 16px", fontSize: 24 }}>{activePage}</h2>

          {tab === "brand" && (
            <Section title="Brand">
              <Field label="Name" value={config.brand.name} onChange={(name) => patch({ brand: { ...config.brand, name } })} />
              <Field label="Tagline" value={config.brand.tagline} onChange={(tagline) => patch({ brand: { ...config.brand, tagline } })} />
              <Field label="Email" value={config.brand.email} onChange={(email) => patch({ brand: { ...config.brand, email } })} />
              <Field label="Phone" value={config.brand.phone} onChange={(phone) => patch({ brand: { ...config.brand, phone } })} />
              <Field label="Address" value={config.brand.address} onChange={(address) => patch({ brand: { ...config.brand, address } })} />
            </Section>
          )}

          {tab === "theme" && (
            <Section title="Theme">
              <Field label="Primary" value={config.theme.primary} onChange={(primary) => patch({ theme: { ...config.theme, primary } })} type="color" />
              <Field label="Accent" value={config.theme.accent} onChange={(accent) => patch({ theme: { ...config.theme, accent } })} type="color" />
              <Field label="Background" value={config.theme.background} onChange={(background) => patch({ theme: { ...config.theme, background } })} type="color" />
              <Field label="Text" value={config.theme.text} onChange={(text) => patch({ theme: { ...config.theme, text } })} type="color" />
            </Section>
          )}

          {tab === "header" && (
            <>
              <Section title="Header CTA">
                <Field label="CTA Label" value={config.header.ctaLabel} onChange={(ctaLabel) => patch({ header: { ...config.header, ctaLabel } })} />
                <Field label="CTA Link" value={config.header.ctaHref} onChange={(ctaHref) => patch({ header: { ...config.header, ctaHref } })} />
              </Section>
              <EditableItemsManager
                title="Navigation"
                items={config.header.nav}
                onChange={(nav) => patch({ header: { ...config.header, nav } })}
                create={() => ({ id: makeId("nav"), label: "New Link", href: "/templates/pharmacy-1/preview", enabled: true })}
                renderForm={(item, update) => (
                  <>
                    <Field label="Label" value={item.label} onChange={(label) => update({ label })} />
                    <Field label="Href" value={item.href} onChange={(href) => update({ href })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "home" && (
            <EditableItemsManager
              title="Home Sections"
              items={config.homeSections}
              onChange={(homeSections) => patch({ homeSections })}
              create={() => ({ id: makeId("section"), name: "Custom Section", type: "custom", content: "", enabled: true })}
              renderForm={(item, update) => (
                <>
                  <Field label="Name" value={item.name} onChange={(name) => update({ name })} />
                  <Field label="Type" value={item.type} onChange={(type) => update({ type })} />
                  <Field label="Content" value={item.content} onChange={(content) => update({ content })} type="textarea" />
                </>
              )}
            />
          )}

          {tab === "hero" && (
            <EditableItemsManager title="Hero / Banners" items={config.heroBanners} onChange={(heroBanners) => patch({ heroBanners })} create={() => createEditable("hero", "New Banner")} renderForm={editableItemFields} />
          )}
          {tab === "categories" && (
            <EditableItemsManager title="Categories" items={config.categories} onChange={(categories) => patch({ categories })} create={() => createEditable("category", "New Category")} renderForm={editableItemFields} />
          )}
          {tab === "products" && (
            <EditableItemsManager title="Products" items={config.products} onChange={(products) => patch({ products })} create={() => createEditable("product", "New Product")} renderForm={editableItemFields} />
          )}
          {tab === "offers" && (
            <EditableItemsManager title="Offers / Deals" items={config.offers} onChange={(offers) => patch({ offers })} create={() => createEditable("offer", "New Offer")} renderForm={editableItemFields} />
          )}
          {tab === "services" && (
            <EditableItemsManager title="Services" items={config.services} onChange={(services) => patch({ services })} create={() => createEditable("service", "New Service")} renderForm={editableItemFields} />
          )}
          {tab === "brands" && (
            <EditableItemsManager title="Brands" items={config.brands} onChange={(brands) => patch({ brands })} create={() => createEditable("brand", "New Brand")} renderForm={editableItemFields} />
          )}
          {tab === "testimonials" && (
            <EditableItemsManager title="Testimonials" items={config.testimonials} onChange={(testimonials) => patch({ testimonials })} create={() => createEditable("testimonial", "New Testimonial")} renderForm={editableItemFields} />
          )}
          {tab === "blog" && (
            <EditableItemsManager title="Blog Posts" items={config.blog} onChange={(blog) => patch({ blog })} create={() => createEditable("post", "New Blog Post")} renderForm={editableItemFields} />
          )}

          {tab === "pages" && (
            <EditableItemsManager
              title="Custom Pages"
              items={config.pages}
              onChange={(pages) => patch({ pages })}
              create={() => ({ id: makeId("page"), title: "Custom Page", slug: "custom-page", content: "", enabled: true })}
              renderForm={(item, update) => (
                <>
                  <Field label="Title" value={item.title} onChange={(title) => update({ title, slug: slugify(title) })} />
                  <Field label="Slug" value={item.slug} onChange={(slug) => update({ slug: slugify(slug) })} />
                  <Field label="Content" value={item.content} onChange={(content) => update({ content })} type="textarea" />
                </>
              )}
            />
          )}

          {tab === "contact" && (
            <Section title="Contact">
              <Field label="Heading" value={config.contact.heading} onChange={(heading) => patch({ contact: { ...config.contact, heading } })} />
              <Field label="Form Title" value={config.contact.formTitle} onChange={(formTitle) => patch({ contact: { ...config.contact, formTitle } })} />
              <Field label="Map Label" value={config.contact.mapLabel} onChange={(mapLabel) => patch({ contact: { ...config.contact, mapLabel } })} />
              <Field label="Safety Note" value={config.contact.safetyNote} onChange={(safetyNote) => patch({ contact: { ...config.contact, safetyNote } })} type="textarea" />
            </Section>
          )}

          {tab === "footer" && (
            <Section title="Footer">
              <Field label="Description" value={config.footer.description} onChange={(description) => patch({ footer: { ...config.footer, description } })} type="textarea" />
              <Field label="Copyright" value={config.footer.copyright} onChange={(copyright) => patch({ footer: { ...config.footer, copyright } })} />
            </Section>
          )}
        </section>

        <section style={S.preview}>
          <div style={{ position: "sticky", top: 0, zIndex: 2, padding: 10, background: "#f7fbf9", borderBottom: "1px solid #dce8e2", fontWeight: 900 }}>
            Live Preview
          </div>
          <Pharmacy1Frame page="index.html" title="Shata Pharmacy live preview" compact />
        </section>
      </div>
      <script type="application/json" suppressHydrationWarning>
        {JSON.stringify(PHARMACY1_DEFAULTS)}
      </script>
    </main>
  );
}

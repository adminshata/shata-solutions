"use client";

import StaticAgencyFrame from "../../agencies/StaticAgencyFrame";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { AGENCY2_DEFAULTS } from "../../../../lib/agency2/defaults";
import { useAgency2 } from "../../../../lib/agency2/context";
import type {
  Agency2Config,
  Agency2HeroBanner,
  Agency2HomeSection,
  Agency2ListItem,
  Agency2NavItem,
  Agency2Page,
  Agency2Testimonial,
} from "../../../../lib/agency2/types";

type TabId =
  | "brand"
  | "theme"
  | "header"
  | "home"
  | "hero"
  | "services"
  | "portfolio"
  | "testimonials"
  | "team"
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
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio / Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "team", label: "Team" },
  { id: "blog", label: "Blog" },
  { id: "pages", label: "Pages" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
];

const S: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    color: "#111827",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "18px 24px",
    background: "#111827",
    color: "#fff",
  },
  shell: {
    display: "grid",
    gridTemplateColumns: "240px minmax(360px, 560px) minmax(420px, 1fr)",
    minHeight: "calc(100vh - 74px)",
  },
  sidebar: {
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    padding: 16,
  },
  controls: {
    overflow: "auto",
    maxHeight: "calc(100vh - 74px)",
    padding: 22,
  },
  preview: {
    background: "#050505",
    borderLeft: "1px solid #d1d5db",
    minHeight: "calc(100vh - 74px)",
  },
  panel: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 1px 3px rgba(15,23,42,.05)",
  },
  label: {
    display: "block",
    color: "#374151",
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 7,
  },
  input: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#111827",
    background: "#fff",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: 88,
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#111827",
    background: "#fff",
    boxSizing: "border-box",
    resize: "vertical",
  },
  button: {
    border: 0,
    borderRadius: 8,
    background: "#111827",
    color: "#fff",
    padding: "9px 13px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
  ghost: {
    border: "1px solid #d1d5db",
    borderRadius: 8,
    background: "#fff",
    color: "#374151",
    padding: "8px 11px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
  danger: {
    border: "1px solid #fecaca",
    borderRadius: 8,
    background: "#fff",
    color: "#dc2626",
    padding: "8px 11px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
};

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
    <label style={{ display: "block", marginBottom: 16 }}>
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
        width: 78,
        background: checked ? "#dcfce7" : "#f9fafb",
        color: checked ? "#166534" : "#6b7280",
      }}
    >
      {checked ? "On" : "Off"}
    </button>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={S.panel}>
      <h2 style={{ fontSize: 18, marginBottom: 16 }}>{title}</h2>
      {children}
    </section>
  );
}

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const next = [...items];
  const target = index + direction;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function ItemsManager<T extends { id: string; title?: string; name?: string; label?: string; enabled?: boolean }>({
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
        const update = (value: Partial<T>) => onChange(items.map((current) => (current.id === item.id ? { ...current, ...value } : current)));
        const label = item.title || item.name || item.label || item.id;

        return (
          <div key={item.id} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 10, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, background: "#f9fafb" }}>
              <strong style={{ flex: 1 }}>{label}</strong>
              {"enabled" in item && <Toggle checked={Boolean(item.enabled)} onChange={(enabled) => update({ enabled } as Partial<T>)} />}
              <button type="button" style={S.ghost} onClick={() => onChange(moveItem(items, index, -1))} disabled={index === 0}>
                Up
              </button>
              <button type="button" style={S.ghost} onClick={() => onChange(moveItem(items, index, 1))} disabled={index === items.length - 1}>
                Down
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

function uniqueId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}

const blankListItem = (prefix: string): Agency2ListItem => ({
  id: uniqueId(prefix),
  title: "New Item",
  slug: "new-item",
  description: "Describe this item.",
  image: "/templates/agency2/imgs/home-2/robot.png",
  enabled: true,
});

function ListItemForm({
  item,
  update,
}: {
  item: Agency2ListItem;
  update: (value: Partial<Agency2ListItem>) => void;
}) {
  return (
    <>
      <Field label="Title" value={item.title} onChange={(title) => update({ title })} />
      <Field label="Slug" value={item.slug} onChange={(slug) => update({ slug })} />
      <Field label="Description" value={item.description} onChange={(description) => update({ description })} type="textarea" />
      <Field label="Image" value={item.image} onChange={(image) => update({ image })} />
    </>
  );
}

export default function Agency2Admin() {
  const { config, setConfig, resetConfig } = useAgency2();
  const [active, setActive] = useState<TabId>("brand");

  const updateConfig = (value: Partial<Agency2Config>) => setConfig((current) => ({ ...current, ...value }));

  const renderTab = () => {
    switch (active) {
      case "brand":
        return (
          <Section title="Brand">
            <Field label="Name" value={config.brand.name} onChange={(name) => updateConfig({ brand: { ...config.brand, name } })} />
            <Field label="Tagline" value={config.brand.tagline} onChange={(tagline) => updateConfig({ brand: { ...config.brand, tagline } })} />
            <Field label="Email" value={config.brand.email} onChange={(email) => updateConfig({ brand: { ...config.brand, email } })} />
            <Field label="Phone" value={config.brand.phone} onChange={(phone) => updateConfig({ brand: { ...config.brand, phone } })} />
            <Field label="Address" value={config.brand.address} onChange={(address) => updateConfig({ brand: { ...config.brand, address } })} />
          </Section>
        );
      case "theme":
        return (
          <Section title="Theme">
            <Field label="Primary" value={config.theme.primary} type="color" onChange={(primary) => updateConfig({ theme: { ...config.theme, primary } })} />
            <Field label="Accent" value={config.theme.accent} type="color" onChange={(accent) => updateConfig({ theme: { ...config.theme, accent } })} />
            <Field label="Background" value={config.theme.background} type="color" onChange={(background) => updateConfig({ theme: { ...config.theme, background } })} />
            <Field label="Text" value={config.theme.text} type="color" onChange={(text) => updateConfig({ theme: { ...config.theme, text } })} />
          </Section>
        );
      case "header":
        return (
          <>
            <Section title="Header CTA">
              <Field label="CTA Label" value={config.header.ctaLabel} onChange={(ctaLabel) => updateConfig({ header: { ...config.header, ctaLabel } })} />
              <Field label="CTA Link" value={config.header.ctaHref} onChange={(ctaHref) => updateConfig({ header: { ...config.header, ctaHref } })} />
            </Section>
            <ItemsManager<Agency2NavItem>
              title="Navigation"
              items={config.header.nav}
              onChange={(nav) => updateConfig({ header: { ...config.header, nav } })}
              create={() => ({ id: uniqueId("nav"), label: "New Link", href: "/templates/agency-2/preview", enabled: true })}
              renderForm={(item, update) => (
                <>
                  <Field label="Label" value={item.label} onChange={(label) => update({ label })} />
                  <Field label="Link" value={item.href} onChange={(href) => update({ href })} />
                </>
              )}
            />
          </>
        );
      case "home":
        return (
          <ItemsManager<Agency2HomeSection>
            title="Home Sections"
            items={config.homeSections}
            onChange={(homeSections) => updateConfig({ homeSections })}
            create={() => ({ id: uniqueId("section"), title: "Custom Section", type: "custom", enabled: true, content: "New home section content." })}
            renderForm={(item, update) => (
              <>
                <Field label="Title" value={item.title} onChange={(title) => update({ title })} />
                <Field label="Type" value={item.type} onChange={(type) => update({ type })} />
                <Field label="Content" value={item.content} onChange={(content) => update({ content })} type="textarea" />
              </>
            )}
          />
        );
      case "hero":
        return (
          <ItemsManager<Agency2HeroBanner>
            title="Hero / Banners"
            items={config.heroBanners}
            onChange={(heroBanners) => updateConfig({ heroBanners })}
            create={() => ({
              id: uniqueId("hero"),
              eyebrow: "New banner",
              title: "New AI Robotics Banner",
              subtitle: "Describe the banner.",
              image: "/templates/agency2/imgs/home-2/robot.png",
              enabled: true,
            })}
            renderForm={(item, update) => (
              <>
                <Field label="Eyebrow" value={item.eyebrow} onChange={(eyebrow) => update({ eyebrow })} />
                <Field label="Title" value={item.title} onChange={(title) => update({ title })} />
                <Field label="Subtitle" value={item.subtitle} onChange={(subtitle) => update({ subtitle })} type="textarea" />
                <Field label="Image" value={item.image} onChange={(image) => update({ image })} />
              </>
            )}
          />
        );
      case "services":
        return <ItemsManager title="Services" items={config.services} onChange={(services) => updateConfig({ services })} create={() => blankListItem("service")} renderForm={(item, update) => <ListItemForm item={item} update={update} />} />;
      case "portfolio":
        return <ItemsManager title="Portfolio / Projects" items={config.portfolio} onChange={(portfolio) => updateConfig({ portfolio })} create={() => blankListItem("project")} renderForm={(item, update) => <ListItemForm item={item} update={update} />} />;
      case "testimonials":
        return (
          <ItemsManager<Agency2Testimonial>
            title="Testimonials"
            items={config.testimonials}
            onChange={(testimonials) => updateConfig({ testimonials })}
            create={() => ({ id: uniqueId("testimonial"), name: "New Client", role: "Client Role", quote: "Add the testimonial quote.", image: "/templates/agency2/imgs/home-2/testimonial/client-1.png", enabled: true })}
            renderForm={(item, update) => (
              <>
                <Field label="Name" value={item.name} onChange={(name) => update({ name })} />
                <Field label="Role" value={item.role} onChange={(role) => update({ role })} />
                <Field label="Quote" value={item.quote} onChange={(quote) => update({ quote })} type="textarea" />
                <Field label="Image" value={item.image} onChange={(image) => update({ image })} />
              </>
            )}
          />
        );
      case "team":
        return <ItemsManager title="Team" items={config.team} onChange={(team) => updateConfig({ team })} create={() => blankListItem("team")} renderForm={(item, update) => <ListItemForm item={item} update={update} />} />;
      case "blog":
        return <ItemsManager title="Blog Posts" items={config.blog} onChange={(blog) => updateConfig({ blog })} create={() => blankListItem("post")} renderForm={(item, update) => <ListItemForm item={item} update={update} />} />;
      case "pages":
        return (
          <ItemsManager<Agency2Page>
            title="Pages"
            items={config.pages}
            onChange={(pages) => updateConfig({ pages })}
            create={() => ({ id: uniqueId("page"), title: "Custom Page", slug: "custom-page", content: "New custom page content.", enabled: true })}
            renderForm={(item, update) => (
              <>
                <Field label="Title" value={item.title} onChange={(title) => update({ title })} />
                <Field label="Slug" value={item.slug} onChange={(slug) => update({ slug })} />
                <Field label="Content" value={item.content} onChange={(content) => update({ content })} type="textarea" />
              </>
            )}
          />
        );
      case "contact":
        return (
          <Section title="Contact">
            <Field label="Heading" value={config.contact.heading} onChange={(heading) => updateConfig({ contact: { ...config.contact, heading } })} />
            <Field label="Form Title" value={config.contact.formTitle} onChange={(formTitle) => updateConfig({ contact: { ...config.contact, formTitle } })} />
            <Field label="Map Label" value={config.contact.mapLabel} onChange={(mapLabel) => updateConfig({ contact: { ...config.contact, mapLabel } })} />
          </Section>
        );
      case "footer":
        return (
          <Section title="Footer">
            <Field label="Description" value={config.footer.description} onChange={(description) => updateConfig({ footer: { ...config.footer, description } })} type="textarea" />
            <Field label="Copyright" value={config.footer.copyright} onChange={(copyright) => updateConfig({ footer: { ...config.footer, copyright } })} />
          </Section>
        );
    }
  };

  return (
    <main style={S.page}>
      <header style={S.topbar}>
        <div>
          <h1 style={{ fontSize: 20, margin: 0 }}>Shata AI Robotics Editor</h1>
          <p style={{ margin: "4px 0 0", color: "#cbd5e1", fontSize: 13 }}>Drafts save automatically in localStorage.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" style={{ ...S.ghost, background: "#fff" }} onClick={() => setConfig(AGENCY2_DEFAULTS)}>
            Load Defaults
          </button>
          <button type="button" style={{ ...S.danger, background: "#fff" }} onClick={resetConfig}>
            Reset Draft
          </button>
        </div>
      </header>

      <div style={S.shell}>
        <aside style={S.sidebar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              style={{
                width: "100%",
                textAlign: "left",
                border: 0,
                borderRadius: 8,
                padding: "11px 12px",
                marginBottom: 6,
                cursor: "pointer",
                background: active === tab.id ? "#111827" : "transparent",
                color: active === tab.id ? "#fff" : "#374151",
                fontWeight: 700,
              }}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        <section style={S.controls}>{renderTab()}</section>

        <section style={S.preview}>
          <StaticAgencyFrame agencyNumber={2} page="ai-robotic.html" title="Shata AI Robotics live preview" />
        </section>
      </div>
    </main>
  );
}

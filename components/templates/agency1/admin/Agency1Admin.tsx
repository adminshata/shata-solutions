"use client";

import { useEffect, useRef, useState } from "react";
import { AGENCY1_DEFAULTS, AGENCY1_STORAGE_KEY } from "@/lib/agency1/defaults";
import type {
  Agency1Config,
  BlogPost,
  HomeSection,
  NavItem,
  PageItem,
  PortfolioItem,
  ServiceItem,
  TeamMember,
  TestimonialItem,
} from "@/lib/agency1/types";

/* ── Shared style helpers ─────────────────────────────────── */
const S = {
  panel: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    padding: "28px 32px",
    marginBottom: 20,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  } as React.CSSProperties,
  label: {
    display: "block",
    fontWeight: 700,
    fontSize: 13,
    color: "#374151",
    marginBottom: 7,
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    background: "#fff",
    color: "#111827",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  textarea: {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    background: "#fff",
    color: "#111827",
    resize: "vertical" as const,
    minHeight: 90,
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  btn: {
    padding: "9px 18px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  } as React.CSSProperties,
  btnDanger: {
    padding: "7px 14px",
    background: "#fff",
    color: "#dc2626",
    border: "1px solid #fca5a5",
    borderRadius: 7,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
  } as React.CSSProperties,
  btnSecondary: {
    padding: "7px 14px",
    background: "#fff",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: 7,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
  } as React.CSSProperties,
  sectionTitle: {
    fontWeight: 800,
    fontSize: 22,
    color: "#111827",
    marginBottom: 6,
  } as React.CSSProperties,
  sectionHelper: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
    lineHeight: 1.6,
  } as React.CSSProperties,
};

/* ── Re-usable field components ───────────────────────────── */
function F({ label, value, onChange, type = "text", rows = 3 }: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  rows?: number;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={S.label}>{label}</label>
      {type === "textarea" ? (
        <textarea rows={rows} value={String(value)} onChange={(e) => onChange(e.target.value)} style={S.textarea} />
      ) : type === "color" ? (
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="color" value={String(value)} onChange={(e) => onChange(e.target.value)}
            style={{ width: 44, height: 40, border: "1px solid #d1d5db", borderRadius: 6, cursor: "pointer", padding: 2 }} />
          <input type="text" value={String(value)} onChange={(e) => onChange(e.target.value)} style={{ ...S.input, flex: 1 }} />
        </div>
      ) : (
        <input type={type} value={String(value)} onChange={(e) => onChange(e.target.value)} style={S.input} />
      )}
    </div>
  );
}

function FGrid({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "0 24px" }}>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid #f3f4f6" }}>
      <span style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{ width: 46, height: 25, borderRadius: 13, background: checked ? "#111827" : "#d1d5db", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}
      >
        <span style={{ position: "absolute", top: 3, left: checked ? 23 : 3, width: 19, height: 19, background: "#fff", borderRadius: "50%", transition: "left 0.2s", display: "block" }} />
      </button>
    </div>
  );
}

function Panel({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={S.panel}>
      {title && <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 18, color: "#111827" }}>{title}</h3>}
      {children}
    </div>
  );
}

/* ── List Manager (generic Add/Edit/Delete/Reorder) ───────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ListItem = Record<string, any>;

function ListManager<T extends ListItem>({
  title,
  items,
  onChange,
  blank,
  renderForm,
  renderRow,
}: {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  blank: () => T;
  renderForm: (item: T, update: (delta: Partial<T>) => void) => React.ReactNode;
  renderRow: (item: T) => React.ReactNode;
}) {
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState<T | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const startAdd = () => {
    setNewItem(blank());
    setAdding(true);
    setEditingIdx(null);
  };

  const cancelAdd = () => {
    setAdding(false);
    setNewItem(null);
  };

  const confirmAdd = () => {
    if (!newItem) return;
    onChange([...items, newItem]);
    setAdding(false);
    setNewItem(null);
  };

  const startEdit = (idx: number) => {
    setEditingIdx(idx);
    setAdding(false);
    setNewItem(null);
  };

  const cancelEdit = () => setEditingIdx(null);

  const updateEdit = (idx: number, delta: Partial<T>) => {
    const updated = items.map((it, i) => i === idx ? { ...it, ...delta } : it);
    onChange(updated);
  };

  const del = (idx: number) => {
    if (!window.confirm("Delete this item?")) return;
    onChange(items.filter((_, i) => i !== idx));
    if (editingIdx === idx) setEditingIdx(null);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...items];
    const target = idx + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    onChange(arr);
  };

  return (
    <Panel>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>{title}</h3>
        {!adding && (
          <button onClick={startAdd} style={S.btn}>+ Add New</button>
        )}
      </div>

      {/* Add form */}
      {adding && newItem && (
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: 20, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#166534", marginBottom: 14 }}>New Item</div>
          {renderForm(newItem, (delta) => setNewItem((prev) => prev ? { ...prev, ...delta } : null))}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button onClick={confirmAdd} style={S.btn}>Add Item</button>
            <button onClick={cancelAdd} style={S.btnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      {items.length === 0 && (
        <p style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", padding: "24px 0" }}>No items yet. Click &ldquo;+ Add New&rdquo; to create one.</p>
      )}

      {items.map((item, idx) => (
        <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 10, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#f9fafb" }}>
            <div style={{ flex: 1, minWidth: 0 }}>{renderRow(item)}</div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 12 }}>
              <button onClick={() => move(idx, -1)} disabled={idx === 0} style={{ ...S.btnSecondary, opacity: idx === 0 ? 0.4 : 1 }}>↑</button>
              <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} style={{ ...S.btnSecondary, opacity: idx === items.length - 1 ? 0.4 : 1 }}>↓</button>
              <button onClick={() => editingIdx === idx ? cancelEdit() : startEdit(idx)} style={S.btnSecondary}>
                {editingIdx === idx ? "Close" : "Edit"}
              </button>
              <button onClick={() => del(idx)} style={S.btnDanger}>Delete</button>
            </div>
          </div>
          {editingIdx === idx && (
            <div style={{ padding: "16px 16px 8px" }}>
              {renderForm(item, (delta) => updateEdit(idx, delta))}
            </div>
          )}
        </div>
      ))}
    </Panel>
  );
}

/* ── Tab definitions ──────────────────────────────────────── */
type Tab = "brand" | "theme" | "header" | "home" | "hero" | "services" | "portfolio" | "testimonials" | "team" | "blog" | "pages" | "contact" | "footer";

const TABS: { id: Tab; label: string; helper: string }[] = [
  { id: "brand", label: "Brand", helper: "Agency name, tagline, contact info, and stats." },
  { id: "theme", label: "Theme", helper: "Colors and typography settings." },
  { id: "header", label: "Header / Navigation", helper: "Sticky header, CTA button, and contact sidebar." },
  { id: "home", label: "Home Sections", helper: "Show, hide, and reorder homepage sections." },
  { id: "hero", label: "Hero / Banner", helper: "Hero title, badge, video URL, and slides." },
  { id: "services", label: "Services", helper: "Add, edit, delete, and reorder services." },
  { id: "portfolio", label: "Portfolio / Projects", helper: "Manage portfolio items and project details." },
  { id: "testimonials", label: "Testimonials", helper: "Client quotes, names, and roles." },
  { id: "team", label: "Team", helper: "Team member profiles and social links." },
  { id: "blog", label: "Blog", helper: "Blog posts, categories, authors, and images." },
  { id: "pages", label: "Pages", helper: "Manage site pages, add new pages with custom slugs." },
  { id: "contact", label: "Contact", helper: "Contact page content and form settings." },
  { id: "footer", label: "Footer", helper: "Footer text, marquee, and social links." },
];

/* ── Tab panel renderers ──────────────────────────────────── */
function BrandTab({ config, patch }: EditorProps) {
  const b = config.brand;
  const p = (k: keyof typeof b) => (v: string) => patch({ brand: { ...b, [k]: v } });
  return (
    <>
      <Panel title="Agency Identity">
        <FGrid>
          <F label="Agency Name" value={b.name} onChange={p("name")} />
          <F label="Tagline" value={b.tagline} onChange={p("tagline")} />
          <F label="Email Address" value={b.email} onChange={p("email")} type="email" />
          <F label="Phone Number" value={b.phone} onChange={p("phone")} />
          <div style={{ gridColumn: "1/-1" }}>
            <F label="Office Address" value={b.address} onChange={p("address")} />
          </div>
          <F label="Founded Year" value={b.founded} onChange={p("founded")} />
        </FGrid>
      </Panel>
      <Panel title="Stats Display">
        <FGrid>
          <F label="Years of Excellence" value={b.yearsOfExcellence} onChange={(v) => patch({ brand: { ...b, yearsOfExcellence: parseInt(v) || 0 } })} type="number" />
          <F label="Clients Count" value={b.clientsCount} onChange={p("clientsCount")} />
          <F label="Projects Count" value={b.projectsCount} onChange={p("projectsCount")} />
          <F label="Team Count" value={b.teamCount} onChange={p("teamCount")} />
        </FGrid>
      </Panel>
    </>
  );
}

function ThemeTab({ config, patch }: EditorProps) {
  const t = config.theme;
  return (
    <Panel title="Colors & Typography">
      <FGrid>
        <F label="Primary Accent Color" value={t.accentColor} onChange={(v) => patch({ theme: { ...t, accentColor: v } })} type="color" />
        <F label="Background Color" value={t.bgColor} onChange={(v) => patch({ theme: { ...t, bgColor: v } })} type="color" />
        <F label="Dark Background" value={t.darkColor} onChange={(v) => patch({ theme: { ...t, darkColor: v } })} type="color" />
        <F label="Primary Text Color" value={t.textColor} onChange={(v) => patch({ theme: { ...t, textColor: v } })} type="color" />
        <F label="Secondary Text Color" value={t.secondaryTextColor} onChange={(v) => patch({ theme: { ...t, secondaryTextColor: v } })} type="color" />
      </FGrid>
    </Panel>
  );
}

function HeaderTab({ config, patch }: EditorProps) {
  const h = config.header;
  return (
    <>
      <Panel title="Behaviour">
        <Toggle label="Sticky Header" checked={h.stickyHeader} onChange={(v) => patch({ header: { ...h, stickyHeader: v } })} />
        <Toggle label="Show Get In Touch Button" checked={h.showGetInTouchBtn} onChange={(v) => patch({ header: { ...h, showGetInTouchBtn: v } })} />
      </Panel>
      <Panel title="CTA Button">
        <FGrid>
          <F label="Button Label" value={h.ctaLabel} onChange={(v) => patch({ header: { ...h, ctaLabel: v } })} />
          <F label="Button Link" value={h.ctaLink} onChange={(v) => patch({ header: { ...h, ctaLink: v } })} />
        </FGrid>
      </Panel>
      <Panel title="Sidebar Contact Info">
        <F label="Address" value={h.address} onChange={(v) => patch({ header: { ...h, address: v } })} />
        <FGrid>
          <F label="Email" value={h.email} onChange={(v) => patch({ header: { ...h, email: v } })} type="email" />
          <F label="Phone" value={h.phone} onChange={(v) => patch({ header: { ...h, phone: v } })} />
        </FGrid>
      </Panel>
      <ListManager<NavItem>
        title="Navigation Items"
        items={config.navItems}
        onChange={(navItems) => patch({ navItems })}
        blank={() => ({ label: "New Page", href: "/templates/agency-1/preview/" })}
        renderRow={(item) => (
          <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.label} <span style={{ color: "#9ca3af", fontWeight: 400 }}>{item.href}</span>
          </div>
        )}
        renderForm={(item, update) => (
          <FGrid>
            <F label="Label" value={item.label} onChange={(v) => update({ label: v })} />
            <F label="Link (href)" value={item.href} onChange={(v) => update({ href: v })} />
          </FGrid>
        )}
      />
    </>
  );
}

function HomeSectionsTab({ config, patch }: EditorProps) {
  const sections = config.homeSections;

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...sections];
    const target = idx + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    patch({ homeSections: arr });
  };

  const toggle = (idx: number) => {
    patch({ homeSections: sections.map((s, i) => i === idx ? { ...s, enabled: !s.enabled } : s) });
  };

  const addSection = () => {
    const label = window.prompt("Section label:");
    if (!label) return;
    const id = label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    patch({ homeSections: [...sections, { id, label, enabled: true }] });
  };

  return (
    <Panel>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>Homepage Sections</h3>
        <button onClick={addSection} style={S.btn}>+ Add Section</button>
      </div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Toggle visibility and reorder sections that appear on the homepage.</p>
      {sections.map((sec: HomeSection, idx) => (
        <div key={sec.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <button onClick={() => move(idx, -1)} disabled={idx === 0} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, color: idx === 0 ? "#d1d5db" : "#6b7280", lineHeight: 1 }}>▲</button>
              <button onClick={() => move(idx, 1)} disabled={idx === sections.length - 1} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, color: idx === sections.length - 1 ? "#d1d5db" : "#6b7280", lineHeight: 1 }}>▼</button>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: sec.enabled ? "#111827" : "#9ca3af" }}>{sec.label}</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>id: {sec.id}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={() => toggle(idx)}
              style={{ width: 46, height: 25, borderRadius: 13, background: sec.enabled ? "#111827" : "#d1d5db", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}
            >
              <span style={{ position: "absolute", top: 3, left: sec.enabled ? 23 : 3, width: 19, height: 19, background: "#fff", borderRadius: "50%", transition: "left 0.2s", display: "block" }} />
            </button>
            <button onClick={() => {
              if (!window.confirm("Remove section?")) return;
              patch({ homeSections: sections.filter((_, i) => i !== idx) });
            }} style={{ ...S.btnDanger, padding: "4px 10px", fontSize: 11 }}>×</button>
          </div>
        </div>
      ))}
    </Panel>
  );
}

function HeroTab({ config, patch }: EditorProps) {
  const h = config.hero;
  return (
    <>
      <Panel title="Hero Content">
        <F label="Hero Title" value={h.title} onChange={(v) => patch({ hero: { ...h, title: v } })} type="textarea" rows={2} />
        <FGrid>
          <F label="Years Badge Number" value={h.yearsBadge} onChange={(v) => patch({ hero: { ...h, yearsBadge: parseInt(v) || 0 } })} type="number" />
          <F label="Years Badge Label" value={h.yearsBadgeLabel} onChange={(v) => patch({ hero: { ...h, yearsBadgeLabel: v } })} />
          <F label="Clients Label" value={h.clientsLabel} onChange={(v) => patch({ hero: { ...h, clientsLabel: v } })} />
          <F label="Video Embed URL" value={h.videoUrl} onChange={(v) => patch({ hero: { ...h, videoUrl: v } })} />
        </FGrid>
      </Panel>
      <ListManager
        title="Hero Slides"
        items={h.slides}
        onChange={(slides) => patch({ hero: { ...h, slides } })}
        blank={() => ({ image: "/templates/agency1/imgs/hero/hero-img-1.png" })}
        renderRow={(item) => (
          <div style={{ fontWeight: 500, fontSize: 13, color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.image}
          </div>
        )}
        renderForm={(item, update) => (
          <F label="Image Path" value={item.image} onChange={(v) => update({ image: v })} />
        )}
      />
    </>
  );
}

function ServicesTab({ config, patch }: EditorProps) {
  return (
    <ListManager<ServiceItem>
      title="Services"
      items={config.services}
      onChange={(services) => patch({ services })}
      blank={() => ({
        id: `service-${Date.now()}`,
        number: `0${config.services.length + 1}.`,
        title: "New Service",
        description: "Service description goes here.",
        icon: "/templates/agency1/imgs/icon/service-icon-1.png",
        image: "/templates/agency1/imgs/inner/service-details/service-3_01.jpg",
        slug: `new-service-${Date.now()}`,
      })}
      renderRow={(item) => (
        <div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{item.number} {item.title}</span>
          <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 10 }}>/{item.slug}</span>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <FGrid>
            <F label="Number" value={item.number} onChange={(v) => update({ number: v })} />
            <F label="Slug" value={item.slug} onChange={(v) => update({ slug: v, id: v })} />
            <div style={{ gridColumn: "1/-1" }}>
              <F label="Title" value={item.title} onChange={(v) => update({ title: v })} />
            </div>
          </FGrid>
          <F label="Description" value={item.description} onChange={(v) => update({ description: v })} type="textarea" />
          <FGrid>
            <F label="Icon Image Path" value={item.icon} onChange={(v) => update({ icon: v })} />
            <F label="Feature Image Path" value={item.image} onChange={(v) => update({ image: v })} />
          </FGrid>
        </>
      )}
    />
  );
}

function PortfolioTab({ config, patch }: EditorProps) {
  return (
    <ListManager<PortfolioItem>
      title="Portfolio / Projects"
      items={config.portfolio}
      onChange={(portfolio) => patch({ portfolio })}
      blank={() => ({
        id: `project-${Date.now()}`,
        slug: `new-project-${Date.now()}`,
        category: "AI Consulting",
        title: "New Project",
        description: "Project description here.",
        year: "2025",
        image: "/templates/agency1/imgs/project/project-img-1.jpg",
        tags: [],
      })}
      renderRow={(item) => (
        <div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{item.title}</span>
          <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 10 }}>{item.category} · {item.year}</span>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <FGrid>
            <F label="Title" value={item.title} onChange={(v) => update({ title: v })} />
            <F label="Category" value={item.category} onChange={(v) => update({ category: v })} />
            <F label="Slug" value={item.slug} onChange={(v) => update({ slug: v, id: v })} />
            <F label="Year" value={item.year} onChange={(v) => update({ year: v })} />
          </FGrid>
          <F label="Description" value={item.description} onChange={(v) => update({ description: v })} type="textarea" />
          <F label="Image Path" value={item.image} onChange={(v) => update({ image: v })} />
          <F label="Tags (comma-separated)" value={item.tags.join(", ")} onChange={(v) => update({ tags: v.split(",").map((t) => t.trim()).filter(Boolean) })} />
        </>
      )}
    />
  );
}

function TestimonialsTab({ config, patch }: EditorProps) {
  return (
    <ListManager<TestimonialItem>
      title="Testimonials"
      items={config.testimonials}
      onChange={(testimonials) => patch({ testimonials })}
      blank={() => ({
        id: Date.now(),
        quote: "Add client quote here.",
        author: "Client Name",
        role: "Title, Company",
        avatar: "/templates/agency1/imgs/testimonials/testimonials-author-img-1.png",
      })}
      renderRow={(item) => (
        <div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{item.author}</span>
          <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 10 }}>{item.role}</span>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <F label="Quote" value={item.quote} onChange={(v) => update({ quote: v })} type="textarea" />
          <FGrid>
            <F label="Author Name" value={item.author} onChange={(v) => update({ author: v })} />
            <F label="Role / Company" value={item.role} onChange={(v) => update({ role: v })} />
            <div style={{ gridColumn: "1/-1" }}>
              <F label="Avatar Image Path" value={item.avatar} onChange={(v) => update({ avatar: v })} />
            </div>
          </FGrid>
        </>
      )}
    />
  );
}

function TeamTab({ config, patch }: EditorProps) {
  return (
    <ListManager<TeamMember>
      title="Team Members"
      items={config.team}
      onChange={(team) => patch({ team })}
      blank={() => ({
        id: Date.now(),
        slug: `team-member-${Date.now()}`,
        name: "Team Member Name",
        role: "Role / Title",
        bio: "Short bio here.",
        image: "/templates/agency1/imgs/inner/team/team-thumb1_1.jpg",
        social: { twitter: "#", linkedin: "#", github: "#" },
      })}
      renderRow={(item) => (
        <div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{item.name}</span>
          <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 10 }}>{item.role}</span>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <FGrid>
            <F label="Name" value={item.name} onChange={(v) => update({ name: v })} />
            <F label="Role / Title" value={item.role} onChange={(v) => update({ role: v })} />
            <F label="Slug" value={item.slug} onChange={(v) => update({ slug: v })} />
            <F label="Image Path" value={item.image} onChange={(v) => update({ image: v })} />
          </FGrid>
          <F label="Bio" value={item.bio} onChange={(v) => update({ bio: v })} type="textarea" />
          <FGrid cols={3}>
            <F label="Twitter URL" value={item.social.twitter} onChange={(v) => update({ social: { ...item.social, twitter: v } })} />
            <F label="LinkedIn URL" value={item.social.linkedin} onChange={(v) => update({ social: { ...item.social, linkedin: v } })} />
            <F label="GitHub URL" value={item.social.github} onChange={(v) => update({ social: { ...item.social, github: v } })} />
          </FGrid>
        </>
      )}
    />
  );
}

function BlogTab({ config, patch }: EditorProps) {
  return (
    <ListManager<BlogPost>
      title="Blog Posts"
      items={config.blog}
      onChange={(blog) => patch({ blog })}
      blank={() => ({
        id: Date.now(),
        slug: `new-post-${Date.now()}`,
        title: "New Blog Post",
        excerpt: "Short excerpt here.",
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        author: "Author Name",
        authorImage: "/templates/agency1/imgs/inner/blog-details/blog-details-mentor1_1.png",
        category: "AI Trends",
        image: "/templates/agency1/imgs/blog/blog.jpg",
        content: "Full post content here.",
      })}
      renderRow={(item) => (
        <div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 500 }}>{item.title}</span>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{item.author} · {item.date} · {item.category}</span>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <div style={{ gridColumn: "1/-1" }}>
            <F label="Title" value={item.title} onChange={(v) => update({ title: v })} />
          </div>
          <FGrid>
            <F label="Slug" value={item.slug} onChange={(v) => update({ slug: v })} />
            <F label="Category" value={item.category} onChange={(v) => update({ category: v })} />
            <F label="Author" value={item.author} onChange={(v) => update({ author: v })} />
            <F label="Date" value={item.date} onChange={(v) => update({ date: v })} />
          </FGrid>
          <F label="Excerpt" value={item.excerpt} onChange={(v) => update({ excerpt: v })} type="textarea" />
          <F label="Content" value={item.content} onChange={(v) => update({ content: v })} type="textarea" rows={5} />
          <FGrid>
            <F label="Cover Image Path" value={item.image} onChange={(v) => update({ image: v })} />
            <F label="Author Image Path" value={item.authorImage} onChange={(v) => update({ authorImage: v })} />
          </FGrid>
        </>
      )}
    />
  );
}

function PagesTab({ config, patch }: EditorProps) {
  return (
    <ListManager<PageItem>
      title="Site Pages"
      items={config.pages}
      onChange={(pages) => patch({ pages })}
      blank={() => ({
        page: "New Page",
        path: "/templates/agency-1/preview/new-page",
        slug: "new-page",
        enabled: true,
      })}
      renderRow={(item) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            display: "inline-block", width: 8, height: 8, borderRadius: "50%",
            background: item.enabled ? "#22c55e" : "#d1d5db", flexShrink: 0
          }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{item.page}</span>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{item.path}</span>
          <a href={item.path} target="_blank" rel="noreferrer"
            style={{ marginLeft: "auto", fontSize: 11, color: "#6b7280", textDecoration: "none", flexShrink: 0 }}>
            Preview ↗
          </a>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <FGrid>
            <F label="Page Name" value={item.page} onChange={(v) => update({ page: v })} />
            <F label="Slug (URL path segment)" value={item.slug} onChange={(v) => update({ slug: v, path: `/templates/agency-1/preview/${v}` })} />
            <div style={{ gridColumn: "1/-1" }}>
              <F label="Full Path" value={item.path} onChange={(v) => update({ path: v })} />
            </div>
          </FGrid>
          <Toggle label="Page Enabled" checked={item.enabled} onChange={(v) => update({ enabled: v })} />
        </>
      )}
    />
  );
}

function ContactTab({ config, patch }: EditorProps) {
  const f = config.footer;
  return (
    <>
      <Panel title="Contact Details">
        <F label="Office Address" value={f.address} onChange={(v) => patch({ footer: { ...f, address: v } })} />
        <FGrid>
          <F label="Email Address" value={f.email} onChange={(v) => patch({ footer: { ...f, email: v } })} type="email" />
          <F label="Phone Number" value={f.phone} onChange={(v) => patch({ footer: { ...f, phone: v } })} />
        </FGrid>
      </Panel>
      <Panel title="Contact Page Text">
        <F label="Page Title" value="Let's Start a Conversation" onChange={() => {}} />
        <F label="Intro Text" value="Tell us about your project and we'll get back to you within 24 hours. No sales pressure — just an honest conversation about what AI can do for your business." onChange={() => {}} type="textarea" />
        <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#92400e", marginTop: 12 }}>
          Contact page text changes will take effect on the next full deployment. Use the fields above to update stored config.
        </div>
      </Panel>
    </>
  );
}

function FooterTab({ config, patch }: EditorProps) {
  const f = config.footer;
  const s = f.social;
  return (
    <>
      <Panel title="Footer Content">
        <F label="Footer Tagline" value={f.tagline} onChange={(v) => patch({ footer: { ...f, tagline: v } })} type="textarea" rows={2} />
        <FGrid>
          <F label="Copyright Text" value={f.copyright} onChange={(v) => patch({ footer: { ...f, copyright: v } })} />
          <F label="Marquee Text" value={f.marqueeText} onChange={(v) => patch({ footer: { ...f, marqueeText: v } })} />
        </FGrid>
      </Panel>
      <Panel title="Social Links">
        <FGrid>
          <F label="Facebook URL" value={s.facebook} onChange={(v) => patch({ footer: { ...f, social: { ...s, facebook: v } } })} />
          <F label="Twitter URL" value={s.twitter} onChange={(v) => patch({ footer: { ...f, social: { ...s, twitter: v } } })} />
          <F label="LinkedIn URL" value={s.linkedin} onChange={(v) => patch({ footer: { ...f, social: { ...s, linkedin: v } } })} />
          <F label="YouTube URL" value={s.youtube} onChange={(v) => patch({ footer: { ...f, social: { ...s, youtube: v } } })} />
          <F label="Vimeo URL" value={s.vimeo} onChange={(v) => patch({ footer: { ...f, social: { ...s, vimeo: v } } })} />
        </FGrid>
      </Panel>
    </>
  );
}

/* ── Editor props type ────────────────────────────────────── */
interface EditorProps {
  config: Agency1Config;
  patch: (delta: Partial<Agency1Config>) => void;
}

/* ── Main Admin Component ─────────────────────────────────── */
export default function Agency1Admin() {
  const [config, setConfig] = useState<Agency1Config>(AGENCY1_DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>("brand");
  const [savedMsg, setSavedMsg] = useState("Draft ready");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(AGENCY1_STORAGE_KEY);
      if (raw) setConfig(JSON.parse(raw) as Agency1Config);
    } catch {
      window.localStorage.removeItem(AGENCY1_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(AGENCY1_STORAGE_KEY, JSON.stringify(config));
        setSavedMsg("Draft saved");
      } catch {
        setSavedMsg("Could not save");
      }
    }, 500);
  }, [config]);

  function patch(delta: Partial<Agency1Config>) {
    setConfig((prev) => ({ ...prev, ...delta }));
    setSavedMsg("Saving...");
  }

  function reset() {
    if (!window.confirm("Reset all settings to defaults? This cannot be undone.")) return;
    setConfig(AGENCY1_DEFAULTS);
    window.localStorage.removeItem(AGENCY1_STORAGE_KEY);
    setSavedMsg("Reset to defaults");
  }

  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", background: "#f5f7fb" }}>
      {/* Sidebar */}
      <aside style={{ width: 280, background: "#111827", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
        <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontWeight: 900, fontSize: 17, color: "#fff", marginBottom: 2 }}>
            Shata<span style={{ color: "#F14F44" }}>.</span>Agency
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Template Editor</div>
        </div>

        <nav style={{ flex: 1, padding: "10px 0", overflowY: "auto" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: "100%",
                padding: "12px 20px",
                display: "block",
                textAlign: "left",
                background: activeTab === tab.id ? "rgba(255,255,255,0.08)" : "transparent",
                border: "none",
                borderLeft: activeTab === tab.id ? "3px solid #F14F44" : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span style={{ display: "block", fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>
                {tab.label}
              </span>
              <span style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 3, lineHeight: 1.4 }}>
                {tab.helper}
              </span>
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <a href="/templates/agency-1/preview" target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.55)", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
            <span>↗</span> Open Preview
          </a>
        </div>
      </aside>

      {/* Main panel */}
      <main style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{ background: "#fff", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#111827" }}>{active.label}</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{active.helper}</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#6b7280", border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 12px" }}>
              {savedMsg}
            </span>
            <button onClick={reset} style={{ ...S.btnSecondary, padding: "9px 16px", fontSize: 13 }}>
              Reset to Defaults
            </button>
            <a href="/templates/agency-1/preview" target="_blank" rel="noreferrer"
              style={{ ...S.btnSecondary, padding: "9px 16px", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              Preview ↗
            </a>
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, padding: "32px 32px 64px", maxWidth: 900 }}>
          {activeTab === "brand" && <BrandTab config={config} patch={patch} />}
          {activeTab === "theme" && <ThemeTab config={config} patch={patch} />}
          {activeTab === "header" && <HeaderTab config={config} patch={patch} />}
          {activeTab === "home" && <HomeSectionsTab config={config} patch={patch} />}
          {activeTab === "hero" && <HeroTab config={config} patch={patch} />}
          {activeTab === "services" && <ServicesTab config={config} patch={patch} />}
          {activeTab === "portfolio" && <PortfolioTab config={config} patch={patch} />}
          {activeTab === "testimonials" && <TestimonialsTab config={config} patch={patch} />}
          {activeTab === "team" && <TeamTab config={config} patch={patch} />}
          {activeTab === "blog" && <BlogTab config={config} patch={patch} />}
          {activeTab === "pages" && <PagesTab config={config} patch={patch} />}
          {activeTab === "contact" && <ContactTab config={config} patch={patch} />}
          {activeTab === "footer" && <FooterTab config={config} patch={patch} />}
        </div>
      </main>
    </div>
  );
}

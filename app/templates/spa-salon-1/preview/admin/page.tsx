"use client";
// app/templates/spa-salon-1/preview/admin/page.tsx
import { useState } from "react";
import { useSpaSalon1 } from "@/lib/spaSalon1/context";
import type {
  SpaSalon1Config,
  SpaService,
  SpaTeamMember,
  SpaGalleryImage,
  SpaTestimonial,
  SpaBlogPost,
  SpaPricingCategory,
  SpaHeroSlide,
  SpaHomeSection,
  SpaCustomPage,
} from "@/lib/spaSalon1/types";

// ─────────── helpers ───────────
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const TABS = [
  "Brand",
  "Theme",
  "Header / Navigation",
  "Home Sections",
  "Hero / Banners",
  "Services",
  "Pricing",
  "Team",
  "Gallery",
  "Testimonials",
  "Blog",
  "Pages",
  "Appointment",
  "Contact",
  "Footer",
] as const;

type Tab = (typeof TABS)[number];

// ─────────── field components ───────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-300"
    />
  );
}

function TextArea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-300 resize-y"
    />
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full transition-colors relative ${value ? "bg-pink-400" : "bg-gray-200"}`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

function Btn({
  children,
  onClick,
  variant = "default",
  small,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger" | "ghost";
  small?: boolean;
}) {
  const base = "rounded-lg font-medium transition-colors " + (small ? "text-xs px-2 py-1" : "text-sm px-4 py-2");
  const cls =
    variant === "danger"
      ? base + " bg-red-50 text-red-500 hover:bg-red-100"
      : variant === "ghost"
      ? base + " bg-gray-50 text-gray-600 hover:bg-gray-100"
      : base + " bg-pink-400 text-white hover:bg-pink-500";
  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

// ─────────── tab panels ───────────
function BrandTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const b = config.brand;
  const set = (k: keyof typeof b, v: string) => upd({ brand: { ...b, [k]: v } });
  return (
    <div className="space-y-0">
      <Field label="Business Name"><Input value={b.name} onChange={(v) => set("name", v)} /></Field>
      <Field label="Tagline"><Input value={b.tagline} onChange={(v) => set("tagline", v)} /></Field>
      <Field label="Email"><Input value={b.email} onChange={(v) => set("email", v)} type="email" /></Field>
      <Field label="Phone"><Input value={b.phone} onChange={(v) => set("phone", v)} /></Field>
      <Field label="Address"><Input value={b.address} onChange={(v) => set("address", v)} /></Field>
      <Field label="City"><Input value={b.city} onChange={(v) => set("city", v)} /></Field>
      <Field label="Country"><Input value={b.country} onChange={(v) => set("country", v)} /></Field>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-3">Social Links</p>
      {(["facebook", "instagram", "twitter", "youtube", "pinterest"] as const).map((s) => (
        <Field key={s} label={s}>
          <Input value={b.social[s] ?? ""} onChange={(v) => upd({ brand: { ...b, social: { ...b.social, [s]: v } } })} />
        </Field>
      ))}
    </div>
  );
}

function ThemeTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const t = config.theme;
  const themes = ["gold", "pink", "rose", "silk"] as const;
  return (
    <div>
      <Field label="Active Color Theme">
        <div className="grid grid-cols-2 gap-2">
          {themes.map((th) => (
            <button
              key={th}
              onClick={() => upd({ theme: { ...t, activeTheme: th } })}
              className={`p-3 border-2 rounded-lg text-sm font-medium capitalize transition-colors ${t.activeTheme === th ? "border-pink-400 bg-pink-50 text-pink-600" : "border-gray-200 hover:border-gray-300"}`}
            >
              {th}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Primary Color">
        <div className="flex gap-2">
          <input type="color" value={t.primaryColor} onChange={(e) => upd({ theme: { ...t, primaryColor: e.target.value } })} className="h-10 w-16 border border-gray-200 rounded cursor-pointer" />
          <Input value={t.primaryColor} onChange={(v) => upd({ theme: { ...t, primaryColor: v } })} />
        </div>
      </Field>
      <Field label="Accent Color">
        <div className="flex gap-2">
          <input type="color" value={t.accentColor} onChange={(e) => upd({ theme: { ...t, accentColor: e.target.value } })} className="h-10 w-16 border border-gray-200 rounded cursor-pointer" />
          <Input value={t.accentColor} onChange={(v) => upd({ theme: { ...t, accentColor: v } })} />
        </div>
      </Field>
    </div>
  );
}

function NavTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const nav = config.navigation;
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Toggle value={nav.topbarEnabled} onChange={(v) => upd({ navigation: { ...nav, topbarEnabled: v } })} label="Topbar enabled" />
        <Toggle value={nav.showBookingButton} onChange={(v) => upd({ navigation: { ...nav, showBookingButton: v } })} label="Booking button" />
      </div>
      <Field label="Topbar Phone"><Input value={nav.topbarPhone} onChange={(v) => upd({ navigation: { ...nav, topbarPhone: v } })} /></Field>
      <Field label="Topbar Email"><Input value={nav.topbarEmail} onChange={(v) => upd({ navigation: { ...nav, topbarEmail: v } })} /></Field>
      <Field label="Topbar Hours"><Input value={nav.topbarHours} onChange={(v) => upd({ navigation: { ...nav, topbarHours: v } })} /></Field>
      <Field label="Booking Button Text"><Input value={nav.bookingButtonText} onChange={(v) => upd({ navigation: { ...nav, bookingButtonText: v } })} /></Field>
      <Field label="Booking Button URL"><Input value={nav.bookingButtonHref} onChange={(v) => upd({ navigation: { ...nav, bookingButtonHref: v } })} /></Field>

      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-3">Navigation Items</p>
      {nav.items.map((item, i) => (
        <div key={item.id} className="border border-gray-100 rounded-lg p-3 mb-2 flex gap-2 items-start">
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Input value={item.label} onChange={(v) => {
              const items = nav.items.map((x, j) => j === i ? { ...x, label: v } : x);
              upd({ navigation: { ...nav, items } });
            }} placeholder="Label" />
            <Input value={item.href} onChange={(v) => {
              const items = nav.items.map((x, j) => j === i ? { ...x, href: v } : x);
              upd({ navigation: { ...nav, items } });
            }} placeholder="URL" />
          </div>
          <Btn small variant="danger" onClick={() => upd({ navigation: { ...nav, items: nav.items.filter((_, j) => j !== i) } })}>✕</Btn>
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ navigation: { ...nav, items: [...nav.items, { id: uid(), label: "New Link", href: "#" }] } })}>+ Add Nav Item</Btn>
    </div>
  );
}

function HomeSectionsTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const sections = [...config.homeSections].sort((a, b) => a.order - b.order);
  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...sections];
    const target = idx + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[idx].order, arr[target].order] = [arr[target].order, arr[idx].order];
    upd({ homeSections: arr });
  };
  return (
    <div>
      <p className="text-xs text-gray-400 mb-4">Toggle sections on/off and reorder them for the home page.</p>
      {sections.map((sec, i) => (
        <div key={sec.id} className="flex items-center gap-3 border border-gray-100 rounded-lg px-4 py-3 mb-2">
          <div className="flex flex-col gap-0.5">
            <button onClick={() => move(i, -1)} className="text-gray-300 hover:text-gray-500 text-xs leading-none">▲</button>
            <button onClick={() => move(i, 1)} className="text-gray-300 hover:text-gray-500 text-xs leading-none">▼</button>
          </div>
          <span className="w-5 h-5 rounded bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-mono">{sec.order}</span>
          <span className="flex-1 text-sm text-gray-700">{sec.title ?? sec.type}</span>
          <Toggle value={sec.enabled} onChange={(v) => upd({ homeSections: config.homeSections.map((s) => s.id === sec.id ? { ...s, enabled: v } : s) })} label="" />
        </div>
      ))}
    </div>
  );
}

function HeroTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const slides = config.heroSlides;
  const updSlide = (id: string, patch: Partial<SpaHeroSlide>) =>
    upd({ heroSlides: slides.map((s) => s.id === id ? { ...s, ...patch } : s) });
  return (
    <div>
      {slides.map((slide) => (
        <div key={slide.id} className="border border-gray-100 rounded-xl mb-3 overflow-hidden">
          <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50" onClick={() => setOpen(open === slide.id ? null : slide.id)}>
            <span className="flex-1 text-sm text-gray-700 font-medium truncate">{slide.title || slide.id}</span>
            <div className="flex gap-2">
              <Btn small variant="danger" onClick={(e?: React.MouseEvent) => { (e as React.MouseEvent)?.stopPropagation?.(); upd({ heroSlides: slides.filter((s) => s.id !== slide.id) }); }}>✕</Btn>
              <span className="text-gray-400">{open === slide.id ? "▲" : "▼"}</span>
            </div>
          </div>
          {open === slide.id && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <Field label="Image URL"><Input value={slide.image} onChange={(v) => updSlide(slide.id, { image: v })} /></Field>
              <Field label="Subtitle"><Input value={slide.subtitle} onChange={(v) => updSlide(slide.id, { subtitle: v })} /></Field>
              <Field label="Title"><Input value={slide.title} onChange={(v) => updSlide(slide.id, { title: v })} /></Field>
              <Field label="Description"><TextArea value={slide.description} onChange={(v) => updSlide(slide.id, { description: v })} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Button Text"><Input value={slide.buttonText} onChange={(v) => updSlide(slide.id, { buttonText: v })} /></Field>
                <Field label="Button URL"><Input value={slide.buttonHref} onChange={(v) => updSlide(slide.id, { buttonHref: v })} /></Field>
              </div>
            </div>
          )}
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ heroSlides: [...slides, { id: uid(), image: "/templates/spaSalon1/images/slider/slide-1.jpg", subtitle: "New Slide", title: "Slide Title", description: "Description", buttonText: "Learn More", buttonHref: "#" }] })}>+ Add Slide</Btn>
    </div>
  );
}

function ServicesTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const services = config.services;
  const updService = (id: string, patch: Partial<SpaService>) =>
    upd({ services: services.map((s) => s.id === id ? { ...s, ...patch } : s) });
  return (
    <div>
      {services.map((svc) => (
        <div key={svc.id} className="border border-gray-100 rounded-xl mb-3 overflow-hidden">
          <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50" onClick={() => setOpen(open === svc.id ? null : svc.id)}>
            <span className="flex-1 text-sm font-medium text-gray-700 truncate">{svc.name}</span>
            <div className="flex gap-2 items-center">
              <span className="text-xs text-gray-400">${svc.price}</span>
              <Btn small variant="danger" onClick={() => upd({ services: services.filter((s) => s.id !== svc.id) })}>✕</Btn>
              <Btn small variant="ghost" onClick={() => upd({ services: [...services, { ...svc, id: uid(), handle: svc.handle + "-copy" }] })}>⧉</Btn>
              <span className="text-gray-400">{open === svc.id ? "▲" : "▼"}</span>
            </div>
          </div>
          {open === svc.id && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name"><Input value={svc.name} onChange={(v) => updService(svc.id, { name: v })} /></Field>
                <Field label="Handle"><Input value={svc.handle} onChange={(v) => updService(svc.id, { handle: v })} /></Field>
                <Field label="Category"><Input value={svc.category} onChange={(v) => updService(svc.id, { category: v })} /></Field>
                <Field label="Duration"><Input value={svc.duration} onChange={(v) => updService(svc.id, { duration: v })} /></Field>
                <Field label="Price"><Input value={String(svc.price)} onChange={(v) => updService(svc.id, { price: Number(v) })} type="number" /></Field>
                <Field label="Currency"><Input value={svc.currency} onChange={(v) => updService(svc.id, { currency: v })} /></Field>
              </div>
              <Field label="Image URL"><Input value={svc.image} onChange={(v) => updService(svc.id, { image: v })} /></Field>
              <Field label="Short Description"><Input value={svc.shortDescription} onChange={(v) => updService(svc.id, { shortDescription: v })} /></Field>
              <Field label="Full Description"><TextArea value={svc.description} onChange={(v) => updService(svc.id, { description: v })} /></Field>
              <Toggle value={svc.featured} onChange={(v) => updService(svc.id, { featured: v })} label="Featured on home page" />
            </div>
          )}
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ services: [...services, { id: uid(), handle: "new-service", name: "New Service", category: "General", description: "", shortDescription: "", image: "/templates/spaSalon1/images/serv-01.png", duration: "60 min", price: 80, currency: "USD", featured: false, order: services.length + 1 }] })}>+ Add Service</Btn>
    </div>
  );
}

function PricingTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const cats = config.pricingCategories;
  const updCat = (id: string, patch: Partial<SpaPricingCategory>) =>
    upd({ pricingCategories: cats.map((c) => c.id === id ? { ...c, ...patch } : c) });
  return (
    <div>
      {cats.map((cat) => (
        <div key={cat.id} className="border border-gray-100 rounded-xl mb-4 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
            <Input value={cat.name} onChange={(v) => updCat(cat.id, { name: v })} />
            <Btn small variant="danger" onClick={() => upd({ pricingCategories: cats.filter((c) => c.id !== cat.id) })}>✕</Btn>
          </div>
          <div className="px-4 pt-3 pb-2">
            {cat.items.map((item, i) => (
              <div key={item.id} className="grid grid-cols-4 gap-2 mb-2 items-center">
                <input className="border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-pink-300 col-span-2" value={item.name} onChange={(e) => {
                  const items = cat.items.map((x, j) => j === i ? { ...x, name: e.target.value } : x);
                  updCat(cat.id, { items });
                }} placeholder="Item name" />
                <input type="number" className="border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-pink-300" value={item.price} onChange={(e) => {
                  const items = cat.items.map((x, j) => j === i ? { ...x, price: Number(e.target.value) } : x);
                  updCat(cat.id, { items });
                }} placeholder="Price" />
                <input className="border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-pink-300" value={item.duration ?? ""} onChange={(e) => {
                  const items = cat.items.map((x, j) => j === i ? { ...x, duration: e.target.value } : x);
                  updCat(cat.id, { items });
                }} placeholder="Duration" />
              </div>
            ))}
            <button className="text-xs text-pink-500 hover:text-pink-600 mt-1" onClick={() => updCat(cat.id, { items: [...cat.items, { id: uid(), name: "New Item", price: 0, currency: "USD" }] })}>+ Add Item</button>
          </div>
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ pricingCategories: [...cats, { id: uid(), name: "New Category", items: [] }] })}>+ Add Category</Btn>
    </div>
  );
}

function TeamTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const team = config.team;
  const updMember = (id: string, patch: Partial<SpaTeamMember>) =>
    upd({ team: team.map((m) => m.id === id ? { ...m, ...patch } : m) });
  return (
    <div>
      {team.map((member) => (
        <div key={member.id} className="border border-gray-100 rounded-xl mb-3 overflow-hidden">
          <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50" onClick={() => setOpen(open === member.id ? null : member.id)}>
            <span className="flex-1 text-sm font-medium text-gray-700">{member.name}</span>
            <div className="flex gap-2">
              <span className="text-xs text-gray-400">{member.role}</span>
              <Btn small variant="danger" onClick={() => upd({ team: team.filter((m) => m.id !== member.id) })}>✕</Btn>
              <Btn small variant="ghost" onClick={() => upd({ team: [...team, { ...member, id: uid(), slug: member.slug + "-copy" }] })}>⧉</Btn>
            </div>
          </div>
          {open === member.id && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name"><Input value={member.name} onChange={(v) => updMember(member.id, { name: v })} /></Field>
                <Field label="Role"><Input value={member.role} onChange={(v) => updMember(member.id, { role: v })} /></Field>
                <Field label="Slug"><Input value={member.slug} onChange={(v) => updMember(member.id, { slug: v })} /></Field>
              </div>
              <Field label="Photo URL"><Input value={member.image} onChange={(v) => updMember(member.id, { image: v })} /></Field>
              <Field label="Bio"><TextArea value={member.bio} onChange={(v) => updMember(member.id, { bio: v })} /></Field>
              <Field label="Specialties (comma-separated)"><Input value={member.specialties.join(", ")} onChange={(v) => updMember(member.id, { specialties: v.split(",").map((s) => s.trim()) })} /></Field>
            </div>
          )}
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ team: [...team, { id: uid(), slug: "new-member", name: "New Member", role: "Specialist", bio: "", image: "/templates/spaSalon1/images/team-1.jpg", social: {}, specialties: [], order: team.length + 1 }] })}>+ Add Member</Btn>
    </div>
  );
}

function GalleryTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const gallery = config.gallery;
  const updImg = (id: string, patch: Partial<SpaGalleryImage>) =>
    upd({ gallery: gallery.map((g) => g.id === id ? { ...g, ...patch } : g) });
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {gallery.map((img) => (
          <div key={img.id} className="border border-gray-100 rounded-xl overflow-hidden">
            <img src={img.src} alt={img.alt} className="w-full h-24 object-cover bg-gray-100" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="p-2 space-y-1">
              <input className="w-full border border-gray-100 rounded px-2 py-1 text-xs focus:outline-none" value={img.src} onChange={(e) => updImg(img.id, { src: e.target.value })} placeholder="Image URL" />
              <input className="w-full border border-gray-100 rounded px-2 py-1 text-xs focus:outline-none" value={img.alt} onChange={(e) => updImg(img.id, { alt: e.target.value })} placeholder="Alt text" />
              <input className="w-full border border-gray-100 rounded px-2 py-1 text-xs focus:outline-none" value={img.category} onChange={(e) => updImg(img.id, { category: e.target.value })} placeholder="Category" />
              <button className="text-xs text-red-400 hover:text-red-500" onClick={() => upd({ gallery: gallery.filter((g) => g.id !== img.id) })}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <Btn variant="ghost" onClick={() => upd({ gallery: [...gallery, { id: uid(), src: "/templates/spaSalon1/images/gallery/img-1.jpg", alt: "Gallery Image", category: "all", order: gallery.length + 1 }] })}>+ Add Image</Btn>
    </div>
  );
}

function TestimonialsTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const testimonials = config.testimonials;
  const updT = (id: string, patch: Partial<SpaTestimonial>) =>
    upd({ testimonials: testimonials.map((t) => t.id === id ? { ...t, ...patch } : t) });
  return (
    <div>
      {testimonials.map((t) => (
        <div key={t.id} className="border border-gray-100 rounded-xl p-4 mb-3">
          <div className="flex justify-between items-start mb-3">
            <div className="font-medium text-sm text-gray-700">{t.author}</div>
            <div className="flex gap-2">
              <Btn small variant="danger" onClick={() => upd({ testimonials: testimonials.filter((x) => x.id !== t.id) })}>✕</Btn>
              <Btn small variant="ghost" onClick={() => upd({ testimonials: [...testimonials, { ...t, id: uid() }] })}>⧉</Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Author"><Input value={t.author} onChange={(v) => updT(t.id, { author: v })} /></Field>
            <Field label="Role"><Input value={t.role} onChange={(v) => updT(t.id, { role: v })} /></Field>
            <Field label="Photo URL"><Input value={t.image} onChange={(v) => updT(t.id, { image: v })} /></Field>
            <Field label="Service"><Input value={t.service ?? ""} onChange={(v) => updT(t.id, { service: v })} /></Field>
          </div>
          <Field label="Rating (1-5)">
            <input type="range" min={1} max={5} value={t.rating} onChange={(e) => updT(t.id, { rating: Number(e.target.value) })} className="w-full" />
            <span className="text-xs text-gray-400">{t.rating} / 5</span>
          </Field>
          <Field label="Review Text"><TextArea value={t.text} onChange={(v) => updT(t.id, { text: v })} /></Field>
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ testimonials: [...testimonials, { id: uid(), author: "New Client", role: "Client", image: "/templates/spaSalon1/images/review-author-1.jpg", rating: 5, text: "Amazing experience!", order: testimonials.length + 1 }] })}>+ Add Testimonial</Btn>
    </div>
  );
}

function BlogTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const posts = config.blog;
  const updPost = (id: string, patch: Partial<SpaBlogPost>) =>
    upd({ blog: posts.map((p) => p.id === id ? { ...p, ...patch } : p) });
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="border border-gray-100 rounded-xl mb-3 overflow-hidden">
          <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50" onClick={() => setOpen(open === post.id ? null : post.id)}>
            <span className="flex-1 text-sm font-medium text-gray-700 truncate">{post.title}</span>
            <div className="flex gap-2">
              <Btn small variant="danger" onClick={() => upd({ blog: posts.filter((p) => p.id !== post.id) })}>✕</Btn>
              <Btn small variant="ghost" onClick={() => upd({ blog: [...posts, { ...post, id: uid(), slug: post.slug + "-copy" }] })}>⧉</Btn>
            </div>
          </div>
          {open === post.id && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Title"><Input value={post.title} onChange={(v) => updPost(post.id, { title: v })} /></Field>
                <Field label="Slug"><Input value={post.slug} onChange={(v) => updPost(post.id, { slug: v })} /></Field>
                <Field label="Author"><Input value={post.author} onChange={(v) => updPost(post.id, { author: v })} /></Field>
                <Field label="Category"><Input value={post.category} onChange={(v) => updPost(post.id, { category: v })} /></Field>
                <Field label="Published Date"><Input type="date" value={post.publishedAt} onChange={(v) => updPost(post.id, { publishedAt: v })} /></Field>
              </div>
              <Field label="Cover Image URL"><Input value={post.image} onChange={(v) => updPost(post.id, { image: v })} /></Field>
              <Field label="Excerpt"><TextArea value={post.excerpt} onChange={(v) => updPost(post.id, { excerpt: v })} rows={2} /></Field>
              <Toggle value={post.featured} onChange={(v) => updPost(post.id, { featured: v })} label="Featured post" />
            </div>
          )}
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ blog: [...posts, { id: uid(), slug: "new-post", title: "New Blog Post", excerpt: "", content: "", image: "/templates/spaSalon1/images/blog/img-01.jpg", author: "Admin", authorImage: "", category: "Wellness", tags: [], publishedAt: new Date().toISOString().slice(0, 10), featured: false, order: posts.length + 1 }] })}>+ Add Post</Btn>
    </div>
  );
}

function PagesTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const pages = config.customPages;
  const updPage = (id: string, patch: Partial<SpaCustomPage>) =>
    upd({ customPages: pages.map((p) => p.id === id ? { ...p, ...patch } : p) });
  return (
    <div>
      {pages.map((page) => (
        <div key={page.id} className="border border-gray-100 rounded-xl p-4 mb-3">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">{page.title}</span>
            <div className="flex gap-2">
              <Btn small variant="danger" onClick={() => upd({ customPages: pages.filter((p) => p.id !== page.id) })}>✕</Btn>
              <Btn small variant="ghost" onClick={() => upd({ customPages: [...pages, { ...page, id: uid(), slug: page.slug + "-copy" }] })}>⧉</Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Title"><Input value={page.title} onChange={(v) => updPage(page.id, { title: v })} /></Field>
            <Field label="Slug"><Input value={page.slug} onChange={(v) => updPage(page.id, { slug: v })} /></Field>
          </div>
          <Field label="Meta Description"><Input value={page.metaDescription ?? ""} onChange={(v) => updPage(page.id, { metaDescription: v })} /></Field>
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ customPages: [...pages, { id: uid(), slug: "new-page", title: "New Page", content: "" }] })}>+ Add Custom Page</Btn>
    </div>
  );
}

function AppointmentTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const apt = config.appointment;
  return (
    <div>
      <Toggle value={apt.enabled} onChange={(v) => upd({ appointment: { ...apt, enabled: v } })} label="Appointment booking enabled" />
      <div className="mt-4">
        <Field label="Page Title"><Input value={apt.title} onChange={(v) => upd({ appointment: { ...apt, title: v } })} /></Field>
        <Field label="Subtitle"><TextArea value={apt.subtitle} onChange={(v) => upd({ appointment: { ...apt, subtitle: v } })} rows={2} /></Field>
        <Field label="Footer Note"><Input value={apt.note} onChange={(v) => upd({ appointment: { ...apt, note: v } })} /></Field>
        <Field label="Services (one per line)">
          <textarea value={apt.services.join("\n")} onChange={(e) => upd({ appointment: { ...apt, services: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) } })} rows={6} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-300 resize-y" />
        </Field>
        <Field label="Time Slots (comma-separated)">
          <Input value={apt.timeSlots.join(", ")} onChange={(v) => upd({ appointment: { ...apt, timeSlots: v.split(",").map((s) => s.trim()).filter(Boolean) } })} />
        </Field>
        <Field label="Days Open (comma-separated)">
          <Input value={apt.daysOpen.join(", ")} onChange={(v) => upd({ appointment: { ...apt, daysOpen: v.split(",").map((s) => s.trim()).filter(Boolean) } })} />
        </Field>
      </div>
    </div>
  );
}

function ContactTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const ct = config.contact;
  return (
    <div>
      <Field label="Form Title"><Input value={ct.formTitle} onChange={(v) => upd({ contact: { ...ct, formTitle: v } })} /></Field>
      <Field label="Form Subtitle"><TextArea value={ct.formSubtitle} onChange={(v) => upd({ contact: { ...ct, formSubtitle: v } })} rows={2} /></Field>
      <Toggle value={ct.showMap} onChange={(v) => upd({ contact: { ...ct, showMap: v } })} label="Show map" />
      <Field label="Map Embed URL"><Input value={ct.mapEmbedUrl ?? ""} onChange={(v) => upd({ contact: { ...ct, mapEmbedUrl: v } })} /></Field>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-5 mb-3">Business Hours</p>
      {ct.hours.map((h, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <Input value={h.day} onChange={(v) => { const hours = ct.hours.map((x, j) => j === i ? { ...x, day: v } : x); upd({ contact: { ...ct, hours } }); }} placeholder="Day" />
          <Input value={h.time} onChange={(v) => { const hours = ct.hours.map((x, j) => j === i ? { ...x, time: v } : x); upd({ contact: { ...ct, hours } }); }} placeholder="Time" />
          <Btn small variant="danger" onClick={() => upd({ contact: { ...ct, hours: ct.hours.filter((_, j) => j !== i) } })}>✕</Btn>
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ contact: { ...ct, hours: [...ct.hours, { day: "", time: "" }] } })}>+ Add Hours</Btn>
    </div>
  );
}

function FooterTab({ config, upd }: { config: SpaSalon1Config; upd: (p: Partial<SpaSalon1Config>) => void }) {
  const ft = config.footer;
  return (
    <div>
      <Field label="Description"><TextArea value={ft.description} onChange={(v) => upd({ footer: { ...ft, description: v } })} /></Field>
      <Field label="Copyright Text"><Input value={ft.copyrightText} onChange={(v) => upd({ footer: { ...ft, copyrightText: v } })} /></Field>
      <Toggle value={ft.showNewsletter} onChange={(v) => upd({ footer: { ...ft, showNewsletter: v } })} label="Show newsletter signup" />
      {ft.showNewsletter && (
        <>
          <Field label="Newsletter Title"><Input value={ft.newsletterTitle} onChange={(v) => upd({ footer: { ...ft, newsletterTitle: v } })} /></Field>
          <Field label="Newsletter Placeholder"><Input value={ft.newsletterPlaceholder} onChange={(v) => upd({ footer: { ...ft, newsletterPlaceholder: v } })} /></Field>
        </>
      )}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-5 mb-3">Link Columns</p>
      {ft.columns.map((col, ci) => (
        <div key={ci} className="border border-gray-100 rounded-xl p-3 mb-3">
          <div className="flex gap-2 mb-3">
            <input className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-pink-300" value={col.title} onChange={(e) => { const cols = ft.columns.map((c, j) => j === ci ? { ...c, title: e.target.value } : c); upd({ footer: { ...ft, columns: cols } }); }} placeholder="Column title" />
            <Btn small variant="danger" onClick={() => upd({ footer: { ...ft, columns: ft.columns.filter((_, j) => j !== ci) } })}>✕</Btn>
          </div>
          {col.links.map((link, li) => (
            <div key={li} className="flex gap-2 mb-1.5">
              <input className="flex-1 border border-gray-100 rounded px-2 py-1 text-xs focus:outline-none" value={link.label} onChange={(e) => { const cols = ft.columns.map((c, j) => j === ci ? { ...c, links: c.links.map((l, k) => k === li ? { ...l, label: e.target.value } : l) } : c); upd({ footer: { ...ft, columns: cols } }); }} placeholder="Label" />
              <input className="flex-1 border border-gray-100 rounded px-2 py-1 text-xs focus:outline-none" value={link.href} onChange={(e) => { const cols = ft.columns.map((c, j) => j === ci ? { ...c, links: c.links.map((l, k) => k === li ? { ...l, href: e.target.value } : l) } : c); upd({ footer: { ...ft, columns: cols } }); }} placeholder="URL" />
              <button className="text-xs text-red-400" onClick={() => { const cols = ft.columns.map((c, j) => j === ci ? { ...c, links: c.links.filter((_, k) => k !== li) } : c); upd({ footer: { ...ft, columns: cols } }); }}>✕</button>
            </div>
          ))}
          <button className="text-xs text-pink-500 hover:text-pink-600 mt-1" onClick={() => { const cols = ft.columns.map((c, j) => j === ci ? { ...c, links: [...c.links, { label: "New Link", href: "#" }] } : c); upd({ footer: { ...ft, columns: cols } }); }}>+ Add Link</button>
        </div>
      ))}
      <Btn variant="ghost" onClick={() => upd({ footer: { ...ft, columns: [...ft.columns, { title: "New Column", links: [] }] } })}>+ Add Column</Btn>
    </div>
  );
}

// ─────────── main admin page ───────────
export default function SpaSalon1AdminPage() {
  const { config, updateConfig, resetConfig, isDirty } = useSpaSalon1();
  const [activeTab, setActiveTab] = useState<Tab>("Brand");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabPanel = () => {
    switch (activeTab) {
      case "Brand": return <BrandTab config={config} upd={updateConfig} />;
      case "Theme": return <ThemeTab config={config} upd={updateConfig} />;
      case "Header / Navigation": return <NavTab config={config} upd={updateConfig} />;
      case "Home Sections": return <HomeSectionsTab config={config} upd={updateConfig} />;
      case "Hero / Banners": return <HeroTab config={config} upd={updateConfig} />;
      case "Services": return <ServicesTab config={config} upd={updateConfig} />;
      case "Pricing": return <PricingTab config={config} upd={updateConfig} />;
      case "Team": return <TeamTab config={config} upd={updateConfig} />;
      case "Gallery": return <GalleryTab config={config} upd={updateConfig} />;
      case "Testimonials": return <TestimonialsTab config={config} upd={updateConfig} />;
      case "Blog": return <BlogTab config={config} upd={updateConfig} />;
      case "Pages": return <PagesTab config={config} upd={updateConfig} />;
      case "Appointment": return <AppointmentTab config={config} upd={updateConfig} />;
      case "Contact": return <ContactTab config={config} upd={updateConfig} />;
      case "Footer": return <FooterTab config={config} upd={updateConfig} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-800">Spa & Salon</div>
          <div className="text-xs text-gray-400">Template Editor</div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${activeTab === tab ? "bg-pink-50 text-pink-600 font-medium border-r-2 border-pink-400" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-100 space-y-2">
          <a
            href="/templates/spa-salon-1/preview"
            target="_blank"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700"
          >
            <span>↗</span> Preview Site
          </a>
          <button onClick={resetConfig} className="text-xs text-red-400 hover:text-red-500">
            Reset to Defaults
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-base font-semibold text-gray-800">{activeTab}</h1>
            {isDirty && <p className="text-xs text-gray-400">Unsaved changes saved to draft</p>}
          </div>
          <div className="flex gap-3">
            {saved && <span className="text-sm text-green-500 self-center">Changes saved ✓</span>}
            <Btn onClick={handleSave}>Save Changes</Btn>
          </div>
        </header>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-2xl">
            {tabPanel()}
          </div>
        </div>
      </main>
    </div>
  );
}

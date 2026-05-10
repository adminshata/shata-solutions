"use client";

import { useState } from "react";
import { useJewelryShop1 } from "@/lib/jewelryShop1/context";
import type { JewelryShop1Config } from "@/lib/jewelryShop1/types";

const TABS = [
  "Brand",
  "Contact",
  "Social",
  "Hero",
  "About",
  "Categories",
  "Products",
  "Testimonials",
  "Blog",
  "Instagram",
  "Shipping",
  "Footer",
  "Nav Links",
  "Settings",
] as const;

type Tab = (typeof TABS)[number];

export default function JewelryShop1AdminPage() {
  const { config, setConfig, resetConfig, isDirty } = useJewelryShop1();
  const [activeTab, setActiveTab] = useState<Tab>("Brand");
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof JewelryShop1Config>(
    section: K,
    value: JewelryShop1Config[K],
  ) => {
    setConfig({ ...config, [section]: value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900 text-lg">Shata Jewelry</span>
            <span className="text-gray-400 text-sm">/ Admin Editor</span>
            {isDirty && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                Draft saved
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetConfig}
              className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Reset
            </button>
            <a
              href="/templates/jewelry-shop-1/preview"
              target="_blank"
              className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Preview
            </a>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <div className="w-48 shrink-0">
          <nav className="space-y-0.5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab
                    ? "bg-gray-900 text-white font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Panel */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 min-h-[600px]">
          {activeTab === "Brand" && (
            <BrandTab config={config} update={update} />
          )}
          {activeTab === "Contact" && (
            <ContactTab config={config} update={update} />
          )}
          {activeTab === "Social" && (
            <SocialTab config={config} update={update} />
          )}
          {activeTab === "Hero" && (
            <HeroTab config={config} update={update} />
          )}
          {activeTab === "About" && (
            <AboutTab config={config} update={update} />
          )}
          {activeTab === "Categories" && (
            <CategoriesTab config={config} update={update} />
          )}
          {activeTab === "Products" && (
            <ProductsTab config={config} update={update} />
          )}
          {activeTab === "Testimonials" && (
            <TestimonialsTab config={config} update={update} />
          )}
          {activeTab === "Blog" && (
            <BlogTab config={config} update={update} />
          )}
          {activeTab === "Instagram" && (
            <InstagramTab config={config} update={update} />
          )}
          {activeTab === "Shipping" && (
            <ShippingTab config={config} update={update} />
          )}
          {activeTab === "Footer" && (
            <FooterTab config={config} update={update} />
          )}
          {activeTab === "Nav Links" && (
            <NavLinksTab />
          )}
          {activeTab === "Settings" && (
            <SettingsTab config={config} resetConfig={resetConfig} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Shared helpers ─────────────────────────────────────────── */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  );
}

function Textarea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y"
    />
  );
}

function NumInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-100">
      {children}
    </h2>
  );
}

/* ─── Tab components ─────────────────────────────────────────── */

type UpdateFn = <K extends keyof JewelryShop1Config>(k: K, v: JewelryShop1Config[K]) => void;

function BrandTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const b = config.brand;
  const set = (k: keyof typeof b, v: string) =>
    update("brand", { ...b, [k]: v });

  return (
    <>
      <SectionTitle>Brand</SectionTitle>
      <Field label="Brand Name">
        <Input value={b.name} onChange={(v) => set("name", v)} />
      </Field>
      <Field label="Tagline">
        <Input value={b.tagline} onChange={(v) => set("tagline", v)} />
      </Field>
      <Field label="Logo URL">
        <Input value={b.logo} onChange={(v) => set("logo", v)} />
      </Field>
      {b.logo && (
        <img src={b.logo} alt="Logo preview" className="mt-2 h-12 object-contain border rounded p-1" />
      )}
    </>
  );
}

function ContactTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const c = config.contact;
  const set = (k: keyof typeof c, v: string) =>
    update("contact", { ...c, [k]: v });

  return (
    <>
      <SectionTitle>Contact</SectionTitle>
      <Field label="Address">
        <Input value={c.address} onChange={(v) => set("address", v)} />
      </Field>
      <Field label="Email">
        <Input value={c.email} onChange={(v) => set("email", v)} />
      </Field>
      <Field label="Phone">
        <Input value={c.phone} onChange={(v) => set("phone", v)} />
      </Field>
      <Field label="Fax">
        <Input value={c.fax} onChange={(v) => set("fax", v)} />
      </Field>
    </>
  );
}

function SocialTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const s = config.social;
  const set = (k: keyof typeof s, v: string) =>
    update("social", { ...s, [k]: v });

  return (
    <>
      <SectionTitle>Social Links</SectionTitle>
      <Field label="Facebook URL">
        <Input value={s.facebook} onChange={(v) => set("facebook", v)} />
      </Field>
      <Field label="Twitter / X URL">
        <Input value={s.twitter} onChange={(v) => set("twitter", v)} />
      </Field>
      <Field label="Instagram URL">
        <Input value={s.instagram} onChange={(v) => set("instagram", v)} />
      </Field>
    </>
  );
}

function HeroTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const hero = config.hero;

  const updateSlide = (
    idx: number,
    k: keyof (typeof hero.slides)[0],
    v: string,
  ) => {
    const slides = hero.slides.map((s, i) => (i === idx ? { ...s, [k]: v } : s));
    update("hero", { ...hero, slides });
  };

  const addSlide = () => {
    update("hero", {
      ...hero,
      slides: [
        ...hero.slides,
        { id: `s${Date.now()}`, heading: "New Slide", image: "http://placehold.it/440x660" },
      ],
    });
  };

  const removeSlide = (idx: number) => {
    update("hero", {
      ...hero,
      slides: hero.slides.filter((_, i) => i !== idx),
    });
  };

  return (
    <>
      <SectionTitle>Hero Slides</SectionTitle>
      {hero.slides.map((slide, idx) => (
        <div key={slide.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Slide {idx + 1}</span>
            <button
              onClick={() => removeSlide(idx)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <Field label="Heading">
            <Input
              value={slide.heading}
              onChange={(v) => updateSlide(idx, "heading", v)}
            />
          </Field>
          <Field label="Image URL">
            <Input
              value={slide.image}
              onChange={(v) => updateSlide(idx, "image", v)}
            />
          </Field>
        </div>
      ))}
      <button
        onClick={addSlide}
        className="px-4 py-2 text-sm border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 w-full"
      >
        + Add Slide
      </button>
    </>
  );
}

function AboutTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const a = config.about;
  const set = (k: keyof typeof a, v: string) =>
    update("about", { ...a, [k]: v });

  return (
    <>
      <SectionTitle>About Section</SectionTitle>
      <Field label="Heading">
        <Input value={a.heading} onChange={(v) => set("heading", v)} />
      </Field>
      <Field label="Subtitle">
        <Input value={a.subtitle} onChange={(v) => set("subtitle", v)} />
      </Field>
      <Field label="Description">
        <Textarea value={a.description} onChange={(v) => set("description", v)} />
      </Field>
      <Field label="Image URL">
        <Input value={a.image} onChange={(v) => set("image", v)} />
      </Field>
      <Field label="Phone">
        <Input value={a.phone} onChange={(v) => set("phone", v)} />
      </Field>
      <Field label="Year">
        <Input value={a.year} onChange={(v) => set("year", v)} />
      </Field>
    </>
  );
}

function CategoriesTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const cats = config.categories;

  const updateCat = (
    idx: number,
    k: keyof (typeof cats)[0],
    v: string | number,
  ) => {
    const next = cats.map((c, i) => (i === idx ? { ...c, [k]: v } : c));
    update("categories", next);
  };

  const addCat = () => {
    update("categories", [
      ...cats,
      {
        id: `c${Date.now()}`,
        name: "New Category",
        slug: "new-category",
        image: "http://placehold.it/480x320",
        count: 0,
      },
    ]);
  };

  const removeCat = (idx: number) => {
    update("categories", cats.filter((_, i) => i !== idx));
  };

  return (
    <>
      <SectionTitle>Categories ({cats.length})</SectionTitle>
      {cats.map((cat, idx) => (
        <div key={cat.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            <button
              onClick={() => removeCat(idx)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name">
              <Input value={cat.name} onChange={(v) => updateCat(idx, "name", v)} />
            </Field>
            <Field label="Slug">
              <Input value={cat.slug} onChange={(v) => updateCat(idx, "slug", v)} />
            </Field>
            <Field label="Image URL">
              <Input value={cat.image} onChange={(v) => updateCat(idx, "image", v)} />
            </Field>
            <Field label="Product Count">
              <NumInput
                value={cat.count}
                onChange={(v) => updateCat(idx, "count", v)}
              />
            </Field>
          </div>
        </div>
      ))}
      <button
        onClick={addCat}
        className="px-4 py-2 text-sm border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 w-full"
      >
        + Add Category
      </button>
    </>
  );
}

function ProductsTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const products = config.products;

  const updateProd = (
    idx: number,
    k: keyof (typeof products)[0],
    v: string | number | boolean,
  ) => {
    const next = products.map((p, i) => (i === idx ? { ...p, [k]: v } : p));
    update("products", next);
  };

  const addProd = () => {
    update("products", [
      ...products,
      {
        id: `p${Date.now()}`,
        name: "New Product",
        slug: "new-product",
        price: 100,
        originalPrice: 100,
        image: "http://placehold.it/480x620",
        category: "rings",
        featured: false,
        inStock: true,
        likes: 0,
        description: "",
        sizes: ["One Size"],
        colors: ["Gold"],
      },
    ]);
  };

  const removeProd = (idx: number) => {
    update("products", products.filter((_, i) => i !== idx));
  };

  return (
    <>
      <SectionTitle>Products ({products.length})</SectionTitle>
      {products.map((p, idx) => (
        <div key={p.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{p.name}</span>
            <button
              onClick={() => removeProd(idx)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name">
              <Input value={p.name} onChange={(v) => updateProd(idx, "name", v)} />
            </Field>
            <Field label="Slug">
              <Input value={p.slug} onChange={(v) => updateProd(idx, "slug", v)} />
            </Field>
            <Field label="Price (EGP)">
              <NumInput value={p.price} onChange={(v) => updateProd(idx, "price", v)} />
            </Field>
            <Field label="Original Price">
              <NumInput
                value={p.originalPrice}
                onChange={(v) => updateProd(idx, "originalPrice", v)}
              />
            </Field>
            <Field label="Category">
              <Input
                value={p.category}
                onChange={(v) => updateProd(idx, "category", v)}
              />
            </Field>
            <Field label="Image URL">
              <Input value={p.image} onChange={(v) => updateProd(idx, "image", v)} />
            </Field>
          </div>
          <div className="mt-3">
            <Field label="Description">
              <Textarea
                value={p.description}
                onChange={(v) => updateProd(idx, "description", v)}
                rows={2}
              />
            </Field>
          </div>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={p.featured}
                onChange={(e) => updateProd(idx, "featured", e.target.checked)}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={p.inStock}
                onChange={(e) => updateProd(idx, "inStock", e.target.checked)}
              />
              In Stock
            </label>
          </div>
        </div>
      ))}
      <button
        onClick={addProd}
        className="px-4 py-2 text-sm border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 w-full"
      >
        + Add Product
      </button>
    </>
  );
}

function TestimonialsTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const items = config.testimonials;

  const updateItem = (
    idx: number,
    k: keyof (typeof items)[0],
    v: string,
  ) => {
    const next = items.map((t, i) => (i === idx ? { ...t, [k]: v } : t));
    update("testimonials", next);
  };

  const addItem = () => {
    update("testimonials", [
      ...items,
      {
        id: `t${Date.now()}`,
        name: "New Customer",
        text: "A wonderful experience.",
        image: "http://placehold.it/135x135",
      },
    ]);
  };

  const removeItem = (idx: number) => {
    update("testimonials", items.filter((_, i) => i !== idx));
  };

  return (
    <>
      <SectionTitle>Testimonials ({items.length})</SectionTitle>
      {items.map((t, idx) => (
        <div key={t.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t.name}</span>
            <button
              onClick={() => removeItem(idx)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <Field label="Name">
            <Input value={t.name} onChange={(v) => updateItem(idx, "name", v)} />
          </Field>
          <Field label="Photo URL">
            <Input value={t.image} onChange={(v) => updateItem(idx, "image", v)} />
          </Field>
          <Field label="Quote">
            <Textarea value={t.text} onChange={(v) => updateItem(idx, "text", v)} />
          </Field>
        </div>
      ))}
      <button
        onClick={addItem}
        className="px-4 py-2 text-sm border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 w-full"
      >
        + Add Testimonial
      </button>
    </>
  );
}

function BlogTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const posts = config.blog;

  const updatePost = (
    idx: number,
    k: keyof (typeof posts)[0],
    v: string,
  ) => {
    const next = posts.map((p, i) => (i === idx ? { ...p, [k]: v } : p));
    update("blog", next);
  };

  const addPost = () => {
    update("blog", [
      ...posts,
      {
        id: `b${Date.now()}`,
        slug: "new-post",
        title: "New Post",
        excerpt: "",
        content: "",
        image: "http://placehold.it/770x400",
        date: "May 9, 2025",
        author: "Shata Jewelry",
        category: "News",
      },
    ]);
  };

  const removePost = (idx: number) => {
    update("blog", posts.filter((_, i) => i !== idx));
  };

  return (
    <>
      <SectionTitle>Blog Posts ({posts.length})</SectionTitle>
      {posts.map((post, idx) => (
        <div key={post.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{post.title}</span>
            <button
              onClick={() => removePost(idx)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Title">
              <Input value={post.title} onChange={(v) => updatePost(idx, "title", v)} />
            </Field>
            <Field label="Slug">
              <Input value={post.slug} onChange={(v) => updatePost(idx, "slug", v)} />
            </Field>
            <Field label="Date">
              <Input value={post.date} onChange={(v) => updatePost(idx, "date", v)} />
            </Field>
            <Field label="Author">
              <Input value={post.author} onChange={(v) => updatePost(idx, "author", v)} />
            </Field>
            <Field label="Category">
              <Input value={post.category} onChange={(v) => updatePost(idx, "category", v)} />
            </Field>
            <Field label="Image URL">
              <Input value={post.image} onChange={(v) => updatePost(idx, "image", v)} />
            </Field>
          </div>
          <div className="mt-3">
            <Field label="Excerpt">
              <Textarea value={post.excerpt} onChange={(v) => updatePost(idx, "excerpt", v)} rows={2} />
            </Field>
            <Field label="Content">
              <Textarea value={post.content} onChange={(v) => updatePost(idx, "content", v)} rows={4} />
            </Field>
          </div>
        </div>
      ))}
      <button
        onClick={addPost}
        className="px-4 py-2 text-sm border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 w-full"
      >
        + Add Post
      </button>
    </>
  );
}

function InstagramTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const images = config.instagram;

  const updateImg = (idx: number, v: string) => {
    const next = images.map((img, i) => (i === idx ? v : img));
    update("instagram", next);
  };

  const addImg = () => {
    update("instagram", [...images, "http://placehold.it/95x70"]);
  };

  const removeImg = (idx: number) => {
    update("instagram", images.filter((_, i) => i !== idx));
  };

  return (
    <>
      <SectionTitle>Instagram Feed ({images.length} images)</SectionTitle>
      <p className="text-xs text-gray-500 mb-4">These images appear in the footer Instagram grid.</p>
      {images.map((img, idx) => (
        <div key={idx} className="flex items-center gap-3 mb-2">
          <input
            type="text"
            value={img}
            onChange={(e) => updateImg(idx, e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {img && (
            <img src={img} alt="" className="h-10 w-16 object-cover rounded border" />
          )}
          <button
            onClick={() => removeImg(idx)}
            className="text-xs text-red-500 hover:text-red-700 shrink-0"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addImg}
        className="mt-2 px-4 py-2 text-sm border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 w-full"
      >
        + Add Image
      </button>
    </>
  );
}

function ShippingTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const s = config.shipping;
  const set = (k: keyof typeof s, v: number) =>
    update("shipping", { ...s, [k]: v });

  return (
    <>
      <SectionTitle>Shipping</SectionTitle>
      <Field label="Free Shipping Minimum (EGP)">
        <NumInput value={s.freeShippingMin} onChange={(v) => set("freeShippingMin", v)} />
      </Field>
      <Field label="Standard Rate (EGP)">
        <NumInput value={s.standardRate} onChange={(v) => set("standardRate", v)} />
      </Field>
      <Field label="Express Rate (EGP)">
        <NumInput value={s.expressRate} onChange={(v) => set("expressRate", v)} />
      </Field>
    </>
  );
}

function FooterTab({
  config,
  update,
}: {
  config: JewelryShop1Config;
  update: UpdateFn;
}) {
  const f = config.footer;
  const set = (k: keyof typeof f, v: string) =>
    update("footer", { ...f, [k]: v });

  return (
    <>
      <SectionTitle>Footer</SectionTitle>
      <Field label="Description">
        <Textarea value={f.description} onChange={(v) => set("description", v)} />
      </Field>
      <Field label="Copyright">
        <Input value={f.copyright} onChange={(v) => set("copyright", v)} />
      </Field>
    </>
  );
}

function NavLinksTab() {
  return (
    <>
      <SectionTitle>Nav Links</SectionTitle>
      <p className="text-sm text-gray-500 mb-4">
        Navigation links are served from the static HTML template. To change nav items, edit the HTML files in{" "}
        <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">public/templates/jewelryShop1/</code>.
      </p>
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 space-y-1">
        <div className="font-medium mb-2">Current nav structure:</div>
        <div>Home → /templates/jewelry-shop-1/preview</div>
        <div>Shop → /templates/jewelry-shop-1/preview/shop</div>
        <div>Blog → /templates/jewelry-shop-1/preview/blog</div>
        <div>About → /templates/jewelry-shop-1/preview/about</div>
        <div>Contact → /templates/jewelry-shop-1/preview/contact</div>
        <div>Cart → /templates/jewelry-shop-1/preview/cart</div>
        <div>Login → /templates/jewelry-shop-1/preview/login</div>
      </div>
    </>
  );
}

function SettingsTab({
  config,
  resetConfig,
}: {
  config: JewelryShop1Config;
  resetConfig: () => void;
}) {
  const exportConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jewelry-shop-1-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SectionTitle>Settings</SectionTitle>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Export the current config as JSON.</p>
          <button
            onClick={exportConfig}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Export Config
          </button>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600 mb-2">
            Reset all settings to factory defaults. This cannot be undone.
          </p>
          <button
            onClick={resetConfig}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </>
  );
}

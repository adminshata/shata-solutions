"use client";

import { useState } from "react";
import type { EcommerceTemplateData, TemplateProduct } from "@/lib/templates/types";
import EditorShell from "@/components/templates/shared/EditorShell";
import TextInput from "@/components/templates/shared/TextInput";
import ColorInput from "@/components/templates/shared/ColorInput";
import SectionToggle from "@/components/templates/shared/SectionToggle";
import ProductEditor from "@/components/templates/shared/ProductEditor";
import EcommerceTemplate from "./EcommerceTemplate";

type EcommerceEditorProps = {
  initialData: EcommerceTemplateData;
};

export default function EcommerceEditor({ initialData }: EcommerceEditorProps) {
  const [data, setData] = useState<EcommerceTemplateData>(initialData);

  const updateProduct = (product: TemplateProduct) => {
    setData((current) => ({
      ...current,
      products: current.products.map((item) => (item.id === product.id ? product : item)),
    }));
  };

  const addProduct = () => {
    setData((current) => ({
      ...current,
      products: [
        ...current.products,
        {
          id: `p${current.products.length + 1}-${Date.now()}`,
          name: "New Product",
          category: "General",
          price: "$0",
          badge: "New",
          description: "Edit this product description from the template editor.",
        },
      ],
    }));
  };

  return (
    <EditorShell
      title="Ecommerce Template Editor"
      previewHref="/templates/ecommerce"
      preview={<EcommerceTemplate data={data} />}
    >
      <div className="space-y-6">
        <EditorGroup title="Brand">
          <TextInput
            label="Store name"
            value={data.brand.name}
            onChange={(name) => setData((current) => ({ ...current, brand: { ...current.brand, name } }))}
          />
          <TextInput
            label="Logo text"
            value={data.brand.logoText}
            onChange={(logoText) => setData((current) => ({ ...current, brand: { ...current.brand, logoText } }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <ColorInput
              label="Primary"
              value={data.brand.primaryColor}
              onChange={(primaryColor) => setData((current) => ({ ...current, brand: { ...current.brand, primaryColor } }))}
            />
            <ColorInput
              label="Accent"
              value={data.brand.accentColor}
              onChange={(accentColor) => setData((current) => ({ ...current, brand: { ...current.brand, accentColor } }))}
            />
          </div>
        </EditorGroup>

        <EditorGroup title="Hero">
          <TextInput
            label="Badge"
            value={data.hero.badge}
            onChange={(badge) => setData((current) => ({ ...current, hero: { ...current.hero, badge } }))}
          />
          <TextInput
            label="Headline"
            value={data.hero.headline}
            textarea
            onChange={(headline) => setData((current) => ({ ...current, hero: { ...current.hero, headline } }))}
          />
          <TextInput
            label="Subcopy"
            value={data.hero.subcopy}
            textarea
            onChange={(subcopy) => setData((current) => ({ ...current, hero: { ...current.hero, subcopy } }))}
          />
          <TextInput
            label="CTA label"
            value={data.hero.ctaLabel}
            onChange={(ctaLabel) => setData((current) => ({ ...current, hero: { ...current.hero, ctaLabel } }))}
          />
        </EditorGroup>

        <EditorGroup title="Sections">
          {data.sections.map((section) => (
            <SectionToggle
              key={section.id}
              label={section.label}
              enabled={section.enabled}
              onChange={(enabled) =>
                setData((current) => ({
                  ...current,
                  sections: current.sections.map((item) => (item.id === section.id ? { ...item, enabled } : item)),
                }))
              }
            />
          ))}
        </EditorGroup>

        <EditorGroup title="Products">
          <button
            type="button"
            onClick={addProduct}
            className="w-full rounded-2xl bg-gradient-to-r from-[#635bff] to-cyan-400 px-4 py-3 text-sm font-black text-white"
          >
            Add product
          </button>
          <div className="space-y-4">
            {data.products.map((product) => (
              <ProductEditor key={product.id} product={product} onChange={updateProduct} />
            ))}
          </div>
        </EditorGroup>
      </div>
    </EditorShell>
  );
}

function EditorGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400">{title}</h2>
      {children}
    </section>
  );
}

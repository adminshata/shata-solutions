"use client";

import type { TemplateProduct } from "@/lib/templates/types";
import TextInput from "./TextInput";

type ProductEditorProps = {
  product: TemplateProduct;
  onChange: (product: TemplateProduct) => void;
};

export default function ProductEditor({ product, onChange }: ProductEditorProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <TextInput label="Product name" value={product.name} onChange={(name) => onChange({ ...product, name })} />
      <div className="grid grid-cols-2 gap-3">
        <TextInput label="Price" value={product.price} onChange={(price) => onChange({ ...product, price })} />
        <TextInput label="Category" value={product.category} onChange={(category) => onChange({ ...product, category })} />
      </div>
      <TextInput label="Badge" value={product.badge} onChange={(badge) => onChange({ ...product, badge })} />
      <TextInput label="Description" value={product.description} textarea onChange={(description) => onChange({ ...product, description })} />
    </div>
  );
}

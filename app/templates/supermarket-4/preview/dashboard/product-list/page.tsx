import Image from "next/image";
import { DashboardShell, DataTable } from "@/components/templates/supermarket4/dashboard/DashboardShell";
import { PRODUCTS } from "@/lib/supermarket4/defaults";

export default function DashboardProductListPage() {
  return (
    <DashboardShell title="Product List" subtitle="Reference product catalog controls.">
      <div className="mb-5 grid gap-4 md:grid-cols-4">
        {PRODUCTS.slice(17, 21).map((product) => (
          <div key={product.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative mb-3 h-28 overflow-hidden rounded-lg bg-slate-50">
              <Image src={`/templates/supermarket4/products/${product.image}`} alt={product.title ?? "Product"} fill className="object-contain p-2" unoptimized />
            </div>
            <h3 className="text-base font-black text-slate-900">{product.title}</h3>
            <p className="mt-1 text-sm font-bold text-[#F97316]">${product.price}</p>
          </div>
        ))}
      </div>
      <DataTable
        headers={["Product", "Category", "Price", "Stock", "Status"]}
        rows={PRODUCTS.slice(17, 25).map((product, index) => [
          product.title ?? "Product",
          product.category ?? "Grocery",
          `$${product.price}`,
          40 + index * 6,
          "Published",
        ])}
      />
    </DashboardShell>
  );
}

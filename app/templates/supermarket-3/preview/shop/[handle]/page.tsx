"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { SiteShell } from "@/components/templates/supermarket3/layout/SiteShell";
import { Header } from "@/components/templates/supermarket3/layout/Header";
import { Footer } from "@/components/templates/supermarket3/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket3/layout/CartDrawer";
import { ProductCard } from "@/components/templates/supermarket3/product/ProductCard";
import { Badge } from "@/components/templates/supermarket3/ui/Atoms";
import { useSite, useCart } from "@/lib/supermarket3/context";
import { findProduct, formatPrice, activeProducts } from "@/lib/supermarket3/utils";

const BASE_PATH = "/templates/supermarket-3/preview";

export default function ProductDetailPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params);
  const config = useSite();
  const cart = useCart();
  const product = findProduct(config, handle);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <SiteShell>
        <Header />
        <main className="py-20 text-center" style={{ background: "#F3F4F6" }}>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
          <Link href={`${BASE_PATH}/shop`} className="text-sm font-semibold underline" style={{ color: "#1D6CE3" }}>
            Back to shop
          </Link>
        </main>
        <Footer />
      </SiteShell>
    );
  }

  const related = activeProducts(config)
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  function handleAdd() {
    cart.add(product!.id, qty);
    cart.openDrawer();
  }

  return (
    <SiteShell>
      <Header />
      <main style={{ background: "#F3F4F6" }}>
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-gray-500 mb-6">
            <Link href={BASE_PATH} className="hover:text-[#1D6CE3]">Home</Link>
            <span>/</span>
            <Link href={`${BASE_PATH}/shop`} className="hover:text-[#1D6CE3]">Shop</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
          </nav>

          {/* Product */}
          <div className="bg-white rounded border border-gray-100 p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Images */}
              <div>
                <div className="relative h-72 md:h-96 rounded border border-gray-100 overflow-hidden bg-gray-50">
                  <Image
                    src={product.images[activeImg] ?? product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                    unoptimized
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge badge={product.badge} />
                    </div>
                  )}
                  {discount && (
                    <div className="absolute top-3 right-3">
                      <span className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">-{discount}%</span>
                    </div>
                  )}
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-2 mt-3">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImg(i)}
                        className={`relative h-14 w-14 rounded border-2 overflow-hidden transition-colors ${
                          i === activeImg ? "border-[#1D6CE3]" : "border-gray-200"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" sizes="56px" unoptimized />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                {product.category && (
                  <Link
                    href={`${BASE_PATH}/categories/${product.category}`}
                    className="text-[11px] font-bold uppercase tracking-wider hover:underline"
                    style={{ color: "#1D6CE3" }}
                  >
                    {product.category.replace(/-/g, " ")}
                  </Link>
                )}
                <h1 className="mt-1 text-2xl font-extrabold text-gray-800 leading-tight">{product.name}</h1>
                {product.unit && <p className="mt-1 text-sm text-gray-400">{product.unit}</p>}

                <div className="flex items-center gap-3 mt-4">
                  <span className="text-3xl font-extrabold" style={{ color: "#1D6CE3" }}>
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  {discount && (
                    <span className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      Save {discount}%
                    </span>
                  )}
                </div>

                {product.description && (
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
                )}

                {/* Quantity + Add to cart */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center rounded border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-3 py-2 text-base font-bold text-[#1D6CE3] hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="min-w-[40px] text-center text-sm font-bold">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(qty + 1)}
                      className="px-3 py-2 text-base font-bold text-[#1D6CE3] hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 rounded py-3 text-sm font-bold text-white transition-transform hover:scale-[1.01]"
                    style={{ background: "#1D6CE3" }}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Meta */}
                <div className="mt-6 space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                  <div><span className="font-semibold text-gray-700">SKU:</span> {product.id}</div>
                  {product.category && (
                    <div>
                      <span className="font-semibold text-gray-700">Category:</span>{" "}
                      <Link href={`${BASE_PATH}/categories/${product.category}`} className="hover:underline" style={{ color: "#1D6CE3" }}>
                        {product.category.replace(/-/g, " ")}
                      </Link>
                    </div>
                  )}
                  {product.stock !== undefined && (
                    <div>
                      <span className="font-semibold text-gray-700">Stock:</span>{" "}
                      {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-800 mb-5">Related Products</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}

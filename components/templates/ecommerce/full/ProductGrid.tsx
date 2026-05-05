import type { Product } from "./ProductCard";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  title: string;
  subtitle?: string;
  products: Product[];
};

export default function ProductGrid({ title, subtitle, products }: ProductGridProps) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            {subtitle && (
              <p className="mb-2 text-sm text-neutral-500">{subtitle}</p>
            )}
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              {title}
            </h2>
          </div>
          <a
            href="#"
            className="hidden items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-600 sm:flex"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-10 flex justify-center sm:hidden">
          <a
            href="#"
            className="rounded-full border border-neutral-200 px-7 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
          >
            View all products
          </a>
        </div>
      </div>
    </section>
  );
}

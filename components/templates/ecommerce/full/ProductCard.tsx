import Image from "next/image";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  colors: string[];
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { name, category, price, originalPrice, rating, reviews, badge, image, colors } = product;

  return (
    <div className="group relative flex flex-col bg-transparent">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-50">
        <div className="relative aspect-[11/12] w-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
            {badge}
          </div>
        )}

        {/* Wishlist button */}
        <button
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm transition-colors hover:text-neutral-900"
          aria-label="Add to wishlist"
        >
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
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>

        {/* Hover action buttons */}
        <div className="absolute inset-x-2 bottom-0 flex translate-y-2 justify-center gap-2 opacity-0 transition-all duration-300 group-hover:bottom-4 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="flex cursor-pointer items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Add to bag
          </button>
          <button className="flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-neutral-900 shadow-lg transition-colors hover:bg-neutral-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
            Quick view
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-3 px-1 pb-2 pt-5">
        {/* Color swatches */}
        <div className="flex gap-1.5">
          {colors.map((color) => (
            <div
              key={color}
              className="size-3.5 cursor-pointer rounded-full ring-1 ring-neutral-900/10 transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-neutral-900 transition-colors group-hover:text-neutral-600">
            {name}
          </h3>
          <p className="mt-0.5 text-xs text-neutral-500">{category}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-neutral-900">${price}</span>
            {originalPrice && (
              <span className="text-sm text-neutral-400 line-through">${originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-amber-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-neutral-500">
              {rating} ({reviews})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

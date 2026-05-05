import Image from "next/image";

export type Product2 = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  badge?: string;
};

type ProductCardProps = {
  product: Product2;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={star <= Math.round(rating) ? 0 : 1.5}
          className={`size-3.5 ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-300"}`}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, brand, price, oldPrice, rating, image, badge } = product;

  return (
    <div className="group relative bg-white">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="relative aspect-square w-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute left-3 top-3 bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {badge}
          </div>
        )}

        {/* Hover action buttons */}
        <div className="absolute right-3 top-3 flex translate-x-10 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          {[
            { label: "Wishlist", path: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" },
            { label: "Quick view", path: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" },
            { label: "Add to cart", path: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" },
            { label: "Compare", path: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" },
          ].map((action) => (
            <button
              key={action.label}
              aria-label={action.label}
              className="flex h-9 w-9 items-center justify-center bg-white shadow-md transition-colors hover:bg-red-600 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d={action.path} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="border border-t-0 border-gray-100 p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{brand}</p>
        <h3 className="mt-1 text-sm font-semibold text-gray-800 transition-colors group-hover:text-red-600">
          {name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={rating} />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-red-600">${price.toLocaleString()}.00</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">${oldPrice.toLocaleString()}.00</span>
          )}
        </div>

        {/* Add to cart bar */}
        <button className="mt-3 w-full bg-gray-900 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-600">
          + Add To Cart
        </button>
      </div>
    </div>
  );
}

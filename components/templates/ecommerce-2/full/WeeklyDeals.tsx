import Image from "next/image";

const DEALS = [
  {
    id: 1,
    name: "Premium Leather Sofa",
    image: "/templates/ecommerce-2/products/products__thumb__small__01.jpg",
    price: 1299,
    oldPrice: 1699,
    rating: 4,
  },
  {
    id: 2,
    name: "Oak Dining Table Set",
    image: "/templates/ecommerce-2/products/products__thumb__small__02.jpg",
    price: 899,
    oldPrice: 1199,
    rating: 5,
  },
  {
    id: 3,
    name: "Smart Ceiling Light",
    image: "/templates/ecommerce-2/products/products__thumb__small__03.jpg",
    price: 349,
    oldPrice: 499,
    rating: 4,
  },
  {
    id: 4,
    name: "Memory Foam Mattress",
    image: "/templates/ecommerce-2/products/products__thumb__small__04.jpg",
    price: 749,
    oldPrice: 999,
    rating: 5,
  },
];

function MiniStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={s <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={s <= rating ? 0 : 1.5} className={`size-3 ${s <= rating ? "text-amber-400" : "text-gray-300"}`}>
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
      ))}
    </div>
  );
}

export default function WeeklyDeals() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/templates/ecommerce-2/bg/offer__deals__bg.png"
          alt="Weekly deals background"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/92" />
      </div>

      <div className="relative px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            {/* Left: promo copy */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Don&apos;t Miss
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-gray-900 sm:text-4xl">
                Limited <br />
                <span className="text-red-600">Weekly Deals</span>
              </h2>
              <p className="mt-4 text-sm text-gray-500">
                Hurry up — these offers end soon. Save big on our most popular furniture and decor pieces.
              </p>

              {/* Countdown (static display) */}
              <div className="mt-8 flex gap-3">
                {[
                  { val: "02", unit: "Days" },
                  { val: "14", unit: "Hours" },
                  { val: "37", unit: "Mins" },
                  { val: "52", unit: "Secs" },
                ].map((t) => (
                  <div key={t.unit} className="flex flex-col items-center bg-gray-900 px-4 py-3 text-white">
                    <span className="text-xl font-black tabular-nums">{t.val}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{t.unit}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="mt-8 inline-flex w-fit items-center gap-2 bg-red-600 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
              >
                Shop All Deals
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Right: deal products */}
            <div className="grid gap-4 sm:grid-cols-2">
              {DEALS.map((deal) => (
                <div key={deal.id} className="flex gap-4 border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-gray-50">
                    <Image
                      src={deal.image}
                      alt={deal.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <MiniStars rating={deal.rating} />
                    <h3 className="mt-1.5 text-sm font-bold text-gray-800 leading-tight">{deal.name}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base font-black text-red-600">${deal.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through">${deal.oldPrice.toLocaleString()}</span>
                    </div>
                    <button className="mt-2.5 w-fit bg-gray-900 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-600">
                      + Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

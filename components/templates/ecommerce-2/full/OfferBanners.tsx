import Image from "next/image";

const BANNERS = [
  {
    image: "/templates/ecommerce-2/offer/offer__thumb__2.jpg",
    sub: "Furniture Collection",
    discount: "40% Flat",
    label: "View Collection",
  },
  {
    image: "/templates/ecommerce-2/offer/offer__thumb__1.jpg",
    sub: "Lighting & Lamps",
    discount: "50% Flat",
    label: "View Collection",
  },
];

export default function OfferBanners() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2">
          {BANNERS.map((banner) => (
            <a
              key={banner.image}
              href="#"
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-[16/7]">
                <Image
                  src={banner.image}
                  alt={banner.sub}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/40 to-transparent" />
              </div>
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                  {banner.sub}
                </p>
                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  {banner.discount}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white underline underline-offset-4 transition-colors group-hover:text-red-400">
                  {banner.label}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

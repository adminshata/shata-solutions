import Image from "next/image";

const CATEGORIES = [
  { name: "Relaxing Chair", count: "86 items", image: "/templates/ecommerce-2/categories/cate__thumb1.jpg" },
  { name: "Mattresses",     count: "54 items", image: "/templates/ecommerce-2/categories/cate__thumb2.jpg" },
  { name: "Wooden Tables",  count: "73 items", image: "/templates/ecommerce-2/categories/cate__thumb3.jpg" },
  { name: "Lights & Lamps", count: "92 items", image: "/templates/ecommerce-2/categories/cate__thumb4.jpg" },
  { name: "Home Wares",     count: "61 items", image: "/templates/ecommerce-2/categories/cate__thumb5.jpg" },
  { name: "Wall Art",       count: "45 items", image: "/templates/ecommerce-2/categories/cate__thumb6.jpg" },
  { name: "Dining Sets",    count: "38 items", image: "/templates/ecommerce-2/categories/cate__thumb7.jpg" },
  { name: "Outdoor",        count: "29 items", image: "/templates/ecommerce-2/categories/cate__thumb8.jpg" },
];

export default function Categories() {
  return (
    <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Top Featured
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-gray-900 sm:text-3xl">
              Discover Top <span className="text-red-600">Categories</span>
            </h2>
          </div>
          <a href="#" className="hidden items-center gap-1.5 text-sm font-bold text-red-600 transition-colors hover:text-red-700 sm:flex">
            View All Categories
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="group relative overflow-hidden bg-white shadow-sm"
            >
              <div className="relative aspect-square">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-[10px] font-medium text-white/60">{cat.count}</p>
                <h3 className="text-sm font-bold leading-tight">{cat.name}</h3>
                <span className="mt-1.5 inline-flex translate-y-1 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Shop now
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
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

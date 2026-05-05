import Image from "next/image";

const CATEGORIES = [
  {
    name: "Men's Wear",
    count: "148 styles",
    image: "/templates/ecommerce/collections/explore1.png",
  },
  {
    name: "Women's Fashion",
    count: "234 styles",
    image: "/templates/ecommerce/collections/explore2.png",
  },
  {
    name: "Accessories",
    count: "96 styles",
    image: "/templates/ecommerce/collections/explore3.png",
  },
  {
    name: "Beauty & Care",
    count: "72 styles",
    image: "/templates/ecommerce/collections/explore4.png",
  },
];

export default function Categories() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm text-neutral-500">Browse our range</p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Shop by category
            </h2>
          </div>
          <a
            href="#"
            className="hidden items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-600 sm:flex"
          >
            All categories
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

        {/* Category grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="group relative overflow-hidden rounded-3xl bg-neutral-100"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent" />
              </div>

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs font-medium text-white/65">{cat.count}</p>
                <h3 className="mt-1 text-xl font-semibold">{cat.name}</h3>
                <span className="mt-3 inline-flex translate-y-1 items-center gap-1.5 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Shop now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
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

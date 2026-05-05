import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/templates/ecommerce-2/bg/h1__hero__bg.png"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-900/55" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-base font-semibold uppercase tracking-[0.2em] text-red-400">
            End Season Sale
          </p>

          {/* Headline */}
          <h1 className="mt-4 text-5xl font-black leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Premium <br />
            <span className="text-red-400">Furniture</span> &amp; <br />
            Home Decor
          </h1>

          {/* Sub text */}
          <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-300">
            Wide range starting from <span className="font-bold text-white">$252.00</span> — Discover
            handcrafted furniture, elegant lighting, and modern home decor for every room.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-sm bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
            >
              Start Buying
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-white/60 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
            >
              View Collections
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { value: "5,000+", label: "Products" },
              { value: "120+", label: "Brands" },
              { value: "98%", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-medium uppercase tracking-widest text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

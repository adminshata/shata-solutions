import Image from "next/image";

const TRUST_BADGES = ["Free returns", "Secure checkout", "Ships in 24hrs"];

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#E3FFE6]">
      {/* Subtle dot pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="ec-hero-dots"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#059669" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ec-hero-dots)" />
      </svg>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:gap-0 lg:px-8">
        {/* Left: copy */}
        <div className="relative flex max-w-2xl flex-1 flex-col items-start">
          <span className="block text-base font-medium text-neutral-600 md:text-lg">
            New Season 2026 Collection
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-neutral-900 sm:mt-6 sm:text-5xl xl:text-6xl 2xl:text-7xl">
            Exclusive styles <br /> for everyone
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600 sm:mt-7">
            Discover the latest fashion trends — premium quality, modern cuts,
            and styles crafted for every season.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
            >
              Explore shop now
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
            <a
              href="#"
              className="inline-flex items-center rounded-full border border-neutral-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-neutral-900 backdrop-blur-sm transition-colors hover:bg-white"
            >
              View collections
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-neutral-500">
            {TRUST_BADGES.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right: hero image */}
        <div className="relative flex flex-1 justify-center lg:justify-end lg:pr-10">
          <Image
            src="/templates/ecommerce/hero-right-1.png"
            alt="New season collection — Shata Store"
            width={790}
            height={790}
            priority
            className="h-auto w-full max-w-sm select-none object-contain lg:max-w-lg"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
      </div>
    </div>
  );
}

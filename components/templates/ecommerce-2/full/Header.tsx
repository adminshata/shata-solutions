const NAV_LINKS = [
  { label: "Home", active: true },
  { label: "About Us", active: false },
  { label: "Shop", active: false },
  { label: "Furniture", active: false },
  { label: "Lighting", active: false },
  { label: "Decor", active: false },
  { label: "Blog", active: false },
];

const CATEGORIES = [
  "Lamps & Lighting",
  "Mattress & Bedding",
  "Home Wares",
  "Housekeeping",
  "Showpiece & Wall Art",
  "Dining & Cabinetry",
  "Ceiling Light",
  "Festive & Outdoor",
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      {/* Top announcement bar */}
      <div className="hidden border-b border-gray-100 bg-gray-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">
            Free Shipping Worldwide &mdash; On All Orders Over $1,000
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <a href="#" className="transition-colors hover:text-gray-800">Store Locator</a>
            <a href="#" className="transition-colors hover:text-gray-800">Track Orders</a>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253" />
              </svg>
              English &amp; Dollar
            </span>
          </div>
        </div>
      </div>

      {/* Middle: logo + search + cart */}
      <div className="border-b border-gray-100 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-base font-black text-white">
              SH
            </div>
            <div>
              <div className="text-lg font-black leading-none tracking-tight text-gray-900">
                Shata Home
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                Furniture &amp; Decor
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="hidden flex-1 md:block">
            <div className="flex overflow-hidden rounded-full border-2 border-red-600">
              <select className="border-0 bg-gray-50 px-3 py-2.5 text-xs font-medium text-gray-600 outline-none">
                <option>All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <div className="w-px bg-gray-200" />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none"
              />
              <button className="flex items-center gap-2 bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* Wishlist */}
            <button className="hidden flex-col items-center text-gray-500 transition-colors hover:text-red-600 sm:flex" aria-label="Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span className="mt-0.5 text-[10px] font-medium">Wishlist</span>
            </button>

            {/* Cart */}
            <button className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 px-4 py-2.5 transition-colors hover:bg-red-50">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">3</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-[10px] text-gray-400">My Cart</div>
                <div className="text-sm font-bold text-gray-800">$3,550</div>
              </div>
            </button>

            {/* Mobile menu */}
            <button className="text-gray-500 transition-colors hover:text-gray-800 lg:hidden" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {/* Departments mega menu */}
          <div className="group relative hidden shrink-0 lg:block">
            <button className="flex items-center gap-2 bg-red-600 px-5 py-4 text-sm font-semibold text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              Shop By Departments
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {/* Dropdown */}
            <div className="invisible absolute left-0 top-full z-50 w-56 border border-gray-100 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {CATEGORIES.map((cat) => (
                <a key={cat} href="#" className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600">
                  {cat}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Main nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                className={`px-4 py-4 text-sm font-semibold transition-colors ${
                  link.active
                    ? "text-red-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: contact */}
          <div className="ml-auto hidden items-center gap-2 text-gray-400 lg:flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <div>
              <div className="text-[10px] text-gray-500">Got Questions? Call Us 24/7</div>
              <div className="text-sm font-bold text-white">1800 665 222</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Newsletter() {
  return (
    <section className="bg-red-600 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* Left */}
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                Subscribe &amp; Join Us!
              </h3>
              <p className="mt-1 max-w-sm text-sm text-red-200">
                Get $20 coupon on your first order and enjoy free delivery on all future purchases.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full sm:max-w-md">
            <div className="flex overflow-hidden shadow-lg">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 bg-white px-5 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              <button className="flex items-center gap-2 bg-gray-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
                Subscribe
              </button>
            </div>
            <p className="mt-2 text-xs text-red-200">
              No spam. Unsubscribe any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

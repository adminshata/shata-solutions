import Link from "next/link";
import { useSite } from "@/lib/supermarket4/context";

const BASE_PATH = "/templates/supermarket-4/preview";

export function Footer() {
  const config = useSite();
  const categories = config.categories.filter(c => c.active !== false).slice(0, 5);

  return (
    <footer style={{ background: "#f3f4f6" }} className="border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: About */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#F97316" }}>{config.logo.text}</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Your neighborhood fresh grocery store. We bring quality produce, meats, and everyday essentials right to your table.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="h-4 w-4 mt-0.5 shrink-0 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.42-1.42a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {config.contact.phone}
              </div>
              {config.contact.phone2 && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="h-4 w-4 mt-0.5 shrink-0 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.42-1.42a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {config.contact.phone2}
                </div>
              )}
              {config.contact.hours && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="h-4 w-4 mt-0.5 shrink-0 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  {config.contact.hours}
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Our Stores */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-4">Our Stores</h4>
            <ul className="space-y-2">
              {["Delivery Info", "Privacy Policy", "Terms & Conditions", "Customer Support", "Careers"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-[#F97316] transition-colors flex items-center gap-1">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Shop Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-4">Shop Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`${BASE_PATH}/categories/${cat.handle}`}
                    className="text-sm text-gray-600 hover:text-[#F97316] transition-colors flex items-center gap-1"
                  >
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">Get the latest deals and offers in your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F97316]"
              />
              <button
                type="submit"
                className="rounded px-3 py-2 text-white text-sm font-semibold shrink-0"
                style={{ background: "#F97316" }}
              >
                Subscribe
              </button>
            </form>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { label: "Facebook", href: config.social.facebook ?? "#",
                  icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
                { label: "Twitter", href: config.social.twitter ?? "#",
                  icon: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /> },
                { label: "Instagram", href: config.social.instagram ?? "#",
                  icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></> },
                { label: "YouTube", href: config.social.youtube ?? "#",
                  icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {["visa", "mc", "paypal", "amex"].map((p) => (
              <span
                key={p}
                className="inline-flex items-center justify-center rounded border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold uppercase text-gray-500"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

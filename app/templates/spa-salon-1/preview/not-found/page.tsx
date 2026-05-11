// app/templates/spa-salon-1/preview/not-found/page.tsx
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/templates/spa-salon-1/preview" },
  { label: "Our Services", href: "/templates/spa-salon-1/preview/services" },
  { label: "Book Appointment", href: "/templates/spa-salon-1/preview/appointment" },
  { label: "Meet the Team", href: "/templates/spa-salon-1/preview/team" },
  { label: "Gallery", href: "/templates/spa-salon-1/preview/gallery" },
  { label: "Pricing", href: "/templates/spa-salon-1/preview/pricing" },
  { label: "Blog", href: "/templates/spa-salon-1/preview/blog" },
  { label: "Contact Us", href: "/templates/spa-salon-1/preview/contact" },
];

export default function SpaSalon1NotFoundPage() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Nav */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/templates/spa-salon-1/preview">
            <img src="/templates/spaSalon1/images/logo.svg" alt="Shata Spa & Salon" className="h-10" />
          </Link>
          <Link
            href="/templates/spa-salon-1/preview/appointment"
            className="px-5 py-2 bg-pink-400 text-white text-sm rounded-full hover:bg-pink-500 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
          <div className="text-9xl font-thin text-pink-200 mb-2 leading-none select-none">404</div>
          <h1 className="text-2xl font-light text-gray-700 mb-3">Page Not Found</h1>
          <p className="text-gray-500 mb-10 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let us help you find your way.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link
              href="/templates/spa-salon-1/preview"
              className="px-8 py-3 bg-pink-400 text-white rounded-full text-sm tracking-wider hover:bg-pink-500 transition-colors"
            >
              Return to Home
            </Link>
            <Link
              href="/templates/spa-salon-1/preview/contact"
              className="px-8 py-3 border border-pink-300 text-pink-500 rounded-full text-sm tracking-wider hover:bg-pink-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Quick Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2.5 px-4 rounded-lg text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-500 transition-colors text-left"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Need help? Call{" "}
            <a href="tel:+201000000000" className="text-pink-400 hover:underline">+20 100 000 0000</a>
          </p>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-xs text-center py-4">
        &copy; {new Date().getFullYear()} Shata Spa &amp; Salon. All rights reserved.
      </footer>
    </div>
  );
}

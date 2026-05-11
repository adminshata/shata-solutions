// app/templates/spa-salon-1/preview/login/page.tsx
import Link from "next/link";

export default function SpaSalon1LoginPage() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 px-4 text-center">
        <span className="mr-4">+20 100 000 0000</span>
        <span>info@shatasolutions.com</span>
        <span className="ml-4">Mon–Sat: 9:00 AM – 8:00 PM</span>
      </div>

      {/* Nav */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/templates/spa-salon-1/preview">
            <img src="/templates/spaSalon1/images/logo.svg" alt="Shata Spa & Salon" className="h-10" />
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>No account?</span>
            <Link href="/templates/spa-salon-1/preview/register" className="text-pink-500 hover:underline font-medium">
              Register Free
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-br from-pink-400 to-pink-500 p-8 text-center">
              <img src="/templates/spaSalon1/images/logo-white.svg" alt="Shata Spa & Salon" className="h-10 mx-auto mb-3" />
              <p className="text-pink-100 text-sm">Sign in to manage your appointments</p>
            </div>

            {/* Form */}
            <div className="p-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-100 transition"
                  />
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-pink-400 focus:ring-pink-300" />
                    <span className="text-xs text-gray-500">Remember me</span>
                  </label>
                  <button className="text-xs text-pink-400 hover:underline">Forgot password?</button>
                </div>

                <button className="w-full bg-pink-400 text-white py-3 rounded-full text-sm tracking-wider hover:bg-pink-500 transition-colors font-medium">
                  Sign In
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-xs text-gray-400">or continue with</span>
                </div>
              </div>

              {/* Social placeholders */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-pink-200 transition-colors">
                  <span className="font-bold text-blue-500">G</span> Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-pink-200 transition-colors">
                  <span className="font-bold text-blue-700">f</span> Facebook
                </button>
              </div>

              <p className="text-center mt-6 text-sm text-gray-500">
                New to Shata Spa?{" "}
                <Link href="/templates/spa-salon-1/preview/register" className="text-pink-500 hover:underline font-medium">
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Guest Option */}
          <p className="text-center mt-5 text-sm text-gray-500">
            Just want to book?{" "}
            <Link href="/templates/spa-salon-1/preview/appointment" className="text-pink-400 hover:underline">
              Book as guest
            </Link>
          </p>
          <p className="text-center mt-2 text-sm">
            <Link href="/templates/spa-salon-1/preview" className="text-gray-400 hover:text-gray-600">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-xs text-center py-4">
        &copy; {new Date().getFullYear()} Shata Spa &amp; Salon &middot;{" "}
        <Link href="/templates/spa-salon-1/preview/terms" className="hover:text-pink-400">Terms</Link>
        {" &middot; "}
        <Link href="/templates/spa-salon-1/preview/contact" className="hover:text-pink-400">Contact</Link>
      </footer>
    </div>
  );
}

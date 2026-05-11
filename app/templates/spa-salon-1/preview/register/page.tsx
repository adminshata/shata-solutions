// app/templates/spa-salon-1/preview/register/page.tsx
import Link from "next/link";

export default function SpaSalon1RegisterPage() {
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
            <span>Already a member?</span>
            <Link href="/templates/spa-salon-1/preview/login" className="text-pink-500 hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Benefits Banner */}
          <div className="bg-pink-400 text-white rounded-2xl p-5 mb-4 text-center">
            <p className="text-sm font-medium mb-1">Join the Shata Spa Family</p>
            <p className="text-xs text-pink-100">Easy booking &bull; Loyalty rewards &bull; Exclusive member offers</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-light text-gray-800 mb-1 text-center">Create Your Account</h1>
            <p className="text-sm text-gray-500 text-center mb-6">Free to join. No credit card required.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">First Name</label>
                  <input
                    type="text"
                    placeholder="Sara"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    placeholder="Hassan"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+20 100 000 0000"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Repeat your password"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition"
                />
              </div>

              <div className="space-y-2.5 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-pink-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500">
                    I agree to the{" "}
                    <Link href="/templates/spa-salon-1/preview/terms" className="text-pink-500 hover:underline">Terms &amp; Conditions</Link>
                    {" "}and{" "}
                    <Link href="/templates/spa-salon-1/preview/terms" className="text-pink-500 hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-pink-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500">
                    Send me exclusive offers, beauty tips, and loyalty rewards via email
                  </span>
                </label>
              </div>

              <button className="w-full bg-pink-400 text-white py-3 rounded-full text-sm tracking-wider hover:bg-pink-500 transition-colors font-medium">
                Create My Account
              </button>
            </div>

            <p className="text-center mt-5 text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/templates/spa-salon-1/preview/login" className="text-pink-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          <p className="text-center mt-4 text-sm">
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

// app/templates/spa-salon-1/preview/login/page.tsx
import Link from "next/link";

export default function SpaSalon1LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        <div className="text-center mb-8">
          <img src="/templates/spaSalon1/images/logo.svg" alt="Shata Spa & Salon" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-gray-800">Sign In</h1>
          <p className="text-sm text-gray-500 mt-1">Access your appointment history and account</p>
        </div>
        <div className="space-y-4">
          <input type="email" placeholder="Email Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300" />
          <input type="password" placeholder="Password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-300" />
          <button className="w-full bg-pink-400 text-white py-3 rounded-full text-sm tracking-wider hover:bg-pink-500 transition-colors">
            Sign In
          </button>
        </div>
        <div className="text-center mt-6 text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/templates/spa-salon-1/preview/register" className="text-pink-500 hover:underline">Register</Link>
        </div>
        <div className="text-center mt-3 text-sm">
          <Link href="/templates/spa-salon-1/preview" className="text-gray-400 hover:text-gray-600">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

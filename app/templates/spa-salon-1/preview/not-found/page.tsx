// app/templates/spa-salon-1/preview/not-found/page.tsx
import Link from "next/link";

export default function SpaSalon1NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="text-center px-8">
        <h1 className="text-8xl font-thin text-pink-200 mb-4">404</h1>
        <h2 className="text-2xl font-light text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/templates/spa-salon-1/preview"
          className="inline-block px-8 py-3 bg-pink-400 text-white rounded-full text-sm tracking-wider hover:bg-pink-500 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

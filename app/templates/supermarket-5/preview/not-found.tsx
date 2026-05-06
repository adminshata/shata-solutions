"use client";

import Link from "next/link";
import { SiteShell } from "@/components/templates/supermarket5/layout/SiteShell";
import { Header } from "@/components/templates/supermarket5/layout/Header";
import { Footer } from "@/components/templates/supermarket5/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket5/layout/CartDrawer";

const BASE_PATH = "/templates/supermarket-5/preview";

export default function NotFound() {
  return (
    <SiteShell>
      <Header />
      <main className="py-20" style={{ background: "#F3F4F6" }}>
        <div className="container mx-auto px-4 flex flex-col items-center text-center gap-6">
          <div className="text-8xl font-black text-gray-200">404</div>
          <h1 className="text-3xl font-bold text-gray-800">Page Not Found</h1>
          <p className="text-gray-500 max-w-md">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex gap-3">
            <Link
              href={BASE_PATH}
              className="rounded px-6 py-3 text-sm font-bold text-white"
              style={{ background: "#7C3AED" }}
            >
              Go Home
            </Link>
            <Link
              href={`${BASE_PATH}/shop`}
              className="rounded border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}

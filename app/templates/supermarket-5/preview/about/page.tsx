"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/templates/supermarket5/layout/SiteShell";
import { Header } from "@/components/templates/supermarket5/layout/Header";
import { Footer } from "@/components/templates/supermarket5/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket5/layout/CartDrawer";
import { useSite } from "@/lib/supermarket5/context";

const BASE_PATH = "/templates/supermarket-5/preview";
const BASE_IMG = "/templates/supermarket5";

const STATS = [
  { label: "Products", value: "5,000+" },
  { label: "Happy Customers", value: "120K+" },
  { label: "Store Locations", value: "48" },
  { label: "Years in Business", value: "15+" },
];

const TEAM = [
  { name: "Sarah Johnson", role: "Founder & CEO", img: `${BASE_IMG}/feature/01.jpg` },
  { name: "Michael Chen", role: "Head of Operations", img: `${BASE_IMG}/feature/02.jpg` },
  { name: "Emma Williams", role: "Head of Purchasing", img: `${BASE_IMG}/feature/03.jpg` },
];

export default function AboutPage() {
  const config = useSite();
  return (
    <SiteShell>
      <Header />
      <main style={{ background: "#F3F4F6" }}>
        {/* Banner */}
        <div style={{ background: "#7C3AED" }} className="py-10">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-1 text-xs text-white/70 mb-2">
              <Link href={BASE_PATH} className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">About</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white">About {config.name}</h1>
          </div>
        </div>

        {/* Intro */}
        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Our Story</span>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-800">
                  Bringing Fresh Quality to Your Table
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {config.name} was founded with a simple mission: deliver the freshest produce, meats, and everyday
                  essentials at the best prices. We source directly from local farms and trusted suppliers to ensure
                  every product on our shelves meets the highest quality standards.
                </p>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  From our first store in Fresh City to our growing network of locations, we have always put our
                  customers first. Our team works tirelessly to ensure your shopping experience is seamless, whether
                  in-store or online.
                </p>
                <Link
                  href={`${BASE_PATH}/shop`}
                  className="mt-6 inline-flex items-center gap-2 rounded px-5 py-2.5 text-sm font-bold text-white"
                  style={{ background: "#7C3AED" }}
                >
                  Shop Now
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="relative h-72 md:h-96 rounded overflow-hidden">
                <Image
                  src={`${BASE_IMG}/banner/01.jpg`}
                  alt="Our store"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 bg-white border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl font-extrabold" style={{ color: "#7C3AED" }}>{s.value}</div>
                  <div className="mt-1 text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Our People</span>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-800">Meet the Team</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
              {TEAM.map((m) => (
                <div key={m.name} className="bg-white rounded border border-gray-100 text-center p-4 hover:shadow-md transition-shadow">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden mx-auto mb-3 bg-gray-100">
                    <Image src={m.img} alt={m.name} fill className="object-cover" sizes="128px" unoptimized />
                  </div>
                  <div className="font-bold text-gray-800">{m.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-gray-800">Why Shop With Us?</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Fresh Daily", copy: "Products sourced and stocked every morning from local farms.", icon: "🌿" },
                { title: "Best Prices", copy: "We guarantee competitive pricing on every single product.", icon: "💰" },
                { title: "Fast Delivery", copy: "Free delivery on orders over $50, same-day options available.", icon: "🚚" },
                { title: "Quality Assured", copy: "Every product meets our strict quality and freshness standards.", icon: "✅" },
              ].map((f) => (
                <div key={f.title} className="border border-gray-100 rounded p-5 text-center hover:border-[#7C3AED]/30 hover:shadow-sm transition-all">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}

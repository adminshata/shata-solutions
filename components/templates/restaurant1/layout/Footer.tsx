"use client";

import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/lib/restaurant1/context";

export function Footer() {
  const site = useSite();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{ background: "#111", color: "rgba(255,255,255,0.7)" }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Col 1 — About */}
        <div>
          <h4
            className="text-sm tracking-[0.2em] uppercase font-semibold mb-6 text-white"
            style={{ fontFamily: "var(--font-r1-heading, 'Great Vibes', cursive)" }}
          >
            {site.brand.name}
          </h4>
          <p className="text-sm leading-relaxed mb-6 text-gray-400">
            {site.brand.tagline || "Elegant Restaurant & Fine Dining"}
          </p>
          <p className="text-sm text-gray-400 mb-2">
            <span className="text-white">Address:</span> {site.contact.address}
          </p>
          <p className="text-sm text-gray-400 mb-2">
            <span className="text-white">Phone:</span>{" "}
            <a href={`tel:${site.contact.phone}`} className="hover:text-white transition-colors">
              {site.contact.phone}
            </a>
          </p>
          <p className="text-sm text-gray-400 mb-6">
            <span className="text-white">Email:</span>{" "}
            <a href={`mailto:${site.contact.email}`} className="hover:text-white transition-colors">
              {site.contact.email}
            </a>
          </p>
          {/* Social */}
          <div className="flex gap-3">
            {[
              { href: site.contact.facebook, icon: "facebook", label: "Facebook" },
              { href: site.contact.twitter, icon: "twitter", label: "Twitter" },
              { href: site.contact.instagram, icon: "instagram", label: "Instagram" },
              { href: site.contact.pinterest, icon: "pinterest", label: "Pinterest" },
            ].map(({ href, icon, label }) => (
              <a
                key={icon}
                href={href || "#"}
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center border border-white/20 text-white/60 hover:border-white/60 hover:text-white transition-all"
              >
                <SocialIcon name={icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Opening Hours */}
        <div>
          <h4
            className="text-sm tracking-[0.2em] uppercase font-semibold mb-6 text-white"
          >
            Opening Hours
          </h4>
          <div className="space-y-3">
            {site.contact.hours.map((h, i) => (
              <div key={i} className="flex justify-between text-sm border-b border-white/10 pb-3">
                <span className="text-gray-400">{h.day}</span>
                <span className="text-white">{h.hours}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/templates/restaurant-1/preview/reservation"
              className="inline-block px-6 py-3 text-xs tracking-widest uppercase font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: site.theme.primaryColor, color: site.theme.primaryColor }}
            >
              Make A Reservation
            </Link>
          </div>
        </div>

        {/* Col 3 — Navigation + Newsletter */}
        <div>
          <h4 className="text-sm tracking-[0.2em] uppercase font-semibold mb-6 text-white">
            Quick Links
          </h4>
          <ul className="space-y-2 mb-8">
            {site.navigation.map((nav) => (
              <li key={nav.href}>
                <Link
                  href={nav.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span
                    className="w-4 h-px inline-block"
                    style={{ background: site.theme.primaryColor }}
                  />
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="text-sm tracking-[0.2em] uppercase font-semibold mb-4 text-white">
            Newsletter
          </h4>
          {subscribed ? (
            <p className="text-sm text-green-400">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={site.footer.newsletterPlaceholder || "Your email address"}
                required
                className="flex-1 bg-white/5 border border-white/20 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs tracking-widest uppercase font-semibold transition-all hover:opacity-80"
                style={{ background: site.theme.primaryColor, color: "#fff" }}
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>{site.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/templates/restaurant-1/preview/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/templates/restaurant-1/preview/menu" className="hover:text-white transition-colors">Menu</Link>
            <Link href="/templates/restaurant-1/preview/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "facebook")
    return (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    );
  if (name === "twitter")
    return (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    );
  if (name === "instagram")
    return (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  // pinterest
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

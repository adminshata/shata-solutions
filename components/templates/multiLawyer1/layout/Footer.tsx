import Link from "next/link";
import { BASE, FIRM, PRACTICE_AREAS } from "@/lib/multiLawyer1/data";

const QUICK_LINKS = [
  { label: "Home", href: BASE },
  { label: "About the Firm", href: `${BASE}/about` },
  { label: "Our Attorneys", href: `${BASE}/attorneys` },
  { label: "Case Results", href: `${BASE}/case-results` },
  { label: "Legal Insights", href: `${BASE}/blog` },
  { label: "Contact Us", href: `${BASE}/contact` },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: `${BASE}/privacy` },
  { label: "Terms of Service", href: `${BASE}/terms` },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#030912] text-white/60 border-t border-[#c9a84c]/20">
      {/* CTA Bar */}
      <div className="bg-[#c9a84c]/10 border-b border-[#c9a84c]/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-lg">
              Ready to discuss your case?
            </p>
            <p className="text-white/60 text-sm mt-0.5">
              Free initial consultation. Confidential. No obligation.
            </p>
          </div>
          <Link
            href={`${BASE}/contact`}
            className="shrink-0 px-6 py-3 bg-[#c9a84c] text-[#050d1f] text-sm font-bold rounded-sm hover:bg-[#e4b96a] transition-colors"
          >
            Book a Free Consultation →
          </Link>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={BASE} className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center bg-[#c9a84c] text-[#050d1f] font-bold text-sm tracking-wider rounded-sm">
                M&G
              </div>
              <div>
                <p className="text-white font-semibold text-base leading-none">
                  {FIRM.name}
                </p>
                <p className="text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase mt-1">
                  Attorneys at Law
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              {FIRM.description}
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <span className="text-[#c9a84c] mt-0.5">📍</span>
                {FIRM.address}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c9a84c]">📞</span>
                <a href={`tel:${FIRM.phone}`} className="hover:text-[#c9a84c] transition-colors">
                  {FIRM.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c9a84c]">✉</span>
                <a href={`mailto:${FIRM.email}`} className="hover:text-[#c9a84c] transition-colors">
                  {FIRM.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c9a84c]">🕐</span>
                {FIRM.hours}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-5 pb-2 border-b border-[#c9a84c]/30">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#c9a84c] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#c9a84c]/50">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-5 pb-2 border-b border-[#c9a84c]/30">
              Practice Areas
            </h4>
            <ul className="space-y-2.5">
              {PRACTICE_AREAS.map((area) => (
                <li key={area.id}>
                  <Link
                    href={`${BASE}/practice-areas`}
                    className="text-sm hover:text-[#c9a84c] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#c9a84c]/50">›</span>
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Badges */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-5 pb-2 border-b border-[#c9a84c]/30">
              Our Credentials
            </h4>
            <div className="space-y-3">
              {[
                "New York State Bar Association",
                "American Bar Association",
                "New York State Trial Lawyers Association",
                "American Association for Justice",
                "Super Lawyers — Rated",
                "Best Lawyers in America — Recognized",
              ].map((badge) => (
                <div key={badge} className="flex items-start gap-2 text-sm">
                  <span className="text-[#c9a84c] text-xs mt-0.5">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6">
          {/* Legal Disclaimer */}
          <div className="mb-4 p-4 border border-[#c9a84c]/20 rounded-sm bg-[#c9a84c]/5 text-xs leading-relaxed">
            <strong className="text-white/70">Legal Disclaimer:</strong>{" "}
            This website template is for demonstration purposes only and does not create an attorney-client relationship. The information contained herein is not legal advice. Past results do not guarantee future outcomes. Contacting us does not create an attorney-client relationship. Please do not send confidential information until an attorney-client relationship has been established.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© {year} {FIRM.name}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#c9a84c] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

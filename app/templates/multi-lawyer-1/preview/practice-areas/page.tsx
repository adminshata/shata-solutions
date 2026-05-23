import Link from "next/link";
import { BASE, PRACTICE_AREAS, FIRM } from "@/lib/multiLawyer1/data";

export default function PracticeAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#0a1628] to-[#050d1f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Legal Services
          </p>
          <h1 className="ml-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Our Practice Areas
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
            Eight focused practice areas — each led by experienced attorneys with deep knowledge of their field. Whatever your legal challenge, we have the expertise to help.
          </p>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-24 bg-[#050d1f]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {PRACTICE_AREAS.map((area, idx) => (
              <div
                key={area.id}
                className="group bg-[#0a1628] border border-[#1a3060] rounded-sm p-8 hover:border-[#c9a84c]/40 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="text-[#c9a84c]/40 text-xs font-bold tracking-widest block mb-2">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="ml-serif text-2xl font-bold text-white group-hover:text-[#c9a84c] transition-colors">
                      {area.name}
                    </h2>
                  </div>
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-sm">
                    <span className="text-[#c9a84c] text-xl">⚖</span>
                  </div>
                </div>

                <p className="text-white/60 text-sm mb-4 font-medium">{area.description}</p>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{area.details}</p>

                {/* Key Services */}
                <div>
                  <p className="text-[#c9a84c] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                    Key Services
                  </p>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {area.keyServices.map((service) => (
                      <li
                        key={service}
                        className="flex items-start gap-2 text-xs text-white/55"
                      >
                        <span className="text-[#c9a84c]/70 mt-0.5">›</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <Link
                    href={`${BASE}/contact`}
                    className="text-[#c9a84c] text-xs font-semibold hover:text-[#e4b96a] transition-colors flex items-center gap-1.5"
                  >
                    Discuss your {area.name.toLowerCase()} matter →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-[#0a1628] border-t border-[#1a3060]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-white/35 text-xs leading-relaxed text-center max-w-4xl mx-auto">
            The information on this page is for general informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by your use of this website. Legal outcomes vary based on the specific facts and circumstances of each matter. Please contact our office to discuss your specific situation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#050d1f] border-t border-[#c9a84c]/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="ml-serif text-3xl font-bold text-white mb-4">
            Not Sure Where Your Matter Falls?
          </h2>
          <p className="text-white/60 mb-8">
            Contact us for a free consultation and we&apos;ll direct you to the right practice area and attorney for your situation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${BASE}/contact`}
              className="px-8 py-4 bg-[#c9a84c] text-[#050d1f] font-bold text-sm rounded-sm hover:bg-[#e4b96a] transition-colors"
            >
              Free Consultation
            </Link>
            <a
              href={`tel:${FIRM.phone}`}
              className="px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              {FIRM.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

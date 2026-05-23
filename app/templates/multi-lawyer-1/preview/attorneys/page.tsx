import Link from "next/link";
import { BASE, ATTORNEYS, FIRM } from "@/lib/multiLawyer1/data";

export default function AttorneysPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#0a1628] to-[#050d1f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Legal Team
          </p>
          <h1 className="ml-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Our Attorneys
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
            A team of accomplished attorneys with proven records across every practice area we serve. When you work with Morrison & Grant, you work directly with your attorney — not junior staff.
          </p>
        </div>
      </section>

      {/* Attorneys Grid */}
      <section className="py-24 bg-[#050d1f]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ATTORNEYS.map((attorney) => (
              <Link
                key={attorney.slug}
                href={`${BASE}/attorneys/${attorney.slug}`}
                className="group bg-[#0a1628] border border-[#1a3060] rounded-sm overflow-hidden hover:border-[#c9a84c]/50 hover:shadow-[0_20px_60px_rgba(201,168,76,0.08)] transition-all duration-300"
              >
                {/* Avatar */}
                <div className="relative h-56 bg-gradient-to-br from-[#0f1f3d] to-[#1a3060] flex flex-col items-center justify-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-[#c9a84c]/10 border-2 border-[#c9a84c]/40 flex items-center justify-center">
                    <span className="ml-serif text-3xl font-bold text-[#c9a84c]">
                      {attorney.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold tracking-wider uppercase rounded-sm">
                    {attorney.title}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h2 className="text-white font-bold text-xl mb-1 group-hover:text-[#c9a84c] transition-colors">
                    {attorney.name}
                  </h2>
                  <p className="text-[#c9a84c] text-sm font-medium mb-3">
                    {attorney.specialty}
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed mb-5 line-clamp-3">
                    {attorney.shortBio}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-[#c9a84c] font-bold text-lg">{attorney.yearsExp}+</p>
                      <p className="text-white/40 text-xs">Years exp.</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm font-medium text-right">
                        {attorney.education[0].split(",")[0]}
                      </p>
                      <p className="text-white/35 text-xs text-right">Education</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[#c9a84c] text-xs font-semibold group-hover:text-[#e4b96a] transition-colors">
                    View Full Profile →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bar Admissions Note */}
      <section className="py-12 bg-[#0a1628] border-t border-[#1a3060]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex-1">
              <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Bar Admissions & Recognition
              </p>
              <p className="text-white/55 text-sm leading-relaxed">
                Our attorneys are admitted to practice in New York, New Jersey, Connecticut, and before multiple federal courts. Our team members are recognized by Chambers USA, Super Lawyers, Best Lawyers in America, and The Legal 500.
              </p>
            </div>
            <div className="flex-1">
              <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Working With Our Attorneys
              </p>
              <p className="text-white/55 text-sm leading-relaxed">
                When you retain Morrison & Grant, you work directly with your lead attorney from consultation through resolution. We believe in accountable, personal legal service — not a model that hands your matter to junior staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#050d1f] border-t border-[#c9a84c]/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="ml-serif text-3xl font-bold text-white mb-4">
            Ready to Meet With One of Our Attorneys?
          </h2>
          <p className="text-white/60 mb-8">
            Schedule a free, confidential consultation and discuss your matter directly with an experienced attorney.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${BASE}/contact`}
              className="px-8 py-4 bg-[#c9a84c] text-[#050d1f] font-bold text-sm rounded-sm hover:bg-[#e4b96a] transition-colors"
            >
              Schedule Free Consultation
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

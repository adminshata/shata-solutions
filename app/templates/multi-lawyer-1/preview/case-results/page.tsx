import Link from "next/link";
import { BASE, CASE_RESULTS, STATS, FIRM } from "@/lib/multiLawyer1/data";

export default function CaseResultsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#0a1628] to-[#050d1f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Our Track Record
          </p>
          <h1 className="ml-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Case Results &<br />
            <span className="text-[#c9a84c]">Success Stories</span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
            A selection of notable results across our practice areas. We are proud of our track record, and we fight for every client with the same determination.
          </p>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <div className="bg-[#c9a84c]/10 border-y border-[#c9a84c]/25">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4">
          <p className="text-white/55 text-xs leading-relaxed text-center">
            <strong className="text-[#c9a84c]">Important:</strong> The results listed below are representative of cases handled by our attorneys. Past results do not guarantee future outcomes. Every legal matter is unique. The results in any individual case depend upon a variety of factors specific to that case.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16 bg-[#0a1628]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="ml-serif text-4xl font-bold text-[#c9a84c] mb-2">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-24 bg-[#050d1f]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CASE_RESULTS.map((result) => (
              <div
                key={result.id}
                className="bg-[#0a1628] border border-[#1a3060] rounded-sm p-7 hover:border-[#c9a84c]/40 hover:shadow-[0_20px_40px_rgba(201,168,76,0.05)] transition-all duration-300"
              >
                {/* Type badge */}
                <p className="text-[#c9a84c] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                  {result.type}
                </p>

                {/* Verdict */}
                <p className="ml-serif text-4xl font-bold text-white mb-5 border-b border-[#c9a84c]/20 pb-5">
                  {result.verdict}
                </p>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {result.description}
                </p>

                <p className="mt-5 text-white/25 text-[10px] leading-relaxed italic">
                  * Past results do not guarantee future outcomes.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Fight For */}
      <section className="py-24 bg-[#0a1628] border-t border-[#1a3060]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                Our Standard
              </p>
              <h2 className="ml-serif text-4xl font-bold text-white mb-6 leading-tight">
                Every Client Deserves<br />Maximum Representation
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                Behind every result on this page is a client who trusted us with something that mattered deeply to them — their business, their freedom, their family, or their financial security.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-10">
                We don&apos;t approach any matter as routine. We research thoroughly, prepare completely, and advocate relentlessly — regardless of the size of the matter or the client.
              </p>
              <Link
                href={`${BASE}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#050d1f] font-bold text-sm rounded-sm hover:bg-[#e4b96a] transition-colors"
              >
                Discuss Your Case →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "No Win, No Fee*", desc: "Personal injury matters handled on contingency." },
                { label: "Free Consultation", desc: "Every matter starts with a no-obligation review." },
                { label: "Direct Representation", desc: "Named partners handle your case personally." },
                { label: "Proven Strategy", desc: "Track record built over 26+ years of practice." },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#050d1f] border border-[#1a3060] rounded-sm p-5 hover:border-[#c9a84c]/30 transition-colors"
                >
                  <div className="w-6 h-0.5 bg-[#c9a84c] mb-3" />
                  <p className="text-white font-semibold text-sm mb-2">{item.label}</p>
                  <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#050d1f] border-t border-[#c9a84c]/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="ml-serif text-3xl font-bold text-white mb-4">
            Let Us Fight for Your Best Result
          </h2>
          <p className="text-white/60 mb-8">
            Schedule a free confidential consultation to discuss your legal matter with one of our experienced attorneys.
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
          <p className="mt-6 text-white/25 text-xs">
            * Contingency fee arrangements available for qualifying personal injury and employment matters. Consult an attorney for details.
          </p>
        </div>
      </section>
    </>
  );
}

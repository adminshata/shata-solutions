import Link from "next/link";
import { BASE, FIRM, STATS, VALUES } from "@/lib/multiLawyer1/data";

const TIMELINE = [
  { year: "1998", event: "Firm founded by James R. Morrison in Midtown Manhattan." },
  { year: "2002", event: "Eleanor T. Grant joins as Senior Partner, expanding family law and estate planning." },
  { year: "2007", event: "Criminal defense practice launched with Rafael A. Montoya as Partner." },
  { year: "2012", event: "Real estate practice established under Sarah L. Chen." },
  { year: "2015", event: "Recognized by Chambers USA and Super Lawyers for multi-practice excellence." },
  { year: "2019", event: "Marcus D. Williams joins as Personal Injury Partner, expanding plaintiff representation." },
  { year: "2023", event: "Immigration Law practice established, completing our eight-practice offering." },
  { year: "2026", event: "Morrison & Grant celebrates 28 years of service and over $200M recovered for clients." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#0a1628] to-[#050d1f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            About the Firm
          </p>
          <h1 className="ml-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            A Legacy of Legal<br />
            <span className="text-[#c9a84c]">Excellence</span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
            For over 26 years, Morrison & Grant LLP has represented individuals, families, and businesses with the same unwavering standard: exceptional legal skill and genuine dedication to our clients.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0a1628] border-y border-[#c9a84c]/20">
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

      {/* Firm Story */}
      <section className="py-24 bg-[#050d1f]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-16 lg:grid-cols-2 items-start">
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">Our Story</p>
            <h2 className="ml-serif text-4xl font-bold text-white mb-6">
              Built on Principle.<br />Grown on Results.
            </h2>
            <div className="space-y-5 text-white/65 text-base leading-relaxed">
              <p>
                Morrison & Grant LLP was founded in 1998 by James R. Morrison with a single mission: to provide New York clients with the caliber of legal representation typically reserved for the most powerful institutions — but with the personal attention of a dedicated partner, not a revolving door of associates.
              </p>
              <p>
                Over the following years, we expanded deliberately. Each new practice area was built only when we identified attorneys of the highest caliber to lead it. We grew our team to serve more clients, but never at the expense of quality or personal service.
              </p>
              <p>
                Today, Morrison & Grant LLP is a full-service law firm of experienced attorneys with deep roots in the New York legal community. We represent clients ranging from individuals navigating personal crises to corporations managing complex multi-party transactions. The common thread is our standard of excellence.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-6">Firm Timeline</p>
            <div className="space-y-6">
              {TIMELINE.map((item) => (
                <div key={item.year} className="flex gap-5">
                  <div className="shrink-0">
                    <div className="w-16 h-8 flex items-center justify-center bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-sm">
                      <span className="text-[#c9a84c] text-xs font-bold">{item.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-white/70 text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-[#0a1628]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Our Foundation
            </p>
            <h2 className="ml-serif text-4xl font-bold text-white">
              Mission & Values
            </h2>
            <p className="text-white/55 text-lg mt-4 max-w-2xl mx-auto">
              Our mission is to deliver elite legal counsel with integrity, clarity, and an unrelenting focus on results for every client we serve.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, idx) => (
              <div
                key={v.title}
                className="bg-[#050d1f] border border-[#1a3060] rounded-sm p-7 hover:border-[#c9a84c]/40 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[#c9a84c]/10 rounded-sm mb-5">
                  <span className="text-[#c9a84c] font-bold text-sm">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-base mb-3">{v.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#050d1f]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                Why Clients Choose Us
              </p>
              <h2 className="ml-serif text-4xl font-bold text-white mb-6">
                The Morrison & Grant<br />Difference
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Many law firms offer competent legal services. Fewer offer the combination of deep expertise, personal accountability, and genuine investment in client outcomes that defines Morrison & Grant LLP.
              </p>
              <Link
                href={`${BASE}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#050d1f] font-bold text-sm rounded-sm hover:bg-[#e4b96a] transition-colors"
              >
                Schedule a Consultation
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Direct Partner Access",
                  desc: "You work with the named partner handling your matter — not a first-year associate.",
                },
                {
                  title: "Multi-Practice Coordination",
                  desc: "When legal matters cross practice areas, our team coordinates internally so nothing falls through the cracks.",
                },
                {
                  title: "Recognized Excellence",
                  desc: "Our attorneys are recognized by Chambers USA, Super Lawyers, Best Lawyers in America, and The Legal 500.",
                },
                {
                  title: "Clear Fee Structures",
                  desc: "We explain our fee arrangements clearly upfront. No surprises, no hidden charges, no ambiguity.",
                },
                {
                  title: "Confidential & Secure",
                  desc: "Attorney-client privilege is foundational. Your matters are handled with absolute discretion.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 bg-[#0a1628] border border-[#1a3060] rounded-sm hover:border-[#c9a84c]/30 transition-colors"
                >
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a1628] border-t border-[#c9a84c]/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="ml-serif text-3xl font-bold text-white mb-4">
            Ready to Work With Our Team?
          </h2>
          <p className="text-white/60 mb-8">
            Schedule a free initial consultation with one of our attorneys today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${BASE}/contact`}
              className="px-8 py-4 bg-[#c9a84c] text-[#050d1f] font-bold text-sm rounded-sm hover:bg-[#e4b96a] transition-colors"
            >
              Book a Free Consultation
            </Link>
            <Link
              href={`${BASE}/attorneys`}
              className="px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              Meet Our Attorneys
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

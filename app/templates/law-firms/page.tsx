import Link from "next/link";

const TEMPLATES = [
  {
    slug: "multi-lawyer-1",
    name: "Multi Lawyer",
    description:
      "Premium multi-attorney law firm website. Practice areas, attorney profiles, case results, blog, and consultation booking.",
    tags: ["Multi-Attorney", "Consultation Forms", "Case Results", "Blog"],
    href: "/templates/multi-lawyer-1/preview",
    accent: "from-[#c9a84c]/20 to-[#0a1628]",
    badge: "Law Firm",
  },
];

export default function LawFirmsPage() {
  return (
    <main className="min-h-screen bg-[#050d1f] text-white py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Template Category
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">
            Law Firm Templates
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Professional website templates for law firms, solo attorneys, and legal practices. Built for consultation-driven businesses with trust, credibility, and lead conversion in mind.
          </p>
        </div>

        {/* Templates */}
        <div className="grid gap-8 md:grid-cols-2">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.slug}
              className="group bg-[#0a1628] border border-[#1a3060] rounded-2xl overflow-hidden hover:border-[#c9a84c]/50 hover:shadow-[0_20px_60px_rgba(201,168,76,0.08)] transition-all duration-300"
            >
              {/* Preview thumbnail */}
              <div
                className={`relative h-48 bg-gradient-to-br ${tpl.accent} flex items-center justify-center`}
              >
                {/* Browser chrome mockup */}
                <div className="w-[85%] bg-[#050d1f]/80 rounded-lg border border-white/10 p-3 shadow-xl">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-400/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <span className="w-2 h-2 rounded-full bg-green-400/60" />
                    <div className="ml-2 flex-1 bg-white/[0.06] rounded px-2 py-0.5 text-[9px] text-white/30 font-mono">
                      morrisongrantlaw.com
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-6 rounded bg-gradient-to-r from-[#c9a84c]/30 to-[#0a1628] w-full" />
                    <div className="flex gap-1.5">
                      <div className="h-3 rounded bg-white/10 flex-1" />
                      <div className="h-3 rounded bg-white/10 w-1/3" />
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-4 rounded bg-white/[0.06] border border-white/10" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold tracking-wider rounded-sm border border-[#c9a84c]/30">
                    {tpl.badge}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-white font-bold text-xl mb-2 group-hover:text-[#c9a84c] transition-colors">
                  {tpl.name}
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mb-5">
                  {tpl.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#050d1f] border border-[#1a3060] text-white/50 text-[11px] rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={tpl.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c9a84c] text-[#050d1f] text-sm font-bold rounded-sm hover:bg-[#e4b96a] transition-colors"
                >
                  View Live Preview →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Browse more */}
        <div className="mt-16 text-center">
          <p className="text-white/50 text-sm mb-4">
            More legal and professional service templates coming soon.
          </p>
          <Link
            href="/services/website-platform"
            className="inline-flex items-center gap-2 text-[#c9a84c] text-sm font-semibold hover:text-[#e4b96a] transition-colors"
          >
            ← Browse All Templates
          </Link>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { BASE, BLOG_POSTS } from "@/lib/multiLawyer1/data";

const CATEGORIES = ["All", "Business Law", "Family Law", "Immigration Law", "Real Estate Law", "Personal Injury", "Estate Planning"];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#0a1628] to-[#050d1f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Legal Insights
          </p>
          <h1 className="ml-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Legal Insights &<br />
            <span className="text-[#c9a84c]">Resources</span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
            Practical legal insights from our attorneys — written to help you understand your rights, obligations, and options. Not legal advice; always consult an attorney for your specific situation.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-[#c9a84c]/8 border-y border-[#c9a84c]/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-3">
          <p className="text-white/45 text-xs text-center">
            The articles on this blog are for general informational purposes only and do not constitute legal advice. No attorney-client relationship is formed by reading this content.
          </p>
        </div>
      </div>

      {/* Categories */}
      <section className="py-8 bg-[#050d1f] border-b border-[#1a3060]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 text-xs font-semibold rounded-sm cursor-pointer transition-colors ${
                  cat === "All"
                    ? "bg-[#c9a84c] text-[#050d1f]"
                    : "border border-[#1a3060] text-white/60 hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-[#050d1f]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="group bg-[#0a1628] border border-[#1a3060] rounded-sm overflow-hidden hover:border-[#c9a84c]/40 hover:shadow-[0_20px_40px_rgba(201,168,76,0.05)] transition-all duration-300"
              >
                {/* Thumbnail placeholder */}
                <div className="relative h-44 bg-gradient-to-br from-[#0f1f3d] to-[#1a3060] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <span className="text-8xl">⚖</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold tracking-wider uppercase rounded-sm border border-[#c9a84c]/30">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4 text-xs text-white/40">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-[#c9a84c] transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-white/55 text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[#c9a84c] text-xs font-semibold">
                    Read Article →
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe / CTA */}
      <section className="py-20 bg-[#0a1628] border-t border-[#c9a84c]/20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Need Legal Guidance?
          </p>
          <h2 className="ml-serif text-3xl font-bold text-white mb-4">
            Reading About the Law Is a Start
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Our attorneys can provide advice specific to your situation. Schedule a free consultation — no obligation, completely confidential.
          </p>
          <Link
            href={`${BASE}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a84c] text-[#050d1f] font-bold text-sm rounded-sm hover:bg-[#e4b96a] transition-colors"
          >
            Book a Free Consultation →
          </Link>
        </div>
      </section>
    </>
  );
}

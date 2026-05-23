import { notFound } from "next/navigation";
import Link from "next/link";
import { BASE, ATTORNEYS } from "@/lib/multiLawyer1/data";

export function generateStaticParams() {
  return ATTORNEYS.map((a) => ({ slug: a.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AttorneyDetailPage({ params }: Props) {
  const { slug } = await params;
  const attorney = ATTORNEYS.find((a) => a.slug === slug);
  if (!attorney) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#0a1628] to-[#050d1f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(201,168,76,0.07),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            href={`${BASE}/attorneys`}
            className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-[#c9a84c] transition-colors mb-8"
          >
            ← Back to Attorneys
          </Link>

          <div className="grid gap-12 lg:grid-cols-[auto_1fr] items-start">
            {/* Avatar */}
            <div className="w-48 h-48 shrink-0 rounded-sm bg-gradient-to-br from-[#0f1f3d] to-[#1a3060] border border-[#c9a84c]/30 flex items-center justify-center">
              <span className="ml-serif text-5xl font-bold text-[#c9a84c]">
                {attorney.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>

            {/* Info */}
            <div>
              <span className="inline-block px-3 py-1 bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold tracking-wider uppercase rounded-sm mb-4">
                {attorney.title}
              </span>
              <h1 className="ml-serif text-4xl lg:text-5xl font-bold text-white mb-2">
                {attorney.name}
              </h1>
              <p className="text-[#c9a84c] text-lg font-medium mb-6">
                {attorney.specialty}
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Experience</p>
                  <p className="text-white font-semibold">{attorney.yearsExp}+ Years</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Phone</p>
                  <a href={`tel:${attorney.phone}`} className="text-white font-semibold hover:text-[#c9a84c] transition-colors">
                    {attorney.phone}
                  </a>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${attorney.email}`} className="text-white font-semibold hover:text-[#c9a84c] transition-colors">
                    {attorney.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-[#050d1f]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] items-start">
            {/* Bio */}
            <div>
              <h2 className="ml-serif text-2xl font-bold text-white mb-6">
                About {attorney.name.split(" ")[0]}
              </h2>
              <p className="text-white/65 text-base leading-relaxed mb-10">
                {attorney.bio}
              </p>

              {/* Case Types */}
              <div className="mb-10">
                <h3 className="text-[#c9a84c] text-xs font-bold tracking-[0.2em] uppercase mb-5">
                  Focus Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {attorney.caseTypes.map((ct) => (
                    <span
                      key={ct}
                      className="px-4 py-2 bg-[#0a1628] border border-[#1a3060] text-white/70 text-sm rounded-sm"
                    >
                      {ct}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-10">
                <h3 className="text-[#c9a84c] text-xs font-bold tracking-[0.2em] uppercase mb-5">
                  Education
                </h3>
                <ul className="space-y-3">
                  {attorney.education.map((edu) => (
                    <li key={edu} className="flex items-start gap-3">
                      <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                      <span className="text-white/70 text-sm">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bar Admissions */}
              <div>
                <h3 className="text-[#c9a84c] text-xs font-bold tracking-[0.2em] uppercase mb-5">
                  Bar Admissions
                </h3>
                <ul className="space-y-3">
                  {attorney.admissions.map((adm) => (
                    <li key={adm} className="flex items-start gap-3">
                      <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                      <span className="text-white/70 text-sm">{adm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Consultation CTA */}
              <div className="bg-[#0a1628] border border-[#c9a84c]/30 rounded-sm p-7">
                <h3 className="ml-serif text-xl font-bold text-white mb-3">
                  Schedule a Consultation
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mb-6">
                  Speak directly with {attorney.name.split(" ")[0]} about your legal matter. Free initial consultation. Confidential.
                </p>
                <Link
                  href={`${BASE}/contact`}
                  className="block w-full text-center px-6 py-3 bg-[#c9a84c] text-[#050d1f] font-bold text-sm rounded-sm hover:bg-[#e4b96a] transition-colors mb-3"
                >
                  Book a Free Consultation
                </Link>
                <a
                  href={`tel:${attorney.phone}`}
                  className="block w-full text-center px-6 py-3 border border-white/20 text-white font-semibold text-sm rounded-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
                >
                  {attorney.phone}
                </a>
              </div>

              {/* Practice info */}
              <div className="bg-[#0a1628] border border-[#1a3060] rounded-sm p-6">
                <h4 className="text-[#c9a84c] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  At a Glance
                </h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/50">Practice Area</span>
                    <span className="text-white font-medium text-right">{attorney.specialty}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/50">Title</span>
                    <span className="text-white font-medium text-right">{attorney.title}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/50">Experience</span>
                    <span className="text-white font-medium text-right">{attorney.yearsExp}+ years</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/50">Education</span>
                    <span className="text-white font-medium text-right text-xs leading-tight">
                      {attorney.education[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Back link */}
              <Link
                href={`${BASE}/attorneys`}
                className="block text-center text-[#c9a84c] text-sm font-semibold hover:text-[#e4b96a] transition-colors"
              >
                ← View All Attorneys
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Attorneys */}
      <section className="py-16 bg-[#0a1628] border-t border-[#1a3060]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            Also at Morrison & Grant
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ATTORNEYS.filter((a) => a.slug !== attorney.slug)
              .slice(0, 4)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`${BASE}/attorneys/${other.slug}`}
                  className="group flex items-center gap-4 p-4 bg-[#050d1f] border border-[#1a3060] rounded-sm hover:border-[#c9a84c]/40 transition-colors"
                >
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center">
                    <span className="ml-serif text-sm font-bold text-[#c9a84c]">
                      {other.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold group-hover:text-[#c9a84c] transition-colors">
                      {other.name}
                    </p>
                    <p className="text-white/45 text-xs">{other.specialty}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

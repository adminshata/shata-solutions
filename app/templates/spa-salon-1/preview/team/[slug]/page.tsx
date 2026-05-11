// app/templates/spa-salon-1/preview/team/[slug]/page.tsx
import Link from "next/link";
import { defaultSpaSalon1Config } from "@/lib/spaSalon1/defaults";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SpaSalon1TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = defaultSpaSalon1Config.team.find((m) => m.slug === slug);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center px-8">
          <h1 className="text-4xl font-light text-gray-700 mb-4">Team Member Not Found</h1>
          <Link href="/templates/spa-salon-1/preview/team" className="text-pink-500 hover:underline text-sm">
            ← Back to Our Team
          </Link>
        </div>
      </div>
    );
  }

  const otherMembers = defaultSpaSalon1Config.team.filter((m) => m.slug !== slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 px-4 text-center">
        <span className="mr-6">📞 +20 100 000 0000</span>
        <span>✉ info@shatasolutions.com</span>
        <span className="ml-6">Mon–Sat: 9:00 AM – 8:00 PM</span>
      </div>

      {/* Nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/templates/spa-salon-1/preview">
            <img src="/templates/spaSalon1/images/logo.svg" alt="Shata Spa & Salon" className="h-10" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/templates/spa-salon-1/preview" className="hover:text-pink-500">Home</Link>
            <Link href="/templates/spa-salon-1/preview/about" className="hover:text-pink-500">About</Link>
            <Link href="/templates/spa-salon-1/preview/services" className="hover:text-pink-500">Services</Link>
            <Link href="/templates/spa-salon-1/preview/team" className="text-pink-500 font-medium">Team</Link>
            <Link href="/templates/spa-salon-1/preview/gallery" className="hover:text-pink-500">Gallery</Link>
            <Link href="/templates/spa-salon-1/preview/contact" className="hover:text-pink-500">Contact</Link>
          </nav>
          <Link
            href="/templates/spa-salon-1/preview/appointment"
            className="hidden md:inline-block px-5 py-2 bg-pink-400 text-white text-sm rounded-full hover:bg-pink-500 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-pink-50 py-4 px-6">
        <div className="max-w-6xl mx-auto text-sm text-gray-500">
          <Link href="/templates/spa-salon-1/preview" className="hover:text-pink-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/templates/spa-salon-1/preview/team" className="hover:text-pink-500">Our Team</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{member.name}</span>
        </div>
      </div>

      {/* Member Profile */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5] bg-pink-50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/templates/spaSalon1/images/team-1.jpg";
                  }}
                />
              </div>
              {/* Social */}
              <div className="flex gap-3 mt-5">
                {member.social?.instagram && (
                  <a
                    href={member.social.instagram}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-pink-400 hover:text-pink-400 transition-colors text-sm"
                  >
                    IG
                  </a>
                )}
                {member.social?.facebook && (
                  <a
                    href={member.social.facebook}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-pink-400 hover:text-pink-400 transition-colors text-sm"
                  >
                    FB
                  </a>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="pt-4">
              <p className="text-pink-400 text-sm tracking-widest uppercase mb-2">Meet Our Expert</p>
              <h1 className="text-4xl font-light text-gray-800 mb-2">{member.name}</h1>
              <p className="text-lg text-gray-500 mb-6">{member.role}</p>

              <div className="w-12 h-0.5 bg-pink-300 mb-6"></div>

              <p className="text-gray-600 leading-relaxed mb-8">{member.bio}</p>

              {/* Specialties */}
              {member.specialties && member.specialties.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-4 py-1.5 bg-pink-50 text-pink-600 text-sm rounded-full border border-pink-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gray-50 rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl font-light text-pink-400">10+</div>
                  <div className="text-xs text-gray-500 mt-1">Years Experience</div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-2xl font-light text-pink-400">500+</div>
                  <div className="text-xs text-gray-500 mt-1">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-pink-400">5★</div>
                  <div className="text-xs text-gray-500 mt-1">Average Rating</div>
                </div>
              </div>

              <Link
                href="/templates/spa-salon-1/preview/appointment"
                className="inline-block px-8 py-3 bg-pink-400 text-white rounded-full text-sm tracking-wider hover:bg-pink-500 transition-colors"
              >
                Book with {member.name.split(" ")[0]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Rest of the Team */}
      <section className="py-14 bg-pink-50 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-light text-gray-800 mb-2 text-center">Meet the Rest of the Team</h2>
          <p className="text-gray-500 text-sm text-center mb-10">Our certified specialists are here for you</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherMembers.map((m) => (
              <Link
                key={m.id}
                href={`/templates/spa-salon-1/preview/team/${m.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/templates/spaSalon1/images/team-1.jpg";
                    }}
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="font-medium text-gray-800">{m.name}</div>
                  <div className="text-xs text-pink-400 mt-1">{m.role}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/templates/spa-salon-1/preview/team" className="text-sm text-pink-500 hover:underline">
              ← Back to Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
        © {new Date().getFullYear()} Shata Spa & Salon. All rights reserved.
        <span className="mx-3">|</span>
        <Link href="/templates/spa-salon-1/preview/contact" className="hover:text-pink-400">Contact Us</Link>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  return defaultSpaSalon1Config.team.map((m) => ({ slug: m.slug }));
}

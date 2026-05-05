

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Your privacy matters. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20 space-y-10 text-white/70 leading-7">
        <div>
          <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
          <p className="mt-4">
            We may collect personal information such as your name, email address, phone number,
            and any details you provide through forms or communication.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">How We Use Your Information</h2>
          <p className="mt-4">
            We use your information to provide services, communicate with you, improve our systems,
            and deliver a better customer experience.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Data Protection</h2>
          <p className="mt-4">
            We implement security measures to protect your data from unauthorized access, misuse,
            or disclosure.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Third-Party Services</h2>
          <p className="mt-4">
            We may use third-party tools and services to operate our business, including payment
            processors and analytics providers.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Your Rights</h2>
          <p className="mt-4">
            You have the right to request access, update, or deletion of your personal data at any time.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p className="mt-4">
            If you have any questions about this policy, please contact us through the contact page.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-white/[0.02] p-10">
          <h2 className="text-2xl font-semibold">
            Need more information?
          </h2>
          <p className="mt-3 text-white/60">
            Reach out to us and we’ll be happy to help.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-6 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
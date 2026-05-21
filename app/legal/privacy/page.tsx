

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
            If you have any questions about this policy or wish to exercise your data rights, please contact our support team directly.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:support@shatasolutions.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white hover:bg-white/[0.09] transition-colors"
            >
              <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              support@shatasolutions.com
            </a>
          </div>
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
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20 space-y-10 text-white/70 leading-7">
        <div>
          <h2 className="text-2xl font-semibold text-white">Use of Services</h2>
          <p className="mt-4">
            By accessing our services, you agree to use them only for lawful purposes and in accordance
            with these terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Service Scope</h2>
          <p className="mt-4">
            We provide business setup, automation, development, and consulting services. Results may vary
            depending on client cooperation and external factors.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Payments</h2>
          <p className="mt-4">
            All payments are processed securely. Fees are non-refundable once work has started unless
            otherwise agreed in writing. All sales are final unless otherwise agreed in writing prior to project commencement.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Refund Policy</h2>
          <p className="mt-4">
            Due to the nature of digital and consulting services, fees are non-refundable once work has started. Any exceptions must be agreed upon in writing before the start of the project.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Client Responsibilities</h2>
          <p className="mt-4">
            Clients are responsible for providing accurate information and responding in a timely manner
            to ensure smooth project completion.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Limitation of Liability</h2>
          <p className="mt-4">
            We are not liable for any indirect, incidental, or consequential damages resulting from the
            use of our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">No Guarantees</h2>
          <p className="mt-4">
            We do not guarantee specific results, revenue, or outcomes from the use of our services. Any examples or projections are for illustrative purposes only.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Modifications</h2>
          <p className="mt-4">
            We may update these terms at any time. Continued use of our services constitutes acceptance
            of the updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p className="mt-4">
            If you have any questions regarding these terms, please reach out to us directly at:
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:info@shatasolutions.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white hover:bg-white/[0.09] transition-colors"
            >
              <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              info@shatasolutions.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-white/[0.02] p-10">
          <h2 className="text-2xl font-semibold">
            Need clarification?
          </h2>
          <p className="mt-3 text-white/60">
            Reach out to us and we’ll walk you through everything.
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
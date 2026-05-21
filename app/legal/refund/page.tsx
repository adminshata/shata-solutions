import Link from "next/link";

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Refund Policy
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Our commitment to fair, transparent refund practices for all Shata Solutions services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20 space-y-10 text-white/70 leading-7">
        <div>
          <h2 className="text-2xl font-semibold text-white">Our Commitment</h2>
          <p className="mt-4">
            At Shata Solutions (operated by Shata Global LLC), we strive to deliver exceptional digital
            services. We understand that circumstances change, and this policy outlines how we handle
            refund requests fairly and transparently.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Eligibility for Refunds</h2>
          <p className="mt-4">
            Refunds may be considered under the following conditions:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-white/70">
            <li>A refund request is submitted before any project work or filing has begun.</li>
            <li>A duplicate payment was made in error.</li>
            <li>A technical failure on our platform prevented service delivery.</li>
          </ul>
          <p className="mt-4">
            Once work has commenced on a project — including any research, design, filing, development,
            or configuration — fees are generally non-refundable. Any exceptions must be agreed upon
            in writing prior to project commencement.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Non-Refundable Services</h2>
          <p className="mt-4">
            The following services are non-refundable once initiated:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-white/70">
            <li>LLC formation and state filing fees (government fees are non-recoverable)</li>
            <li>Domain registration and renewal fees</li>
            <li>Completed website builds, design work, or branding projects</li>
            <li>Active subscription services already delivered for the billing period</li>
            <li>AI automation and software configuration work already delivered</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Subscription Services</h2>
          <p className="mt-4">
            For monthly or annual subscription plans, you may cancel at any time. Cancellation takes
            effect at the end of the current billing cycle. No partial refunds are issued for unused
            time within a paid period.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">How to Request a Refund</h2>
          <p className="mt-4">
            To submit a refund request, email our billing team with your order details and the reason
            for your request. We will review and respond within 2 business days.
          </p>
          <div className="mt-4">
            <a
              href="mailto:billing@shatasolutions.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white hover:bg-white/[0.09] transition-colors"
            >
              <svg className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              billing@shatasolutions.com
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Processing Time</h2>
          <p className="mt-4">
            Approved refunds are processed within 5–10 business days to the original payment method.
            Processing times may vary depending on your bank or payment provider.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Disputes</h2>
          <p className="mt-4">
            If you have a concern about a charge or service, we encourage you to contact us directly
            before initiating a chargeback. We are committed to resolving disputes fairly and promptly.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Policy Updates</h2>
          <p className="mt-4">
            We may update this policy from time to time. Continued use of our services after changes
            constitutes acceptance of the updated policy.
          </p>
        </div>
      </section>

      {/* Billing contact card */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-white/[0.02] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">Billing & Refund Inquiries</p>
            <p className="text-sm text-white/60 mt-0.5">Our billing team responds within 2 business days.</p>
            <a href="mailto:billing@shatasolutions.com" className="text-sm text-orange-400 hover:text-orange-300 transition-colors mt-1 block">
              billing@shatasolutions.com
            </a>
          </div>
          <a
            href="mailto:billing@shatasolutions.com"
            className="flex-shrink-0 px-5 py-2.5 rounded-full bg-orange-500/20 text-orange-300 text-sm font-medium hover:bg-orange-500/30 transition-colors border border-orange-500/20"
          >
            Contact Billing
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-white/[0.02] p-10">
          <h2 className="text-2xl font-semibold">
            Have a question about your order?
          </h2>
          <p className="mt-3 text-white/60">
            Our support team is here to help you resolve any billing concerns.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:billing@shatasolutions.com"
              className="inline-block px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Email Billing Team
            </a>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/[0.06] transition-colors"
            >
              Visit Contact Page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

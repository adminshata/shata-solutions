

import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$99",
    description: "Best for individuals starting their first business.",
    features: [
      "LLC Formation",
      "Basic guidance",
      "Email support",
    ],
    cta: "Start now",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$299",
    description: "For serious founders who want a complete setup.",
    features: [
      "LLC Formation",
      "EIN Filing",
      "Stripe / Payment Setup",
      "Business guidance",
      "Priority support",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Full System",
    price: "$599",
    description: "Everything done for you — from setup to automation.",
    features: [
      "LLC + EIN",
      "Payment system setup",
      "Website or landing page",
      "AI automation system",
      "Custom workflows",
      "1-on-1 support",
    ],
    cta: "Request full setup",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Simple pricing. Real value.
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Choose the right setup for your business. Start simple or go all-in — we handle the work.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 flex flex-col justify-between transition ${
                plan.highlight
                  ? "border-blue-500 bg-blue-500/10 scale-105"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div>
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="mt-2 text-white/60 text-sm">{plan.description}</p>

                <div className="mt-6 text-3xl font-bold">{plan.price}</div>

                <ul className="mt-6 space-y-3 text-sm text-white/70">
                  {plan.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className={`mt-8 block text-center px-6 py-3 rounded-full text-sm font-medium transition ${
                  plan.highlight
                    ? "bg-white text-black hover:bg-white/90"
                    : "border border-white/20 hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Value Section */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 text-center">
          <h2 className="text-3xl font-semibold">
            Not just services — a full business system
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            We don’t just set things up. We build systems that help you launch faster, operate smoother, and scale smarter.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-white/[0.02] p-10">
          <h2 className="text-3xl font-semibold">
            Ready to get started?
          </h2>
          <p className="mt-4 text-white/60">
            Let’s build your business the right way.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90"
            >
              Start now
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 border border-white/20 rounded-full text-sm hover:bg-white/10"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
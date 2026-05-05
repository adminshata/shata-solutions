

export default function StripeFAQ() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-6">Stripe FAQ</h1>

      <div className="space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="font-semibold">What is Stripe?</h2>
          <p>Stripe is a payment processor that allows you to accept payments online from customers worldwide.</p>
        </div>

        <div>
          <h2 className="font-semibold">Do I need a US company to use Stripe?</h2>
          <p>Yes, in most cases you need a US LLC and EIN to fully access Stripe’s features.</p>
        </div>

        <div>
          <h2 className="font-semibold">How long does Stripe setup take?</h2>
          <p>Usually 1–2 days if all your documents are ready.</p>
        </div>

        <div>
          <h2 className="font-semibold">Can I accept international payments?</h2>
          <p>Yes, Stripe supports multiple currencies and global payments.</p>
        </div>

        <div>
          <h2 className="font-semibold">Can you help me set up Stripe?</h2>
          <p>Yes, we handle the full setup process including LLC, EIN, and Stripe activation.</p>
        </div>
      </div>
    </div>
  );
}
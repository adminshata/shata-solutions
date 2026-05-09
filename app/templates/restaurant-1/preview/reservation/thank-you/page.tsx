import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#f9f6f2" }}>
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1
          className="text-4xl font-light mb-4"
          style={{ fontFamily: "var(--font-r1-heading, 'Great Vibes', cursive)", color: "#1a1a1a" }}
        >
          Reservation Confirmed!
        </h1>
        <div className="flex justify-center mb-6">
          <div className="w-12 h-px self-center" style={{ background: "#c8a97e" }} />
          <div className="w-2 h-2 rounded-full mx-2" style={{ background: "#c8a97e" }} />
          <div className="w-12 h-px self-center" style={{ background: "#c8a97e" }} />
        </div>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for your reservation. We look forward to welcoming you to Shata Bistro One.
          A confirmation will be sent to your email shortly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/templates/restaurant-1/preview"
            className="px-6 py-3 text-xs tracking-widest uppercase font-semibold border transition-all hover:opacity-80"
            style={{ borderColor: "#c8a97e", color: "#c8a97e" }}
          >
            Back to Home
          </Link>
          <Link
            href="/templates/restaurant-1/preview/menu"
            className="px-6 py-3 text-xs tracking-widest uppercase font-semibold text-white transition-all hover:opacity-80"
            style={{ background: "#c8a97e" }}
          >
            View Menu
          </Link>
        </div>
      </div>
    </div>
  );
}

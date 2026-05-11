// app/templates/spa-salon-1/preview/appointment/thank-you/page.tsx
import Link from "next/link";

export default function SpaSalon1ThankYouPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 px-4 text-center">
        <span className="mr-6">+20 100 000 0000</span>
        <span>info@shatasolutions.com</span>
      </div>

      {/* Nav */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/templates/spa-salon-1/preview">
            <img src="/templates/spaSalon1/images/logo.svg" alt="Shata Spa & Salon" className="h-10" />
          </Link>
          <Link
            href="/templates/spa-salon-1/preview"
            className="text-sm text-gray-500 hover:text-pink-500"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-light text-gray-800 mb-2">Booking Request Received!</h1>
          <p className="text-gray-500">
            Thank you for choosing Shata Spa &amp; Salon. We&apos;ll confirm your appointment within 24 hours.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-5">Booking Summary</h2>
          <div className="space-y-4">
            {[
              { label: "Booking Reference", value: "#SPA-2026-00142" },
              { label: "Service", value: "Deep Cleansing Facial" },
              { label: "Requested Date", value: "To be confirmed" },
              { label: "Duration", value: "60 minutes" },
              { label: "Therapist", value: "Based on availability" },
              { label: "Location", value: "123 Luxury Lane, Cairo, Egypt" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{row.label}</span>
                <span className="text-sm font-medium text-gray-800 text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-5">What Happens Next</h2>
          <div className="space-y-5">
            {[
              { step: "1", title: "Confirmation Email", desc: "We'll send a confirmation to info@shatasolutions.com within a few minutes." },
              { step: "2", title: "We Review Your Request", desc: "Our team will review your preferred date and service within 24 hours." },
              { step: "3", title: "Final Confirmation Call", desc: "We'll call or message you to confirm the exact time and therapist." },
              { step: "4", title: "Your Appointment", desc: "Arrive 10 minutes early and enjoy a complimentary welcome drink." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder */}
        <div className="bg-pink-100 border border-pink-200 rounded-xl p-5 mb-8 text-sm text-pink-700">
          <strong>Reminder:</strong> If you need to cancel or reschedule, please contact us at least 24 hours in advance at{" "}
          <a href="tel:+201000000000" className="underline">+20 100 000 0000</a>.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/templates/spa-salon-1/preview"
            className="px-8 py-3 bg-pink-400 text-white text-sm rounded-full tracking-wider hover:bg-pink-500 transition-colors text-center"
          >
            Back to Home
          </Link>
          <Link
            href="/templates/spa-salon-1/preview/services"
            className="px-8 py-3 border border-pink-300 text-pink-500 text-sm rounded-full tracking-wider hover:bg-pink-50 transition-colors text-center"
          >
            Explore More Services
          </Link>
          <Link
            href="/templates/spa-salon-1/preview/account"
            className="px-8 py-3 border border-gray-200 text-gray-600 text-sm rounded-full tracking-wider hover:border-pink-300 transition-colors text-center"
          >
            View My Account
          </Link>
        </div>

        {/* Contact info */}
        <div className="text-center mt-10 text-sm text-gray-400">
          Questions? Call us at{" "}
          <a href="tel:+201000000000" className="text-pink-400 hover:underline">+20 100 000 0000</a>{" "}
          or email{" "}
          <a href="mailto:info@shatasolutions.com" className="text-pink-400 hover:underline">info@shatasolutions.com</a>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
        &copy; {new Date().getFullYear()} Shata Spa &amp; Salon. All rights reserved.
      </footer>
    </div>
  );
}

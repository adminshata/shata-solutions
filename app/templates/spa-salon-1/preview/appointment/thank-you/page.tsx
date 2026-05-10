// app/templates/spa-salon-1/preview/appointment/thank-you/page.tsx
export default function SpaSalon1ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="text-center px-8 py-16">
        <h1 className="text-4xl font-light text-gray-800 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your appointment request has been received. We&apos;ll confirm within 24 hours.
        </p>
        <a
          href="/templates/spa-salon-1/preview"
          className="inline-block px-8 py-3 bg-pink-400 text-white rounded-full text-sm tracking-wider hover:bg-pink-500 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

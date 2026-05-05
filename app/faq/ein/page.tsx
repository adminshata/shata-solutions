export default function EINRegistration() {
  return (
    <div className="min-h-screen px-6 py-16 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          EIN Registration
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
          Get your U.S. Employer Identification Number (EIN) quickly and professionally. 
          We handle the process so you can focus on building your business.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            ⚡ Fast Processing
          </div>
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            🌍 Non-US Friendly
          </div>
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            📄 IRS Compliance
          </div>
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            🤝 Full Guidance
          </div>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <ul className="space-y-3">
            <li>✔ Submit your details</li>
            <li>✔ We prepare your SS-4</li>
            <li>✔ We handle IRS submission</li>
            <li>✔ You receive your EIN</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://wa.me/16197761122"
            className="bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Get Your EIN
          </a>
        </div>

      </div>
    </div>
  );
}
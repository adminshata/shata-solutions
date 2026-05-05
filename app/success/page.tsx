"use client";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 px-4 py-10">
      
      <div className="max-w-5xl mx-auto space-y-8">

        {/* TOP SUCCESS CARD */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 flex justify-between items-center">
          
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Your order was successfully placed 🎉
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              SHATA LLC is now being processed
            </p>
            <p className="text-sm text-slate-500">
              Total: <span className="font-semibold">$104.00</span>
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition">
            Go to Dashboard
          </button>
        </div>

        {/* FEATURES SECTION */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow p-6">
          
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
            Everything You Need, All in One Place
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
              <h3 className="font-semibold mb-2">📊 Finance & Tax Consultation</h3>
              <p className="text-sm text-slate-500">
                Tools to manage your business finances, taxes, and more.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
              <h3 className="font-semibold mb-2">🚀 Branding Services</h3>
              <p className="text-sm text-slate-500">
                Build your online presence with logos, websites, and SEO.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
              <h3 className="font-semibold mb-2">🛡 Protection & Compliance</h3>
              <p className="text-sm text-slate-500">
                Stay compliant with state and federal requirements.
              </p>
            </div>

          </div>
        </div>

        {/* DASHBOARD PREVIEW (OPTIONAL MOCK UI) */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow p-6">
          
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            My Companies
          </h2>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">SHATA LLC</p>
              <p className="text-sm text-slate-500">Wyoming • Active</p>
            </div>
            <span className="text-green-500 text-sm font-semibold">
              Processing
            </span>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow p-6">
          
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">

            <div>
              <p className="font-semibold">Can I make changes to my order?</p>
              <p>Yes, you can edit details from your dashboard anytime.</p>
            </div>

            <div>
              <p className="font-semibold">How long does processing take?</p>
              <p>Typically 2–3 weeks depending on the state.</p>
            </div>

            <div>
              <p className="font-semibold">Will I receive confirmation?</p>
              <p>Yes, all documents will be sent to your email.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
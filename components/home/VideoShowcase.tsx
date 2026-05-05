import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function VideoShowcase() {
  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Product Demo</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight">See automation in action.</h2>
          <p className="mt-6 text-white/70 max-w-xl">
            Watch how we turn complex business processes into simple automated workflows.
          </p>
        </div>

        <div className="relative h-[320px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl" />
          <video
            src="/demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white opacity-0 animate-[fadeUp_0.8s_ease_forwards]">
              Automate your business with AI
            </h3>
            <p className="mt-2 text-sm text-white/70 max-w-sm opacity-0 animate-[fadeUp_0.8s_ease_0.2s_forwards]">
              Watch how smart workflows save time and scale your operations instantly.
            </p>
            <div className="mt-4 flex gap-3 opacity-0 animate-[fadeUp_0.8s_ease_0.4s_forwards]">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg transition transform hover:scale-105"
              >
                Get Started
              </a>
              <a href="#services" className="border border-white/30 text-white px-5 py-2 rounded-full text-sm hover:bg-white/10 transition">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

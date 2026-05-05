import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function VisualTech() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900 via-purple-900 to-black opacity-60" />
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Automation & AI</p>
          <h2 className="mt-4 text-3xl sm:text-5xl font-semibold leading-tight">
            Build smarter systems.
            <br />
            Scale faster with automation.
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-xl">
            We design intelligent workflows, automation systems, and AI-driven tools that help founders eliminate manual work, optimize operations, and grow faster.
          </p>
          <div className="mt-8 flex gap-4">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="rounded-full bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700">
              Start Automation
            </a>
            <a href="#services" className="rounded-full border border-white/20 px-6 py-3 text-white hover:bg-white/10">
              Learn More
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl" />
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="h-3 w-32 bg-blue-500/60 rounded-full" />
              <div className="h-3 w-48 bg-purple-500/60 rounded-full" />
              <div className="h-3 w-24 bg-blue-400/60 rounded-full" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="h-20 rounded-xl bg-blue-500/20" />
              <div className="h-20 rounded-xl bg-purple-500/20" />
              <div className="h-20 rounded-xl bg-white/10" />
              <div className="h-20 rounded-xl bg-blue-400/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TechStats() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl sm:text-5xl font-semibold text-center">Built to scale with your business</h2>
        <div className="mt-16 grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-400">500M+</p>
            <p className="mt-2 text-white/70">Processes automated</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-400">10K+</p>
            <p className="mt-2 text-white/70">Workflows created</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-300">150K+</p>
            <p className="mt-2 text-white/70">Tasks handled daily</p>
          </div>
        </div>
      </div>
    </section>
  );
}

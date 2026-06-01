export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-8 text-center">
      <div className="max-w-sm">
        <div className="mb-6 text-5xl font-black text-orange-500">Shata</div>
        <h1 className="mb-2 text-2xl font-bold text-white">Kitchen Display</h1>
        <p className="mb-8 text-sm text-slate-400">
          Enter your device token to access the kitchen display.
        </p>
        <p className="font-mono text-xs text-slate-500">
          /kitchen/[device-token]
        </p>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center">
      <div className="max-w-sm">
        <div className="mb-6 text-5xl font-black text-brand">Shata</div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">Restaurant OS</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Scan your table QR code to start ordering.
        </p>
        <p className="text-xs text-muted-foreground opacity-60">
          Tap. Order. Pay. Done.
        </p>
      </div>
    </main>
  );
}

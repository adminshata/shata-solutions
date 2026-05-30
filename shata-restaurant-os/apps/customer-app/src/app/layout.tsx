import type { Metadata, Viewport } from "next";
import "@shata/ui/globals.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Order | Shata Restaurant OS",
  description: "Tap. Order. Pay. Done.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FF4500",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "@shata/ui/globals.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shata Dashboard",
  description: "Restaurant management dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-foreground antialiased">{children}</body>
    </html>
  );
}

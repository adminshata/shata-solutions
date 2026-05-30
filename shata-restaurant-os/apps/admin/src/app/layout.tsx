import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shata Admin",
  description: "Shata Restaurant OS — Platform Admin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}

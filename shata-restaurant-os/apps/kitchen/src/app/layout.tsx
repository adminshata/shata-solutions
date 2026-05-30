import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shata Kitchen Display",
  description: "Kitchen Display System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-50 overflow-hidden">
        {children}
      </body>
    </html>
  );
}

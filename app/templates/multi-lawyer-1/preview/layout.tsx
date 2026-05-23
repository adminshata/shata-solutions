import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/templates/multiLawyer1/layout/Navbar";
import { Footer } from "@/components/templates/multiLawyer1/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Morrison & Grant LLP — Premier Law Firm",
  description:
    "Morrison & Grant LLP is a premier multi-practice law firm with over 26 years of experience serving clients across New York. Business law, family law, criminal defense, personal injury, and more.",
};

export default function MultiLawyer1Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .ml-root {
          font-family: 'Outfit', system-ui, sans-serif;
          background-color: #050d1f;
          color: #e2e8f0;
        }
        .ml-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
      `}</style>
      <div className="ml-root min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}

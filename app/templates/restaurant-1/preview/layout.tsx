import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Restaurant1Provider } from "@/lib/restaurant1/context";
import { PreviewFrame } from "@/components/templates/restaurant1/layout/PreviewFrame";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-r1-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Belle Table — Elegant Restaurant & Fine Dining",
  description: "La Belle Table is a restaurant, bar and coffee roastery. We have awesome recipes and the most talented chefs in town!",
};

export default function Restaurant1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Inject Great Vibes font + CSS variable without <html>/<body> */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .r1-root {
          --font-r1-heading: 'Great Vibes', cursive;
          font-family: var(--font-r1-body, 'Raleway', sans-serif);
        }
      `}</style>
      <div className={`r1-root ${raleway.variable}`}>
        <Restaurant1Provider>
          <PreviewFrame>{children}</PreviewFrame>
        </Restaurant1Provider>
      </div>
    </>
  );
}

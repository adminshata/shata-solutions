import type { Metadata } from "next";
import "@shata/ui/globals.css";
import "./globals.css";
import { PostHogProvider } from "@/components/posthog-provider";
import { PostHogPageView } from "@/components/posthog-pageview";

export const metadata: Metadata = {
  title: "Shata Dashboard",
  description: "Restaurant management dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-foreground antialiased">
        <PostHogProvider>
          <PostHogPageView />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}

"use client";

import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

export default function PartnerTermsPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      <GlobalStyles />

      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative z-10 pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-6 space-y-10">

          {/* Header */}
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5 text-white/80"
                  : "border-slate-200 bg-white/70 text-slate-700"
              }`}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
              Partner Program
              <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
              Terms & Conditions
            </div>

            <h1
              className={`mt-6 text-4xl sm:text-5xl font-semibold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Partner Program Terms
            </h1>

            <p
              className={`mt-4 text-base ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              These terms govern participation in the Shata Solutions partner and affiliate program.
            </p>
          </div>

          {/* Sections */}
          <Section
            title="1. Eligibility"
            isDark={isDark}
          >
            Partners must provide accurate information and maintain a legitimate audience or business presence.
          </Section>

          <Section
            title="2. Referral Tracking"
            isDark={isDark}
          >
            Referrals are tracked via cookies and unique partner links. Attribution is valid for 30 days unless otherwise stated.
          </Section>

          <Section
            title="3. Commissions"
            isDark={isDark}
          >
            Partners earn recurring commissions based on referred customers. Commission rates vary by tier and may change over time.
          </Section>

          <Section
            title="4. Payments"
            isDark={isDark}
          >
            Payouts are processed monthly via supported payment providers such as Stripe or bank transfer.
          </Section>

          <Section
            title="5. Fraud & Abuse"
            isDark={isDark}
          >
            Any fraudulent activity, including self-referrals or misleading promotion, will result in immediate termination and forfeiture of earnings.
          </Section>

          <Section
            title="6. Termination"
            isDark={isDark}
          >
            Shata Solutions reserves the right to suspend or terminate partner accounts at any time for violations of these terms.
          </Section>

          <Section
            title="7. Changes to Terms"
            isDark={isDark}
          >
            We may update these terms periodically. Continued participation in the program constitutes acceptance of any changes.
          </Section>

        </div>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function Section({
  title,
  children,
  isDark,
}: {
  title: string;
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-white/5"
          : "border-slate-200 bg-white"
      }`}
    >
      <h2
        className={`text-lg font-semibold mb-2 ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-sm leading-relaxed ${
          isDark ? "text-white/70" : "text-slate-600"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
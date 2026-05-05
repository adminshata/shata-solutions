"use client";

import { useCallback, useState } from "react";

import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import OnboardingModal from "@/components/home/OnboardingModal";
import DashboardModal from "@/components/home/DashboardModal";

import PartnerHero from "@/components/partners/PartnerHero";
import PartnerStats from "@/components/partners/PartnerStats";
import HowItWorks from "@/components/partners/HowItWorks";
import CommissionTiers from "@/components/partners/CommissionTiers";
import CommissionCalculator from "@/components/partners/CommissionCalculator";
import PartnerBenefits from "@/components/partners/PartnerBenefits";
import PartnerTestimonials from "@/components/partners/PartnerTestimonials";
import PartnerFAQ from "@/components/partners/PartnerFAQ";
import PartnerApplyCTA from "@/components/partners/PartnerApplyCTA";

import { useTheme, useSession, useCursorGlow } from "@/lib/hooks";
import type { PlanId } from "@/lib/types";

export default function PartnersPage() {
  const { isDark, toggleTheme } = useTheme();
  const sessionId = useSession();
  useCursorGlow();

  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingPlan, setOnboardingPlan] = useState<PlanId>("growth");
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const openOnboarding = useCallback((plan: PlanId) => {
    setOnboardingPlan(plan);
    setOnboardingOpen(true);
  }, []);
  const closeOnboarding = useCallback(() => setOnboardingOpen(false), []);
  const openDashboard = useCallback(() => setDashboardOpen(true), []);
  const closeDashboard = useCallback(() => setDashboardOpen(false), []);

  const scrollToApply = useCallback(() => {
    const el = document.getElementById("partner-apply");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToCalculator = useCallback(() => {
    const el = document.getElementById("calculator");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      <div
        id="cursor-glow"
        className="pointer-events-none fixed top-0 left-0 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl -z-0 transition-transform duration-200"
      />

      <GlobalStyles />

      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={openOnboarding}
        openDashboard={openDashboard}
      />

      <main className="relative z-10">
        <PartnerHero
          isDark={isDark}
          scrollToApply={scrollToApply}
          scrollToCalculator={scrollToCalculator}
        />
        <PartnerStats isDark={isDark} />
        <HowItWorks isDark={isDark} />
        <CommissionTiers isDark={isDark} scrollToApply={scrollToApply} />
        <CommissionCalculator isDark={isDark} scrollToApply={scrollToApply} />
        <PartnerBenefits isDark={isDark} />
        <PartnerTestimonials isDark={isDark} />
        <PartnerFAQ isDark={isDark} />
        <PartnerApplyCTA isDark={isDark} sessionId={sessionId} />
      </main>

      <SiteFooter isDark={isDark} />

      <OnboardingModal
        isDark={isDark}
        open={onboardingOpen}
        onClose={closeOnboarding}
        initialPlan={onboardingPlan}
        sessionId={sessionId}
      />
      <DashboardModal
        isDark={isDark}
        open={dashboardOpen}
        onClose={closeDashboard}
      />
    </div>
  );
}

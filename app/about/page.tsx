"use client";

import { useCallback, useState } from "react";

import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import OnboardingModal from "@/components/home/OnboardingModal";
import DashboardModal from "@/components/home/DashboardModal";

import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import AboutStats from "@/components/about/AboutStats";
import Values from "@/components/about/Values";
import Timeline from "@/components/about/Timeline";
import Team from "@/components/about/Team";
import TrustAndSecurity from "@/components/about/TrustAndSecurity";
import AboutCTA from "@/components/about/AboutCTA";
import BusinessInfo from "@/components/home/BusinessInfo";

import { useTheme, useSession, useCursorGlow } from "@/lib/hooks";
import type { PlanId } from "@/lib/types";

export default function AboutPage() {
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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Cursor glow */}
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
        <AboutHero isDark={isDark} />
        <OurStory isDark={isDark} />
        <AboutStats isDark={isDark} />
        <Values isDark={isDark} />
        <Timeline isDark={isDark} />
        <Team isDark={isDark} />
        <TrustAndSecurity isDark={isDark} />
        <BusinessInfo isDark={isDark} />
        <AboutCTA isDark={isDark} openOnboarding={openOnboarding} />
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

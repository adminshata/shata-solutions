"use client";

import { useCallback, useState } from "react";

import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import BusinessFlow from "@/components/home/BusinessFlow";
import VisualTech from "@/components/home/VisualTech";
import VideoShowcase from "@/components/home/VideoShowcase";
import TechStats from "@/components/home/TechStats";
import Integrations from "@/components/home/Integrations";
import Services from "@/components/home/Services";
import Pricing from "@/components/home/Pricing";
import PricingSummary from "@/components/home/PricingSummary";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import LeadForm from "@/components/home/LeadForm";
import CTA from "@/components/home/CTA";
import BusinessInfo from "@/components/home/BusinessInfo";
import SiteFooter from "@/components/home/SiteFooter";
import AIChat from "@/components/home/AIChat";
import ChatWidget from "@/components/home/ChatWidget";
import OnboardingModal from "@/components/home/OnboardingModal";
import DashboardModal from "@/components/home/DashboardModal";

import { useTheme, useSession, useCursorGlow } from "@/lib/hooks";
import type { PlanId } from "@/lib/types";

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const sessionId = useSession();
  useCursorGlow();

  // Modal state
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
      {/* Cursor glow (used by useCursorGlow) */}
      <div
        id="cursor-glow"
        className="pointer-events-none fixed top-0 left-0 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl -z-0 transition-transform duration-200"
      />

      {/* Keyframes & global animations */}
      <GlobalStyles />

      {/* Sticky glass navbar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={openOnboarding}
        openDashboard={openDashboard}
      />

      {/* Main content */}
      <main className="relative z-10">
        <Hero isDark={isDark} openOnboarding={openOnboarding} />

        <BusinessFlow isDark={isDark} openOnboarding={openOnboarding} selectedPlan={onboardingPlan} />

        <VisualTech />

        <Services isDark={isDark} />

        <VideoShowcase />

        <AIChat isDark={isDark} sessionId={sessionId} />

        <Integrations isDark={isDark} />

        <TechStats />

        <Pricing isDark={isDark} openOnboarding={openOnboarding} />

        <PricingSummary isDark={isDark} />

        <Testimonials isDark={isDark} />

        <FAQ isDark={isDark} />

        <LeadForm isDark={isDark} sessionId={sessionId} />

        <BusinessInfo isDark={isDark} />

        <CTA openOnboarding={openOnboarding} />
      </main>

      <SiteFooter isDark={isDark} />

      {/* Floating chat widget */}
      <ChatWidget isDark={isDark} sessionId={sessionId} />

      {/* Modals */}
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

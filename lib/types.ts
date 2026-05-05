// Shared TypeScript types for Shata Solutions

export type PlanId = "starter" | "growth" | "scale";
export type BillingCycle = "monthly" | "yearly";
export type DashboardTab = "overview" | "documents" | "tasks" | "billing";
export type CtaType = "whatsapp" | "email" | "none";
export type ChatRole = "bot" | "user";

export interface ChatMessage {
  role: ChatRole;
  message: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  oneTime: number;
  badge: string | null;
  features: string[];
  notIncluded: string[];
}

export interface OnboardingStepDef {
  id: number;
  title: string;
  desc: string;
}

export interface OnboardingData {
  businessName: string;
  businessType: string;
  state: string;
  industry: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  address: string;
  services: {
    llc: boolean;
    ein: boolean;
    bank: boolean;
    stripe: boolean;
    agent: boolean;
    domain: boolean;
  };
}

export interface DashboardStage {
  label: string;
  status: "complete" | "in-progress" | "pending";
  icon: string;
}

export interface DashboardDoc {
  name: string;
  type: string;
  date: string;
  size: string;
}

export interface DashboardTask {
  title: string;
  status: "action" | "upcoming";
  due: string;
}

export interface Integration {
  name: string;
  color: string;
  logo: string;
}

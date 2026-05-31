export interface BillingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  currency: string;
  features: string[];
  maxTables: number;
  maxStaff: number;
  hasAnalytics: boolean;
  hasLoyalty: boolean;
  hasNfc: boolean;
}

export const BILLING_PLANS: BillingPlan[] = [
  {
    id: "STARTER",
    name: "Starter",
    monthlyPrice: 499,
    currency: "EGP",
    features: ["Up to 10 tables", "3 staff accounts", "Basic analytics", "Email support"],
    maxTables: 10,
    maxStaff: 3,
    hasAnalytics: false,
    hasLoyalty: false,
    hasNfc: false,
  },
  {
    id: "GROWTH",
    name: "Growth",
    monthlyPrice: 999,
    currency: "EGP",
    features: ["Up to 30 tables", "10 staff accounts", "Advanced analytics", "Loyalty program", "Priority support"],
    maxTables: 30,
    maxStaff: 10,
    hasAnalytics: true,
    hasLoyalty: true,
    hasNfc: false,
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    monthlyPrice: 2499,
    currency: "EGP",
    features: ["Unlimited tables", "Unlimited staff", "Full analytics", "Loyalty + NFC", "Thermal printer", "Dedicated support", "Multi-branch"],
    maxTables: 9999,
    maxStaff: 9999,
    hasAnalytics: true,
    hasLoyalty: true,
    hasNfc: true,
  },
];

export function getPlanById(id: string): BillingPlan | undefined {
  return BILLING_PLANS.find((p) => p.id === id);
}

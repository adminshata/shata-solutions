/**
 * Pricing + metadata catalog — single source of truth for packages,
 * states, and add-ons. Mirrors the LLC wizard's local arrays so the
 * server can compute pricing and the admin dashboard can render rich
 * details without depending on client code.
 */

import type { AddOnId, FormationState, PackageId } from "./types";

export type PackageCatalog = {
  id: PackageId;
  name: string;
  priceUSD: number;
  timeline: string;
};

export const PACKAGE_CATALOG: PackageCatalog[] = [
  { id: "starter", name: "Starter Filing",  priceUSD: 200, timeline: "5–7 business days" },
  { id: "smart",   name: "Smart Launch",    priceUSD: 399, timeline: "3–5 business days" },
  { id: "stack",   name: "Business Stack",  priceUSD: 499, timeline: "3–7 business days" },
];

export type StateCatalog = {
  id: FormationState;
  feeUSD: number;
  timeline: string;
  tagline: string;
};

export const STATE_CATALOG: StateCatalog[] = [
  { id: "Wyoming",    feeUSD: 104, timeline: "1–3 business days",  tagline: "Privacy + low fees" },
  { id: "Delaware",   feeUSD: 110, timeline: "2–5 business days",  tagline: "Investor standard" },
  { id: "Florida",    feeUSD: 125, timeline: "2–4 business days",  tagline: "No state income tax" },
  { id: "California", feeUSD: 70,  timeline: "5–10 business days", tagline: "If you operate here" },
  { id: "Texas",      feeUSD: 300, timeline: "2–4 business days",  tagline: "Strong economy" },
  { id: "New Mexico", feeUSD: 50,  timeline: "1–3 business days",  tagline: "Lowest cost" },
  { id: "Other",      feeUSD: 0,   timeline: "Confirmed during call", tagline: "Pick during onboarding" },
];

export type AddOnCatalog = {
  id: AddOnId;
  name: string;
  oneTimeUSD: number;
  monthlyUSD: number;
  recurring: boolean;
  category: "Compliance" | "Identity" | "Launch" | "Brand";
};

/** Add-on prices are placeholders for the dev preview. Final pricing
 * is locked during operator review before the payment link is sent. */
export const ADDON_CATALOG: AddOnCatalog[] = [
  { id: "registered-agent",    name: "Registered Agent",            oneTimeUSD: 0,   monthlyUSD: 12,  recurring: true,  category: "Compliance" },
  { id: "business-address",    name: "Business Address / Mailbox",  oneTimeUSD: 0,   monthlyUSD: 19,  recurring: true,  category: "Identity"   },
  { id: "operating-agreement", name: "Operating Agreement",         oneTimeUSD: 79,  monthlyUSD: 0,   recurring: false, category: "Compliance" },
  { id: "banking-resolution",  name: "Banking Resolution",          oneTimeUSD: 49,  monthlyUSD: 0,   recurring: false, category: "Compliance" },
  { id: "compliance-alerts",   name: "Compliance Alerts",           oneTimeUSD: 0,   monthlyUSD: 5,   recurring: true,  category: "Compliance" },
  { id: "domain",              name: "Domain Registration",         oneTimeUSD: 25,  monthlyUSD: 0,   recurring: false, category: "Identity"   },
  { id: "business-email",      name: "Business Email",              oneTimeUSD: 0,   monthlyUSD: 6,   recurring: true,  category: "Identity"   },
  { id: "website-platform",    name: "Website Platform",            oneTimeUSD: 0,   monthlyUSD: 39,  recurring: true,  category: "Launch"     },
  { id: "stripe-setup",        name: "Stripe Setup",                oneTimeUSD: 99,  monthlyUSD: 0,   recurring: false, category: "Launch"     },
  { id: "branding",            name: "Branding",                    oneTimeUSD: 299, monthlyUSD: 0,   recurring: false, category: "Brand"      },
  { id: "accounting",          name: "Accounting / Tax Consultation", oneTimeUSD: 0, monthlyUSD: 0,   recurring: false, category: "Launch"     },
];

export function getPackage(id: PackageId | null): PackageCatalog | null {
  if (!id) return null;
  return PACKAGE_CATALOG.find((p) => p.id === id) ?? null;
}

export function getState(id: FormationState | null): StateCatalog | null {
  if (!id) return null;
  return STATE_CATALOG.find((s) => s.id === id) ?? null;
}

export function getAddOn(id: AddOnId): AddOnCatalog | null {
  return ADDON_CATALOG.find((a) => a.id === id) ?? null;
}

export function formatUSD(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

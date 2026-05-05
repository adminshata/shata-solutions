/**
 * Formation request store — single source of truth for the dev preview.
 *
 * Storage: in-memory `Map`, scoped to the Node.js server process.
 * Persists across requests within the same process.
 * Resets on cold start / redeploy.
 *
 * Production swap path: replace `requests` with a Supabase client and
 * convert each function to an async DB call. The function signatures and
 * return types are already async-shaped and ready.
 *
 * Schema is intentionally flat and JSON-friendly so it maps to a single
 * Supabase row with a `jsonb` column for the wizard input + activity feed.
 */

import type {
  ActivityEvent,
  ActivityType,
  FormationInput,
  FormationNote,
  FormationPricing,
  FormationRequest,
  FormationStatus,
} from "./types";
import { ADDON_CATALOG, PACKAGE_CATALOG, STATE_CATALOG, getAddOn, getPackage, getState } from "./catalog";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateReferenceCode(): string {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += REF_ALPHABET[Math.floor(Math.random() * REF_ALPHABET.length)];
  }
  return `SHATA-LLC-${code}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function makeId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function computePricing(input: FormationInput): FormationPricing {
  const pkg = getPackage(input.packageId);
  const state = getState(input.state);
  const addOnsOneTime = input.addOns
    .map(getAddOn)
    .filter((a): a is NonNullable<ReturnType<typeof getAddOn>> => !!a)
    .filter((a) => !a.recurring)
    .reduce((sum, a) => sum + a.oneTimeUSD, 0);
  const addOnsRecurring = input.addOns
    .map(getAddOn)
    .filter((a): a is NonNullable<ReturnType<typeof getAddOn>> => !!a)
    .filter((a) => a.recurring)
    .reduce((sum, a) => sum + a.monthlyUSD, 0);
  return {
    packagePrice: pkg?.priceUSD ?? 0,
    stateFee: state?.feeUSD ?? 0,
    addOnsOneTime,
    addOnsRecurring,
    currency: "USD",
  };
}

export function totalDueAtCheckout(req: FormationRequest): number {
  const { packagePrice, stateFee, addOnsOneTime } = req.pricing;
  return packagePrice + stateFee + addOnsOneTime;
}

/* ------------------------------------------------------------------ */
/* Store — module-scoped, persists across requests on the same process */
/* ------------------------------------------------------------------ */

type Store = {
  requests: Map<string, FormationRequest>;
  seeded: boolean;
};

// `globalThis` keeps the store alive across hot reloads in dev.
const g = globalThis as unknown as { __shataFormationStore?: Store };
const state: Store = g.__shataFormationStore ?? { requests: new Map(), seeded: false };
g.__shataFormationStore = state;

if (!state.seeded) {
  seed(state);
  state.seeded = true;
}

/* ------------------------------------------------------------------ */
/* CRUD                                                                */
/* ------------------------------------------------------------------ */

export async function createRequest(input: FormationInput): Promise<FormationRequest> {
  const code = uniqueCode();
  const created = nowIso();
  const pricing = computePricing(input);

  const req: FormationRequest = {
    code,
    status: "new",
    createdAt: created,
    updatedAt: created,
    input,
    pricing,
    notes: [],
    activity: [
      {
        id: makeId("evt"),
        ts: created,
        actor: "customer",
        type: "submitted",
        message: "Setup request submitted via the LLC wizard.",
      },
    ],
  };

  state.requests.set(code, req);
  return req;
}

export async function getRequest(code: string): Promise<FormationRequest | null> {
  return state.requests.get(code) ?? null;
}

export type ListFilter = {
  status?: FormationStatus | "all";
  query?: string;
};

export async function listRequests(filter: ListFilter = {}): Promise<FormationRequest[]> {
  const all = Array.from(state.requests.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  return all.filter((r) => {
    if (filter.status && filter.status !== "all" && r.status !== filter.status) return false;
    if (filter.query) {
      const q = filter.query.toLowerCase();
      const hay = [
        r.code,
        r.input.companyName,
        r.input.ownerFullName,
        r.input.ownerEmail,
        r.input.state ?? "",
      ].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export async function updateStatus(
  code: string,
  next: FormationStatus,
  message?: string
): Promise<FormationRequest | null> {
  const req = state.requests.get(code);
  if (!req) return null;
  if (req.status === next) return req;

  const ts = nowIso();
  const event: ActivityEvent = {
    id: makeId("evt"),
    ts,
    actor: "ops",
    type: "status_changed",
    message: message ?? `Status changed: ${req.status} → ${next}`,
  };

  req.status = next;
  req.updatedAt = ts;
  req.activity.unshift(event);

  // Side-effect timestamps for visible milestones
  if (next === "paid" && !req.paidAt) req.paidAt = ts;

  state.requests.set(code, req);
  return req;
}

export async function addNote(code: string, body: string, author = "ops"): Promise<FormationRequest | null> {
  const req = state.requests.get(code);
  if (!req) return null;
  const ts = nowIso();
  const note: FormationNote = { id: makeId("note"), ts, author, body };
  req.notes.unshift(note);
  req.activity.unshift({
    id: makeId("evt"),
    ts,
    actor: "ops",
    type: "note_added",
    message: `Note added: ${body.length > 80 ? body.slice(0, 80) + "…" : body}`,
  });
  req.updatedAt = ts;
  state.requests.set(code, req);
  return req;
}

export async function generatePaymentLink(code: string): Promise<FormationRequest | null> {
  const req = state.requests.get(code);
  if (!req) return null;
  const ts = nowIso();
  // Mock — in production this is a Stripe Checkout Session URL
  const url = `https://buy.stripe.com/test/${code.replace(/-/g, "_").toLowerCase()}_${Math.random().toString(36).slice(2, 8)}`;
  req.paymentLinkUrl = url;
  req.paymentLinkSentAt = ts;
  req.status = "quoted";
  req.updatedAt = ts;
  req.activity.unshift({
    id: makeId("evt"),
    ts,
    actor: "ops",
    type: "payment_link_sent",
    message: `Payment link generated and emailed to ${req.input.ownerEmail || "the customer"}.`,
  });
  state.requests.set(code, req);
  return req;
}

export async function markPaid(code: string): Promise<FormationRequest | null> {
  const req = state.requests.get(code);
  if (!req) return null;
  const ts = nowIso();
  req.status = "paid";
  req.paidAt = ts;
  req.updatedAt = ts;
  req.activity.unshift({
    id: makeId("evt"),
    ts,
    actor: "system",
    type: "payment_received",
    message: "Stripe payment received. Filing queue notified.",
  });
  state.requests.set(code, req);
  return req;
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export type FormationStats = {
  total: number;
  byStatus: Record<FormationStatus, number>;
  pendingReview: number;
  filing: number;
  completed: number;
  pendingRevenueUSD: number;
  paidRevenueUSD: number;
  monthlyRecurringUSD: number;
};

export async function getStats(): Promise<FormationStats> {
  const all = Array.from(state.requests.values());
  const byStatus: Record<FormationStatus, number> = {
    new: 0, reviewing: 0, quoted: 0, paid: 0, filing: 0, completed: 0, cancelled: 0, needs_info: 0,
  };
  let pendingRevenueUSD = 0;
  let paidRevenueUSD = 0;
  let monthlyRecurringUSD = 0;

  for (const r of all) {
    byStatus[r.status]++;
    const checkout = r.pricing.packagePrice + r.pricing.stateFee + r.pricing.addOnsOneTime;
    if (r.status === "paid" || r.status === "filing" || r.status === "completed") {
      paidRevenueUSD += checkout;
      monthlyRecurringUSD += r.pricing.addOnsRecurring;
    } else if (r.status !== "cancelled") {
      pendingRevenueUSD += checkout;
    }
  }

  return {
    total: all.length,
    byStatus,
    pendingReview: byStatus.new + byStatus.reviewing + byStatus.needs_info,
    filing: byStatus.filing,
    completed: byStatus.completed,
    pendingRevenueUSD,
    paidRevenueUSD,
    monthlyRecurringUSD,
  };
}

/* ------------------------------------------------------------------ */
/* Internal                                                            */
/* ------------------------------------------------------------------ */

function uniqueCode(): string {
  // Avoid collisions in seeded data
  for (let i = 0; i < 8; i++) {
    const code = generateReferenceCode();
    if (!state.requests.has(code)) return code;
  }
  return generateReferenceCode();
}

function seed(s: Store) {
  const seedData: Array<{
    code: string;
    status: FormationStatus;
    minutesAgo: number;
    input: FormationInput;
    extraEvents?: { type: ActivityType; message: string; minutesAgo: number; actor: ActivityEvent["actor"] }[];
  }> = [
    {
      code: "SHATA-LLC-7K2P",
      status: "reviewing",
      minutesAgo: 38,
      input: makeInput({ entityType: "LLC", state: "Wyoming", packageId: "smart", company: "Northwind Capital LLC", owner: "Maya Patel", email: "maya@northwindcap.com", country: "United States", residency: "us", addons: ["registered-agent", "operating-agreement", "compliance-alerts"] }),
    },
    {
      code: "SHATA-LLC-3N4R",
      status: "quoted",
      minutesAgo: 220,
      input: makeInput({ entityType: "Corporation", state: "Delaware", packageId: "stack", company: "Vanta Robotics, Inc.", owner: "Karim Hassan", email: "karim@vantarobotics.io", country: "Egypt", residency: "non-us", addons: ["registered-agent", "business-address", "domain", "business-email", "website-platform", "stripe-setup"] }),
      extraEvents: [
        { type: "status_changed", message: "Marked as in review.", minutesAgo: 200, actor: "ops" },
        { type: "payment_link_sent", message: "Payment link generated and emailed.", minutesAgo: 90, actor: "ops" },
      ],
    },
    {
      code: "SHATA-LLC-9XB2",
      status: "paid",
      minutesAgo: 1440,
      input: makeInput({ entityType: "LLC", state: "Florida", packageId: "starter", company: "Coastline Studio LLC", owner: "Jordan Reyes", email: "jordan@coastline.studio", country: "United States", residency: "us", addons: ["operating-agreement"] }),
      extraEvents: [
        { type: "status_changed", message: "Marked as in review.", minutesAgo: 1400, actor: "ops" },
        { type: "payment_link_sent", message: "Payment link sent.", minutesAgo: 1300, actor: "ops" },
        { type: "payment_received", message: "Stripe payment received.", minutesAgo: 600, actor: "system" },
      ],
    },
    {
      code: "SHATA-LLC-2M5S",
      status: "filing",
      minutesAgo: 2880,
      input: makeInput({ entityType: "LLC", state: "California", packageId: "smart", company: "Halcyon Health LLC", owner: "Priya Shah", email: "priya@halcyonhealth.com", country: "United States", residency: "us", addons: ["registered-agent", "operating-agreement", "banking-resolution", "business-email"] }),
      extraEvents: [
        { type: "payment_received", message: "Payment received.", minutesAgo: 2400, actor: "system" },
        { type: "filing_started", message: "Submitted to California Secretary of State.", minutesAgo: 2000, actor: "ops" },
      ],
    },
    {
      code: "SHATA-LLC-8H4P",
      status: "completed",
      minutesAgo: 9000,
      input: makeInput({ entityType: "LLC", state: "Wyoming", packageId: "stack", company: "Lumen Trade LLC", owner: "Aiko Tanaka", email: "aiko@lumentrade.co", country: "United States", residency: "us", addons: ["registered-agent", "operating-agreement", "business-address", "domain", "business-email", "website-platform", "stripe-setup"] }),
      extraEvents: [
        { type: "payment_received", message: "Payment received.", minutesAgo: 8800, actor: "system" },
        { type: "filing_started", message: "Submitted to Wyoming SOS.", minutesAgo: 8400, actor: "ops" },
        { type: "filing_completed", message: "Wyoming filing accepted. Articles delivered.", minutesAgo: 7000, actor: "ops" },
        { type: "status_changed", message: "Launch package complete. Customer onboarded.", minutesAgo: 4000, actor: "ops" },
      ],
    },
    {
      code: "SHATA-LLC-K6L7",
      status: "new",
      minutesAgo: 6,
      input: makeInput({ entityType: "LLC", state: "Texas", packageId: "smart", company: "Brightline Logistics LLC", owner: "Daniel Okafor", email: "daniel@brightlinelogi.com", country: "Nigeria", residency: "non-us", addons: ["registered-agent", "operating-agreement", "business-address", "stripe-setup"] }),
    },
  ];

  for (const seedRow of seedData) {
    const created = new Date(Date.now() - seedRow.minutesAgo * 60_000).toISOString();
    const pricing = computePricing(seedRow.input);
    const events: ActivityEvent[] = [
      {
        id: makeId("evt"),
        ts: created,
        actor: "customer",
        type: "submitted",
        message: "Setup request submitted via the LLC wizard.",
      },
    ];
    for (const e of seedRow.extraEvents ?? []) {
      events.unshift({
        id: makeId("evt"),
        ts: new Date(Date.now() - e.minutesAgo * 60_000).toISOString(),
        actor: e.actor,
        type: e.type,
        message: e.message,
      });
    }
    const req: FormationRequest = {
      code: seedRow.code,
      status: seedRow.status,
      createdAt: created,
      updatedAt: events[0]?.ts ?? created,
      input: seedRow.input,
      pricing,
      notes: [],
      activity: events,
      paidAt: seedRow.status === "paid" || seedRow.status === "filing" || seedRow.status === "completed"
        ? new Date(Date.now() - Math.max(0, seedRow.minutesAgo - 100) * 60_000).toISOString()
        : undefined,
      paymentLinkUrl: seedRow.status === "quoted" || seedRow.status === "paid" || seedRow.status === "filing" || seedRow.status === "completed"
        ? `https://buy.stripe.com/test/${seedRow.code.replace(/-/g, "_").toLowerCase()}_${Math.random().toString(36).slice(2, 8)}`
        : undefined,
    };
    s.requests.set(req.code, req);
  }
}

function makeInput(o: {
  entityType: FormationInput["entityType"];
  state: FormationInput["state"];
  packageId: FormationInput["packageId"];
  company: string;
  owner: string;
  email: string;
  country: string;
  residency: FormationInput["residency"];
  addons: FormationInput["addOns"];
}): FormationInput {
  return {
    entityType: o.entityType,
    state: o.state,
    residency: o.residency,
    ownerCount: "1",
    companyName: o.company,
    altName1: "",
    altName2: "",
    businessActivity: "Operating company",
    businessCategory: "Software / SaaS",
    website: "",
    businessPhone: "",
    packageId: o.packageId,
    ownerFullName: o.owner,
    ownerEmail: o.email,
    ownerPhone: "+1 (555) 010-2030",
    ownerCountry: o.country,
    ownerStreet: "1 Founder Way",
    ownerCity: "—",
    ownerState: "—",
    ownerPostal: "00000",
    ownerOwnership: "100",
    ownerRole: "Member",
    ownerSsnStatus: o.residency === "us" ? "has" : "none",
    needEin: "yes",
    hasSsnItin: o.residency === "us" ? "yes" : "no",
    needIrsSupport: o.residency === "us" ? "no" : "yes",
    needSCorp: "no",
    addOns: o.addons,
  };
}

// Re-export catalogs for convenience
export { ADDON_CATALOG, PACKAGE_CATALOG, STATE_CATALOG };

/**
 * Shata Formation types — shared between the LLC wizard, server actions,
 * the admin dashboard, and the customer status page.
 *
 * Designed so the in-memory store can be swapped for Supabase / Postgres
 * without touching any UI code: every field maps cleanly to a DB column.
 */

export type EntityType = "LLC" | "Corporation" | "Nonprofit";
export type FormationState =
  | "Wyoming"
  | "Delaware"
  | "Florida"
  | "California"
  | "Texas"
  | "New Mexico"
  | "Other";
export type Residency = "us" | "non-us";
export type OwnerCount = "1" | "2+";
export type PackageId = "starter" | "smart" | "stack";
export type EinChoice = "yes" | "no" | "unsure";
export type YesNo = "yes" | "no";
export type SsnStatus = "has" | "none" | "unsure";
export type Role = "Member" | "Manager";

export type AddOnId =
  | "registered-agent"
  | "business-address"
  | "operating-agreement"
  | "banking-resolution"
  | "compliance-alerts"
  | "domain"
  | "business-email"
  | "website-platform"
  | "stripe-setup"
  | "branding"
  | "accounting";

/** The data captured by the LLC wizard. Mirrors `FormData` in the wizard
 * but lives in a shared module so the admin and server actions can use it. */
export type FormationInput = {
  entityType: EntityType | null;
  state: FormationState | null;
  residency: Residency | null;
  ownerCount: OwnerCount | null;

  companyName: string;
  altName1: string;
  altName2: string;
  businessActivity: string;
  businessCategory: string;
  website: string;
  businessPhone: string;

  packageId: PackageId | null;

  ownerFullName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerCountry: string;
  ownerStreet: string;
  ownerCity: string;
  ownerState: string;
  ownerPostal: string;
  ownerOwnership: string;
  ownerRole: Role | null;
  ownerSsnStatus: SsnStatus | null;

  needEin: EinChoice | null;
  hasSsnItin: YesNo | null;
  needIrsSupport: YesNo | null;
  needSCorp: EinChoice | null;

  addOns: AddOnId[];
};

export type FormationStatus =
  | "new"
  | "reviewing"
  | "quoted"
  | "paid"
  | "filing"
  | "completed"
  | "cancelled"
  | "needs_info";

export const STATUS_LABEL: Record<FormationStatus, string> = {
  new: "New request",
  reviewing: "In review",
  quoted: "Payment link sent",
  paid: "Paid",
  filing: "Filing in progress",
  completed: "Completed",
  cancelled: "Cancelled",
  needs_info: "Needs info",
};

export const STATUS_PIPELINE: FormationStatus[] = [
  "new",
  "reviewing",
  "quoted",
  "paid",
  "filing",
  "completed",
];

export type ActivityType =
  | "submitted"
  | "status_changed"
  | "note_added"
  | "payment_link_sent"
  | "payment_received"
  | "filing_started"
  | "filing_completed"
  | "email_sent";

export type ActivityEvent = {
  id: string;
  ts: string; // ISO
  actor: "system" | "ops" | "customer";
  type: ActivityType;
  message: string;
};

export type FormationNote = {
  id: string;
  ts: string;
  author: string;
  body: string;
};

export type FormationPricing = {
  packagePrice: number; // USD cents would be cleaner; using whole USD here for clarity
  stateFee: number;
  addOnsOneTime: number;
  addOnsRecurring: number; // per-month estimate
  currency: "USD";
};

export type FormationRequest = {
  code: string;
  status: FormationStatus;
  createdAt: string;
  updatedAt: string;
  input: FormationInput;
  pricing: FormationPricing;
  paymentLinkUrl?: string;
  paymentLinkSentAt?: string;
  paidAt?: string;
  notes: FormationNote[];
  activity: ActivityEvent[];
};

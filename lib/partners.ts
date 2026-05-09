/**
 * Partner program utilities.
 * Commission tiers, slug helpers, and formatting.
 */

// ─── Commission tiers ────────────────────────────────────────────────────────

export type PartnerTier = "starter" | "growth" | "elite";

export const COMMISSION_BY_TIER: Record<PartnerTier, number> = {
  starter: 0.10, // 10%
  growth:  0.15, // 15%
  elite:   0.20, // 20%
};

// ─── Slug helpers ─────────────────────────────────────────────────────────────

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Accepts either an array of existing slugs or an async predicate
 * `exists(slug) => Promise<boolean>` — returns first slug not already taken.
 */
export async function uniqueSlug(
  base: string,
  existsOrArray: string[] | ((s: string) => Promise<boolean>)
): Promise<string> {
  const exists =
    typeof existsOrArray === "function"
      ? existsOrArray
      : (s: string) => Promise.resolve(existsOrArray.includes(s));

  const slug = slugifyName(base);
  if (!(await exists(slug))) return slug;
  let i = 2;
  while (await exists(`${slug}-${i}`)) i++;
  return `${slug}-${i}`;
}

// ─── Commission math ──────────────────────────────────────────────────────────

/**
 * Returns commission in cents for a given invoice amount (cents) and tier.
 */
/**
 * Returns commission in cents.
 * Accepts either a PartnerTier string or a raw rate (e.g. 0.15 stored in DB).
 */
export function commissionCents(amountCents: number, tierOrRate: PartnerTier | number): number {
  const rate =
    typeof tierOrRate === "number"
      ? tierOrRate
      : COMMISSION_BY_TIER[tierOrRate];
  return Math.floor(amountCents * rate);
}

/**
 * Returns a YYYY-MM period key for a given date (defaults to now).
 */
export function periodKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// ─── Formatting ───────────────────────────────────────────────────────────────

/**
 * Formats an amount in cents as a USD dollar string, e.g. "$1,234.56".
 */
export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

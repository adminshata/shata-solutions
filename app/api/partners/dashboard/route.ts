import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

// GET /api/partners/dashboard?email=...
// In production, protect with Supabase auth — read partner_id from the JWT.
// Here we accept ?email= for simplicity while scaffolding.

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email")?.toLowerCase().trim();
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  const db = supabaseAdmin();

  const { data: partner } = await db
    .from("partners")
    .select("id, email, full_name, tier, commission_rate, slug, custom_coupon, active")
    .eq("email", email)
    .maybeSingle();

  if (!partner) return NextResponse.json({ error: "not found" }, { status: 404 });

  const [clicks, referrals, commissions, payouts] = await Promise.all([
    db
      .from("referral_clicks")
      .select("created_at")
      .eq("partner_id", partner.id)
      .gte("created_at", new Date(Date.now() - 30 * 86400_000).toISOString()),
    db
      .from("referrals")
      .select("id, customer_email, plan, mrr_cents, status, first_paid_at, created_at")
      .eq("partner_id", partner.id)
      .order("created_at", { ascending: false })
      .limit(50),
    db
      .from("commissions")
      .select("id, period, amount_cents, status, created_at")
      .eq("partner_id", partner.id)
      .order("created_at", { ascending: false })
      .limit(12),
    db
      .from("payouts")
      .select("id, amount_cents, method, status, period_start, period_end, paid_at")
      .eq("partner_id", partner.id)
      .order("created_at", { ascending: false })
      .limit(12),
  ]);

  const totalClicks30d = clicks.data?.length ?? 0;
  const activeReferrals =
    referrals.data?.filter((r) => r.status === "active").length ?? 0;
  const trialingReferrals =
    referrals.data?.filter((r) => r.status === "trialing").length ?? 0;
  const pendingCents = (commissions.data ?? [])
    .filter((c) => c.status === "pending" || c.status === "approved")
    .reduce((a, c) => a + c.amount_cents, 0);
  const paidCents = (commissions.data ?? [])
    .filter((c) => c.status === "paid")
    .reduce((a, c) => a + c.amount_cents, 0);
  const mrrCents = (referrals.data ?? [])
    .filter((r) => r.status === "active")
    .reduce((a, r) => a + r.mrr_cents, 0);

  const conversion =
    totalClicks30d > 0
      ? Math.round(((referrals.data ?? []).filter(
          (r) => new Date(r.created_at).getTime() > Date.now() - 30 * 86400_000,
        ).length / totalClicks30d) * 100)
      : 0;

  return NextResponse.json({
    partner,
    kpis: {
      clicks30d: totalClicks30d,
      activeReferrals,
      trialingReferrals,
      pendingCents,
      paidCents,
      mrrCents,
      conversion,
      thisMonthCents: pendingCents,
    },
    referrals: referrals.data ?? [],
    commissions: commissions.data ?? [],
    payouts: payouts.data ?? [],
  });
}

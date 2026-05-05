import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

// Called at checkout / onboarding completion.
// If the visitor has a shata_ref cookie AND this email isn't already
// attributed to another partner, create a referrals row.
//
// POST body: { email, stripeCustomerId?, plan?, mrrCents?, sessionId? }

export async function POST(req: Request) {
  let body: {
    email?: string;
    stripeCustomerId?: string;
    plan?: string;
    mrrCents?: number;
    sessionId?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = (body.email || "").toLowerCase().trim();
  if (!email) return NextResponse.json({ ok: false, error: "email required" }, { status: 400 });

  const jar = await cookies();
  const partnerId = jar.get("shata_ref_pid")?.value;
  if (!partnerId) return NextResponse.json({ ok: true, attributed: false });

  const db = supabaseAdmin();

  // ignore if this email is already attributed
  const { data: existing } = await db
    .from("referrals")
    .select("id, partner_id")
    .eq("customer_email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ ok: true, attributed: false, reason: "already-attributed" });
  }

  const { data, error } = await db
    .from("referrals")
    .insert({
      partner_id: partnerId,
      customer_email: email,
      stripe_customer_id: body.stripeCustomerId || null,
      plan: body.plan || null,
      mrr_cents: body.mrrCents || 0,
      session_id: body.sessionId || null,
      status: "trialing",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[partners/attribute]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // bump partner.lifetime_referrals
  await db.rpc("increment_partner_referrals", { p_partner_id: partnerId }).catch(() => {
    // fallback if RPC doesn't exist: no-op
  });

  return NextResponse.json({ ok: true, attributed: true, referralId: data.id });
}

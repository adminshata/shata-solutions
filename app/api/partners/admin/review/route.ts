import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { slugifyName, uniqueSlug, COMMISSION_BY_TIER } from "@/lib/partners";

export const runtime = "nodejs";

// POST /api/partners/admin/review
// Protected by ADMIN_API_KEY header. In production, replace with proper auth (Clerk/Supabase).
//
// body: { applicationId, action: "approve"|"reject"|"more_info", notes? }

function requireAdmin(req: Request) {
  const key = req.headers.get("x-admin-key");
  return key && key === process.env.ADMIN_API_KEY;
}

export async function POST(req: Request) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { applicationId?: string; action?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const { applicationId, action, notes } = body;
  if (!applicationId || !action) {
    return NextResponse.json({ error: "applicationId + action required" }, { status: 400 });
  }
  if (!["approve", "reject", "more_info"].includes(action)) {
    return NextResponse.json({ error: "invalid action" }, { status: 400 });
  }

  const db = supabaseAdmin();

  const { data: app, error: appErr } = await db
    .from("partner_applications")
    .select("id, full_name, email, status")
    .eq("id", applicationId)
    .maybeSingle();

  if (appErr || !app) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (app.status !== "pending" && app.status !== "more_info") {
    return NextResponse.json({ error: `already ${app.status}` }, { status: 409 });
  }

  const statusMap: Record<string, string> = {
    approve: "approved",
    reject: "rejected",
    more_info: "more_info",
  };

  await db
    .from("partner_applications")
    .update({
      status: statusMap[action],
      review_notes: notes || null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (action === "approve") {
    const baseSlug = slugifyName(app.full_name);
    const slug = await uniqueSlug(baseSlug, async (s) => {
      const { data } = await db.from("partners").select("id").eq("slug", s).maybeSingle();
      return !!data;
    });

    const { data: partner, error: partnerErr } = await db
      .from("partners")
      .insert({
        application_id: app.id,
        email: app.email,
        full_name: app.full_name,
        slug,
        tier: "starter",
        commission_rate: COMMISSION_BY_TIER.starter,
      })
      .select("id, slug")
      .single();

    if (partnerErr) {
      console.error("[admin/review]", partnerErr);
      return NextResponse.json({ error: "failed to create partner" }, { status: 500 });
    }

    // TODO: send welcome email with slug URL + dashboard link
    return NextResponse.json({ ok: true, partner });
  }

  return NextResponse.json({ ok: true });
}

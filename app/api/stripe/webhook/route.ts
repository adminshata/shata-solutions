import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { commissionCents, periodKey } from "@/lib/partners";

export const runtime = "nodejs";

// Stripe webhook for partner commissions.
// Events we care about:
//   invoice.payment_succeeded   → accrue commission for the period
//   customer.subscription.deleted → mark referral cancelled
//   charge.refunded             → reverse commission
//
// In production, verify the Stripe signature with stripe.webhooks.constructEvent.
// This scaffold reads JSON directly — wire the real Stripe SDK in Part 3.

type StripeEvent = {
  type: string;
  data: { object: any };
};

export async function POST(req: Request) {
  let evt: StripeEvent;
  try {
    evt = (await req.json()) as StripeEvent;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const db = supabaseAdmin();

  switch (evt.type) {
    case "invoice.payment_succeeded": {
      const inv = evt.data.object;
      const customerId = inv.customer as string;
      const amountCents = inv.amount_paid as number;
      const email = (inv.customer_email || "").toLowerCase();

      const { data: ref } = await db
        .from("referrals")
        .select("id, partner_id, status")
        .or(`stripe_customer_id.eq.${customerId},customer_email.eq.${email}`)
        .maybeSingle();
      if (!ref) break;

      const { data: partner } = await db
        .from("partners")
        .select("commission_rate")
        .eq("id", ref.partner_id)
        .single();
      if (!partner) break;

      const cc = commissionCents(amountCents, Number(partner.commission_rate));
      const period = periodKey();

      await db.from("commissions").upsert(
        {
          partner_id: ref.partner_id,
          referral_id: ref.id,
          period,
          amount_cents: cc,
          rate: partner.commission_rate,
          status: "pending",
        },
        { onConflict: "referral_id,period" },
      );

      await db
        .from("referrals")
        .update({
          status: "active",
          mrr_cents: amountCents,
          first_paid_at: ref.status === "trialing" ? new Date().toISOString() : undefined,
          stripe_customer_id: customerId,
        })
        .eq("id", ref.id);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = evt.data.object;
      const customerId = sub.customer as string;
      await db
        .from("referrals")
        .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
        .eq("stripe_customer_id", customerId);
      break;
    }

    case "charge.refunded": {
      const charge = evt.data.object;
      const customerId = charge.customer as string;
      const period = periodKey();
      const { data: ref } = await db
        .from("referrals")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .maybeSingle();
      if (ref) {
        await db
          .from("commissions")
          .update({ status: "reversed" })
          .eq("referral_id", ref.id)
          .eq("period", period);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

"use client";

import { useEffect, useState } from "react";

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  currency: string;
  features: string[];
}

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  paidAt: string | null;
  lineItems: { description: string; amount: number }[];
  createdAt: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string | null;
  brand: string | null;
  isDefault: boolean;
}

interface Summary {
  invoices: Invoice[];
  paymentMethods: PaymentMethod[];
  outstandingCount: number;
  outstandingTotal: number;
  plans: Plan[];
}

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SENT: "bg-blue-100 text-blue-700",
  PAID: "bg-green-100 text-green-700",
  OVERDUE: "bg-red-100 text-red-700",
  CANCELLED: "bg-slate-100 text-slate-400",
};

const ORG_ID = "REPLACE_WITH_ORG_ID";
const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

export default function BillingPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"invoices" | "plans" | "payment">("invoices");
  const [creatingInvoice, setCreatingInvoice] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/dashboard/billing/summary?orgId=${ORG_ID}`);
    setSummary(await res.json() as Summary);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createInvoice = async (planId: string) => {
    setCreatingInvoice(true);
    await fetch(`${API}/api/dashboard/billing/invoices?orgId=${ORG_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });
    setCreatingInvoice(false);
    load();
  };

  const markPaid = async (invoiceId: string) => {
    await fetch(`${API}/api/dashboard/billing/invoices/${invoiceId}/pay?orgId=${ORG_ID}`, { method: "POST" });
    load();
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">Billing</h1>
        {summary.outstandingCount > 0 && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
            {summary.outstandingCount} unpaid · {summary.outstandingTotal.toFixed(0)} {summary.invoices[0]?.currency ?? "EGP"}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b bg-white px-6 py-2">
        {(["invoices", "plans", "payment"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              tab === t ? "bg-brand text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t === "payment" ? "Payment Methods" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto px-6 py-4">
        {tab === "invoices" && (
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Due</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {summary.invoices.map((inv) => {
                  const line = (inv.lineItems as { description: string }[])[0];
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700">{line?.description ?? "Invoice"}</td>
                      <td className="px-4 py-3 font-bold">{Number(inv.amount).toFixed(0)} {inv.currency}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[inv.status] ?? "bg-slate-100"}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">{new Date(inv.dueDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        {(inv.status === "SENT" || inv.status === "OVERDUE") && (
                          <button
                            onClick={() => markPaid(inv.id)}
                            className="rounded-lg bg-success px-3 py-1 text-xs font-bold text-white hover:opacity-90"
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {summary.invoices.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-sm text-slate-400">No invoices yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === "plans" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {summary.plans.map((plan) => (
              <div key={plan.id} className="rounded-xl border bg-white p-5 flex flex-col gap-3">
                <div>
                  <p className="font-bold text-slate-900 text-lg">{plan.name}</p>
                  <p className="text-2xl font-black text-brand mt-1">
                    {plan.monthlyPrice.toLocaleString()} <span className="text-sm font-semibold text-slate-500">{plan.currency}/mo</span>
                  </p>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="text-green-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => createInvoice(plan.id)}
                  disabled={creatingInvoice}
                  className="w-full rounded-lg bg-brand py-2 text-xs font-bold text-white hover:opacity-90 disabled:opacity-50"
                >
                  {creatingInvoice ? "Creating…" : "Generate Invoice"}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "payment" && (
          <div className="max-w-lg space-y-4">
            {summary.paymentMethods.length === 0 ? (
              <div className="rounded-xl border bg-white p-8 text-center text-sm text-slate-400">
                No payment methods on file
              </div>
            ) : (
              <div className="rounded-xl border bg-white overflow-hidden">
                {summary.paymentMethods.map((pm) => (
                  <div key={pm.id} className="flex items-center justify-between px-5 py-4 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pm.type === "CARD" ? "💳" : "🏦"}</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {pm.brand ?? pm.type} {pm.last4 ? `••••${pm.last4}` : ""}
                        </p>
                        {pm.isDefault && <span className="text-xs text-brand font-semibold">Default</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

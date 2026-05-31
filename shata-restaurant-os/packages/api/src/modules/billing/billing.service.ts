import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DatabaseService } from "../../shared/database/database.service";
import { BILLING_PLANS, getPlanById } from "./billing.plans";
import type { InvoiceStatus } from "@shata/database";

@Injectable()
export class BillingService {
  constructor(private readonly db: DatabaseService) {}

  getPlans() {
    return BILLING_PLANS;
  }

  async getInvoices(orgId: string) {
    return this.db.invoice.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
      take: 24,
    });
  }

  async getPaymentMethods(orgId: string) {
    return this.db.paymentMethod.findMany({ where: { orgId }, orderBy: { createdAt: "desc" } });
  }

  async createInvoice(orgId: string, planId: string) {
    const plan = getPlanById(planId);
    if (!plan) throw new Error(`Unknown plan: ${planId}`);

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    return this.db.invoice.create({
      data: {
        orgId,
        amount: plan.monthlyPrice,
        currency: plan.currency,
        status: "SENT",
        dueDate,
        lineItems: [{ description: `${plan.name} Plan — Monthly Subscription`, amount: plan.monthlyPrice, currency: plan.currency }],
      },
    });
  }

  async markPaid(orgId: string, invoiceId: string) {
    return this.db.invoice.updateMany({
      where: { id: invoiceId, orgId },
      data: { status: "PAID", paidAt: new Date() },
    });
  }

  async addPaymentMethod(orgId: string, data: { type: string; last4?: string; brand?: string; providerRef?: string }) {
    // Clear existing default if setting new one
    await this.db.paymentMethod.updateMany({ where: { orgId, isDefault: true }, data: { isDefault: false } });
    return this.db.paymentMethod.create({ data: { orgId, ...data, isDefault: true } });
  }

  async getBillingSummary(orgId: string) {
    const [invoices, paymentMethods] = await Promise.all([
      this.getInvoices(orgId),
      this.getPaymentMethods(orgId),
    ]);

    const outstanding = invoices.filter((i) => i.status === "SENT" || i.status === "OVERDUE");
    const outstandingTotal = outstanding.reduce((sum, i) => sum + Number(i.amount), 0);

    return {
      invoices,
      paymentMethods,
      outstandingCount: outstanding.length,
      outstandingTotal,
      plans: BILLING_PLANS,
    };
  }

  // Daily job — mark overdue invoices
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async markOverdueInvoices() {
    await this.db.invoice.updateMany({
      where: { status: "SENT", dueDate: { lt: new Date() } },
      data: { status: "OVERDUE" as InvoiceStatus },
    });
  }
}

import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { BillingService } from "./billing.service";

@ApiTags("Billing")
@Controller("dashboard/billing")
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get("plans")
  @ApiOperation({ summary: "List available subscription plans" })
  getPlans() {
    return this.billingService.getPlans();
  }

  @Get("summary")
  @ApiOperation({ summary: "Billing summary — invoices + payment methods + plans" })
  getSummary(@Query("orgId") orgId: string) {
    return this.billingService.getBillingSummary(orgId);
  }

  @Post("invoices")
  @ApiOperation({ summary: "Generate invoice for a plan" })
  createInvoice(@Query("orgId") orgId: string, @Body() body: { planId: string }) {
    return this.billingService.createInvoice(orgId, body.planId);
  }

  @Post("invoices/:id/pay")
  @ApiOperation({ summary: "Mark invoice as paid" })
  markPaid(@Query("orgId") orgId: string, @Param("id") id: string) {
    return this.billingService.markPaid(orgId, id);
  }

  @Post("payment-methods")
  @ApiOperation({ summary: "Add a payment method" })
  addPaymentMethod(
    @Query("orgId") orgId: string,
    @Body() body: { type: string; last4?: string; brand?: string; providerRef?: string }
  ) {
    return this.billingService.addPaymentMethod(orgId, body);
  }
}

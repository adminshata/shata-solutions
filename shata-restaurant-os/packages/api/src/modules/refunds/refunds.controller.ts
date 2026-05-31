import { Controller, Post, Patch, Get, Param, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { RefundsService } from "./refunds.service";
import type { RefundReason, RefundStatus } from "@shata/database";

@ApiTags("Refunds")
@Controller("dashboard")
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Post("orders/:id/refund/request")
  @ApiOperation({ summary: "Request a refund for an order" })
  requestRefund(
    @Param("id") orderId: string,
    @Query("restaurantId") restaurantId: string,
    @Body() body: {
      amount: number;
      reason: RefundReason;
      notes?: string;
      initiatedBy: string;
      staffRole: string;
    }
  ) {
    return this.refundsService.requestRefund(
      restaurantId,
      orderId,
      body.initiatedBy,
      body.staffRole,
      { amount: body.amount, reason: body.reason, notes: body.notes }
    );
  }

  @Patch("refunds/:id/approve")
  @ApiOperation({ summary: "Approve a pending refund (MANAGER/OWNER only)" })
  approveRefund(
    @Param("id") refundId: string,
    @Query("restaurantId") restaurantId: string,
    @Body() body: { approvedBy: string; staffRole: string }
  ) {
    return this.refundsService.approveRefund(restaurantId, refundId, body.approvedBy, body.staffRole);
  }

  @Patch("refunds/:id/reject")
  @ApiOperation({ summary: "Reject a pending refund (MANAGER/OWNER only)" })
  rejectRefund(
    @Param("id") refundId: string,
    @Query("restaurantId") restaurantId: string,
    @Body() body: { staffRole: string }
  ) {
    return this.refundsService.rejectRefund(restaurantId, refundId, body.staffRole);
  }

  @Get("refunds")
  @ApiOperation({ summary: "List refunds with filters" })
  listRefunds(
    @Query("restaurantId") restaurantId: string,
    @Query("status") status?: RefundStatus,
    @Query("from") from?: string,
    @Query("to") to?: string,
    @Query("page") page?: string
  ) {
    return this.refundsService.listRefunds(restaurantId, {
      status,
      from,
      to,
      page: page ? parseInt(page, 10) : 1,
    });
  }

  @Get("refunds/stats")
  @ApiOperation({ summary: "Refund stats for analytics" })
  getStats(@Query("restaurantId") restaurantId: string) {
    return this.refundsService.getRefundStats(restaurantId);
  }
}

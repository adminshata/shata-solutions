import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { InstapayService } from "./instapay.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("InstaPay")
@Controller()
export class InstapayController {
  constructor(private readonly instapayService: InstapayService) {}

  @Post("dashboard/orders/:orderId/instapay/confirm")
  @ApiOperation({ summary: "Staff confirms InstaPay payment received" })
  confirmPayment(
    @Param("orderId") orderId: string,
    @Query("restaurantId") restaurantId: string,
    @Body() body: { confirmedBy: string }
  ) {
    return this.instapayService.confirmPayment(restaurantId, orderId, body.confirmedBy);
  }

  @Get("dashboard/instapay/pending")
  @ApiOperation({ summary: "List pending InstaPay confirmations (dashboard widget)" })
  listPending(@Query("restaurantId") restaurantId: string) {
    return this.instapayService.listPending(restaurantId);
  }

  @Public()
  @Post("sessions/:token/instapay/request")
  @ApiOperation({ summary: "Customer requests InstaPay — creates 15-min confirmation window" })
  requestConfirmation(
    @Param("token") _token: string,
    @Query("orderId") orderId: string,
    @Query("restaurantId") restaurantId: string,
    @Body() body: { amount: number }
  ) {
    return this.instapayService.createConfirmation(restaurantId, orderId, body.amount);
  }

  @Public()
  @Get("orders/:orderId/instapay/status")
  @ApiOperation({ summary: "Customer polls InstaPay confirmation status" })
  getStatus(@Param("orderId") orderId: string) {
    return this.instapayService.getConfirmationStatus(orderId);
  }
}

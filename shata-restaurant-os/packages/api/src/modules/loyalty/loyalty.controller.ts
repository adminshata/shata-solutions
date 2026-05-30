import { Controller, Get, Patch, Param, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { LoyaltyService } from "./loyalty.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Loyalty")
@Controller()
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Public()
  @Get("sessions/:token/loyalty")
  @ApiOperation({ summary: "Get stamp card for this table (customer-facing)" })
  getCard(@Param("token") token: string) {
    return this.loyaltyService.getCard(token);
  }

  @Patch("dashboard/loyalty/config")
  @ApiOperation({ summary: "Update loyalty program config (dashboard)" })
  updateConfig(
    @Query("restaurantId") restaurantId: string,
    @Body() dto: { stampsRequired?: number; rewardType?: string; rewardProductId?: string | null }
  ) {
    return this.loyaltyService.updateConfig(restaurantId, dto);
  }
}

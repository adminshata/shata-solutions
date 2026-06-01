import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { LoyaltyService } from "./loyalty.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Loyalty")
@Controller()
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  // ── Customer-facing ──────────────────────────────────────────────────────

  @Public()
  @Get("sessions/:token/loyalty-status")
  @ApiOperation({ summary: "Full loyalty status — points, tier, stamps (customer-facing)" })
  getLoyaltyStatus(@Param("token") token: string) {
    return this.loyaltyService.getLoyaltyStatus(token);
  }

  @Public()
  @Get("sessions/:token/loyalty")
  @ApiOperation({ summary: "Legacy: get stamp card (now returns full status)" })
  getCard(@Param("token") token: string) {
    return this.loyaltyService.getLoyaltyStatus(token);
  }

  @Public()
  @Post("loyalty/referral/apply")
  @ApiOperation({ summary: "Apply a referral code — awards points to both parties" })
  applyReferral(@Body() dto: { restaurantId: string; referralCode: string; newCustomerId: string }) {
    return this.loyaltyService.applyReferral(dto);
  }

  // ── Dashboard ────────────────────────────────────────────────────────────

  @ApiBearerAuth()
  @Get("dashboard/loyalty/customers")
  @ApiOperation({ summary: "Paginated customer loyalty leaderboard" })
  getDashboardCustomers(@Query("restaurantId") restaurantId: string, @Query("page") page = "1") {
    return this.loyaltyService.getDashboardCustomers(restaurantId, parseInt(page));
  }

  @ApiBearerAuth()
  @Get("dashboard/loyalty/program")
  @ApiOperation({ summary: "Get loyalty program config + tiers" })
  getProgram(@Query("restaurantId") restaurantId: string) {
    return this.loyaltyService.getProgram(restaurantId);
  }

  @ApiBearerAuth()
  @Patch("dashboard/loyalty/program")
  @ApiOperation({ summary: "Update loyalty program config (type, pointsPerEgp, birthday bonus, referral)" })
  updateProgram(@Query("restaurantId") restaurantId: string, @Body() dto: Record<string, unknown>) {
    return this.loyaltyService.updateProgram(restaurantId, dto);
  }

  @ApiBearerAuth()
  @Post("dashboard/loyalty/tiers")
  @ApiOperation({ summary: "Create or update a loyalty tier" })
  upsertTier(
    @Query("restaurantId") restaurantId: string,
    @Body() dto: { id?: string; name: string; nameAr?: string; minPoints: number; multiplier: number; perks: string[]; badgeColor: string }
  ) {
    return this.loyaltyService.upsertTier(restaurantId, dto.id, dto);
  }

  @ApiBearerAuth()
  @Delete("dashboard/loyalty/tiers/:tierId")
  @ApiOperation({ summary: "Delete a loyalty tier" })
  deleteTier(@Param("tierId") tierId: string) {
    return this.loyaltyService.deleteTier(tierId);
  }

  @ApiBearerAuth()
  @Patch("dashboard/loyalty/config")
  @ApiOperation({ summary: "Legacy: update stamp card config" })
  updateConfig(
    @Query("restaurantId") restaurantId: string,
    @Body() dto: { stampsRequired?: number; rewardType?: string; rewardProductId?: string | null }
  ) {
    return this.loyaltyService.updateConfig(restaurantId, dto);
  }
}

import { Controller, Get, Patch, Param, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UpsellService, type UpsellProduct } from "./upsell.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Upsell")
@Controller()
export class UpsellController {
  constructor(private readonly svc: UpsellService) {}

  @Public()
  @Get("sessions/:token/upsell/:productId")
  @ApiOperation({ summary: "Collaborative filtering: what customers also ordered with this product" })
  getUpsells(@Param("token") token: string, @Param("productId") productId: string): Promise<UpsellProduct[]> {
    return this.svc.getUpsells(token, productId);
  }

  @ApiBearerAuth()
  @Get("dashboard/settings/upsell")
  @ApiOperation({ summary: "Get upsell config for this restaurant" })
  async getConfig(@Query("restaurantId") restaurantId: string) {
    return this.svc.getUpsellConfig(restaurantId);
  }

  @ApiBearerAuth()
  @Patch("dashboard/settings/upsell")
  @ApiOperation({ summary: "Update upsell threshold (10–10000)" })
  async updateConfig(@Query("restaurantId") restaurantId: string, @Body() body: { minOrders: number }) {
    return this.svc.updateUpsellConfig(restaurantId, body.minOrders);
  }
}

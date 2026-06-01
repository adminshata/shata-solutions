import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { PricingService, PricingRuleDto } from "./pricing.service";

@ApiTags("Pricing")
@ApiBearerAuth()
@Controller("dashboard/pricing")
export class PricingController {
  constructor(private readonly svc: PricingService) {}

  @Get()
  @ApiOperation({ summary: "List all pricing rules for a restaurant" })
  getRules(@Query("restaurantId") restaurantId: string) {
    return this.svc.getAllRules(restaurantId);
  }

  @Post()
  @ApiOperation({ summary: "Create a pricing / happy hour rule" })
  createRule(@Query("restaurantId") restaurantId: string, @Body() dto: PricingRuleDto) {
    return this.svc.createRule(restaurantId, dto);
  }

  @Patch(":ruleId")
  @ApiOperation({ summary: "Update a pricing rule" })
  updateRule(@Param("ruleId") ruleId: string, @Body() dto: Partial<PricingRuleDto>) {
    return this.svc.updateRule(ruleId, dto);
  }

  @Patch(":ruleId/toggle")
  @ApiOperation({ summary: "Enable or disable a pricing rule" })
  toggleRule(@Param("ruleId") ruleId: string, @Body() body: { isActive: boolean }) {
    return this.svc.toggleRule(ruleId, body.isActive);
  }

  @Delete(":ruleId")
  @ApiOperation({ summary: "Delete a pricing rule" })
  deleteRule(@Param("ruleId") ruleId: string) {
    return this.svc.deleteRule(ruleId);
  }
}

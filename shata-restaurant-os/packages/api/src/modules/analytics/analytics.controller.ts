import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnalyticsService } from "./analytics.service";

@ApiTags("Analytics")
@Controller("dashboard/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("overview")
  getOverview(@Query("restaurantId") restaurantId: string) {
    return this.analyticsService.getOverview(restaurantId);
  }
}

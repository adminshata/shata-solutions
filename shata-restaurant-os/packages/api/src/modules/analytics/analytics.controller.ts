import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AnalyticsService } from "./analytics.service";

@ApiTags("Analytics")
@Controller("dashboard/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("overview")
  @ApiOperation({ summary: "Revenue and order counts with trend vs. prior periods" })
  getOverview(@Query("restaurantId") restaurantId: string) {
    return this.analyticsService.getOverview(restaurantId);
  }

  @Get("peak-hours")
  @ApiOperation({ summary: "Hourly order distribution (24 buckets)" })
  getPeakHours(
    @Query("restaurantId") restaurantId: string,
    @Query("from") from?: string,
    @Query("to") to?: string
  ) {
    return this.analyticsService.getPeakHours(restaurantId, from, to);
  }

  @Get("products")
  @ApiOperation({ summary: "Top products by revenue and order count" })
  getTopProducts(
    @Query("restaurantId") restaurantId: string,
    @Query("from") from?: string,
    @Query("to") to?: string
  ) {
    return this.analyticsService.getTopProducts(restaurantId, from, to);
  }

  @Get("tables")
  @ApiOperation({ summary: "Revenue, order count, and avg session duration per table" })
  getTableStats(
    @Query("restaurantId") restaurantId: string,
    @Query("from") from?: string,
    @Query("to") to?: string
  ) {
    return this.analyticsService.getTableStats(restaurantId, from, to);
  }

  @Get("customers")
  @ApiOperation({ summary: "Visit frequency and revenue per table (customer proxy)" })
  getCustomerStats(
    @Query("restaurantId") restaurantId: string,
    @Query("from") from?: string,
    @Query("to") to?: string
  ) {
    return this.analyticsService.getCustomerStats(restaurantId, from, to);
  }
}

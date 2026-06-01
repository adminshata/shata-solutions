import { Controller, Get, Query, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiTags, ApiOperation, ApiProduces } from "@nestjs/swagger";
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

  @Get("z-report")
  @ApiOperation({ summary: "End-of-day Z-report — returns a PDF" })
  @ApiProduces("application/pdf")
  async getZReport(
    @Query("restaurantId") restaurantId: string,
    @Query("date") date: string | undefined,
    @Res() res: Response
  ) {
    const pdf = await this.analyticsService.generateZReportPdf(restaurantId, date);
    const dateLabel = (date ?? new Date().toISOString().slice(0, 10));
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="z-report-${dateLabel}.pdf"`);
    res.setHeader("Content-Length", pdf.length);
    res.end(pdf);
  }
}

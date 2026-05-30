import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import { OrderStatus } from "@shata/database";
import type { AnalyticsOverviewDto } from "@shata/types";

@Injectable()
export class AnalyticsService {
  constructor(private readonly db: DatabaseService) {}

  async getOverview(restaurantId: string): Promise<AnalyticsOverviewDto> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const excluded = { notIn: [OrderStatus.CANCELLED, OrderStatus.REFUNDED] };
    const [tod, wk, mo, rest] = await Promise.all([
      this.db.order.findMany({ where: { restaurantId, createdAt: { gte: startOfDay }, status: excluded }, select: { total: true } }),
      this.db.order.findMany({ where: { restaurantId, createdAt: { gte: startOfWeek }, status: excluded }, select: { total: true } }),
      this.db.order.findMany({ where: { restaurantId, createdAt: { gte: startOfMonth }, status: excluded }, select: { total: true } }),
      this.db.restaurant.findUnique({ where: { id: restaurantId }, select: { currency: true } }),
    ]);
    const sum = (o: { total: unknown }[]) => o.reduce((a, x) => a + Number(x.total), 0);
    return {
      revenue: { today: sum(tod), week: sum(wk), month: sum(mo), currency: rest?.currency ?? "USD" },
      orders: { today: tod.length, week: wk.length, month: mo.length },
      avgOrderValue: mo.length > 0 ? sum(mo) / mo.length : 0,
      topProducts: [],
      recentTransactions: [],
    };
  }
}

import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { DatabaseService } from "../../database/database.service";
import { OrderStatus } from "@shata/database";
import { QUEUES, JOBS } from "../queue.constants";

@Processor(QUEUES.ANALYTICS_COMPUTE)
export class AnalyticsComputeProcessor extends WorkerHost {
  private readonly logger = new Logger(AnalyticsComputeProcessor.name);

  constructor(private readonly db: DatabaseService) {
    super();
  }

  async process(job: Job): Promise<void> {
    if (job.name !== JOBS.COMPUTE_DAILY_STATS) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    const nextDay = new Date(dateOnly);
    nextDay.setDate(nextDay.getDate() + 1);

    const restaurants = await this.db.restaurant.findMany({ select: { id: true } });

    for (const restaurant of restaurants) {
      await this.computeForRestaurant(restaurant.id, dateOnly, nextDay);
    }

    this.logger.log(`Daily analytics computed for ${restaurants.length} restaurants`);
  }

  private async computeForRestaurant(restaurantId: string, from: Date, to: Date) {
    const orders = await this.db.order.findMany({
      where: {
        restaurantId,
        createdAt: { gte: from, lt: to },
        status: {
          notIn: [OrderStatus.CANCELLED, OrderStatus.REFUNDED],
        },
      },
      select: { total: true, items: { select: { productId: true, quantity: true, totalPrice: true } } },
    });

    if (orders.length === 0) return;

    const totalRevenue = orders.reduce((s, o) => s + Number(o.total), 0);
    const avgOrderValue = totalRevenue / orders.length;

    // Top products by quantity sold
    const productSales = new Map<string, number>();
    for (const order of orders) {
      for (const item of order.items) {
        productSales.set(item.productId, (productSales.get(item.productId) ?? 0) + item.quantity);
      }
    }
    const topProducts = [...productSales.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([productId, qty]) => ({ productId, qty }));

    await this.db.analyticsSnapshot.upsert({
      where: { restaurantId_date: { restaurantId, date: from } },
      update: {
        totalOrders: orders.length,
        totalRevenue,
        avgOrderValue,
        topProducts,
      },
      create: {
        restaurantId,
        date: from,
        totalOrders: orders.length,
        totalRevenue,
        avgOrderValue,
        topProducts,
        peakHour: 0,
        newCustomers: 0,
        returningCustomers: 0,
      },
    });
  }
}

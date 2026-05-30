import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { DatabaseService } from "../../database/database.service";
import { OrderStatus } from "@shata/database";
import { QUEUES, JOBS } from "../queue.constants";

@Processor(QUEUES.Z_REPORT_GENERATE)
export class ZReportProcessor extends WorkerHost {
  private readonly logger = new Logger(ZReportProcessor.name);

  constructor(private readonly db: DatabaseService) {
    super();
  }

  async process(job: Job): Promise<void> {
    if (job.name !== JOBS.GENERATE_Z_REPORT) return;

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const restaurants = await this.db.restaurant.findMany({ select: { id: true } });

    for (const restaurant of restaurants) {
      await this.generateReport(restaurant.id, startOfDay, endOfDay);
    }

    this.logger.log(`Z-reports generated for ${restaurants.length} restaurants`);
  }

  private async generateReport(restaurantId: string, from: Date, to: Date) {
    const orders = await this.db.order.findMany({
      where: {
        restaurantId,
        createdAt: { gte: from, lt: to },
        status: {
          notIn: [OrderStatus.CANCELLED],
        },
      },
      select: { total: true, tax: true, status: true },
    });

    const refundedOrders = orders.filter((o) => o.status === OrderStatus.REFUNDED);
    const completedOrders = orders.filter((o) => o.status !== OrderStatus.REFUNDED);

    const totalRevenue = completedOrders.reduce((s, o) => s + Number(o.total), 0);
    const totalTax = completedOrders.reduce((s, o) => s + Number(o.tax), 0);
    const totalRefunds = refundedOrders.reduce((s, o) => s + Number(o.total), 0);
    const netRevenue = totalRevenue - totalRefunds;

    await this.db.zReport.upsert({
      where: { restaurantId_date: { restaurantId, date: from } },
      update: {
        totalOrders: completedOrders.length,
        totalRevenue,
        totalTax,
        totalRefunds,
        netRevenue,
      },
      create: {
        restaurantId,
        date: from,
        pdfUrl: "", // PDF generation would use a library like pdfmake
        totalOrders: completedOrders.length,
        totalRevenue,
        totalTax,
        totalRefunds,
        netRevenue,
      },
    });

    this.logger.debug(`Z-report saved for restaurant ${restaurantId}: net=${netRevenue}`);
  }
}

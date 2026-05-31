import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { DatabaseService } from "../../shared/database/database.service";
import { QUEUES, JOBS } from "../../shared/queue/queue.constants";
import type { RefundReason, RefundStatus } from "@shata/database";

@Injectable()
export class RefundsService {
  constructor(
    private readonly db: DatabaseService,
    @InjectQueue(QUEUES.REFUND_PROCESS) private readonly refundQueue: Queue
  ) {}

  async requestRefund(
    restaurantId: string,
    orderId: string,
    initiatedBy: string,
    staffRole: string,
    dto: { amount: number; reason: RefundReason; notes?: string }
  ) {
    const order = await this.db.order.findUnique({
      where: { id: orderId, restaurantId },
      include: { payment: true },
    });
    if (!order) throw new NotFoundException("Order not found");
    if (!order.payment) throw new BadRequestException("Order has no payment");
    if (order.status === "REFUNDED") throw new BadRequestException("Order already refunded");

    const isManager = staffRole === "MANAGER" || staffRole === "OWNER";

    const refund = await this.db.refund.create({
      data: {
        orderId,
        restaurantId,
        paymentIntentId: order.payment.id,
        amount: dto.amount,
        reason: dto.reason,
        notes: dto.notes,
        status: isManager ? "APPROVED" : "PENDING_APPROVAL",
        initiatedBy,
        approvedBy: isManager ? initiatedBy : undefined,
      },
    });

    // Managers/owners auto-trigger the refund job
    if (isManager) {
      await this.refundQueue.add(JOBS.PROCESS_REFUND, {
        refundId: refund.id,
        providerRef: order.payment.providerRef,
        amount: dto.amount,
      });
    }

    return refund;
  }

  async approveRefund(restaurantId: string, refundId: string, approvedBy: string, staffRole: string) {
    if (staffRole !== "MANAGER" && staffRole !== "OWNER") {
      throw new ForbiddenException("Only managers and owners can approve refunds");
    }

    const refund = await this.db.refund.findFirst({
      where: { id: refundId, restaurantId, status: "PENDING_APPROVAL" },
      include: { order: { include: { payment: true } } },
    });
    if (!refund) throw new NotFoundException("Pending refund not found");
    if (!refund.order.payment) throw new BadRequestException("Order has no payment");

    await this.db.refund.update({
      where: { id: refundId },
      data: { status: "APPROVED", approvedBy },
    });

    await this.refundQueue.add(JOBS.PROCESS_REFUND, {
      refundId,
      providerRef: refund.order.payment.providerRef,
      amount: Number(refund.amount),
    });

    return { success: true };
  }

  async rejectRefund(restaurantId: string, refundId: string, staffRole: string) {
    if (staffRole !== "MANAGER" && staffRole !== "OWNER") {
      throw new ForbiddenException("Only managers and owners can reject refunds");
    }

    const refund = await this.db.refund.findFirst({
      where: { id: refundId, restaurantId, status: "PENDING_APPROVAL" },
    });
    if (!refund) throw new NotFoundException("Pending refund not found");

    return this.db.refund.update({
      where: { id: refundId },
      data: { status: "REJECTED" },
    });
  }

  async listRefunds(
    restaurantId: string,
    query: { status?: RefundStatus; from?: string; to?: string; page?: number }
  ) {
    const page = query.page ?? 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const where = {
      restaurantId,
      ...(query.status ? { status: query.status } : {}),
      ...(query.from || query.to
        ? {
            createdAt: {
              ...(query.from ? { gte: new Date(query.from) } : {}),
              ...(query.to ? { lte: new Date(query.to) } : {}),
            },
          }
        : {}),
    };

    const [refunds, total] = await Promise.all([
      this.db.refund.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          order: { select: { orderNumber: true, total: true, currency: true } },
        },
      }),
      this.db.refund.count({ where }),
    ]);

    return { refunds, total, page, limit };
  }

  async getRefundStats(restaurantId: string) {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [todayRefunds, weekRefunds, monthRefunds, reasonStats] = await Promise.all([
      this.db.refund.findMany({
        where: { restaurantId, status: "COMPLETED", createdAt: { gte: startOfDay } },
        select: { amount: true },
      }),
      this.db.refund.findMany({
        where: { restaurantId, status: "COMPLETED", createdAt: { gte: startOfWeek } },
        select: { amount: true },
      }),
      this.db.refund.findMany({
        where: { restaurantId, status: "COMPLETED", createdAt: { gte: startOfMonth } },
        select: { amount: true, reason: true },
      }),
      this.db.refund.groupBy({
        by: ["reason"],
        where: { restaurantId, createdAt: { gte: startOfMonth } },
        _count: true,
      }),
    ]);

    const sum = (r: { amount: unknown }[]) => r.reduce((a, x) => a + Number(x.amount), 0);

    return {
      today: { count: todayRefunds.length, amount: sum(todayRefunds) },
      week: { count: weekRefunds.length, amount: sum(weekRefunds) },
      month: { count: monthRefunds.length, amount: sum(monthRefunds) },
      byReason: reasonStats.map((r) => ({ reason: r.reason, count: r._count })),
    };
  }
}

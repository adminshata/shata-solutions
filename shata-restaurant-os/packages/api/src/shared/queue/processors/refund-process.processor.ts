import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DatabaseService } from "../../database/database.service";
import { QUEUES, JOBS } from "../queue.constants";

interface RefundJobData {
  refundId: string;
  providerRef: string | null;
  amount: number;
}

@Processor(QUEUES.REFUND_PROCESS)
export class RefundProcessProcessor extends WorkerHost {
  private readonly logger = new Logger(RefundProcessProcessor.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly events: EventEmitter2
  ) {
    super();
  }

  async process(job: Job<RefundJobData>): Promise<void> {
    if (job.name !== JOBS.PROCESS_REFUND) return;

    const { refundId, providerRef, amount } = job.data;

    await this.db.refund.update({
      where: { id: refundId },
      data: { status: "PROCESSING" },
    });

    try {
      // Attempt provider refund if there is a provider reference
      let providerRefId: string | null = null;
      if (providerRef) {
        // Dynamic provider lookup — delegate to PaymentsService event
        this.events.emit("refund.process", { refundId, providerRef, amount });
        providerRefId = `manual-${Date.now()}`;
      }

      const refund = await this.db.refund.update({
        where: { id: refundId },
        data: {
          status: "COMPLETED",
          processedAt: new Date(),
          providerRefId: providerRefId ?? undefined,
        },
        include: { order: true },
      });

      // Mark order as REFUNDED
      await this.db.order.update({
        where: { id: refund.orderId },
        data: { status: "REFUNDED" },
      });

      // Create negative transaction record
      await this.db.transaction.create({
        data: {
          restaurantId: refund.restaurantId,
          type: "REFUND",
          amount: -amount,
          currency: refund.order.currency,
          fee: 0,
          net: -amount,
          refId: refundId,
        },
      });

      this.logger.log(`Refund ${refundId} completed for order ${refund.orderId}`);
      this.events.emit("refund.completed", { refund });

    } catch (err) {
      this.logger.error(`Refund ${refundId} failed: ${(err as Error).message}`);
      await this.db.refund.update({
        where: { id: refundId },
        data: { status: "PENDING_APPROVAL" },
      });
      // Re-throw to trigger BullMQ retry
      throw err;
    }
  }
}

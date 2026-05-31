import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { DatabaseService } from "../../database/database.service";
import { QUEUES } from "../queue.constants";

@Processor(QUEUES.INSTAPAY_EXPIRY)
export class InstapayExpiryProcessor extends WorkerHost {
  constructor(private readonly db: DatabaseService) {
    super();
  }

  async process(job: Job<{ confirmationId: string; orderId: string }>): Promise<void> {
    const { orderId } = job.data;

    const confirmation = await this.db.instapayPendingConfirmation.findFirst({
      where: { orderId, confirmedAt: null },
    });
    if (!confirmation) return; // Already confirmed or removed

    if (new Date() < confirmation.expiresAt) return; // Not yet expired (race guard)

    await this.db.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" as never, voidReason: "InstaPay confirmation expired" },
    }).catch(() => {}); // Order may already be voided

    await this.db.instapayPendingConfirmation.delete({ where: { id: confirmation.id } });
  }
}

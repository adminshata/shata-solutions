import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { DatabaseService } from "../../database/database.service";
import { QUEUES, JOBS } from "../queue.constants";

@Processor(QUEUES.PAYMENT_RECONCILIATION)
export class PaymentReconciliationProcessor extends WorkerHost {
  private readonly logger = new Logger(PaymentReconciliationProcessor.name);

  constructor(private readonly db: DatabaseService) {
    super();
  }

  async process(job: Job): Promise<void> {
    if (job.name !== JOBS.RECONCILE_PAYMENTS) return;

    const cutoff = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago
    const staleIntents = await this.db.paymentIntent.findMany({
      where: { status: "PROCESSING", createdAt: { lt: cutoff } },
    });

    if (staleIntents.length === 0) return;

    this.logger.warn(`Reconciliation: found ${staleIntents.length} stale PROCESSING intents`);

    let fixed = 0;
    for (const intent of staleIntents) {
      // Mark stale PROCESSING as FAILED — provider inquiry would go here
      // with real credentials. Without live provider access we default to FAILED
      // to prevent permanent stuck state.
      await this.db.paymentIntent.update({
        where: { id: intent.id },
        data: { status: "FAILED" },
      });
      fixed++;
    }

    if (fixed > 5) {
      // Alert threshold — in production this would trigger a Sentry alert
      this.logger.error(
        `RECONCILIATION ALERT: fixed ${fixed} stuck payments in one run — investigate provider health`
      );
    }

    this.logger.log(`Reconciliation complete: ${fixed} intents resolved`);
  }
}

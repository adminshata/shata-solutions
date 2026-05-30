import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { QUEUES, JOBS } from "./queue.constants";

@Injectable()
export class QueueSchedulerService implements OnModuleInit {
  private readonly logger = new Logger(QueueSchedulerService.name);

  constructor(
    @InjectQueue(QUEUES.PAYMENT_RECONCILIATION)
    private readonly reconciliationQueue: Queue,
    @InjectQueue(QUEUES.ANALYTICS_COMPUTE)
    private readonly analyticsQueue: Queue,
    @InjectQueue(QUEUES.SESSION_CLEANUP)
    private readonly sessionQueue: Queue,
    @InjectQueue(QUEUES.Z_REPORT_GENERATE)
    private readonly zReportQueue: Queue,
  ) {}

  async onModuleInit() {
    // Remove old repeatable jobs before re-registering (prevents duplicates on restart)
    await this.clearRepeatableJobs();

    await this.reconciliationQueue.add(
      JOBS.RECONCILE_PAYMENTS,
      {},
      { repeat: { pattern: "*/15 * * * *" } } // every 15 min
    );

    await this.analyticsQueue.add(
      JOBS.COMPUTE_DAILY_STATS,
      {},
      { repeat: { pattern: "0 2 * * *" } } // 2am daily
    );

    await this.sessionQueue.add(
      JOBS.CLEANUP_SESSIONS,
      {},
      { repeat: { pattern: "0 * * * *" } } // hourly
    );

    await this.zReportQueue.add(
      JOBS.GENERATE_Z_REPORT,
      {},
      { repeat: { pattern: "30 23 * * *" } } // 11:30pm daily
    );

    this.logger.log("Queue schedules registered");
  }

  private async clearRepeatableJobs() {
    const queues = [
      this.reconciliationQueue,
      this.analyticsQueue,
      this.sessionQueue,
      this.zReportQueue,
    ];
    for (const queue of queues) {
      const repeatables = await queue.getRepeatableJobs();
      for (const job of repeatables) {
        await queue.removeRepeatableByKey(job.key);
      }
    }
  }
}

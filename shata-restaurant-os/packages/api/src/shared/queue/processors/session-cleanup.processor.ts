import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { DatabaseService } from "../../database/database.service";
import { QUEUES, JOBS } from "../queue.constants";

@Processor(QUEUES.SESSION_CLEANUP)
export class SessionCleanupProcessor extends WorkerHost {
  private readonly logger = new Logger(SessionCleanupProcessor.name);

  constructor(private readonly db: DatabaseService) {
    super();
  }

  async process(job: Job): Promise<void> {
    if (job.name !== JOBS.CLEANUP_SESSIONS) return;

    // Sessions open more than 4 hours with no activity are abandoned
    const cutoff = new Date(Date.now() - 4 * 60 * 60 * 1000);

    const result = await this.db.session.updateMany({
      where: { status: "ACTIVE", createdAt: { lt: cutoff } },
      data: { status: "ABANDONED", closedAt: new Date() },
    });

    if (result.count > 0) {
      this.logger.log(`Session cleanup: marked ${result.count} sessions as ABANDONED`);
    }
  }
}

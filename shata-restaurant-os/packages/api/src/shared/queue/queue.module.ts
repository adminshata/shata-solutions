import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { QUEUES } from "./queue.constants";
import { PaymentReconciliationProcessor } from "./processors/payment-reconciliation.processor";
import { NotificationSendProcessor } from "./processors/notification-send.processor";
import { AnalyticsComputeProcessor } from "./processors/analytics-compute.processor";
import { SessionCleanupProcessor } from "./processors/session-cleanup.processor";
import { ZReportProcessor } from "./processors/z-report.processor";
import { RefundProcessProcessor } from "./processors/refund-process.processor";
import { InstapayExpiryProcessor } from "./processors/instapay-expiry.processor";
import { QueueSchedulerService } from "./queue-scheduler.service";
import { DatabaseModule } from "../database/database.module";

const queues = Object.values(QUEUES).map((name) =>
  BullModule.registerQueue({ name })
);

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        connection: {
          url: config.get<string>("app.redisUrl") ?? "redis://localhost:6379",
          enableOfflineQueue: false,
          lazyConnect: true,
          retryStrategy: () => null,
        },
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 500,
          attempts: 3,
          backoff: { type: "exponential", delay: 5000 },
        },
      }),
      inject: [ConfigService],
    }),
    ...queues,
  ],
  providers: [
    PaymentReconciliationProcessor,
    NotificationSendProcessor,
    AnalyticsComputeProcessor,
    SessionCleanupProcessor,
    ZReportProcessor,
    RefundProcessProcessor,
    InstapayExpiryProcessor,
    QueueSchedulerService,
  ],
  exports: [BullModule],
})
export class QueueModule {}

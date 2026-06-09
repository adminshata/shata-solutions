import { Module } from "@nestjs/common";
import { BullModule, getQueueToken } from "@nestjs/bullmq";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { ReviewPromptProcessor } from "./review-prompt.processor";
import { AuthModule } from "../auth/auth.module";
import { NotificationsModule } from "../notifications/notifications.module";

const isQueuesDisabled = process.env["DISABLE_QUEUES"] === "true";

@Module({
  imports: [
    AuthModule,
    NotificationsModule,
    ...(isQueuesDisabled ? [] : [BullModule.registerQueue({ name: "review-prompt" })]),
  ],
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    ...(isQueuesDisabled
      ? [{ provide: getQueueToken("review-prompt"), useValue: { add: async () => {} } }]
      : [ReviewPromptProcessor]),
  ],
})
export class ReviewsModule {}

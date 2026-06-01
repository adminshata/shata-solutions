import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { ReviewPromptProcessor } from "./review-prompt.processor";
import { AuthModule } from "../auth/auth.module";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [
    AuthModule,
    NotificationsModule,
    BullModule.registerQueue({ name: "review-prompt" }),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewPromptProcessor],
})
export class ReviewsModule {}

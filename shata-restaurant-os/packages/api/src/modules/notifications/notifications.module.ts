import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { OneSignalClient } from "./onesignal.client";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [NotificationsController],
  providers: [OneSignalClient, NotificationsService],
  exports: [OneSignalClient],
})
export class NotificationsModule {}

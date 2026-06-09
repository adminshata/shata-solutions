import { Module } from "@nestjs/common";
import { InstapayController } from "./instapay.controller";
import { InstapayService } from "./instapay.service";
import { DatabaseModule } from "../../shared/database/database.module";
import { QueueModule } from "../../shared/queue/queue.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [DatabaseModule, QueueModule.register(), AuthModule],
  controllers: [InstapayController],
  providers: [InstapayService],
  exports: [InstapayService],
})
export class InstapayModule {}

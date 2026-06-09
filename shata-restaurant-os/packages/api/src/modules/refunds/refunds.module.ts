import { Module } from "@nestjs/common";
import { RefundsController } from "./refunds.controller";
import { RefundsService } from "./refunds.service";
import { AuthModule } from "../auth/auth.module";
import { QueueModule } from "../../shared/queue/queue.module";

@Module({
  imports: [AuthModule, QueueModule.register()],
  controllers: [RefundsController],
  providers: [RefundsService],
  exports: [RefundsService],
})
export class RefundsModule {}

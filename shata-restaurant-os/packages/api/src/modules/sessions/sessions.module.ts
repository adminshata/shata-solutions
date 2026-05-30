import { Module } from "@nestjs/common";
import { SessionsController } from "./sessions.controller";
import { SessionsService } from "./sessions.service";
import { AuthModule } from "../auth/auth.module";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [AuthModule, OrdersModule],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}

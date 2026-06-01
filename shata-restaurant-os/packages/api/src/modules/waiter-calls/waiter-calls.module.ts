import { Module } from "@nestjs/common";
import { WaiterCallsController } from "./waiter-calls.controller";
import { WaiterCallsService } from "./waiter-calls.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [WaiterCallsController],
  providers: [WaiterCallsService],
})
export class WaiterCallsModule {}

import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { AuthModule } from "../auth/auth.module";
import { MenuModule } from "../menu/menu.module";

@Module({
  imports: [AuthModule, MenuModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}

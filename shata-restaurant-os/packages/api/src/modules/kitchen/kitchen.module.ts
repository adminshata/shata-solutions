import { Module } from "@nestjs/common";
import { KitchenController } from "./kitchen.controller";
import { KitchenService } from "./kitchen.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [KitchenController],
  providers: [KitchenService],
  exports: [KitchenService],
})
export class KitchenModule {}

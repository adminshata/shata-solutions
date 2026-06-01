import { Module } from "@nestjs/common";
import { UpsellController } from "./upsell.controller";
import { UpsellService } from "./upsell.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [UpsellController],
  providers: [UpsellService],
})
export class UpsellModule {}

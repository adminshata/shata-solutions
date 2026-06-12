import { Global, Module } from "@nestjs/common";
import { KitchenGateway } from "./kitchen.gateway";
import { DashboardGateway } from "./dashboard.gateway";
import { AuthModule } from "../../modules/auth/auth.module";

@Global()
@Module({
  imports: [AuthModule],
  providers: [KitchenGateway, DashboardGateway],
  exports: [KitchenGateway, DashboardGateway],
})
export class RealtimeModule {}

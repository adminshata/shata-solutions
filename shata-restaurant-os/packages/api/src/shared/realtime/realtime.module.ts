import { Global, Module } from "@nestjs/common";
import { KitchenGateway } from "./kitchen.gateway";
import { DashboardGateway } from "./dashboard.gateway";

@Global()
@Module({
  providers: [KitchenGateway, DashboardGateway],
  exports: [KitchenGateway, DashboardGateway],
})
export class RealtimeModule {}

import { Module } from "@nestjs/common";
import { CustomerProfileController } from "./customer-profile.controller";
import { CustomerProfileService } from "./customer-profile.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService],
  exports: [CustomerProfileService],
})
export class CustomerProfileModule {}

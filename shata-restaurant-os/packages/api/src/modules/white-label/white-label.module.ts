import { Module } from "@nestjs/common";
import { WhiteLabelController } from "./white-label.controller";
import { WhiteLabelService } from "./white-label.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [WhiteLabelController],
  providers: [WhiteLabelService],
  exports: [WhiteLabelService],
})
export class WhiteLabelModule {}

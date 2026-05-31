import { Module } from "@nestjs/common";
import { PrinterController } from "./printer.controller";
import { PrinterService } from "./printer.service";
import { DatabaseModule } from "../../shared/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [PrinterController],
  providers: [PrinterService],
  exports: [PrinterService],
})
export class PrinterModule {}

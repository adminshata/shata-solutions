import { Controller, Get, Post, Patch, Query, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrinterService } from "./printer.service";

@ApiTags("Printer")
@Controller("dashboard/printer")
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Get("status")
  @ApiOperation({ summary: "Get printer config and connection status" })
  async getStatus(@Query("restaurantId") restaurantId: string) {
    const config = await this.printerService.getConfig(restaurantId);
    return { config, configured: !!config?.isActive };
  }

  @Post("test")
  @ApiOperation({ summary: "Send a test print job" })
  testPrint(@Query("restaurantId") restaurantId: string) {
    return this.printerService.testPrint(restaurantId);
  }

  @Patch("config")
  @ApiOperation({ summary: "Update printer configuration" })
  updateConfig(
    @Query("restaurantId") restaurantId: string,
    @Body() body: {
      type?: string;
      ipAddress?: string;
      port?: number;
      usbPath?: string;
      isActive?: boolean;
      printOnOrder?: boolean;
      printReceipt?: boolean;
    }
  ) {
    return this.printerService.upsertConfig(restaurantId, body);
  }
}

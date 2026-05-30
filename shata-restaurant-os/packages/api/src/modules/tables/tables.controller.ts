import { Controller, Get, Post, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TablesService } from "./tables.service";

@ApiTags("Tables")
@Controller("dashboard/tables")
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  list(@Query("restaurantId") restaurantId: string) {
    return this.tablesService.listTables(restaurantId);
  }

  @Post(":id/regenerate-qr")
  async regenerateQr(
    @Param("id") tableId: string,
    @Query("restaurantId") restaurantId: string
  ) {
    const token = await this.tablesService.generateQrToken(tableId, restaurantId);
    const baseUrl = process.env["CUSTOMER_APP_URL"] ?? "";
    return { token, qrUrl: `${baseUrl}/t/${token}` };
  }
}

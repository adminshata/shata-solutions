import { Controller, Get, Post, Patch, Param, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { NfcService } from "./nfc.service";
import type { NfcStatus } from "@shata/database";

@ApiTags("NFC")
@Controller("dashboard/nfc")
export class NfcController {
  constructor(private readonly nfcService: NfcService) {}

  @Get()
  @ApiOperation({ summary: "List NFC tags" })
  listTags(
    @Query("restaurantId") restaurantId: string,
    @Query("status") status?: NfcStatus
  ) {
    return this.nfcService.listTags(restaurantId, status);
  }

  @Get("stats")
  @ApiOperation({ summary: "NFC tag stats summary" })
  getStats(@Query("restaurantId") restaurantId: string) {
    return this.nfcService.getStats(restaurantId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get single NFC tag" })
  getTag(
    @Query("restaurantId") restaurantId: string,
    @Param("id") id: string
  ) {
    return this.nfcService.getTag(restaurantId, id);
  }

  @Post("register")
  @ApiOperation({ summary: "Register a new NFC tag by serial number" })
  registerTag(
    @Query("restaurantId") restaurantId: string,
    @Body() body: { serialNumber: string; notes?: string }
  ) {
    return this.nfcService.registerTag(restaurantId, body.serialNumber, body.notes);
  }

  @Patch(":id/assign")
  @ApiOperation({ summary: "Assign NFC tag to a table" })
  assignToTable(
    @Query("restaurantId") restaurantId: string,
    @Param("id") id: string,
    @Body() body: { tableId: string }
  ) {
    return this.nfcService.assignToTable(restaurantId, id, body.tableId);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Update NFC tag status (DAMAGED, LOST, UNASSIGNED)" })
  updateStatus(
    @Query("restaurantId") restaurantId: string,
    @Param("id") id: string,
    @Body() body: { status: NfcStatus }
  ) {
    return this.nfcService.updateStatus(restaurantId, id, body.status);
  }
}

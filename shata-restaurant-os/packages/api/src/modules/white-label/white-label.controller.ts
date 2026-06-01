import { Controller, Get, Patch, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { WhiteLabelService, WhiteLabelDto } from "./white-label.service";

@ApiTags("White Label")
@ApiBearerAuth()
@Controller("dashboard/settings/white-label")
export class WhiteLabelController {
  constructor(private readonly svc: WhiteLabelService) {}

  @Get()
  @ApiOperation({ summary: "Get white-label config for org (ENTERPRISE only)" })
  getConfig(@Query("orgId") orgId: string) {
    return this.svc.getConfig(orgId);
  }

  @Patch()
  @ApiOperation({ summary: "Upsert white-label config" })
  upsert(@Query("orgId") orgId: string, @Body() dto: WhiteLabelDto) {
    return this.svc.upsert(orgId, dto);
  }
}

import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AuditService } from "../../shared/audit/audit.service";

@ApiTags("Audit")
@ApiBearerAuth()
@Controller("dashboard/settings/audit-log")
export class AuditController {
  constructor(private readonly auditSvc: AuditService) {}

  @Get()
  @ApiOperation({ summary: "Get audit log for this restaurant" })
  getLogs(
    @Query("restaurantId") restaurantId: string,
    @Query("action") action?: string,
    @Query("from") from?: string,
    @Query("to") to?: string,
    @Query("page") page = "1",
  ) {
    return this.auditSvc.getLogs(restaurantId, { action, from, to, page: parseInt(page) });
  }
}

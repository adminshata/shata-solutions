import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminService } from "./admin.service";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("merchants")
  @ApiOperation({ summary: "List all orgs" })
  listMerchants() { return this.adminService.listMerchants(); }

  @Get("org/overview")
  @ApiOperation({ summary: "Multi-branch overview for an org" })
  getOrgOverview(@Query("orgId") orgId: string) {
    return this.adminService.getOrgOverview(orgId);
  }
}

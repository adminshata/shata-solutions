import { Controller, Get, Post, Query, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StaffService } from "./staff.service";

@ApiTags("Staff")
@Controller("dashboard/staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @Get() list(@Query("restaurantId") r: string) { return this.staffService.list(r); }
  @Post() invite(@Body() b: { restaurantId: string; clerkUserId: string; name: string; role: string; email?: string }) {
    return this.staffService.invite(b.restaurantId, b);
  }
}

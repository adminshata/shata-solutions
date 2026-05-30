import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { MenuService } from "./menu.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Menu")
@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Public()
  @Get("sessions/:token/menu")
  @ApiOperation({ summary: "Get full menu for a session (cached)" })
  async getMenuBySession(@Param("token") _token: string) {
    // In real impl, decode token → restaurantId
    // Then call menuService.getMenu(restaurantId)
    return { message: "Menu endpoint — decode session token to get restaurantId" };
  }

  @Get("dashboard/menu")
  @ApiOperation({ summary: "Get full menu tree for dashboard management" })
  getDashboardMenu(@Param("restaurantId") restaurantId: string) {
    return this.menuService.getMenu(restaurantId);
  }
}

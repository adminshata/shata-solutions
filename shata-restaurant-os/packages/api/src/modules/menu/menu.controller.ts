import { Controller, Get, Post, Param, Query, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { MenuService } from "./menu.service";
import type { ParsedMenuItem } from "./menu.service";
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
    return { message: "Menu endpoint — decode session token to get restaurantId" };
  }

  @Get("dashboard/menu")
  @ApiOperation({ summary: "Get full menu tree for dashboard management" })
  getDashboardMenu(@Query("restaurantId") restaurantId: string) {
    return this.menuService.getMenu(restaurantId);
  }

  @Post("dashboard/menu/parse-image")
  @ApiOperation({ summary: "Parse menu items from an uploaded image using Claude vision" })
  parseMenuImage(
    @Body() body: { image: string; mimeType: "image/jpeg" | "image/png" | "image/webp" | "image/gif" }
  ) {
    return this.menuService.parseMenuImage(body.image, body.mimeType);
  }

  @Post("dashboard/menu/import")
  @ApiOperation({ summary: "Bulk import parsed menu items into a category" })
  importMenuItems(
    @Query("restaurantId") restaurantId: string,
    @Body() body: { categoryId: string; items: ParsedMenuItem[] }
  ) {
    return this.menuService.importMenuItems(restaurantId, body.categoryId, body.items);
  }
}

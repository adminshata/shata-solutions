import { Controller, Get, Post, Param, Query, Body, Res, VERSION_NEUTRAL } from "@nestjs/common";
import type { Response } from "express";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { MenuService } from "./menu.service";
import type { ParsedMenuItem } from "./menu.service";
import { SessionTokenService } from "../auth/session-token.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Menu")
@Controller({ version: VERSION_NEUTRAL })
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly sessionTokenSvc: SessionTokenService,
  ) {}

  @Public()
  @Get("sessions/:token/menu")
  @ApiOperation({ summary: "Get full menu for a session (Redis-cached, 5-min CDN TTL)" })
  async getMenuBySession(
    @Param("token") token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
    const { restaurantId } = await this.sessionTokenSvc.verify(token);
    return this.menuService.getMenu(restaurantId);
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

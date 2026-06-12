import { Controller, Get, Patch, Param, Body, Query, BadRequestException, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { KitchenService } from "./kitchen.service";
import { Public } from "../auth/clerk.guard";
import { SessionTokenService } from "../auth/session-token.service";

@ApiTags("Kitchen")
@Controller({ path: "kitchen", version: VERSION_NEUTRAL })
export class KitchenController {
  constructor(
    private readonly kitchenService: KitchenService,
    private readonly sessionTokenSvc: SessionTokenService
  ) {}

  @Public()
  @Get("tickets")
  @ApiOperation({ summary: "Get active kitchen tickets for a device (kitchen display hydrate)" })
  async getTicketsForDevice(
    @Query("deviceToken") deviceToken: string,
    @Query("station") station?: string
  ) {
    const { restaurantId } = await this.sessionTokenSvc.verifyKitchenToken(deviceToken);
    return this.kitchenService.getActiveTickets(restaurantId, station);
  }

  @Get("tickets/active")
  @ApiOperation({ summary: "Get active kitchen tickets" })
  getActiveTickets(
    @Query("restaurantId") restaurantId: string,
    @Query("station") station?: string
  ) {
    return this.kitchenService.getActiveTickets(restaurantId, station);
  }

  @Public()
  @Patch("tickets/:id")
  @ApiOperation({ summary: "Update ticket status (BUMP)" })
  async updateTicket(
    @Param("id") id: string,
    @Body() body: { status: string; deviceToken?: string; restaurantId?: string }
  ) {
    const restaurantId = body.deviceToken
      ? (await this.sessionTokenSvc.verifyKitchenToken(body.deviceToken)).restaurantId
      : body.restaurantId;

    if (!restaurantId) {
      throw new BadRequestException("deviceToken or restaurantId is required");
    }

    return this.kitchenService.updateTicket(restaurantId, id, body.status);
  }
}

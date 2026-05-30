import { Controller, Get, Patch, Param, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { KitchenService } from "./kitchen.service";

@ApiTags("Kitchen")
@Controller("kitchen")
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Get("tickets/active")
  @ApiOperation({ summary: "Get active kitchen tickets" })
  getActiveTickets(
    @Query("restaurantId") restaurantId: string,
    @Query("station") station?: string
  ) {
    return this.kitchenService.getActiveTickets(restaurantId, station);
  }

  @Patch("tickets/:id")
  @ApiOperation({ summary: "Update ticket status (BUMP)" })
  updateTicket(
    @Param("id") id: string,
    @Body() body: { status: string; restaurantId: string }
  ) {
    return this.kitchenService.updateTicket(body.restaurantId, id, body.status);
  }
}

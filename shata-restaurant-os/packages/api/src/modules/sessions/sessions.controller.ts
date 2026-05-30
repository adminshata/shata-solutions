import {
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { SessionsService } from "./sessions.service";
import { OrdersService } from "../orders/orders.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Sessions")
@Controller("sessions")
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly ordersService: OrdersService
  ) {}

  @Public()
  @Get(":token")
  @ApiOperation({ summary: "Load table session context (public)" })
  getContext(@Param("token") token: string) {
    return this.sessionsService.getContext(token);
  }

  @Public()
  @Get(":token/last-order")
  @ApiOperation({ summary: "Get the last completed order for this table (for reorder banner)" })
  getLastOrder(@Param("token") token: string) {
    return this.sessionsService.getLastOrder(token);
  }

  @Public()
  @Post(":token/reorder/:orderId")
  @ApiOperation({ summary: "Re-place a previous order with current prices" })
  async reorder(
    @Param("token") token: string,
    @Param("orderId") orderId: string
  ) {
    const { sessionId, restaurantId } = await this.sessionsService.getActiveSessionForTable(token);
    if (!sessionId) throw new NotFoundException("No active session at this table");
    return this.ordersService.reorderFrom(restaurantId, sessionId, orderId);
  }
}

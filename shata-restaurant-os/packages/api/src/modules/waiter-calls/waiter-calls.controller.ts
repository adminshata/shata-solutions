import { Controller, Post, Patch, Get, Param, Body, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { WaiterCallsService, CallType } from "./waiter-calls.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Waiter Calls")
@Controller({ version: VERSION_NEUTRAL })
export class WaiterCallsController {
  constructor(private readonly svc: WaiterCallsService) {}

  @Public()
  @Post("sessions/:token/waiter-call")
  @ApiOperation({ summary: "Customer: ring the waiter (type: ASSISTANCE|CHECK_PLEASE|WATER|MORE_NAPKINS)" })
  createCall(@Param("token") token: string, @Body() body: { type: CallType }) {
    return this.svc.createCall(token, body.type ?? "ASSISTANCE");
  }

  @ApiBearerAuth()
  @Get("dashboard/waiter-calls/active")
  @ApiOperation({ summary: "Get all pending + acknowledged calls for a restaurant" })
  getActive(@Query("restaurantId") restaurantId: string) {
    return this.svc.getActiveCalls(restaurantId);
  }

  @ApiBearerAuth()
  @Get("dashboard/waiter-calls")
  @ApiOperation({ summary: "Waiter call history with avg response time" })
  getHistory(@Query("restaurantId") restaurantId: string, @Query("page") page = "1") {
    return this.svc.getHistory(restaurantId, parseInt(page));
  }

  @ApiBearerAuth()
  @Patch("dashboard/waiter-calls/:id/acknowledge")
  @ApiOperation({ summary: "Acknowledge a waiter call" })
  acknowledge(@Param("id") id: string, @Query("staffId") staffId: string) {
    return this.svc.acknowledge(id, staffId ?? "unknown");
  }

  @ApiBearerAuth()
  @Patch("dashboard/waiter-calls/:id/resolve")
  @ApiOperation({ summary: "Mark a waiter call as resolved" })
  resolve(@Param("id") id: string, @Query("staffId") staffId: string) {
    return this.svc.resolve(id, staffId ?? "unknown");
  }
}

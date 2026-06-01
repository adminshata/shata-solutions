import { Controller, Get, Post, Delete, Body, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CustomerProfileService, UpsertProfileDto, SaveOrderDto } from "./customer-profile.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Customer Profile")
@Controller("customer")
export class CustomerProfileController {
  constructor(private readonly svc: CustomerProfileService) {}

  @Public()
  @Post("profile")
  @ApiOperation({ summary: "Create or update customer profile" })
  upsertProfile(@Body() dto: UpsertProfileDto) {
    return this.svc.upsertProfile(dto);
  }

  @Public()
  @Get("profile")
  @ApiOperation({ summary: "Get customer profile + loyalty balances" })
  getProfile(@Query("customerId") customerId: string) {
    return this.svc.getProfile(customerId);
  }

  @Public()
  @Get("orders")
  @ApiOperation({ summary: "Customer order history across all restaurants" })
  getOrders(@Query("customerId") customerId: string, @Query("page") page = "1") {
    return this.svc.getOrderHistory(customerId, parseInt(page));
  }

  @Public()
  @Post("saved-orders")
  @ApiOperation({ summary: "Save current cart as named order" })
  saveOrder(@Body() dto: SaveOrderDto) {
    return this.svc.saveOrder(dto);
  }

  @Public()
  @Get("saved-orders")
  @ApiOperation({ summary: "Get saved orders for quick reorder" })
  getSavedOrders(@Query("customerId") customerId: string, @Query("restaurantId") restaurantId?: string) {
    return this.svc.getSavedOrders(customerId, restaurantId);
  }

  @Public()
  @Delete("saved-orders/:id")
  @ApiOperation({ summary: "Delete a saved order" })
  deleteSavedOrder(@Param("id") id: string, @Query("customerId") customerId: string) {
    return this.svc.deleteSavedOrder(id, customerId);
  }
}

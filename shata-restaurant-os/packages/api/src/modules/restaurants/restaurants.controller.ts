import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { RestaurantsService } from "./restaurants.service";

@ApiTags("Restaurants")
@Controller("dashboard/restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new restaurant" })
  create(@Body() body: Parameters<RestaurantsService["create"]>[0]) {
    return this.restaurantsService.create(body);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get restaurant by id" })
  findById(@Param("id") id: string) {
    return this.restaurantsService.findById(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update restaurant settings" })
  update(@Param("id") id: string, @Body() body: Parameters<RestaurantsService["update"]>[1]) {
    return this.restaurantsService.update(id, body);
  }
}

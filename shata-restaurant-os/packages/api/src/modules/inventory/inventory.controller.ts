import { Controller, Get, Post, Patch, Body, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { InventoryService, UpsertIngredientDto } from "./inventory.service";

@ApiTags("Inventory")
@ApiBearerAuth()
@Controller("dashboard/inventory")
export class InventoryController {
  constructor(private readonly svc: InventoryService) {}

  @Get()
  @ApiOperation({ summary: "List all ingredients with stock status" })
  getAll(@Query("restaurantId") restaurantId: string) {
    return this.svc.getAll(restaurantId);
  }

  @Get("stats")
  @ApiOperation({ summary: "Stock overview: total, low, out-of-stock counts" })
  getStats(@Query("restaurantId") restaurantId: string) {
    return this.svc.getStats(restaurantId);
  }

  @Post()
  @ApiOperation({ summary: "Create a new ingredient" })
  create(@Query("restaurantId") restaurantId: string, @Body() dto: UpsertIngredientDto) {
    return this.svc.create(restaurantId, dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update ingredient details" })
  update(@Param("id") id: string, @Body() dto: Partial<UpsertIngredientDto>) {
    return this.svc.update(id, dto);
  }

  @Post(":id/restock")
  @ApiOperation({ summary: "Add stock quantity (delivery arrived)" })
  restock(@Param("id") id: string, @Body() body: { quantity: number }) {
    return this.svc.restock(id, body.quantity);
  }

  @Post("products/:productId/ingredients")
  @ApiOperation({ summary: "Map product to ingredients with quantities per serving" })
  setProductIngredients(
    @Param("productId") productId: string,
    @Body() body: { ingredients: Array<{ ingredientId: string; quantity: number }> }
  ) {
    return this.svc.setProductIngredients(productId, body.ingredients);
  }

  @Get("products/:productId/ingredients")
  @ApiOperation({ summary: "Get ingredient recipe for a product" })
  getProductIngredients(@Param("productId") productId: string) {
    return this.svc.getProductIngredients(productId);
  }
}

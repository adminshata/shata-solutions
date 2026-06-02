import { Controller, Post, Get, Patch, Body, Param, Query, Headers } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { PosService, PosConfigDto } from "./pos.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("POS Integration")
@Controller()
export class PosController {
  constructor(private readonly svc: PosService) {}

  // ── Inbound webhook (POS → Shata) ────────────────────────────────────────

  @Public()
  @Post("pos/webhook/:restaurantId")
  @ApiOperation({ summary: "Inbound POS webhook — accepts any JSON order and routes to kitchen" })
  handleInbound(
    @Param("restaurantId") restaurantId: string,
    @Headers("x-pos-secret") secret: string,
    @Body() dto: { externalOrderId?: string; tableIdentifier: string; items: Array<{ name: string; quantity: number; price: number }>; customerName?: string; notes?: string }
  ) {
    return this.svc.handleInboundWebhook(restaurantId, secret ?? "", dto);
  }

  // ── Dashboard settings ───────────────────────────────────────────────────

  @ApiBearerAuth()
  @Get("dashboard/settings/pos-integration")
  @ApiOperation({ summary: "Get POS integration config" })
  getIntegration(@Query("restaurantId") restaurantId: string) {
    return this.svc.getIntegration(restaurantId);
  }

  @ApiBearerAuth()
  @Patch("dashboard/settings/pos-integration")
  @ApiOperation({ summary: "Create or update POS integration config" })
  upsertIntegration(@Query("restaurantId") restaurantId: string, @Body() dto: PosConfigDto) {
    return this.svc.upsertIntegration(restaurantId, dto);
  }

  @ApiBearerAuth()
  @Get("dashboard/settings/pos-integration/webhook-url")
  @ApiOperation({ summary: "Get the inbound webhook URL to paste into your POS" })
  getWebhookUrl(@Query("restaurantId") restaurantId: string) {
    return this.svc.getWebhookUrl(restaurantId);
  }

  // ── Product mapping ──────────────────────────────────────────────────────

  @ApiBearerAuth()
  @Get("dashboard/pos/unmapped")
  @ApiOperation({ summary: "Get unmapped, mapped, and ignored POS items" })
  getUnmapped(@Query("restaurantId") restaurantId: string) {
    return this.svc.getUnmappedItems(restaurantId);
  }

  @ApiBearerAuth()
  @Patch("dashboard/pos/map/:id")
  @ApiOperation({ summary: "Map a POS SKU to a Shata product" })
  mapProduct(@Param("id") id: string, @Body() body: { productId: string }) {
    return this.svc.mapProduct(id, body.productId);
  }

  @ApiBearerAuth()
  @Patch("dashboard/pos/ignore/:id")
  @ApiOperation({ summary: "Mark a POS item as ignored (delivery fee, packaging, etc.)" })
  ignoreItem(@Param("id") id: string) {
    return this.svc.ignoreItem(id);
  }

  @ApiBearerAuth()
  @Patch("dashboard/pos/unmap/:id")
  @ApiOperation({ summary: "Remove product mapping from a POS item" })
  unmapItem(@Param("id") id: string) {
    return this.svc.unmapItem(id);
  }
}

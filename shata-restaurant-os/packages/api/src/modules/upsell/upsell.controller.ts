import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { UpsellService } from "./upsell.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Upsell")
@Controller("sessions")
export class UpsellController {
  constructor(private readonly svc: UpsellService) {}

  @Public()
  @Get(":token/upsell/:productId")
  @ApiOperation({ summary: "Collaborative filtering: what customers also ordered with this product" })
  getUpsells(@Param("token") token: string, @Param("productId") productId: string) {
    return this.svc.getUpsells(token, productId);
  }
}

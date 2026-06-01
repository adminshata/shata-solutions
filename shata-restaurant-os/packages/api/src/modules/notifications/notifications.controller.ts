import { Controller, Post, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { IsString, IsOptional, IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { OneSignalClient } from "./onesignal.client";

class TestNotificationDto {
  @ApiProperty({ example: "CONFIRMED", required: false })
  @IsOptional()
  @IsIn(["CONFIRMED", "PREPARING", "READY", "PAYMENT"])
  scenario?: "CONFIRMED" | "PREPARING" | "READY" | "PAYMENT";

  @ApiProperty({ example: "order-id-abc123", required: false })
  @IsOptional()
  @IsString()
  orderId?: string;
}

@ApiTags("Notifications")
@ApiBearerAuth()
@Controller("dashboard/notifications")
export class NotificationsController {
  constructor(private readonly onesignal: OneSignalClient) {}

  @Post("test")
  @ApiOperation({ summary: "Send a test push to all staff for this restaurant" })
  async sendTest(
    @Query("restaurantId") restaurantId: string,
    @Body() dto: TestNotificationDto,
  ) {
    const scenario = dto.scenario ?? "PAYMENT";
    const orderId = dto.orderId ?? "TEST-001";

    const messages: Record<string, { heading: { en: string; ar: string }; content: { en: string; ar: string } }> = {
      PAYMENT: {
        heading: { en: "Payment confirmed", ar: "تم الدفع" },
        content: { en: `Payment received for order #${orderId}. Send to kitchen.`, ar: `تم استلام الدفع للطلب #${orderId}.` },
      },
      CONFIRMED: {
        heading: { en: "Order confirmed", ar: "تم تأكيد الطلب" },
        content: { en: `Order #${orderId} has been confirmed.`, ar: `تم تأكيد الطلب #${orderId}.` },
      },
      PREPARING: {
        heading: { en: "Order in prep", ar: "جاري التحضير" },
        content: { en: `Order #${orderId} is now being prepared.`, ar: `جاري تحضير الطلب #${orderId}.` },
      },
      READY: {
        heading: { en: "Order ready!", ar: "الطلب جاهز!" },
        content: { en: `Order #${orderId} is ready to serve.`, ar: `الطلب #${orderId} جاهز للتقديم.` },
      },
    };

    const msg = messages[scenario] ?? messages["PAYMENT"]!;

    await this.onesignal.send({
      headings: { en: msg.heading.en, ar: msg.heading.ar },
      contents: { en: msg.content.en, ar: msg.content.ar },
      restaurantId,
      data: { orderId, scenario, test: "true" },
    });

    return { sent: true, scenario, restaurantId };
  }
}

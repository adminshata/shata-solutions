import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { OneSignalClient } from "./onesignal.client";

interface OrderEvent {
  restaurantId: string;
  order: {
    id: string;
    status: string;
    customerId?: string | null;
  };
}

interface PaymentEvent {
  orderId: string;
  restaurantId: string;
}

const STATUS_LABEL: Record<string, { en: string; ar: string }> = {
  CONFIRMED:  { en: "confirmed",      ar: "تم تأكيد طلبك"      },
  PREPARING:  { en: "being prepared", ar: "جاري تحضير طلبك"    },
  COOKING:    { en: "being cooked",   ar: "يُطهى طلبك الآن"     },
  READY:      { en: "ready!",         ar: "طلبك جاهز!"          },
  SERVED:     { en: "on its way",     ar: "في الطريق إليك"      },
};

@Injectable()
export class NotificationsService {
  constructor(private readonly onesignal: OneSignalClient) {}

  // ── Staff notifications ──────────────────────────────────────────

  @OnEvent("order.created")
  async onOrderCreated(event: OrderEvent) {
    await this.onesignal.send({
      headings: { en: "New order received", ar: "طلب جديد" },
      contents: { en: `Order #${event.order.id.slice(-6).toUpperCase()} is waiting.` },
      restaurantId: event.restaurantId,
      data: { orderId: event.order.id, event: "order.created" },
    });
  }

  @OnEvent("payment.completed")
  async onPaymentCompleted(event: PaymentEvent) {
    await this.onesignal.send({
      headings: { en: "Payment confirmed", ar: "تم الدفع" },
      contents: {
        en: `Payment received for order #${event.orderId.slice(-6).toUpperCase()}. Send to kitchen.`,
        ar: `تم استلام الدفع للطلب #${event.orderId.slice(-6).toUpperCase()}.`,
      },
      restaurantId: event.restaurantId,
      data: { orderId: event.orderId, event: "payment.completed" },
    });
  }

  // ── Customer notifications ───────────────────────────────────────

  @OnEvent("order.status_changed")
  async onOrderStatusChanged(event: OrderEvent) {
    const label = STATUS_LABEL[event.order.status];
    if (!label || !event.order.customerId) return;

    await this.onesignal.send({
      headings: { en: "Order update", ar: "تحديث الطلب" },
      contents: {
        en: `Your order is ${label.en}`,
        ar: label.ar,
      },
      externalUserIds: [event.order.customerId],
      data: { orderId: event.order.id, status: event.order.status },
    });
  }

  @OnEvent("order.completed")
  async onOrderCompleted(event: OrderEvent) {
    if (!event.order.customerId) return;

    await this.onesignal.send({
      headings: { en: "Enjoy your meal!", ar: "بالهناء والشفاء!" },
      contents: {
        en: "Your order has been served. Thank you for dining with us.",
        ar: "تم تقديم طلبك. شكراً لك!",
      },
      externalUserIds: [event.order.customerId],
      data: { orderId: event.order.id, event: "order.completed" },
    });
  }
}

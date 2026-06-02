import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import { RedisService } from "../../shared/redis/redis.service";
import { SessionTokenService } from "../auth/session-token.service";
import type { SessionContextDto } from "@shata/types";
import { PaymentProvider, OrderStatus } from "@shata/types";

const SESSION_CONTEXT_TTL = 3600; // 1 hour

@Injectable()
export class SessionsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly redis: RedisService,
    private readonly sessionTokenSvc: SessionTokenService
  ) {}

  async getContext(token: string): Promise<SessionContextDto> {
    // Check cache first
    const cacheKey = `session-ctx:${token}`;
    const cached = await this.redis.getJson<SessionContextDto>(cacheKey);
    if (cached) return cached;

    // Verify token
    const { tableId, restaurantId } = await this.sessionTokenSvc.verify(token);

    const table = await this.db.table.findUnique({
      where: { id: tableId },
      include: {
        restaurant: {
          include: { org: { include: { whiteLabelConfig: true } } },
        },
      },
    });

    if (!table || table.restaurantId !== restaurantId) {
      throw new NotFoundException("Table not found");
    }

    const r = table.restaurant;
    const settings = r.settings as Record<string, unknown>;
    const wl = r.org.whiteLabelConfig?.isActive ? r.org.whiteLabelConfig : null;

    const ctx: SessionContextDto = {
      token,
      restaurantId: r.id,
      tableId: table.id,
      tableNumber: table.number,
      restaurantName: wl?.appName ?? r.name,
      currency: r.currency,
      locale: r.locale,
      timezone: r.timezone,
      taxRate: Number(r.taxRate),
      taxLabel: r.taxLabel,
      taxInclusive: r.taxInclusive,
      logo: wl?.logoUrl ?? (settings["logo"] as string | undefined),
      primaryColor: wl?.primaryColor ?? (settings["primaryColor"] as string | undefined),
      enabledPaymentProviders:
        (settings["enabledPaymentProviders"] as PaymentProvider[]) ?? [PaymentProvider.STRIPE],
      whiteLabelConfig: wl ? {
        appName: wl.appName,
        appNameAr: wl.appNameAr ?? undefined,
        logoUrl: wl.logoUrl ?? undefined,
        faviconUrl: wl.faviconUrl ?? undefined,
        primaryColor: wl.primaryColor,
        secondaryColor: wl.secondaryColor ?? undefined,
        hideShataLogo: wl.hideShataLogo,
      } : undefined,
    };

    await this.redis.setJson(cacheKey, ctx, SESSION_CONTEXT_TTL);
    return ctx;
  }

  async getLastOrder(token: string) {
    const { tableId, restaurantId } = await this.sessionTokenSvc.verify(token);

    const order = await this.db.order.findFirst({
      where: {
        restaurantId,
        session: { tableId },
        status: OrderStatus.SERVED,
      },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          select: {
            id: true,
            quantity: true,
            unitPrice: true,
            totalPrice: true,
            productId: true,
            product: { select: { name: true, isAvailable: true } },
          },
        },
      },
    });

    if (!order) return null;

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      total: Number(order.total),
      currency: order.currency,
      createdAt: order.createdAt,
      items: order.items.map((i) => ({
        productId: i.productId,
        name: i.product.name,
        quantity: i.quantity,
        unitPrice: Number(i.unitPrice),
        isAvailable: i.product.isAvailable,
      })),
    };
  }

  async getActiveSessionForTable(token: string) {
    const { tableId, restaurantId } = await this.sessionTokenSvc.verify(token);
    const session = await this.db.session.findFirst({
      where: { tableId, status: "ACTIVE" },
      orderBy: { openedAt: "desc" },
      select: { id: true },
    });
    return { sessionId: session?.id ?? null, restaurantId };
  }
}

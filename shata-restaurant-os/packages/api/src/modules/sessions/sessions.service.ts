import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import { RedisService } from "../../shared/redis/redis.service";
import { SessionTokenService } from "../auth/session-token.service";
import type { SessionContextDto } from "@shata/types";
import { PaymentProvider } from "@shata/types";

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
      include: { restaurant: true },
    });

    if (!table || table.restaurantId !== restaurantId) {
      throw new NotFoundException("Table not found");
    }

    const r = table.restaurant;
    const settings = r.settings as Record<string, unknown>;

    const ctx: SessionContextDto = {
      token,
      restaurantId: r.id,
      tableId: table.id,
      tableNumber: table.number,
      restaurantName: r.name,
      currency: r.currency,
      locale: r.locale,
      timezone: r.timezone,
      taxRate: Number(r.taxRate),
      taxLabel: r.taxLabel,
      taxInclusive: r.taxInclusive,
      logo: settings["logo"] as string | undefined,
      primaryColor: settings["primaryColor"] as string | undefined,
      enabledPaymentProviders:
        (settings["enabledPaymentProviders"] as PaymentProvider[]) ?? [PaymentProvider.STRIPE],
    };

    await this.redis.setJson(cacheKey, ctx, SESSION_CONTEXT_TTL);
    return ctx;
  }
}

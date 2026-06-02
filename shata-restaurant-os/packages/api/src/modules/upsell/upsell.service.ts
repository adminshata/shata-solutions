import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DatabaseService } from "../../shared/database/database.service";
import { RedisService } from "../../shared/redis/redis.service";
import { SessionTokenService } from "../auth/session-token.service";

const UPSELL_TTL = 3600; // 1 hour
const MIN_CONFIDENCE = 10; // minimum co-occurrences to surface
const MIN_ORDERS = 500;    // minimum orders before engine activates

export interface UpsellProduct {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  frequency: number;
}

@Injectable()
export class UpsellService {
  private readonly logger = new Logger(UpsellService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly redis: RedisService,
    private readonly sessionSvc: SessionTokenService,
  ) {}

  async getUpsells(token: string, productId: string): Promise<UpsellProduct[]> {
    const { restaurantId } = await this.sessionSvc.verify(token);
    const cacheKey = `upsell:${restaurantId}:${productId}`;
    const cached = await this.redis.getJson<UpsellProduct[]>(cacheKey);
    if (cached) return cached;
    return this.computeAndCache(restaurantId, productId);
  }

  async computeAndCache(restaurantId: string, productId: string): Promise<UpsellProduct[]> {
    const cacheKey = `upsell:${restaurantId}:${productId}`;
    const result = await this.computeCoOccurrences(restaurantId, productId);
    await this.redis.setJson(cacheKey, result, UPSELL_TTL);
    return result;
  }

  private async computeCoOccurrences(restaurantId: string, productId: string): Promise<UpsellProduct[]> {
    // Only run if restaurant has enough order history
    const orderCount = await this.db.order.count({ where: { restaurantId } });
    if (orderCount < MIN_ORDERS) return [];

    // Find orders that contain this product
    const orderItems = await this.db.orderItem.findMany({
      where: { productId, order: { restaurantId } },
      select: { orderId: true },
    });
    const orderIds = orderItems.map(i => i.orderId);
    if (orderIds.length === 0) return [];

    // Find co-occurring products in those orders
    const coItems = await this.db.orderItem.findMany({
      where: {
        orderId: { in: orderIds },
        productId: { not: productId },
        order: { restaurantId },
      },
      select: { productId: true, quantity: true },
    });

    const freq = new Map<string, number>();
    for (const item of coItems) {
      freq.set(item.productId, (freq.get(item.productId) ?? 0) + item.quantity);
    }

    const top = Array.from(freq.entries())
      .filter(([, count]) => count >= MIN_CONFIDENCE)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    if (top.length === 0) return [];

    const products = await this.db.product.findMany({
      where: { id: { in: top.map(([id]) => id) }, restaurantId, isAvailable: true },
      select: { id: true, name: true, price: true, imageUrl: true },
    });

    return products.map(p => ({
      productId: p.id,
      name: p.name,
      price: Number(p.price),
      imageUrl: p.imageUrl,
      frequency: freq.get(p.id) ?? 0,
    }));
  }

  // Nightly: pre-compute for all products in all restaurants with > 500 orders
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async precomputeAll() {
    this.logger.log("Starting nightly upsell pre-computation");
    const restaurants = await this.db.restaurant.findMany({ select: { id: true } });

    for (const r of restaurants) {
      const count = await this.db.order.count({ where: { restaurantId: r.id } });
      if (count < MIN_ORDERS) continue;

      const products = await this.db.product.findMany({ where: { restaurantId: r.id, isAvailable: true }, select: { id: true } });
      for (const p of products) {
        await this.computeAndCache(r.id, p.id).catch(err => this.logger.warn({ err, productId: p.id }, "Upsell compute failed"));
      }
      this.logger.log(`Upsell pre-computed for restaurant ${r.id} (${products.length} products)`);
    }
  }
}

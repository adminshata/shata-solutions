import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import { RedisService } from "../../shared/redis/redis.service";

const MENU_CACHE_TTL = 300; // 5 minutes

@Injectable()
export class MenuService {
  constructor(
    private readonly db: DatabaseService,
    private readonly redis: RedisService
  ) {}

  async getMenu(restaurantId: string) {
    const cacheKey = `menu:${restaurantId}`;
    const cached = await this.redis.getJson(cacheKey);
    if (cached) return cached;

    const categories = await this.db.category.findMany({
      where: { restaurantId, isAvailable: true },
      orderBy: { sortOrder: "asc" },
      include: {
        products: {
          where: { isAvailable: true },
          orderBy: { sortOrder: "asc" },
          include: {
            modifierGroups: {
              orderBy: { sortOrder: "asc" },
              include: {
                options: {
                  where: { isAvailable: true },
                  orderBy: { sortOrder: "asc" },
                },
              },
            },
          },
        },
      },
    });

    if (!categories) throw new NotFoundException("Menu not found");

    await this.redis.setJson(cacheKey, categories, MENU_CACHE_TTL);
    return categories;
  }

  async invalidateMenuCache(restaurantId: string) {
    await this.redis.del(`menu:${restaurantId}`);
  }
}

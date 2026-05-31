import { Injectable, NotFoundException } from "@nestjs/common";
import Anthropic from "@anthropic-ai/sdk";
import { ConfigService } from "@nestjs/config";
import { DatabaseService } from "../../shared/database/database.service";
import { RedisService } from "../../shared/redis/redis.service";

const MENU_CACHE_TTL = 300; // 5 minutes

export interface ParsedMenuItem {
  name: string;
  nameAr?: string;
  description?: string;
  price?: number;
  category?: string;
}

@Injectable()
export class MenuService {
  private readonly anthropic: Anthropic;

  constructor(
    private readonly db: DatabaseService,
    private readonly redis: RedisService,
    private readonly config: ConfigService
  ) {
    this.anthropic = new Anthropic({
      apiKey: this.config.get<string>("app.anthropic.apiKey") ?? "",
    });
  }

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

  async parseMenuImage(
    imageBase64: string,
    mimeType: "image/jpeg" | "image/png" | "image/webp" | "image/gif"
  ): Promise<ParsedMenuItem[]> {
    const response = await this.anthropic.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 2048,
      system: `You are a menu extraction assistant. Extract all menu items from the provided image.
Return ONLY a valid JSON array with no additional text, markdown, or explanation.
Each item must have: name (string), nameAr (string|null), description (string|null), price (number|null), category (string|null).
Numbers must be plain numbers (e.g. 9.99 not "$9.99"). If a field is not visible, use null.`,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mimeType, data: imageBase64 },
            },
            {
              type: "text",
              text: "Extract all menu items from this menu image as a JSON array.",
            },
          ],
        },
      ],
    });

    const text = response.content
      .filter((c) => c.type === "text")
      .map((c) => (c as { type: "text"; text: string }).text)
      .join("");

    try {
      // Extract JSON array from the response (model might wrap in code fences)
      const match = text.match(/\[[\s\S]*\]/);
      const parsed = JSON.parse(match ? match[0] : text) as ParsedMenuItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async importMenuItems(
    restaurantId: string,
    categoryId: string,
    items: ParsedMenuItem[]
  ) {
    const created = await Promise.all(
      items.map((item) =>
        this.db.product.create({
          data: {
            restaurantId,
            categoryId,
            name: item.name,
            nameAr: item.nameAr ?? null,
            description: item.description ?? null,
            price: item.price ?? 0,
            isAvailable: true,
            sortOrder: 0,
          },
          select: { id: true, name: true, price: true },
        })
      )
    );

    // Invalidate menu cache after bulk import
    await this.invalidateMenuCache(restaurantId);
    return created;
  }
}

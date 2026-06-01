import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DatabaseService } from "../../shared/database/database.service";
import { OneSignalClient } from "../notifications/onesignal.client";

interface OrderConfirmedPayload {
  restaurantId: string;
  order: { id: string; items: Array<{ productId: string; quantity: number }> };
}

export interface UpsertIngredientDto {
  name: string;
  nameAr?: string;
  unit: string;
  currentStock: number;
  minStock: number;
  costPerUnit: number;
}

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly onesignal: OneSignalClient,
  ) {}

  // ── Event handler ────────────────────────────────────────────────────────

  @OnEvent("order.status_changed")
  async onOrderStatusChanged(event: { restaurantId: string; order: { id: string; status: string; items?: Array<{ productId: string; quantity: number }> } }) {
    if (event.order.status !== "CONFIRMED") return;

    // Load full order with items if not included
    const order = await this.db.order.findUnique({
      where: { id: event.order.id },
      include: { items: { select: { productId: true, quantity: true } } },
    });
    if (!order) return;

    await this.deductIngredients(event.restaurantId, order.items);
  }

  private async deductIngredients(restaurantId: string, items: Array<{ productId: string; quantity: number }>) {
    for (const item of items) {
      const recipe = await this.db.productIngredient.findMany({
        where: { productId: item.productId },
        include: { ingredient: true },
      });

      for (const recipeItem of recipe) {
        const deductQty = Number(recipeItem.quantity) * item.quantity;
        const updated = await this.db.ingredientStock.update({
          where: { id: recipeItem.ingredientId },
          data: { currentStock: { decrement: deductQty } },
        });

        const currentStock = Number(updated.currentStock);
        const minStock = Number(updated.minStock);

        if (currentStock <= 0) {
          // Auto-hide all products that use this ingredient
          await this.db.$transaction(async (tx) => {
            const affectedProducts = await tx.productIngredient.findMany({ where: { ingredientId: updated.id }, select: { productId: true } });
            await tx.product.updateMany({ where: { id: { in: affectedProducts.map(p => p.productId) } }, data: { isAvailable: false } });
          });
          await this.onesignal.send({
            headings: { en: "⛔ Out of stock", ar: "⛔ نفد المخزون" },
            contents: { en: `${updated.name} is out of stock — related products hidden.`, ar: `${updated.nameAr ?? updated.name} نفد من المخزون.` },
            restaurantId,
            data: { ingredientId: updated.id, event: "out_of_stock" },
          });
        } else if (currentStock < minStock) {
          await this.onesignal.send({
            headings: { en: "⚠️ Low stock alert", ar: "⚠️ تنبيه مخزون منخفض" },
            contents: { en: `${updated.name}: ${currentStock.toFixed(2)} ${updated.unit} remaining (min: ${minStock})`, ar: `${updated.nameAr ?? updated.name}: ${currentStock.toFixed(2)} ${updated.unit} متبقي.` },
            restaurantId,
            data: { ingredientId: updated.id, event: "low_stock" },
          });
        }
      }
    }
  }

  // ── Dashboard CRUD ───────────────────────────────────────────────────────

  async getAll(restaurantId: string) {
    const ingredients = await this.db.ingredientStock.findMany({
      where: { restaurantId },
      orderBy: { name: "asc" },
    });
    return ingredients.map(i => ({
      ...i,
      currentStock: Number(i.currentStock),
      minStock: Number(i.minStock),
      costPerUnit: Number(i.costPerUnit),
      status: Number(i.currentStock) <= 0 ? "OUT" : Number(i.currentStock) < Number(i.minStock) ? "LOW" : "OK",
    }));
  }

  async create(restaurantId: string, dto: UpsertIngredientDto) {
    return this.db.ingredientStock.create({ data: { restaurantId, ...dto } as never });
  }

  async update(id: string, dto: Partial<UpsertIngredientDto>) {
    return this.db.ingredientStock.update({ where: { id }, data: dto as never });
  }

  async restock(id: string, qty: number) {
    const updated = await this.db.ingredientStock.update({
      where: { id },
      data: { currentStock: { increment: qty } },
    });

    // Re-enable products if back in stock above min
    if (Number(updated.currentStock) > 0) {
      const products = await this.db.productIngredient.findMany({ where: { ingredientId: id }, select: { productId: true } });
      await this.db.product.updateMany({ where: { id: { in: products.map(p => p.productId) } }, data: { isAvailable: true } });
    }
    return { ...updated, currentStock: Number(updated.currentStock) };
  }

  async setProductIngredients(productId: string, ingredients: Array<{ ingredientId: string; quantity: number }>) {
    await this.db.productIngredient.deleteMany({ where: { productId } });
    if (ingredients.length === 0) return [];
    return this.db.productIngredient.createMany({
      data: ingredients.map(i => ({ productId, ingredientId: i.ingredientId, quantity: i.quantity })),
    });
  }

  async getProductIngredients(productId: string) {
    return this.db.productIngredient.findMany({ where: { productId }, include: { ingredient: true } });
  }

  async getStats(restaurantId: string) {
    const all = await this.getAll(restaurantId);
    return { total: all.length, low: all.filter(i => i.status === "LOW").length, out: all.filter(i => i.status === "OUT").length };
  }
}

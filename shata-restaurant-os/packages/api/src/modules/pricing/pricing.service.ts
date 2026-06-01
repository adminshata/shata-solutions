import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";

export interface PricingRuleDto {
  name: string;
  nameAr?: string;
  type: "PERCENTAGE_OFF" | "FIXED_OFF" | "FIXED_PRICE";
  value: number;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  productIds?: string[];
  categoryIds?: string[];
  isActive?: boolean;
}

export interface PricedProduct {
  originalPrice: number;
  discountedPrice: number;
  ruleName: string;
  ruleEndTime: string;
  savings: number;
}

@Injectable()
export class PricingService {
  constructor(private readonly db: DatabaseService) {}

  isRuleActive(rule: { daysOfWeek: number[]; startTime: string; endTime: string; isActive: boolean }, now = new Date()): boolean {
    if (!rule.isActive) return false;
    const day = now.getDay();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    return rule.daysOfWeek.includes(day) && time >= rule.startTime && time <= rule.endTime;
  }

  applyRule(price: number, rule: { type: string; value: number }): number {
    const v = Number(rule.value);
    if (rule.type === "PERCENTAGE_OFF") return Math.max(0, price * (1 - v / 100));
    if (rule.type === "FIXED_OFF") return Math.max(0, price - v);
    if (rule.type === "FIXED_PRICE") return Math.max(0, v);
    return price;
  }

  async getActiveRulesForRestaurant(restaurantId: string) {
    const rules = await this.db.pricingRule.findMany({ where: { restaurantId, isActive: true } });
    const now = new Date();
    return rules.filter(r => this.isRuleActive(r, now));
  }

  async applyPricingToMenu(restaurantId: string, categories: Array<{ id: string; products: Array<{ id: string; categoryId: string; price: unknown }> }>) {
    const activeRules = await this.getActiveRulesForRestaurant(restaurantId);
    if (activeRules.length === 0) return { categories, activeRules: [] };

    const categoriesWithPricing = categories.map(cat => ({
      ...cat,
      products: cat.products.map(product => {
        const originalPrice = Number(product.price);
        const matchingRule = activeRules.find(r => {
          const matchesProduct = r.productIds.length === 0 || r.productIds.includes(product.id);
          const matchesCategory = r.categoryIds.length === 0 || r.categoryIds.includes(product.categoryId);
          return matchesProduct || matchesCategory;
        });

        if (!matchingRule) return product;

        const discountedPrice = this.applyRule(originalPrice, matchingRule);
        return {
          ...product,
          discountedPrice: Math.round(discountedPrice * 100) / 100,
          originalPrice,
          pricingRule: { name: matchingRule.name, nameAr: matchingRule.nameAr, endTime: matchingRule.endTime },
        };
      }),
    }));

    return {
      categories: categoriesWithPricing,
      activeRules: activeRules.map(r => ({ name: r.name, nameAr: r.nameAr, endTime: r.endTime, type: r.type, value: Number(r.value) })),
    };
  }

  async getAllRules(restaurantId: string) {
    return this.db.pricingRule.findMany({ where: { restaurantId }, orderBy: { createdAt: "desc" } });
  }

  async createRule(restaurantId: string, dto: PricingRuleDto) {
    return this.db.pricingRule.create({
      data: { restaurantId, ...dto, value: dto.value, productIds: dto.productIds ?? [], categoryIds: dto.categoryIds ?? [], isActive: dto.isActive ?? true } as never,
    });
  }

  async updateRule(ruleId: string, dto: Partial<PricingRuleDto>) {
    return this.db.pricingRule.update({ where: { id: ruleId }, data: dto as never });
  }

  async toggleRule(ruleId: string, isActive: boolean) {
    return this.db.pricingRule.update({ where: { id: ruleId }, data: { isActive } });
  }

  async deleteRule(ruleId: string) {
    return this.db.pricingRule.delete({ where: { id: ruleId } });
  }
}

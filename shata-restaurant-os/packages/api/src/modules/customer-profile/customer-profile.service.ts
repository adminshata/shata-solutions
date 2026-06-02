import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";

export interface UpsertProfileDto {
  customerId: string;
  name: string;
  email?: string;
  birthdate?: string;
  preferredLang?: string;
  dietaryPrefs?: string[];
}

export interface SaveOrderDto {
  customerId: string;
  restaurantId: string;
  name: string;
  items: unknown[];
}

@Injectable()
export class CustomerProfileService {
  constructor(private readonly db: DatabaseService) {}

  async upsertProfile(dto: UpsertProfileDto) {
    return this.db.customerProfile.upsert({
      where: { customerId: dto.customerId },
      create: {
        customerId: dto.customerId,
        name: dto.name,
        email: dto.email,
        birthdate: dto.birthdate ? new Date(dto.birthdate) : undefined,
        preferredLang: dto.preferredLang ?? "ar",
        dietaryPrefs: dto.dietaryPrefs ?? [],
      },
      update: {
        name: dto.name,
        email: dto.email,
        birthdate: dto.birthdate ? new Date(dto.birthdate) : undefined,
        preferredLang: dto.preferredLang,
        dietaryPrefs: dto.dietaryPrefs,
      },
    });
  }

  async getProfile(customerId: string) {
    const profile = await this.db.customerProfile.findUnique({ where: { customerId } });
    if (!profile) return null;

    const loyaltyAccounts = await this.db.loyaltyAccount.findMany({
      where: { customerId },
      select: {
        restaurantId: true,
        points: true,
        walletBalance: true,
      },
    });

    return { ...profile, loyaltyAccounts };
  }

  async getOrderHistory(customerId: string, page = 1) {
    const take = 20;
    return this.db.order.findMany({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      take,
      skip: (page - 1) * take,
      select: {
        id: true,
        orderNumber: true,
        total: true,
        currency: true,
        status: true,
        createdAt: true,
        restaurantId: true,
        items: { select: { quantity: true, product: { select: { name: true } } } },
      },
    });
  }

  async saveOrder(dto: SaveOrderDto) {
    return this.db.savedOrder.create({
      data: { customerId: dto.customerId, restaurantId: dto.restaurantId, name: dto.name, items: dto.items as never },
    });
  }

  async getSavedOrders(customerId: string, restaurantId?: string) {
    return this.db.savedOrder.findMany({
      where: { customerId, ...(restaurantId ? { restaurantId } : {}) },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }

  async deleteSavedOrder(id: string, customerId: string) {
    const order = await this.db.savedOrder.findFirst({ where: { id, customerId } });
    if (!order) throw new NotFoundException("Saved order not found");
    return this.db.savedOrder.delete({ where: { id } });
  }
}

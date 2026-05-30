import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import type { Prisma } from "@shata/database";

@Injectable()
export class RestaurantsService {
  constructor(private readonly db: DatabaseService) {}

  async create(data: {
    orgId: string;
    name: string;
    currency: string;
    locale: string;
    timezone: string;
    taxRate: number;
    taxLabel: string;
    taxInclusive: boolean;
  }) {
    return this.db.restaurant.create({ data });
  }

  async findById(id: string) {
    return this.db.restaurant.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.RestaurantUpdateInput) {
    return this.db.restaurant.update({ where: { id }, data });
  }
}

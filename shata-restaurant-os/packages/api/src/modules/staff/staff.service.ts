import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";

@Injectable()
export class StaffService {
  constructor(private readonly db: DatabaseService) {}
  async list(restaurantId: string) {
    return this.db.staff.findMany({ where: { restaurantId, isActive: true }, orderBy: { createdAt: "asc" } });
  }
  async invite(restaurantId: string, data: { clerkUserId: string; name: string; role: string; email?: string }) {
    return this.db.staff.create({ data: { restaurantId, ...data, role: data.role as never } });
  }
}

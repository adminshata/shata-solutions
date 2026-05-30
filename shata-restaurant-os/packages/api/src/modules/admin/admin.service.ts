import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";

@Injectable()
export class AdminService {
  constructor(private readonly db: DatabaseService) {}
  async listMerchants() {
    return this.db.organization.findMany({
      include: { subscription: true, restaurants: { select: { id: true, name: true, currency: true } } },
      orderBy: { createdAt: "desc" },
    });
  }
}

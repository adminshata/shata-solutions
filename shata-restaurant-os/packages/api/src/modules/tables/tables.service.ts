import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import { SessionTokenService } from "../auth/session-token.service";

@Injectable()
export class TablesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly sessionTokenSvc: SessionTokenService
  ) {}

  async generateQrToken(tableId: string, restaurantId: string): Promise<string> {
    return this.sessionTokenSvc.sign({ tableId, restaurantId });
  }

  async listTables(restaurantId: string) {
    return this.db.table.findMany({
      where: { restaurantId },
      orderBy: { number: "asc" },
      include: {
        sessions: {
          where: { status: "ACTIVE" },
          take: 1,
          include: { orders: { orderBy: { createdAt: "desc" }, take: 5 } },
        },
      },
    });
  }
}

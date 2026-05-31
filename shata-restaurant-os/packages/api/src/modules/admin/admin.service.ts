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

  async getOrgOverview(orgId: string) {
    const org = await this.db.organization.findUnique({
      where: { id: orgId },
      include: {
        restaurants: {
          select: {
            id: true,
            name: true,
            branchCode: true,
            currency: true,
            _count: { select: { orders: true, tables: true, staff: true } },
          },
        },
      },
    });
    if (!org) return null;

    // Per-branch revenue (last 30 days)
    const since = new Date(Date.now() - 30 * 24 * 3600 * 1000);
    const branchStats = await Promise.all(
      org.restaurants.map(async (r) => {
        const [revenue, activeSessions] = await Promise.all([
          this.db.order.aggregate({
            where: { restaurantId: r.id, status: "SERVED", createdAt: { gte: since } },
            _sum: { total: true },
            _count: { _all: true },
          }),
          this.db.session.count({ where: { restaurantId: r.id, status: "ACTIVE" } }),
        ]);
        return {
          ...r,
          revenue30d: Number(revenue._sum.total ?? 0),
          orders30d: revenue._count._all,
          activeSessions,
        };
      })
    );

    return { org, branches: branchStats };
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import { DashboardGateway } from "../../shared/realtime/dashboard.gateway";
import { SessionTokenService } from "../auth/session-token.service";

export type CallType = "ASSISTANCE" | "CHECK_PLEASE" | "WATER" | "MORE_NAPKINS";

@Injectable()
export class WaiterCallsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly dashboard: DashboardGateway,
    private readonly sessionSvc: SessionTokenService,
  ) {}

  async createCall(token: string, type: CallType) {
    const { restaurantId, tableId } = await this.sessionSvc.verify(token);

    const session = await this.db.session.findFirst({
      where: { tableId, restaurantId, status: "ACTIVE" },
      select: { id: true },
    });
    if (!session) throw new NotFoundException("No active session for this table");

    const call = await this.db.waiterCall.create({
      data: { sessionId: session.id, tableId, restaurantId, type: type as never },
      include: { session: { include: { table: { select: { number: true } } } } },
    });

    // Emit Socket.io event to dashboard
    this.dashboard.emitWaiterCall(restaurantId, {
      callId: call.id,
      tableId,
      tableNumber: call.session.table.number,
      type,
      createdAt: call.createdAt,
    });

    return { callId: call.id, status: call.status };
  }

  async getActiveCalls(restaurantId: string) {
    return this.db.waiterCall.findMany({
      where: { restaurantId, status: { in: ["PENDING", "ACKNOWLEDGED"] } },
      orderBy: { createdAt: "asc" },
      include: { session: { include: { table: { select: { number: true } } } } },
    });
  }

  async acknowledge(callId: string, staffId: string) {
    const call = await this.db.waiterCall.update({
      where: { id: callId },
      data: { status: "ACKNOWLEDGED", resolvedBy: staffId },
    });
    this.dashboard.emitWaiterCallUpdate(call.restaurantId, { callId, status: "ACKNOWLEDGED" });
    return call;
  }

  async resolve(callId: string, staffId: string) {
    const call = await this.db.waiterCall.update({
      where: { id: callId },
      data: { status: "RESOLVED", resolvedBy: staffId, resolvedAt: new Date() },
    });
    this.dashboard.emitWaiterCallUpdate(call.restaurantId, { callId, status: "RESOLVED" });
    return call;
  }

  async getHistory(restaurantId: string, page = 1) {
    const take = 50;
    const [calls, total] = await Promise.all([
      this.db.waiterCall.findMany({
        where: { restaurantId },
        orderBy: { createdAt: "desc" },
        take,
        skip: (page - 1) * take,
        include: { session: { include: { table: { select: { number: true } } } } },
      }),
      this.db.waiterCall.count({ where: { restaurantId } }),
    ]);

    // avg response time
    const resolved = calls.filter(c => c.resolvedAt);
    const avgResponseMs = resolved.length > 0
      ? resolved.reduce((s, c) => s + c.resolvedAt!.getTime() - c.createdAt.getTime(), 0) / resolved.length
      : null;

    return { calls, total, avgResponseMs: avgResponseMs ? Math.round(avgResponseMs / 1000) : null };
  }
}

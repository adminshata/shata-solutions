import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import type { Request } from "express";

export interface AuditLogDto {
  restaurantId?: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  req?: Request;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class AuditService {
  constructor(private readonly db: DatabaseService) {}

  async log(dto: AuditLogDto): Promise<void> {
    await this.db.auditLog.create({
      data: {
        restaurantId: dto.restaurantId,
        userId: dto.userId,
        action: dto.action,
        resource: dto.resource,
        resourceId: dto.resourceId,
        ipAddress: dto.req ? this.getIp(dto.req) : undefined,
        userAgent: dto.req?.headers?.["user-agent"] ?? undefined,
        metadata: dto.metadata as never,
      },
    });
  }

  async getLogs(restaurantId: string, opts: { action?: string; from?: string; to?: string; page?: number }) {
    const take = 50;
    const page = opts.page ?? 1;
    const where = {
      restaurantId,
      ...(opts.action ? { action: opts.action } : {}),
      ...(opts.from || opts.to ? {
        createdAt: {
          ...(opts.from ? { gte: new Date(opts.from) } : {}),
          ...(opts.to ? { lte: new Date(opts.to) } : {}),
        }
      } : {}),
    };

    const [logs, total] = await Promise.all([
      this.db.auditLog.findMany({ where, orderBy: { createdAt: "desc" }, take, skip: (page - 1) * take }),
      this.db.auditLog.count({ where }),
    ]);

    return { logs, total };
  }

  private getIp(req: Request): string {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") return forwarded.split(",")[0]?.trim() ?? "";
    return req.socket?.remoteAddress ?? "";
  }
}

import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import type { NfcStatus } from "@shata/database";

@Injectable()
export class NfcService {
  constructor(private readonly db: DatabaseService) {}

  async listTags(restaurantId: string, status?: NfcStatus) {
    return this.db.nfcTag.findMany({
      where: { restaurantId, ...(status ? { status } : {}) },
      orderBy: { createdAt: "desc" },
    });
  }

  async getTag(restaurantId: string, id: string) {
    const tag = await this.db.nfcTag.findFirst({ where: { id, restaurantId } });
    if (!tag) throw new NotFoundException("NFC tag not found");
    return tag;
  }

  async registerTag(restaurantId: string, serialNumber: string, notes?: string) {
    const existing = await this.db.nfcTag.findUnique({ where: { serialNumber } });
    if (existing) throw new ConflictException("Serial number already registered");
    return this.db.nfcTag.create({
      data: { restaurantId, serialNumber, notes, status: "UNASSIGNED" },
    });
  }

  async assignToTable(restaurantId: string, id: string, tableId: string) {
    const tag = await this.db.nfcTag.findFirst({ where: { id, restaurantId } });
    if (!tag) throw new NotFoundException("NFC tag not found");

    // Check table exists in this restaurant
    const table = await this.db.table.findFirst({ where: { id: tableId, restaurantId } });
    if (!table) throw new NotFoundException("Table not found");

    // Unassign any existing tag for this table
    await this.db.nfcTag.updateMany({
      where: { tableId, restaurantId },
      data: { tableId: null, status: "UNASSIGNED" },
    });

    return this.db.nfcTag.update({
      where: { id },
      data: { tableId, status: "ASSIGNED", programmedAt: new Date() },
    });
  }

  async updateStatus(restaurantId: string, id: string, status: NfcStatus) {
    const tag = await this.db.nfcTag.findFirst({ where: { id, restaurantId } });
    if (!tag) throw new NotFoundException("NFC tag not found");
    return this.db.nfcTag.update({
      where: { id },
      data: { status, ...(status === "UNASSIGNED" ? { tableId: null } : {}) },
    });
  }

  async recordScan(serialNumber: string) {
    const tag = await this.db.nfcTag.findUnique({ where: { serialNumber } });
    if (!tag) throw new NotFoundException("NFC tag not found");
    return this.db.nfcTag.update({
      where: { serialNumber },
      data: { lastScanned: new Date(), scanCount: { increment: 1 }, status: "ACTIVE" },
    });
  }

  async getStats(restaurantId: string) {
    const [total, unassigned, assigned, active, damaged] = await Promise.all([
      this.db.nfcTag.count({ where: { restaurantId } }),
      this.db.nfcTag.count({ where: { restaurantId, status: "UNASSIGNED" } }),
      this.db.nfcTag.count({ where: { restaurantId, status: "ASSIGNED" } }),
      this.db.nfcTag.count({ where: { restaurantId, status: "ACTIVE" } }),
      this.db.nfcTag.count({ where: { restaurantId, status: { in: ["DAMAGED", "LOST"] } } }),
    ]);
    return { total, unassigned, assigned, active, damaged };
  }
}

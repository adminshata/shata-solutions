import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { DatabaseService } from "../../shared/database/database.service";
import { QUEUES, JOBS } from "../../shared/queue/queue.constants";

const CONFIRMATION_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

@Injectable()
export class InstapayService {
  constructor(
    private readonly db: DatabaseService,
    @InjectQueue(QUEUES.INSTAPAY_EXPIRY) private readonly expiryQueue: Queue
  ) {}

  async createConfirmation(restaurantId: string, orderId: string, amount: number) {
    const expiresAt = new Date(Date.now() + CONFIRMATION_WINDOW_MS);

    const confirmation = await this.db.instapayPendingConfirmation.upsert({
      where: { orderId },
      create: { orderId, restaurantId, amount, expiresAt },
      update: { expiresAt, confirmedBy: null, confirmedAt: null },
    });

    // Schedule auto-cancel job
    await this.expiryQueue.add(
      JOBS.EXPIRE_INSTAPAY,
      { confirmationId: confirmation.id, orderId },
      { delay: CONFIRMATION_WINDOW_MS, jobId: `expire-${confirmation.id}` }
    );

    return { ...confirmation, windowMinutes: 15 };
  }

  async confirmPayment(restaurantId: string, orderId: string, confirmedBy: string) {
    const confirmation = await this.db.instapayPendingConfirmation.findFirst({
      where: { orderId, restaurantId },
    });
    if (!confirmation) throw new Error("Confirmation not found");
    if (confirmation.confirmedAt) return { alreadyConfirmed: true, confirmation };
    if (new Date() > confirmation.expiresAt) throw new Error("Confirmation window expired");

    const updated = await this.db.instapayPendingConfirmation.update({
      where: { id: confirmation.id },
      data: { confirmedBy, confirmedAt: new Date() },
    });

    // Update order payment status
    await this.db.order.update({
      where: { id: orderId },
      data: { status: "CONFIRMED" },
    });

    return updated;
  }

  async cancelExpired(orderId: string) {
    const confirmation = await this.db.instapayPendingConfirmation.findFirst({
      where: { orderId, confirmedAt: null },
    });
    if (!confirmation) return;

    // Only cancel if window has passed
    if (new Date() < confirmation.expiresAt) return;

    await this.db.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" as never, voidReason: "InstaPay confirmation expired" },
    });

    await this.db.instapayPendingConfirmation.delete({ where: { id: confirmation.id } });
  }

  async listPending(restaurantId: string) {
    return this.db.instapayPendingConfirmation.findMany({
      where: { restaurantId, confirmedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "asc" },
    });
  }

  async getConfirmationStatus(orderId: string) {
    const confirmation = await this.db.instapayPendingConfirmation.findUnique({
      where: { orderId },
    });
    if (!confirmation) return null;

    const msLeft = Math.max(0, confirmation.expiresAt.getTime() - Date.now());
    return {
      ...confirmation,
      msLeft,
      minutesLeft: Math.ceil(msLeft / 60000),
      confirmed: !!confirmation.confirmedAt,
      expired: !confirmation.confirmedAt && msLeft === 0,
    };
  }
}

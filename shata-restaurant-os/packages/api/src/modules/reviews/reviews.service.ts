import { Injectable, Logger, BadRequestException, NotFoundException } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { DatabaseService } from "../../shared/database/database.service";
import { OneSignalClient } from "../notifications/onesignal.client";

interface OrderServedPayload {
  restaurantId: string;
  order: { id: string; customerId: string | null; total: unknown };
}

export interface SubmitReviewDto {
  rating: number;
  comment?: string;
  tags?: string[];
  customerId?: string;
}

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly onesignal: OneSignalClient,
    @InjectQueue("review-prompt") private readonly reviewQueue: Queue,
  ) {}

  // ── Event handler ────────────────────────────────────────────────────────

  @OnEvent("order.completed")
  async onOrderServed({ restaurantId, order }: OrderServedPayload) {
    // Delayed job: prompt customer to review 5 minutes after served
    await this.reviewQueue.add(
      "send-review-prompt",
      { orderId: order.id, restaurantId, customerId: order.customerId },
      { delay: 5 * 60 * 1000, attempts: 1 },
    ).catch(err => this.logger.warn({ err }, "Failed to queue review prompt"));
  }

  async sendReviewPrompt(orderId: string, restaurantId: string, customerId: string | null) {
    // Check order hasn't already been reviewed
    const existing = await this.db.orderReview.findUnique({ where: { orderId } });
    if (existing) return;

    if (customerId) {
      await this.onesignal.send({
        headings: { en: "How was your order? ⭐", ar: "كيف كانت طلبيتك؟ ⭐" },
        contents: {
          en: "Rate your experience in 30 seconds.",
          ar: "قيّم تجربتك في 30 ثانية.",
        },
        externalUserIds: [customerId],
        data: { orderId, type: "review_prompt" },
      });
    }
  }

  // ── Customer endpoint ────────────────────────────────────────────────────

  async submitReview(orderId: string, dto: SubmitReviewDto) {
    if (dto.rating < 1 || dto.rating > 5) throw new BadRequestException("Rating must be 1–5");

    const order = await this.db.order.findUnique({ where: { id: orderId }, select: { restaurantId: true } });
    if (!order) throw new NotFoundException("Order not found");

    const existing = await this.db.orderReview.findUnique({ where: { orderId } });
    if (existing) throw new BadRequestException("Order already reviewed");

    const review = await this.db.orderReview.create({
      data: {
        orderId,
        restaurantId: order.restaurantId,
        customerId: dto.customerId,
        rating: dto.rating,
        comment: dto.comment,
        tags: dto.tags ?? [],
      },
    });

    // Alert staff on low rating
    if (dto.rating <= 2) {
      await this.onesignal.send({
        headings: { en: "⚠️ Low rating received", ar: "⚠️ تقييم منخفض" },
        contents: { en: `Order ${orderId.slice(-6).toUpperCase()} received ${dto.rating}★`, ar: "" },
        restaurantId: order.restaurantId,
        data: { orderId, rating: String(dto.rating) },
      });
    }

    return review;
  }

  // ── Dashboard endpoints ──────────────────────────────────────────────────

  async getReviews(restaurantId: string, opts: { rating?: number; page?: number; from?: string; to?: string }) {
    const take = 20;
    const page = opts.page ?? 1;

    const where = {
      restaurantId,
      ...(opts.rating ? { rating: opts.rating } : {}),
      ...(opts.from || opts.to ? {
        createdAt: {
          ...(opts.from ? { gte: new Date(opts.from) } : {}),
          ...(opts.to ? { lte: new Date(opts.to) } : {}),
        }
      } : {}),
    };

    const [reviews, total] = await Promise.all([
      this.db.orderReview.findMany({ where, orderBy: { createdAt: "desc" }, take, skip: (page - 1) * take }),
      this.db.orderReview.count({ where }),
    ]);

    // KPIs
    const allRatings = await this.db.orderReview.findMany({ where: { restaurantId }, select: { rating: true } });
    const avg = allRatings.length > 0 ? allRatings.reduce((s, r) => s + r.rating, 0) / allRatings.length : 0;

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thisWeek = await this.db.orderReview.count({ where: { restaurantId, createdAt: { gte: weekAgo } } });

    const breakdown = [5, 4, 3, 2, 1].map(r => ({
      rating: r,
      count: allRatings.filter(x => x.rating === r).length,
      pct: allRatings.length > 0 ? Math.round((allRatings.filter(x => x.rating === r).length / allRatings.length) * 100) : 0,
    }));

    return { reviews, total, avg: Math.round(avg * 10) / 10, thisWeek, breakdown };
  }

  async replyToReview(reviewId: string, reply: string) {
    const review = await this.db.orderReview.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException("Review not found");
    return this.db.orderReview.update({ where: { id: reviewId }, data: { restaurantReply: reply, repliedAt: new Date() } });
  }
}

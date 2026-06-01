import { Injectable } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import PDFDocument = require("pdfkit");
import { DatabaseService } from "../../shared/database/database.service";
import { OrderStatus } from "@shata/database";
import type { AnalyticsOverviewDto } from "@shata/types";

const EXCLUDED_STATUSES = { notIn: [OrderStatus.CANCELLED, OrderStatus.REFUNDED] };

function defaultRange(fromStr?: string, toStr?: string): { from: Date; to: Date } {
  const to = toStr ? new Date(toStr) : new Date();
  const from = fromStr
    ? new Date(fromStr)
    : new Date(to.getTime() - 30 * 24 * 60 * 60 * 1000);
  return { from, to };
}

@Injectable()
export class AnalyticsService {
  constructor(private readonly db: DatabaseService) {}

  async getOverview(restaurantId: string): Promise<AnalyticsOverviewDto> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(startOfDay.getTime() - 24 * 60 * 60 * 1000);
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
    const lastWeekStart = new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [tod, yest, wk, lastWk, mo, rest] = await Promise.all([
      this.db.order.findMany({ where: { restaurantId, createdAt: { gte: startOfDay }, status: EXCLUDED_STATUSES }, select: { total: true } }),
      this.db.order.findMany({ where: { restaurantId, createdAt: { gte: yesterday, lt: startOfDay }, status: EXCLUDED_STATUSES }, select: { total: true } }),
      this.db.order.findMany({ where: { restaurantId, createdAt: { gte: startOfWeek }, status: EXCLUDED_STATUSES }, select: { total: true } }),
      this.db.order.findMany({ where: { restaurantId, createdAt: { gte: lastWeekStart, lt: startOfWeek }, status: EXCLUDED_STATUSES }, select: { total: true } }),
      this.db.order.findMany({ where: { restaurantId, createdAt: { gte: startOfMonth }, status: EXCLUDED_STATUSES }, select: { total: true } }),
      this.db.restaurant.findUnique({ where: { id: restaurantId }, select: { currency: true } }),
    ]);

    const sum = (o: { total: unknown }[]) => o.reduce((a, x) => a + Number(x.total), 0);
    const todRevenue = sum(tod);
    const yestRevenue = sum(yest);
    const wkRevenue = sum(wk);
    const lastWkRevenue = sum(lastWk);

    const pct = (curr: number, prev: number) =>
      prev === 0 ? null : Math.round(((curr - prev) / prev) * 100);

    return {
      revenue: {
        today: todRevenue,
        week: wkRevenue,
        month: sum(mo),
        currency: rest?.currency ?? "USD",
        todayVsYesterday: pct(todRevenue, yestRevenue),
        weekVsLastWeek: pct(wkRevenue, lastWkRevenue),
      },
      orders: {
        today: tod.length,
        week: wk.length,
        month: mo.length,
        todayVsYesterday: pct(tod.length, yest.length),
      },
      avgOrderValue: mo.length > 0 ? sum(mo) / mo.length : 0,
      topProducts: [],
      recentTransactions: [],
    };
  }

  async getPeakHours(restaurantId: string, fromStr?: string, toStr?: string) {
    const { from, to } = defaultRange(fromStr, toStr);

    const orders = await this.db.order.findMany({
      where: { restaurantId, createdAt: { gte: from, lt: to }, status: EXCLUDED_STATUSES },
      select: { createdAt: true, total: true },
    });

    const buckets = Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      orders: 0,
      revenue: 0,
    }));

    for (const order of orders) {
      const h = order.createdAt.getHours();
      const bucket = buckets[h]!;
      bucket.orders++;
      bucket.revenue = round2(bucket.revenue + Number(order.total));
    }

    return buckets;
  }

  async getTopProducts(restaurantId: string, fromStr?: string, toStr?: string) {
    const { from, to } = defaultRange(fromStr, toStr);

    const items = await this.db.orderItem.findMany({
      where: {
        order: {
          restaurantId,
          createdAt: { gte: from, lt: to },
          status: EXCLUDED_STATUSES,
        },
      },
      select: {
        productId: true,
        quantity: true,
        totalPrice: true,
        product: { select: { name: true } },
      },
    });

    const map = new Map<string, { name: string; orders: number; revenue: number }>();

    for (const item of items) {
      const existing = map.get(item.productId);
      if (existing) {
        existing.orders += item.quantity;
        existing.revenue = round2(existing.revenue + Number(item.totalPrice));
      } else {
        map.set(item.productId, {
          name: item.product.name,
          orders: item.quantity,
          revenue: round2(Number(item.totalPrice)),
        });
      }
    }

    return Array.from(map.entries())
      .map(([productId, data]) => ({ productId, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 20);
  }

  async getTableStats(restaurantId: string, fromStr?: string, toStr?: string) {
    const { from, to } = defaultRange(fromStr, toStr);

    const sessions = await this.db.session.findMany({
      where: { restaurantId, openedAt: { gte: from, lt: to } },
      select: {
        openedAt: true,
        closedAt: true,
        table: { select: { id: true, number: true } },
        orders: {
          where: { status: EXCLUDED_STATUSES },
          select: { total: true },
        },
      },
    });

    const tableMap = new Map<
      string,
      { number: string; sessions: number; orders: number; revenue: number; totalMinutes: number; closedSessions: number }
    >();

    for (const session of sessions) {
      const tid = session.table.id;
      const existing = tableMap.get(tid) ?? {
        number: session.table.number,
        sessions: 0,
        orders: 0,
        revenue: 0,
        totalMinutes: 0,
        closedSessions: 0,
      };

      existing.sessions++;
      existing.orders += session.orders.length;
      existing.revenue = round2(
        existing.revenue + session.orders.reduce((a, o) => a + Number(o.total), 0)
      );

      if (session.closedAt) {
        const durationMs = session.closedAt.getTime() - session.openedAt.getTime();
        existing.totalMinutes += durationMs / 60000;
        existing.closedSessions++;
      }

      tableMap.set(tid, existing);
    }

    return Array.from(tableMap.entries()).map(([tableId, data]) => ({
      tableId,
      tableNumber: data.number,
      sessions: data.sessions,
      orders: data.orders,
      revenue: data.revenue,
      avgSessionMinutes:
        data.closedSessions > 0
          ? round2(data.totalMinutes / data.closedSessions)
          : null,
    })).sort((a, b) => b.revenue - a.revenue);
  }

  async getCustomerStats(restaurantId: string, fromStr?: string, toStr?: string) {
    const { from, to } = defaultRange(fromStr, toStr);

    const sessions = await this.db.session.findMany({
      where: { restaurantId, openedAt: { gte: from, lt: to } },
      select: {
        openedAt: true,
        table: { select: { id: true, number: true } },
        orders: {
          where: { status: EXCLUDED_STATUSES },
          select: { total: true },
        },
      },
      orderBy: { openedAt: "desc" },
    });

    // Group by tableId as a customer proxy
    const custMap = new Map<
      string,
      { tableNumber: string; visits: number; revenue: number; lastVisit: Date }
    >();

    for (const session of sessions) {
      const tid = session.table.id;
      const existing = custMap.get(tid);
      const sessionRevenue = session.orders.reduce((a, o) => a + Number(o.total), 0);

      if (existing) {
        existing.visits++;
        existing.revenue = round2(existing.revenue + sessionRevenue);
      } else {
        custMap.set(tid, {
          tableNumber: session.table.number,
          visits: 1,
          revenue: round2(sessionRevenue),
          lastVisit: session.openedAt,
        });
      }
    }

    return Array.from(custMap.entries())
      .map(([tableId, data]) => ({ tableId, ...data }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 50);
  }

  async getZReportData(restaurantId: string, dateStr?: string) {
    const date = dateStr ? new Date(dateStr) : new Date();
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    const [restaurant, orders] = await Promise.all([
      this.db.restaurant.findUnique({
        where: { id: restaurantId },
        select: { name: true, currency: true, taxLabel: true },
      }),
      this.db.order.findMany({
        where: { restaurantId, createdAt: { gte: start, lt: end } },
        select: {
          id: true,
          status: true,
          subtotal: true,
          tax: true,
          total: true,
          createdAt: true,
          items: {
            select: {
              quantity: true,
              totalPrice: true,
              product: { select: { name: true } },
            },
          },
          payment: { select: { provider: true, status: true } },
        },
      }),
    ]);

    const completed = orders.filter(
      (o) => o.status !== OrderStatus.CANCELLED && o.status !== OrderStatus.REFUNDED
    );
    const cancelled = orders.filter((o) => o.status === OrderStatus.CANCELLED);
    const refunded = orders.filter((o) => o.status === OrderStatus.REFUNDED);

    const grossRevenue = completed.reduce((s, o) => s + Number(o.total), 0);
    const totalTax = completed.reduce((s, o) => s + Number(o.tax), 0);
    const netRevenue = completed.reduce((s, o) => s + Number(o.subtotal), 0);

    // Payment breakdown
    const paymentMap = new Map<string, { count: number; amount: number }>();
    for (const order of completed) {
      if (!order.payment) continue;
      const key = order.payment.provider;
      const existing = paymentMap.get(key) ?? { count: 0, amount: 0 };
      existing.count++;
      existing.amount = round2(existing.amount + Number(order.total));
      paymentMap.set(key, existing);
    }

    // Top products
    const productMap = new Map<string, { name: string; qty: number; revenue: number }>();
    for (const order of completed) {
      for (const item of order.items) {
        const existing = productMap.get(item.product.name) ?? { name: item.product.name, qty: 0, revenue: 0 };
        existing.qty += item.quantity;
        existing.revenue = round2(existing.revenue + Number(item.totalPrice));
        productMap.set(item.product.name, existing);
      }
    }
    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Hourly
    const hourly = Array.from({ length: 24 }, (_, h) => ({ hour: h, orders: 0, revenue: 0 }));
    for (const order of completed) {
      const h = order.createdAt.getHours();
      const bucket = hourly[h]!;
      bucket.orders++;
      bucket.revenue = round2(bucket.revenue + Number(order.total));
    }

    return {
      restaurant: { name: restaurant?.name ?? "Restaurant", currency: restaurant?.currency ?? "USD", taxLabel: restaurant?.taxLabel ?? "Tax" },
      date: start,
      summary: {
        totalOrders: completed.length,
        cancelledOrders: cancelled.length,
        refundedOrders: refunded.length,
        grossRevenue: round2(grossRevenue),
        totalTax: round2(totalTax),
        netRevenue: round2(netRevenue),
      },
      paymentBreakdown: Array.from(paymentMap.entries()).map(([provider, data]) => ({ provider, ...data })),
      topProducts,
      hourly,
    };
  }

  async generateZReportPdf(restaurantId: string, dateStr?: string): Promise<Buffer> {
    const data = await this.getZReportData(restaurantId, dateStr);
    const { restaurant, date, summary, paymentBreakdown, topProducts, hourly } = data;
    const currency = restaurant.currency;
    const fmt = (n: number) => `${n.toFixed(2)} ${currency}`;

    return new Promise<Buffer>((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks: Buffer[] = [];
      doc.on("data", (c: Buffer) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // ── Header ──────────────────────────────────────────────────
      doc.fontSize(20).font("Helvetica-Bold").text(restaurant.name, { align: "center" });
      doc.fontSize(12).font("Helvetica").text("Z-Report — End of Day", { align: "center" });
      doc.fontSize(10).text(
        `${date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`,
        { align: "center" }
      );
      doc.moveDown(0.5);
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.5);

      // ── Summary ─────────────────────────────────────────────────
      doc.fontSize(12).font("Helvetica-Bold").text("Summary");
      doc.moveDown(0.3);
      const rows = [
        ["Total orders", summary.totalOrders.toString()],
        ["Cancelled", summary.cancelledOrders.toString()],
        ["Refunded", summary.refundedOrders.toString()],
        ["Net revenue (excl. tax)", fmt(summary.netRevenue)],
        [`${restaurant.taxLabel}`, fmt(summary.totalTax)],
        ["Gross revenue", fmt(summary.grossRevenue)],
      ];
      for (const [label, value] of rows) {
        doc.fontSize(10).font("Helvetica").text(label, 50, doc.y, { continued: true, width: 300 });
        doc.font("Helvetica-Bold").text(value, { align: "right" });
      }
      doc.moveDown(0.5);
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.5);

      // ── Payment breakdown ────────────────────────────────────────
      if (paymentBreakdown.length > 0) {
        doc.fontSize(12).font("Helvetica-Bold").text("Payment Methods");
        doc.moveDown(0.3);
        for (const p of paymentBreakdown) {
          doc.fontSize(10).font("Helvetica").text(`${p.provider} — ${p.count} transactions`, 50, doc.y, { continued: true, width: 300 });
          doc.font("Helvetica-Bold").text(fmt(p.amount), { align: "right" });
        }
        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(0.5);
      }

      // ── Top products ─────────────────────────────────────────────
      if (topProducts.length > 0) {
        doc.fontSize(12).font("Helvetica-Bold").text("Top Products");
        doc.moveDown(0.3);
        for (const p of topProducts) {
          doc.fontSize(10).font("Helvetica").text(`${p.name} × ${p.qty}`, 50, doc.y, { continued: true, width: 300 });
          doc.font("Helvetica-Bold").text(fmt(p.revenue), { align: "right" });
        }
        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(0.5);
      }

      // ── Hourly summary (only hours with activity) ────────────────
      const activeHours = hourly.filter((h) => h.orders > 0);
      if (activeHours.length > 0) {
        doc.fontSize(12).font("Helvetica-Bold").text("Hourly Breakdown");
        doc.moveDown(0.3);
        for (const h of activeHours) {
          const label = `${String(h.hour).padStart(2, "0")}:00 — ${String(h.hour + 1).padStart(2, "0")}:00`;
          doc.fontSize(10).font("Helvetica").text(`${label}  (${h.orders} orders)`, 50, doc.y, { continued: true, width: 300 });
          doc.font("Helvetica-Bold").text(fmt(h.revenue), { align: "right" });
        }
        doc.moveDown(0.5);
      }

      // ── Footer ───────────────────────────────────────────────────
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.5);
      doc.fontSize(8).font("Helvetica").fillColor("#666")
        .text(`Generated ${new Date().toISOString()} — Shata Restaurant OS`, { align: "center" });

      doc.end();
    });
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

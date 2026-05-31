import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DatabaseService } from "../../shared/database/database.service";
import { ThermalPrinter, PrinterTypes, CharacterSet } from "node-thermal-printer";

interface OrderTicketData {
  orderNumber: number;
  createdAt: Date | string;
  notes?: string | null;
  items: { quantity: number; unitPrice: number; notes?: string | null; product?: { name: string } | null }[];
  total: number;
  currency: string;
}

@Injectable()
export class PrinterService {
  private readonly logger = new Logger(PrinterService.name);

  constructor(private readonly db: DatabaseService) {}

  private buildPrinter(config: { type: string; ipAddress?: string | null; port?: number | null; usbPath?: string | null }) {
    const printerType = config.type === "USB" ? PrinterTypes.EPSON : PrinterTypes.EPSON;
    const iface = config.type === "USB"
      ? `usb://${config.usbPath ?? "/dev/usb/lp0"}`
      : `tcp://${config.ipAddress ?? "192.168.1.100"}:${config.port ?? 9100}`;

    return new ThermalPrinter({
      type: printerType,
      interface: iface,
      characterSet: CharacterSet.PC437_USA,
      removeSpecialCharacters: false,
      lineCharacter: "-",
    });
  }

  async getConfig(restaurantId: string) {
    return this.db.printerConfig.findUnique({ where: { restaurantId } });
  }

  async upsertConfig(restaurantId: string, data: {
    type?: string;
    ipAddress?: string;
    port?: number;
    usbPath?: string;
    isActive?: boolean;
    printOnOrder?: boolean;
    printReceipt?: boolean;
  }) {
    return this.db.printerConfig.upsert({
      where: { restaurantId },
      create: { restaurantId, ...data } as never,
      update: data as never,
    });
  }

  async testPrint(restaurantId: string): Promise<{ success: boolean; error?: string }> {
    const config = await this.getConfig(restaurantId);
    if (!config?.isActive) return { success: false, error: "Printer not configured or inactive" };

    try {
      const printer = this.buildPrinter(config);
      const isConnected = await printer.isPrinterConnected();
      if (!isConnected) return { success: false, error: "Printer not reachable" };

      printer.alignCenter();
      printer.bold(true);
      printer.println("SHATA RESTAURANT OS");
      printer.bold(false);
      printer.println("Test print — OK");
      printer.println(new Date().toLocaleString());
      printer.cut();
      await printer.execute();
      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Test print failed: ${msg}`);
      return { success: false, error: msg };
    }
  }

  async printOrderTicket(restaurantId: string, order: OrderTicketData): Promise<void> {
    const config = await this.getConfig(restaurantId);
    if (!config?.isActive || !config.printOnOrder) return;

    try {
      const printer = this.buildPrinter(config);
      printer.alignCenter();
      printer.bold(true);
      printer.println(`ORDER #${order.orderNumber}`);
      printer.bold(false);
      printer.println(new Date(order.createdAt).toLocaleTimeString());
      printer.drawLine();

      printer.alignLeft();
      for (const item of order.items) {
        const name = item.product?.name ?? "Item";
        printer.println(`${item.quantity}x ${name}`);
        if (item.notes) printer.println(`  Note: ${item.notes}`);
      }

      printer.drawLine();
      if (order.notes) { printer.println(`Notes: ${order.notes}`); printer.drawLine(); }
      printer.alignRight();
      printer.bold(true);
      printer.println(`TOTAL: ${Number(order.total).toFixed(2)} ${order.currency}`);
      printer.bold(false);
      printer.cut();
      await printer.execute();
    } catch (err) {
      this.logger.warn(`Order ticket print failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  @OnEvent("order.created")
  async onOrderCreated(payload: { restaurantId: string; order: OrderTicketData }) {
    await this.printOrderTicket(payload.restaurantId, payload.order);
  }
}

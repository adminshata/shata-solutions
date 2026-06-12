import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import type { Server, Socket } from "socket.io";
import type { KitchenTicketDto } from "@shata/types";
import { redactToken, SessionTokenService } from "../../modules/auth/session-token.service";

@WebSocketGateway({
  namespace: "/kitchen",
  cors: { origin: "*", credentials: true },
  transports: ["websocket", "polling"],
})
export class KitchenGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server!: Server;
  private readonly logger = new Logger("Kitchen");

  constructor(private readonly sessionTokenSvc: SessionTokenService) {}

  afterInit() {
    console.warn("🍳 Kitchen WebSocket gateway initialized");
  }

  async handleConnection(client: Socket) {
    const deviceToken = client.handshake.auth?.["deviceToken"] as string | undefined;

    if (!deviceToken) {
      this.logger.warn(`Kitchen client ${client.id} connected without a deviceToken`);
      client.emit("error", { message: "Missing kitchen device token" });
      client.disconnect();
      return;
    }

    try {
      const { restaurantId } = await this.sessionTokenSvc.verifyKitchenToken(deviceToken);
      await client.join(`restaurant:${restaurantId}`);
      client.emit("connected", { restaurantId });
      this.logger.log(`Kitchen client connected: ${client.id} -> restaurant=${restaurantId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid kitchen device token";
      this.logger.warn(`Kitchen client ${client.id} rejected (${redactToken(deviceToken)}): ${message}`);
      client.emit("error", { message });
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.warn(`Kitchen client disconnected: ${client.id}`);
  }

  @SubscribeMessage("join_restaurant")
  handleJoin(client: Socket, payload: { restaurantId: string; stationId?: string }) {
    void client.join(`restaurant:${payload.restaurantId}`);
    if (payload.stationId) {
      void client.join(`station:${payload.stationId}`);
    }
    client.emit("joined", { restaurantId: payload.restaurantId });
  }

  // Called by OrdersService when a new order is confirmed
  emitNewTicket(restaurantId: string, ticket: KitchenTicketDto) {
    this.server.to(`restaurant:${restaurantId}`).emit("new_ticket", ticket);
  }

  // Called by KitchenService when ticket status changes
  emitTicketUpdate(restaurantId: string, ticket: KitchenTicketDto) {
    this.server.to(`restaurant:${restaurantId}`).emit("ticket_updated", ticket);
  }
}

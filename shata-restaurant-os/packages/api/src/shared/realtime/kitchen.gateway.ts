import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";
import type { KitchenTicketDto } from "@shata/types";

@WebSocketGateway({
  namespace: "/kitchen",
  cors: { origin: "*", credentials: true },
  transports: ["websocket", "polling"],
})
export class KitchenGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server!: Server;

  afterInit() {
    console.warn("🍳 Kitchen WebSocket gateway initialized");
  }

  handleConnection(client: Socket) {
    console.warn(`Kitchen client connected: ${client.id}`);
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

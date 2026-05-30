import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";

@WebSocketGateway({
  namespace: "/dashboard",
  cors: { origin: "*", credentials: true },
  transports: ["websocket", "polling"],
})
export class DashboardGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server!: Server;

  afterInit() {
    console.warn("📊 Dashboard WebSocket gateway initialized");
  }

  handleConnection(client: Socket) {
    console.warn(`Dashboard client connected: ${client.id}`);
  }

  @SubscribeMessage("join_dashboard")
  handleJoin(client: Socket, payload: { restaurantId: string }) {
    void client.join(`dashboard:${payload.restaurantId}`);
    client.emit("joined", { restaurantId: payload.restaurantId });
  }

  emitNewOrder(restaurantId: string, order: Record<string, unknown>) {
    this.server.to(`dashboard:${restaurantId}`).emit("new_order", order);
  }

  emitOrderUpdate(restaurantId: string, order: Record<string, unknown>) {
    this.server.to(`dashboard:${restaurantId}`).emit("order_updated", order);
  }
}

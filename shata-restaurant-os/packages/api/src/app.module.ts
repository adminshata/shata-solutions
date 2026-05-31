import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";

import { DatabaseModule } from "./shared/database/database.module";
import { RedisModule } from "./shared/redis/redis.module";
import { RealtimeModule } from "./shared/realtime/realtime.module";
import { TaxModule } from "./shared/tax/tax.module";
import { QueueModule } from "./shared/queue/queue.module";

import { AuthModule } from "./modules/auth/auth.module";
import { TenantModule } from "./modules/tenant/tenant.module";
import { RestaurantsModule } from "./modules/restaurants/restaurants.module";
import { TablesModule } from "./modules/tables/tables.module";
import { SessionsModule } from "./modules/sessions/sessions.module";
import { MenuModule } from "./modules/menu/menu.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { KitchenModule } from "./modules/kitchen/kitchen.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { StaffModule } from "./modules/staff/staff.module";
import { AdminModule } from "./modules/admin/admin.module";
import { LoyaltyModule } from "./modules/loyalty/loyalty.module";
import { RefundsModule } from "./modules/refunds/refunds.module";

import { CorrelationIdMiddleware } from "./shared/middleware/correlation-id.middleware";
import { TenantMiddleware } from "./modules/tenant/tenant.middleware";

import appConfig from "./config/app.config";
import { validateConfig } from "./config/config.validation";

@Module({
  imports: [
    // Config — load and validate env vars at startup
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate: validateConfig,
      envFilePath: [".env.local", ".env"],
    }),

    // Rate limiting — keyed per restaurantId in guards
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env["THROTTLE_TTL_SECONDS"] ?? "60") * 1000,
        limit: parseInt(process.env["THROTTLE_LIMIT"] ?? "120"),
      },
    ]),

    // Events and scheduling
    EventEmitterModule.forRoot({ wildcard: true }),
    ScheduleModule.forRoot(),

    // Shared infrastructure
    DatabaseModule,
    RedisModule,
    RealtimeModule,
    TaxModule,
    QueueModule,

    // Feature modules
    AuthModule,
    TenantModule,
    RestaurantsModule,
    TablesModule,
    SessionsModule,
    MenuModule,
    OrdersModule,
    PaymentsModule,
    KitchenModule,
    AnalyticsModule,
    StaffModule,
    AdminModule,
    LoyaltyModule,
    RefundsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware, TenantMiddleware)
      .forRoutes("*");
  }
}

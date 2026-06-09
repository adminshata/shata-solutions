import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisService } from "./redis.service";

@Global()
@Module({
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: async (config: ConfigService) => {
        if (process.env.DISABLE_QUEUES === "true") {
          console.log("⚠️  Redis disabled via DISABLE_QUEUES=true");
          return null;
        }
        const { default: Redis } = await import("ioredis");
        const client = new Redis(config.get<string>("app.redisUrl") ?? "redis://localhost:6379", {
          lazyConnect: true,
          retryStrategy: () => null,
          enableOfflineQueue: false,
        });
        await client.connect().catch(() => {
          console.warn("⚠️  Redis connection pending — will retry");
        });
        return client;
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: ["REDIS_CLIENT", RedisService],
})
export class RedisModule {}

import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from "@nestjs/terminus";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { Version, VERSION_NEUTRAL } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import { Public } from "../auth/clerk.guard";

// Default DB ping timeout for the readiness check. Terminus defaults to
// 1000ms, which is too aggressive for Railway cold starts / Supabase
// pgbouncer latency. Override with HEALTH_DB_TIMEOUT_MS.
const DEFAULT_DB_HEALTH_TIMEOUT_MS = 5000;

@ApiTags("Health")
@Controller({ path: "health", version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaIndicator: PrismaHealthIndicator,
    private readonly db: DatabaseService
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  @ApiOperation({ summary: "Readiness check — database + uptime" })
  check() {
    const timeout = Number(process.env["HEALTH_DB_TIMEOUT_MS"]) || DEFAULT_DB_HEALTH_TIMEOUT_MS;
    return this.health.check([
      () => this.prismaIndicator.pingCheck("database", this.db, { timeout }),
    ]);
  }

  @Public()
  @Get("live")
  @ApiOperation({ summary: "Liveness probe — returns 200 if the app is running" })
  live() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env["npm_package_version"] ?? "1.0.0",
    };
  }

  @Public()
  @Get("ping")
  @ApiOperation({ summary: "Liveness probe — returns 200 OK" })
  ping() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env["npm_package_version"] ?? "1.0.0",
    };
  }
}

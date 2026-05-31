import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from "@nestjs/terminus";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { DatabaseService } from "../../shared/database/database.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaIndicator: PrismaHealthIndicator,
    private readonly db: DatabaseService
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  @ApiOperation({ summary: "Health check — database + uptime" })
  check() {
    return this.health.check([
      () => this.prismaIndicator.pingCheck("database", this.db),
    ]);
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

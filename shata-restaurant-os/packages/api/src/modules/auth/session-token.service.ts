import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SignJWT, jwtVerify, errors } from "jose";
import { TextEncoder } from "util";

export interface SessionTokenPayload {
  tableId: string;
  restaurantId: string;
}

export interface KitchenTokenPayload {
  restaurantId: string;
}

/** Truncates a token for safe logging — never log a full session token. */
export function redactToken(token: string): string {
  if (!token) return "<empty>";
  if (token.length <= 18) return `${token.slice(0, 4)}...`;
  return `${token.slice(0, 12)}...${token.slice(-6)}`;
}

@Injectable()
export class SessionTokenService {
  private readonly logger = new Logger("CustomerSession");
  private secret: Uint8Array;

  constructor(private readonly config: ConfigService) {
    const raw = config.get<string>("app.sessionTokenSecret") ?? "";
    this.secret = new TextEncoder().encode(raw);
  }

  async sign(payload: SessionTokenPayload): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(this.secret);
  }

  async verify(token: string): Promise<SessionTokenPayload> {
    const ref = redactToken(token);
    this.logger.debug(`[CustomerSession] token received: ${ref}`);

    if (!token || token.split(".").length !== 3) {
      this.logger.warn(`[CustomerSession] malformed token: ${ref}`);
      throw new BadRequestException("Malformed session token");
    }

    let payload: Record<string, unknown>;
    try {
      const result = await jwtVerify(token, this.secret);
      payload = result.payload;
    } catch (err) {
      if (err instanceof errors.JWTExpired) {
        this.logger.warn(`[CustomerSession] expired token: ${ref}`);
        throw new UnauthorizedException("Session token expired");
      }
      if (err instanceof errors.JOSEError) {
        this.logger.warn(`[CustomerSession] invalid token: ${ref} (${err.code})`);
        throw new UnauthorizedException("Invalid session token");
      }
      const message = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? err.stack : undefined;
      this.logger.error(`[CustomerSession] error verifying token ${ref}: ${message}`, stack);
      throw err;
    }

    const tableId = payload["tableId"];
    const restaurantId = payload["restaurantId"];
    if (typeof tableId !== "string" || typeof restaurantId !== "string") {
      this.logger.warn(`[CustomerSession] token decoded but missing tableId/restaurantId: ${ref}`);
      throw new UnauthorizedException("Invalid session token");
    }

    this.logger.debug(`[CustomerSession] token decoded: tableId=${tableId}, restaurantId=${restaurantId}`);
    return { tableId, restaurantId };
  }

  /** Verifies a kitchen display device token — signed the same way as session tokens, but with { restaurantId, type: "kitchen" }. */
  async verifyKitchenToken(token: string): Promise<KitchenTokenPayload> {
    const ref = redactToken(token);
    this.logger.debug(`[Kitchen] token received: ${ref}`);

    if (!token || token.split(".").length !== 3) {
      this.logger.warn(`[Kitchen] malformed token: ${ref}`);
      throw new BadRequestException("Malformed kitchen device token");
    }

    let payload: Record<string, unknown>;
    try {
      const result = await jwtVerify(token, this.secret);
      payload = result.payload;
    } catch (err) {
      if (err instanceof errors.JWTExpired) {
        this.logger.warn(`[Kitchen] expired token: ${ref}`);
        throw new UnauthorizedException("Kitchen device token expired");
      }
      if (err instanceof errors.JOSEError) {
        this.logger.warn(`[Kitchen] invalid token: ${ref} (${err.code})`);
        throw new UnauthorizedException("Invalid kitchen device token");
      }
      const message = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? err.stack : undefined;
      this.logger.error(`[Kitchen] error verifying token ${ref}: ${message}`, stack);
      throw err;
    }

    const restaurantId = payload["restaurantId"];
    const type = payload["type"];
    if (typeof restaurantId !== "string" || type !== "kitchen") {
      this.logger.warn(`[Kitchen] token decoded but missing restaurantId or wrong type: ${ref}`);
      throw new UnauthorizedException("Invalid kitchen device token");
    }

    this.logger.debug(`[Kitchen] token decoded: restaurantId=${restaurantId}`);
    return { restaurantId };
  }
}

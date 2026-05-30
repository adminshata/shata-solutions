import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Request } from "express";

// Mark routes as public with @Public()
export const IS_PUBLIC_KEY = "isPublic";
export const Public = () =>
  Reflect.metadata(IS_PUBLIC_KEY, true);

@Injectable()
export class ClerkGuard implements CanActivate {
  private jwksUrl: string;

  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService
  ) {
    // Clerk JWKS endpoint — verifies JWT signatures without calling Clerk on every request
    this.jwksUrl = "https://api.clerk.com/v1/jwks";
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("No auth token provided");
    }

    try {
      const JWKS = createRemoteJWKSet(new URL(this.jwksUrl));
      const { payload } = await jwtVerify(token, JWKS);
      request["user"] = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

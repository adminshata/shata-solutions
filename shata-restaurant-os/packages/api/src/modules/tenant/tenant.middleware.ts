import { Injectable, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    // Extract restaurantId from Clerk JWT claims (set by ClerkGuard)
    const user = req["user"] as Record<string, unknown> | undefined;
    if (user) {
      const restaurantId =
        (user["restaurantId"] as string) ??
        (user["org_metadata"] as Record<string, unknown>)?.["restaurantId"] as string;
      if (restaurantId) {
        req["restaurantId"] = restaurantId;
      }
    }
    next();
  }
}

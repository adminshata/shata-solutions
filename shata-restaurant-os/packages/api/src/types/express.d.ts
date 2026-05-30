import "express";

declare module "express" {
  interface Request {
    user?: Record<string, unknown>;
    restaurantId?: string;
  }
}

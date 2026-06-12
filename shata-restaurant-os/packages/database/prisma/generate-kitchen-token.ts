/**
 * Generates a kitchen display device token for a restaurant, signed with the
 * CURRENT SESSION_TOKEN_SECRET (e.g. Railway's production value).
 *
 * The kitchen app reads this token from the URL as /kitchen/[deviceToken].
 * It is forward-compatible with the same JWT scheme used for customer
 * session tokens (see generate-demo-token.ts) so that backend verification
 * can be added later without re-issuing tokens.
 *
 * Usage:
 *   SESSION_TOKEN_SECRET=<current-secret> npx ts-node prisma/generate-kitchen-token.ts [restaurantId]
 *
 * Defaults to demo-restaurant-1 if no restaurantId is given.
 */
import { PrismaClient } from "../generated/client";
import { SignJWT } from "jose";
import { TextEncoder } from "util";

const prisma = new PrismaClient();

async function main() {
  const sessionSecret = process.env["SESSION_TOKEN_SECRET"];
  if (!sessionSecret || sessionSecret.length < 32) {
    console.error("SESSION_TOKEN_SECRET env var must be set to the API's current secret (>= 32 chars).");
    process.exit(1);
  }

  const restaurantId = process.argv[2] ?? "demo-restaurant-1";

  const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
  if (!restaurant) {
    console.error(`Restaurant "${restaurantId}" not found. Run "npm run db:seed" first.`);
    process.exit(1);
  }

  const secret = new TextEncoder().encode(sessionSecret);
  const token = await new SignJWT({ restaurantId: restaurant.id, type: "kitchen" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(secret);

  const kitchenAppUrl = process.env["KITCHEN_APP_URL"] ?? "https://shata-kitchen.vercel.app";

  console.warn(`\nKitchen device token for ${restaurant.name} (${restaurant.id}):`);
  console.warn(token);
  console.warn(`\nKitchen display URL:`);
  console.warn(`${kitchenAppUrl}/kitchen/${token}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

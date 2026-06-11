/**
 * Regenerates a valid customer session token for a demo table, signed with
 * the CURRENT SESSION_TOKEN_SECRET (e.g. Railway's production value).
 *
 * Use this when the demo QR/session link returns 401 because it was signed
 * with a different SESSION_TOKEN_SECRET than the one the API is running with.
 *
 * Usage:
 *   SESSION_TOKEN_SECRET=<current-secret> npx ts-node prisma/generate-demo-token.ts [tableId]
 *
 * Defaults to demo-table-1 if no tableId is given.
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

  const tableId = process.argv[2] ?? "demo-table-1";

  const table = await prisma.table.findUnique({ where: { id: tableId } });
  if (!table) {
    console.error(`Table "${tableId}" not found. Run "npm run db:seed" first.`);
    process.exit(1);
  }

  const secret = new TextEncoder().encode(sessionSecret);
  const token = await new SignJWT({ tableId: table.id, restaurantId: table.restaurantId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(secret);

  const customerAppUrl = process.env["CUSTOMER_APP_URL"] ?? "https://shata-solutions-o5bo.vercel.app";

  console.warn(`\nRegenerated session token for ${table.id} (restaurant ${table.restaurantId}):`);
  console.warn(token);
  console.warn(`\nCustomer URL:`);
  console.warn(`${customerAppUrl}/t/${token}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

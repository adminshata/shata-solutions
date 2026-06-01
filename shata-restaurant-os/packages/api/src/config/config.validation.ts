import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("3001"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().optional(),
  REDIS_URL: z.string().min(1, "REDIS_URL is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  SESSION_TOKEN_SECRET: z.string().min(32, "SESSION_TOKEN_SECRET must be at least 32 characters"),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  PAYMOB_API_KEY: z.string().optional(),
  PAYMOB_INTEGRATION_ID_CARD: z.string().optional(),
  PAYMOB_INTEGRATION_ID_WALLET: z.string().optional(),
  PAYMOB_INTEGRATION_ID_INSTAPAY: z.string().optional(),
  PAYMOB_HMAC_SECRET: z.string().optional(),
  PAYMOB_IFRAME_ID: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  ONESIGNAL_APP_ID: z.string().optional(),
  ONESIGNAL_API_KEY: z.string().optional(),
  PRINTER_DEFAULT_IP: z.string().optional(),
  PRINTER_DEFAULT_PORT: z.string().default("9100"),
  CLOUDFLARE_R2_ENDPOINT: z.string().optional(),
  CLOUDFLARE_R2_ACCESS_KEY: z.string().optional(),
  CLOUDFLARE_R2_SECRET_KEY: z.string().optional(),
  CLOUDFLARE_R2_BUCKET: z.string().default("shata-media"),
  CLOUDFLARE_R2_PUBLIC_URL: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  SENTRY_RELEASE: z.string().optional(),
  THROTTLE_TTL_SECONDS: z.string().default("60"),
  THROTTLE_LIMIT: z.string().default("120"),
});

export function validateConfig(config: Record<string, unknown>) {
  const result = configSchema.safeParse(config);
  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.flatten().fieldErrors);
    throw new Error("Invalid environment configuration. Check .env file.");
  }
  return result.data;
}

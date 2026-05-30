import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  nodeEnv: process.env["NODE_ENV"] ?? "development",
  port: parseInt(process.env["PORT"] ?? "3001", 10),
  jwtSecret: process.env["JWT_SECRET"] ?? "",
  sessionTokenSecret: process.env["SESSION_TOKEN_SECRET"] ?? "",
  databaseUrl: process.env["DATABASE_URL"] ?? "",
  redisUrl: process.env["REDIS_URL"] ?? "",
  stripe: {
    secretKey: process.env["STRIPE_SECRET_KEY"] ?? "",
    webhookSecret: process.env["STRIPE_WEBHOOK_SECRET"] ?? "",
  },
  paymob: {
    apiKey: process.env["PAYMOB_API_KEY"] ?? "",
    integrationIdCard: process.env["PAYMOB_INTEGRATION_ID_CARD"] ?? "",
    integrationIdWallet: process.env["PAYMOB_INTEGRATION_ID_WALLET"] ?? "",
    integrationIdInstapay: process.env["PAYMOB_INTEGRATION_ID_INSTAPAY"] ?? "",
    hmacSecret: process.env["PAYMOB_HMAC_SECRET"] ?? "",
    iframeId: process.env["PAYMOB_IFRAME_ID"] ?? "",
  },
  anthropic: {
    apiKey: process.env["ANTHROPIC_API_KEY"] ?? "",
  },
  onesignal: {
    appId: process.env["ONESIGNAL_APP_ID"] ?? "",
    apiKey: process.env["ONESIGNAL_API_KEY"] ?? "",
  },
  printer: {
    defaultIp: process.env["PRINTER_DEFAULT_IP"] ?? "",
    defaultPort: parseInt(process.env["PRINTER_DEFAULT_PORT"] ?? "9100", 10),
  },
  cloudflare: {
    r2Endpoint: process.env["CLOUDFLARE_R2_ENDPOINT"] ?? "",
    r2AccessKey: process.env["CLOUDFLARE_R2_ACCESS_KEY"] ?? "",
    r2SecretKey: process.env["CLOUDFLARE_R2_SECRET_KEY"] ?? "",
    r2Bucket: process.env["CLOUDFLARE_R2_BUCKET"] ?? "shata-media",
    r2PublicUrl: process.env["CLOUDFLARE_R2_PUBLIC_URL"] ?? "",
  },
}));

import "./instrument"; // Sentry — must be first
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import compression from "compression";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Pino structured logger
  app.useLogger(app.get(Logger));

  // CORS — must be configured before helmet so preflight responses are never
  // affected by other security middleware. Reads ALLOWED_ORIGINS env var
  // (comma-separated); falls back to the known production frontends if the
  // env var is missing or empty.
  const fallbackAllowedOrigins = [
    "https://shata-solutions-o5bo.vercel.app",
    "https://shata-dashboard.vercel.app",
    "https://shata-kitchen.vercel.app",
    "https://shata-admin.vercel.app",
    // Local customer-app dev server — UI review against the production API
    "http://localhost:3010",
    "http://127.0.0.1:3010",
  ];
  const envOrigins = (process.env["ALLOWED_ORIGINS"] ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const allowedOrigins = envOrigins.length > 0 ? envOrigins : fallbackAllowedOrigins;

  app.enableCors({
    origin:
      process.env["NODE_ENV"] === "production"
        ? (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
          }
        : true,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Idempotency-Key", "idempotency-key"],
  });

  // Security headers — CORP disabled entirely so it can never block
  // cross-origin requests from the customer/dashboard/kitchen/admin apps.
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "wss:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }));

  // Response compression — reduces payload size by 60-80%
  app.use(compression());

  // API versioning
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  // Global prefix
  app.setGlobalPrefix("api");

  // Global validation pipe — strips unknown, whitelists, transforms
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  // Swagger — dev/staging only
  if (process.env["NODE_ENV"] !== "production") {
    const config = new DocumentBuilder()
      .setTitle("Shata Restaurant OS API")
      .setDescription("Tap. Order. Pay. Done.")
      .setVersion("1.0")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
  }

  const port = parseInt(process.env["PORT"] ?? "3014", 10);
  await app.listen(port, "0.0.0.0");
  console.warn(`🚀 Shata API running on http://localhost:${port}/api`);
  if (process.env["NODE_ENV"] !== "production") {
    console.warn(`📖 Swagger docs at http://localhost:${port}/api/docs`);
  }
}

bootstrap().catch(console.error);

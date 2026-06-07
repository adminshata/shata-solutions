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

  // Security headers
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
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }));

  // Response compression — reduces payload size by 60-80%
  app.use(compression());

  // CORS — supports ALLOWED_ORIGINS env var (comma-separated) or individual URL vars
  const allowedOrigins = process.env["ALLOWED_ORIGINS"]
    ? process.env["ALLOWED_ORIGINS"].split(",").map((o) => o.trim()).filter(Boolean)
    : [
        process.env["CUSTOMER_APP_URL"] ?? "",
        process.env["DASHBOARD_URL"] ?? "",
        process.env["KITCHEN_URL"] ?? "",
        process.env["ADMIN_URL"] ?? "",
      ].filter(Boolean);

  app.enableCors({
    origin: process.env["NODE_ENV"] === "production" ? allowedOrigins : true,
    credentials: true,
  });

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

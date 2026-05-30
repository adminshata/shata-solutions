import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Pino structured logger
  app.useLogger(app.get(Logger));

  // CORS — restrict origins in production
  app.enableCors({
    origin: process.env["NODE_ENV"] === "production"
      ? [
          process.env["CUSTOMER_APP_URL"] ?? "",
          process.env["DASHBOARD_URL"] ?? "",
          process.env["KITCHEN_URL"] ?? "",
          process.env["ADMIN_URL"] ?? "",
        ].filter(Boolean)
      : true,
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

  const port = parseInt(process.env["PORT"] ?? "3001", 10);
  await app.listen(port);
  console.warn(`🚀 Shata API running on http://localhost:${port}/api`);
  if (process.env["NODE_ENV"] !== "production") {
    console.warn(`📖 Swagger docs at http://localhost:${port}/api/docs`);
  }
}

bootstrap().catch(console.error);

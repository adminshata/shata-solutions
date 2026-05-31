import * as Sentry from "@sentry/nestjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// Must be imported before any other code
Sentry.init({
  dsn: process.env["SENTRY_DSN"] ?? "",
  environment: process.env["NODE_ENV"] ?? "development",
  release: process.env["SENTRY_RELEASE"] ?? process.env["npm_package_version"] ?? "1.0.0",
  tracesSampleRate: process.env["NODE_ENV"] === "production" ? 0.1 : 1.0,
  profilesSampleRate: process.env["NODE_ENV"] === "production" ? 0.1 : 1.0,
  integrations: [nodeProfilingIntegration()],
  enabled: !!process.env["SENTRY_DSN"],
});

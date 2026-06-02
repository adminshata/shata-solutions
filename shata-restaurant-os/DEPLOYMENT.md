# Shata Restaurant OS — Deployment Guide

## Services Required

| Service | Provider | Purpose |
|---------|----------|---------|
| PostgreSQL | Supabase | Primary database |
| Redis | Upstash | Queue, cache, sessions |
| Media Storage | Cloudflare R2 | Product images, logos |
| API | Railway | NestJS backend |
| Customer App | Vercel | Next.js PWA |
| Dashboard | Vercel | Next.js management app |
| Kitchen | Vercel | Next.js KDS |
| Admin | Vercel | Next.js platform admin |
| Auth | Clerk | Staff authentication |
| Error Monitoring | Sentry | Error tracking + profiling |
| Push Notifications | OneSignal | Order + call alerts |

---

## Environment Variables — API (Railway)

```bash
# Database (Supabase)
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[password]@[host]:5432/postgres

# Redis (Upstash)
REDIS_URL=rediss://default:[password]@[host]:6380

# Auth (Clerk)
CLERK_SECRET_KEY=sk_live_...
CLERK_JWKS_URL=https://[subdomain].clerk.accounts.dev/.well-known/jwks.json

# Payments
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYMOB_API_KEY=...
PAYMOB_INTEGRATION_ID_CARD=...
PAYMOB_INTEGRATION_ID_WALLET=...
PAYMOB_INTEGRATION_ID_INSTAPAY=...
PAYMOB_HMAC_SECRET=...
PAYMOB_IFRAME_ID=...
FAWRY_MERCHANT_CODE=...
FAWRY_SECURITY_KEY=...
TABBY_API_KEY=...
TABBY_WEBHOOK_SECRET=...
TAMARA_API_TOKEN=...
TAMARA_NOTIFICATION_KEY=...

# Storage (Cloudflare R2)
CLOUDFLARE_R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY=...
CLOUDFLARE_R2_SECRET_KEY=...
CLOUDFLARE_R2_BUCKET=shata-media
CLOUDFLARE_R2_PUBLIC_URL=https://media.shataos.com

# Monitoring
SENTRY_DSN=https://...@sentry.io/...
SENTRY_RELEASE=1.0.0

# Push Notifications
ONESIGNAL_APP_ID=...
ONESIGNAL_API_KEY=...

# AI
ANTHROPIC_API_KEY=sk-ant-...

# Security
JWT_SECRET=[min 64 chars, run: openssl rand -base64 64]
SESSION_TOKEN_SECRET=[min 64 chars, run: openssl rand -base64 64]

# App
NODE_ENV=production
PORT=3004

# CORS Origins
CUSTOMER_APP_URL=https://order.shataos.com
DASHBOARD_URL=https://dashboard.shataos.com
KITCHEN_URL=https://kitchen.shataos.com
ADMIN_URL=https://admin.shataos.com
```

## Environment Variables — Customer App (Vercel)

```bash
NEXT_PUBLIC_API_URL=https://api.shataos.com
NEXT_PUBLIC_WS_URL=wss://api.shataos.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_INSTAPAY_ACCOUNT=restaurant@instapay
```

## Environment Variables — Dashboard (Vercel)

```bash
NEXT_PUBLIC_API_URL=https://api.shataos.com
NEXT_PUBLIC_WS_URL=wss://api.shataos.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
CLERK_SECRET_KEY=sk_live_...
```

---

## Deployment Steps

### 1. Supabase Setup
```bash
# Create project at supabase.com
# Copy DATABASE_URL (pooler) and DIRECT_URL (direct connection)
# Enable connection pooling (PgBouncer) for DATABASE_URL
```

### 2. Upstash Redis Setup
```bash
# Create database at upstash.com → REST disabled, TLS enabled
# Copy REDIS_URL (starts with rediss://)
```

### 3. Cloudflare R2 Setup
```bash
# Create R2 bucket: shata-media
# Create API token with R2 read+write
# Configure custom domain for public access: media.shataos.com
```

### 4. Railway API Deploy
```bash
# Connect GitHub repo in Railway
# Set root directory: shata-restaurant-os/packages/api
# Set all API env vars
# Railway auto-detects railway.json and runs: node dist/main
```

### 5. Run Migrations (first deploy)
```bash
# In Railway → Shell:
cd packages/database && npx prisma migrate deploy
```

### 6. Vercel Apps Deploy
```bash
# Deploy each app separately in Vercel
# Set root directory per app (e.g. shata-restaurant-os/apps/customer-app)
# Set env vars per app
vercel --prod
```

### 7. DNS Configuration
```
order.shataos.com      → Vercel (customer app)
dashboard.shataos.com  → Vercel (dashboard)
kitchen.shataos.com    → Vercel (kitchen)
admin.shataos.com      → Vercel (admin)
api.shataos.com        → Railway (API)
media.shataos.com      → Cloudflare R2 custom domain
```

### 8. Post-Deploy Verification
```bash
# Health check
curl https://api.shataos.com/api/health

# Verify DB tables
curl https://api.shataos.com/api/v1/health

# Test customer app
open https://order.shataos.com
```

---

## Rollback Procedure

```bash
# 1. Find last good Railway deployment → click "Rollback"
# 2. Or redeploy previous git tag:
git tag v1.0.0-stable
railway up --detach

# 3. If schema migration caused issues:
cd packages/database
npx prisma migrate resolve --rolled-back [migration-name]
# Then fix and re-deploy
```

---

## Monitoring Setup

### Sentry
- Create project at sentry.io
- Add `SENTRY_DSN` to Railway env vars
- Configure alerts for: `payment.*` errors, p95 > 2s

### UptimeRobot
- Monitor: `https://api.shataos.com/api/health` every 5 min
- Alert email + SMS on downtime

### Vercel Analytics
- Enable in Vercel dashboard per app
- Custom events already tracked via PostHog

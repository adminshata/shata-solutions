# SHATA SMART RESTAURANT OS
## Claude Code — Master Build Prompt v2.0
### Powered by Shata Global LLC

---

> **How to use:** Paste this entire prompt into Claude Code (CLI or claude.ai/code).
> Claude Code will scaffold, architect, and build the full system iteratively.
> Work through one phase at a time. Commit after each milestone.

---

## IDENTITY & MISSION

You are the **CTO and Lead Engineer** of Shata Smart Restaurant OS — a mobile-first, NFC-first, cashless-first Restaurant Operating System for cafes, restaurants, lounges, beach clubs, and food courts **worldwide**.

Your mission: Build a production-grade, scalable SaaS platform that lets any restaurant — anywhere in the world — go fully digital and cashless in under 30 minutes, with zero hardware dependency.

**Core philosophy:** `Tap → Order → Pay → Track → Repeat`

**Main tagline:** `Tap. Order. Pay. Done.`

---

## PRODUCT OVERVIEW

### What We Are Building

A Restaurant Operating System with these applications:

1. **Customer Ordering PWA** — QR/NFC → menu → cart → payment → live tracking
2. **Restaurant Dashboard** — Live orders, table management, menu management, analytics
3. **Kitchen Display System (KDS)** — Real-time order display for kitchen staff
4. **SaaS Admin Platform** — Merchant management, billing, support
5. **Shared API** — NestJS modular monolith backing all applications

### What We Are NOT Building in MVP

- Delivery orders (different operational model)
- Full loyalty system (Phase 2)
- AI features (Phase 2 minimum — need 100K orders first)
- Inventory / ERP / Payroll
- Franchise management UI (data model ready, UI in Phase 2)
- Group ordering / Split bill (Phase 2)
- Hardware sales

---

## TECHNICAL ARCHITECTURE

### Stack (Strict — Do Not Deviate)

```
Frontend:     Next.js 14 (App Router) + TypeScript + Tailwind CSS
Components:   shadcn/ui (Radix UI primitives, fully owned source)
Animations:   Framer Motion (order tracking screen especially)
PWA:          next-pwa or custom Service Worker
RTL:          Full Arabic RTL support as first-class UI paradigm
i18n:         next-intl — support EN, AR out of the box; any language addable

Backend:      NestJS (Node.js) — Modular Monolith
Language:     TypeScript (strict mode, no any)
ORM:          Prisma
Validation:   class-validator + class-transformer (NestJS DTOs)

Database:     PostgreSQL (Supabase for managed hosting)
Cache:        Redis (Upstash serverless for MVP)
Real-time:    Socket.io with Redis adapter
Queue:        BullMQ (backed by Redis, Phase 1.5+)
Events:       NestJS EventEmitter2 (Phase 1), BullMQ (Phase 2)

Auth:         Clerk (restaurant staff + admin)
Customer auth: Phone OTP (optional, not required for basic ordering)

Payments:     Stripe (primary — global coverage, cards, wallets, local methods)
              Paymob (regional add-on — Egypt / MENA)
              Fawry (regional add-on — Egypt)
              Tabby / Tamara (regional add-on — Gulf)
              Abstraction layer mandatory — never call providers directly
              Currency and provider selected per restaurant settings

Media:        Cloudflare R2 (S3-compatible, cheap egress)
Monitoring:   Sentry (errors) + Pino (structured logging)
Analytics:    PostHog

Frontend host: Vercel (Next.js zero-config)
Backend host:  Railway (MVP) → Fly.io (scale)
CI/CD:         GitHub Actions
```

### Repository Structure

```
shata/
├── apps/
│   ├── customer-app/          # Next.js PWA — customer ordering
│   ├── dashboard/             # Next.js — restaurant management dashboard
│   ├── kitchen/               # Next.js — kitchen display system
│   └── admin/                 # Next.js — SaaS admin platform
├── packages/
│   ├── api/                   # NestJS modular monolith (all apps share this)
│   ├── database/              # Prisma schema + migrations + seeds
│   ├── ui/                    # Shared shadcn/ui component library
│   ├── types/                 # Shared TypeScript types/interfaces
│   └── config/                # Shared configs (ESLint, Tailwind, TypeScript)
├── .github/
│   └── workflows/             # CI/CD pipelines
├── docker-compose.yml         # Local development (Postgres + Redis)
└── turbo.json                 # Turborepo config
```

Use **Turborepo** for monorepo management.

---

## DATABASE SCHEMA (Prisma)

Implement the complete schema. Every tenant table must include `restaurantId`. Enable PostgreSQL Row-Level Security (RLS) at the database level.

```prisma
// Core tenant hierarchy
model Organization {
  id            String       @id @default(cuid())
  name          String
  plan          PlanType     @default(STARTER)
  billingStatus String       @default("active")
  createdAt     DateTime     @default(now())
  restaurants   Restaurant[]
  subscription  Subscription?
}

model Restaurant {
  id           String       @id @default(cuid())
  orgId        String
  org          Organization @relation(fields: [orgId], references: [id])
  name         String
  branchCode   String?
  // Localization — set per restaurant, never hardcoded globally
  currency     String       @default("USD")   // ISO 4217: USD, EGP, AED, GBP, EUR…
  locale       String       @default("en")    // BCP-47: en, ar, fr, tr…
  timezone     String       @default("UTC")   // IANA tz: America/New_York, Africa/Cairo…
  taxRate      Decimal      @db.Decimal(5, 4) @default(0) // e.g. 0.14 = 14%, 0.05 = 5%
  taxLabel     String       @default("Tax")  // "VAT", "GST", "Sales Tax", "ضريبة القيمة المضافة"…
  taxInclusive Boolean      @default(false)  // true = prices already include tax
  settings     Json         @default("{}")
  createdAt    DateTime     @default(now())
  tables       Table[]
  sessions     Session[]
  categories   Category[]
  products     Product[]
  orders       Order[]
  staff        Staff[]
  kitchenTickets KitchenTicket[]
  transactions Transaction[]
}

model Table {
  id           String    @id @default(cuid())
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  number       String
  qrCode       String    @unique
  nfcId        String?   @unique
  status       TableStatus @default(AVAILABLE)
  sessions     Session[]
}

model Session {
  id           String    @id @default(cuid())
  tableId      String
  table        Table     @relation(fields: [tableId], references: [id])
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  status       SessionStatus @default(ACTIVE)
  openedAt     DateTime  @default(now())
  closedAt     DateTime?
  orders       Order[]
}

model Category {
  id           String    @id @default(cuid())
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  name         String
  nameAr       String?
  sortOrder    Int       @default(0)
  availableFrom String?  // "09:00"
  availableTo  String?   // "22:00"
  isAvailable  Boolean   @default(true)
  products     Product[]
}

model Product {
  id            String    @id @default(cuid())
  restaurantId  String
  restaurant    Restaurant @relation(fields: [restaurantId], references: [id])
  categoryId    String
  category      Category  @relation(fields: [categoryId], references: [id])
  name          String
  nameAr        String?
  description   String?
  descriptionAr String?
  price         Decimal   @db.Decimal(10, 2)
  imageUrl      String?
  isAvailable   Boolean   @default(true)
  sortOrder     Int       @default(0)
  modifierGroups ModifierGroup[]
  orderItems    OrderItem[]
}

model ModifierGroup {
  id         String     @id @default(cuid())
  productId  String
  product    Product    @relation(fields: [productId], references: [id])
  name       String
  nameAr     String?
  type       ModifierType // SINGLE | MULTI
  required   Boolean    @default(false)
  minSelect  Int        @default(0)
  maxSelect  Int        @default(1)
  options    ModifierOption[]
}

model ModifierOption {
  id              String        @id @default(cuid())
  modifierGroupId String
  modifierGroup   ModifierGroup @relation(fields: [modifierGroupId], references: [id])
  name            String
  nameAr          String?
  priceDelta      Decimal       @db.Decimal(10, 2) @default(0)
}

model Order {
  id           String      @id @default(cuid())
  sessionId    String?
  session      Session?    @relation(fields: [sessionId], references: [id])
  restaurantId String
  restaurant   Restaurant  @relation(fields: [restaurantId], references: [id])
  customerId   String?
  status       OrderStatus @default(PENDING)
  type         OrderType   @default(DINE_IN)
  currency     String      // Copied from restaurant at order time — never changes
  subtotal     Decimal     @db.Decimal(10, 2)
  tax          Decimal     @db.Decimal(10, 2) @default(0)
  total        Decimal     @db.Decimal(10, 2)
  notes        String?
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
  items        OrderItem[]
  payment      PaymentIntent?
  kitchenTicket KitchenTicket?
}

model OrderItem {
  id              String   @id @default(cuid())
  orderId         String
  order           Order    @relation(fields: [orderId], references: [id])
  productId       String
  product         Product  @relation(fields: [productId], references: [id])
  quantity        Int
  unitPrice       Decimal  @db.Decimal(10, 2)
  totalPrice      Decimal  @db.Decimal(10, 2)
  notes           String?
  selectedOptions OrderItemModifier[]
}

model OrderItemModifier {
  id               String        @id @default(cuid())
  orderItemId      String
  orderItem        OrderItem     @relation(fields: [orderItemId], references: [id])
  modifierOptionId String
  priceDelta       Decimal       @db.Decimal(10, 2)
}

model PaymentIntent {
  id              String          @id @default(cuid())
  orderId         String          @unique
  order           Order           @relation(fields: [orderId], references: [id])
  provider        PaymentProvider
  providerRef     String?
  amount          Decimal         @db.Decimal(10, 2)
  currency        String          // ISO 4217
  status          PaymentStatus   @default(PENDING)
  metadata        Json?
  createdAt       DateTime        @default(now())
  settledAt       DateTime?
}

model Transaction {
  id           String    @id @default(cuid())
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  type         TransactionType
  amount       Decimal   @db.Decimal(10, 2)
  currency     String    // ISO 4217
  fee          Decimal   @db.Decimal(10, 2) @default(0)
  net          Decimal   @db.Decimal(10, 2)
  refId        String?
  createdAt    DateTime  @default(now())
}

model KitchenTicket {
  id            String       @id @default(cuid())
  orderId       String       @unique
  order         Order        @relation(fields: [orderId], references: [id])
  restaurantId  String
  restaurant    Restaurant   @relation(fields: [restaurantId], references: [id])
  station       String?
  status        TicketStatus @default(PENDING)
  priority      Int          @default(0)
  prepStartedAt DateTime?
  readyAt       DateTime?
  createdAt     DateTime     @default(now())
}

model Staff {
  id           String    @id @default(cuid())
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  clerkUserId  String    @unique
  name         String
  role         StaffRole
  isActive     Boolean   @default(true)
  createdAt    DateTime  @default(now())
}

model Customer {
  id             String          @id @default(cuid())
  phone          String          @unique
  name           String?
  email          String?
  createdAt      DateTime        @default(now())
  loyaltyAccounts LoyaltyAccount[]
}

model LoyaltyAccount {
  id            String    @id @default(cuid())
  customerId    String
  customer      Customer  @relation(fields: [customerId], references: [id])
  restaurantId  String
  points        Int       @default(0)
  walletBalance Decimal   @db.Decimal(10, 2) @default(0)
  currency      String    // Must match the restaurant's currency
  createdAt     DateTime  @default(now())
  transactions  LoyaltyTransaction[]
}

model LoyaltyTransaction {
  id               String         @id @default(cuid())
  loyaltyAccountId String
  loyaltyAccount   LoyaltyAccount @relation(fields: [loyaltyAccountId], references: [id])
  type             LoyaltyTxType
  pointsDelta      Int
  refOrderId       String?
  createdAt        DateTime       @default(now())
}

model Subscription {
  id                     String       @id @default(cuid())
  orgId                  String       @unique
  org                    Organization @relation(fields: [orgId], references: [id])
  planType               PlanType
  status                 SubStatus    @default(ACTIVE)
  currentPeriodStart     DateTime
  currentPeriodEnd       DateTime
  providerSubscriptionId String?
  createdAt              DateTime     @default(now())
}

// ── Enums ─────────────────────────────────────────────
enum PlanType        { STARTER GROWTH ENTERPRISE }
enum TableStatus     { AVAILABLE OCCUPIED RESERVED MAINTENANCE }
enum SessionStatus   { ACTIVE CLOSED ABANDONED }
enum OrderStatus     { PENDING CONFIRMED PREPARING COOKING READY SERVED CANCELLED REFUNDED }
enum OrderType       { DINE_IN PICKUP DELIVERY }
enum PaymentProvider { STRIPE PAYMOB FAWRY TABBY TAMARA INSTAPAY MANUAL }
enum PaymentStatus   { PENDING PROCESSING COMPLETED FAILED REFUNDED }
enum TransactionType { PAYMENT REFUND FEE PAYOUT }
enum TicketStatus    { PENDING IN_PROGRESS READY SERVED }
enum ModifierType    { SINGLE MULTI }
enum StaffRole       { OWNER MANAGER CASHIER KITCHEN WAITER }
enum LoyaltyTxType   { EARN REDEEM REFUND ADJUSTMENT }
enum SubStatus       { ACTIVE CANCELLED PAST_DUE TRIALING }
```

---

## API ARCHITECTURE (NestJS Modules)

### Module Structure

```
packages/api/src/
├── app.module.ts
├── modules/
│   ├── auth/             # Clerk JWT validation, guards, decorators
│   ├── tenant/           # Tenant context injection middleware
│   ├── restaurants/      # Restaurant CRUD, settings
│   ├── tables/           # Table management, QR/NFC generation
│   ├── sessions/         # Table session lifecycle
│   ├── menu/             # Categories, products, modifiers
│   ├── orders/           # Order placement, status, history
│   ├── payments/         # Payment abstraction + provider integrations
│   ├── kitchen/          # KDS, ticket management
│   ├── analytics/        # Reports, metrics, exports
│   ├── loyalty/          # Points, wallet, transactions
│   ├── notifications/    # Push, SSE, email
│   ├── staff/            # Staff management, roles
│   └── admin/            # SaaS admin — merchant management
└── shared/
    ├── database/         # Prisma service
    ├── redis/            # Redis service
    ├── events/           # EventEmitter2 setup
    ├── queue/            # BullMQ setup (Phase 1.5)
    ├── realtime/         # Socket.io gateway setup
    ├── storage/          # Cloudflare R2 client
    ├── tax/              # Tax calculation service (rate + inclusive/exclusive)
    ├── currency/         # Currency formatting per locale
    └── utils/            # Pagination, filters, transforms
└── config/               # Environment config, validation
```

### Key API Endpoints to Implement

#### Customer-Facing (Public / OTP-authenticated)
```
GET  /api/sessions/:token          # Load table session + restaurant info
GET  /api/sessions/:token/menu     # Load menu (cached aggressively)
POST /api/sessions/:token/orders   # Place order
GET  /api/orders/:id               # Get order status
GET  /api/orders/:id/stream        # SSE stream for live status updates
POST /api/payments/intent          # Create payment intent
POST /api/payments/webhook/:provider # Payment provider webhook
```

#### Restaurant Dashboard (Clerk-authenticated, scoped to restaurant)
```
GET  /api/dashboard/orders/live    # Live orders with real-time updates
GET  /api/dashboard/orders         # Order history with filters
PATCH /api/dashboard/orders/:id    # Update order status
POST /api/dashboard/orders/:id/void # Void/cancel order
POST /api/dashboard/orders/:id/refund # Initiate refund

GET  /api/dashboard/tables         # Table map
PATCH /api/dashboard/tables/:id    # Update table status
POST /api/dashboard/tables/:id/close-session # Close active session
POST /api/dashboard/tables/:id/regenerate-qr # New QR code

GET  /api/dashboard/menu           # Full menu tree
POST /api/dashboard/menu/categories
PUT  /api/dashboard/menu/categories/:id
POST /api/dashboard/menu/products
PUT  /api/dashboard/menu/products/:id
PATCH /api/dashboard/menu/products/:id/toggle

GET  /api/dashboard/analytics/overview  # Revenue, orders, top products
GET  /api/dashboard/analytics/peak-hours
GET  /api/dashboard/analytics/z-report  # End of day report (PDF)

GET  /api/dashboard/staff
POST /api/dashboard/staff
```

#### Kitchen (Device token authenticated)
```
GET  /api/kitchen/tickets/active   # Current active tickets
PATCH /api/kitchen/tickets/:id     # Update ticket status
# WebSocket namespace: /kitchen
# Events: new_ticket, ticket_updated, ticket_ready
```

#### Admin (Platform admin only)
```
GET  /api/admin/merchants
GET  /api/admin/merchants/:id
PATCH /api/admin/merchants/:id/plan
GET  /api/admin/analytics
```

---

## REAL-TIME ARCHITECTURE

### WebSocket Gateway (Kitchen + Dashboard)

```typescript
// Implement in modules/realtime/kitchen.gateway.ts
@WebSocketGateway({ namespace: '/kitchen', cors: true })
export class KitchenGateway implements OnGatewayInit, OnGatewayConnection {
  
  @SubscribeMessage('join_restaurant')
  handleJoin(client: Socket, payload: { restaurantId: string; stationId?: string }) {
    client.join(`restaurant:${payload.restaurantId}`);
    if (payload.stationId) {
      client.join(`station:${payload.stationId}`);
    }
  }

  emitNewTicket(restaurantId: string, ticket: KitchenTicketDto) {
    this.server.to(`restaurant:${restaurantId}`).emit('new_ticket', ticket);
  }

  emitTicketUpdate(restaurantId: string, ticket: KitchenTicketDto) {
    this.server.to(`restaurant:${restaurantId}`).emit('ticket_updated', ticket);
  }
}
```

Use `@socket.io/redis-adapter` so multiple API instances share WebSocket state.

### Server-Sent Events (Customer Order Tracking)

```typescript
@Get(':id/stream')
@Sse()
orderStatusStream(@Param('id') orderId: string): Observable<MessageEvent> {
  return this.ordersService.createStatusStream(orderId).pipe(
    map(status => ({ data: JSON.stringify({ status, orderId }) }))
  );
}
```

---

## PAYMENT ABSTRACTION

Implement the full payment provider abstraction. This is non-negotiable.

```typescript
// packages/api/src/modules/payments/providers/payment-provider.interface.ts
export interface IPaymentProvider {
  createIntent(dto: CreateIntentDto): Promise<PaymentIntentResult>;
  confirmPayment(intentId: string): Promise<PaymentResult>;
  refund(intentId: string, amount?: number): Promise<RefundResult>;
  parseWebhookEvent(payload: Buffer, signature: string): WebhookEvent;
  getProviderName(): string;
  getSupportedCurrencies(): string[]; // each provider declares what it can handle
}

// Provider implementations (pluggable — add any regional provider without touching core logic):
// - StripeProvider      → global (USD, EUR, GBP, AED, SAR, EGP, 135+ currencies)
// - PaymobProvider      → Egypt / MENA (EGP, USD)
// - FawryProvider       → Egypt (EGP)
// - TabbyProvider       → Gulf BNPL (AED, SAR, KWD, BHD)
// - TamaraProvider      → Gulf BNPL (AED, SAR)

// PaymentService selects provider based on restaurant.settings.preferredProvider
// Falls back to Stripe if preferred provider doesn't support the order currency
// All webhook handlers must be IDEMPOTENT
// Always reconcile payment status on schedule — never trust webhooks alone
```

---

## TAX & CURRENCY SERVICE

Tax rates, labels, and currencies differ by country. **Never hardcode them.**

```typescript
// shared/tax/tax.service.ts
@Injectable()
export class TaxService {
  calculate(subtotal: Decimal, restaurant: Restaurant): TaxResult {
    const rate = restaurant.taxRate;       // e.g. 0.14, 0.05, 0.10, 0
    const inclusive = restaurant.taxInclusive;

    if (inclusive) {
      // Price already includes tax — extract it
      const tax = subtotal.mul(rate).div(new Decimal(1).add(rate));
      return { subtotal: subtotal.sub(tax), tax, total: subtotal };
    } else {
      const tax = subtotal.mul(rate);
      return { subtotal, tax, total: subtotal.add(tax) };
    }
  }
}

// Examples configured per restaurant during onboarding:
// Egypt:         taxRate=0.14, taxLabel="VAT",       taxInclusive=false
// UAE:           taxRate=0.05, taxLabel="VAT",        taxInclusive=false
// Saudi Arabia:  taxRate=0.15, taxLabel="VAT",        taxInclusive=false
// USA:           taxRate=0.08, taxLabel="Sales Tax",  taxInclusive=false
// UK:            taxRate=0.20, taxLabel="VAT",        taxInclusive=true
// Germany:       taxRate=0.19, taxLabel="MwSt",       taxInclusive=true
// No tax:        taxRate=0.00, taxLabel="",           taxInclusive=false

// Currency displayed using Intl.NumberFormat(restaurant.locale, { style: 'currency', currency: restaurant.currency })
// Never format currency with hardcoded symbols (no "$" or "EGP" strings in UI code)
```

---

## SECURITY REQUIREMENTS

```typescript
// 1. Tenant isolation middleware — inject restaurantId from JWT into every request
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const restaurantId = this.extractRestaurantId(req); // from Clerk JWT claims
    req['restaurantId'] = restaurantId;
    next();
  }
}

// 2. Rate limiting per restaurant
// Use @nestjs/throttler with custom storage keyed by restaurantId

// 3. QR codes use signed JWT tokens, NOT raw table IDs
// QR URL: order.shata.app/t/[jwt-signed-token]
// Token payload: { tableId, restaurantId, exp: 24h }
// Rotate after session closes

// 4. Payment intents are SERVER-created only
// Client NEVER constructs payment amount — always server-validated

// 5. Correlation IDs on every request
app.use(correlationIdMiddleware);

// 6. Structured logging with Pino — INFO in prod, DEBUG in dev
// Never log: passwords, card numbers, full payment tokens
```

---

## OFFLINE RESILIENCE

### Customer PWA Service Worker

```typescript
// Cache strategy:
// - Menu data: CacheFirst with 1-hour TTL
// - Static assets: CacheFirst (images, JS, CSS)
// - Order placement: NetworkFirst with IndexedDB queue fallback

// If offline when placing order:
// 1. Save order to IndexedDB queue
// 2. Show "Order will be sent when connection restores"
// 3. Retry on reconnect (idempotent submission via client-generated orderId)
```

### Kitchen Display Resilience

```typescript
const socket = io('/kitchen', {
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  timeout: 20000,
});

// On connect: fetch all ACTIVE tickets via REST, populate local state
// On disconnect: show OFFLINE banner prominently, freeze UI
// On reconnect: re-fetch state, apply delta updates
```

---

## FRONTEND APPLICATIONS

### 1. Customer PWA (apps/customer-app/)

**Performance requirements:**
- Menu loads in < 200ms (Service Worker cache)
- First Contentful Paint < 1.5s on 4G
- Lighthouse PWA score > 90

**Key screens:**
```
/t/[token]                     # Table session landing → redirects to menu
/t/[token]/menu                # Full menu with categories sidebar
/t/[token]/menu/[productId]    # Product detail with modifiers
/t/[token]/cart                # Cart review
/t/[token]/checkout            # Payment selection
/t/[token]/order/[orderId]     # Live order tracking (animated)
/t/[token]/order/[orderId]/done # Order complete / receipt
```

**UX Rules:**
- Cart always visible as floating bottom bar with item count + total
- Every state transition animated with Framer Motion
- Order tracking screen: animated SVG progress steps (not a spinner)
- Currency displayed using restaurant locale + currency — never hardcoded
- Arabic RTL: `dir="rtl"` on html element when lang=ar; CSS logical properties throughout
- OFFLINE banner: sticky top bar in red when Service Worker detects offline

### 2. Restaurant Dashboard (apps/dashboard/)

**Desktop-first. This is NOT a mobile app.**

**Navigation:**
```
/dashboard/orders/live         # DEFAULT — real-time order queue (WebSocket)
/dashboard/orders              # Order history with filters
/dashboard/tables              # Interactive table map with session status
/dashboard/menu                # Menu management (categories, products, modifiers)
/dashboard/menu/products/new   # Product form with modifier groups
/dashboard/analytics           # Revenue, peak hours, top products
/dashboard/analytics/z-report  # End-of-day Z-report (PDF download)
/dashboard/staff               # Staff roles and management
/dashboard/settings            # Restaurant settings: currency, locale, timezone, tax rate, payment providers
```

**Settings page must include:**
- Currency selector (ISO 4217 searchable dropdown)
- Locale / language selector
- Timezone selector (IANA tz searchable dropdown)
- Tax rate + tax label + inclusive/exclusive toggle
- Payment provider configuration (enable/disable per provider)

### 3. Kitchen Display System (apps/kitchen/)

**Fullscreen tablet application. No navigation. No settings UI.**

```
/kitchen/[deviceToken]         # Main KDS screen (fullscreen)
```

**KDS layout:**
- 3-4 column card grid of active orders
- Each card: order number, table number, items, time elapsed
- Color band at card top: green (0-5min) / yellow (5-10min) / red (10min+)
- Tap card → expand modifier details
- "BUMP" button marks order as ready (large, touch-friendly)
- Station filter (ALL | GRILL | BAR | COLD)
- OFFLINE full-screen banner when disconnected

---

## ENVIRONMENT VARIABLES

```bash
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Redis
REDIS_URL=redis://...

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLERK_WEBHOOK_SECRET=...

# Payments
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
PAYMOB_API_KEY=...
PAYMOB_INTEGRATION_ID_CARD=...
PAYMOB_INTEGRATION_ID_WALLET=...
PAYMOB_HMAC_SECRET=...
FAWRY_MERCHANT_CODE=...
FAWRY_SECURITY_KEY=...
TABBY_API_KEY=...
TAMARA_API_KEY=...

# Storage
CLOUDFLARE_R2_ENDPOINT=...
CLOUDFLARE_R2_ACCESS_KEY=...
CLOUDFLARE_R2_SECRET_KEY=...
CLOUDFLARE_R2_BUCKET=shata-media

# App
JWT_SECRET=...
SESSION_TOKEN_SECRET=...
NODE_ENV=development
API_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Monitoring
SENTRY_DSN=...
NEXT_PUBLIC_POSTHOG_KEY=...
```

---

## BUILD ORDER (Phase 1 — MVP)

### Step 1: Foundation (Week 1)
- [ ] Turborepo monorepo setup with all app workspaces
- [ ] Shared `packages/config` (ESLint, TypeScript, Tailwind)
- [ ] Shared `packages/ui` with shadcn/ui base components
- [ ] Shared `packages/types` (DTOs, enums, interfaces)
- [ ] NestJS API bootstrap with health check endpoint
- [ ] Prisma schema (complete schema above) + initial migration
- [ ] Supabase project setup + connection pooling
- [ ] Redis connection (Upstash)
- [ ] Clerk integration (backend JWT validation guard)
- [ ] Docker Compose for local dev (Postgres + Redis)
- [ ] GitHub Actions CI (lint + type-check + test on PR)

### Step 2: Restaurant Onboarding (Week 1-2)
- [ ] Restaurant creation flow — name, type, **currency, locale, timezone, tax rate**
- [ ] Menu management API (categories, products, modifiers)
- [ ] Menu management UI in dashboard
- [ ] Table setup with QR code generation (signed JWT tokens)
- [ ] NFC tag URL generation
- [ ] Staff invitation via Clerk (role assignment)

### Step 3: Customer Ordering (Week 2-3)
- [ ] Session token validation endpoint
- [ ] Menu API with aggressive Redis caching (5-min TTL)
- [ ] Customer PWA: menu page with category sidebar
- [ ] Customer PWA: product detail modal with modifier selection
- [ ] Customer PWA: cart with running total (formatted in restaurant currency)
- [ ] Customer PWA: Service Worker for offline menu caching
- [ ] Cart state management (Zustand or Redux Toolkit)
- [ ] Language/RTL toggle (EN ↔ AR, extensible to any language)

### Step 4: Orders & Payments (Week 3-4)
- [ ] Order creation API — price server-calculated using restaurant.taxRate
- [ ] Payment provider abstraction interface
- [ ] Stripe integration (global primary)
- [ ] Paymob integration (Egypt/MENA regional add-on)
- [ ] Payment webhook handlers (idempotent, provider-agnostic)
- [ ] Order status SSE stream for customer tracking
- [ ] Customer PWA: checkout screen (shows available providers for the restaurant's region)
- [ ] Customer PWA: live order tracking with Framer Motion animations
- [ ] Tax calculation via TaxService — uses restaurant.taxRate, never hardcoded

### Step 5: Kitchen Display (Week 4)
- [ ] KitchenTicket creation on order confirmation
- [ ] Socket.io gateway (kitchen namespace) with Redis adapter
- [ ] Kitchen app: fullscreen ticket grid layout
- [ ] Kitchen app: real-time ticket updates via WebSocket
- [ ] Kitchen app: color-coded time bands
- [ ] Kitchen app: station filtering
- [ ] Kitchen app: BUMP button
- [ ] Kitchen app: OFFLINE banner
- [ ] Sound alert on new order

### Step 6: Restaurant Dashboard Live (Week 4-5)
- [ ] Live orders page with WebSocket updates
- [ ] Order status management (confirm, preparing, serve)
- [ ] Void/cancel order flow with reason
- [ ] Refund initiation (calls payment provider)
- [ ] Table map with session status
- [ ] Close table session / regenerate QR

### Step 7: Analytics & Reports (Week 5-6)
- [ ] Revenue summary (today, week, month) — displayed in restaurant currency
- [ ] Top products report
- [ ] Peak hours heatmap
- [ ] End-of-day Z-report (PDF, currency-aware)
- [ ] Transaction history with export

### Step 8: Polish & Testing (Week 6)
- [ ] Error boundaries and fallback UIs
- [ ] Loading states and skeletons
- [ ] Form validation with helpful error messages
- [ ] Responsive testing (customer app: mobile-first; dashboard: desktop-first)
- [ ] RTL layout QA (Arabic mode)
- [ ] Integration tests: full order flow (order → payment → kitchen → tracking)
- [ ] Multi-currency smoke test (USD, EGP, AED, GBP orders)
- [ ] Webhook reliability: scheduled payment status reconciliation
- [ ] Sentry integration
- [ ] Staging deployment

---

## CODE QUALITY STANDARDS

### TypeScript
```typescript
// Strict mode enforced. No `any` types.
// Use discriminated unions for state machines
type OrderStatus = 
  | { status: 'PENDING' }
  | { status: 'CONFIRMED'; confirmedAt: Date }
  | { status: 'PREPARING'; station: string }
  | { status: 'READY'; readyAt: Date }
  | { status: 'SERVED'; servedAt: Date }
  | { status: 'CANCELLED'; reason: string; cancelledAt: Date }

// Use Zod for runtime validation on payment webhook payloads
// Use class-validator on all NestJS DTOs
```

### Error Handling
```typescript
class ShataException extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number,
    public readonly context?: Record<string, unknown>
  ) { super(message); }
}

class OrderNotFoundException extends ShataException { ... }
class PaymentFailedException extends ShataException { ... }
class SessionExpiredException extends ShataException { ... }

// Global exception filter → { error: { code, message, requestId } }
```

### Testing
```typescript
// Required coverage before shipping:
// 1. Order placement flow (unit + integration)
// 2. Payment webhook idempotency
// 3. Session token validation
// 4. Price calculation (never trust client price)
// 5. Tax calculation — multiple tax rates + inclusive/exclusive modes
// 6. Modifier price aggregation
// 7. Currency formatting across locales

// Vitest for unit tests
// supertest for API integration tests
// Playwright for critical E2E flows
```

### Database
```typescript
// All timestamps in UTC. Convert to restaurant.timezone only on display.
// Never store money as float — use Decimal
// Never assume a currency — always read from restaurant or order record

// Critical indexes:
// - orders: (restaurantId, status)
// - orders: (sessionId)
// - sessions: (tableId, status) WHERE status = 'ACTIVE'
// - products: (restaurantId, isAvailable)
// - kitchenTickets: (restaurantId, status)
```

---

## DESIGN SYSTEM

### Colors
```javascript
// tailwind.config.ts
colors: {
  brand: {
    DEFAULT: '#FF4500',
    dark: '#CC3700',
    light: '#FFF5F2',
  },
  teal: '#00B4D8',
  success: '#06D6A0',
  warning: '#FFD166',
  danger: '#EF233C',
}
```

### Typography
- **Primary font:** Inter (Latin) + Cairo (Arabic)
- Load both via `next/font/google`
- `font-inter` for LTR, `font-cairo` for RTL

### Components
```
shadcn/ui is the foundation — copy into packages/ui and customize
Never import from shadcn directly in app code — always from packages/ui

Key custom components:
- <OrderCard>       — kitchen ticket with time band
- <ProductCard>     — menu item with add button; price via Intl.NumberFormat
- <CartDrawer>      — slide-up cart with items and total
- <StatusTracker>   — animated order progress steps
- <TableMap>        — interactive SVG table layout
- <LiveOrderRow>    — real-time order row for dashboard
- <OfflineBanner>   — sticky top bar when disconnected
- <CurrencyInput>   — amount input aware of decimal rules per currency
```

---

## CRITICAL INVARIANTS (Never Break These)

1. **Price is always server-calculated.** Client sends product IDs + quantities + modifier option IDs. Server calculates total using its own product prices. Any mismatch → reject order.

2. **Tax is calculated server-side using `restaurant.taxRate`.** Never hardcode any country's tax rate. Never trust a tax amount from the client.

3. **Currency is always explicit.** Every monetary value in the database and API carries a `currency` field. Never assume a default currency in business logic.

4. **Wallet/ledger balance = sum of all ledger entries.** Never update balance field directly. Always append to ledger and recompute.

5. **QR tokens are signed and expire.** Never use raw table IDs in QR/NFC URLs. Token payload includes `tableId`, `restaurantId`, `exp`.

6. **Webhook handlers are idempotent.** Receiving the same webhook twice must produce the same result. Use provider's event ID as idempotency key.

7. **All timestamps stored in UTC.** Display in `restaurant.timezone` only at the presentation layer.

8. **Kitchen must show OFFLINE state.** Never silently fail — kitchen staff must know immediately if they're not receiving orders.

9. **Tenant isolation is enforced at the query level.** Every query against tenant tables includes a `restaurantId` filter. RLS is defense-in-depth.

10. **Correlation IDs on every request.** Every log entry includes correlation ID, restaurantId (when available), and userId (when available).

11. **Session collision is handled atomically.** Use Prisma `upsert` with unique constraint on `(tableId, status=ACTIVE)`.

12. **No geography is hardcoded.** Timezone, currency, tax rate, tax label, payment providers, and locale are all per-restaurant configuration. The platform works identically for a café in Cairo, a restaurant in New York, a beach club in Dubai, or a food court in London.

---

## PHASE 2 PREVIEW (Do Not Build in Phase 1)

Architecture must accommodate these without schema changes:

- Loyalty points system (data model exists, service not activated)
- Push notifications (OneSignal or FCM)
- AI menu photo parsing (for fast onboarding)
- Group ordering with shared cart
- Split bill
- Multi-branch management UI
- Full SaaS admin platform
- White-label theming per restaurant
- Staff app (mobile, for order entry)
- Printer integration (ESC/POS thermal via `node-thermal-printer`)
- Additional payment providers (Moyasar, PayTabs, HyperPay, etc.)
- Advanced analytics (cohort analysis, customer LTV)
- Smart upselling (collaborative filtering on order data)

---

## FINAL CTO NOTES

**What success looks like for Phase 1:**
> A restaurant owner anywhere in the world signs up, uploads their menu, sets their currency and tax rate, sets up their tables, and has their first real customer order — fully paid and tracked — within 30 minutes of first visiting the signup page.

**The one metric that matters in Month 1:**
> Time from signup to first paid order. Target: < 30 minutes, self-serve, no support required.

**If you have to choose between features:**
> Always choose order reliability over feature completeness.
> A missing feature is a future sale. A lost order during dinner rush is a lost customer forever.

**On internationalization:**
> Do not treat localization as an afterthought. Currency, tax, timezone, and language are first-class restaurant settings. Build with `dir="rtl"` and CSS logical properties from the start. QA every screen in both LTR and RTL before shipping.

**On payments:**
> Do not go live until you have tested the full payment failure and refund flow, not just the happy path. Restaurants will judge you by how you handle failures.

**On geography:**
> This platform serves restaurants worldwide. A restaurant in Cairo and a restaurant in New York should have identical feature parity — only their settings differ. Never write code that branches on a country name or hardcodes a currency symbol.

---

*Powered by Shata Global LLC.*
*Tap. Order. Pay. Done.*

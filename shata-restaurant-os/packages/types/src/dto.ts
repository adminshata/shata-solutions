import type { OrderStatus, PaymentProvider, TicketStatus } from "./enums";

// ── Session / Menu DTOs ───────────────────────────────────────────────────

export interface WhiteLabelConfigDto {
  appName: string;
  appNameAr?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor?: string;
  hideShataLogo: boolean;
}

export interface SessionContextDto {
  token: string;
  restaurantId: string;
  tableId: string;
  tableNumber: string;
  restaurantName: string;
  currency: string;
  locale: string;
  timezone: string;
  taxRate: number;
  taxLabel: string;
  taxInclusive: boolean;
  logo?: string | null;
  primaryColor?: string | null;
  enabledPaymentProviders: PaymentProvider[];
  whiteLabelConfig?: WhiteLabelConfigDto;
}

// ── Order DTOs ────────────────────────────────────────────────────────────

export interface PlaceOrderItemDto {
  productId: string;
  quantity: number;
  notes?: string;
  selectedOptionIds: string[];
}

export interface PlaceOrderDto {
  idempotencyKey: string;
  sessionToken: string;
  items: PlaceOrderItemDto[];
  notes?: string;
}

export interface OrderStatusDto {
  orderId: string;
  status: OrderStatus;
  updatedAt: Date;
  estimatedReadyAt?: Date | null;
}

// ── Payment DTOs ──────────────────────────────────────────────────────────

export interface CreatePaymentIntentDto {
  orderId: string;
  provider: PaymentProvider;
  returnUrl?: string;
}

export interface PaymentIntentResultDto {
  intentId: string;
  provider: PaymentProvider;
  amount: number;
  currency: string;
  clientSecret?: string;
  redirectUrl?: string;
  qrCode?: string;
  expiresAt?: Date;
}

// ── Kitchen DTOs ──────────────────────────────────────────────────────────

export interface KitchenTicketDto {
  id: string;
  orderId: string;
  orderNumber: string;
  tableNumber: string;
  station?: string | null;
  status: TicketStatus;
  priority: number;
  items: KitchenItemDto[];
  elapsedSeconds: number;
  createdAt: Date;
  prepStartedAt?: Date | null;
}

export interface KitchenItemDto {
  id: string;
  name: string;
  nameAr?: string | null;
  quantity: number;
  notes?: string | null;
  modifiers: string[];
}

// ── Analytics DTOs ────────────────────────────────────────────────────────

export interface AnalyticsOverviewDto {
  revenue: {
    today: number;
    week: number;
    month: number;
    currency: string;
    /** Percentage change vs yesterday (null if no prior data) */
    todayVsYesterday?: number | null;
    /** Percentage change vs last week (null if no prior data) */
    weekVsLastWeek?: number | null;
  };
  orders: {
    today: number;
    week: number;
    month: number;
    todayVsYesterday?: number | null;
  };
  avgOrderValue: number;
  topProducts: Array<{ id: string; name: string; count: number; revenue: number }>;
  recentTransactions: Array<{ id: string; amount: number; currency: string; createdAt: Date }>;
}

export interface PeakHoursDto {
  // 7 days × 24 hours matrix: value = avg order count
  matrix: number[][];
  peakHour: number;
  peakDay: number;
}

// ── Shared ────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    requestId: string;
    context?: Record<string, unknown>;
  };
}

export interface TaxResult {
  subtotal: number;
  tax: number;
  total: number;
}

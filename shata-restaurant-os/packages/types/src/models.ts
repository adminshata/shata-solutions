import type {
  OrderStatus,
  OrderType,
  PaymentProvider,
  PaymentStatus,
  PlanType,
  SessionStatus,
  StaffRole,
  SubStatus,
  TableStatus,
  TicketStatus,
  ModifierType,
  TransactionType,
} from "./enums";

// ── Restaurant & Organization ─────────────────────────────────────────────

export interface Organization {
  id: string;
  name: string;
  plan: PlanType;
  billingStatus: string;
  createdAt: Date;
}

export interface Restaurant {
  id: string;
  orgId: string;
  name: string;
  branchCode?: string | null;
  currency: string;
  locale: string;
  timezone: string;
  taxRate: number;
  taxLabel: string;
  taxInclusive: boolean;
  settings: RestaurantSettings;
  createdAt: Date;
}

export interface RestaurantSettings {
  logo?: string;
  coverImage?: string;
  primaryColor?: string;
  enableWifi?: boolean;
  wifiPassword?: string;
  enableLoyalty?: boolean;
  enableNfc?: boolean;
  preferredPaymentProvider?: PaymentProvider;
  enabledPaymentProviders?: PaymentProvider[];
  orderConfirmationMode?: "auto" | "manual";
  kitchenStations?: string[];
  taxRegistrationNumber?: string;
}

// ── Menu ──────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  restaurantId: string;
  name: string;
  nameAr?: string | null;
  sortOrder: number;
  availableFrom?: string | null;
  availableTo?: string | null;
  isAvailable: boolean;
  products?: Product[];
}

export interface Product {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  nameAr?: string | null;
  description?: string | null;
  descriptionAr?: string | null;
  price: number;
  imageUrl?: string | null;
  isAvailable: boolean;
  sortOrder: number;
  modifierGroups?: ModifierGroup[];
}

export interface ModifierGroup {
  id: string;
  productId: string;
  name: string;
  nameAr?: string | null;
  type: ModifierType;
  required: boolean;
  minSelect: number;
  maxSelect: number;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  modifierGroupId: string;
  name: string;
  nameAr?: string | null;
  priceDelta: number;
}

// ── Sessions & Tables ─────────────────────────────────────────────────────

export interface Table {
  id: string;
  restaurantId: string;
  number: string;
  qrCode: string;
  nfcId?: string | null;
  status: TableStatus;
}

export interface Session {
  id: string;
  tableId: string;
  restaurantId: string;
  status: SessionStatus;
  openedAt: Date;
  closedAt?: Date | null;
}

// ── Orders ────────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  sessionId?: string | null;
  restaurantId: string;
  customerId?: string | null;
  status: OrderStatus;
  type: OrderType;
  currency: string;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Pick<Product, "id" | "name" | "nameAr" | "price" | "imageUrl">;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string | null;
  selectedOptions?: OrderItemModifier[];
}

export interface OrderItemModifier {
  id: string;
  orderItemId: string;
  modifierOptionId: string;
  priceDelta: number;
}

// ── Payments ──────────────────────────────────────────────────────────────

export interface PaymentIntent {
  id: string;
  orderId: string;
  provider: PaymentProvider;
  providerRef?: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  metadata?: Record<string, unknown> | null;
  createdAt: Date;
  settledAt?: Date | null;
}

export interface Transaction {
  id: string;
  restaurantId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  fee: number;
  net: number;
  refId?: string | null;
  createdAt: Date;
}

// ── Kitchen ───────────────────────────────────────────────────────────────

export interface KitchenTicket {
  id: string;
  orderId: string;
  restaurantId: string;
  station?: string | null;
  status: TicketStatus;
  priority: number;
  prepStartedAt?: Date | null;
  readyAt?: Date | null;
  createdAt: Date;
  order?: {
    id: string;
    items: OrderItem[];
    session?: { table?: { number: string } | null } | null;
  };
}

// ── Staff ─────────────────────────────────────────────────────────────────

export interface Staff {
  id: string;
  restaurantId: string;
  clerkUserId: string;
  name: string;
  role: StaffRole;
  isActive: boolean;
  createdAt: Date;
}

// ── Subscription ──────────────────────────────────────────────────────────

export interface Subscription {
  id: string;
  orgId: string;
  planType: PlanType;
  status: SubStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  providerSubscriptionId?: string | null;
  createdAt: Date;
}

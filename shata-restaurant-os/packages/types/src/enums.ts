export enum PlanType {
  STARTER = "STARTER",
  GROWTH = "GROWTH",
  ENTERPRISE = "ENTERPRISE",
}

export enum TableStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  RESERVED = "RESERVED",
  MAINTENANCE = "MAINTENANCE",
}

export enum SessionStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  ABANDONED = "ABANDONED",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  COOKING = "COOKING",
  READY = "READY",
  SERVED = "SERVED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum OrderType {
  DINE_IN = "DINE_IN",
  PICKUP = "PICKUP",
  DELIVERY = "DELIVERY",
}

export enum PaymentProvider {
  STRIPE = "STRIPE",
  PAYMOB = "PAYMOB",
  FAWRY = "FAWRY",
  TABBY = "TABBY",
  TAMARA = "TAMARA",
  INSTAPAY = "INSTAPAY",
  MANUAL = "MANUAL",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum TransactionType {
  PAYMENT = "PAYMENT",
  REFUND = "REFUND",
  FEE = "FEE",
  PAYOUT = "PAYOUT",
}

export enum TicketStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  READY = "READY",
  SERVED = "SERVED",
}

export enum ModifierType {
  SINGLE = "SINGLE",
  MULTI = "MULTI",
}

export enum StaffRole {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  CASHIER = "CASHIER",
  KITCHEN = "KITCHEN",
  WAITER = "WAITER",
}

export enum LoyaltyTxType {
  EARN = "EARN",
  REDEEM = "REDEEM",
  REFUND = "REFUND",
  ADJUSTMENT = "ADJUSTMENT",
}

export enum SubStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  PAST_DUE = "PAST_DUE",
  TRIALING = "TRIALING",
}

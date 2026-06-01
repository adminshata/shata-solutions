import posthog from "posthog-js";

// Funnel events — called from ordering flow components
export const analytics = {
  menuViewed(restaurantId: string) {
    posthog.capture("menu_viewed", { restaurant_id: restaurantId });
  },

  productViewed(productId: string, productName: string, price: number, currency: string) {
    posthog.capture("product_viewed", { product_id: productId, product_name: productName, price, currency });
  },

  itemAddedToCart(productId: string, productName: string, quantity: number, price: number, currency: string) {
    posthog.capture("item_added_to_cart", { product_id: productId, product_name: productName, quantity, price, currency });
  },

  cartViewed(itemCount: number, totalValue: number, currency: string) {
    posthog.capture("cart_viewed", { item_count: itemCount, total_value: totalValue, currency });
  },

  checkoutStarted(orderId: string, total: number, currency: string, provider: string) {
    posthog.capture("checkout_started", { order_id: orderId, total, currency, payment_provider: provider });
  },

  paymentCompleted(orderId: string, total: number, currency: string, provider: string) {
    posthog.capture("payment_completed", { order_id: orderId, total, currency, payment_provider: provider });
    // PostHog revenue tracking
    posthog.capture("revenue", { revenue: total, currency });
  },

  paymentFailed(orderId: string, provider: string, reason?: string) {
    posthog.capture("payment_failed", { order_id: orderId, payment_provider: provider, reason });
  },

  orderTracked(orderId: string, status: string) {
    posthog.capture("order_status_viewed", { order_id: orderId, status });
  },
};

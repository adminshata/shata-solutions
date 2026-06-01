-- Performance indexes: critical hot paths
-- Using standard CREATE INDEX (CONCURRENTLY not allowed in migration transactions)

CREATE INDEX IF NOT EXISTS idx_orders_restaurant_status     ON "Order"("restaurantId", "status");
CREATE INDEX IF NOT EXISTS idx_orders_session               ON "Order"("sessionId");
CREATE INDEX IF NOT EXISTS idx_sessions_table_active        ON "Session"("tableId", "status");
CREATE INDEX IF NOT EXISTS idx_products_restaurant_avail    ON "Product"("restaurantId", "isAvailable");
CREATE INDEX IF NOT EXISTS idx_kitchen_tickets_rest_status  ON "KitchenTicket"("restaurantId", "status");
CREATE INDEX IF NOT EXISTS idx_order_items_order            ON "OrderItem"("orderId");
CREATE INDEX IF NOT EXISTS idx_order_items_product          ON "OrderItem"("productId");
CREATE INDEX IF NOT EXISTS idx_loyalty_acct_rest_pts        ON "LoyaltyAccount"("restaurantId", "points" DESC);
CREATE INDEX IF NOT EXISTS idx_review_rest_rating           ON "OrderReview"("restaurantId", "rating", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_waiter_call_rest_status      ON "WaiterCall"("restaurantId", "status");
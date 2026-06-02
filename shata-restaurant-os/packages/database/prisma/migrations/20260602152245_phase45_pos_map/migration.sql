-- DropIndex
DROP INDEX "idx_loyalty_acct_rest_pts";

-- DropIndex
DROP INDEX "idx_order_items_order";

-- DropIndex
DROP INDEX "idx_order_items_product";

-- DropIndex
DROP INDEX "idx_review_rest_rating";

-- CreateTable
CREATE TABLE "PosProductMap" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "posProvider" TEXT NOT NULL,
    "externalSku" TEXT NOT NULL,
    "externalName" TEXT NOT NULL,
    "productId" TEXT,
    "isIgnored" BOOLEAN NOT NULL DEFAULT false,
    "occurrences" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PosProductMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PosProductMap_restaurantId_posProvider_idx" ON "PosProductMap"("restaurantId", "posProvider");

-- CreateIndex
CREATE INDEX "PosProductMap_restaurantId_productId_idx" ON "PosProductMap"("restaurantId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "PosProductMap_restaurantId_posProvider_externalSku_key" ON "PosProductMap"("restaurantId", "posProvider", "externalSku");

-- AddForeignKey
ALTER TABLE "PosProductMap" ADD CONSTRAINT "PosProductMap_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
